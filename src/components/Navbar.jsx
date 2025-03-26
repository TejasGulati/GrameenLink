import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X,
  Send,
  ChevronDown,
  User,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setFormSubmitted(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would typically send the form data to a backend
    console.log('Contact Form Submitted:', contactForm);
    
    // Simulate form submission
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      closeContactModal();
    }, 3000);
  };

  // Scroll and route change effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Click outside dropdown handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const moduleCategories = [
    {
      name: "Operations",
      routes: [
        { name: "Drone Logistics", path: "/drone" },
        { name: "Inventory Management", path: "/inventory" },
        { name: "Mobile Retail", path: "/mobile-retail" }
      ]
    },
    {
      name: "Innovation",
      routes: [
        { name: "Sustainability", path: "/sustainability" },
        { name: "Village Kiosk", path: "/village-kiosk" },
        { name: "Blockchain", path: "/blockchain" }
      ]
    }
  ];

  const NavLinks = ({ isMobile = false }) => (
    <>
      {moduleCategories.map((category, catIndex) => (
        <div 
          key={category.name} 
          className={`
            ${isMobile ? 'border-b border-gray-200' : ''}
            ${isMobile ? 'py-2' : 'relative group'}
          `}
        >
          {!isMobile && (
            <button 
              onClick={() => setActiveDropdown(activeDropdown === catIndex ? null : catIndex)}
              className="
                flex items-center justify-between w-full 
                text-sm lg:text-base text-gray-700 font-medium 
                hover:text-green-600 
                transition-colors
                px-3 py-2
                rounded-md
              "
            >
              {category.name}
              <ChevronDown 
                className={`
                  ml-2 h-4 w-4 
                  transform transition-transform duration-300
                  ${activeDropdown === catIndex ? 'rotate-180' : ''}
                `} 
              />
            </button>
          )}
          
          {(isMobile || activeDropdown === catIndex) && (
            <div 
              className={`
                ${isMobile ? 'pl-4' : 'absolute left-0 z-50 min-w-[200px] bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible'}
                ${!isMobile && activeDropdown === catIndex ? '!opacity-100 !visible' : ''}
              `}
            >
              {category.routes.map((route) => (
                <Link 
                  key={route.path}
                  to={route.path}
                  onClick={isMobile ? toggleMenu : undefined}
                  className={`
                    block 
                    ${isMobile ? 'py-3 text-base' : 'px-4 py-2 text-sm'}
                    text-gray-700 
                    hover:bg-green-50 
                    hover:text-green-600
                    transition-colors
                  `}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`
          fixed top-0 left-0 right-0 z-50 
          ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl' : 'bg-transparent'}
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4 space-x-2 sm:space-x-4">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0"
            >
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={logo}
                alt="GrameenLink Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg object-cover"
              />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text truncate">
                GrameenLink
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div 
              ref={dropdownRef}
              className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-grow justify-center"
            >
              <NavLinks />
            </div>

            {/* Contact Button - Desktop and Mobile */}
            <div className="hidden md:block flex-shrink-0">
              <motion.button
                onClick={openContactModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Contact <Send className="ml-2 h-4 w-4" />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex-shrink-0">
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Dropdown - Update Contact Link */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut" 
                }}
                className="md:hidden absolute left-0 right-0 top-full bg-white shadow-2xl rounded-b-lg"
              >
                <div className="px-4 pt-2 pb-4 space-y-2">
                  <NavLinks isMobile={true} />
                  
                  <button 
                    onClick={openContactModal}
                    className="
                      block w-full text-center 
                      bg-gradient-to-r from-green-600 to-blue-600 
                      text-white py-3 rounded-full
                      text-base
                      transition-transform hover:scale-105 active:scale-95
                      mt-4
                    "
                  >
                    Contact <Send className="inline-block ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6"
            >
              {!formSubmitted ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-green-600">Contact Us</h2>
                    <button 
                      onClick={closeContactModal}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={4}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-full hover:opacity-90 transition-opacity"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-green-600 mb-4"
                  >
                    <Send size={48} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="text-gray-600 mt-2">Your message has been sent successfully.</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 
export default Navbar;