import { formatNumber, formatCurrency } from '../format'

// Business Metrics and KPIs
export interface BusinessMetric {
  id: string
  title: string
  value: number
  displayValue: string
  unit: string
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  changeFromPeriod: string
  description: string
  category: 'carbon' | 'energy' | 'cost' | 'efficiency'
  trend: number[]
}

export const businessMetrics: BusinessMetric[] = [
  {
    id: 'carbon-footprint',
    title: 'Total Carbon Footprint',
    value: 45048,
    displayValue: formatNumber(45048),
    unit: 'tCO₂e',
    change: -16,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Total carbon emissions across managed portfolio, showing significant reduction through optimization',
    category: 'carbon',
    trend: [52000, 48500, 46200, 45048]
  },
  {
    id: 'energy-intensity',
    title: 'Energy Intensity',
    value: 123,
    displayValue: formatNumber(123),
    unit: 'kWh/m²',
    change: -22,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Energy consumption per square meter, optimized through smart building management',
    category: 'energy',
    trend: [157, 145, 135, 123]
  },
  {
    id: 'energy-consumption',
    title: 'Total Energy Consumption',
    value: 47790662,
    displayValue: formatNumber(47790662),
    unit: 'kWh',
    change: -27,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Total energy consumption across portfolio with significant efficiency improvements',
    category: 'energy',
    trend: [65198706, 58784205, 52324077, 47790662]
  },
  {
    id: 'cost-savings',
    title: 'Annual Cost Savings',
    value: 2450000,
    displayValue: formatCurrency(2450000),
    unit: 'USD',
    change: 34,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Cost savings achieved through energy optimization and carbon reduction initiatives',
    category: 'cost',
    trend: [1200000, 1650000, 2100000, 2450000]
  },
  {
    id: 'efficiency-score',
    title: 'Operational Efficiency',
    value: 87,
    displayValue: '87',
    unit: '%',
    change: 12,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Overall operational efficiency score based on energy, cost, and carbon metrics',
    category: 'efficiency',
    trend: [68, 74, 81, 87]
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Usage',
    value: 64,
    displayValue: '64',
    unit: '%',
    change: 28,
    changeType: 'positive',
    changeFromPeriod: '2023',
    description: 'Percentage of energy consumption from renewable sources',
    category: 'energy',
    trend: [32, 45, 56, 64]
  }
]

// Client Success Stories
export interface ClientTestimonial {
  id: string
  name: string
  position: string
  company: string
  companyLogo: string
  testimonial: string
  metrics: {
    carbonReduction: number
    costSavings: number
    efficiencyGain: number
  }
  industry: string
  companySize: string
  implementationTime: string
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 'tech-corp',
    name: 'Sarah Chen',
    position: 'Chief Sustainability Officer',
    company: 'TechCorp Global',
    companyLogo: '/images/logos/techcorp.svg',
    testimonial: 'DataFlow transformed our approach to carbon management. We achieved a 35% reduction in emissions while cutting operational costs by $1.2M annually. The real-time insights and automated reporting have been game-changing for our sustainability initiatives.',
    metrics: {
      carbonReduction: 35,
      costSavings: 1200000,
      efficiencyGain: 42
    },
    industry: 'Technology',
    companySize: '10,000+ employees',
    implementationTime: '3 months'
  },
  {
    id: 'manufacturing-inc',
    name: 'Michael Rodriguez',
    position: 'VP of Operations',
    company: 'Manufacturing Inc.',
    companyLogo: '/images/logos/manufacturing-inc.svg',
    testimonial: 'The energy optimization features helped us identify inefficiencies we never knew existed. Our energy intensity dropped by 28% in the first year, and the predictive analytics prevent costly equipment failures.',
    metrics: {
      carbonReduction: 28,
      costSavings: 850000,
      efficiencyGain: 31
    },
    industry: 'Manufacturing',
    companySize: '5,000+ employees',
    implementationTime: '4 months'
  },
  {
    id: 'retail-chain',
    name: 'Emily Johnson',
    position: 'Director of Facilities',
    company: 'Retail Chain Co.',
    companyLogo: '/images/logos/retail-chain.svg',
    testimonial: 'Managing sustainability across 500+ locations was a nightmare before DataFlow. Now we have unified reporting, automated compliance, and our carbon footprint has decreased by 22% while expanding our store network.',
    metrics: {
      carbonReduction: 22,
      costSavings: 2100000,
      efficiencyGain: 38
    },
    industry: 'Retail',
    companySize: '25,000+ employees',
    implementationTime: '6 months'
  },
  {
    id: 'finance-group',
    name: 'David Kim',
    position: 'Head of ESG',
    company: 'Finance Group Ltd.',
    companyLogo: '/images/logos/finance-group.svg',
    testimonial: 'DataFlow\'s comprehensive ESG reporting capabilities have streamlined our regulatory compliance and improved our sustainability ratings. The platform pays for itself through operational savings alone.',
    metrics: {
      carbonReduction: 31,
      costSavings: 950000,
      efficiencyGain: 29
    },
    industry: 'Financial Services',
    companySize: '15,000+ employees',
    implementationTime: '2 months'
  }
]

