'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'

type Category = 'all' | 'garden' | 'garden-build' | 'animals' | 'land' | 'people' | 'events'

interface Photo {
  src: string
  alt: string
  category: Exclude<Category, 'all'>
}

const photos: Photo[] = [
  // Garden (~15)
  { src: '/images/garden/bouquet-of-cut-flowers.jpg', alt: 'Bouquet of cut flowers from the farm garden', category: 'garden' },
  { src: '/images/garden/bunch-of-yellow-sunflowers.jpg', alt: 'Bunch of yellow sunflowers', category: 'garden' },
  { src: '/images/garden/cherry-tomatoes-on-vine.jpg', alt: 'Cherry tomatoes ripening on the vine', category: 'garden' },
  { src: '/images/garden/bowl-of-ripe-tomatoes.jpg', alt: 'Bowl of ripe farm-fresh tomatoes', category: 'garden' },
  { src: '/images/garden/bowls-of-dried-garden-herbs.jpg', alt: 'Bowls of dried garden herbs', category: 'garden' },
  { src: '/images/garden/butternut-squash-growing-in-garden.jpg', alt: 'Butternut squash growing in the garden', category: 'garden' },
  { src: '/images/garden/tulips-along-farm-road.jpg', alt: 'Tulips lining the farm road in spring', category: 'garden' },
  { src: '/images/garden/white-lily-flower-garden.jpg', alt: 'White lily flower in the garden', category: 'garden' },
  { src: '/images/garden/yellow-ranunculus-flowers-garden.jpg', alt: 'Yellow ranunculus flowers in the garden', category: 'garden' },
  { src: '/images/garden/zinnias-sunflowers-white-tent.jpg', alt: 'Zinnias and sunflowers with the white event tent', category: 'garden' },
  { src: '/images/garden/vine-covered-garden-trellis.jpg', alt: 'Vines covering the garden trellis', category: 'garden' },
  { src: '/images/garden/cabbage-growing-in-garden-close.jpg', alt: 'Close-up of cabbage growing in the garden', category: 'garden' },
  { src: '/images/garden/bucket-tomatoes-kale-porch.jpg', alt: 'Bucket of tomatoes and kale on the porch', category: 'garden' },
  { src: '/images/garden/amaranth-plant-in-garden.jpg', alt: 'Amaranth plant growing in the garden', category: 'garden' },
  { src: '/images/garden/blueberry-bush-with-berries.jpg', alt: 'Blueberry bush heavy with berries', category: 'garden' },

  // Garden Build (~10)
  { src: '/images/garden-build/trailer-full-straw-bales-arrive.jpg', alt: 'Trailer full of straw bales arriving at the farm', category: 'garden-build' },
  { src: '/images/garden-build/garden-posts-day-1.jpg', alt: 'Garden enclosure posts going up on day one', category: 'garden-build' },
  { src: '/images/garden-build/hay-bales-in-raised-bed.jpg', alt: 'Hay bales placed in raised garden beds', category: 'garden-build' },
  { src: '/images/garden-build/concetta-placing-bales-golden-hour.jpg', alt: 'Concetta placing straw bales at golden hour', category: 'garden-build' },
  { src: '/images/garden-build/olin-concetta-working-garden.jpg', alt: 'Olin and Concetta working together in the garden', category: 'garden-build' },
  { src: '/images/garden-build/olin-family-filling-beds.jpg', alt: 'The family filling raised garden beds', category: 'garden-build' },
  { src: '/images/garden-build/metal-garden-beds-straw-filled.jpg', alt: 'Metal raised garden beds filled with straw', category: 'garden-build' },
  { src: '/images/garden-build/garden-enclosure-wide-blue-sky.jpg', alt: 'The completed garden enclosure under a blue sky', category: 'garden-build' },
  { src: '/images/garden-build/garden-pergola-interior-complete.jpg', alt: 'Interior of the completed garden pergola', category: 'garden-build' },
  { src: '/images/garden-build/garden-fence-hanging-baskets.jpg', alt: 'Garden fence with hanging flower baskets', category: 'garden-build' },

  // Animals (~20)
  { src: '/images/house-animals/clementine-sunglasses-blanket.jpg', alt: 'Clementine the Juliana pig with sunglasses on a blanket', category: 'animals' },
  { src: '/images/house-animals/clementine-running.jpg', alt: 'Clementine the Juliana pig running in the pasture', category: 'animals' },
  { src: '/images/house-animals/clementine-hazel-pasture.jpg', alt: 'Clementine and Hazel together in the pasture', category: 'animals' },
  { src: '/images/house-animals/hazel-closeup-hero.jpg', alt: 'Hazel the pot-belly pig up close', category: 'animals' },
  { src: '/images/house-animals/hazel-road-trot.jpg', alt: 'Hazel trotting down the farm road', category: 'animals' },
  { src: '/images/house-animals/hazel-teddy-dogbed-1.jpg', alt: 'Hazel and Teddy the cat sharing a dog bed', category: 'animals' },
  { src: '/images/house-animals/cat-yawning-in-garden.jpg', alt: 'Teddy the cat yawning in the garden', category: 'animals' },
  { src: '/images/house-animals/cat-hiding-in-garden.jpg', alt: 'Teddy the cat hiding among garden plants', category: 'animals' },
  { src: '/images/house-animals/pig-cat-bed-1.jpg', alt: 'Pig and cat curled up together on a bed', category: 'animals' },
  { src: '/images/house-animals/dorothy-jean-favorite.jpg', alt: 'Dorothy Jean the dog at the farm', category: 'animals' },
  { src: '/images/house-animals/juliana-pasture-4-closeup.jpg', alt: 'Juliana pig close-up in the pasture', category: 'animals' },
  { src: '/images/pigs/piglets-pile-5.jpg', alt: 'Heritage Berkshire piglets piled together', category: 'animals' },
  { src: '/images/pigs/piglets-closeup-6.jpg', alt: 'Berkshire piglets close-up', category: 'animals' },
  { src: '/images/pigs/sow-with-piglets-1.jpg', alt: 'Berkshire sow with her piglets', category: 'animals' },
  { src: '/images/pigs/sow-piglets-nuzzle-13.jpg', alt: 'Sow nuzzling her piglets in the straw', category: 'animals' },
  { src: '/images/goats/baby-nigerian-dwarf-trio.jpg', alt: 'Baby Nigerian Dwarf goat trio', category: 'animals' },
  { src: '/images/sheep/sheep-barn-solar-hero.jpg', alt: 'Katahdin sheep near the barn and solar panels', category: 'animals' },
  { src: '/images/sheep/katahdin-field-vintage-car-1.jpg', alt: 'Katahdin sheep grazing near a vintage car in the field', category: 'animals' },
  { src: '/images/sheep/sheep-stage-vw-1.jpg', alt: 'Sheep gathered near the stage and VW bus', category: 'animals' },
  { src: '/images/chickens/eggs-coop-closeup.jpg', alt: 'Fresh eggs close-up in the chicken coop', category: 'animals' },

  // The Land (~10)
  { src: '/images/pasture-land/field-of-wildflowers.jpg', alt: 'Field of wildflowers at Forevermore Farm', category: 'land' },
  { src: '/images/pasture-land/wildflowers-bee-yellow-1.jpg', alt: 'Bee on yellow wildflowers in the pasture', category: 'land' },
  { src: '/images/pasture-land/open-field-with-hay-bales.jpg', alt: 'Open field with hay bales at dusk', category: 'land' },
  { src: '/images/pasture-land/mushroom-skyward-perspective.jpg', alt: 'Mushroom viewed from below against the sky', category: 'land' },
  { src: '/images/pasture-land/tall-wildflowers-pasture-scene.jpg', alt: 'Tall wildflowers in the pasture scene', category: 'land' },
  { src: '/images/pasture-land/purple-thistle-in-pasture.jpg', alt: 'Purple thistle blooming in the pasture', category: 'land' },
  { src: '/images/property/daffodils-line-field-house.jpg', alt: 'Daffodils lining the field near the farmhouse', category: 'land' },
  { src: '/images/property/stage-sunrise-fog-valley.jpg', alt: 'Farm stage at sunrise with fog in the valley', category: 'land' },
  { src: '/images/property/farm-house-field-trees.jpg', alt: 'The farmhouse with field and trees', category: 'land' },
  { src: '/images/property/olin-tractor-brushhog-pov.jpg', alt: 'Tractor and brush hog working the farm fields', category: 'land' },

  // People (~8)
  { src: '/images/people/children-planting-garden-jugs.jpg', alt: 'Children planting seeds in recycled milk jugs', category: 'people' },
  { src: '/images/people/children-watering-garden-beds.jpg', alt: 'Children watering the raised garden beds', category: 'people' },
  { src: '/images/people/child-planting-seeds-garden-bed.jpg', alt: 'Child planting seeds in a garden bed', category: 'people' },
  { src: '/images/people/two-women-smiling-garden-project.jpg', alt: 'Two women smiling at a garden project', category: 'people' },
  { src: '/images/people/woman-holding-bouquet-of-flowers.jpg', alt: 'Woman holding a bouquet of fresh farm flowers', category: 'people' },
  { src: '/images/people/children-family-with-dog.jpg', alt: 'Children and family with the farm dog', category: 'people' },
  { src: '/images/people/planting-seeds-recycled-jugs.jpg', alt: 'Planting seeds in recycled milk jugs', category: 'people' },
  { src: '/images/garden/child-planting-with-pig-nearby.jpg', alt: 'Child planting in the garden with a pig nearby', category: 'people' },

  // Events (all 3)
  { src: '/images/events/couple-cutting-cake-flowers.jpg', alt: 'Couple cutting cake surrounded by flowers at a farm event', category: 'events' },
  { src: '/images/events/white-lily-event-tent.jpg', alt: 'White lily flowers at the event tent', category: 'events' },
  { src: '/images/events/white-tent-and-flowers.jpg', alt: 'White event tent and flowers at Forevermore Farm', category: 'events' },
]

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'garden', label: 'Garden' },
  { id: 'garden-build', label: 'Garden Build' },
  { id: 'animals', label: 'Animals' },
  { id: 'land', label: 'The Land' },
  { id: 'people', label: 'People' },
  { id: 'events', label: 'Events' },
]

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }, [lightboxIndex, filtered.length])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }, [lightboxIndex, filtered.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <>
      <HeroSection
        title="Life at Forevermore"
        subtitle="A look inside the farm — the gardens, the animals, the land, and the people who make it home."
        bgImage="/images/garden/lilies-daisies-garden-bed.jpg"
        bgPositionMobile="50% 60%"
        bgPositionDesktop="50% 60%"
      />

      <section className="bg-farm-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Category filter tabs */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 mb-10">
            <div className="flex gap-2 min-w-max md:flex-wrap md:min-w-0 md:justify-center">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase rounded-sm font-medium whitespace-nowrap transition-colors border ${
                    activeCategory === id
                      ? 'bg-farm-green text-farm-cream border-farm-green'
                      : 'bg-transparent text-farm-charcoal/70 border-farm-tan hover:text-farm-green hover:border-farm-green'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {filtered.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-square overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-farm-green focus:ring-offset-2"
                aria-label={`View larger: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-farm-charcoal/0 group-hover:bg-farm-charcoal/20 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-farm-charcoal/50 py-16">No photos in this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-2 md:left-6 text-white/80 hover:text-white z-10 p-3"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto px-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
            <p className="text-white/60 text-sm">{filtered[lightboxIndex].alt}</p>
            <p className="text-white/40 text-xs mt-1">{lightboxIndex + 1} / {filtered.length}</p>
          </div>

          {/* Next button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-2 md:right-6 text-white/80 hover:text-white z-10 p-3"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
