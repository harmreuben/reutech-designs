export interface ProcessStep {
  title: string
  description: string
}

/** How a project runs. Used on the homepage and About page. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    description: 'We learn about you, your audience and what the work needs to achieve.',
  },
  {
    title: 'Plan',
    description: 'We agree the scope, deliverables, timeline and quote before any work starts.',
  },
  {
    title: 'Create',
    description: 'We design or shoot, keeping you updated as the work takes shape.',
  },
  {
    title: 'Review',
    description: 'You give feedback and we refine the work within the agreed revisions.',
  },
  {
    title: 'Deliver',
    description: 'You receive final files prepared for print, web and social media.',
  },
]
