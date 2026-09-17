'use client';

import { NEXT_PUBLIC_CDP_PROJECT_ID } from '../config';

export default function OnrampCard() {
  if (!NEXT_PUBLIC_CDP_PROJECT_ID) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
        Onramp is ready to enable after the Coinbase Developer Platform Project ID
        is added to the Vercel environment.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-sm font-medium text-white">Fund your wallet</div>
      <p className="mt-1 text-sm text-slate-400">
        Coinbase Onramp is configured for USDC funding. Open the Coinbase hosted
        funding flow to continue.
      </p>
      <a
        href="https://pay.coinbase.com/buy"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
      >
        Open Coinbase Onramp
      </a>
    </div>
  );
}
