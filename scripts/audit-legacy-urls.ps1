param(
  [string]$SitemapPath = 'C:\Users\Shahab Computers\.codex\attachments\c0edc5ed-d42e-4290-a86a-480454dc3b6b\pasted-text.txt',
  [string]$BaseUrl = 'http://localhost:3000',
  [string]$OutputPath = 'reports\legacy-url-audit.csv'
)

$raw = Get-Content -Raw -LiteralPath $SitemapPath
$urls = [regex]::Matches($raw, '<loc>https?://(?:www\.)?keentelengineering\.com(?<path>[^<]*)</loc>') |
  ForEach-Object { [System.Net.WebUtility]::HtmlDecode($_.Groups['path'].Value) } |
  Sort-Object -Unique

$excluded = '/slug scada-system-design-renewable-collector-substations'
$results = foreach ($path in $urls) {
  if ($path -eq $excluded) {
    [pscustomobject]@{ URL = $path; Status = 'Excluded by client'; RedirectTarget = ''; ActionNeeded = 'Intentionally retain old broken URL' }
    continue
  }

  try {
    $response = Invoke-WebRequest -UseBasicParsing -MaximumRedirection 0 -Uri ($BaseUrl + $path) -ErrorAction Stop
    [pscustomobject]@{ URL = $path; Status = "$($response.StatusCode) OK"; RedirectTarget = ''; ActionNeeded = '' }
  } catch {
    $webResponse = $_.Exception.Response
    if ($webResponse) {
      $code = [int]$webResponse.StatusCode
      $location = $webResponse.Headers['Location']
      if ($code -in 301, 302, 307, 308) {
        [pscustomobject]@{ URL = $path; Status = "$code Redirect"; RedirectTarget = $location; ActionNeeded = '' }
      } else {
        [pscustomobject]@{ URL = $path; Status = "$code Error"; RedirectTarget = ''; ActionNeeded = 'Investigate' }
      }
    } else {
      [pscustomobject]@{ URL = $path; Status = 'Request failed'; RedirectTarget = ''; ActionNeeded = $_.Exception.Message }
    }
  }
}

$outputDirectory = Split-Path -Parent $OutputPath
if ($outputDirectory) { New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null }
$results | Export-Csv -NoTypeInformation -Encoding utf8 -LiteralPath $OutputPath
$results | Group-Object Status | Sort-Object Name | Format-Table Count, Name -AutoSize
Write-Output "Audit report: $OutputPath"
