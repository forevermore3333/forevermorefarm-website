import { NextResponse } from 'next/server'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

interface ImageEntry {
  path: string
  filename: string
}

interface Category {
  name: string
  images: ImageEntry[]
}

function scanDirectory(dir: string, urlPrefix: string): ImageEntry[] {
  const entries: ImageEntry[] = []
  let items: string[]
  try {
    items = readdirSync(dir)
  } catch {
    return entries
  }

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      // Recurse into subdirectories, flatten into same category
      const sub = scanDirectory(fullPath, `${urlPrefix}/${item}`)
      entries.push(...sub)
    } else {
      const ext = item.toLowerCase().slice(item.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.has(ext)) {
        entries.push({
          path: `${urlPrefix}/${item}`,
          filename: item,
        })
      }
    }
  }

  return entries.sort((a, b) => a.filename.localeCompare(b.filename))
}

export async function GET() {
  const publicImagesDir = join(process.cwd(), 'public', 'images')

  let topLevel: string[]
  try {
    topLevel = readdirSync(publicImagesDir)
  } catch {
    return NextResponse.json({ categories: [] })
  }

  const categories: Category[] = []

  for (const item of topLevel.sort()) {
    const fullPath = join(publicImagesDir, item)
    let stat
    try {
      stat = statSync(fullPath)
    } catch {
      continue
    }
    if (!stat.isDirectory()) continue

    const images = scanDirectory(fullPath, `/images/${item}`)
    if (images.length > 0) {
      categories.push({ name: item, images })
    }
  }

  return NextResponse.json({ categories })
}
