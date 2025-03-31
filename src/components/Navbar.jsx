import React, { useState, useEffect, useRef } from 'react'
import { 
  Link, 
  useLocation,
  useNavigate 
} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Home,
  Layers,
  BarChart2,
  DollarSign,
  ShoppingCart,
  PieChart,
  BookOpen,
  Database,
  Zap,
  Globe,
  Sparkles,
  Award,
  LogOut,
  User,
  ChevronDown,
  Settings,
  Key
} from 'lucide-react'
import logo from '../assets/logo-1.png'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  
  const location = useLocation()
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const userMenuRef = useRef(null)

  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { 
          id: 'solutions',
          name: "Solutions", 
          path: "/solutions",
          icon: <Layers size={18} />,
          subItems: [
            { 
              id: 'enterprise', 
              name: "Enterprise Platform", 
              path: "/enterprise",
              icon: <PieChart size={16} className="mr-2" />,
              description: "For funded startups and NGOs"
            },
            { 
              id: 'basic', 
              name: "Basic Inventory", 
              path: "/basic",
              icon: <ShoppingCart size={16} className="mr-2" />,
              description: "For local shops and entrepreneurs"
            }
          ]
        },
        { 
          id: 'investors', 
          name: "Investors", 
          path: "/investors", 
          icon: <DollarSign size={18} />
        },
        { 
          id: 'demo', 
          name: "Live Demo", 
          path: "/demo", 
          icon: <BarChart2 size={18} />
        }
      ]
    }

    const baseModules = [
      {
        id: 'inventory',
        name: "Inventory",
        path: "/inventory",
        icon: <BookOpen size={16} className="mr-2" />,
        description: "Smart inventory management"
      }
    ]

    const enterpriseModules = [
      {
        id: 'blockchain',
        name: "Blockchain",
        path: "/blockchain",
        icon: <Database size={16} className="mr-2" />,
        description: "Transparent supply chain"
      },
      {
        id: 'drone',
        name: "Drone Logistics",
        path: "/drone",
        icon: <Zap size={16} className="mr-2" />,
        description: "Aerial delivery network"
      },
      {
        id: 'mobile-retail',
        name: "Mobile Retail",
        path: "/mobile-retail",
        icon: <Globe size={16} className="mr-2" />,
        description: "Commerce vans management"
      },
      {
        id: 'kiosks',
        name: "Village Kiosks",
        path: "/kiosks",
        icon: <Sparkles size={16} className="mr-2" />,
        description: "Digital hubs management"
      },
      {
        id: 'sustainability',
        name: "Sustainability",
        path: "/sustainability",
        icon: <Award size={16} className="mr-2" />,
        description: "Eco-friendly operations"
      }
    ]

    const modules = user?.plan === 'enterprise' || user?.accountType === 'enterprise' 
      ? [...baseModules, ...enterpriseModules]
      : baseModules

    return [
      {
        id: 'my-solutions',
        name: "My Solutions",
        path: "/solutions",
        icon: <Layers size={18} />,
        subItems: modules
      },
      { 
        id: 'investors', 
        name: "Investors", 
        path: "/investors", 
        icon: <DollarSign size={18} />
      }
    ]
  }

  const navItems = getNavItems()

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
    setActiveDropdown(null)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const getUserInitials = () => {
    if (!user?.name) return 'U'
    const names = user.name.split(' ')
    return names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}` 
      : names[0][0]
  }

  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) ){
        if (isMenuOpen) {
          setIsMenuOpen(false)
        }
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        if (isUserMenuOpen) {
          setIsUserMenuOpen(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, isUserMenuOpen])

  const toggleDropdown = (itemId) => {
    setActiveDropdown(prev => prev === itemId ? null : itemId)
  }

  const ScrollToTopLink = ({ to, className, children }) => {
    const handleClick = () => {
      window.scrollTo(0, 0)
    }
    
    return (
      <Link to={to} className={className} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  const renderDropdownItem = (item, isMobile = false) => (
    <ScrollToTopLink 
      key={`sub-item-${item.id}`}
      to={item.path}
      className={`
        flex items-start px-4 py-3 hover:bg-gradient-to-r from-green-50 to-blue-50 transition-all
        ${isMobile ? 'text-sm rounded-md' : 'text-xs sm:text-sm rounded-md'}
        border border-transparent hover:border-green-100
      `}
    >
      <span className="text-green-600 mr-2 mt-0.5">{item.icon}</span>
      <div>
        <div className="font-medium text-gray-900">{item.name}</div>
        <div className="text-gray-500 mt-1 text-xs">{item.description}</div>
      </div>
    </ScrollToTopLink>
  )

  const renderDropdownContent = (items, isMobile = false) => (
    <div className={isMobile ? 'space-y-2 pl-2 py-2' : 'grid grid-cols-1 gap-2 p-2 w-64'}>
      {items.map((item) => renderDropdownItem(item, isMobile))}
    </div>
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        fixed top-0 left-0 right-0 z-50 
        ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xs' : 'bg-white/90 backdrop-blur-sm'}
        transition-all duration-200 ease-out
        border-b border-gray-200/50
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <ScrollToTopLink 
            to="/" 
            className="flex items-center flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center"
            >
              <img
                src={logo}
                alt="GrameenLink Logo"
                className="h-8 w-8"
              />
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                GrameenLink
              </span>
            </motion.div>
          </ScrollToTopLink>

          <div className="hidden lg:flex items-center space-x-2">
            <NavLinks />
            
            {/* Auth buttons for desktop */}
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center text-white font-medium">
                    {getUserInitials()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                  <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                      className="absolute right-0 z-50 mt-1 w-56 bg-white rounded-md shadow-md overflow-hidden border border-gray-200/80 backdrop-blur-sm"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          to="/profile/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                        <Link
                          to="/profile/security"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Security
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-green-600 rounded-md transition-colors hover:bg-gradient-to-r from-green-50/50 to-blue-50/50 border border-transparent hover:border-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-green-600 rounded-md transition-colors hover:bg-gradient-to-r from-green-50/50 to-blue-50/50 border border-transparent hover:border-gray-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            {/* Auth buttons for mobile */}
            {!isAuthenticated && (
              <div className="flex items-center mr-2">
                <Link
                  to="/login"
                  className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:text-green-600 rounded-md transition-colors hover:bg-gradient-to-r from-green-50/50 to-blue-50/50 border border-transparent hover:border-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:text-green-600 rounded-md transition-colors hover:bg-gradient-to-r from-green-50/50 to-blue-50/50 border border-transparent hover:border-gray-200"
                >
                  Register
                </Link>
              </div>
            )}
            
            {isAuthenticated && (
              <div className="mr-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium text-sm">
                  {getUserInitials()}
                </div>
              </div>
            )}
            
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-sm shadow-md rounded-b-md overflow-hidden border-t border-gray-200/50"
            >
              <NavLinks isMobile={true} />
              {isAuthenticated && (
                <div className="px-4 py-3 border-t border-gray-200/50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
              <div className="px-4 py-3 border-t border-gray-200/50 bg-gradient-to-r from-green-50/30 to-blue-50/30">
                <div className="text-xs text-gray-500 text-center">
                  {isAuthenticated ? `Logged in as ${user?.name || 'User'}` : 'Launching soon in pilot villages'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )

  function NavLinks({ isMobile = false }) {
    return (
      <div 
        ref={menuRef}
        className={`
          ${isMobile ? 'space-y-2 px-4 py-4' : 'flex items-center space-x-2'}
        `}
      >
        <ScrollToTopLink
          to="/"
          className={`
            flex items-center 
            ${isMobile ? 'text-sm py-3 px-3 font-medium rounded-md' : 'hidden md:flex text-sm py-2 px-3'}
            text-gray-700 hover:text-green-600 transition-colors
            hover:bg-gradient-to-r from-green-50/50 to-blue-50/50
          `}
        >
          <Home size={16} className={`${isMobile ? 'mr-2' : 'mr-1'}`} />
          Home
        </ScrollToTopLink>

        {navItems.map((item) => (
          <div 
            key={`nav-item-${item.id}`}
            className={`
              ${isMobile ? 'border-b border-gray-100/50 last:border-0 pb-2 mb-2' : 'relative group'}
            `}
          >
            {item.subItems ? (
              <>
                {!isMobile && (
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown(item.id)}
                      className={`
                        flex items-center px-3 py-2 rounded-md transition-all
                        ${activeDropdown === item.id ? 'bg-gradient-to-r from-green-50 to-blue-50 shadow-xs' : 'hover:bg-gray-50/50'}
                        text-gray-700 text-sm font-medium
                        border border-transparent hover:border-gray-200
                      `}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.name}</span>
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                          className={`
                            absolute left-0 z-50 mt-1
                            bg-white rounded-md shadow-md overflow-hidden
                            border border-gray-200/80 backdrop-blur-sm
                          `}
                        >
                          <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-green-50/80 to-blue-50/80">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              {isAuthenticated ? 'Your Solutions' : 'Product Solutions'}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {isAuthenticated ? 'Access your subscribed solutions' : 'Choose the right plan for your needs'}
                            </p>
                          </div>
                          {renderDropdownContent(item.subItems)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                
                {isMobile && (
                  <div className="px-1">
                    <button 
                      onClick={() => toggleDropdown(item.id)}
                      className={`
                        flex items-center justify-between w-full py-3 px-3
                        text-gray-700 font-medium rounded-md text-sm
                        ${activeDropdown === item.id ? 'bg-gradient-to-r from-green-50/80 to-blue-50/80' : ''}
                      `}
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.name}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pt-2 overflow-hidden"
                        >
                          {renderDropdownContent(item.subItems, true)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            ) : (
              <ScrollToTopLink
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-md transition-all
                  ${isMobile ? 'text-sm py-3 px-3' : 'text-sm'}
                  text-gray-700 hover:text-green-600
                  hover:bg-gradient-to-r from-green-50/50 to-blue-50/50
                  border border-transparent hover:border-gray-200
                `}
              >
                {item.icon && <span className={isMobile ? 'mr-2' : 'mr-2'}>{item.icon}</span>}
                {item.name}
              </ScrollToTopLink>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default Navbar