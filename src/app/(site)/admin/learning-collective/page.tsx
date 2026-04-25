'use client'

import { useState } from 'react'

type LearningCollectiveResponse = {
  id: number
  parent_name: string
  phone: string
  email: string
  children_names_ages: string
  preferred_contact: string | null
  attending_first_meeting: string | null
  response: Record<string, unknown>
  created_at: string
}

const responseLabels: Record<string, string> = {
  parentName: 'Parent/Guardian',
  phone: 'Phone',
  email: 'Email',
  children: 'Children',
  preferredContact: 'Preferred Contact',
  attendingFirstMeeting: 'Attending First Meeting',
  wantsFollowUp: 'Follow-Up Info',
  involvement: 'Involvement',
  comfortGuiding: 'Comfort Guiding',
  leadershipGrowth: 'Leadership Growth',
  skills: 'Skills & Interests',
  otherSkills: 'Other Skills',
  experience: 'Experience',
  confidentTopics: 'Confident Teaching',
  learningTopics: 'Still Learning',
  practicalSupport: 'Practical Support',
  resourcesAccess: 'Resources Access',
  sharedResources: 'Shared Resources',
  helpFrequency: 'Help Frequency',
  availability: 'Availability',
  preferredRole: 'Preferred Role',
  childOpportunities: 'Child Opportunities',
  parentLeadershipSupport: 'Parent Leadership Support',
  anythingElse: 'Anything Else',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.join('; ')
  if (typeof value === 'string') return value
  if (value == null) return ''
  return String(value)
}

function exportCSV(responses: LearningCollectiveResponse[]) {
  const keys = Object.keys(responseLabels)
  const headers = ['ID', 'Submitted', ...keys.map((key) => responseLabels[key])]
  const rows = responses.map((response) => [
    response.id,
    formatDate(response.created_at),
    ...keys.map((key) => formatValue(response.response[key])),
  ])
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'learning-collective-responses.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminLearningCollectivePage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [responses, setResponses] = useState<LearningCollectiveResponse[]>([])
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/learning-collective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        const data = (await res.json()) as LearningCollectiveResponse[]
        setResponses(data)
        setAuthed(true)
      } else if (res.status === 401) {
        setError('Incorrect password')
      } else {
        setError('Something went wrong. Try again.')
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3EC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-serif font-bold text-[#1B3A2D] mb-2 text-center tracking-tight">
            Learning Collective
          </h1>
          <p className="text-center text-[#4A6741] text-sm mb-6">Admin Access</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="border border-[#C9A96E] rounded-lg px-4 py-3 text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#1B3A2D] placeholder:text-[#C9A96E]"
              required
            />
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="bg-[#1B3A2D] hover:bg-[#4A6741] text-[#F7F3EC] font-semibold rounded-lg px-4 py-3 transition-colors disabled:opacity-50">
              {loading ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1B3A2D] tracking-tight">Learning Collective Responses</h1>
            <p className="text-[#4A6741] mt-1 text-sm">{responses.length} response{responses.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => exportCSV(responses)} className="bg-[#C9A96E] hover:bg-[#8B6914] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors">
            Export CSV
          </button>
        </div>

        <div className="space-y-4">
          {responses.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-[#C9A96E]">No Learning Collective responses yet.</div>
          )}
          {responses.map((response) => {
            const expanded = expandedId === response.id
            return (
              <article key={response.id} className="bg-white rounded-2xl shadow overflow-hidden">
                <button type="button" onClick={() => setExpandedId(expanded ? null : response.id)} className="w-full text-left p-5 hover:bg-[#F7F3EC] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-[#1B3A2D]">{response.parent_name}</h2>
                      <p className="text-sm text-[#4A6741] break-all">{response.email} · {response.phone}</p>
                      <p className="text-sm text-[#1C1C1C]/70 mt-1">Children: {response.children_names_ages}</p>
                    </div>
                    <div className="text-sm md:text-right text-[#1C1C1C]/60">
                      <p>{formatDate(response.created_at)}</p>
                      <p>First meeting: {response.attending_first_meeting ?? '—'}</p>
                      <p>Contact: {response.preferred_contact ?? '—'}</p>
                    </div>
                  </div>
                </button>
                {expanded && (
                  <div className="border-t border-[#F7F3EC] p-5 grid md:grid-cols-2 gap-4">
                    {Object.entries(responseLabels).map(([key, label]) => {
                      const value = formatValue(response.response[key])
                      if (!value) return null
                      return (
                        <div key={key} className="rounded-lg bg-[#F7F3EC] p-4">
                          <p className="text-xs uppercase tracking-wide text-[#8B6914] mb-1">{label}</p>
                          <p className="text-sm text-[#1C1C1C] whitespace-pre-line">{value}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
