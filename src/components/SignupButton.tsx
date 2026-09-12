'use client';

import Link from 'next/link';

export default function SignupButton() {
  return (
    <Link
      href="/login?mode=signup"
      className="inline-flex min-w-[90px] items-center justify-center rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-300"
    >
      Sign up
    </Link>
  );
}
