'use client'

import { useState } from 'react'

type FormState = {
  parentName: string
  phone: string
  email: string
  children: string
  preferredContact: string[]
  attendingFirstMeeting: string
  wantsFollowUp: string
  involvement: string[]
  comfortGuiding: string
  leadershipGrowth: string
  skills: string[]
  otherSkills: string
  experience: string[]
  confidentTopics: string
  learningTopics: string
  practicalSupport: string[]
  resourcesAccess: string
  sharedResources: string
  helpFrequency: string
  availability: string[]
  preferredRole: string
  childOpportunities: string
  parentLeadershipSupport: string
  anythingElse: string
}

type SkillGroup = {
  title: string
  options: string[]
}

const initialForm: FormState = {
  parentName: '',
  phone: '',
  email: '',
  children: '',
  preferredContact: [],
  attendingFirstMeeting: '',
  wantsFollowUp: '',
  involvement: [],
  comfortGuiding: '',
  leadershipGrowth: '',
  skills: [],
  otherSkills: '',
  experience: [],
  confidentTopics: '',
  learningTopics: '',
  practicalSupport: [],
  resourcesAccess: '',
  sharedResources: '',
  helpFrequency: '',
  availability: [],
  preferredRole: '',
  childOpportunities: '',
  parentLeadershipSupport: '',
  anythingElse: '',
}

const preferredContactOptions = ['Text', 'Email', 'Phone']
const attendanceOptions = ['Yes', 'No', 'Unsure']
const yesNoOptions = ['Yes', 'No']

const involvementOptions = [
  'I would like to help lead a small group',
  'I would like to assist another leader',
  'I would like to help occasionally as needed',
  'I am interested but not ready to lead yet',
  'I would like to learn alongside my child first',
]

const comfortOptions = [
  'Very comfortable',
  'Somewhat comfortable',
  'I could help in a support role',
  'I would need guidance and structure first',
  'Not at this time',
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Animals & Animal Care',
    options: [
      'Goats',
      'Dairy animals',
      'Poultry',
      'Rabbits',
      'Dogs',
      'Cats',
      'Horses',
      'Sheep',
      'Swine',
      'Beekeeping',
      'Llamas/Alpacas',
      'Animal health/basic care',
      'Livestock handling',
      'Judging/showmanship',
      'Other animal-related knowledge',
    ],
  },
  {
    title: 'Gardening, Plants, & Nature',
    options: [
      'Gardening',
      'Seed starting',
      'Flowers',
      'Herbs',
      'Composting',
      'Soil health',
      'Greenhouse growing',
      'Indoor/container gardening',
      'Trees/forestry',
      'Weather/climate',
      'Water conservation',
      'Nature study/outdoor skills',
    ],
  },
  {
    title: 'Food, Cooking, & Home Skills',
    options: [
      'Cooking',
      'Baking',
      'Food preservation/canning',
      'Nutrition',
      'Food safety',
      'Meal planning',
      'Family living skills',
      'Consumer skills/budgeting',
      'Financial literacy',
    ],
  },
  {
    title: 'Arts, Crafts, & Creative Skills',
    options: [
      'Drawing/painting',
      'Photography',
      'Sewing',
      'Quilting',
      'Crochet/knitting',
      'Needlework',
      'Fiber arts',
      'Woodworking',
      'Metalworking',
      'Creative writing',
      'Public speaking/presentations',
      'Theater/performance',
      'Filmmaking/video',
      'Digital art/design',
      'Cultural or traditional arts',
    ],
  },
  {
    title: 'Leadership, Community, & Life Skills',
    options: [
      'Leadership development',
      'Mentoring youth',
      'Entrepreneurship/business',
      'Career readiness',
      'Community service',
      'Event planning',
      'Teaching/presenting',
      'Group facilitation',
      'Organizing projects',
      'Citizenship/community engagement',
    ],
  },
  {
    title: 'Health & Wellness',
    options: [
      'Exercise/movement',
      'Emotional wellness',
      'Healthy habits',
      'Family wellness',
      'Youth development',
      'Outdoor recreation',
    ],
  },
]

const experienceOptions = [
  'Professional experience',
  'Strong personal experience',
  'Hobby/intermediate experience',
  'Beginner, but willing to help learn and lead',
  'Mostly interested in supporting rather than teaching',
]

const practicalSupportOptions = [
  'Organizing materials',
  'Setting up/cleaning up',
  'Bringing supplies',
  'Helping with registration/check-in',
  'Communication/reminders',
  'Snack coordination',
  'Hosting/prepping spaces',
  'Mentoring youth',
  'Assisting with small groups',
  'Planning events/showcases',
  'Photography/social media',
  'Fundraising/helping with budget needs',
]

