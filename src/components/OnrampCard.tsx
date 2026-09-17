'use client';

import { FundCard } from '@coinbase/onchainkit/fund';
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
    <FundCard
      assetSymbol="USDC"
      country="US"
      currency="USD"
      network="base"
    />
  );
}
