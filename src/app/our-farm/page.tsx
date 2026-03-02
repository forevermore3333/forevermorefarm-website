import HeroSection from '@/components/HeroSection'
import EmailCapture from '@/components/EmailCapture'

export default function OurFarm() {
  return (
    <>
      <HeroSection title="The Life Here" />

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto prose-farm">
          <div className="space-y-6 text-farm-charcoal/85 leading-relaxed">
            <p>In the hills of Lyles, Tennessee, Olin and Concetta West are building something that can&apos;t be rushed.</p>

            <p>Forevermore Farm took root in 2021 &mdash; not as an investment, not as a hobby, but as a commitment to a different way of living. To soil you can trust. To food you can trace. To neighbors you actually know.</p>

            <p>Olin keeps the land. He&apos;s up before the sun, tending fields and animals with the kind of quiet patience that farming demands. He doesn&apos;t talk much about stewardship &mdash; he just does it.</p>

            <p>Concetta brings the knowledge. A certified Straw Bale Gardening instructor and the founder of The LOCAL Place in Centerville, she&apos;s been feeding this community for years. At Forevermore, she raises heritage Berkshire and Gloucestershire Old Spot pigs &mdash; free-range, no pharmaceutical vaccines, the way it used to be done before farming became a factory. The pork is extraordinary. The reason why is simple.</p>

            <p>Together, they&apos;ve made Forevermore a place where people come to slow down, get their hands dirty, and remember what food actually is. Workshops, farm days, time with the animals, time in the garden &mdash; all of it grounded in one belief: that knowing how things grow changes how you live.</p>

            <p className="font-serif text-xl text-farm-green">Come wander. Come learn. Come back.</p>
          </div>
        </div>
      </section>

      {/* The Animals */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green mb-6">The Animals</h2>
          <p className="text-farm-charcoal/85 leading-relaxed">
            Heritage Berkshire and Gloucestershire Old Spot pigs roam free at Forevermore. No pharmaceutical vaccines, no confinement &mdash; just open pasture, good food, and room to be what they are. We also keep chickens, goats, and a small but growing family of farm dogs and cats who run the place (or think they do).
          </p>
        </div>
      </section>

      {/* The Straw Bale Garden */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green mb-6">The Straw Bale Garden</h2>
          <p className="text-farm-charcoal/85 leading-relaxed">
            Concetta is a certified Straw Bale Gardening instructor, and the garden at Forevermore is a living classroom. Straw bale gardening is productive, sustainable, and accessible &mdash; perfect for anyone who wants to grow food without fighting the soil. Visitors are always welcome to walk the rows and ask questions.
          </p>
        </div>
      </section>

      {/* Off-Grid Living */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green mb-6">Off-Grid Living</h2>
          <p className="text-farm-charcoal/85 leading-relaxed">
            Forevermore runs on solar power, rain catchment, and a rhythm set by the sun &mdash; not by the grid. It&apos;s not a statement. It&apos;s just how things work best out here. Living off-grid means living with intention, and that intention shapes everything we do on this land.
          </p>
        </div>
      </section>

      <EmailCapture
        headline="Stay in the loop."
        subtitle="Events, workshops, and farm news — delivered when there's something worth sharing."
      />
    </>
  )
}
