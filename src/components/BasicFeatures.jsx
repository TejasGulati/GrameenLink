import React, { useState, useRef, useEffect } from 'react'
import { 
  ShoppingCart,
  Package,
  Smartphone,
  AlertCircle,
  TrendingUp,
  User,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  DollarSign,
  CreditCard,
  Zap,
  Clock,
  Shield,
  Heart,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import avatar_1 from '../assets/avatar-1.jpeg'
import avatar_2 from '../assets/avatar-2.jpeg'
import avatar_3 from '../assets/avatar-3.jpeg'
import pharmacy_avatar from '../assets/pharmacy-avatar.jpeg'
import kirana_avatar from '../assets/kirana-avatar.jpeg'
import farmer_avatar from '../assets/farmer-avatar.jpeg'

const features = [
  {
    title: "Smart Inventory",
    description: "Never run out of stock or over-order again",
    icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
    details: [
      "Automated stock tracking with barcode scanning",
      "Low stock alerts via SMS & WhatsApp",
      "Multi-category product organization",
      "Daily sales reports on your phone"
    ],
    benefit: "Reduce stockouts by 70% and save 3 hours weekly"
  },
  {
    title: "Mobile Alerts",
    description: "Get real-time notifications anywhere",
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    details: [
      "Instant SMS alerts for critical events",
      "WhatsApp integration for easy communication",
      "Customizable alert preferences",
      "Works even with basic feature phones"
    ],
    benefit: "Stay informed without needing internet 24/7"
  },
  {
    title: "Sales Analytics",
    description: "Understand what sells and when",
    icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
    details: [
      "Daily/weekly/monthly sales tracking",
      "Top 10 best-selling items report",
      "Customer purchase patterns",
      "Printable reports for bank loans"
    ],
    benefit: "Identify 20% of products driving 80% of revenue"
  },
  {
    title: "Customer Management",
    description: "Build loyalty with regular customers",
    icon: <User className="w-6 h-6 text-purple-600" />,
    details: [
      "Customer profiles with purchase history",
      "Credit tracking with automatic reminders",
      "Loyalty points system",
      "Birthday/anniversary alerts"
    ],
    benefit: "Increase repeat customers by 40%"
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for individual shopkeepers starting out",
    features: [
      "Up to 50 products",
      "Basic inventory tracking",
      "Mobile alerts via SMS",
      "Community support",
      "1 user account"
    ],
    cta: "Start Free",
    popular: false,
    savings: null
  },
  {
    name: "Pro",
    price: "₹500",
    period: "/month",
    description: "For growing businesses that want to scale",
    features: [
      "Unlimited products",
      "WhatsApp + SMS alerts",
      "Advanced sales analytics",
      "Customer management",
      "Priority WhatsApp support",
      "2 user accounts"
    ],
    cta: "Start 14-Day Trial",
    popular: true,
    savings: "Save ₹2000/year"
  },
  {
    name: "Annual Pro",
    price: "₹5000",
    period: "/year",
    description: "Best value for established shops",
    features: [
      "All Pro features",
      "Annual billing (2 months free)",
      "Dedicated account manager",
      "5 user accounts",
      "Year-end tax reports"
    ],
    cta: "Save 17%",
    popular: false,
    savings: "Save ₹1000/year"
  }
]

const testimonials = [
  {
    name: 'Rajesh Grocery',
    location: 'Rural Maharashtra',
    image: kirana_avatar,
    quote: "Reduced my stockouts by 70% with simple alerts. Now I never lose sales when trucks are delayed.",
    results: [
      "₹15,000 more sales/month",
      "3 hours saved weekly",
      "50% fewer expired goods"
    ]
  },
  {
    name: 'Village Pharmacy',
    location: 'Uttar Pradesh',
    image: pharmacy_avatar,
    quote: "Tracking expiry dates manually was hard - now the app reminds me automatically.",
    results: [
      "90% reduction in expired medicines",
      "20% increase in customer trust",
      "5 hours saved monthly"
    ]
  },
  {
    name: 'Farmers Collective Shop',
    location: 'Rajasthan',
    image: farmer_avatar,
    quote: "Even with 2G network, the SMS alerts keep me updated. Perfect for our village conditions.",
    results: [
      "30% faster inventory checks",
      "₹8,000 saved on overstocking",
      "No internet needed"
    ]
  }
]

function BasicFeatures() {
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const dashboardRef = useRef(null)
  const { isAuthenticated, user, setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleFeature = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index)
  }

  const handleSelectPlan = (planName) => {
    const updatedUser = { ...user, plan: 'basic' }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    alert(`You've been enrolled in the ${planName} plan!`)
    navigate('/')
  }

  const scrollToContact = () => {
    navigate('/')
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('./assets/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {isAuthenticated && user?.plan === 'basic' ? (
                  'Your Basic Inventory Tools'
                ) : (
                  <>
                    Simple Inventory for <span className="text-green-200">Local Shops</span>
                  </>
                )}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xl text-green-100"
              >
                {isAuthenticated && user?.plan === 'basic' ? (
                  'Manage your shop inventory with these essential tools'
                ) : (
                  'Affordable, easy-to-use tools designed for small rural businesses with basic smartphones'
                )}
              </motion.p>
              {(!isAuthenticated || user?.plan !== 'basic') && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Link
                    to="/demo"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-green-700 hover:bg-green-50 shadow-sm hover:shadow-md transition-all"
                  >
                    Try Free Demo
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={() => handleSelectPlan('Basic')}
                      className="flex items-center justify-center rounded-md border border-transparent bg-green-600 bg-opacity-60 px-6 py-3 text-base font-medium text-white hover:bg-opacity-70 shadow-sm hover:shadow-md transition-all"
                    >
                      Enroll in Basic Plan
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-md border border-transparent bg-green-600 bg-opacity-60 px-6 py-3 text-base font-medium text-white hover:bg-opacity-70 shadow-sm hover:shadow-md transition-all"
                    >
                      Get Started
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </motion.div>
              )}
              {isAuthenticated && user?.plan === 'basic' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Link
                    to="/inventory"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-green-700 hover:bg-green-50 shadow-sm hover:shadow-md transition-all"
                  >
                    Open Inventory
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              )}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex items-center justify-center space-x-4"
              >
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-green-600"
                    src={avatar_1}
                    alt="Shop owner"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-green-600"
                    src={avatar_2}
                    alt="Shop owner"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-green-600"
                    src={avatar_3}
                    alt="Shop owner"
                  />
                </div>
                <p className="text-sm text-green-100">
                  Trusted by <span className="font-semibold">1,200+</span> local shops
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:px-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden"
              >
                <div ref={dashboardRef} className="absolute inset-0 bg-green-800 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-800 to-green-700 opacity-90"></div>
                  <div className="relative px-8 pt-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">My Shop Dashboard</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-700 text-green-100">
                        OFFLINE MODE
                      </span>
                    </div>
                    
                    {/* Enhanced App Visualization */}
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        { icon: <Package className="mx-auto h-5 w-5 text-green-300" />, value: "42", label: "Items", trend: "steady" },
                        { icon: <DollarSign className="mx-auto h-5 w-5 text-green-300" />, value: "₹2,450", label: "Today", trend: "up" },
                        { icon: <AlertCircle className="mx-auto h-5 w-5 text-green-300" />, value: "3", label: "Low Stock", trend: "down" }
                      ].map((item, index) => (
                        <div key={index} className="bg-green-700 bg-opacity-50 rounded-lg p-2 text-center hover:bg-opacity-70 transition">
                          {item.icon}
                          <div className="text-lg font-bold text-white mt-1">{item.value}</div>
                          <div className="text-xs text-green-200">{item.label}</div>
                          <div className={`mt-1 text-xs ${
                            item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-blue-300'
                          }`}>
                            {item.trend === 'up' ? '↑ 12%' : item.trend === 'down' ? '↓ 5%' : '→'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 bg-green-700 bg-opacity-50 rounded-lg p-3 hover:bg-opacity-70 transition">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-green-200">Low Stock Items</span>
                        <span className="text-xs text-green-300">3 items</span>
                      </div>
                      <div className="mt-2 space-y-2">
                        {[
                          { name: "Rice (5kg)", stock: 2, threshold: 5 },
                          { name: "Sugar", stock: 3, threshold: 4 },
                          { name: "Oil", stock: 5, threshold: 6 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-white">{item.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.stock < item.threshold ? 'bg-amber-500 text-white' : 'bg-green-600 text-green-100'
                            }`}>
                              {item.stock} left
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-green-700 bg-opacity-50 rounded-lg p-3 hover:bg-opacity-70 transition">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-green-200">Today's Sales</span>
                        <span className="text-xs text-green-300">₹2,450</span>
                      </div>
                      <div className="mt-2 h-2 bg-green-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-300" 
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-green-200">
                        <span>₹0</span>
                        <span>₹5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Designed for <span className="text-green-600">Rural Shops</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 space-y-6 text-gray-500"
              >
                <p className="text-lg">
                  Our inventory system works even with poor internet connectivity and basic smartphones - no fancy features, just what you need.
                </p>
                <p className="text-base">
                  Perfect for grocery stores, pharmacies, and small shops in villages with unreliable electricity and internet.
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {[
                  { name: 'Setup Time', value: '<5 minutes', icon: <Clock className="w-5 h-5 text-green-600" /> },
                  { name: 'Languages', value: '12+ Indian', icon: <Globe className="w-5 h-5 text-blue-600" /> },
                  { name: 'Internet Needed', value: 'Occasional', icon: <Shield className="w-5 h-5 text-amber-600" /> },
                  { name: 'Support', value: 'WhatsApp', icon: <Heart className="w-5 w-5 text-purple-600" /> }
                ].map((stat) => (
                  <div key={stat.name} className="border-t-2 border-gray-100 pt-6">
                    <div className="flex items-center mb-2">
                      {stat.icon}
                      <dt className="ml-2 text-base font-medium text-gray-500">{stat.name}</dt>
                    </div>
                    <dd className="text-3xl font-bold tracking-tight text-gray-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Essential Features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to manage your shop better, nothing you don't
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 space-y-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="overflow-hidden bg-white shadow sm:rounded-lg hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFeature(index)}
                  className="w-full px-6 py-5 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-50 flex items-center justify-center">
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
                <AnimatePresence>
                  {expandedFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">INCLUDES</h4>
                          <ul className="space-y-3">
                            {feature.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">YOUR BENEFIT</h4>
                          <p className="text-green-700 font-medium">{feature.benefit}</p>
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            Based on average shop results
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pricing - Only show if not already on basic plan */}
      {(!isAuthenticated || user?.plan !== 'basic') && (
        <div className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simple, Affordable Pricing
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Pay only for what you need. Start free, upgrade anytime.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`rounded-2xl shadow-lg overflow-hidden ${
                    plan.popular ? 'ring-2 ring-green-500 transform md:-translate-y-2' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-green-600 px-6 py-1 text-center">
                      <p className="text-xs font-semibold text-white">MOST POPULAR</p>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-gray-600">{plan.description}</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="ml-1 text-lg font-medium text-gray-500">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <p className="mt-1 text-sm text-green-600 font-medium">{plan.savings}</p>
                    )}
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                          <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      {isAuthenticated ? (
                        <button
                          onClick={() => handleSelectPlan(plan.name)}
                          className={`block w-full py-3 px-6 rounded-md text-center font-medium ${
                            plan.popular
                              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
                              : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                          } transition-all`}
                        >
                          {plan.cta}
                        </button>
                      ) : (
                        <Link
                          to="/register"
                          className={`block w-full py-3 px-6 rounded-md text-center font-medium ${
                            plan.popular
                              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
                              : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                          } transition-all`}
                        >
                          {plan.cta}
                        </Link>
                      )}
                    </div>
                    {plan.price !== 'Free' && (
                      <p className="mt-3 text-xs text-gray-500 text-center">
                        No credit card required for trial
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 text-sm">
                Need more than 5 users? <Link to="/contact" className="text-green-600 hover:text-green-700">Contact us</Link> for enterprise pricing.
              </p>
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Testimonials */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by Local Businesses
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Don't take our word for it. Here's what shop owners say:
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flow-root"
          >
            <div className="-my-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-12"
                >
                  <div className="md:flex md:items-center md:justify-between md:space-x-14">
                    <div className="pt-8 md:flex-1 md:pt-0">
                      <blockquote>
                        <p className="text-2xl font-medium text-gray-900">
                          "{testimonials[currentTestimonial].quote}"
                        </p>
                        <footer className="mt-8">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 inline-flex rounded-full overflow-hidden h-12 w-12 bg-gray-200">
                              <img 
                                src={testimonials[currentTestimonial].image} 
                                alt={testimonials[currentTestimonial].name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-base font-medium text-gray-900">
                                {testimonials[currentTestimonial].name}
                              </div>
                              <div className="text-base font-medium text-green-600">
                                {testimonials[currentTestimonial].location}
                              </div>
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                    <div className="mt-12 md:mt-0 md:flex-1">
                      <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                          <h3 className="ml-2 text-lg font-medium text-gray-900">Their Results:</h3>
                        </div>
                        <ul className="mt-4 space-y-3">
                          {testimonials[currentTestimonial].results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                              <span className="ml-3 text-gray-700">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex justify-center space-x-2"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 w-2 rounded-full ${currentTestimonial === index ? 'bg-green-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto py-16 px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Ready to simplify your shop management?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg leading-6 text-green-200"
            >
              Start with our free plan - no commitment required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/register"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-green-700 hover:bg-green-50 shadow-sm hover:shadow-md transition-all"
              >
                Create Free Account
              </Link>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center rounded-md border border-white px-6 py-3 text-base font-medium text-white hover:bg-green-600 shadow-sm hover:shadow-md transition-all"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Help
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6"
            >
              <p className="text-sm text-green-200">
              Works on any smartphone - no app download needed
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicFeatures