'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { AssetSourceComponentProps } from '@sanity/types'

interface ImageEntry {
  path: string
  filename: string
}

interface Category {
  name: string
  images: ImageEntry[]
}

interface ManifestResponse {
  categories: Category[]
}

const PAGE_SIZE = 60

// Valid React component icon for Sanity v5
function FarmIcon() {
  return <span>🌿</span>
}

export function FarmPhotoAssetSource({ onSelect, onClose }: AssetSourceComponentProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selecting, setSelecting] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/images/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: ManifestResponse) => {
        setCategories(data.categories)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load farm photos.')
        setLoading(false)
      })
  }, [])

  const allImages = useMemo(() => {
    return categories.flatMap((c) => c.images.map((img) => ({ ...img, category: c.name })))
  }, [categories])

  const filtered = useMemo(() => {
    let imgs = activeCategory === 'all'
      ? allImages
      : allImages.filter((img) => img.category === activeCategory)

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      imgs = imgs.filter((img) => img.filename.toLowerCase().includes(q))
    }
    return imgs
  }, [allImages, activeCategory, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [activeCategory, search])

  const handleSelect = useCallback(async (img: ImageEntry) => {
    if (selecting) return
    setSelecting(img.path)
    try {
      const res = await fetch(img.path)
      const blob = await res.blob()
      const file = new globalThis.File([blob], img.filename, { type: blob.type })
      onSelect([{ kind: 'file', value: file as unknown as string }])
    } catch {
      alert('Failed to load image. Please try again.')
      setSelecting(null)
    }
  }, [selecting, onSelect])

  const styles = {
    overlay: {
      position: 'fixed' as const,
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
    },
    modal: {
      background: '#1a1a1a',
      borderRadius: 8,
      width: '95vw',
      maxWidth: 1400,
      height: '85vh',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      color: '#fff',
      position: 'relative' as const,
    },
    header: {
      padding: '16px 20px',
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    },
    title: {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: '#999',
      fontSize: 24,
      cursor: 'pointer',
      padding: '0 4px',
      lineHeight: 1,
    },
    toolbar: {
      padding: '12px 20px',
      borderBottom: '1px solid #333',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 10,
      flexShrink: 0,
    },
    toolbarTop: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    searchInput: {
      background: '#2a2a2a',
      border: '1px solid #444',
      borderRadius: 4,
      color: '#fff',
      padding: '6px 12px',
      fontSize: 14,
      width: 220,
    },
    tabs: {
      display: 'flex',
      gap: 8,
      flexWrap: 'nowrap' as const,
      overflowX: 'auto' as const,
      paddingBottom: 4,
    },
    tab: (active: boolean) => ({
      background: active ? '#2563eb' : '#2a2a2a',
      border: 'none',
      borderRadius: 4,
      color: active ? '#fff' : '#aaa',
      padding: '4px 10px',
      fontSize: 12,
      cursor: 'pointer',
      textTransform: 'capitalize' as const,
      whiteSpace: 'nowrap' as const,
      flexShrink: 0,
    }),
    countLabel: {
      fontSize: 12,
      color: '#888',
      flexShrink: 0,
    },
    grid: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: 16,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: 12,
      alignContent: 'start',
    },
    imgCard: (isSelecting: boolean) => ({
      cursor: isSelecting ? 'wait' : 'pointer',
      borderRadius: 6,
      overflow: 'hidden',
      background: '#2a2a2a',
      border: '2px solid transparent',
      transition: 'border-color 0.15s',
      position: 'relative' as const,
    }),
    imgThumb: (src: string) => ({
      width: '100%',
      height: '180px',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover' as const,
      backgroundPosition: 'center' as const,
      backgroundRepeat: 'no-repeat' as const,
      backgroundColor: '#2a2a2a',
    }),
    imgLabel: {
      padding: '4px 6px',
      fontSize: 10,
      color: '#888',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    footer: {
      borderTop: '1px solid #333',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      fontSize: 13,
      color: '#888',
    },
    pageBtn: (disabled: boolean) => ({
      background: disabled ? '#222' : '#2a2a2a',
      border: '1px solid #444',
      borderRadius: 4,
      color: disabled ? '#555' : '#ccc',
      padding: '4px 12px',
      cursor: disabled ? 'default' : 'pointer',
      fontSize: 13,
    }),
  }

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>🌿 Farm Photos</h2>
          <button style={styles.closeBtn} onClick={onClose} title="Close">×</button>
        </div>

        <div style={styles.toolbar}>
          <div style={styles.toolbarTop}>
            <input
              ref={searchRef}
              style={styles.searchInput}
              type="text"
              placeholder="Search by filename…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span style={styles.countLabel}>{filtered.length} photos</span>
          </div>
          <div style={styles.tabs}>
            <button
              style={styles.tab(activeCategory === 'all')}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                style={styles.tab(activeCategory === c.name)}
                onClick={() => setActiveCategory(c.name)}
              >
                {c.name} ({c.images.length})
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            Loading farm photos…
          </div>
        )}

        {error && (
          <div style={{ padding: 40, textAlign: 'center', color: '#f87171' }}>{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            No photos found.
          </div>
        )}

        {!loading && !error && paged.length > 0 && (
          <div style={styles.grid}>
            {paged.map((img) => (
              <div
                key={img.path}
                style={{
                  ...styles.imgCard(selecting === img.path),
                  borderColor: selecting === img.path ? '#2563eb' : 'transparent',
                  opacity: selecting && selecting !== img.path ? 0.5 : 1,
                }}
                onClick={() => handleSelect(img)}
                title={img.filename}
              >
                <div
                  style={styles.imgThumb(img.path)}
                  role="img"
                  aria-label={img.filename}
                />
                <div style={styles.imgLabel}>{img.filename}</div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={styles.footer}>
            <button
              style={styles.pageBtn(page <= 1)}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              style={styles.pageBtn(page >= totalPages)}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next →
            </button>
          </div>
        )}

        {selecting && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            color: '#fff',
            fontSize: 16,
          }}>
            Loading image…
          </div>
        )}
      </div>
    </div>
  )
}

export const farmPhotoAssetSource = {
  name: 'farmPhotos',
  title: 'Farm Photos',
  component: FarmPhotoAssetSource,
  icon: FarmIcon,
}
