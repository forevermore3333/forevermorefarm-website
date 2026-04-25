import type { Metadata } from 'next'
import Image from 'next/image'
import LearningCollectiveForm from './LearningCollectiveForm'

export const metadata: Metadata = {
  title: 'The Learning Collective | Forevermore Farm | Lyles, TN',
  description: 'A hands-on, community-centered learning program where families explore projects together and parents help guide the learning alongside their children.',
  openGraph: {
    type: 'website',
    title: 'The Learning Collective | Forevermore Farm',
    description: 'Learn Together. Lead Together. Grow Together. A hands-on learning community for families in Lyles, Tennessee.',
    images: [
      {
        url: '/images/garden/zinnias-sunflowers-white-tent.jpg',
        width: 1200,
        height: 630,
        alt: 'Flowers and the white tent at Forevermore Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Learning Collective | Forevermore Farm',
    description: 'Learn Together. Lead Together. Grow Together. A hands-on learning community for families.',
    images: ['/images/garden/zinnias-sunflowers-white-tent.jpg'],
  },
  alternates: {
    canonical: '/learning-collective',
  },
}

const programPoints = [
  'Broad, project-based learning for families',
  'Hands-on experiences for all ages',
  'Opportunities in animals, gardening, cooking, arts, life skills, leadership, wellness, and community projects',
  'Parents and guardians help guide small groups',
  'Clear expectations and structure provided',
  'Adults can grow into leadership roles over time',
  'No age limit',
  'Families who miss the first meeting can sign up online for more information',
]

export default function LearningCollectivePage() {
  return (
    <>
      <section className="relative min-h-[520px] flex items-center justify-center px-4 py-24 overflow-hidden">
        <Image
          src="/images/garden/zinnias-sunflowers-white-tent.jpg"
          alt="Flowers growing near the tent at Forevermore Farm"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-farm-charcoal/55" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-farm-cream">
          <p className="text-xs font-medium tracking-[0.35em] uppercase text-farm-tan mb-4">Forevermore Farm</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-5 drop-shadow-lg">The Learning Collective</h1>
          <p className="font-serif text-2xl md:text-3xl text-farm-cream/90 mb-8">Learn Together. Lead Together. Grow Together.</p>
          <p className="text-lg md:text-xl leading-relaxed text-farm-cream/85 max-w-3xl mx-auto">
            A hands-on, community-centered program where families explore meaningful projects, build practical skills, and grow together.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-12 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest text-farm-tan uppercase mb-4">A shared-learning community</p>
            <h2 className="font-serif text-3xl md:text-4xl text-farm-green mb-6">Learning is better together.</h2>
            <div className="space-y-5 text-farm-charcoal/75 leading-relaxed text-lg">
              <p>
                The Learning Collective is a community-based program where families explore hands-on projects together—from gardening and cooking to animals, art, leadership, and life skills—while parents and guardians take an active role in guiding the learning alongside their children.
              </p>
              <p>
                This is not a drop-off program. Parents and guardians are part of the experience, not just observers. Each family will be invited to help lead or support a small group in an area they know, enjoy, or are willing to learn alongside others.
              </p>
              <p>
                Clear guidelines and structure will be provided so everyone understands what is expected and how the learning process is guided. No special experience is required—just a willingness to participate, share, and grow.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-farm-tan/30 bg-white p-7 shadow-sm">
            <h3 className="font-serif text-2xl text-farm-green mb-5">What families can expect</h3>
            <ul className="space-y-3">
              {programPoints.map((point) => (
                <li key={point} className="flex gap-3 text-farm-charcoal/75 leading-relaxed">
                  <span className="text-farm-tan mt-1">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="interest-survey" className="py-20 px-4 bg-white/70">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <p className="text-xs font-medium tracking-widest text-farm-tan uppercase mb-4">Interest Survey</p>
          <h2 className="font-serif text-3xl md:text-4xl text-farm-green mb-5">Parent/Guardian Skills &amp; Interests Survey</h2>
          <p className="text-farm-charcoal/70 leading-relaxed">
            Please complete the survey below so we can better understand your family’s interests, strengths, and availability. Parents and guardians are an important part of the experience and will be invited to help lead small groups, support activities, and share their skills and interests.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <LearningCollectiveForm />
        </div>
      </section>
    </>
  )
}
