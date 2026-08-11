import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Legacy newsletter URLs (the site now uses the plural route).
      { source: '/newsletter/ai-data-center-infrastructure', destination: '/newsletters/ai-data-center-infrastructure', statusCode: 301 },
      { source: '/newsletter/bess-growth-grid-reliability-compliance-2026', destination: '/newsletters/bess-growth-grid-reliability-compliance-2026', statusCode: 301 },
      { source: '/newsletter/ercot-energy-market-update-july-2026', destination: '/newsletters/ercot-energy-market-update-2026', statusCode: 301 },
      { source: '/newsletter/february-2026-ai-data-centers-grid-reliability', destination: '/newsletters/february-2026-ai-data-centers-grid-reliability', statusCode: 301 },
      { source: '/newsletter/march-2026-nerc-grid-reliability-updates', destination: '/newsletters/march-2026-nerc-grid-reliability-updates', statusCode: 301 },
      { source: '/newsletter/navigating-nerc-compliance-in-the-era-of-inverter-based-resources', destination: '/newsletters/navigating-nerc-compliance-in-the-era-of-inverter-based-resources', statusCode: 301 },
      { source: '/newsletter/nerc-compliance-bess', destination: '/newsletters/nerc-compliance-bess', statusCode: 301 },

      // Legacy URL structure retained for search engines, shared links, and bookmarks.
      { source: '/services/power-system-studies/protective-device-coordination-studies', destination: '/service/power-system-studies/protective-device-coordination-studies', statusCode: 301 },
      { source: '/software-capabilities-faqs', destination: '/service/software-capabilities-faqs', statusCode: 301 },
      { source: '/engineering-services-faqs', destination: '/service/software-capabilities-faqs', statusCode: 301 },
      { source: '/substation-engineering-case-studies', destination: '/substation-design-power-system-case-studies', statusCode: 301 },
      { source: '/post-a-review', destination: '/contact', statusCode: 301 },
    ]
  },
};

export default nextConfig;