// Case Studies
export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  image: string
  timeline: string
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'global-manufacturing',
    title: 'Global Manufacturing Giant Cuts Carbon Emissions by 40%',
    subtitle: 'Comprehensive carbon management across 50+ facilities worldwide',
    client: 'Global Manufacturing Corp',
    industry: 'Manufacturing',
    challenge: 'A multinational manufacturing company struggled with fragmented carbon data across facilities, inconsistent reporting standards, and difficulty identifying optimization opportunities.',
    solution: 'Implemented DataFlow\'s integrated carbon management platform with real-time monitoring, automated reporting, and AI-powered optimization recommendations across all facilities.',
    results: [
      {
        metric: 'Carbon Emissions Reduction',
        value: '40%',
        improvement: '120,000 tCO₂e saved annually'
      },
      {
        metric: 'Energy Cost Savings',
        value: '$3.2M',
        improvement: 'Annual operational savings'
      },
      {
        metric: 'Reporting Efficiency',
        value: '85%',
        improvement: 'Reduction in manual reporting time'
      },
      {
        metric: 'Compliance Score',
        value: '98%',
        improvement: 'Improved regulatory compliance'
      }
    ],
    image: '/images/case-studies/manufacturing-facility.jpg',
    timeline: '8 months',
    tags: ['Carbon Management', 'Manufacturing', 'Global Implementation', 'Cost Reduction']
  },
  {
    id: 'smart-cities',
    title: 'Smart City Initiative Achieves Net-Zero Goals 3 Years Early',
    subtitle: 'Municipal carbon management and energy optimization',
    client: 'Metropolitan City Council',
    industry: 'Public Sector',
    challenge: 'City government needed to meet ambitious net-zero commitments while managing diverse municipal facilities, transportation systems, and public services.',
    solution: 'Deployed comprehensive municipal carbon tracking with integrated IoT sensors, predictive analytics, and citizen engagement platforms.',
    results: [
      {
        metric: 'Carbon Neutrality',
        value: '3 years',
        improvement: 'Ahead of schedule'
      },
      {
        metric: 'Energy Efficiency',
        value: '45%',
        improvement: 'Across municipal buildings'
      },
      {
        metric: 'Cost Savings',
        value: '$5.8M',
        improvement: 'Annual municipal savings'
      },
      {
        metric: 'Citizen Engagement',
        value: '72%',
        improvement: 'Participation in sustainability programs'
      }
    ],
    image: '/images/case-studies/smart-city.jpg',
    timeline: '12 months',
    tags: ['Smart Cities', 'Public Sector', 'Net-Zero', 'IoT Integration']
  },
  {
    id: 'retail-transformation',
    title: 'Retail Chain Transforms 1,000+ Stores into Carbon-Neutral Operations',
    subtitle: 'Large-scale retail sustainability transformation',
    client: 'National Retail Chain',
    industry: 'Retail',
    challenge: 'Major retail chain needed to manage carbon footprint across 1,000+ locations while maintaining operational efficiency and customer experience.',
    solution: 'Implemented store-level carbon tracking, automated HVAC optimization, and supply chain carbon management with real-time dashboard monitoring.',
    results: [
      {
        metric: 'Store Emissions',
        value: '55%',
        improvement: 'Reduction per store'
      },
      {
        metric: 'Energy Costs',
        value: '$12M',
        improvement: 'Annual savings across chain'
      },
      {
        metric: 'Customer Satisfaction',
        value: '18%',
        improvement: 'Increase in sustainability perception'
      },
      {
        metric: 'ROI Achievement',
        value: '14 months',
        improvement: 'Payback period'
      }
    ],
    image: '/images/case-studies/retail-stores.jpg',
    timeline: '18 months',
    tags: ['Retail', 'Large Scale', 'Store Operations', 'Supply Chain']
  }
]

