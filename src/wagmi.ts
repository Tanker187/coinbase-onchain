'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { createConfig, http, injected } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID?.trim();

  return useMemo(() => {
    const connectors = projectId
      ? connectorsForWallets(
          [
            {
              groupName: 'Recommended Wallet',
              wallets: [coinbaseWallet],
            },
            {
              groupName: 'Other Wallets',
              wallets: [rainbowWallet, metaMaskWallet],
            },
          ],
          {
            appName: 'onchainkit',
            projectId,
          },
        )
      : [injected()];

    return createConfig({
      chains: [base, baseSepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });
  }, [projectId]);
}
