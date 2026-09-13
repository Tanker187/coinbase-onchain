// @noErrors: 2307 2580 2339 - cannot find 'process', cannot find './wagmi', cannot find 'import.meta'
'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { NEXT_PUBLIC_CDP_API_KEY } from './src/config';

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={NEXT_PUBLIC_CDP_API_KEY}
      // OnchainKit and Wagmi currently expose compatible runtime chain data
      // through different viem type instances.
      chain={base as any}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