// Service Categories
export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  features: string[]
  benefits: string[]
  useCases: string[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'carbon-management',
    name: 'Carbon Management',
    description: 'Comprehensive carbon footprint tracking, reporting, and optimization across your entire organization.',
    icon: '🌱',
    color: 'success',
    features: [
      'Real-time carbon emissions tracking',
      'Automated Scope 1, 2, 3 calculations',
      'Carbon reduction recommendations',
      'Regulatory compliance reporting',
      'Carbon offset marketplace integration'
    ],
    benefits: [
      'Reduce carbon footprint by up to 40%',
      'Ensure regulatory compliance',
      'Improve ESG ratings',
      'Access carbon credit opportunities'
    ],
    useCases: [
      'Corporate sustainability reporting',
      'Supply chain carbon management',
      'Facility emissions optimization',
      'Product lifecycle assessment'
    ]
  },
  {
    id: 'energy-optimization',
    name: 'Energy Optimization',
    description: 'AI-powered energy management and optimization to reduce consumption and costs.',
    icon: '⚡',
    color: 'warning',
    features: [
      'Smart building energy management',
      'Predictive energy analytics',
      'Equipment efficiency monitoring',
      'Renewable energy integration',
      'Demand response automation'
    ],
    benefits: [
      'Cut energy costs by 25-35%',
      'Improve operational efficiency',
      'Reduce equipment downtime',
      'Optimize renewable energy usage'
    ],
    useCases: [
      'Smart building management',
      'Industrial process optimization',
      'Data center efficiency',
      'Renewable energy planning'
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Advanced analytics and insights to drive data-informed sustainability decisions.',
    icon: '📊',
    color: 'primary',
    features: [
      'Custom sustainability dashboards',
      'Predictive modeling and forecasting',
      'Benchmark analysis',
      'Automated report generation',
      'API integrations'
    ],
    benefits: [
      'Make data-driven decisions',
      'Identify optimization opportunities',
      'Track progress against goals',
      'Streamline reporting processes'
    ],
    useCases: [
      'Executive sustainability reporting',
      'Operational performance monitoring',
      'Compliance documentation',
      'Stakeholder communications'
    ]
  },
  {
    id: 'compliance-reporting',
    name: 'Compliance & Reporting',
    description: 'Automated compliance management and regulatory reporting for global standards.',
    icon: '📋',
    color: 'purple',
    features: [
      'Multi-standard compliance tracking',
      'Automated regulatory reporting',
      'Audit trail management',
      'Document management system',
      'Third-party verification support'
    ],
    benefits: [
      'Ensure regulatory compliance',
      'Reduce audit preparation time',
      'Minimize compliance risks',
      'Streamline verification processes'
    ],
    useCases: [
      'CDP reporting',
      'GRI standards compliance',
      'TCFD disclosures',
      'EU taxonomy alignment'
    ]
  }
]

// Company Information
export const companyInfo = {
  name: 'DataFlow',
  tagline: 'Intelligent Data Solutions for Sustainable Business',
  description: 'DataFlow empowers organizations to achieve their sustainability goals through intelligent data management, real-time monitoring, and AI-powered optimization. Our platform helps businesses reduce their carbon footprint, optimize energy consumption, and ensure regulatory compliance while driving operational efficiency.',
  founded: '2019',
  headquarters: 'San Francisco, CA',
  employees: '250+',
  customers: '1,000+',
  countriesServed: '45+',
  totalCarbonManaged: '2.5M tCO₂e',
  totalCostSavings: '$450M+',
  certifications: [
    'ISO 27001',
    'SOC 2 Type II',
    'GDPR Compliant',
    'Carbon Trust Certified'
  ],
  awards: [
    'Best Sustainability Platform 2024',
    'Climate Tech Innovation Award',
    'Enterprise Software Excellence',
    'ESG Technology Leader'
  ]
}

// Platform Statistics
export const platformStats = [
  {
    id: 'carbon-tracked',
    label: 'Carbon Emissions Tracked',
    value: 2500000,
    displayValue: '2.5M+',
    unit: 'tCO₂e',
    description: 'Total carbon emissions monitored across all client facilities'
  },
  {
    id: 'cost-savings',
    label: 'Total Cost Savings',
    value: 450000000,
    displayValue: '$450M+',
    unit: 'USD',
    description: 'Cumulative cost savings achieved by our clients'
  },
  {
    id: 'facilities-managed',
    label: 'Facilities Under Management',
    value: 15000,
    displayValue: '15,000+',
    unit: 'facilities',
    description: 'Buildings and facilities actively monitored by DataFlow'
  },
  {
    id: 'data-points',
    label: 'Data Points Processed Daily',
    value: 50000000,
    displayValue: '50M+',
    unit: 'data points',
    description: 'Real-time data points processed every day'
  }
] 