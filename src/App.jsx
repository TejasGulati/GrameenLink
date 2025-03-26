import React, { useState, lazy, Suspense } from 'react'
import { 
  Truck, 
  Package, 
  Leaf, 
  Store, 
  Home, 
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Loader2,
  Send,
  Globe,
  Star,
  MapPin,
  Users,
  Target,
  BookOpen,
  Award,
  Database
} from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Components
import Navbar from './components/Navbar';

// Import assets
import logo from './assets/logo.png';
import heroImage from './assets/image.png';
import impactImage from './assets/impact.png';

// Lazy load components for better performance
const DroneDashboard = lazy(() => import('./components/DroneDashboard'));
const InventoryOptimization = lazy(() => import('./components/InventoryOptimization'));
const MobileRetailVan = lazy(() => import('./components/MobileRetailVan'));
const SustainabilityTracker = lazy(() => import('./components/SustainabilityTracker'));
const VillageKiosk = lazy(() => import('./components/VillageKiosk'));
const BlockchainTransparency = lazy(() => import('./components/BlockchainTransparency'));

// Enhanced Loading Component with Animation
function LoadingSpinner() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-full"
    >
      <Loader2 className="animate-spin text-green-600" size={64} />
    </motion.div>
  );
}

function App() {
  const dashboardModules = [
    { 
      component: <DroneDashboard />, 
      route: '/drone',
      detailPage: <DroneDashboard />,
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: "Drone Logistics",
      description: "Advanced aerial delivery network for rural communities",
      gradient: "from-blue-100 to-indigo-200"
    },
    { 
      component: <InventoryOptimization />, 
      route: '/inventory',
      detailPage: <InventoryOptimization />,
      icon: <Package className="w-12 h-12 text-green-600" />,
      title: "Inventory Management",
      description: "Smart, real-time stock tracking and predictive analytics",
      gradient: "from-green-100 to-emerald-200"
    },
    { 
      component: <MobileRetailVan />, 
      route: '/mobile-retail',
      detailPage: <MobileRetailVan />,
      icon: <Store className="w-12 h-12 text-purple-600" />,
      title: "Mobile Retail",
      description: "Bringing commerce directly to rural communities",
      gradient: "from-purple-100 to-violet-200"
    },
    { 
      component: <SustainabilityTracker />, 
      route: '/sustainability',
      detailPage: <SustainabilityTracker />,
      icon: <Leaf className="w-12 h-12 text-emerald-600" />,
      title: "Sustainability Tracker",
      description: "Monitoring and improving environmental impact",
      gradient: "from-emerald-100 to-teal-200"
    },
    { 
      component: <VillageKiosk />, 
      route: '/village-kiosk',
      detailPage: <VillageKiosk />,
      icon: <Home className="w-12 h-12 text-orange-600" />,
      title: "Village Kiosk",
      description: "Digital hub for community services and information",
      gradient: "from-orange-100 to-amber-200"
    },
    { 
      component: <BlockchainTransparency />, 
      route: '/blockchain',
      detailPage: <BlockchainTransparency />,
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600" />,
      title: "Blockchain Transparency",
      description: "Secure, traceable supply chain management",
      gradient: "from-indigo-100 to-blue-200"
    }
  ];

  const impactMetrics = [
    { 
      icon: <MapPin className="w-12 h-12 text-green-600" />, 
      number: "50+", 
      label: "Rural Communities Served" 
    },
    { 
      icon: <Users className="w-12 h-12 text-blue-600" />, 
      number: "250K+", 
      label: "Lives Impacted" 
    },
    { 
      icon: <Target className="w-12 h-12 text-purple-600" />, 
      number: "95%", 
      label: "Supply Chain Efficiency" 
    }
  ];

  const testimonials = [
    {
      quote: "GrameenLink has revolutionized how we manage our local supply chain. Their innovative solutions have made a real difference.",
      name: "Priya Sharma",
      role: "Village Entrepreneur"
    },
    {
      quote: "The mobile retail van has transformed access to essential goods in our remote community. We're truly grateful.",
      name: "Rajesh Kumar",
      role: "Community Leader"
    }
  ];

  const valuePropositions = [
    {
      icon: <BookOpen className="w-12 h-12 text-green-600" />,
      title: "Transparent Operations",
      description: "Complete visibility into every step of the supply chain"
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Sustainable Impact",
      description: "Environmentally conscious solutions that empower communities"
    },
    {
      icon: <Database className="w-12 h-12 text-purple-600" />,
      title: "Advanced Technology",
      description: "Cutting-edge tech tailored for rural ecosystem challenges"
    }
  ];

  return (
    <Router>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        <Navbar />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {dashboardModules.map((module) => (
              <Route 
                key={module.route} 
                path={module.route} 
                element={module.detailPage} 
              />
            ))}
            <Route path="/" element={
              <AnimatePresence>
                {/* Hero Section */}
                <motion.header 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative pt-24 pb-16 bg-gradient-to-br from-green-50 to-blue-50"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center mt-12 pt-7">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-6 leading-tight">
                        Transforming Rural Supply Chains
                      </h1>
                      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        Empowering rural communities through innovative technology, sustainable logistics, and digital transformation.
                      </p>
                      <div className="flex space-x-4">
                        {['Explore Solutions', 'Learn More'].map((buttonText, index) => (
                          <motion.button
                            key={buttonText}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              ${index === 0 
                                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white' 
                                : 'border border-green-600 text-green-600 bg-white'}
                              px-8 py-3 rounded-full hover:shadow-xl transition flex items-center
                            `}
                          >
                            {buttonText} 
                            {index === 0 && <ArrowRight className="ml-2 h-5 w-5" />}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="hidden md:block"
                    >
                      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img 
                          src={heroImage} 
                          alt="GrameenLink Solutions" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute bottom-0 left-0 right-0 text-center"
                  >
                    <ChevronDown className="mx-auto h-10 w-10 text-gray-400" />
                  </motion.div>
                </motion.header>

                {/* Solutions Section */}
                <section id="solutions" className="py-20 bg-transparent">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-4">
                        Our Innovative Solutions
                      </h2>
                      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Cutting-edge technologies designed to address the unique challenges of rural supply chains.
                      </p>
                    </div>

                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                          opacity: 1,
                          transition: { 
                            delayChildren: 0.3,
                            staggerChildren: 0.2 
                          }
                        }
                      }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {dashboardModules.map((module, index) => (
                        <motion.div 
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                          }}
                          key={index}
                          className={`
                            bg-gradient-to-br ${module.gradient} 
                            rounded-3xl shadow-2xl overflow-hidden 
                            transform transition-all duration-300 
                            hover:scale-105 hover:shadow-3xl
                          `}
                        >
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="p-3 rounded-full mr-4 bg-white/30">
                                {module.icon}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                {module.title}
                              </h3>
                            </div>
                            <p className="text-gray-800 mb-4">
                              {module.description}
                            </p>
                            <div className="mt-4 text-center">
                              <Link 
                                to={module.route} 
                                className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                              >
                                Explore More <Star className="ml-2 h-5 w-5 text-yellow-500" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                {/* Impact Metrics Section */}
                <section className="py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                      {impactMetrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl shadow-xl"
                        >
                          <div className="mb-4">{metric.icon}</div>
                          <h3 className="text-5xl font-bold text-gray-800 mb-2">{metric.number}</h3>
                          <p className="text-gray-600">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Impact Story Section */}
                <section className="py-20 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                        Our Social Impact
                      </h2>
                      <p className="text-xl text-gray-700 mb-6">
                        We're not just a technology company. We're a movement dedicated to transforming rural economies through innovative solutions.
                      </p>
                      <div className="space-y-4">
                        {valuePropositions.map((prop, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            {prop.icon}
                            <div>
                              <h4 className="font-bold text-lg">{prop.title}</h4>
                              <p className="text-gray-600">{prop.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img 
                        src={impactImage} 
                        alt="Social Impact" 
                        className="rounded-3xl shadow-2xl "
                      />
                    </motion.div>
                  </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-gradient-to-br from-green-100 to-blue-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                      What Our Community Says
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white p-8 rounded-3xl shadow-xl"
                        >
                          <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <img 
                          src={logo} 
                          alt="GrameenLink Logo" 
                          className="h-12 w-12 mr-3 rounded-full"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                          GrameenLink
                        </span>
                      </div>
                      <p className="text-gray-400">
                        Empowering rural communities through innovative technology solutions.
                      </p>
                    </div>

                    {/* Quick Links */}
                    {[
                      {
                        title: "Solutions",
                        links: dashboardModules.map(module => ({ 
                          name: module.title, 
                          href: module.route 
                        }))
                      },
                      {
                        title: "Company",
                        links: [
                          { name: "About Us", href: "#" },
                          { name: "Careers", href: "#" },
                          { name: "Press", href: "#" }
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold mb-4 text-white">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.links.map((link) => (
                            <li key={link.name}>
                              <Link 
                                to={link.href} 
                                className="text-gray-400 hover:text-white transition"
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Contact Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-white">
                        Contact Us
                      </h4>
                      <p className="text-gray-400">
                        Email: GrameenLink@gmail.com
                        <br />
                        Phone: 9013901322
                      </p>
                      <div className="mt-4 flex space-x-4">
                        {[Globe, Send].map((IconComponent, index) => (
                          <motion.a 
                            key={index}
                            href="#"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-gray-400 hover:text-white"
                          >
                            <IconComponent />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </footer>
              </AnimatePresence>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;