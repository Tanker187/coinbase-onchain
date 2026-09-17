const productionUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : productionUrl || 'https://coinbase-onchain-crypto-master-s-projects.vercel.app';

// Public Coinbase Developer Platform values used by the browser.
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;
export const NEXT_PUBLIC_CDP_PROJECT_ID = process.env.NEXT_PUBLIC_CDP_PROJECT_ID;
export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
