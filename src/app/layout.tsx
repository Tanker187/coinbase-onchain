import type { Metadata } from 'next';
import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import OnchainProviders from '../components/OnchainProviders';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Coinbase Onchain',
  description: 'Connect your wallet and interact with Base onchain.',
  openGraph: {
    title: 'Coinbase Onchain',
    description: 'Connect your wallet and interact with Base onchain.',
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
