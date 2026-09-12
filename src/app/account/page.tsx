import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) redirect('/login?next=/account');

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Your account</h1>
        <p className="mt-2 text-sm text-gray-600">Signed in as {data.user.email}</p>
      </div>

      <form action="/auth/signout" method="post">
        <button className="rounded border px-4 py-2" type="submit">Sign out</button>
      </form>
    </main>
  );
}
