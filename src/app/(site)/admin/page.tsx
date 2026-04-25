import Link from 'next/link'

const adminLinks = [
  {
    href: '/admin/learning-collective',
    title: 'Learning Collective Responses',
    description: 'View, search, filter, and export Programs / Learning Collective submissions.',
  },
  {
    href: '/admin/subscribers',
    title: 'Newsletter Subscribers',
    description: 'View and export general website subscriber sign-ups.',
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8B6914] font-semibold mb-3">Forevermore Farm</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1B3A2D] tracking-tight">Admin</h1>
          <p className="text-[#4A6741] mt-3">Choose the admin area you need.</p>
        </div>

        <div className="grid gap-4">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl bg-white p-6 shadow hover:shadow-lg border border-[#E9DDC8] transition-shadow"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#1B3A2D] mb-2">{link.title}</h2>
              <p className="text-[#1C1C1C]/70 text-sm leading-relaxed">{link.description}</p>
              <p className="text-[#8B6914] text-xs font-semibold uppercase tracking-widest mt-4">Open →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
