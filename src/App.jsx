// App.js
import React, { useState, lazy, Suspense, useEffect, useRef } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  Navigate, 
  useLocation 
} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AuthProvider, useAuth } from './context/AuthContext'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowRight, 
  CheckCircle, 
  X,
  DollarSign,
  Hand,
  Users,
  Target,
  Leaf,
  Truck,
  Clock,
  BarChart2,
  Globe,
  Award,
  Shield,
  Heart,
  Zap,
  BookOpen,
  Database,
  Sparkles,
  UserPlus,
  LogIn,
  User,
  ChevronDown,
  Settings,
  Key,
  LogOut
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

import Navbar from './components/Navbar'
import heroVideo from './assets/animation.mp4'
import impactVideo from './assets/impact-video.mp4'

const DroneDashboard = lazy(() => import('./components/DroneDashboard'))
const InventoryOptimization = lazy(() => import('./components/InventoryOptimization'))
const MobileRetailVan = lazy(() => import('./components/MobileRetailVan'))
const SustainabilityTracker = lazy(() => import('./components/SustainabilityTracker'))
const VillageKiosk = lazy(() => import('./components/VillageKiosk'))
const BlockchainTransparency = lazy(() => import('./components/BlockchainTransparency'))
const InvestorDashboard = lazy(() => import('./components/InvestorDashboard'))
const LiveDemo = lazy(() => import('./components/LiveDemo'))
const EnterpriseFeatures = lazy(() => import('./components/EnterpriseFeatures'))
const BasicFeatures = lazy(() => import('./components/BasicFeatures'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Profile = lazy(() => import('./components/Profile'))

const STATS = [
  { value: '50%', label: 'Cost Reduction' },
  { value: '3x', label: 'Faster Delivery' },
  { value: '250K+', label: 'Lives Impacted' },
  { value: '95%', label: 'Delivery Accuracy' }
]

const PRODUCT_TIERS = [
  {
    name: "Basic",
    price: "Free to ₹500/month",
    description: "For local shops and small entrepreneurs",
    features: [
      "Basic inventory management",
      "Single-location tracking",
      "Mobile alerts",
      "WhatsApp integration",
      "Basic reporting"
    ],
    cta: "Start Free Trial",
    icon: <BookOpen className="w-6 h-6 text-green-600" />
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    description: "For funded startups and NGOs",
    features: [
      "All 6 integrated components",
      "Multi-location dashboard",
      "Investor-ready analytics",
      "Blockchain transparency",
      "Drone logistics coordination",
      "Priority support"
    ],
    cta: "Request Demo",
    icon: <Zap className="w-6 h-6 text-blue-600" />
  }
]

const FOOTER_LINKS = [
  {
    title: 'Solutions',
    links: [
      { name: 'Enterprise Platform', href: '/enterprise' },
      { name: 'Basic Inventory', href: '/basic' },
      { name: 'Investor Dashboard', href: '/investors' },
      { name: 'Live Demo', href: '/demo' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Impact', href: '/impact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  }
]

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [-20, 20],
            y: [-10, 10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [10, -10],
            y: [20, -20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </motion.div>
      <motion.p 
        className="mt-6 text-lg font-medium text-gray-700"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading GrameenLink...
      </motion.p>
    </div>
  )
}

const StatCard = ({ value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-transparent p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
    >
      <h3 className="text-3xl font-bold text-green-600 mb-1 group-hover:text-green-700 transition-colors">
        {value}
      </h3>
      <p className="text-gray-600 text-xs font-medium">{label}</p>
      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle, center = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`${center ? 'text-center' : 'text-left'} mb-8`}
  >
    <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-800 bg-clip-text">
      {title}
    </h2>
    <div className="relative inline-block">
      <p className="text-base text-gray-600 max-w-2xl mx-auto relative z-10">
        {subtitle}
      </p>
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-green-100 opacity-60 -z-0"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ originX: 0 }}
      />
    </div>
  </motion.div>
)

const ProductTierCard = ({ tier }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className={`bg-white rounded-xl shadow-md overflow-hidden border ${
      tier.name === 'Enterprise' 
        ? 'border-blue-200 ring-2 ring-blue-100' 
        : 'border-green-200'
    }`}
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-md bg-gradient-to-br from-green-50 to-green-100 text-green-600 mr-3 shadow-inner">
          {tier.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
          <p className="text-gray-600 text-sm">{tier.description}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <span className="text-2xl font-bold text-gray-900">{tier.price}</span>
      </div>
      
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        to={tier.name === 'Enterprise' ? '/enterprise' : '/basic'}
        className={`w-full block text-center px-4 py-3 rounded-lg font-medium transition-all ${
          tier.name === 'Enterprise'
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
            : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  </motion.div>
)

const AuthCTASection = () => {
  const { isAuthenticated, logout } = useAuth()
  
  if (isAuthenticated) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            title="Ready to Transform Rural Supply Chains?"
            subtitle="Access your dashboard or explore more features"
            center={true}
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/solutions"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center"
            >
              <Database className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-8 py-4 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          title="Ready to Transform Rural Supply Chains?" 
          subtitle="Join our platform and start making an impact today"
          center={true}
        />
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Free Account
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Login to Dashboard
          </Link>
        </div>
        <p className="text-gray-600 mt-6 text-sm">
          No credit card required. Get started in minutes.
        </p>
      </div>
    </section>
  )
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        message: '',
        interest: 'general'
      })
      
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1000)
  }

  const closeSuccessMessage = () => {
    setIsSubmitted(false)
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions or want to collaborate? Our team is ready to help you transform rural supply chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-green-100 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-3">We typically respond within 24 hours</p>
                  <a href="mailto:grameenlinkservice@gmail.com" className="inline-flex items-center text-green-600 hover:text-green-700 transition">
                    <span>grameenlinkservice@gmail.com</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-3">Available Monday to Friday, 9AM-6PM</p>
                  <a href="tel:+919868629191" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition">
                    <span>+91 98686 29191</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-5">
                <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600 mb-3">Our headquarters in Delhi</p>
                  <address className="not-italic text-gray-700">
                    Moti Nagar,<br />
                    Delhi, India
                  </address>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="mb-5">
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="z-10"
                  >
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Message Sent Successfully!</p>
                          <p className="text-green-700 text-xs mt-1">Thank you for contacting us. We'll get back to you shortly.</p>
                        </div>
                      </div>
                      <button 
                        onClick={closeSuccessMessage}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">I'm interested in</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    disabled={isSubmitting}
                  >
                    <option value="general">General Information</option>
                    <option value="basic">Basic Plan for Local Shops</option>
                    <option value="enterprise">Enterprise Solution</option>
                    <option value="investment">Investment Opportunity</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Send Message</span>
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}

const ImpactSection = () => {
  const impactMetrics = [
    { 
      id: 'communities',
      icon: <MapPin className="w-6 h-6 text-green-600" />, 
      number: "50+", 
      label: "Target Rural Communities",
      description: "Across 5 states in India with plans to expand nationwide"
    },
    { 
      id: 'lives',
      icon: <Users className="w-6 h-6 text-blue-600" />, 
      number: "250K+", 
      label: "Potential Lives Impacted",
      description: "Through improved access to essential goods and services"
    },
    { 
      id: 'efficiency',
      icon: <Target className="w-6 h-6 text-purple-600" />, 
      number: "95%", 
      label: "Projected Supply Chain Efficiency",
      description: "Reduction in delivery times and operational costs"
    },
    { 
      id: 'sustainability',
      icon: <Leaf className="w-6 h-6 text-emerald-600" />, 
      number: "80%", 
      label: "Planned Carbon Reduction",
      description: "Through optimized logistics and renewable energy use"
    },
    { 
      id: 'delivery',
      icon: <Truck className="w-6 h-6 text-amber-600" />, 
      number: "3x", 
      label: "Expected Faster Deliveries",
      description: "Compared to traditional rural supply chains"
    },
    { 
      id: 'employment',
      icon: <Clock className="w-6 h-6 text-indigo-600" />, 
      number: "500+", 
      label: "Potential Jobs Created",
      description: "Local employment opportunities in rural areas"
    }
  ]

  return (
    <section id="impact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-md w-full h-[500px] md:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-20 rounded-xl"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover" 
            >
              <source src={impactVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="space-y-6">
            <div className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-3">
              Future Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Transforming <span className="text-green-600">Rural Lives</span> Through Technology
            </h2>
            <p className="text-gray-600 text-sm">
              Our solutions are designed to make a tangible difference in rural communities across India.
            </p>
            <ul className="space-y-3">
              {[
                "50% reduction in projected delivery times",
                "95% increase in potential farmer incomes",
                "300+ villages targeted for connection",
                "Zero waste supply chain model"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={`metric-${metric.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {metric.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.number}</h3>
                  <p className="text-md font-medium text-gray-800 mb-2">{metric.label}</p>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const InvestorsSection = () => {
  const InvestorBenefits = [
    { 
      id: 1, 
      title: "Scalable Model", 
      description: "Designed to work across diverse rural markets with clear growth metrics",
      icon: <BarChart2 className="w-6 h-6 text-green-600" />
    },
    { 
      id: 2, 
      title: "Strong ROI Potential", 
      description: "Projected 25%+ annual returns with clear path to profitability",
      icon: <DollarSign className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 3, 
      title: "Social Impact", 
      description: "Tangible ESG benefits with measurable community outcomes",
      icon: <Heart className="w-6 h-6 text-purple-600" />
    },
    { 
      id: 4, 
      title: "Global Potential", 
      description: "Model easily adaptable to emerging markets worldwide",
      icon: <Globe className="w-6 h-6 text-amber-600" />
    },
    { 
      id: 5, 
      title: "Risk Mitigation", 
      description: "Planned diversified revenue streams and government partnerships",
      icon: <Shield className="w-6 h-6 text-teal-600" />
    },
    { 
      id: 6, 
      title: "Strategic Partnerships", 
      description: "Access to exclusive network of rural stakeholders and market leaders",
      icon: <Users className="w-6 h-6 text-indigo-600" />
    }
  ]

  const handleInvestorCTA = () => {
    window.location.href = '/investors'
  }

  return (
    <section id="investors" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Investor Opportunities
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Join us in building sustainable rural supply chains with strong financial and social returns.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {InvestorBenefits.map((benefit, index) => (
            <motion.div
              key={`benefit-${benefit.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-gradient-to-br from-green-100 to-blue-100 text-green-600 mr-3 shadow-inner">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-0.5 rounded-lg inline-block">
            <button
              onClick={handleInvestorCTA}
              className="px-8 py-3 bg-white text-green-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center text-sm font-medium mx-auto"
            >
              Explore Investment Opportunities
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Download our investor deck and financial projections
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const PartnersSection = () => {
  const partners = [
    { 
      id: 1, 
      name: "Ministry of Rural Development", 
      logo: "govt-logo.png",
      description: "Potential government partnership for rural initiatives",
      category: "Government"
    },
    { 
      id: 2, 
      name: "UN Development Programme", 
      logo: "undp-logo.png",
      description: "Potential global development collaboration",
      category: "International"
    },
    { 
      id: 3, 
      name: "Rural Innovation Foundation", 
      logo: "rif-logo.png",
      description: "Potential technology innovation partner",
      category: "NGO"
    },
    { 
      id: 4, 
      name: "AgriTech Alliance", 
      logo: "ata-logo.png",
      description: "Potential agricultural technology network",
      category: "Industry"
    },
    { 
      id: 5, 
      name: "Clean Energy Initiative", 
      logo: "cei-logo.png",
      description: "Potential renewable energy solutions",
      category: "Sustainability"
    },
    { 
      id: 6, 
      name: "Women's Empowerment Network", 
      logo: "wen-logo.png",
      description: "Potential gender equality programs",
      category: "Community"
    }
  ]

  const partnerStats = [
    {
      icon: <Hand className="w-6 h-6 text-green-600" />,
      title: "Strategic",
      count: "12+",
      description: "Potential long-term strategic partners"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Global",
      count: "8",
      description: "Potential international organizations"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Awarded",
      count: "5",
      description: "Potential recognized partners"
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: "Sustainable",
      count: "9",
      description: "Potential eco-focused initiatives"
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="partners" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-600/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <Hand className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Our Potential Partners
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Seeking collaborations with leading organizations to maximize our rural impact through innovation and shared vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {partners.map((partner) => (
            <motion.div
              key={`partner-${partner.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: partner.id * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center text-gray-500 font-bold">
                    {partner.name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{partner.name}</h3>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full mb-2">
                    {partner.category}
                  </span>
                  <p className="text-gray-600 text-sm">{partner.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-md"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Partnership Goals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerStats.map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-5 rounded-lg shadow-sm text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-blue-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">{stat.count}</h4>
                <p className="text-md font-medium text-gray-800 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-0.5 rounded-lg inline-block">
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-white text-green-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center text-sm font-medium mx-auto"
            >
              Become a Partner
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Let's discuss how we can collaborate to transform rural supply chains
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">GrameenLink</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Empowering rural communities through decentralized supply chain technology.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z`} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {FOOTER_LINKS.map((column, i) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mt-2"
            >
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors flex items-start group"
                    >
                      <svg 
                        className="flex-shrink-0 h-4 w-4 mt-0.5 mr-1 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2"
          >
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on our progress and impact.
            </p>
            <form className="mt-1">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full text-sm text-gray-900 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-r-md hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} GrameenLink Technologies. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

const PageTransition = ({ children }) => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />
}

const SolutionsSection = () => {
  const { isAuthenticated, user } = useAuth()

  const allDashboardModules = [
    { 
      title: "Blockchain Transparency",
      description: "Future-proof supply chain verification ensuring fair compensation for producers and authentic products for consumers.",
      icon: <Database className="w-5 h-5" />,
      path: "/blockchain",
      component: <BlockchainTransparency />,
      plan: 'enterprise'
    },
    { 
      title: "Drone Logistics",
      description: "Cutting-edge aerial delivery network planned to bring essential supplies to remote rural communities with unprecedented speed.",
      icon: <Zap className="w-5 h-5" />,
      path: "/drone",
      component: <DroneDashboard />,
      plan: 'enterprise'
    },
    { 
      title: "Smart Inventory",
      description: "AI-powered stock tracking and predictive analytics designed to minimize waste and maximize availability of essential goods.",
      icon: <BookOpen className="w-5 w-5" />,
      path: "/inventory",
      component: <InventoryOptimization />,
      plan: 'both'
    },
    { 
      title: "Mobile Retail",
      description: "Technology-enabled retail vans planned to bring commerce directly to rural doorsteps, creating jobs and economic opportunity.",
      icon: <Globe className="w-5 w-5" />,
      path: "/mobile-retail",
      component: <MobileRetailVan />,
      plan: 'enterprise'
    },
    { 
      title: "Solar Kiosks",
      description: "Future offline-enabled digital hubs planned to provide internet access, education resources, and essential services to rural communities.",
      icon: <Sparkles className="w-5 h-5" />,
      path: "/kiosks",
      component: <VillageKiosk />,
      plan: 'enterprise'
    },
    { 
      title: "Sustainability",
      description: "Real-time monitoring and optimization tools planned to reduce carbon footprint while improving operational efficiency.",
      icon: <Award className="w-5 h-5" />,
      path: "/sustainability",
      component: <SustainabilityTracker />,
      plan: 'enterprise'
    }
  ]

  const dashboardModules = isAuthenticated 
    ? (user?.plan === 'enterprise' || user?.accountType === 'enterprise'
      ? allDashboardModules 
      : allDashboardModules.filter(module => module.plan === 'both'))
    : allDashboardModules

  return (
    <section id="solutions" className="py-16 bg-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50 opacity-90"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          title={isAuthenticated ? "Your Solutions" : "Our Technology Solutions"}
          subtitle={isAuthenticated ? 
            "Access your subscribed solutions below" : 
            "Integrated platform combining six core components to revolutionize rural supply chains"
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardModules.map((module, index) => (
            <motion.div 
              key={module.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-gradient-to-br from-green-50 to-green-100 text-green-600 mr-3 shadow-inner">
                    {module.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">{module.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{module.description}</p>
                <Link
                  to={module.path}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors text-xs"
                >
                  {isAuthenticated ? "Open Dashboard" : "Learn more"}
                  <svg 
                    className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const HomePage = ({ heroRef, heroVideo, handleInvestorCTA, handleDemoCTA }) => {
  const { isAuthenticated } = useAuth()
  
  return (
    <>
      <section ref={heroRef} className="pt-24 pb-16 md:pt-28 md:pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-green-700">50% Cheaper, 3x Faster</span>
              <br />
              Rural Supply Chains
            </h1>
            <p className="text-lg text-gray-700 mt-4 max-w-lg">
              GrameenLink integrates blockchain, drones & AI to empower 250K+ villagers. Join the movement.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              {!isAuthenticated && (
                <>
                  <button
                    onClick={handleInvestorCTA}
                    className="px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                  >
                    Investor Deck
                  </button>
                  <button
                    onClick={handleDemoCTA}
                    className="px-6 py-3 bg-white text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition"
                  >
                    Live Demo
                  </button>
                </>
              )}
            </div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="mt-6 grid grid-cols-2 gap-4"
            >
              {STATS.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} />
              ))}
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-lg">
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <SolutionsSection />
    </>
  )
}

const PricingSection = () => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) return null
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Choose Your Plan"
          subtitle="Flexible solutions for businesses of all sizes"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCT_TIERS.map((tier, index) => (
            <ProductTierCard key={index} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  const heroRef = useRef(null)

  const handleInvestorCTA = () => {
    window.location.href = '/investors'
  }

  const handleDemoCTA = () => {
    window.location.href = '/demo'
  }

  useEffect(() => {
    ScrollTrigger.batch(".animate-on-scroll", {
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        overwrite: true
      }),
      start: "top 85%"
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <AnimatedBackground />
          
          <Navbar />

          <Suspense fallback={<LoadingSpinner />}>
            <PageTransition>
              <Routes>
                <Route path="/inventory" element={
                  <PrivateRoute>
                    <InventoryOptimization />
                  </PrivateRoute>
                } />
                <Route path="/blockchain" element={
                  <PrivateRoute>
                    <BlockchainTransparency />
                  </PrivateRoute>
                } />
                <Route path="/drone" element={
                  <PrivateRoute>
                    <DroneDashboard />
                  </PrivateRoute>
                } />
                <Route path="/mobile-retail" element={
                  <PrivateRoute>
                    <MobileRetailVan />
                  </PrivateRoute>
                } />
                <Route path="/kiosks" element={
                  <PrivateRoute>
                    <VillageKiosk />
                  </PrivateRoute>
                } />
                <Route path="/sustainability" element={
                  <PrivateRoute>
                    <SustainabilityTracker />
                  </PrivateRoute>
                } />
                <Route path="/investors" element={<InvestorDashboard />} />
                <Route path="/demo" element={<LiveDemo />} />
                <Route path="/enterprise" element={<EnterpriseFeatures />} />
                <Route path="/basic" element={<BasicFeatures />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                
                <Route path="/" element={
                  <>
                    <HomePage 
                      heroRef={heroRef} 
                      heroVideo={heroVideo} 
                      handleInvestorCTA={handleInvestorCTA} 
                      handleDemoCTA={handleDemoCTA} 
                    />
                    <ImpactSection />
                    <PricingSection />
                    <AuthCTASection />
                    <PartnersSection />
                    <InvestorsSection />
                    <ContactSection />
                    <Footer />
                  </>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App