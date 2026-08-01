'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
      }}
      className="rounded-full border border-pine-200 px-4 py-2 text-sm font-medium text-pine-800"
    >
      Sign out
    </button>
  );
}
