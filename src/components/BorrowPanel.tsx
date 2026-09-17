'use client';

import {
  useAdjustBorrowPosition,
  useCloseBorrowPosition,
  useCreateBorrowPosition,
  useListBorrowPositions,
  useListEvmBorrowProducts,
} from '@coinbase/cdp-hooks';
import { useCurrentUser } from '@coinbase/cdp-hooks';
import { useMemo, useState } from 'react';

export default function BorrowPanel() {
  const { currentUser } = useCurrentUser();
  const smartAccount = currentUser?.evmSmartAccounts?.[0];
  const [productId, setProductId] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [message, setMessage] = useState('');

  const products = useListEvmBorrowProducts({
    network: 'base',
    protocol: 'morpho_blue',
  });

  const positions = useListBorrowPositions({
    evmSmartAccount: smartAccount,
    enabled: !!smartAccount,
  });

  const createPosition = useCreateBorrowPosition();
  const adjustPosition = useAdjustBorrowPosition();
  const closePosition = useCloseBorrowPosition();

  const selected = useMemo(
    () => products.data?.borrowProducts.find((p) => p.borrowProductId === productId),
    [products.data?.borrowProducts, productId],
  );

  const busy = [createPosition, adjustPosition, closePosition].some(
    (hook) => hook.status === 'pending',
  );

  const handleOpen = async () => {
    setMessage('');
    if (!productId || !collateralAmount || !loanAmount) return;
    try {
      const result = await createPosition.createBorrowPosition({
        borrowProductId: productId,
        collateralAmount,
        loanAmount,
        useCdpPaymaster: true,
      });
      setMessage(result?.userOpHash ? `Confirmed: ${result.userOpHash}` : 'Borrow position confirmed.');
      positions.refetch();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Borrow request failed.');
    }
  };

  const handleClose = async (id: string) => {
    setMessage('');
    try {
      const result = await closePosition.closeBorrowPosition({
        borrowProductId: id,
        useCdpPaymaster: true,
      });
      setMessage(result?.userOpHash ? `Closed: ${result.userOpHash}` : 'Position closed.');
      positions.refetch();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Close request failed.');
    }
  };

  const handleAddCollateral = async () => {
    if (!productId || !collateralAmount) return;
    setMessage('');
    try {
      await adjustPosition.adjustBorrowPosition({
        borrowProductId: productId,
        addCollateralAmount: collateralAmount,
        useCdpPaymaster: true,
      });
      setMessage('Collateral added.');
      positions.refetch();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Adjustment failed.');
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">DeFi Borrow</p>
          <h3 className="mt-2 text-xl font-semibold">Borrow against your Base collateral</h3>
          <p className="mt-1 text-sm text-slate-400">Morpho Blue · Base Mainnet · smart account required</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {smartAccount ? 'Smart account connected' : 'Sign in to use Borrow'}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white"
          disabled={!smartAccount || products.status === 'pending' || busy}
        >
          <option value="">Select borrow market</option>
          {products.data?.borrowProducts.map((product) => (
            <option key={product.borrowProductId} value={product.borrowProductId}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          value={collateralAmount}
          onChange={(e) => setCollateralAmount(e.target.value)}
          placeholder="Collateral amount"
          inputMode="decimal"
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500"
          disabled={!smartAccount || busy}
        />
        <input
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Loan amount"
          inputMode="decimal"
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white placeholder:text-slate-500"
          disabled={!smartAccount || busy}
        />
      </div>

      {selected && (
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/70 p-3 text-xs text-slate-300">
          <span className="font-medium text-white">{selected.name}</span>
          <span className="mx-2 text-slate-600">·</span>
          LLTV {(selected.protocolDetails.marketParams.lltvBps / 100).toFixed(2)}%
          <span className="mx-2 text-slate-600">·</span>
          {selected.protocolDetails.marketParams.collateralToken.symbol} / {selected.protocolDetails.marketParams.loanToken.symbol}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleOpen}
          disabled={!smartAccount || busy || !productId || !collateralAmount || !loanAmount}
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {createPosition.status === 'pending' ? 'Opening…' : 'Open position'}
        </button>
        <button
          onClick={handleAddCollateral}
          disabled={!smartAccount || busy || !productId || !collateralAmount}
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add collateral
        </button>
      </div>

      {message && <p className="mt-3 break-all text-xs text-slate-300">{message}</p>}

      <div className="mt-6 border-t border-white/10 pt-5">
        <h4 className="text-sm font-semibold">Your borrow positions</h4>
        {!smartAccount ? (
          <p className="mt-2 text-sm text-slate-400">Connect and sign in to view positions.</p>
        ) : positions.status === 'pending' ? (
          <p className="mt-2 text-sm text-slate-400">Loading positions…</p>
        ) : positions.error ? (
          <p className="mt-2 text-sm text-red-300">{positions.error.message}</p>
        ) : !positions.data?.borrowPositions.length ? (
          <p className="mt-2 text-sm text-slate-400">No borrow positions yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {positions.data.borrowPositions.map((position) => (
              <div key={position.borrowProductId} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{position.borrowProductId}</p>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-slate-300">
                    {position.onchainState.healthStatus}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Collateral: {position.onchainState.collateral.map((c) => `${c.amount} ${c.token.symbol}`).join(', ')}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Debt: {position.onchainState.debt.map((d) => `${d.amount} ${d.token.symbol}`).join(', ')}
                </p>
                <button
                  onClick={() => handleClose(position.borrowProductId)}
                  disabled={busy}
                  className="mt-3 rounded-lg border border-red-400/30 px-3 py-2 text-xs text-red-200 disabled:opacity-40"
                >
                  {closePosition.status === 'pending' ? 'Closing…' : 'Close position'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
