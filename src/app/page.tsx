'use client';

import { useAccount } from 'wagmi';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';

export default function Page() {
  const { address } = useAccount();

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
              Coinbase Onchain
            </p>
            <h1 className="mt-1 text-lg font-semibold tracking-tight">
              Onchain app
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </header>

        <section className="flex flex-1 items-center py-12 sm:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-sm text-blue-200">
                Built for Base
              </div>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
                Your gateway to the onchain world.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Connect your wallet, sign in securely, and interact with an
                onchain application powered by Coinbase OnchainKit and Base.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <WalletWrapper
                  className="w-full sm:w-auto"
                  text={address ? 'Wallet connected' : 'Connect wallet'}
                />
                {!address && <LoginButton />}
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">Connect</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Use your preferred wallet.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">Transact</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Send an onchain transaction on Base Sepolia.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">Account</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Keep your app session protected with Supabase Auth.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-blue-950/30 sm:p-6">
              <div className="rounded-2xl bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Onchain action
                    </p>
                    <p className="mt-2 text-xl font-semibold">Mint on Base</p>
                  </div>
                  <div className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-200">
                    Base Sepolia
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Connect a wallet to activate the transaction controls.
                  Transactions are handled through OnchainKit.
                </p>
                <div className="mt-6">
                  {address ? (
                    <TransactionWrapper address={address} />
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/15 p-5 text-center text-sm text-slate-400">
                      Connect your wallet to transact.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
