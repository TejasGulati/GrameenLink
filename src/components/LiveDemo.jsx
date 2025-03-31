import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Map, 
  Package, 
  ShoppingCart, 
  Sun, 
  Shield,
  Zap,
  Smartphone,
  BarChart2,
  ArrowRight,
  Download,
  Mail,
  Clock,
  DollarSign,
  Layers,
  LineChart,
  Hand,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Import images directly
import KioskInterfaceImage from '../assets/villkiosk.png'
import BlockchainExplorerImage from '../assets/blckchain.png'

const LiveDemo = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [simulationStatus, setSimulationStatus] = useState('paused')
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedVillage, setSelectedVillage] = useState(null)
  const [transactionHash, setTransactionHash] = useState('')
  const [droneProgress, setDroneProgress] = useState(0)
  const [inventoryLevels, setInventoryLevels] = useState({
    rice: 85,
    flour: 60,
    oil: 45,
    pulses: 70
  })
  
  const mapRef = useRef(null)
  const droneMapRef = useRef(null)
  const markersRef = useRef([])
  const droneMarkerRef = useRef(null)

  const villages = [
    { id: 'v1', name: 'Mohanpur', lat: 28.61, lng: 77.23, households: 120, lastDelivery: 'Not yet operational', distance: 8.5 },
    { id: 'v2', name: 'Sunderjhar', lat: 28.58, lng: 77.18, households: 85, lastDelivery: 'Not yet operational', distance: 5.2 },
    { id: 'v3', name: 'Rampur', lat: 28.65, lng: 77.28, households: 150, lastDelivery: 'Not yet operational', distance: 10.1 },
    { id: 'v4', name: 'Chandrapur', lat: 28.63, lng: 77.33, households: 200, lastDelivery: 'Not yet operational', distance: 12.7 }
  ]

  const demoSteps = [
    { id: 'order', title: 'Village Order Placed', icon: <ShoppingCart /> },
    { id: 'inventory', title: 'Inventory Checked', icon: <Package /> },
    { id: 'blockchain', title: 'Blockchain Transaction', icon: <Shield /> },
    { id: 'drone', title: 'Drone Dispatch', icon: <Zap /> },
    { id: 'delivery', title: 'Delivery Completed', icon: <Map /> },
    { id: 'kiosk', title: 'Kiosk Restocked', icon: <Smartphone /> }
  ]

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
    { id: 'solutions', label: 'Solutions', icon: <Layers size={18} /> },
    { id: 'blockchain', label: 'Blockchain', icon: <Shield size={18} /> },
    { id: 'impact', label: 'Impact', icon: <LineChart size={18} /> },
    { id: 'drones', label: 'Drone Network', icon: <Zap size={18} /> },
    { id: 'kiosks', label: 'Village Kiosks', icon: <Smartphone size={18} /> },
    { id: 'partners', label: 'Partners', icon: <Hand size={18} /> }
  ]

  const generateTxHash = () => {
    return '0x' + Math.random().toString(16).substr(2, 64)
  }

  const toggleSimulation = () => {
    if (simulationStatus === 'completed') {
      resetSimulation()
      return
    }
    setSimulationStatus(prev => prev === 'running' ? 'paused' : 'running')
  }

  const resetSimulation = () => {
    setSimulationStatus('paused')
    setCurrentStep(0)
    setDroneProgress(0)
    setSelectedVillage(null)
    setTransactionHash('')
    setInventoryLevels({
      rice: 85,
      flour: 60,
      oil: 45,
      pulses: 70
    })
    if (droneMarkerRef.current && droneMapRef.current) {
      droneMapRef.current.removeLayer(droneMarkerRef.current)
      droneMarkerRef.current = null
    }
  }

  useEffect(() => {
    if (!mapRef.current && typeof window !== 'undefined') {
      const mapContainer = document.getElementById('map')
      if (mapContainer && !mapContainer._leaflet_id) {
        const mapInstance = L.map('map').setView([28.61, 77.23], 12)
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance)

        L.marker([28.61, 77.20], {
          icon: L.divIcon({
            html: `<div class="bg-blue-600 text-white p-2 rounded-full shadow-lg">Warehouse</div>`,
            className: 'bg-transparent border-none'
          })
        }).addTo(mapInstance)

        const newMarkers = villages.map(village => {
          return L.marker([village.lat, village.lng], {
            icon: L.divIcon({
              html: `<div class="bg-green-600 text-white p-1 px-2 rounded-full text-xs shadow-md">${village.name}</div>`,
              className: 'bg-transparent border-none'
            })
          }).addTo(mapInstance)
        })
        
        markersRef.current = newMarkers
        mapRef.current = mapInstance
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'drones' && !droneMapRef.current && typeof window !== 'undefined') {
      const droneMapContainer = document.getElementById('drone-map')
      if (droneMapContainer && !droneMapContainer._leaflet_id) {
        const droneMapInstance = L.map('drone-map').setView([28.61, 77.23], 12)
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(droneMapInstance)

        L.marker([28.61, 77.20], {
          icon: L.divIcon({
            html: `<div class="bg-blue-600 text-white p-2 rounded-full shadow-lg">Warehouse</div>`,
            className: 'bg-transparent border-none'
          })
        }).addTo(droneMapInstance)

        droneMapRef.current = droneMapInstance
      }
    }

    return () => {
      if (droneMapRef.current) {
        droneMapRef.current.remove()
        droneMapRef.current = null
      }
    }
  }, [activeTab])

  useEffect(() => {
    if (simulationStatus !== 'running') return

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        if (nextStep >= demoSteps.length) {
          setSimulationStatus('completed')
          return prev
        }
        return nextStep
      })

      if (currentStep >= 3 && selectedVillage && droneMapRef.current) {
        setDroneProgress(prev => {
          const newProgress = prev + (100 / (demoSteps.length - 3))
          if (newProgress >= 100) return 100
          
          const warehousePos = [28.61, 77.20]
          const villagePos = [selectedVillage.lat, selectedVillage.lng]
          
          const lat = warehousePos[0] + (villagePos[0] - warehousePos[0]) * (newProgress / 100)
          const lng = warehousePos[1] + (villagePos[1] - warehousePos[1]) * (newProgress / 100)
          
          if (droneMarkerRef.current) {
            droneMarkerRef.current.setLatLng([lat, lng])
          } else {
            const newDroneMarker = L.marker([lat, lng], {
              icon: L.divIcon({
                html: `<div class="bg-red-500 text-white p-2 rounded-full shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>`,
                className: 'bg-transparent border-none'
              })
            }).addTo(droneMapRef.current)
            droneMarkerRef.current = newDroneMarker
          }
          
          return newProgress
        })
      }

      if (currentStep === 4) {
        setInventoryLevels(prev => ({
          rice: Math.max(0, prev.rice - 15),
          flour: Math.max(0, prev.flour - 10),
          oil: Math.max(0, prev.oil - 5),
          pulses: Math.max(0, prev.pulses - 8)
        }))
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [simulationStatus, currentStep, selectedVillage])

  useEffect(() => {
    if (currentStep === 2) {
      setTransactionHash(generateTxHash())
    }
  }, [currentStep])

  useEffect(() => {
    if (simulationStatus === 'running' && !selectedVillage) {
      const randomVillage = villages[Math.floor(Math.random() * villages.length)]
      setSelectedVillage(randomVillage)
    }
  }, [simulationStatus, selectedVillage])

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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Interactive Demo</h1>
              <p className="text-lg opacity-90 max-w-2xl">
                Experience how GrameenLink could transform rural supply chains with our potential future technology
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button 
                onClick={toggleSimulation}
                className="flex items-center bg-white text-green-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:bg-gray-50"
              >
                {simulationStatus === 'running' ? (
                  <>
                    <Pause className="mr-2" size={18} />
                    Pause Demo
                  </>
                ) : simulationStatus === 'completed' ? (
                  <>
                    <RefreshCw className="mr-2" size={18} />
                    Restart Demo
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={18} />
                    Start Demo
                  </>
                )}
              </button>
              <button 
                onClick={scrollToContact}
                className="flex items-center bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition"
              >
                <Mail className="mr-2" size={18} />
                Request Full Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-1 hide-scrollbar">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium border-b-2 transition flex items-center whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Process Steps */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Potential Future Supply Chain Process</h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
                    <div 
                      className="bg-green-500 w-0.5 transition-all duration-500"
                      style={{ height: `${(currentStep / (demoSteps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="space-y-8">
                    {demoSteps.map((step, index) => (
                      <div key={step.id} className="relative pl-12">
                        <div className={`absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-white ${
                          index < currentStep ? 'bg-green-500' : 
                          index === currentStep ? 'bg-green-300 animate-pulse' : 'bg-gray-200'
                        }`}></div>
                        <div className={`p-4 rounded-lg transition-all ${
                          index <= currentStep ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center">
                            <div className="p-2 rounded-lg bg-white shadow-sm mr-4">
                              {React.cloneElement(step.icon, { 
                                className: index <= currentStep ? 'text-green-600' : 'text-gray-400',
                                size: 20
                              })}
                            </div>
                            <div>
                              <h3 className="font-medium">{step.title}</h3>
                              {index === currentStep && simulationStatus === 'running' && (
                                <p className="text-sm text-gray-500 mt-1 animate-pulse">Processing...</p>
                              )}
                              {index === currentStep && (
                                <AnimatePresence>
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3"
                                  >
                                    {step.id === 'order' && selectedVillage && (
                                      <div className="text-sm bg-white p-3 rounded border border-gray-200">
                                        <p><span className="font-medium">Potential Village:</span> {selectedVillage.name}</p>
                                        <p><span className="font-medium">Sample Order:</span> 15kg Rice, 10kg Flour, 5L Oil</p>
                                      </div>
                                    )}
                                    {step.id === 'blockchain' && transactionHash && (
                                      <div className="text-sm bg-white p-3 rounded border border-gray-200 font-mono overflow-x-auto">
                                        <p className="font-medium">Sample Transaction Hash:</p>
                                        <p className="text-green-600 break-all">{transactionHash}</p>
                                        <button 
                                          onClick={() => navigator.clipboard.writeText(transactionHash)}
                                          className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                        >
                                          Copy to clipboard
                                        </button>
                                      </div>
                                    )}
                                    {step.id === 'drone' && (
                                      <div className="mt-3">
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-green-500 transition-all duration-500"
                                            style={{ width: `${droneProgress}%` }}
                                          ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 text-right">
                                          {Math.round(droneProgress)}% complete
                                        </p>
                                      </div>
                                    )}
                                    {step.id === 'delivery' && selectedVillage && (
                                      <div className="text-sm bg-white p-3 rounded border border-green-200">
                                        <p className="font-medium text-green-600">Potential Delivery Success!</p>
                                        <p className="mt-1">Could reach {selectedVillage.name} in {(selectedVillage.distance / 3).toFixed(1)} minutes</p>
                                      </div>
                                    )}
                                  </motion.div>
                                </AnimatePresence>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Visualization */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Potential Village Network</h2>
                <div id="map" className="h-96 bg-gray-100 rounded-lg"></div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>This interactive map shows potential future coverage areas for our drone delivery network.</p>
                  {selectedVillage && currentStep >= 3 && (
                    <p className="mt-2 text-green-600 font-medium">
                      Simulation: Drone en route to {selectedVillage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Inventory Levels */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Potential Inventory Levels</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Rice', level: inventoryLevels.rice, color: 'bg-green-500' },
                    { name: 'Flour', level: inventoryLevels.flour, color: 'bg-blue-500' },
                    { name: 'Cooking Oil', level: inventoryLevels.oil, color: 'bg-yellow-500' },
                    { name: 'Pulses', level: inventoryLevels.pulses, color: 'bg-red-500' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.name}</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setInventoryLevels({
                      rice: 100,
                      flour: 100,
                      oil: 100,
                      pulses: 100
                    })}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Simulate Restock
                  </button>
                </div>
              </div>

              {/* Village Info */}
              {selectedVillage && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold mb-4">Selected Potential Village</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name</span>
                      <span className="font-medium">{selectedVillage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Households</span>
                      <span className="font-medium">{selectedVillage.households}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{Math.round(selectedVillage.distance)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium">{selectedVillage.lastDelivery}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => {
                        const randomVillage = villages[Math.floor(Math.random() * villages.length)]
                        setSelectedVillage(randomVillage)
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Select Different Village
                    </button>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Projected Performance Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Delivery Time', value: '45 min', change: 'Potential -65%' },
                    { label: 'Cost Saved', value: '₹1200', change: 'Potential -52%' },
                    { label: 'Accuracy', value: '98.7%', change: 'Potential +12%' },
                    { label: 'CO2 Saved', value: '4.2kg', change: 'Potential -78%' }
                  ].map((metric, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-center hover:shadow-xs transition">
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className="text-lg font-bold mt-1">{metric.value}</p>
                      <p className={`text-xs mt-1 ${
                        metric.change.includes('+') ? 'text-green-600' : 
                        metric.change.includes('-') ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.change} vs traditional
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Solutions Tab */}
        {activeTab === 'solutions' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Our Potential Future Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Blockchain Transparency",
                  description: "Potential tamper-proof supply chain records ensuring authenticity and fair pricing",
                  icon: <Shield className="text-green-600" size={24} />,
                  status: "Planned"
                },
                {
                  title: "Drone Logistics Network",
                  description: "Potential 3x faster last-mile delivery with autonomous drone fleet",
                  icon: <Zap className="text-blue-600" size={24} />,
                  status: "Prototype"
                },
                {
                  title: "Smart Inventory System",
                  description: "Potential AI-powered demand forecasting and stock optimization",
                  icon: <Package className="text-purple-600" size={24} />,
                  status: "In Development"
                },
                {
                  title: "Mobile Retail Units",
                  description: "Potential commerce on wheels reaching remote villages weekly",
                  icon: <ShoppingCart className="text-yellow-600" size={24} />,
                  status: "Planning"
                },
                {
                  title: "Solar Kiosks",
                  description: "Potential offline-enabled digital hubs for village commerce and services",
                  icon: <Sun className="text-orange-600" size={24} />,
                  status: "Concept"
                },
                {
                  title: "Carbon Neutral Operations",
                  description: "Potential sustainable logistics with minimal environmental impact",
                  icon: <Globe className="text-teal-600" size={24} />,
                  status: "Goal"
                }
              ].map((solution, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      {solution.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{solution.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        solution.status === "Implemented" ? "bg-green-100 text-green-800" :
                        solution.status === "Prototype" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {solution.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{solution.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Blockchain Tab */}
        {activeTab === 'blockchain' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Transaction Ledger</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="mb-4">
                  <p className="text-gray-400"> Network: Potential GrameenChain</p>
                  <p className="text-gray-400"> Gas Fees: 0 (planned zero-gas protocol)</p>
                </div>
                {transactionHash ? (
                  <>
                    <p className="mb-2"> Sample Transaction:</p>
                    <p className="break-all">Hash: {transactionHash}</p>
                    <p>From: 0x742d...3a4b (Potential Central Warehouse)</p>
                    <p>To: 0x891f...7c2d (Potential {selectedVillage?.name || 'Village'} Kiosk)</p>
                    <p>Value: 15kg Rice, 10kg Flour, 5L Oil</p>
                    <p className="mt-2 text-gray-400"> Status: {currentStep > 2 ? 'Simulated Confirmed' : 'Pending'}</p>
                    {currentStep > 2 && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <p className="text-green-400">✓ Simulated block confirmation</p>
                        <p className="text-xs text-gray-500 mt-1">Potential smart contract execution</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400"> Start the demo to see potential blockchain in action</p>
                )}
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">How Blockchain Could Help</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Potential elimination of fraud with tamper-proof records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Potential fair pricing for farmers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Potential real-time supply chain visibility</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Farmer Payment Verification</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Sample Farmer</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Potential Verification</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Crop</p>
                    <p>Rice</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p>50kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p>₹1,250</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment</p>
                    <p className="text-green-600">Simulated</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-mono text-gray-500 break-all">
                    Potential Tx: 0x89f2...4c3d (view on explorer)
                  </p>
                </div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={BlockchainExplorerImage} 
                  alt="Blockchain Explorer Interface"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Projected Impact Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { 
                  title: "Villages Served", 
                  value: "120+", 
                  description: "Potential target for first 18 months of operation",
                  icon: <Map className="text-green-600" />
                },
                { 
                  title: "Households Reached", 
                  value: "10,000+", 
                  description: "Potential improved access to essential goods",
                  icon: <Users className="text-blue-600" />
                },
                { 
                  title: "Delivery Time Reduction", 
                  value: "65%", 
                  description: "Potential compared to traditional supply chains",
                  icon: <Clock className="text-purple-600" />
                },
                { 
                  title: "Cost Savings", 
                  value: "50%", 
                  description: "Potential reduction in last-mile delivery costs",
                  icon: <DollarSign className="text-yellow-600" />
                }
              ].map((metric, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      {metric.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{metric.title}</h3>
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-2">{metric.value}</p>
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="font-bold text-green-800 mb-3">Potential Sustainability Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-xs transition">
                  <p className="text-sm text-gray-500 mb-1">Carbon Emissions Reduced</p>
                  <p className="text-xl font-bold">78%</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-xs transition">
                  <p className="text-sm text-gray-500 mb-1">Solar Energy Utilization</p>
                  <p className="text-xl font-bold">100%</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-xs transition">
                  <p className="text-sm text-gray-500 mb-1">Plastic Waste Reduced</p>
                  <p className="text-xl font-bold">65%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drone Network Tab */}
        {activeTab === 'drones' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Live Drone Tracking</h2>
              <div id="drone-map" className="h-96 bg-gray-100 rounded-lg"></div>
              {droneProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>0%</span>
                    <span>{droneProgress}%</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${droneProgress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Warehouse</span>
                    <span>{selectedVillage?.name || 'Village'}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Drone Network Benefits</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "3x Faster Delivery",
                    description: "Potential to reduce delivery times from days to hours",
                    icon: <Clock className="text-blue-500" />
                  },
                  {
                    title: "50% Cost Reduction",
                    description: "Potential to eliminate expensive last-mile transportation",
                    icon: <DollarSign className="text-green-500" />
                  },
                  {
                    title: "All-Weather Access",
                    description: "Potential to reach remote villages during monsoon seasons",
                    icon: <Sun className="text-yellow-500" />
                  },
                  {
                    title: "Carbon Neutral",
                    description: "Potential solar-powered drones with zero emissions",
                    icon: <Shield className="text-teal-500" />
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 5 }}
                    className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Regulatory Compliance</h3>
                <p className="text-sm text-blue-700">
                  All potential drone operations would require DGCA approval with full insurance coverage and operate within 
                  designated green zones at altitudes below 120m.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Kiosks Tab */}
        {activeTab === 'kiosks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Village Kiosk Interface</h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={KioskInterfaceImage} 
                  alt="Village Kiosk Interface"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>0%</span>
                  <span>{currentStep >= 5 ? '100%' : '0%'}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${currentStep >= 5 ? 100 : 0}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Warehouse</span>
                  <span>{selectedVillage?.name || 'Village'}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Potential Kiosk Features</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Solar-Powered Operation</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-center">
                    <Sun className="text-yellow-500 mr-4" size={32} />
                    <p className="text-sm text-yellow-800">
                      Potential 24/7 operation powered by solar panels with 72-hour battery backup
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Offline Capability</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 mb-2">
                      Potential fully functional without internet using local blockchain nodes
                    </p>
                    <div className="flex items-center text-xs text-blue-700">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        currentStep >= 5 ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      {currentStep >= 5 ? 'Simulated sync' : 'Potential offline mode'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Additional Services</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Digital Payments', icon: '💳' },
                      { name: 'Govt. Services', icon: '🏛️' },
                      { name: 'Education', icon: '📚' },
                      { name: 'Health Info', icon: '🏥' }
                    ].map((service, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -3 }}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center hover:shadow-xs transition cursor-pointer"
                      >
                        <span className="text-2xl block mb-1">{service.icon}</span>
                        <span className="text-sm">{service.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Potential Entrepreneur Opportunity</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Each potential kiosk could be operated by a local entrepreneur earning 15-20% commission on sales.
                  </p>
                  <button 
                    onClick={scrollToContact}
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Learn About Potential Franchise Model
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Potential Partnership Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Technology Partners",
                  description: "Potential collaboration on drone, blockchain, and IoT solutions",
                  benefits: [
                    "Potential access to rural market data",
                    "Potential co-branding opportunities",
                    "Potential field testing capabilities"
                  ],
                  icon: <Zap className="text-blue-600" />
                },
                {
                  title: "Government Agencies",
                  description: "Potential support for rural development initiatives",
                  benefits: [
                    "Potential last-mile delivery infrastructure",
                    "Potential subsidy program implementation",
                    "Potential public-private partnerships"
                  ],
                  icon: <Shield className="text-green-600" />
                },
                {
                  title: "NGOs & Foundations",
                  description: "Potential joint programs for rural empowerment",
                  benefits: [
                    "Potential impact measurement frameworks",
                    "Potential community engagement models",
                    "Potential grant funding opportunities"
                  ],
                  icon: <Hand className="text-purple-600" />
                },
                {
                  title: "Corporate CSR",
                  description: "Potential sponsorship of kiosks and logistics networks",
                  benefits: [
                    "Potential sustainable development goals",
                    "Potential employee engagement programs",
                    "Potential brand visibility in rural markets"
                  ],
                  icon: <DollarSign className="text-yellow-600" />
                }
              ].map((partner, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      {partner.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{partner.title}</h3>
                      <p className="text-sm text-gray-600">{partner.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Potential Benefits:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {partner.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3">Become a Potential Partner</h3>
              <p className="text-blue-700 mb-4">
                Join us in potentially transforming rural supply chains through technology and innovation.
              </p>
              <button 
                onClick={scrollToContact}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Contact Potential Partnership Team
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to See More?</h2>
            <p className="mb-6 opacity-90">
              Schedule a personalized demo with our team to explore how GrameenLink could transform your supply chain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center"
              >
                Book Private Demo
                <ArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open('/product-brochure.pdf', '_blank')}
                className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition flex items-center justify-center"
              >
                Download Product Specs
                <Download className="ml-2" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveDemo