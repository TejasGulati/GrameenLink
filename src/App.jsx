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
  LogOut,
  Twitter,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react'

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
const SecuritySettings = lazy(() => import('./components/SecuritySettings'))
const AccountSettings = lazy(() => import('./components/AccountSettings'))

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

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-medium text-gray-700">
        Loading GrameenLink...
      </p>
    </div>
  )
}

const StatCard = ({ value, label }) => {
  return (
    <div className="bg-transparent p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <h3 className="text-3xl font-bold text-green-600 mb-1 group-hover:text-green-700 transition-colors">
        {value}
      </h3>
      <p className="text-gray-600 text-xs font-medium">{label}</p>
      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, center = true }) => (
  <div className={`${center ? 'text-center' : 'text-left'} mb-8`}>
    <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-800">
      {title}
    </h2>
    <p className="text-base text-gray-600 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
)

const ProductTierCard = ({ tier }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden border ${
    tier.name === 'Enterprise' 
      ? 'border-blue-200 ring-2 ring-blue-100' 
      : 'border-green-200'
  }`}>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7m0 0l-7 7m7-7H3"></path>
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
  </div>
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

// Replace the current implementation with this one
const CardsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Connect With Us"
          subtitle="Explore investment opportunities, partnerships, or get in touch with our team"
          center={true}
        />
        
        <div className="flex flex-col md:flex-row gap-6">
          <InvestorsCard />
          <PartnersCard />
          <ContactCard />
        </div>
      </div>
    </section>
  )
}// Modified ContactCard component with added ID
const ContactCard = () => {
  const [expanded, setExpanded] = useState(false)
  
  const contactMethods = [
    { icon: <Phone className="w-5 h-5 text-blue-600" />, title: "Call Us", content: "+91 98686 29191" },
    { icon: <MapPin className="w-5 h-5 text-purple-600" />, title: "Visit Us", content: "Moti Nagar, Delhi, India" }
  ]

  return (
    <CardBase
      id="contact" // Added this ID
      title="Contact Us"
      description="Have questions? Get in touch with our team"
      icon={<Mail />}
      iconBgColor="bg-gradient-to-br from-green-50 to-green-100"
      iconColor="text-green-600"
      isOpen={expanded}
      toggleOpen={() => setExpanded(!expanded)}
    >
      <div className="mb-6">
        <ContactForm />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              {method.icon}
              <span className="font-medium ml-2 text-sm">{method.title}</span>
            </div>
            <p className="text-gray-700 text-sm">{method.content}</p>
          </div>
        ))}
      </div>
    </CardBase>
  )
}

// Modified CardBase component to accept and apply the id prop
const CardBase = ({ title, description, icon, iconBgColor, iconColor, children, isOpen, toggleOpen, id }) => {
  return (
    <div 
      id={id} // Added this to pass the ID to the rendered div
      className="bg-white rounded-xl shadow-md overflow-hidden flex-1 transform transition-all duration-300 hover:shadow-lg border border-gray-100"
    >
      <div 
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <div className={`p-3 ${iconBgColor} rounded-full mr-4`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}` })}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Updated PartnersCard component with improved scroll functionality
const PartnersCard = () => {
  const [expanded, setExpanded] = useState(false)
  
  const partners = [
    { name: "Ministry of Rural Development", type: "Government", description: "Policy support and infrastructure" },
    { name: "UN Development Programme", type: "International", description: "Funding and global best practices" },
    { name: "Rural Innovation Foundation", type: "NGO", description: "Local community engagement" },
    { name: "AgriTech Alliance", type: "Industry", description: "Technology and supply chain expertise" }
  ]

  const handleBecomePartner = () => {
    const contactElement = document.getElementById('contact')
    
    if (contactElement) {
      const contactCardToggle = contactElement.querySelector('[class*="cursor-pointer"]')
      if (contactCardToggle) {
        const isCollapsed = contactElement.querySelector('[class*="max-h-0"]')
        if (isCollapsed) {
          contactCardToggle.click()
        }
      }
      
      setTimeout(() => {
        window.scrollTo({
          top: contactElement.offsetTop - 60, // Increased offset to ensure full visibility
          behavior: 'smooth'
        });
      }, 150); // Slightly increased timeout for better animation sync
    }
  }

  return (
    <CardBase
      title="Our Potential Partners"
      description="Collaborations that drive rural transformation"
      icon={<Hand />}
      iconBgColor="bg-gradient-to-br from-purple-50 to-purple-100"
      iconColor="text-purple-600"
      isOpen={expanded}
      toggleOpen={() => setExpanded(!expanded)}
    >
      <div className="space-y-4 mb-6">
        {partners.map((partner, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-800">{partner.name}</h4>
              <span className="inline-block px-2 py-0.5 text-xs bg-white text-purple-800 rounded-full">
                {partner.type}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleBecomePartner}
        className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition flex items-center justify-center"
      >
        Become a Partner
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </CardBase>
  )
}

const InvestorsCard = () => {
  const [expanded, setExpanded] = useState(false)
  const { isAuthenticated } = useAuth()

  const benefits = [
    { title: "Scalable Model", description: "Technology built to expand across 5,000+ villages", icon: <BarChart2 className="w-5 h-5 text-green-600" /> },
    { title: "Strong ROI", description: "3.2x projected return on investment", icon: <DollarSign className="w-5 h-5 text-blue-600" /> },
    { title: "Social Impact", description: "Improve lives while generating returns", icon: <Heart className="w-5 h-5 text-purple-600" /> }
  ]

  return (
    <CardBase
      title="Investor Opportunities"
      description="Join us in building sustainable rural supply chains"
      icon={<DollarSign />}
      iconBgColor="bg-gradient-to-br from-blue-50 to-blue-100"
      iconColor="text-blue-600"
      isOpen={expanded}
      toggleOpen={() => setExpanded(!expanded)}
    >
      <div className="space-y-4 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg flex items-center">
            <div className="bg-white p-2 rounded-full mr-3">
              {benefit.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{benefit.title}</h4>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link
        to={isAuthenticated ? "/investors" : "/login"}
        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition flex items-center justify-center"
      >
        {isAuthenticated ? "View Investor Dashboard" : "Login to View Opportunities"}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </CardBase>
  )
}


// Update the ContactForm component with a more appealing design
const ContactForm = () => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSubmitted && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 text-sm">Message sent successfully!</span>
          </div>
          <button onClick={() => setIsSubmitted(false)} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            required
          />
        </div>
      </div>
      
      <div>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
        >
          <option value="general">General Inquiry</option>
          <option value="basic">Basic Plan</option>
          <option value="enterprise">Enterprise Solution</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>
      
      <div>
        <textarea
          id="message"
          name="message"
          rows="2"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition flex items-center justify-center text-sm ${isSubmitting ? 'opacity-75' : ''}`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}

const ImpactSection = () => {
  return (
    <section id="impact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-md w-full h-[400px] md:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-20 rounded-xl"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover" 
            >
              <source src={impactVideo} type="video/mp4" />
            </video>
          </div>
          
          <div className="space-y-6">
            <div className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-3">
              Future Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Transforming <span className="text-green-600">Rural Lives</span> Through Technology
            </h2>
            <p className="text-gray-600">
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
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Subscribed email:', email)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
    { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com" },
    { icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com" },
    { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" }
  ]

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Enterprise", href: "/enterprise" },
        { name: "Basic Plan", href: "/basic" },
        { name: "Live Demo", href: "/demo" }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">GrameenLink</h3>
            <p className="text-gray-400 text-sm mb-4">
              Empowering rural communities through decentralized supply chain technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="mt-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            {subscribed ? (
              <div className="bg-green-100 text-green-800 text-sm p-3 rounded-lg flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} GrameenLink Technologies. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0">
            {/* Removed all links from here */}
          </div>
        </div>
      </div>
    </footer>
  )
}

const PageTransition = ({ children }) => {
  return <div>{children}</div>
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
      icon: <BookOpen className="w-5 h-5" />,
      path: "/inventory",
      component: <InventoryOptimization />,
      plan: 'both'
    },
    { 
      title: "Mobile Retail",
      description: "Technology-enabled retail vans planned to bring commerce directly to rural doorsteps, creating jobs and economic opportunity.",
      icon: <Globe className="w-5 h-5" />,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={isAuthenticated ? "Your Solutions" : "Our Technology Solutions"}
          subtitle={isAuthenticated ? 
            "Access your subscribed solutions below" : 
            "Integrated platform combining six core components to revolutionize rural supply chains"
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardModules.map((module) => (
            <div 
              key={module.path}
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
            </div>
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
            <div className="mt-6 grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <video autoPlay loop muted playsInline className="w-full rounded-lg shadow-lg">
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <SolutionsSection />
      <ImpactSection />
      <PricingSection />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <InvestorsCard />
          <PartnersCard />
          <ContactCard />
        </div>
      </section>
      
      <AuthCTASection />
      <Footer />
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
                <Route path="/profile/security" element={
                  <PrivateRoute>
                    <SecuritySettings />
                  </PrivateRoute>
                } />
                <Route path="/profile/settings" element={
                  <PrivateRoute>
                    <AccountSettings />
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