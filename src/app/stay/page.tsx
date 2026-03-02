import HeroSection from '@/components/HeroSection'
import SectionCard from '@/components/SectionCard'
import EmailCapture from '@/components/EmailCapture'

export default function Stay() {
  return (
    <>
      <HeroSection title="A Place to Stay" />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-farm-charcoal/85 text-lg leading-relaxed">
            Something quiet is being built. A place to unplug, wake up to roosters, walk the land, and leave slower than you arrived. Farm stays are coming to Forevermore &mdash; surrounded by open fields, animals, and real Tennessee air.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <SectionCard
            title="Sunrise Suite"
            description="East-facing views, morning light, and the sound of the farm waking up. Details coming soon."
            badge="Coming Soon"
          />
          <SectionCard
            title="Sunset Suite"
            description="Golden hour over the pasture. Quiet evenings, open sky, and nothing on the schedule. Details coming soon."
            badge="Coming Soon"
          />
        </div>
      </section>

      <EmailCapture
        headline="Be first to know"
        subtitle="We'll let you know when reservations open."
      />
    </>
  )
}
