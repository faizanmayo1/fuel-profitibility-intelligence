export type CommStatus = 'Drafted' | 'Pending review' | 'Sent'
export type Tone = 'Plain' | 'Warm' | 'Direct' | 'Formal'

export type CommDraft = {
  id: string
  client: string
  recipient: string
  subject: string
  status: CommStatus
  tone: Tone
  trigger: string
  ageMin: number
}

export const drafts: CommDraft[] = [
  {
    id: 'c1',
    client: 'Mintwell Retail Co.',
    recipient: 'Sarah Chen · Owner',
    subject: 'May performance — margin pressure on Online Fulfilment',
    status: 'Pending review',
    tone: 'Warm',
    trigger: 'Margin leak detected · −4.2% on Online Fulfilment',
    ageMin: 8,
  },
  {
    id: 'c2',
    client: 'Redhill Constructions',
    recipient: 'Marcus Lloyd · CFO',
    subject: 'Cash plan for next 30 days + AR escalation',
    status: 'Drafted',
    tone: 'Direct',
    trigger: '21-day shortfall predicted · $84k',
    ageMin: 22,
  },
  {
    id: 'c3',
    client: 'Northbay Café Group',
    recipient: 'Emma Diallo · Director',
    subject: 'Q4 BAS — reserving 9% from weekly takings',
    status: 'Drafted',
    tone: 'Plain',
    trigger: 'BAS underpayment risk · $27k gap',
    ageMin: 56,
  },
  {
    id: 'c4',
    client: 'LumenPath Studios',
    recipient: 'Daniel Pham · Founder',
    subject: 'Recommended retainer repricing — tier B',
    status: 'Sent',
    tone: 'Warm',
    trigger: 'Margin compression −12 pp',
    ageMin: 240,
  },
  {
    id: 'c5',
    client: 'Arcfield Engineering',
    recipient: 'Riya Kapoor · MD',
    subject: 'Payroll vs revenue — restructure proposal',
    status: 'Drafted',
    tone: 'Formal',
    trigger: 'Payroll +22% YoY vs revenue +9%',
    ageMin: 140,
  },
]

export const sampleEmail = {
  to: 'Sarah Chen <sarah@mintwell.com.au>',
  subject: 'May performance — margin pressure on Online Fulfilment',
  body: [
    "Hi Sarah,",
    "",
    "Quick update on Mintwell's May numbers. Revenue held up well at $432k (+4.1% MoM), but gross margin tightened to 12.1% — down 3.6 percentage points from April. The main pressure point was the Online Fulfilment line, where logistics costs ran 18% above April while pricing stayed flat.",
    "",
    "Cash on hand also moved from $84k to $38k over the month. Three of the anchor wholesale accounts have been paying 14–21 days outside 30-day terms, which has lengthened the AR cycle. On the current trajectory, runway sits at about 19 days.",
    "",
    "Two suggestions to land before mid-June:",
    "",
    "• Reprice (+11%) or wind down Online Fulfilment — modelling shows ~$31k/quarter recovery either way.",
    "• Run AR factoring on the top three debtors — frees roughly $94k, clears the 30-day shortfall.",
    "",
    "I've drafted the customer outreach sequence in our queue — happy to send on your approval. Easiest is a 20-minute call this week to walk through both. Tuesday or Thursday afternoon work for you?",
    "",
    "Cheers,",
    "John",
  ].join('\n'),
}

export const commsSummary = {
  draftsPending: 14,
  sentThisWeek: 38,
  responseRate: 64,
  avgTurnaround: '2h 14m',
}
