'use client';

import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href="/login?mode=login"
      className="inline-flex min-w-[90px] items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
    >
      Log in
    </Link>
  );
}
