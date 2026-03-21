#!/usr/bin/env node
/**
 * Sanity seed script — Forevermore Farm
 *
 * Usage:
 *   SANITY_TOKEN=xxx node scripts/seed-sanity.mjs
 *
 * The script is idempotent: it will skip creation if a strawBaleGardenPage
 * document already exists in the dataset.
 *
 * Images: uploads local /public/images/garden-build/* files to Sanity's
 * asset pipeline and embeds references in the document.
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const PUBLIC_IMAGES = path.join(REPO_ROOT, 'public', 'images', 'garden-build')

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  SANITY_TOKEN env var is required.')
  console.error('    Get one from https://www.sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'd05q9u13',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

/** Upload a local image file to Sanity and return a reference object */
async function uploadImage(filename) {
  const filePath = path.join(PUBLIC_IMAGES, filename)
  if (!existsSync(filePath)) {
    console.warn(`  ⚠️  Image not found, skipping: ${filename}`)
    return null
  }
  console.log(`  📤 Uploading ${filename}...`)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
  }
}

/** Build an image object with an alt field */
async function uploadImageWithAlt(filename, alt) {
  const ref = await uploadImage(filename)
  if (!ref) return null
  return { ...ref, alt }
}

async function main() {
  console.log('🌾  Forevermore Farm — Sanity Seed Script')
  console.log(`    Project: d05q9u13 | Dataset: production\n`)

  // ── Check if singleton already exists ──────────────────────────────────────
  const existing = await client.fetch(`*[_type == "strawBaleGardenPage"][0]._id`)
  if (existing) {
    console.log(`✅  strawBaleGardenPage already exists (id: ${existing}). Nothing to do.`)
    console.log('    To re-seed, delete the document in Sanity Studio first.')
    process.exit(0)
  }

  // ── Upload images ──────────────────────────────────────────────────────────
  console.log('📸  Uploading images...')

  const instructorImg = await uploadImage('concetta-placing-bales-golden-hour.jpg')

  const stepImages = await Promise.all([
    uploadImageWithAlt('trailer-full-straw-bales-arrive.jpg', 'Trailer full of straw bales arriving at Forevermore Farm'),
    uploadImageWithAlt('bales-compost-added-stakes.jpg', 'Straw bales being conditioned with compost and fertilizer'),
    uploadImageWithAlt('concetta-placing-bales-golden-hour.jpg', 'Concetta working in the straw bale garden at golden hour'),
    uploadImageWithAlt('garden-pergola-interior-complete.jpg', 'Completed pergola garden structure with trellis system'),
    uploadImageWithAlt('raised-beds-filled-straw-wide.jpg', 'Raised beds filled and ready for growing season'),
    uploadImageWithAlt('olin-concetta-working-garden.jpg', 'Olin and Concetta working together in the completed garden'),
  ])

  const galleryImgFiles = [
    ['garden-enclosure-wide-blue-sky.jpg', 'Garden enclosure exterior with blue sky'],
    ['garden-pergola-interior-complete.jpg', 'Completed garden pergola interior'],
    ['olin-family-filling-beds.jpg', 'Family building the garden together'],
    ['garden-enclosure-closeup-frame.jpg', 'Garden frame construction detail'],
  ]
  const galleryPhotos = (
    await Promise.all(galleryImgFiles.map(([f, alt]) => uploadImageWithAlt(f, alt)))
  )
    .filter(Boolean)
    .map((img, i) => ({ ...img, _key: `gallery-${i}` }))

  // ── Build the document ─────────────────────────────────────────────────────
  console.log('\n📝  Creating strawBaleGardenPage document...')

  const doc = {
    _type: 'strawBaleGardenPage',
    _id: 'strawBaleGardenPage',

    // Hero
    heroTitle: 'The Straw Bale Method',
    heroSubtitle: 'Grow anywhere. No soil required. Concetta has been doing this for over a decade.',
    heroVideo: '/videos/garden-drone-reveal.mp4',
    heroImage: instructorImg
      ? { ...instructorImg, _type: 'image' }
      : undefined,
    heroCta: 'Learn from Concetta',
    heroCtaLink: '#workshops',

    // Instructor
    instructorName: 'Concetta West',
    instructorQuote:
      '10+ years ago I had the honor of attending a straw bale gardening class taught by Joel Karsten. His methods inspired and equipped me to grow a market garden and 30-member CSA with the produce from my very first Straw Bale Garden in Washington State.',
    instructorQuoteAttribution: 'Concetta West, Certified Straw Bale Gardening Instructor',
    instructorBio:
      "Concetta is one of a small number of certified instructors trained directly under Joel Karsten — the creator of the straw bale gardening method. She's been practicing and teaching this technique for over a decade, across two states and two different growing zones.",
    instructorImage: instructorImg ?? undefined,

    // Benefits
    benefitsTitle: 'Why Straw Bale?',
    benefitsSubtitle: 'Five reasons this method changes how people think about growing food.',
    benefits: [
      { _key: 'b1', title: 'No Soil Needed', body: 'Grow anywhere — gravel, concrete, rocky ground. The bale is the garden bed.' },
      { _key: 'b2', title: 'Simple Setup', body: 'No tilling, no raised bed lumber, no hauling cubic yards of soil. Bales arrive, you condition them, you plant.' },
      { _key: 'b3', title: 'Plant Anywhere', body: 'Patio, driveway, field, hillside. If you can set a bale there, you can grow there.' },
      { _key: 'b4', title: 'Fewer Weeds', body: "Weed pressure is dramatically lower. You're growing in straw, not native soil loaded with weed seeds." },
      { _key: 'b5', title: 'No Crop Rotation', body: "Because you start fresh with new bales each season, the soil disease problems that require crop rotation simply don't exist." },
      { _key: 'b6', title: 'High Yield', body: 'The warm, decomposing interior of a conditioned bale is extraordinarily fertile. Plants grow fast and produce abundantly.' },
    ],

    // Steps
    stepsTitle: 'How It Works',
    stepsSubtitle: 'Six steps from empty bale to full harvest. This is the exact method Concetta teaches.',
    steps: [
      {
        _key: 's1',
        number: '01',
        title: 'Choose Your Bales',
        body: 'Use straw bales — not hay. Hay contains seeds that will sprout and compete with your plants. Wheat, oat, or barley straw all work well. Orient bales with the cut ends facing up — this is where roots will grow.',
        image: stepImages[0] ?? undefined,
      },
      {
        _key: 's2',
        number: '02',
        title: 'Condition the Bales',
        body: "Conditioning triggers decomposition inside the bale, creating a warm, nutrient-rich growing medium. For 12 days, alternate watering and applying a high-nitrogen fertilizer (blood meal or ammonium nitrate). The bale interior will heat up — this is good. It means it's working.",
        image: stepImages[1] ?? undefined,
      },
      {
        _key: 's3',
        number: '03',
        title: 'Plant Your Garden',
        body: "Once the bale cools (below 99°F), you're ready to plant. Create holes with a trowel or your hand and fill with potting mix before transplanting starts. Seeds can be planted directly into a thin layer of potting mix spread across the top. Water daily — bales dry out faster than soil.",
        image: stepImages[2] ?? undefined,
      },
      {
        _key: 's4',
        number: '04',
        title: 'Build a Trellis',
        body: 'Tall plants like tomatoes, cucumbers, and beans need support. Run stakes at each end of your bale rows and string wire or twine horizontally every 10 inches. The bale rows naturally become the base of a vertical growing system — maximizing yield in a small footprint.',
        image: stepImages[3] ?? undefined,
      },
      {
        _key: 's5',
        number: '05',
        title: 'Grow & Harvest',
        body: 'Water deeply each day. Bale gardens are highly productive — the decomposing straw continuously feeds your plants. Tomatoes, squash, peppers, herbs, cucumbers, and melons all thrive. At Forevermore, we run the full season from late spring through first frost.',
        image: stepImages[4] ?? undefined,
      },
      {
        _key: 's6',
        number: '06',
        title: 'Close the Loop',
        body: "Nothing goes to waste. After the season, the partially composted bales go straight to the compost pile or directly onto garden beds as mulch. Next year's soil is richer for it. That's the straw bale method — it feeds the garden and improves the land at the same time.",
        image: stepImages[5] ?? undefined,
      },
    ],

    // Gallery
    galleryTitle: 'The Garden at Forevermore',
    galleryPhotos,

    // Workshop CTA
    workshopLabel: 'This Season',
    workshopTitle: 'Workshops with Concetta',
    workshopBody:
      'Learn straw bale gardening hands-on at Forevermore Farm. Small groups, real instruction, real soil — or rather, real bales. Workshop dates will be announced to the email list first.',
    workshopCtaText: 'See Upcoming Events',
    workshopCtaLink: '/events',

    // Email Capture
    emailHeadline: 'Workshop dates announced first.',
    emailSubtitle: 'Join the list and hear before anyone else.',
  }

  // Remove undefined values so Sanity doesn't choke
  const clean = JSON.parse(JSON.stringify(doc))

  const result = await client.createOrReplace(clean)
  console.log(`\n✅  Created document: ${result._id} (rev: ${result._rev})`)
  console.log('\n🎉  Seed complete! Open Sanity Studio to review the document.')
  console.log('    Studio path: /studio → Straw Bale Garden Page')
}

main().catch((err) => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
