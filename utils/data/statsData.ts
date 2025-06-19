export interface StatItem {
  id: string
  value: number
  label: string
  description: string
  suffix?: string
  prefix?: string
  icon: string
}

export const statsData: StatItem[] = [
  {
    id: 'projects',
    value: 150,
    label: 'Projects Completed',
    description: 'Successfully delivered projects for clients worldwide',
    suffix: '+',
    icon: '🚀'
  },
  {
    id: 'clients',
    value: 89,
    label: 'Happy Clients',
    description: 'Satisfied customers who trust our services',
    suffix: '+',
    icon: '😊'
  },
  {
    id: 'experience',
    value: 5,
    label: 'Years Experience',
    description: 'Proven track record in web development',
    suffix: '+',
    icon: '⭐'
  },
  {
    id: 'team',
    value: 25,
    label: 'Team Members',
    description: 'Skilled professionals working together',
    suffix: '+',
    icon: '👥'
  },
  {
    id: 'uptime',
    value: 99.9,
    label: 'Uptime Guarantee',
    description: 'Reliable hosting and infrastructure',
    suffix: '%',
    icon: '⚡'
  },
  {
    id: 'support',
    value: 24,
    label: 'Hour Support',
    description: 'Round-the-clock customer assistance',
    suffix: '/7',
    icon: '🔧'
  }
] 