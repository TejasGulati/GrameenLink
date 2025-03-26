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
  Database,
  Menu,
  X
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
      className="flex justify-center items-center h-screen"
    >
      <Loader2 className="animate-spin text-green-600" size={64} />
    </motion.div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dashboardModules = [
    { 
      component: <DroneDashboard />, 
      route: '/drone',
      detailPage: <DroneDashboard />,
      icon: <Truck className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
      title: "Drone Logistics",
      description: "Advanced aerial delivery network for rural communities",
      gradient: "from-blue-100 to-indigo-200"
    },
    { 
      component: <InventoryOptimization />, 
      route: '/inventory',
      detailPage: <InventoryOptimization />,
      icon: <Package className="w-8 h-8 md:w-12 md:h-12 text-green-600" />,
      title: "Inventory Management",
      description: "Smart, real-time stock tracking and predictive analytics",
      gradient: "from-green-100 to-emerald-200"
    },
    { 
      component: <MobileRetailVan />, 
      route: '/mobile-retail',
      detailPage: <MobileRetailVan />,
      icon: <Store className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />,
      title: "Mobile Retail",
      description: "Bringing commerce directly to rural communities",
      gradient: "from-purple-100 to-violet-200"
    },
    { 
      component: <SustainabilityTracker />, 
      route: '/sustainability',
      detailPage: <SustainabilityTracker />,
      icon: <Leaf className="w-8 h-8 md:w-12 md:h-12 text-emerald-600" />,
      title: "Sustainability Tracker",
      description: "Monitoring and improving environmental impact",
      gradient: "from-emerald-100 to-teal-200"
    },
    { 
      component: <VillageKiosk />, 
      route: '/village-kiosk',
      detailPage: <VillageKiosk />,
      icon: <Home className="w-8 h-8 md:w-12 md:h-12 text-orange-600" />,
      title: "Village Kiosk",
      description: "Digital hub for community services and information",
      gradient: "from-orange-100 to-amber-200"
    },
    { 
      component: <BlockchainTransparency />, 
      route: '/blockchain',
      detailPage: <BlockchainTransparency />,
      icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-indigo-600" />,
      title: "Blockchain Transparency",
      description: "Secure, traceable supply chain management",
      gradient: "from-indigo-100 to-blue-200"
    }
  ];

  const impactMetrics = [
    { 
      icon: <MapPin className="w-8 h-8 md:w-12 md:h-12 text-green-600" />, 
      number: "50+", 
      label: "Rural Communities Served" 
    },
    { 
      icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />, 
      number: "250K+", 
      label: "Lives Impacted" 
    },
    { 
      icon: <Target className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />, 
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
      icon: <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-green-600" />,
      title: "Transparent Operations",
      description: "Complete visibility into every step of the supply chain"
    },
    {
      icon: <Award className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
      title: "Sustainable Impact",
      description: "Environmentally conscious solutions that empower communities"
    },
    {
      icon: <Database className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />,
      title: "Advanced Technology",
      description: "Cutting-edge tech tailored for rural ecosystem challenges"
    }
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <img src={logo} alt="Logo" className="h-10" />
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="text-gray-700" />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-4">
                  <li>
                    <Link 
                      to="/" 
                      className="block py-2 text-gray-800 hover:text-green-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  {dashboardModules.map((module) => (
                    <li key={module.route}>
                      <Link 
                        to={module.route} 
                        className="block py-2 text-gray-800 hover:text-green-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {module.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

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
                  className="relative pt-16 md:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-green-50 to-blue-50"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-4 md:mb-6 leading-tight">
                        Transforming Rural Supply Chains
                      </h1>
                      <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                        Empowering rural communities through innovative technology, sustainable logistics, and digital transformation.
                      </p>
                      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToSection('solutions')}
                          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-full hover:shadow-xl transition flex items-center justify-center"
                        >
                          Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToSection('impact')}
                          className="border border-green-600 text-green-600 bg-white px-6 py-3 md:px-8 md:py-3 rounded-full hover:shadow-xl transition flex items-center justify-center"
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="mt-8 md:mt-0"
                    >
                      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        <img 
                          src={heroImage} 
                          alt="GrameenLink Solutions" 
                          className="w-full h-auto object-cover"
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
                    className="absolute bottom-4 left-0 right-0 text-center"
                  >
                    <ChevronDown className="mx-auto h-8 w-8 text-gray-400" />
                  </motion.div>
                </motion.header>

                {/* Solutions Section */}
                <section id="solutions" className="py-12 md:py-20 bg-transparent">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-16">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-4">
                        Our Innovative Solutions
                      </h2>
                      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
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
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                            rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden 
                            transform transition-all duration-300 
                            hover:scale-[1.02] hover:shadow-xl
                          `}
                        >
                          <div className="p-4 md:p-6">
                            <div className="flex items-center mb-3 md:mb-4">
                              <div className="p-2 md:p-3 rounded-full mr-3 md:mr-4 bg-white/30">
                                {module.icon}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                {module.title}
                              </h3>
                            </div>
                            <p className="text-gray-800 mb-4 text-sm md:text-base">
                              {module.description}
                            </p>
                            <div className="mt-3 md:mt-4 text-center">
                              <Link 
                                to={module.route} 
                                className="inline-block bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-gray-100 transition flex items-center justify-center text-sm md:text-base"
                              >
                                Explore More <Star className="ml-2 h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                {/* Impact Metrics Section */}
                <section id="impact" className="py-12 md:py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
                      {impactMetrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          className="bg-gradient-to-br from-white to-gray-100 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg"
                        >
                          <div className="mb-3 md:mb-4">{metric.icon}</div>
                          <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-1 md:mb-2">{metric.number}</h3>
                          <p className="text-sm md:text-base text-gray-600">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Impact Story Section */}
                <section className="py-12 md:py-20 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                        Our Social Impact
                      </h2>
                      <p className="text-lg md:text-xl text-gray-700 mb-6">
                        We're not just a technology company. We're a movement dedicated to transforming rural economies through innovative solutions.
                      </p>
                      <div className="space-y-4">
                        {valuePropositions.map((prop, index) => (
                          <div key={index} className="flex items-start space-x-3 md:space-x-4">
                            <div className="flex-shrink-0">
                              {prop.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg">{prop.title}</h4>
                              <p className="text-sm md:text-base text-gray-600">{prop.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="order-first md:order-last"
                    >
                      <img 
                        src={impactImage} 
                        alt="Social Impact" 
                        className="rounded-xl md:rounded-2xl shadow-lg md:shadow-xl w-full"
                      />
                    </motion.div>
                  </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-12 md:py-20 bg-gradient-to-br from-green-100 to-blue-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                      What Our Community Says
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg"
                        >
                          <p className="text-base md:text-xl italic mb-4 md:mb-6">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-bold text-base md:text-lg">{testimonial.name}</h4>
                            <p className="text-sm md:text-base text-gray-600">{testimonial.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center mb-3 md:mb-4">
                        <img 
                          src={logo} 
                          alt="GrameenLink Logo" 
                          className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-full"
                        />
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                          GrameenLink
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-gray-400">
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
                        <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.links.map((link) => (
                            <li key={link.name}>
                              <Link 
                                to={link.href} 
                                className="text-sm md:text-base text-gray-400 hover:text-white transition"
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
                      <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">
                        Contact Us
                      </h4>
                      <p className="text-sm md:text-base text-gray-400 mb-2">
                        Email: GrameenLink@gmail.com
                      </p>
                      <p className="text-sm md:text-base text-gray-400 mb-4">
                        Phone: 9013901322
                      </p>
                      <div className="mt-2 md:mt-4 flex space-x-4">
                        {[Globe, Send].map((IconComponent, index) => (
                          <motion.a 
                            key={index}
                            href="#"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-gray-400 hover:text-white"
                          >
                            <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
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