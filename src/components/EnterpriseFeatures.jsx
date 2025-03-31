import React, { useState, useRef, useEffect } from 'react'
import { 
  BarChart2,
  PieChart,
  Package,
  Layers,
  Zap,
  Database,
  Globe,
  Award,
  Users,
  Truck,
  Clock,
  Shield,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  Target,
  MapPin,
  Activity,
  TrendingUp,
  BookOpen,
  Link as LinkIcon
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import avatar_1 from '../assets/avatar-1.jpeg'
import avatar_2 from '../assets/avatar-2.jpeg'
import avatar_3 from '../assets/avatar-3.jpeg'
import govt_logo from '../assets/govt-logo.jpeg'
import ngo_logo from '../assets/ngo-logo.jpeg'
import agritech_logo from '../assets/agritech-logo.jpeg'

const features = [
  {
    title: "Integrated Dashboard",
    description: "Command center for your entire rural supply chain operation",
    icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
    details: [
      "Real-time monitoring of all supply chain components",
      "Customizable KPI dashboards for each team",
      "Role-based access control with audit logs",
      "Multi-location inventory synchronization"
    ],
    benefit: "Reduce operational decision time by 65% with centralized data"
  },
  {
    title: "Blockchain Transparency",
    description: "Tamper-proof supply chain tracking from farm to consumer",
    icon: <Database className="w-6 h-6 text-purple-600" />,
    details: [
      "Smart contract automation for payments",
      "End-to-end product provenance tracking",
      "Fraud prevention with immutable records",
      "Fair trade certification integration"
    ],
    benefit: "Increase farmer payments by 30% while ensuring consumer trust"
  },
  {
    title: "Drone Logistics Hub",
    description: "Automated aerial delivery network management",
    icon: <Zap className="w-6 h-6 text-amber-600" />,
    details: [
      "AI-powered route optimization",
      "Weather and no-fly zone monitoring",
      "Payload capacity planning tools",
      "Regulatory compliance tracking"
    ],
    benefit: "Achieve 3x faster deliveries at 50% lower cost than vans"
  },
  {
    title: "Inventory AI",
    description: "Predictive stock management across your network",
    icon: <Layers className="w-6 h-6 text-green-600" />,
    details: [
      "Machine learning demand forecasting",
      "Automated replenishment triggers",
      "Waste reduction analytics",
      "Seasonal trend analysis"
    ],
    benefit: "Reduce stockouts by 80% and waste by 45%"
  },
  {
    title: "Mobile Retail Network",
    description: "Fleet management for commerce vans",
    icon: <Truck className="w-6 h-6 text-indigo-600" />,
    details: [
      "Dynamic route scheduling",
      "Van inventory tracking",
      "Sales performance by route/van",
      "Fuel efficiency monitoring"
    ],
    benefit: "Increase van productivity by 2.5x with optimized routing"
  },
  {
    title: "Kiosk Management",
    description: "Remote control of solar-powered digital hubs",
    icon: <Globe className="w-6 h-6 text-teal-600" />,
    details: [
      "Remote kiosk health monitoring",
      "Content distribution system",
      "Offline transaction syncing",
      "Usage analytics by village"
    ],
    benefit: "Extend your reach to offline communities seamlessly"
  }
]

const pricingTiers = [
  {
    name: "Pilot",
    price: "₹25,000",
    period: "/month",
    description: "For testing in 1-2 villages",
    features: [
      "2 admin users",
      "1 location dashboard",
      "Basic analytics",
      "Email support",
      "Up to 5 drone deliveries/month"
    ],
    cta: "Start Pilot",
    recommended: false
  },
  {
    name: "Growth",
    price: "₹75,000",
    period: "/month",
    description: "For expanding to 5-10 villages",
    features: [
      "5 admin users",
      "Multi-location dashboard",
      "Advanced analytics",
      "Priority support",
      "Up to 50 drone deliveries/month",
      "Blockchain transparency"
    ],
    cta: "Scale Up",
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations",
    features: [
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 support",
      "Unlimited drone deliveries",
      "White-label options",
      "API access"
    ],
    cta: "Contact Sales",
    recommended: false
  }
]

const caseStudies = [
  {
    title: "AgriTech Startup",
    location: "Madhya Pradesh",
    challenge: "Needed to prove supply chain efficiency to Series B investors",
    solution: "Implemented our dashboard with blockchain tracking",
    results: [
      "Secured $4M funding with transparent metrics",
      "Reduced delivery costs by 55%",
      "Increased farmer participation by 120%"
    ],
    logo: agritech_logo
  },
  {
    title: "Rural Development NGO",
    location: "Odisha",
    challenge: "Lacked visibility across 15 village operations",
    solution: "Deployed our integrated platform with kiosks",
    results: [
      "Reduced reporting time by 70%",
      "Improved donor confidence with real-time impact data",
      "Scaled to 30 villages in 6 months"
    ],
    logo: ngo_logo
  },
  {
    title: "Government Program",
    location: "Rajasthan",
    challenge: "Needed audit-proof distribution system for subsidies",
    solution: "Blockchain tracking with mobile retail integration",
    results: [
      "Eliminated 90% of leakage",
      "Benefited 50,000+ farmers",
      "Won national innovation award"
    ],
    logo: govt_logo
  }
]

const stats = [
  { name: 'Villages Covered', value: '50+', change: '+25%', changeType: 'positive' },
  { name: 'Delivery Accuracy', value: '95%', change: '+8%', changeType: 'positive' },
  { name: 'Cost Reduction', value: '50%', change: '-12%', changeType: 'negative' },
  { name: 'Farmer Income Impact', value: '30%', change: '+15%', changeType: 'positive' },
  { name: 'Investor ROI', value: '5.2x', change: '+1.8x', changeType: 'positive' },
  { name: 'Implementation Time', value: '8 weeks', change: '-3 weeks', changeType: 'negative' }
]

function EnterpriseFeatures() {
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0)
  const dashboardRef = useRef(null)
  const { isAuthenticated, user, setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleFeature = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index)
  }

  const handleSelectPlan = (planName) => {
    if (isAuthenticated) {
      const updatedUser = { ...user, plan: planName.toLowerCase() }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      alert(`You've been upgraded to ${planName} plan with full access!`)
      navigate('/')
    }
  }

  const scrollToContact = () => {
    navigate('/')
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const contactCardToggle = contactSection.querySelector('[class*="cursor-pointer"]')
        if (contactCardToggle) {
          const isCollapsed = contactSection.querySelector('[class*="max-h-0"]')
          if (isCollapsed) {
            contactCardToggle.click()
          }
        }
        
        window.scrollTo({
          top: contactSection.offsetTop - 60,
          behavior: 'smooth'
        })
      }
    }, 150)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('./assets/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {isAuthenticated && user?.plan === 'enterprise' ? (
                  'Your Enterprise Platform'
                ) : (
                  <>
                    Enterprise Supply Chain Platform for <span className="text-blue-200">Rural Impact</span>
                  </>
                )}
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                {isAuthenticated && user?.plan === 'enterprise' ? (
                  'Access all 6 integrated components below'
                ) : (
                  'For funded startups and NGOs scaling rural operations with investor-grade visibility'
                )}
              </p>
              {(!isAuthenticated || user?.plan !== 'enterprise') && (
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/demo"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow-md transition-all"
                  >
                    Live Demo
                    <Activity className="ml-2 h-4 w-4" />
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={() => handleSelectPlan('Enterprise')}
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 bg-opacity-60 px-6 py-3 text-base font-medium text-white hover:bg-opacity-70 shadow-sm hover:shadow-md transition-all"
                    >
                      Upgrade to Enterprise
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 bg-opacity-60 px-6 py-3 text-base font-medium text-white hover:bg-opacity-70 shadow-sm hover:shadow-md transition-all"
                    >
                      Get Started
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
              {isAuthenticated && user?.plan === 'enterprise' && (
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow-md transition-all"
                  >
                    Go to Dashboard
                    <Activity className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}
              <div className="mt-8 flex items-center justify-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-600"
                    src={avatar_1}
                    alt="Enterprise user"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-600"
                    src={avatar_2}
                    alt="Enterprise user"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-600"
                    src={avatar_3}
                    alt="Enterprise user"
                  />
                </div>
                <p className="text-sm text-blue-100">
                  Trusted by <span className="font-semibold">30+</span> funded organizations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:px-0">
              <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                <div ref={dashboardRef} className="absolute inset-0 bg-blue-900 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-800 opacity-90"></div>
                  <div className="relative px-8 pt-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Enterprise Command Center</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-700 text-blue-100">
                        LIVE DATA
                      </span>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        { icon: <Truck className="mx-auto h-5 w-5 text-blue-300" />, value: "8", label: "Vans Active", trend: "up" },
                        { icon: <Zap className="mx-auto h-5 w-5 text-blue-300" />, value: "12", label: "Drones", trend: "steady" },
                        { icon: <Package className="mx-auto h-5 w-5 text-blue-300" />, value: "95%", label: "Delivered", trend: "up" }
                      ].map((item, index) => (
                        <div key={index} className="bg-blue-800 bg-opacity-50 rounded-lg p-3 text-center hover:bg-opacity-70 transition">
                          {item.icon}
                          <div className="text-xl font-bold text-white mt-1">{item.value}</div>
                          <div className="text-xs text-blue-200">{item.label}</div>
                          <div className={`mt-1 text-xs ${
                            item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-blue-300'
                          }`}>
                            {item.trend === 'up' ? '↑ 12%' : item.trend === 'down' ? '↓ 5%' : '→'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 bg-blue-800 bg-opacity-50 rounded-lg p-3 hover:bg-opacity-70 transition">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-200">Inventory Levels</span>
                        <span className="text-xs text-blue-300">Updated 2m ago</span>
                      </div>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        {[
                          { name: "Rice", level: 70, threshold: 30 },
                          { name: "Med", level: 45, threshold: 40 },
                          { name: "Fert", level: 85, threshold: 20 },
                          { name: "Fuel", level: 60, threshold: 25 }
                        ].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-blue-300 mb-1">{item.name}</div>
                            <div className="relative h-2 bg-blue-700 rounded-full overflow-hidden">
                              <div 
                                className={`absolute h-full ${
                                  item.level < item.threshold ? 'bg-red-400' : 'bg-green-400'
                                }`} 
                                style={{ width: `${item.level}%` }}
                              ></div>
                            </div>
                            <div className="text-xs mt-1 text-blue-200">{item.level}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-blue-800 bg-opacity-50 rounded-lg p-3 hover:bg-opacity-70 transition">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-200">This Week's Deliveries</span>
                        <span className="text-xs text-blue-300">23/30 completed</span>
                      </div>
                      <div className="mt-2 flex items-end space-x-1 h-16">
                        {[5, 8, 6, 9, 7, 8, 10].map((value, index) => (
                          <div 
                            key={index}
                            className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm relative group"
                            style={{ height: `${value * 6}px` }}
                          >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}: {value*3} deliveries
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Investor-Grade <span className="text-blue-600">Visibility</span>
              </h2>
              <div className="mt-6 space-y-6 text-gray-500">
                <p className="text-lg">
                  Our enterprise platform provides the operational control and reporting capabilities needed to scale rural supply chains efficiently while attracting investment.
                </p>
                <p className="text-base">
                  Designed for organizations with funding looking to maximize impact while maintaining financial sustainability.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {stats.map((stat) => (
                  <div key={stat.name} className="border-t-2 border-gray-100 pt-6">
                    <dt className="text-base font-medium text-gray-500">{stat.name}</dt>
                    <dd className="text-3xl font-bold tracking-tight text-gray-900 flex items-end">
                      {stat.value}
                      <span className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Feature Set
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to manage complex rural supply chains at scale
            </p>
          </div>

          <div className="mt-16 space-y-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="overflow-hidden bg-white shadow sm:rounded-lg hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFeature(index)}
                  className="w-full px-6 py-5 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                    {expandedFeature === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {expandedFeature === index && (
                  <div className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-3">CAPABILITIES</h4>
                        <ul className="space-y-3">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">INVESTOR IMPACT</h4>
                        <p className="text-blue-700 font-medium">{feature.benefit}</p>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                          Verified with pilot customers
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Case Studies */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Impact
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              How organizations are using our platform to scale rural operations
            </p>
          </div>

          <div className="mt-16 flow-root">
            <div className="-my-12">
              <div key={currentCaseStudy} className="py-12">
                <div className="md:flex md:items-center md:justify-between md:space-x-14">
                  <div className="pt-8 md:flex-1 md:pt-0">
                    <div className="flex items-center mb-4">
                      <img 
                        src={caseStudies[currentCaseStudy].logo} 
                        alt={caseStudies[currentCaseStudy].title}
                        className="h-12 w-12 object-cover rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{caseStudies[currentCaseStudy].title}</h3>
                        <p className="text-blue-600 text-sm">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          {caseStudies[currentCaseStudy].location}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">CHALLENGE</h4>
                        <p className="text-gray-700">{caseStudies[currentCaseStudy].challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">OUR SOLUTION</h4>
                        <p className="text-gray-700">{caseStudies[currentCaseStudy].solution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 md:mt-0 md:flex-1">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Target className="h-6 w-6 text-blue-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">Key Results</h3>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {caseStudies[currentCaseStudy].results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
                            <span className="ml-3 text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        {isAuthenticated ? (
                          <Link
                            to="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View your dashboard
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        ) : (
                          <Link
                            to="/register"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Create account to get started
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCaseStudy(index)}
                className={`h-2 w-2 rounded-full ${currentCaseStudy === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section - Only show if not already on enterprise plan */}
      {(!isAuthenticated || user?.plan !== 'enterprise') && (
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Flexible Pricing
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Scale your investment as you grow your impact
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-2xl shadow-lg overflow-hidden ${
                    tier.recommended ? 'ring-2 ring-blue-500 transform md:-translate-y-2' : 'border border-gray-200'
                  }`}
                >
                  {tier.recommended && (
                    <div className="bg-blue-600 px-6 py-1 text-center">
                      <p className="text-xs font-semibold text-white">RECOMMENDED</p>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                    <p className="mt-2 text-gray-600">{tier.description}</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                      <span className="ml-1 text-lg font-medium text-gray-500">{tier.period}</span>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
                          <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      {isAuthenticated ? (
                        <button
                          onClick={() => handleSelectPlan(tier.name)}
                          className={`block w-full py-3 px-6 rounded-md text-center font-medium ${
                            tier.recommended
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                              : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                          } transition-all`}
                        >
                          {tier.cta}
                        </button>
                      ) : (
                        <Link
                          to={tier.name === 'Enterprise' ? '/' : '/register'}
                          onClick={tier.name === 'Enterprise' ? scrollToContact : undefined}
                          className={`block w-full py-3 px-6 rounded-md text-center font-medium ${
                            tier.recommended
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                              : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                          } transition-all`}
                        >
                          {tier.cta}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white p-6 rounded-xl shadow-sm max-w-3xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Need custom implementation?</h3>
                <p className="mt-2 text-gray-600">
                  Our team can design a tailored solution for your specific requirements and scale.
                </p>
                <div className="mt-4">
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Request Consultation
                    <BookOpen className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investor CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Investor Ready Metrics
              </h2>
              <p className="mt-4 text-lg text-blue-100 max-w-lg">
                Our platform provides the transparency and reporting investors demand for rural impact ventures.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-lg font-medium text-white mb-4">Key Investor Features:</h3>
                <ul className="space-y-3">
                  {[
                    "Real-time impact dashboards",
                    "Financial & operational KPIs",
                    "Blockchain-verified reporting",
                    "Scalability metrics",
                    "ESG compliance tracking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                      <span className="ml-3 text-blue-100">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/investors"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-900 bg-white hover:bg-gray-100"
                  >
                    Investor Resources
                    <LinkIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to transform your rural operations?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Schedule a demo to see how our enterprise platform can scale your impact while attracting investment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/demo"
              className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-medium text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all"
            >
              Live Demo
            </Link>
            <button
              onClick={scrollToContact}
              className="flex items-center justify-center rounded-md border border-blue-600 px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterpriseFeatures