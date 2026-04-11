import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, basename, extname, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const client = createClient({
  projectId: 'd05q9u13',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const SOURCE_DIR = '/tmp/farm-photos-compressed'
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const MAX_CONCURRENT = 3

// Recursively collect all image files
function collectFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      collectFiles(full, files)
    } else if (SUPPORTED_EXTS.has(extname(entry).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

// Run up to `limit` promises concurrently
async function runConcurrent(tasks, limit) {
  const results = []
  const executing = new Set()

  for (const task of tasks) {
    const p = task().then(r => {
      executing.delete(p)
      return r
    })
    executing.add(p)
    results.push(p)

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}

async function uploadFile(filePath, index, total) {
  const filename = basename(filePath)
  const nameWithoutExt = basename(filePath, extname(filePath))
  const rel = relative(SOURCE_DIR, filePath)
  // Category = first subfolder name (e.g. "pigs", "goats")
  const category = rel.includes('/') ? rel.split('/')[0] : 'uncategorized'
  const mimeType = extname(filePath).toLowerCase() === '.png'
    ? 'image/png'
    : extname(filePath).toLowerCase() === '.webp'
    ? 'image/webp'
    : 'image/jpeg'

  console.log(`Uploading ${index}/${total}: ${rel}`)

  try {
    const buffer = readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, {
      filename: filename,
      contentType: mimeType,
    })

    // Patch the asset to add title and description with category info
    await client
      .patch(asset._id)
      .set({
        'originalFilename': filename,
        'title': nameWithoutExt,
        'description': `Category: ${category}`,
        'altText': nameWithoutExt.replace(/-/g, ' '),
      })
      .commit()

    return { success: true, file: rel }
  } catch (err) {
    console.error(`  FAILED ${rel}: ${err.message}`)
    return { success: false, file: rel, error: err.message }
  }
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN env var not set')
    process.exit(1)
  }

  console.log('Collecting files from', SOURCE_DIR)
  const files = collectFiles(SOURCE_DIR)
  const total = files.length
  console.log(`Found ${total} images to upload\n`)

  let idx = 0
  const tasks = files.map(f => async () => {
    idx++
    return uploadFile(f, idx, total)
  })

  const results = await runConcurrent(tasks, MAX_CONCURRENT)

  const uploaded = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log('\n========== UPLOAD COMPLETE ==========')
  console.log(`Total uploaded: ${uploaded}`)
  console.log(`Total failed:   ${failed}`)

  if (failed > 0) {
    console.log('\nFailed files:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.file}: ${r.error}`)
    })
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
