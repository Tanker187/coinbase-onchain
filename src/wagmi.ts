'use client';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { coinbaseWallet as wagmiCoinbaseWallet } from 'wagmi/connectors';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID?.trim();

  return useMemo(() => {
    if (!projectId) {
      return createConfig({
        chains: [base, baseSepolia],
        connectors: [wagmiCoinbaseWallet({ appName: 'Coinbase Onchain' })],
        ssr: true,
        transports: {
          [base.id]: http(),
          [baseSepolia.id]: http(),
        },
      });
    }

    const connectors = connectorsForWallets(
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
        appName: 'Coinbase Onchain',
        projectId,
      },
    );

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
