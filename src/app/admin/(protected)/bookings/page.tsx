'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import type { BookingRecord } from '@/lib/booking-types';
import { bookingStatuses, type BookingStatus } from '@/config/booking';

const statusColors: Record<BookingStatus, string> = {
  new: 'bg-pine-100 text-pine-800',
  awaiting_review: 'bg-sand-200 text-ink-800',
  quote_required: 'bg-coral-400/20 text-coral-700',
  awaiting_customer_confirmation: 'bg-sand-200 text-ink-800',
  confirmed: 'bg-pine-600 text-white',
  assigned: 'bg-pine-600 text-white',
  in_progress: 'bg-pine-700 text-white',
  completed: 'bg-ink-950 text-white',
  cancelled: 'bg-coral-600 text-white',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<BookingStatus | ''>('');
  const [draftNotes, setDraftNotes] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    if (cityFilter) params.set('city', cityFilter);
    return params.toString();
  }, [statusFilter, cityFilter]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/bookings?${query}`);
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      setBookings(json.bookings);
      setSupabaseConfigured(json.supabaseConfigured);
    } catch {
      setError('Could not load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const startEdit = (booking: BookingRecord) => {
    setExpandedId(booking.id);
    setDraftStatus(booking.status);
    setDraftNotes(booking.internalNotes ?? '');
  };

  const saveEdit = async (id: string) => {
    setSavingId(id);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: draftStatus, internalNotes: draftNotes }),
      });
      if (!res.ok) throw new Error('failed');
      setExpandedId(null);
      await load();
    } catch {
      setError('Could not save changes.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-ink-950">Bookings</h1>
        <a
          href="/api/admin/bookings/export"
          className="rounded-full border border-pine-200 px-4 py-2 text-sm font-medium text-pine-800"
        >
          Export CSV
        </a>
      </div>

      {!supabaseConfigured && (
        <p className="mt-4 rounded-xl2 bg-coral-400/10 p-4 text-sm text-coral-700">
          Supabase isn&apos;t configured yet, so no bookings can be stored or shown here. Add{' '}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> — see README &quot;Database
          setup&quot;.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input w-auto">
          <option value="">All statuses</option>
          {bookingStatuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        <input
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          placeholder="Filter by city"
          className="input w-auto"
        />
      </div>

      {error && <p className="mt-4 text-sm text-coral-600">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-xl2 border border-pine-100 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-pine-100 text-xs uppercase tracking-wide text-ink-800/60">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Requested date</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-800/60">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-800/60">
                  No bookings match these filters.
                </td>
              </tr>
            )}
            {bookings.map((booking) => (
              <Fragment key={booking.id}>
                <tr className="border-b border-pine-50 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{booking.bookingReference}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[booking.status]}`}>
                      {booking.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">{booking.serviceType}</td>
                  <td className="px-4 py-3">{booking.city}</td>
                  <td className="px-4 py-3">
                    {booking.customerFirstName} {booking.customerLastName}
                    <div className="text-xs text-ink-800/60">{booking.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    {booking.preferredDate} · {booking.preferredTimeWindow}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-800/60">{new Date(booking.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => (expandedId === booking.id ? setExpandedId(null) : startEdit(booking))}
                      className="text-xs font-semibold text-pine-700 underline"
                    >
                      {expandedId === booking.id ? 'Close' : 'Manage'}
                    </button>
                  </td>
                </tr>
                {expandedId === booking.id && (
                  <tr className="border-b border-pine-50 bg-sand-50">
                    <td colSpan={8} className="px-4 py-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr_auto] sm:items-start">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-ink-800/60">Status</label>
                          <select
                            value={draftStatus}
                            onChange={(e) => setDraftStatus(e.target.value as BookingStatus)}
                            className="input mt-1"
                          >
                            {bookingStatuses.map((s) => (
                              <option key={s} value={s}>
                                {s.replace(/_/g, ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-ink-800/60">Internal notes</label>
                          <textarea
                            value={draftNotes}
                            onChange={(e) => setDraftNotes(e.target.value)}
                            rows={3}
                            className="input mt-1"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => saveEdit(booking.id)}
                          disabled={savingId === booking.id}
                          className="mt-1 rounded-full bg-pine-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 sm:mt-6"
                        >
                          {savingId === booking.id ? 'Saving…' : 'Save'}
                        </button>
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-ink-800/70 sm:grid-cols-4">
                        <div>
                          <dt className="font-semibold text-ink-800/50">Phone</dt>
                          <dd>{booking.customerPhone}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink-800/50">Frequency</dt>
                          <dd>{booking.frequency}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink-800/50">Estimated total</dt>
                          <dd>{booking.estimatedTotal ? `€${booking.estimatedTotal}` : booking.pricingStatus}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink-800/50">Address</dt>
                          <dd>{booking.address}</dd>
                        </div>
                      </dl>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
