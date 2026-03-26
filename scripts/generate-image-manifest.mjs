#!/usr/bin/env node
/**
 * generate-image-manifest.mjs
 * Scans public/images/ and outputs public/images/manifest.json
 * Run before `next build` so Vercel has the manifest available at runtime.
 */

import { readdirSync, statSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const imagesDir = join(rootDir, 'public', 'images')

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

function getExt(filename) {
  const idx = filename.lastIndexOf('.')
  return idx >= 0 ? filename.slice(idx).toLowerCase() : ''
}

function scanDir(dir, urlPrefix) {
  const entries = []
  let items
  try {
    items = readdirSync(dir)
  } catch {
    return entries
  }

  for (const item of items) {
    const fullPath = join(dir, item)
    let stat
    try {
      stat = statSync(fullPath)
    } catch {
      continue
    }
    if (stat.isDirectory()) {
      const sub = scanDir(fullPath, `${urlPrefix}/${item}`)
      entries.push(...sub)
    } else if (IMAGE_EXTENSIONS.has(getExt(item))) {
      entries.push({ path: `${urlPrefix}/${item}`, filename: item })
    }
  }

  return entries.sort((a, b) => a.filename.localeCompare(b.filename))
}

// Read top-level entries
let topLevel
try {
  topLevel = readdirSync(imagesDir)
} catch (err) {
  console.error(`Failed to read ${imagesDir}:`, err.message)
  process.exit(1)
}

const categories = []
let totalImages = 0

for (const item of topLevel.sort()) {
  const fullPath = join(imagesDir, item)
  let stat
  try {
    stat = statSync(fullPath)
  } catch {
    continue
  }
  // Skip non-directories (logo files, .md files, manifest itself, etc.)
  if (!stat.isDirectory()) continue

  const images = scanDir(fullPath, `/images/${item}`)
  if (images.length > 0) {
    categories.push({ name: item, images })
    totalImages += images.length
  }
}

const manifest = { categories }
const outputPath = join(imagesDir, 'manifest.json')
writeFileSync(outputPath, JSON.stringify(manifest, null, 2))

console.log(`✅ Image manifest generated: ${categories.length} categories, ${totalImages} images`)
console.log(`   Output: ${outputPath}`)
