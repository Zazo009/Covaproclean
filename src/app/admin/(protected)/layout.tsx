import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';
import { LogoutButton } from './LogoutButton';

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const isAuthed = verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!isAuthed) redirect('/admin/login');

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-pine-100 bg-white px-6 py-4">
        <span className="font-display text-lg font-semibold text-ink-950">Cova Pro Clean — Admin</span>
        <LogoutButton />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
