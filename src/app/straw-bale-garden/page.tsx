import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import EmailCapture from '@/components/EmailCapture'
import Link from 'next/link'

export const metadata = {
  title: 'Straw Bale Gardening | Forevermore Farm',
  description: 'Learn straw bale gardening from a certified instructor. Concetta West studied under Joel Karsten and grew a 30-member CSA from her very first straw bale garden.',
}

const steps = [
  {
    number: '01',
    title: 'Choose Your Bales',
    body: 'Use straw bales — not hay. Hay contains seeds that will sprout and compete with your plants. Wheat, oat, or barley straw all work well. Orient bales with the cut ends facing up — this is where roots will grow.',
    image: '/images/garden-build/trailer-full-straw-bales-arrive.jpg',
    imageAlt: 'Trailer full of straw bales arriving at Forevermore Farm',
  },
  {
    number: '02',
    title: 'Condition the Bales',
    body: 'Conditioning triggers decomposition inside the bale, creating a warm, nutrient-rich growing medium. For 12 days, alternate watering and applying a high-nitrogen fertilizer (blood meal or ammonium nitrate). The bale interior will heat up — this is good. It means it\'s working.',
    image: '/images/garden-build/bales-compost-added-stakes.jpg',
    imageAlt: 'Straw bales being conditioned with compost and fertilizer',
  },
  {
    number: '03',
    title: 'Plant Your Garden',
    body: 'Once the bale cools (below 99°F), you\'re ready to plant. Create holes with a trowel or your hand and fill with potting mix before transplanting starts. Seeds can be planted directly into a thin layer of potting mix spread across the top. Water daily — bales dry out faster than soil.',
    image: '/images/garden-build/concetta-placing-bales-golden-hour.jpg',
    imageAlt: 'Concetta working in the straw bale garden at golden hour',
  },
  {
    number: '04',
    title: 'Build a Trellis',
    body: 'Tall plants like tomatoes, cucumbers, and beans need support. Run stakes at each end of your bale rows and string wire or twine horizontally every 10 inches. The bale rows naturally become the base of a vertical growing system — maximizing yield in a small footprint.',
    image: '/images/garden-build/garden-pergola-interior-complete.jpg',
    imageAlt: 'Completed pergola garden structure with trellis system',
  },
  {
    number: '05',
    title: 'Grow & Harvest',
    body: 'Water deeply each day. Bale gardens are highly productive — the decomposing straw continuously feeds your plants. Tomatoes, squash, peppers, herbs, cucumbers, and melons all thrive. At Forevermore, we run the full season from late spring through first frost.',
    image: '/images/garden-build/raised-beds-filled-straw-wide.jpg',
    imageAlt: 'Raised beds filled and ready for growing season',
  },
  {
    number: '06',
    title: 'Close the Loop',
    body: 'Nothing goes to waste. After the season, the partially composted bales go straight to the compost pile or directly onto garden beds as mulch. Next year\'s soil is richer for it. That\'s the straw bale method — it feeds the garden and improves the land at the same time.',
    image: '/images/garden-build/olin-concetta-working-garden.jpg',
    imageAlt: 'Olin and Concetta working together in the completed garden',
  },
]

const benefits = [
  { title: 'No Soil Needed', body: 'Grow anywhere — gravel, concrete, rocky ground. The bale is the garden bed.' },
  { title: 'Simple Setup', body: 'No tilling, no raised bed lumber, no hauling cubic yards of soil. Bales arrive, you condition them, you plant.' },
  { title: 'Plant Anywhere', body: 'Patio, driveway, field, hillside. If you can set a bale there, you can grow there.' },
  { title: 'Fewer Weeds', body: 'Weed pressure is dramatically lower. You\'re growing in straw, not native soil loaded with weed seeds.' },
  { title: 'No Crop Rotation', body: 'Because you start fresh with new bales each season, the soil disease problems that require crop rotation simply don\'t exist.' },
  { title: 'High Yield', body: 'The warm, decomposing interior of a conditioned bale is extraordinarily fertile. Plants grow fast and produce abundantly.' },
]