const frequencyOptions = ['Weekly', 'Twice a month', 'Monthly', 'Occasionally', 'Only for special events']
const availabilityOptions = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Saturday mornings',
  'Saturday afternoons',
  'Sunday afternoons',
  'Flexible',
]
const roleOptions = [
  'Lead a group regularly',
  'Rotate leadership with others',
  'Help as a support person',
  'Help behind the scenes',
  'Not sure yet',
]

function toggleValue(values: string[], option: string) {
  return values.includes(option) ? values.filter((item) => item !== option) : [...values, option]
}

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-sm font-medium text-farm-charcoal mb-2">
      {children} {required && <span className="text-farm-brown">*</span>}
    </span>
  )
}

export default function LearningCollectiveForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')

    const missingCheckboxGroups = [
      ['Preferred Contact Method', form.preferredContact],
      ['How you would like to be involved', form.involvement],
      ['Skills, experience, and interests', form.skills],
      ['Experience level', form.experience],
    ].filter(([, values]) => Array.isArray(values) && values.length === 0)

    if (missingCheckboxGroups.length > 0) {
      setError(`Please complete: ${missingCheckboxGroups.map(([label]) => label).join(', ')}.`)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/learning-collective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setError('Something went wrong while sending your survey. Please try again, or contact Forevermore Farm directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-farm-tan/30 bg-white p-8 text-center shadow-sm">
        <p className="font-serif text-2xl text-farm-green mb-3">Thank you for sharing your interests.</p>
        <p className="text-farm-charcoal/70 leading-relaxed">
          The Learning Collective is built on shared gifts, practical learning, and families growing together in community. We&apos;ll be in touch with more information.
        </p>
      </div>
    )
  }

  const inputClass = 'w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal focus:outline-none focus:ring-2 focus:ring-farm-green/30'
  const groupClass = 'rounded-sm border border-farm-tan/30 bg-white p-6 shadow-sm'
  const checkboxClass = 'h-4 w-4 rounded border-farm-tan text-farm-green focus:ring-farm-green/30'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Family Information</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <label>
            <FieldLabel required>Parent/Guardian Name</FieldLabel>
            <input className={inputClass} required value={form.parentName} onChange={(e) => setField('parentName', e.target.value)} />
          </label>
          <label>
            <FieldLabel required>Phone Number</FieldLabel>
            <input className={inputClass} required type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          </label>
          <label>
            <FieldLabel required>Email Address</FieldLabel>
            <input className={inputClass} required type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </label>
          <label>
            <FieldLabel required>Child(ren)&apos;s Name(s) and Age(s)</FieldLabel>
            <input className={inputClass} required value={form.children} onChange={(e) => setField('children', e.target.value)} />
          </label>
        </div>
        <CheckboxGroup
          title="Preferred Contact Method"
          required
          options={preferredContactOptions}
          values={form.preferredContact}
          onChange={(option) => setField('preferredContact', toggleValue(form.preferredContact, option))}
        />
        <RadioGroup title="Do you plan to attend the first meeting?" required options={attendanceOptions} value={form.attendingFirstMeeting} onChange={(value) => setField('attendingFirstMeeting', value)} />
        <RadioGroup title="If you cannot attend the first meeting, would you like follow-up information through the website sign-up list?" options={yesNoOptions} value={form.wantsFollowUp} onChange={(value) => setField('wantsFollowUp', value)} />
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Participation &amp; Leadership</h2>
        <CheckboxGroup title="How would you like to be involved?" required options={involvementOptions} values={form.involvement} onChange={(option) => setField('involvement', toggleValue(form.involvement, option))} />
        <RadioGroup title="How comfortable are you with guiding a small group of children or families?" required options={comfortOptions} value={form.comfortGuiding} onChange={(value) => setField('comfortGuiding', value)} />
        <RadioGroup title="Would you be open to growing into a leadership role over time?" required options={['Yes', 'Maybe', 'No']} value={form.leadershipGrowth} onChange={(value) => setField('leadershipGrowth', value)} />
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-3">Skills, Experience, &amp; Interests</h2>
        <p className="text-sm text-farm-charcoal/60 mb-5">Choose every area where you could share knowledge, experience, or support.</p>
        <div className="space-y-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-farm-tan/20 pt-5 first:border-t-0 first:pt-0">
              <FieldLabel>{group.title}</FieldLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.options.map((option) => (
                  <label key={option} className="flex gap-3 text-sm text-farm-charcoal/80">
                    <input type="checkbox" className={checkboxClass} checked={form.skills.includes(option)} onChange={() => setField('skills', toggleValue(form.skills, option))} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <label className="block mt-6">
          <FieldLabel>If you have another skill or area of interest not listed above, write it here.</FieldLabel>
          <input className={inputClass} value={form.otherSkills} onChange={(e) => setField('otherSkills', e.target.value)} />
        </label>
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Experience &amp; Confidence</h2>
        <CheckboxGroup title="How would you describe your experience in the areas you selected?" required options={experienceOptions} values={form.experience} onChange={(option) => setField('experience', toggleValue(form.experience, option))} />
        <TextArea label="Are there any topics you feel especially confident teaching or demonstrating?" value={form.confidentTopics} onChange={(value) => setField('confidentTopics', value)} />
        <TextArea label="Are there any topics you would enjoy helping with even if you are still learning yourself?" value={form.learningTopics} onChange={(value) => setField('learningTopics', value)} />
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Practical Support</h2>
        <CheckboxGroup title="In addition to teaching or helping lead, how else could you contribute?" options={practicalSupportOptions} values={form.practicalSupport} onChange={(option) => setField('practicalSupport', toggleValue(form.practicalSupport, option))} />
        <RadioGroup title="Do you have access to tools, materials, equipment, or resources you may be willing to share?" options={yesNoOptions} value={form.resourcesAccess} onChange={(value) => setField('resourcesAccess', value)} />
        <TextArea label="If yes, describe what you could share." value={form.sharedResources} onChange={(value) => setField('sharedResources', value)} />
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Availability</h2>
        <RadioGroup title="How often could you realistically help?" required options={frequencyOptions} value={form.helpFrequency} onChange={(value) => setField('helpFrequency', value)} />
        <CheckboxGroup title="What days/times usually work best for your family?" options={availabilityOptions} values={form.availability} onChange={(option) => setField('availability', toggleValue(form.availability, option))} />
        <RadioGroup title="What role would you prefer?" required options={roleOptions} value={form.preferredRole} onChange={(value) => setField('preferredRole', value)} />
      </section>

      <section className={groupClass}>
        <h2 className="font-serif text-2xl text-farm-green mb-5">Final Questions</h2>
        <TextArea label="What kinds of learning opportunities would you most like to see offered for children?" value={form.childOpportunities} onChange={(value) => setField('childOpportunities', value)} />
        <TextArea label="What kinds of opportunities would help you grow into a leadership role as a parent or guardian?" value={form.parentLeadershipSupport} onChange={(value) => setField('parentLeadershipSupport', value)} />
        <TextArea label="Is there anything else you would like us to know about your interests, skills, experience, or availability?" value={form.anythingElse} onChange={(value) => setField('anythingElse', value)} />
      </section>

      {error && <p className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={loading} className="w-full bg-farm-green text-farm-cream px-8 py-4 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-green/90 transition-colors disabled:opacity-50">
        {loading ? 'Sending Survey...' : 'Submit Interest Survey'}
      </button>
    </form>
  )
}

function CheckboxGroup({ title, options, values, onChange, required = false }: { title: string; options: string[]; values: string[]; onChange: (option: string) => void; required?: boolean }) {
  return (
    <fieldset className="mt-6">
      <legend className="block text-sm font-medium text-farm-charcoal mb-3">
        {title} {required && <span className="text-farm-brown">*</span>}
      </legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option} className="flex gap-3 text-sm text-farm-charcoal/80">
            <input type="checkbox" className="h-4 w-4 rounded border-farm-tan text-farm-green focus:ring-farm-green/30" checked={values.includes(option)} onChange={() => onChange(option)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function RadioGroup({ title, options, value, onChange, required = false }: { title: string; options: string[]; value: string; onChange: (value: string) => void; required?: boolean }) {
  const name = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <fieldset className="mt-6">
      <legend className="block text-sm font-medium text-farm-charcoal mb-3">
        {title} {required && <span className="text-farm-brown">*</span>}
      </legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option} className="flex gap-3 text-sm text-farm-charcoal/80">
            <input type="radio" required={required} name={name} value={option} checked={value === option} onChange={() => onChange(option)} className="h-4 w-4 border-farm-tan text-farm-green focus:ring-farm-green/30" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block mt-6">
      <FieldLabel>{label}</FieldLabel>
      <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} className="w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal focus:outline-none focus:ring-2 focus:ring-farm-green/30 resize-y" />
    </label>
  )
}
