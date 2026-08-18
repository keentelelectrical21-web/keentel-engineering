import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

const sitemapPath = process.argv[2] || 'C:/Users/Shahab Computers/.codex/attachments/c0edc5ed-d42e-4290-a86a-480454dc3b6b/pasted-text.txt'
const baseUrl = process.argv[3] || 'http://localhost:3000'
const outputPath = process.argv[4] || 'reports/legacy-url-audit.csv'
const excluded = '/slug scada-system-design-renewable-collector-substations'

const xml = await readFile(sitemapPath, 'utf8')
const urls = [...xml.matchAll(/<loc>https?:\/\/(?:www\.)?keentelengineering\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .filter((value, index, array) => array.indexOf(value) === index)

async function check(path) {
  if (path === excluded) return { URL: path, Status: 'Excluded by client', RedirectTarget: '', ActionNeeded: 'Intentionally retain old broken URL' }
  try {
    const response = await fetch(`${baseUrl}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(90000) })
    if ([301, 302, 307, 308].includes(response.status)) return { URL: path, Status: `${response.status} Redirect`, RedirectTarget: response.headers.get('location') || '', ActionNeeded: '' }
    return { URL: path, Status: response.status === 200 ? '200 OK' : `${response.status} Error`, RedirectTarget: '', ActionNeeded: response.status === 200 ? '' : 'Investigate' }
  } catch (error) {
    return { URL: path, Status: 'Request failed', RedirectTarget: '', ActionNeeded: error instanceof Error ? error.message : String(error) }
  }
}

const limit = 12
const results = new Array(urls.length)
let cursor = 0
await Promise.all(Array.from({ length: limit }, async () => {
  while (true) {
    const index = cursor++
    if (index >= urls.length) return
    results[index] = await check(urls[index])
    if ((index + 1) % 25 === 0) process.stdout.write(`Checked ${index + 1}/${urls.length}\n`)
  }
}))

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`
const csv = ['URL,Status,RedirectTarget,ActionNeeded', ...results.map((result) => [result.URL, result.Status, result.RedirectTarget, result.ActionNeeded].map(quote).join(','))].join('\n')
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, csv, 'utf8')

for (const [status, count] of Object.entries(results.reduce((summary, result) => ({ ...summary, [result.Status]: (summary[result.Status] || 0) + 1 }), {}))) console.log(`${count} ${status}`)
console.log(`Audit report: ${outputPath}`)