export default function StrawBaleGarden() {
  return (
    <>
      <HeroSection
        title="The Straw Bale Method"
        subtitle="Grow anywhere. No soil required. Concetta has been doing this for over a decade."
        bgImage="/images/garden-build/garden-enclosure-wide-blue-sky.jpg"
        ctaText="Learn from Concetta"
        ctaHref="#workshops"
      />

      {/* Concetta intro */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-medium tracking-widest text-farm-brown uppercase">From the Instructor</span>
            <h2 className="font-serif text-3xl text-farm-green mt-3 mb-6">Concetta West</h2>
            <blockquote className="border-l-4 border-farm-green pl-6 mb-6">
              <p className="font-serif text-xl text-farm-charcoal leading-relaxed italic">
                &ldquo;10+ years ago I had the honor of attending a straw bale gardening class taught by Joel Karsten. His methods inspired and equipped me to grow a market garden and 30-member CSA with the produce from my very first Straw Bale Garden in Washington State.&rdquo;
              </p>
              <footer className="mt-4 text-farm-charcoal/60 text-sm">— Concetta West, Certified Straw Bale Gardening Instructor</footer>
            </blockquote>
            <p className="text-farm-charcoal/70 leading-relaxed">
              Concetta is one of a small number of certified instructors trained directly under Joel Karsten — the creator of the straw bale gardening method. She&apos;s been practicing and teaching this technique for over a decade, across two states and two different growing zones.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image
              src="/images/garden-build/concetta-placing-bales-golden-hour.jpg"
              alt="Concetta placing straw bales in the garden at golden hour"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green text-center mb-4">Why Straw Bale?</h2>
          <p className="text-center text-farm-charcoal/60 mb-12 max-w-xl mx-auto">Five reasons this method changes how people think about growing food.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-farm-cream p-6 rounded-sm">
                <h3 className="font-serif text-lg text-farm-green mb-2">{b.title}</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green text-center mb-4">How It Works</h2>
          <p className="text-center text-farm-charcoal/60 mb-16 max-w-xl mx-auto">Six steps from empty bale to full harvest. This is the exact method Concetta teaches.</p>
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={step.number} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <span className="font-serif text-6xl text-farm-tan leading-none">{step.number}</span>
                  <h3 className="font-serif text-2xl text-farm-green mt-2 mb-4">{step.title}</h3>
                  <p className="text-farm-charcoal/70 leading-relaxed">{step.body}</p>
                </div>
                <div className={`relative aspect-[4/3] rounded-sm overflow-hidden shadow-md ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image src={step.image} alt={step.imageAlt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garden build gallery */}
      <section className="py-16 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-farm-charcoal text-center mb-10">The Garden at Forevermore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/garden-enclosure-wide-blue-sky.jpg" alt="Garden enclosure exterior" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/garden-pergola-interior-complete.jpg" alt="Garden pergola interior" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/olin-family-filling-beds.jpg" alt="Family building the garden together" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/garden-enclosure-closeup-frame.jpg" alt="Garden frame construction detail" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Workshops CTA */}
      <section id="workshops" className="py-24 px-4 bg-farm-green">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-medium tracking-widest text-farm-cream/60 uppercase">This Season</span>
          <h2 className="font-serif text-3xl md:text-4xl text-farm-cream mt-3 mb-6">Workshops with Concetta</h2>
          <p className="text-farm-cream/80 leading-relaxed mb-8">
            Learn straw bale gardening hands-on at Forevermore Farm. Small groups, real instruction, real soil — or rather, real bales. Workshop dates will be announced to the email list first.
          </p>
          <Link href="/events" className="inline-block bg-farm-cream text-farm-green px-8 py-3 rounded-sm text-sm font-medium hover:bg-farm-cream/90 transition-colors">
            See Upcoming Events
          </Link>
        </div>
      </section>

      <EmailCapture
        headline="Workshop dates announced first."
        subtitle="Join the list and hear before anyone else."
      />
    </>
  )
}
