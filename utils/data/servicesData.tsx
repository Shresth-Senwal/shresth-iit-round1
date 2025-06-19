import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  ChartBarIcon,
  PaintBrushIcon,
  CogIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

export const servicesData = [
  {
    id: 'web-development',
    icon: <CodeBracketIcon className="w-8 h-8" />,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies like Next.js, React, and TypeScript.',
    features: [
      'Responsive Design',
      'Performance Optimized',
      'SEO Friendly',
      'Modern Technologies'
    ]
  },
  {
    id: 'mobile-apps',
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps that deliver native performance and user experience across iOS and Android.',
    features: [
      'Cross-Platform',
      'Native Performance',
      'Intuitive UI/UX',
      'App Store Ready'
    ]
  },
  {
    id: 'data-analytics',
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with custom dashboards and visualization tools.',
    features: [
      'Interactive Dashboards',
      'Real-time Analytics',
      'Custom Reports',
      'Data Visualization'
    ]
  },
  {
    id: 'ui-design',
    icon: <PaintBrushIcon className="w-8 h-8" />,
    title: 'UI/UX Design',
    description: 'Beautiful, user-centered designs that enhance user experience and drive engagement.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems'
    ]
  },
  {
    id: 'automation',
    icon: <CogIcon className="w-8 h-8" />,
    title: 'Process Automation',
    description: 'Streamline your workflows with intelligent automation solutions that save time and reduce errors.',
    features: [
      'Workflow Automation',
      'API Integration',
      'Task Scheduling',
      'Error Handling'
    ]
  },
  {
    id: 'optimization',
    icon: <RocketLaunchIcon className="w-8 h-8" />,
    title: 'Performance Optimization',
    description: 'Boost your application\'s speed and efficiency with advanced optimization techniques.',
    features: [
      'Speed Optimization',
      'Code Splitting',
      'Caching Strategies',
      'Bundle Analysis'
    ]
  }
]

export const testimonialsData = [
  {
    id: 'testimonial-1',
    content: 'The team delivered an exceptional web application that exceeded our expectations. The performance and user experience are outstanding.',
    author: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b169df2a?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 'testimonial-2',
    content: 'Working with this team was a pleasure. They understood our vision and brought it to life with incredible attention to detail.',
    author: 'Michael Chen',
    role: 'CEO',
    company: 'StartupXYZ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 'testimonial-3',
    content: 'The mobile app they developed for us has received fantastic feedback from our users. Highly recommended!',
    author: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'InnovateCo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5
  }
] 