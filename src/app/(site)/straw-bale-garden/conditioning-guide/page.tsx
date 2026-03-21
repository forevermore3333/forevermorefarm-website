import Link from 'next/link'
import GuideDownload from '@/components/GuideDownload'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Straw Bale Conditioning Schedule — 12-Day Guide | Forevermore Farm',
  description:
    'The complete 12-day straw bale conditioning schedule from certified instructor Concetta West. Learn how to condition straw bales for planting with a day-by-day fertilizer and watering guide.',
  keywords: [
    'straw bale conditioning schedule',
    'how to condition straw bales',
    'straw bale gardening guide',
    'straw bale fertilizer schedule',
    '12 day straw bale conditioning',
  ],
  openGraph: {
    type: 'website',
    title: 'Straw Bale Conditioning Schedule — 12-Day Guide | Forevermore Farm',
    description:
      'The complete 12-day straw bale conditioning schedule from certified instructor Concetta West. Learn how to condition straw bales for planting.',
    images: [
      {
        url: '/images/garden-build/bales-compost-added-stakes.jpg',
        width: 1200,
        height: 630,
        alt: 'Straw bales being conditioned at Forevermore Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Straw Bale Conditioning Schedule — 12-Day Guide | Forevermore Farm',
    description:
      'The complete 12-day straw bale conditioning schedule from certified instructor Concetta West.',
    images: ['/images/garden-build/bales-compost-added-stakes.jpg'],
  },
  alternates: {
    canonical: '/straw-bale-garden/conditioning-guide',
  },
}

const schedule = [
  { day: '1', fertilizer: '½ cup high-nitrogen per bale', water: 'Water to full saturation', note: 'Dry bales absorb a lot — keep going until water runs from the bottom.' },
  { day: '2', fertilizer: '—', water: 'Water to saturation', note: '' },
  { day: '3', fertilizer: '½ cup per bale', water: 'Water to wash in', note: '' },
  { day: '4', fertilizer: '—', water: 'Water to saturation', note: '' },
  { day: '5', fertilizer: '½ cup per bale', water: 'Warm water if possible', note: '' },
  { day: '6', fertilizer: '—', water: 'Warm water', note: 'You may notice a sweet, earthy aroma and warmth building inside the bale. This is exactly right.' },
  { day: '7', fertilizer: '¼ cup per bale', water: 'Water', note: 'Most active phase begins. Bale interior can run 10–40°F hotter than outside air.' },
  { day: '8', fertilizer: '¼ cup per bale', water: 'Water', note: '' },
  { day: '9', fertilizer: '¼ cup per bale', water: 'Water', note: '' },
  { day: '10', fertilizer: '1 cup 10-10-10 or balanced all-purpose per bale', water: 'Water to wash in', note: 'Any balanced all-purpose fertilizer works here. No herbicide — ever.' },
  { day: '11', fertilizer: '—', water: 'Rest day — get plants or seeds ready', note: '' },
  { day: '12', fertilizer: 'Plant!', water: 'Water all new seedlings', note: '' },
]

export default function ConditioningGuide() {
  return (
    <>
      {/* Hero */}
      <section className="bg-farm-green py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-farm-cream/50 text-sm mb-8">
            <Link href="/straw-bale-garden" className="hover:text-farm-cream transition-colors">
              Straw Bale Garden
            </Link>
            <span className="mx-2">›</span>
            <span className="text-farm-cream/80">Conditioning Guide</span>
          </nav>
          <span className="text-xs font-medium tracking-widest text-farm-cream/60 uppercase">
            Certified Instructor Guide
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-farm-cream mt-4 mb-6 leading-tight">
            How to Condition Straw Bales
          </h1>
          <p className="text-farm-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
            The complete 12-day schedule from Concetta West — certified straw bale gardening instructor trained directly under Joel Karsten and featured on PBS Volunteer Gardener.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#schedule"
              className="inline-block bg-farm-cream text-farm-green px-7 py-3 rounded-sm text-sm font-medium hover:bg-farm-cream/90 transition-colors"
            >
              Jump to the Schedule
            </a>
            <a
              href="/downloads/straw-bale-conditioning-guide.pdf"
              download="straw-bale-conditioning-guide.pdf"
              className="inline-block border border-farm-cream/40 text-farm-cream px-7 py-3 rounded-sm text-sm font-medium hover:bg-farm-cream/10 transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* What Is Conditioning */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Why It Matters</span>
          <h2 className="font-serif text-3xl text-farm-green mt-3 mb-6">What Is Conditioning?</h2>
          <div className="prose-farm space-y-4 text-farm-charcoal/80 leading-relaxed">
            <p>
              Conditioning is the process that transforms a plain straw bale into a living, thriving growing medium. It jumpstarts decomposition inside the bale, activating the bacteria that break down straw into a warm, nutrient-dense environment perfect for plant roots.
            </p>
            <p>
              Think of it this way: the bale becomes its own raised bed. Over 12 days, you&apos;re feeding those bacteria — with nitrogen fertilizer and water — until the interior is alive, hot, and ready to grow anything you put in it. By planting day, you&apos;ve created something extraordinary: a weed-free, disease-free, richly fertile growing space sitting right on top of whatever ground you started with.
            </p>
            <p>
              Conditioning is not optional. Skipping or shortcutting it means cold, inhospitable bales that won&apos;t support young roots. Do it right, and your plants will reward you.
            </p>
          </div>
        </div>
      </section>

      {/* Timing */}
      <section className="py-16 px-4 bg-farm-tan/20">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8">
          <div className="bg-farm-cream p-6 rounded-sm border-t-4 border-farm-green">
            <h3 className="font-serif text-xl text-farm-green mb-3">Duration</h3>
            <p className="text-farm-charcoal/70 text-sm leading-relaxed">
              Conditioning takes <strong className="text-farm-charcoal">10–12 days</strong>. Plan your schedule backward from your target planting date.
            </p>
          </div>
          <div className="bg-farm-cream p-6 rounded-sm border-t-4 border-farm-tan">
            <h3 className="font-serif text-xl text-farm-green mb-3">When to Start</h3>
            <p className="text-farm-charcoal/70 text-sm leading-relaxed">
              For a <strong className="text-farm-charcoal">April 1st planting</strong>, start conditioning in <strong className="text-farm-charcoal">mid-March</strong>. Adjust for your first frost date and growing zone.
            </p>
          </div>
          <div className="bg-farm-cream p-6 rounded-sm border-t-4 border-farm-brown">
            <h3 className="font-serif text-xl text-farm-green mb-3">Position First</h3>
            <p className="text-farm-charcoal/70 text-sm leading-relaxed">
              <strong className="text-farm-charcoal">Set your bales before you start.</strong> Once saturated with water, they become very heavy and are difficult to reposition.
            </p>
          </div>
        </div>
      </section>

      {/* Choosing Your Fertilizer */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Before You Begin</span>
          <h2 className="font-serif text-3xl text-farm-green mt-3 mb-8">Choosing Your Fertilizer</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-farm-tan/10 p-6 rounded-sm">
              <h3 className="font-serif text-xl text-farm-green mb-3">Conventional</h3>
              <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                A high-nitrogen lawn fertilizer works well — look for something with a high first number (like 30-0-4 or similar). Apply according to the schedule below.
              </p>
            </div>
            <div className="bg-farm-tan/10 p-6 rounded-sm">
              <h3 className="font-serif text-xl text-farm-green mb-3">Organic</h3>
              <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                Blood meal or feather meal both work effectively. Note: these can attract flies during the active conditioning days. Completely normal — it passes.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-sm p-5 space-y-2">
            <h4 className="font-serif text-farm-charcoal font-medium">Two Hard Rules</h4>
            <ul className="text-sm text-farm-charcoal/80 leading-relaxed space-y-1 list-disc list-inside">
              <li><strong>No herbicide or weed killer</strong> — even fertilizers labeled &ldquo;weed &amp; feed.&rdquo; This will harm your plants.</li>
              <li><strong>No fresh manure</strong> — it introduces pathogens and will burn rather than feed.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 12-Day Schedule */}
      <section id="schedule" className="py-20 px-4 bg-farm-charcoal scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-farm-cream/50 uppercase">The Method</span>
            <h2 className="font-serif text-3xl md:text-4xl text-farm-cream mt-3">The 12-Day Conditioning Schedule</h2>
            <p className="text-farm-cream/60 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Water until it runs out the bottom. Skip watering on rainy days, but keep the fertilizer schedule. Warm water speeds things up on cool days.
            </p>
          </div>

          {/* Mobile-friendly schedule cards */}
          <div className="block md:hidden space-y-3">
            {schedule.map((row) => (
              <div key={row.day} className={`rounded-sm p-4 ${row.day === '12' ? 'bg-farm-green' : 'bg-farm-cream/10'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-serif text-2xl leading-none ${row.day === '12' ? 'text-farm-cream' : 'text-farm-tan'}`}>
                    {row.day === '12' ? '✓' : row.day}
                  </span>
                  <span className={`text-xs font-medium tracking-widest uppercase ${row.day === '12' ? 'text-farm-cream' : 'text-farm-cream/50'}`}>
                    Day {row.day}
                  </span>
                </div>
                <div className="space-y-1 pl-9">
                  {row.fertilizer !== '—' && row.fertilizer !== 'Plant!' && (
                    <p className="text-farm-cream/90 text-sm">
                      <span className="text-farm-cream/50 text-xs uppercase tracking-wide">Fertilizer:</span>{' '}
                      {row.fertilizer}
                    </p>
                  )}
                  {row.fertilizer === 'Plant!' && (
                    <p className="text-farm-cream font-medium text-sm">🌱 Plant!</p>
                  )}
                  <p className="text-farm-cream/80 text-sm">
                    <span className="text-farm-cream/50 text-xs uppercase tracking-wide">Water:</span>{' '}
                    {row.water}
                  </p>
                  {row.note && (
                    <p className="text-farm-cream/50 text-xs leading-relaxed italic mt-1">{row.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-sm border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-farm-green/60 text-farm-cream/70 text-xs uppercase tracking-widest">
                  <th className="text-left px-5 py-4 w-16">Day</th>
                  <th className="text-left px-5 py-4">Fertilizer</th>
                  <th className="text-left px-5 py-4">Water</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={row.day}
                    className={`border-t border-white/5 ${
                      row.day === '12'
                        ? 'bg-farm-green text-farm-cream'
                        : i % 2 === 0
                        ? 'bg-farm-cream/5'
                        : 'bg-farm-cream/10'
                    }`}
                  >
                    <td className={`px-5 py-4 font-serif text-2xl leading-none ${row.day === '12' ? 'text-farm-cream' : 'text-farm-tan'}`}>
                      {row.day === '12' ? '✓' : row.day}
                    </td>
                    <td className={`px-5 py-4 leading-snug ${row.day === '12' ? 'text-farm-cream font-medium text-base' : 'text-farm-cream/80'}`}>
                      {row.fertilizer}
                      {row.note && (
                        <span className="block text-xs text-farm-cream/40 mt-1 italic">{row.note}</span>
                      )}
                    </td>
                    <td className={`px-5 py-4 leading-snug ${row.day === '12' ? 'text-farm-cream' : 'text-farm-cream/70'}`}>
                      {row.water}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What You'll Notice */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Signs It&apos;s Working</span>
          <h2 className="font-serif text-3xl text-farm-green mt-3 mb-10">What You&apos;ll Notice Along the Way</h2>
          <div className="space-y-6">
            <div className="flex gap-5 items-start">
              <span className="font-serif text-2xl text-farm-tan shrink-0 w-16 text-right leading-none pt-1">6</span>
              <div>
                <h3 className="font-serif text-lg text-farm-green mb-1">The Smell Arrives</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                  Around day 6, you&apos;ll notice a sweet, earthy aroma from the bale. You&apos;ll also feel warmth building inside if you press a hand in. Both are exactly what you want — bacterial activity is underway.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <span className="font-serif text-2xl text-farm-tan shrink-0 w-16 text-right leading-none pt-1">7–9</span>
              <div>
                <h3 className="font-serif text-lg text-farm-green mb-1">Peak Activity</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                  Days 7 through 9 are the most active. The interior of the bale can run <strong>10 to 40°F hotter</strong> than the outside air temperature. If you have a soil thermometer, check it — it&apos;s satisfying to watch.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <span className="font-serif text-xl text-farm-tan shrink-0 w-16 text-right leading-none pt-1">🍄</span>
              <div>
                <h3 className="font-serif text-lg text-farm-green mb-1">Mushrooms Are a Good Sign</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                  If mushrooms appear on or around the bale, that&apos;s confirmation the decomposition process is healthy. You can knock them over or leave them alone — they won&apos;t harm your plants.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <span className="font-serif text-2xl text-farm-tan shrink-0 w-16 text-right leading-none pt-1">10</span>
              <div>
                <h3 className="font-serif text-lg text-farm-green mb-1">Switching Fertilizer</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">
                  On day 10, switch to a balanced all-purpose fertilizer (10-10-10 or similar). Any balanced product works — just make absolutely sure it contains no herbicide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day 12 and Beyond */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Day 12</span>
          <h2 className="font-serif text-3xl text-farm-green mt-3 mb-6">Time to Plant</h2>
          <p className="text-farm-charcoal/70 leading-relaxed mb-6">
            Pull apart a section of the bale and look inside. If you see small black specks throughout the straw, that&apos;s confirmation of successful decomposition. That&apos;s what you were working toward.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed mb-10">
            What you&apos;ve built over these 12 days is remarkable: a growing medium that is nutrient-rich, warm, weed-free, disease-free, and alive with worms and beneficial bacteria. The structure is perfect for roots to push through.
          </p>

          <blockquote className="border-l-4 border-farm-tan pl-6 mb-10">
            <p className="font-serif text-2xl text-farm-charcoal italic leading-relaxed">
              &ldquo;It is a seedling paradise.&rdquo;
            </p>
            <footer className="mt-3 text-farm-charcoal/50 text-sm">— Concetta West</footer>
          </blockquote>

          <div className="bg-farm-tan/20 rounded-sm p-6">
            <h3 className="font-serif text-xl text-farm-green mb-3">Ready to plant? A few reminders:</h3>
            <ul className="text-farm-charcoal/70 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Wait until the bale interior cools below 99°F before transplanting seedlings</li>
              <li>Create holes with a trowel and fill with potting mix before placing starts</li>
              <li>Seeds can be planted directly into a thin layer of potting mix spread across the top</li>
              <li>Water daily — bales dry out faster than in-ground beds</li>
              <li>The decomposing interior feeds your plants continuously throughout the season</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Back link + nav */}
      <section className="py-8 px-4 bg-farm-tan/10 border-t border-farm-tan/30">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/straw-bale-garden"
            className="text-farm-green text-sm font-medium hover:text-farm-green/70 transition-colors flex items-center gap-2"
          >
            ← Back to the Straw Bale Garden
          </Link>
          <a
            href="/downloads/straw-bale-conditioning-guide.pdf"
            download="straw-bale-conditioning-guide.pdf"
            className="text-sm text-farm-charcoal/60 hover:text-farm-charcoal transition-colors underline underline-offset-2"
          >
            Download as PDF
          </a>
        </div>
      </section>

      {/* Lead Magnet Download */}
      <GuideDownload />
    </>
  )
}
