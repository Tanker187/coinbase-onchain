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
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300 sm:text-xs sm:tracking-[0.25em]">
              Coinbase Onchain
            </p>
            <h1 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
              Onchain app
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </header>

        <section className="flex flex-1 items-start py-8 sm:items-center sm:py-12 lg:py-16">
          <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <div className="mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-200 sm:mb-6 sm:text-sm">
                Built for Base
              </div>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Your gateway to the onchain world.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                Connect your wallet, sign in securely, and interact with an
                onchain application powered by Coinbase OnchainKit and Base.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <WalletWrapper
                  className="w-full sm:w-auto"
                  text={address ? 'Wallet connected' : 'Connect wallet'}
                />
                {!address && <LoginButton />}
              </div>

              <div className="mt-8 grid w-full max-w-2xl gap-3 sm:mt-10 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">Connect</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Use your preferred wallet.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">Protected</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Wallet actions stay disabled until their destination is verified.
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

            <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.05] p-3 shadow-2xl shadow-blue-950/30 sm:p-5 lg:p-6">
              <div className="min-w-0 rounded-2xl bg-slate-900 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.2em]">
                      Onchain action
                    </p>
                    <p className="mt-2 text-lg font-semibold sm:text-xl">Mint on Base</p>
                  </div>
                  <div className="self-start rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-200">
                    Temporarily disabled
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400 sm:mt-5">
                  The previous mint destination has not been independently verified.
                  The app will not request a wallet transaction for it.
                </p>
                <div className="mt-5 min-w-0 sm:mt-6">
                  <TransactionWrapper />
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
