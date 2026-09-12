import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const getSupabaseKey = () =>
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const key = getSupabaseKey();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !key) return response;

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const isPublic =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/auth');

  if (!data.user && !isPublic && request.nextUrl.pathname.startsWith('/account')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
