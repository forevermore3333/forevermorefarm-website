'use client';

import { useState } from 'react';

interface Subscriber {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  created_at: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function exportCSV(subscribers: Subscriber[]) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Source', 'Signed Up'];
  const rows = subscribers.map((s) => [
    s.id,
    s.name,
    s.email,
    s.phone ?? '',
    s.source ?? '',
    formatDate(s.created_at),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'subscribers.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminSubscribersPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
        setAuthed(true);
      } else if (res.status === 401) {
        setError('Incorrect password');
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3EC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-serif font-bold text-[#1B3A2D] mb-6 text-center tracking-tight">
            Admin Access
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-[#C9A96E] rounded-lg px-4 py-3 text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#1B3A2D] placeholder:text-[#C9A96E]"
              required
            />
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1B3A2D] hover:bg-[#4A6741] text-[#F7F3EC] font-semibold rounded-lg px-4 py-3 transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1B3A2D] tracking-tight">
              Subscribers
            </h1>
            <p className="text-[#4A6741] mt-1 text-sm">
              {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => exportCSV(subscribers)}
            className="bg-[#C9A96E] hover:bg-[#8B6914] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1B3A2D] text-[#F7F3EC]">
              <tr>
                {['ID', 'Name', 'Email', 'Phone', 'Source', 'Signed Up'].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F3EC]'}>
                  <td className="px-4 py-3 text-[#8B6914] font-mono">{s.id}</td>
                  <td className="px-4 py-3 text-[#1C1C1C] font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-[#1C1C1C]">{s.email}</td>
                  <td className="px-4 py-3 text-[#1C1C1C]">{s.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-[#4A6741]">{s.source ?? '—'}</td>
                  <td className="px-4 py-3 text-[#1C1C1C]">{formatDate(s.created_at)}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#C9A96E]">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards — visible only on mobile */}
        <div className="md:hidden flex flex-col gap-3">
          {subscribers.length === 0 && (
            <p className="text-center text-[#C9A96E] py-8">No subscribers yet.</p>
          )}
          {subscribers.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-lg font-semibold text-[#1B3A2D]">{s.name}</span>
                <span className="text-xs text-[#8B6914] font-mono">#{s.id}</span>
              </div>
              <a
                href={`mailto:${s.email}`}
                className="text-sm text-[#1B3A2D] underline underline-offset-2 break-all"
              >
                {s.email}
              </a>
              {s.phone && (
                <a href={`tel:${s.phone}`} className="text-sm text-[#4A6741]">
                  {s.phone}
                </a>
              )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F7F3EC]">
                <span className="text-xs text-[#4A6741]">{s.source ?? 'homepage'}</span>
                <span className="text-xs text-[#1C1C1C]/50">{formatDate(s.created_at)}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
