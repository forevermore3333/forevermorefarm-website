'use client'

import { useMemo, useState } from 'react'

type ChildEntry = {
  name: string
  age: string
}

type LearningCollectiveResponse = {
  id: number
  parent_name: string
  phone: string
  email: string
  children_names_ages: string
  children: ChildEntry[] | null
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

function formatChildren(value: unknown) {
  if (!Array.isArray(value)) return ''
  return value
    .map((child) => {
      if (typeof child !== 'object' || child === null) return ''
      const entry = child as Partial<ChildEntry>
      const name = typeof entry.name === 'string' ? entry.name.trim() : ''
      const age = typeof entry.age === 'string' ? entry.age.trim() : ''
      if (!name && !age) return ''
      return `${name}${age ? ` (${age})` : ''}`
    })
    .filter(Boolean)
    .join('; ')
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    const children = formatChildren(value)
    return children || value.join('; ')
  }
  if (typeof value === 'string') return value
  if (value == null) return ''
  return String(value)
}

function getArrayValue(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : []
}

function responseSearchText(response: LearningCollectiveResponse) {
  return [
    response.parent_name,
    response.phone,
    response.email,
    response.children_names_ages,
    formatChildren(response.children),
    response.preferred_contact ?? '',
    ...Object.values(response.response).map(formatValue),
  ]
    .join(' ')
    .toLowerCase()
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
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')

  const skillOptions = useMemo(() => {
    const values = new Set<string>()
    responses.forEach((response) => {
      getArrayValue(response.response.skills).forEach((skill) => values.add(skill))
    })
    return Array.from(values).sort((a, b) => a.localeCompare(b))
  }, [responses])

  const experienceOptions = useMemo(() => {
    const values = new Set<string>()
    responses.forEach((response) => {
      getArrayValue(response.response.experience).forEach((experience) => values.add(experience))
    })
    return Array.from(values).sort((a, b) => a.localeCompare(b))
  }, [responses])

  const filteredResponses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return responses.filter((response) => {
      const matchesSearch = !query || responseSearchText(response).includes(query)
      const matchesSkill = !skillFilter || getArrayValue(response.response.skills).includes(skillFilter)
      const matchesExperience = !experienceFilter || getArrayValue(response.response.experience).includes(experienceFilter)
      return matchesSearch && matchesSkill && matchesExperience
    })
  }, [responses, search, skillFilter, experienceFilter])

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
            <p className="text-[#4A6741] mt-1 text-sm">
              {filteredResponses.length} of {responses.length} response{responses.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={() => exportCSV(filteredResponses)} className="bg-[#C9A96E] hover:bg-[#8B6914] text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors">
            Export Filtered CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 md:p-5 mb-6">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr_auto] gap-3 items-end">
            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-[#8B6914] font-semibold mb-1">Search all submissions</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search goat breeding, alpacas, canning, email, name…"
                className="w-full border border-[#C9A96E]/60 rounded-lg px-4 py-3 text-sm text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#1B3A2D]"
              />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-[#8B6914] font-semibold mb-1">Skill / interest</span>
              <select
                value={skillFilter}
                onChange={(event) => setSkillFilter(event.target.value)}
                className="w-full border border-[#C9A96E]/60 rounded-lg px-4 py-3 text-sm text-[#1C1C1C] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3A2D]"
              >
                <option value="">All skills</option>
                {skillOptions.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-[#8B6914] font-semibold mb-1">Experience</span>
              <select
                value={experienceFilter}
                onChange={(event) => setExperienceFilter(event.target.value)}
                className="w-full border border-[#C9A96E]/60 rounded-lg px-4 py-3 text-sm text-[#1C1C1C] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3A2D]"
              >
                <option value="">All experience</option>
                {experienceOptions.map((experience) => <option key={experience} value={experience}>{experience}</option>)}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSkillFilter('')
                setExperienceFilter('')
              }}
              className="rounded-lg border border-[#C9A96E] px-4 py-3 text-sm font-semibold text-[#8B6914] hover:bg-[#F7F3EC]"
            >
              Clear
            </button>
          </div>
          <p className="mt-3 text-xs text-[#4A6741]">
            Searches names, contact info, children, skills, experience, notes, and every survey answer.
          </p>
        </div>

        <div className="space-y-4">
          {responses.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-[#C9A96E]">No Learning Collective responses yet.</div>
          )}
          {responses.length > 0 && filteredResponses.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-[#C9A96E]">
              No matching responses. Try a broader search or clear filters.
            </div>
          )}
          {filteredResponses.map((response) => {
            const expanded = expandedId === response.id
            const skills = getArrayValue(response.response.skills)
            const otherSkills = formatValue(response.response.otherSkills)
            return (
              <article key={response.id} className="bg-white rounded-2xl shadow overflow-hidden">
                <button type="button" onClick={() => setExpandedId(expanded ? null : response.id)} className="w-full text-left p-5 hover:bg-[#F7F3EC] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-[#1B3A2D]">{response.parent_name}</h2>
                      <p className="text-sm text-[#4A6741] break-all">{response.email} · {response.phone}</p>
                      <p className="text-sm text-[#1C1C1C]/70 mt-1">Children: {formatChildren(response.children) || response.children_names_ages}</p>
                      {(skills.length > 0 || otherSkills) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skills.slice(0, 6).map((skill) => (
                            <span key={skill} className="rounded-full bg-[#F7F3EC] px-3 py-1 text-xs font-medium text-[#8B6914]">{skill}</span>
                          ))}
                          {otherSkills && <span className="rounded-full bg-[#E9F0E6] px-3 py-1 text-xs font-medium text-[#1B3A2D]">{otherSkills}</span>}
                        </div>
                      )}
                    </div>
                    <div className="text-sm md:text-right text-[#1C1C1C]/60">
                      <p>{formatDate(response.created_at)}</p>
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
