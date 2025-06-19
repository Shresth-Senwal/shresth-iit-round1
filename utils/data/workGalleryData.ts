export interface WorkGalleryItem {
  id: string
  title: string
  description: string
  category: string
  image: string
  images?: string[]
  video?: string
  client: string
  year: number
  tags: string[]
  metrics?: {
    label: string
    value: string
  }[]
  testimonial?: {
    text: string
    author: string
    position: string
  }
}

export interface GalleryCategory {
  id: string
  name: string
  count: number
  color: string
}

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'All Projects', count: 12, color: 'primary' },
  { id: 'dashboard', name: 'Dashboards', count: 4, color: 'blue' },
  { id: 'analytics', name: 'Analytics', count: 3, color: 'green' },
  { id: 'automation', name: 'Automation', count: 3, color: 'purple' },
  { id: 'integration', name: 'Integration', count: 2, color: 'orange' }
]

export const workGalleryData: WorkGalleryItem[] = [
  {
    id: '1',
    title: 'Carbon Footprint Analytics Dashboard',
    description: 'Comprehensive dashboard for tracking and analyzing carbon emissions across enterprise operations.',
    category: 'dashboard',
    image: '/images/work-showcase/carbon-dashboard.jpg',
    images: [
      '/images/work-showcase/carbon-dashboard.jpg',
      '/images/work-showcase/carbon-dashboard-2.jpg',
      '/images/work-showcase/carbon-dashboard-3.jpg'
    ],
    client: 'GreenTech Solutions',
    year: 2024,
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Data Points Tracked', value: '2.3M+' },
      { label: 'Reduction in Emissions', value: '32%' },
      { label: 'Processing Speed', value: '85% faster' }
    ],
    testimonial: {
      text: 'This dashboard transformed how we track and manage our carbon footprint. The insights are invaluable.',
      author: 'Sarah Chen',
      position: 'Sustainability Director'
    }
  },
  {
    id: '2',
    title: 'Real-time Energy Monitoring System',
    description: 'Advanced monitoring system for tracking energy consumption across multiple facilities.',
    category: 'analytics',
    image: '/images/work-showcase/energy-monitoring.jpg',
    images: [
      '/images/work-showcase/energy-monitoring.jpg',
      '/images/work-showcase/energy-monitoring-2.jpg'
    ],
    client: 'EcoFacilities Corp',
    year: 2024,
    tags: ['Vue.js', 'Chart.js', 'WebSocket', 'MongoDB'],
    metrics: [
      { label: 'Facilities Monitored', value: '150+' },
      { label: 'Energy Savings', value: '28%' },
      { label: 'Real-time Updates', value: '<1s' }
    ],
    testimonial: {
      text: 'The real-time monitoring capabilities have revolutionized our energy management strategy.',
      author: 'Michael Rodriguez',
      position: 'Operations Manager'
    }
  },
  {
    id: '3',
    title: 'Automated Reporting Platform',
    description: 'Intelligent platform that automatically generates compliance reports and sustainability metrics.',
    category: 'automation',
    image: '/images/work-showcase/automated-reporting.jpg',
    client: 'Compliance Plus',
    year: 2023,
    tags: ['Python', 'FastAPI', 'Celery', 'Redis'],
    metrics: [
      { label: 'Reports Generated', value: '10K+' },
      { label: 'Time Saved', value: '75%' },
      { label: 'Accuracy Rate', value: '99.8%' }
    ],
    testimonial: {
      text: 'This platform has eliminated manual reporting errors and saved us countless hours.',
      author: 'Lisa Thompson',
      position: 'Compliance Officer'
    }
  },
  {
    id: '4',
    title: 'Supply Chain Sustainability Tracker',
    description: 'Comprehensive tracking system for monitoring sustainability metrics across the supply chain.',
    category: 'dashboard',
    image: '/images/work-showcase/supply-chain.jpg',
    client: 'Global Supply Co',
    year: 2023,
    tags: ['Angular', 'TypeScript', 'GraphQL', 'Neo4j'],
    metrics: [
      { label: 'Suppliers Tracked', value: '500+' },
      { label: 'Transparency Increase', value: '65%' },
      { label: 'Risk Reduction', value: '40%' }
    ]
  },
  {
    id: '5',
    title: 'Predictive Analytics Engine',
    description: 'Machine learning-powered engine for predicting environmental impact and optimization opportunities.',
    category: 'analytics',
    image: '/images/work-showcase/predictive-analytics.jpg',
    client: 'FutureTech Industries',
    year: 2024,
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Apache Spark'],
    metrics: [
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'Cost Savings', value: '$2.1M' },
      { label: 'Models Deployed', value: '25+' }
    ]
  },
  {
    id: '6',
    title: 'IoT Device Integration Hub',
    description: 'Centralized hub for integrating and managing IoT devices for environmental monitoring.',
    category: 'integration',
    image: '/images/work-showcase/iot-integration.jpg',
    client: 'SmartSense Technologies',
    year: 2023,
    tags: ['Node.js', 'MQTT', 'InfluxDB', 'Grafana'],
    metrics: [
      { label: 'Devices Connected', value: '1,200+' },
      { label: 'Data Points/Day', value: '50M+' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: '7',
    title: 'Waste Management Optimization',
    description: 'AI-powered system for optimizing waste collection routes and reducing environmental impact.',
    category: 'automation',
    image: '/images/work-showcase/waste-management.jpg',
    client: 'CleanCity Solutions',
    year: 2024,
    tags: ['React', 'Python', 'OpenAI API', 'PostGIS'],
    metrics: [
      { label: 'Route Efficiency', value: '+45%' },
      { label: 'Fuel Savings', value: '30%' },
      { label: 'Waste Diverted', value: '85%' }
    ]
  },
  {
    id: '8',
    title: 'Renewable Energy Portfolio Dashboard',
    description: 'Comprehensive dashboard for managing and optimizing renewable energy investments.',
    category: 'dashboard',
    image: '/images/work-showcase/renewable-energy.jpg',
    client: 'GreenInvest Partners',
    year: 2023,
    tags: ['Vue.js', 'D3.js', 'Express.js', 'TimescaleDB'],
    metrics: [
      { label: 'Portfolio Value', value: '$150M+' },
      { label: 'ROI Improvement', value: '22%' },
      { label: 'Projects Tracked', value: '75+' }
    ]
  },
  {
    id: '9',
    title: 'Carbon Credit Trading Platform',
    description: 'Blockchain-based platform for transparent and efficient carbon credit trading.',
    category: 'integration',
    image: '/images/work-showcase/carbon-trading.jpg',
    client: 'CarbonMarket Exchange',
    year: 2024,
    tags: ['Solidity', 'Web3.js', 'React', 'IPFS'],
    metrics: [
      { label: 'Credits Traded', value: '500K+' },
      { label: 'Transaction Volume', value: '$50M+' },
      { label: 'Platform Users', value: '2,500+' }
    ]
  },
  {
    id: '10',
    title: 'Environmental Impact Assessment Tool',
    description: 'Comprehensive tool for assessing and visualizing environmental impact of business operations.',
    category: 'analytics',
    image: '/images/work-showcase/impact-assessment.jpg',
    client: 'EcoAssess Consulting',
    year: 2023,
    tags: ['Angular', 'Python', 'Pandas', 'Plotly'],
    metrics: [
      { label: 'Assessments Completed', value: '1,000+' },
      { label: 'Data Accuracy', value: '96%' },
      { label: 'Report Generation', value: '80% faster' }
    ]
  },
  {
    id: '11',
    title: 'Smart Building Management System',
    description: 'Intelligent system for optimizing building operations and reducing energy consumption.',
    category: 'automation',
    image: '/images/work-showcase/smart-building.jpg',
    client: 'IntelliBuildings Inc',
    year: 2024,
    tags: ['React Native', 'IoT', 'Azure IoT', 'Power BI'],
    metrics: [
      { label: 'Buildings Managed', value: '200+' },
      { label: 'Energy Reduction', value: '35%' },
      { label: 'Maintenance Savings', value: '50%' }
    ]
  },
  {
    id: '12',
    title: 'Sustainability Reporting Suite',
    description: 'Complete suite for generating comprehensive sustainability reports and ESG metrics.',
    category: 'dashboard',
    image: '/images/work-showcase/sustainability-reporting.jpg',
    client: 'ESG Analytics Corp',
    year: 2023,
    tags: ['Next.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    metrics: [
      { label: 'Reports Generated', value: '5,000+' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Client Satisfaction', value: '4.9/5' }
    ]
  }
] 