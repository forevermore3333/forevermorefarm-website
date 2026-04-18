import type { Metadata } from 'next'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import EmailCapture from '@/components/EmailCapture'

type Section = {
  title: string
  intro: string
  paragraphs: string[]
  images: { src: string; alt: string; priority?: boolean }[]
}

export const metadata: Metadata = {
  title: 'Our Animals | Forevermore Farm | Lyles, TN',
  description: 'Meet the Nigerian Dwarf goats, Standard Rex rabbits, heritage hogs, Katahdin sheep, and laying flock cared for at Forevermore Farm in Lyles, Tennessee.',
  openGraph: {
    type: 'website',
    title: 'Our Animals | Forevermore Farm | Lyles, TN',
    description: 'Meet the Nigerian Dwarf goats, Standard Rex rabbits, heritage hogs, Katahdin sheep, and laying flock cared for at Forevermore Farm in Lyles, Tennessee.',
    images: [
      {
        url: '/images/goats/nigerian-dwarf-goat-kids-pasture-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Nigerian Dwarf goat kids at Forevermore Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Animals | Forevermore Farm | Lyles, TN',
    description: 'Meet the Nigerian Dwarf goats, Standard Rex rabbits, heritage hogs, Katahdin sheep, and laying flock cared for at Forevermore Farm in Lyles, Tennessee.',
    images: ['/images/goats/nigerian-dwarf-goat-kids-pasture-1.jpg'],
  },
  alternates: {
    canonical: '/our-animals',
  },
}

const sections: Section[] = [
  {
    title: 'Nigerian Dwarf Goats',
    intro: 'Curious, bright, and always looking for the next weak latch.',
    paragraphs: [
      "Good fencing is essential with goats. As my father always joked, 'If it won't hold water, it won't hold a goat.' He was right. Goats are curious, clever, and persistent — little engineers of bad decisions when a gate is unlatched or a weak spot presents itself. Nigerian Dwarfs may be small, but they are quick to test boundaries, so strong fencing, secure latches, and thoughtful pen design make daily life much easier for both goats and people.",
      'Our story with dairy goats began in childhood and has continued ever since. I became serious about raising dairy goats when I entered 4-H at the age of eight, and that passion continued into adulthood through years of breeding, milking, and showing goats through the American Dairy Goat Association. Over time, I worked with full-size breeds including Nubians, LaManchas, Oberhasli, and Recorded Grades, always with a strong interest in sound genetics and milk production. My own children also raised and showed dairy goats through 4-H and in ADGA-sanctioned shows, where our animals were evaluated against a national breed standard. Milk testing through Dairy Herd Improvement Registry was also an important part of that commitment to responsible breeding and production.',
      'We bottle-raise our kids to build a strong bond between farmer and goat, and we rely on practical tools like a milk stand and small bucket milker to make milking safer, cleaner, and easier on the body. Nigerian Dwarf goats are a manageable, family-friendly dairy breed, but like all livestock they need secure shelter, good feed, clean water, regular hoof care, strong fencing, and daily observation.',
    ],
    images: [
      { src: '/images/goats/nigerian-dwarf-goat-kids-pasture-1.jpg', alt: 'Nigerian Dwarf goat kids out in the pasture', priority: true },
      { src: '/images/goats/tan-goat-kid-clover-1.jpg', alt: 'A tan goat kid standing in clover' },
      { src: '/images/goats/goat-kid-eating-bucket-feeder-1.jpg', alt: 'A goat kid eating from a bucket feeder' },
      { src: '/images/goats/children-petting-goat-kid-stall-1.jpg', alt: 'Children petting a goat kid in the stall' },
      { src: '/images/goats/baby-nigerian-dwarf-trio.jpg', alt: 'Three Nigerian Dwarf baby goats in summer grass' },
    ],
  },
  {
    title: 'Standard Rex Rabbits',
    intro: 'Gentle, practical, and one of the quietest steady rhythms on the farm.',
    paragraphs: [
      'On our homestead, we raise Standard Rex rabbits with a focus on stewardship, good husbandry, and honest use. Our breeding stock is kept for life and enjoys daily interaction with us as part of the rhythm of the farm. Their offspring are raised to strengthen our breeding program, replace aging adults when needed, and support our family\'s homestead practices in a way that is rooted in responsibility and gratitude. When available, we also offer raw frozen pelts for sale to those who prefer to do their own crafting or processing. We do not create finished goods from them ourselves, but anyone interested is welcome to send an inquiry for current availability.',
      'Standard Rex rabbits are generally calm, hardy, and easy to work with, but like all rabbits they require clean housing, protection from the elements, good feed, fresh water, and close daily observation. Because Rex rabbits are known for their dense coats and sensitive feet, we pay especially close attention to comfort, cleanliness, and proper footing.',
      'For us, Standard Rex rabbits represent the kind of livestock that fits naturally into a homestead life — beautiful, practical, gentle, and useful. They offer a rare combination of manageable temperament, excellent coat quality, and real purpose, which is exactly why we continue to value them so highly.',
    ],
    images: [
      { src: '/images/rabbits/black-standard-rex-rabbit-wire-cage-1.jpg', alt: 'A black Standard Rex rabbit standing in a wire cage' },
      { src: '/images/rabbits/family-sitting-with-rabbit-outside-barn-1.jpg', alt: 'Family sitting outside the barn with a rabbit in their laps' },
      { src: '/images/rabbits/gray-standard-rex-rabbit-on-lap-1.jpg', alt: 'A gray Standard Rex rabbit sitting on someone\'s lap' },
      { src: '/images/rabbits/brown-standard-rex-rabbit-portrait-1.jpg', alt: 'A brown Standard Rex rabbit in a close portrait' },
      { src: '/images/rabbits/children-holding-black-rabbit-1.jpg', alt: 'Children holding a black rabbit' },
    ],
  },
  {
    title: 'Heritage Hogs',
    intro: 'Pasture, shade, mud, and the kind of daily care that shows up in the end result.',
    paragraphs: [
      'Our hogs are a Berkshire x Gloucestershire Old Spot cross, raised free-range and without pharmaceutical vaccines. They are tended with care and respect every day, with room to root, move, rest, and live the way hogs ought to live.',
      'That way of raising them matters. These animals are not rushed and they are not treated like a number. They are cared for closely, observed daily, and given the kind of attention that makes for healthier animals and a steadier life on the farm.',
      'The pork is exceptional for a simple reason: the animals are raised well.',
    ],
    images: [
      { src: '/images/pigs/pigs-walking-wooded-pen-1.jpg', alt: 'Pigs walking through the wooded pen at Forevermore Farm' },
      { src: '/images/pigs/sow-nursing-piglets-hay-1.jpg', alt: 'A sow nursing her piglets on fresh hay' },
      { src: '/images/pigs/piglets-at-feed-trough-1.jpg', alt: 'Piglets gathered around the feed trough' },
      { src: '/images/pigs/spotted-pig-portrait-1.jpg', alt: 'A spotted pig in a close portrait' },
      { src: '/images/pigs/piglet-standing-straw-1.jpg', alt: 'A piglet standing on the straw and looking up' },
    ],
  },
  {
    title: 'Katahdin Sheep',
    intro: 'A steady, low-maintenance breed that fits Tennessee hill country well.',
    paragraphs: [
      'Our sheep are Katahdin hair sheep, a practical heritage breed that suits this part of Tennessee beautifully. They are hardy, good on pasture, and easier to manage than wool breeds, which makes them a natural fit for the hills, the seasons, and the pace of life here.',
      'We appreciate animals that can do well without unnecessary fuss, and Katahdins are exactly that kind of sheep. They still need attentive care, good pasture, clean water, sound fencing, and daily observation, but they are a low-maintenance breed in the best sense of the phrase.',
      'They bring a quiet steadiness to the farm. There is something grounding about seeing sheep out on the pasture, moving through the grass and settling into the landscape as if they have always belonged there.',
    ],
    images: [
      { src: '/images/sheep/children-meeting-katahdin-sheep-pasture-1.jpg', alt: 'Children meeting Katahdin sheep in a grassy pasture' },
      { src: '/images/sheep/sheep-barn-solar-hero.jpg', alt: 'Katahdin sheep near the barn and solar panels' },
      { src: '/images/sheep/katahdin-field-vintage-car-1.jpg', alt: 'Katahdin sheep grazing near a vintage car in the field' },
      { src: '/images/sheep/sheep-stage-vw-1.jpg', alt: 'Sheep gathered near the stage and VW bus' },
      { src: '/images/property/concetta-sheep-stage-bg.jpg', alt: 'Concetta with sheep at Forevermore Farm' },
    ],
  },
  {
    title: 'Chickens',
    intro: 'A dependable laying flock and the daily gift of farm-fresh eggs.',
    paragraphs: [
      'Our chickens are a laying flock first and foremost, and they are part of the everyday rhythm that keeps a homestead grounded. They scratch, forage, settle into the coop at dusk, and give us the kind of farm-fresh eggs that still feel like a small blessing every time they are gathered.',
      'There is nothing flashy about caring for a laying flock, and maybe that is part of why I love it. Good feed, clean water, dry bedding, safe shelter, and daily attention go a long way. When chickens are tended well, they give back in steady, useful ways that feed a family and shape the day.',
      'They are one of the clearest reminders that a good farm life is built out of ordinary faithfulness, one egg, one chore, one sunrise at a time.',
    ],
    images: [
      { src: '/images/chickens/laying-flock-sunlit-yard-1.jpg', alt: 'The laying flock spread out in the sunlit yard' },
      { src: '/images/chickens/hens-eating-red-feeder-1.jpg', alt: 'Hens eating together from a red feeder' },
      { src: '/images/chickens/eggs-on-wire-conveyor-1.jpg', alt: 'Farm eggs lined up on the wire conveyor' },
      { src: '/images/chickens/chicks-hatching-incubator-1.jpg', alt: 'Chicks hatching in the incubator' },
      { src: '/images/chickens/white-rooster-grassy-yard-1.jpg', alt: 'A white rooster standing tall in the grassy yard' },
    ],
  },
]

function AnimalPhotoGrid({ images, title }: { images: Section['images']; title: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {images.map((image, index) => (
        <div
          key={`${title}-${image.src}`}
          className={`relative overflow-hidden rounded-sm shadow-md ${index === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default function OurAnimalsPage() {
  return (
    <>
      <HeroSection
        title="Our Animals"
        subtitle="The goats, rabbits, hogs, sheep, and laying flock that shape the everyday rhythm at Forevermore Farm."
        bgImage="/images/goats/nigerian-dwarf-goat-kids-pasture-1.jpg"
        bgPositionMobile="50% 38%"
        bgPositionDesktop="50% 42%"
        bgScaleDesktop={1.02}
        showLogo
      />

      <section className="bg-farm-cream px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-xl text-farm-charcoal leading-relaxed mb-6">
            Life with animals is never tidy, never fully predictable, and never dull.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed">
            Every breed we tend brings its own temperament, needs, work, and reward. Some are clever enough to test a gate latch, some are gentle enough to sit quietly in your lap, and some simply keep the whole place honest with the steady rhythm of chores that cannot be skipped.
          </p>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`px-4 py-16 md:py-20 ${index % 2 === 0 ? 'bg-farm-tan/20' : 'bg-farm-cream'}`}
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr,1fr] lg:items-start">
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <AnimalPhotoGrid images={section.images} title={section.title} />
            </div>
            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
              <p className="text-xs font-medium tracking-[0.28em] uppercase text-farm-green/70 mb-4">{section.intro}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-farm-green mb-6">{section.title}</h2>
              <div className="space-y-5 text-farm-charcoal/75 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <EmailCapture
        headline="Stay close to what is growing here."
        subtitle="Farm days, workshops, and seasonal updates, sent quietly to your inbox."
      />
    </>
  )
}
