import React, { useState, useEffect } from 'react'
import { 
  BarChart2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Globe, 
  Clock,
  Download,
  ArrowRight,
  Calendar,
  Shield,
  Activity,
  Layers,
  ChevronDown,
  FileText,
  Briefcase,
  Target,
  MapPin,
  BookOpen,
  Rocket,
  BarChart,
  Zap,
  Smartphone,
  Cpu,
  Wind,
  Sun
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Tech", value: 45, color: "#22c55e" },
  { name: "Ops", value: 30, color: "#3b82f6" },
  { name: "Mktg", value: 15, color: "#a855f7" },
  { name: "Team", value: 10, color: "#14b8a6" },
];

const InvestorDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [roiInput, setRoiInput] = useState(100)
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isScrolled, setIsScrolled] = useState(false)

  // Projected data - replace with real API calls when available
  const [metrics, setMetrics] = useState({
    revenue: 125000, // Projected annual revenue
    villages: 12,    // Target villages for first year
    users: 12500,    // Projected users
    growthRate: 120, // Projected growth rate percentage
    cac: 25,         // Projected customer acquisition cost
    ltv: 320,        // Projected lifetime value
    margin: 45,      // Projected margin percentage
    mrr: 25000,      // Projected monthly recurring revenue
    churn: 3.5       // Projected churn rate percentage
  })

  const financialData = [
    { month: 'Apr 2025', revenue: 0, profit: -15000 },
    { month: 'May 2025', revenue: 5000, profit: -12000 },
    { month: 'Jun 2025', revenue: 12000, profit: -8000 },
    { month: 'Jul 2025', revenue: 18000, profit: -5000 },
    { month: 'Aug 2025', revenue: 25000, profit: -2000 },
    { month: 'Sep 2025', revenue: 32000, profit: 3000 },
    { month: 'Oct 2025', revenue: 42000, profit: 8000 },
    { month: 'Nov 2025', revenue: 55000, profit: 15000 },
    { month: 'Dec 2025', revenue: 70000, profit: 22000 },
    { month: 'Jan 2026', revenue: 85000, profit: 30000 },
    { month: 'Feb 2026', revenue: 105000, profit: 40000 },
    { month: 'Mar 2026', revenue: 125000, profit: 50000 }
  ]

  const teamMembers = [
    { 
      name: 'Tejas Gulati', 
      role: 'Founder & CEO', 
      background: 'B.Tech 3rd Year, MAIT Delhi | Rural Tech Enthusiast',
      avatarInitial: 'TG'
    },
    { 
      name: 'Bhaskar Kapoor', 
      role: 'Mentor & Advisor', 
      background: 'Professor, MAIT Delhi | Tech Entrepreneurship',
      avatarInitial: 'BK'
    }
  ]

  const milestones = [
    { date: 'Q2 2025', event: 'Platform Development Completion' },
    { date: 'Q3 2025', event: 'Pilot Launch in NCR Region' },
    { date: 'Q4 2025', event: 'Seed Funding Round ($500K)' },
    { date: 'Q1 2026', event: 'Expansion to 12 Villages' },
    { date: 'Q2 2026', event: 'Partnership with Local Govt' },
    { date: 'Q4 2026', event: 'Projected Series A ($2M)' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate ROI based on input
  const calculateROI = (investment) => {
    return Math.floor((investment * 2.5) + (investment * 0.15 * (metrics.growthRate / 10)))
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(value)
  }

  // Animated bar chart component
  const AnimatedBarChart = ({ data, metric }) => {
    const maxValue = Math.max(...data.map(item => item[metric]))
    
    return (
      <div className="flex items-end h-48 space-x-2 pt-4">
        {data.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${(item[metric] / maxValue) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm relative group"
          >
            <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium">
              {item.month}
            </div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {metric === 'revenue' ? formatCurrency(item[metric]) : formatCurrency(item[metric])}
            </div>
          </motion.div>
        ))}
      </div>
    )
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Offset for fixed navbar */}
      <div className="h-16"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Investor Dashboard</h1>
              <p className="text-lg opacity-90 max-w-2xl">
                Transforming rural supply chains in NCR region - 
                delivering both financial returns and social impact
              </p>
            </div>
            <motion.button 
              onClick={() => window.open('/pitch-deck.pdf', '_blank')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 md:mt-0 flex items-center bg-white text-green-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <Download className="mr-2" />
              Download Pitch Deck
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`bg-white border-b border-gray-200 sticky top-16 z-10 transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
            {['overview', 'financials', 'team', 'roadmap'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition ${activeTab === tab ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: <DollarSign className="text-green-600" />, label: 'Projected Revenue', value: `$${(metrics.revenue / 1000).toFixed(0)}K`, change: 'First Year Target' },
                { icon: <Users className="text-blue-600" />, label: 'Target Villages', value: metrics.villages, change: 'NCR Region' },
                { icon: <Globe className="text-teal-600" />, label: 'Lives Impacted', value: metrics.users.toLocaleString(), change: 'Projected' },
                { icon: <TrendingUp className="text-purple-600" />, label: 'Growth Rate', value: `${metrics.growthRate}%`, change: 'Projected YoY' }
              ].map((metric, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-gray-50 mr-4">
                      {metric.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
                      <p className="text-sm text-gray-500">{metric.change}</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            {/* ROI Calculator */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <BarChart2 className="mr-2 text-green-600" />
                ROI Projection Calculator
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (in $000s)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="10"
                        max="500"
                        value={roiInput}
                        onChange={(e) => setRoiInput(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                      />
                      <span className="ml-4 w-20 text-right font-medium">${roiInput}k</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Projected 3-Year Return</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculateROI(roiInput * 1000))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">CAC Payback Period</span>
                      <span className="font-medium">10 months</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Customer LTV</span>
                      <span className="font-medium">{formatCurrency(metrics.ltv)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 flex flex-col justify-center border border-green-100">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Why Invest in GrameenLink?</h3>
                  <ul className="space-y-3">
                    {[
                      "Addressing $12B rural supply chain market in India",
                      "First-mover advantage in NCR region",
                      "Scalable technology platform",
                      "Strong social impact potential",
                      "Experienced technical founder with local knowledge"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-green-100 text-green-800 rounded-full p-1 mr-3 mt-0.5">
                          <ChevronDown className="h-4 w-4 rotate-270" />
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Market Opportunity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Globe className="mr-2 text-blue-600" />
                Market Opportunity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">$12B Addressable Market</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="relative w-full h-full p-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-green-100/50 border-2 border-green-200 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-green-200/50 border-2 border-green-300 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-green-300/50 border-2 border-green-400 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-green-400/70 border-2 border-green-500 flex items-center justify-center text-green-800 font-bold">
                                $12B
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-xs">Rural e-commerce</span>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-xs">Supply chain tech</span>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                        <span className="text-xs">Logistics</span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                        <span className="text-xs">Fintech services</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Competitive Advantage</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Cpu className="text-green-600" />,
                        title: "Full-stack solution",
                        description: "Only platform combining all components (drones, blockchain, etc.)"
                      },
                      {
                        icon: <FileText className="text-blue-600" />,
                        title: "Local expertise",
                        description: "Deep understanding of NCR rural markets"
                      },
                      {
                        icon: <BarChart className="text-purple-600" />,
                        title: "Proven unit economics",
                        description: "50% lower costs than traditional distribution models"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition"
                      >
                        <div className="p-2 rounded-lg bg-gray-50 mr-4 text-gray-700">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exit Strategy */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <TrendingUp className="mr-2 text-purple-600" />
                Exit Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Briefcase className="text-green-600" />,
                    title: "Strategic Acquisition",
                    description: "Interest from major e-commerce and retail players looking to expand rural reach",
                    examples: "Reliance Retail, DeHaat, JioMart"
                  },
                  {
                    icon: <Target className="text-blue-600" />,
                    title: "IPO Potential",
                    description: "Clear path to $50M revenue in 5 years makes strong IPO candidate",
                    examples: "Projected 2029"
                  },
                  {
                    icon: <DollarSign className="text-teal-600" />,
                    title: "Secondary Sale",
                    description: "Strong interest from impact investment funds and PE firms",
                    examples: "Aavishkaar, Omidyar, Omnivore"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-2 rounded-lg bg-gray-50 w-10 h-10 flex items-center justify-center mb-4 text-gray-700">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                    <p className="text-sm text-gray-500 mt-auto">
                      <span className="font-medium">Examples:</span> {item.examples}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Financials Tab */}
        {activeTab === 'financials' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center">
                    <Activity className="mr-2 text-green-600" />
                    Projected Financial Performance
                  </h2>
                  <div className="flex space-x-2">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMetric('revenue')}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${selectedMetric === 'revenue' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Revenue
                    </motion.button>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMetric('profit')}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${selectedMetric === 'profit' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Profit
                    </motion.button>
                  </div>
                </div>
                <div className="h-80 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <AnimatedBarChart data={financialData} metric={selectedMetric} />
                  <div className="mt-4 text-center text-sm text-gray-500">
                    {selectedMetric === 'revenue' ? 'Projected Monthly Revenue' : 'Projected Monthly Profit'}
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Shield className="mr-2 text-blue-600" />
                  Key Metrics
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: <BarChart2 className="text-green-600" />, label: 'Gross Margin', value: `${metrics.margin}%`, trend: 'up', change: 'Projected' },
                    { icon: <Users className="text-blue-600" />, label: 'Customer Acquisition Cost', value: formatCurrency(metrics.cac), trend: 'down', change: 'Projected' },
                    { icon: <DollarSign className="text-purple-600" />, label: 'Lifetime Value', value: formatCurrency(metrics.ltv), trend: 'up', change: 'Projected' },
                    { icon: <Activity className="text-teal-600" />, label: 'Monthly Recurring Revenue', value: formatCurrency(metrics.mrr), trend: 'up', change: 'Projected' },
                    { icon: <TrendingUp className="text-red-600" />, label: 'Churn Rate', value: `${metrics.churn}%`, trend: 'down', change: 'Projected' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 group">
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-md bg-gray-50 mr-3 group-hover:bg-green-50 transition">
                          {item.icon}
                        </div>
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{item.value}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.trend === 'up' ? `↑ ${item.change}` : `↓ ${item.change}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Layers className="mr-2 text-purple-600" />
                  Funding Requirements
                </h2>
                <div className="space-y-4">
                  {[
                    { 
                      round: 'Pre-Seed', 
                      amount: '$250K', 
                      date: 'Q3 2025', 
                      purpose: 'Platform development and pilot launch',
                      icon: <Rocket className="text-green-600" />
                    },
                    { 
                      round: 'Seed', 
                      amount: '$500K', 
                      date: 'Q4 2025', 
                      purpose: 'Team expansion and initial scaling',
                      icon: <TrendingUp className="text-blue-600" />
                    },
                    { 
                      round: 'Series A', 
                      amount: '$2M', 
                      date: 'Q4 2026', 
                      purpose: 'Regional expansion and product development',
                      icon: <Target className="text-purple-600" />
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50 rounded-r transition"
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-1.5 rounded-md bg-gray-50 mr-3">
                            {item.icon}
                          </div>
                          <h3 className="font-medium">{item.round} Round</h3>
                        </div>
                        <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          {item.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-8">{item.date} • {item.purpose}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <DollarSign className="mr-2 text-teal-600" size={20} /> Projected Use of Funds
      </h2>
      <div className="flex justify-center">
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </div>
      <div className="text-center mt-4">
        <div className="text-sm text-gray-500">Seed Round</div>
        <div className="font-bold text-lg text-gray-700">$500K</div>
      </div>
    </div>
            </div>
          </motion.div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Users className="mr-2 text-blue-600" />
                Founding Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-40 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center relative">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://patternico.com/img/5.svg')]"></div>
                      <div className="relative z-10 text-center">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2 shadow-md">
                          {member.avatarInitial}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Founding Team</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-green-600 font-medium">{member.role}</p>
                      <p className="text-sm text-gray-500 mt-2">{member.background}</p>
                      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        View Profile <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Calendar className="mr-2 text-purple-600" />
                  Advisors
                </h2>
                <div className="space-y-4">
                  {[
                    { 
                      name: 'MAIT Faculty', 
                      role: 'Technical Advisors',
                      expertise: 'Technology development and implementation',
                      icon: <Users className="text-purple-600" />
                    },
                    { 
                      name: 'Local Entrepreneurs', 
                      role: 'Business Advisors',
                      expertise: 'Market strategy and operations',
                      icon: <Briefcase className="text-blue-600" />
                    }
                  ].map((person, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition"
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center text-purple-800 mr-4">
                        {person.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{person.name}</h4>
                        <p className="text-sm text-gray-500">{person.role}</p>
                        <p className="text-xs text-gray-400 mt-1">{person.expertise}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Users className="mr-2 text-teal-600" />
                  Hiring Plan
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Users className="text-blue-600" />, label: 'Core Team', value: '5', change: 'Initial hires' },
                    { icon: <Cpu className="text-purple-600" />, label: 'Tech Team', value: '3', change: 'First hires' },
                    { icon: <MapPin className="text-green-600" />, label: 'Field Staff', value: '2', change: 'Pilot phase' },
                    { icon: <Users className="text-pink-600" />, label: 'Future Team', value: '10+', change: 'After funding' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gradient-to-br from-green-50 to-blue-50 transition flex flex-col items-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="p-2 rounded-lg bg-white mb-2 shadow-xs">
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-500 text-center">{stat.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Clock className="mr-2 text-green-600" />
                Growth Roadmap
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div 
                      key={index} 
                      className="relative pl-12"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-4 border-white shadow-md"></div>
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-green-300 transition group">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg group-hover:text-green-700 transition">
                            {milestone.event}
                          </h3>
                          <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-xs">
                            {milestone.date}
                          </span>
                        </div>
                        {index === 5 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100 text-sm flex items-start">
                            <Target className="flex-shrink-0 h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                            <p className="font-medium text-blue-800">Projected based on current growth trajectory</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Globe className="mr-2 text-blue-600" />
                  Expansion Plan
                </h2>
                <div className="space-y-4">
                  {[
                    { 
                      year: '2025', 
                      target: 'NCR region, 12 villages',
                      icon: <MapPin className="text-green-600" />,
                      progress: 'Pilot phase'
                    },
                    { 
                      year: '2026', 
                      target: 'Delhi NCR, 50 villages',
                      icon: <Globe className="text-blue-600" />,
                      progress: 'Planning phase'
                    },
                    { 
                      year: '2027', 
                      target: 'North India, 200 villages',
                      icon: <Target className="text-purple-600" />,
                      progress: 'Future phase'
                    }
                  ].map((plan, index) => (
                    <motion.div 
                      key={index} 
                      className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 group"
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-md bg-gray-50 mr-3 group-hover:bg-blue-50 transition">
                          {plan.icon}
                        </div>
                        <div>
                          <span className="font-medium">{plan.year}</span>
                          <p className="text-xs text-gray-500">{plan.progress}</p>
                        </div>
                      </div>
                      <span className="text-gray-700 text-right">
                        {plan.target}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-purple-600" />
                  Product Pipeline
                </h2>
                <ul className="space-y-3">
                  {[
                    {
                      icon: <Smartphone className="text-green-600" />,
                      item: "Mobile platform (Q3 2025)",
                      status: "Development"
                    },
                    {
                      icon: <Cpu className="text-blue-600" />,
                      item: "Inventory optimization (Q1 2026)",
                      status: "Research"
                    },
                    {
                      icon: <Zap className="text-purple-600" />,
                      item: "Drone logistics (Q2 2026)",
                      status: "Concept"
                    }
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start p-2 hover:bg-gray-50 rounded transition"
                      whileHover={{ x: 3 }}
                    >
                      <span className="text-green-500 mr-3 mt-0.5">{item.icon}</span>
                      <div>
                        <div>{item.item}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.status}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white hover:shadow-lg transition"
          whileHover={{ y: -3 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Invest in Rural Transformation?</h2>
            <p className="mb-6 opacity-90 text-lg">
              Join our mission to empower rural communities in NCR while achieving strong financial returns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center shadow-md"
              >
                Schedule Investor Call
                <ArrowRight className="ml-2" />
              </motion.button>
              <motion.button 
                onClick={() => window.open('/term-sheet.pdf', '_blank')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition flex items-center justify-center shadow-sm"
              >
                View Term Sheet
                <Download className="ml-2" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InvestorDashboard