'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError(res.status === 429 ? 'Too many attempts — try again shortly.' : 'Incorrect password.');
        return;
      }
      router.push('/admin/bookings');
      router.refresh();
    } catch {
      setError('Network error — try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl2 border border-pine-100 bg-white p-8 shadow-card">
        <h1 className="font-display text-xl font-semibold text-ink-950">Cova Pro Clean — Admin</h1>
        <p className="mt-1 text-sm text-ink-800/70">Sign in to manage bookings.</p>

        <label htmlFor="password" className="mt-6 block text-sm font-medium text-ink-950">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mt-1"
        />

        {error && <p className="mt-3 text-sm text-coral-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-pine-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
