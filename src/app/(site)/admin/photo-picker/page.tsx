'use client';

import { useState, useMemo } from 'react';

interface ManifestImage {
  path: string;
  filename: string;
}

interface ManifestCategory {
  name: string;
  images: ManifestImage[];
}

interface Manifest {
  categories: ManifestCategory[];
}

const BASE_URL = 'https://forevermorefarmtn.com';
const PAGE_SIZE = 60;

export default function PhotoPickerPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setManifest(data);
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

  const allImages = useMemo(() => {
    if (!manifest) return [];
    return manifest.categories.flatMap((cat) => cat.images);
  }, [manifest]);

  const filteredImages = useMemo(() => {
    if (!manifest) return [];
    const base =
      activeCategory === 'all'
        ? allImages
        : (manifest.categories.find((c) => c.name === activeCategory)?.images ?? []);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter((img) => img.filename.toLowerCase().includes(q));
  }, [manifest, activeCategory, allImages, search]);

  const totalPages = Math.ceil(filteredImages.length / PAGE_SIZE);
  const paginated = filteredImages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  async function handleCopy(img: ManifestImage) {
    const url = `${BASE_URL}${img.path}`;
    try {
      await navigator.clipboard.writeText(url);
      setToast(`Copied!`);
      setTimeout(() => setToast(''), 2000);
    } catch {
      setToast('Copy failed');
      setTimeout(() => setToast(''), 2000);
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
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
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

  const categories = manifest?.categories.map((c) => c.name) ?? [];

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '24px' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#4caf50',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 15,
          zIndex: 9999,
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 4 }}>Photo Picker</h1>
        <p style={{ color: '#aaa', fontSize: 14, margin: 0 }}>
          Click any photo to copy its full URL to clipboard.
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by filename…"
          style={{
            background: '#2a2a2a',
            border: '1px solid #444',
            borderRadius: 8,
            color: '#fff',
            padding: '8px 14px',
            fontSize: 14,
            width: '100%',
            maxWidth: 360,
            outline: 'none',
          }}
        />
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 8,
        marginBottom: 16,
        scrollbarWidth: 'thin',
      }}>
        {['all', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              background: activeCategory === cat ? '#4caf50' : '#2a2a2a',
              color: activeCategory === cat ? '#fff' : '#ccc',
              border: 'none',
              borderRadius: 20,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: activeCategory === cat ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: '#888', fontSize: 13, marginBottom: 12 }}>
        {filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''}
        {totalPages > 1 && ` — page ${page} of ${totalPages}`}
      </p>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 12,
      }}>
        {paginated.map((img) => (
          <button
            key={img.path}
            onClick={() => handleCopy(img)}
            title={`Copy URL: ${BASE_URL}${img.path}`}
            style={{
              background: '#2a2a2a',
              border: '1px solid #333',
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
              transition: 'border-color 0.15s',
            }}
          >
            <img
              src={img.path}
              alt={img.filename}
              style={{ height: 180, width: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              padding: '6px 8px',
              fontSize: 11,
              color: '#aaa',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {img.filename}
            </div>
          </button>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              background: '#2a2a2a',
              color: page === 1 ? '#555' : '#fff',
              border: '1px solid #444',
              borderRadius: 8,
              padding: '8px 16px',
              cursor: page === 1 ? 'default' : 'pointer',
              fontSize: 14,
            }}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | string)[]>((acc, p, idx, arr) => {
              if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('…');
              acc.push(p);
              return acc;
            }, [])
            .map((item, idx) =>
              item === '…' ? (
                <span key={`ellipsis-${idx}`} style={{ color: '#555', padding: '8px 4px', fontSize: 14 }}>…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item as number)}
                  style={{
                    background: page === item ? '#4caf50' : '#2a2a2a',
                    color: '#fff',
                    border: '1px solid #444',
                    borderRadius: 8,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: page === item ? 600 : 400,
                  }}
                >
                  {item}
                </button>
              )
            )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              background: '#2a2a2a',
              color: page === totalPages ? '#555' : '#fff',
              border: '1px solid #444',
              borderRadius: 8,
              padding: '8px 16px',
              cursor: page === totalPages ? 'default' : 'pointer',
              fontSize: 14,
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
