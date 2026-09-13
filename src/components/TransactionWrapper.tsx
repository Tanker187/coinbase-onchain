'use client';

export default function TransactionWrapper() {
  return (
    <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-100">
      <p className="font-medium">Transaction temporarily disabled</p>
      <p className="mt-1 text-amber-100/70">
        The previous mint contract has not been independently verified. No wallet
        transaction will be submitted until a verified contract is configured.
      </p>
    </div>
  );
}
