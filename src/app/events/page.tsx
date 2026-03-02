import EventCard from '@/components/EventCard'
import EmailCapture from '@/components/EmailCapture'
import { events } from '@/data/events'

export default function Events() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-farm-green mb-10 text-center">
            What&apos;s Happening at Forevermore
          </h1>
          <div className="grid gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      <EmailCapture
        headline="Join our list"
        subtitle="Events are announced here first."
      />
    </>
  )
}
