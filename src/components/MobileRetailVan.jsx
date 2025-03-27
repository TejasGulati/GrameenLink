import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  MapPin, 
  Users, 
  Package, 
  ShoppingCart, 
  Globe, 
  Star, 
  RefreshCw, 
  Filter, 
  Search, 
  Grid, 
  List,
  Plus,
  Navigation,
  AlertCircle,
  Edit,
  Trash2,
  Info,
  Target,
  Award,
  Crosshair,
  Heart,
  Leaf,
  Book,
  Banknote,
  Shield,
  Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Enhanced Product Categories with more specific descriptions
const PRODUCT_CATEGORIES = [
  { 
    name: 'Agricultural Inputs', 
    description: 'Seeds, fertilizers, tools, and technology to improve farming productivity',
    icon: Leaf,
    impact: 'Increases crop yields by 30-50% for small farmers'
  },
  { 
    name: 'Health & Wellness', 
    description: 'Essential medicines, health supplements, and personal care products',
    icon: Heart,
    impact: 'Reduces healthcare access time from days to hours'
  },
  { 
    name: 'FMCG & Essentials', 
    description: 'Fast-moving consumer goods, groceries, and daily household necessities',
    icon: ShoppingCart,
    impact: 'Saves 4-6 hours weekly per household in procurement time'
  },
  { 
    name: 'Rural Financial Services', 
    description: 'Micro-banking, insurance, and financial literacy tools',
    icon: Banknote,
    impact: 'Increases savings participation by 65% in served communities'
  },
  { 
    name: 'Educational Resources', 
    description: 'Learning materials, digital education tools, and skill development kits',
    icon: Book,
    impact: 'Improves school attendance by 40% in served areas'
  }
];

// Impact comparison data
const IMPACT_COMPARISON = [
  { name: 'Access Time', traditional: 8, mrv: 1, fullMark: 10 },
  { name: 'Product Variety', traditional: 3, mrv: 8, fullMark: 10 },
  { name: 'Affordability', traditional: 4, mrv: 7, fullMark: 10 },
  { name: 'Income Impact', traditional: 2, mrv: 9, fullMark: 10 },
  { name: 'Health Access', traditional: 3, mrv: 8, fullMark: 10 },
  { name: 'Digital Inclusion', traditional: 1, mrv: 7, fullMark: 10 }
];

// Key for localStorage
const LOCAL_STORAGE_KEY = 'mobileRetailVansData';

function MobileRetailVan() {
  const [selectedVan, setSelectedVan] = useState(null);
  const [filter, setFilter] = useState('All');
  const [systemStats, setSystemStats] = useState({
    totalVans: 0,
    activeVans: 0,
    entrepreneursEmpowered: 0,
    villagesReached: 0,
    totalSocialImpact: 0,
    incomeGenerated: 0,
    farmersTrained: 0
  });
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateVanModalOpen, setIsCreateVanModalOpen] = useState(false);
  const [isVanDetailsModalOpen, setIsVanDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [productDistributionData, setProductDistributionData] = useState([]);
  const [performanceChartData, setPerformanceChartData] = useState([]);
  const [socialImpactData, setSocialImpactData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [benefitsData, setBenefitsData] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Initial mock data
  const initialMockVans = [
    {
      id: 'MRV-001',
      entrepreneur: 'Priya Sharma',
      location: 'Maharashtra Rural Circuit',
      status: 'Active',
      mission: 'Empowering Small-Scale Farmers',
      socialImpact: {
        farmersTrained: 42,
        additionalIncomeFacilitated: '₹75,000',
        sustainabilityScore: 4.7,
        healthAccess: 38,
        educationAccess: 24
      },
      route: [
        { point: 'Farmer Cooperative', timestamp: '09:00 AM', services: ['Agricultural Inputs', 'Financial Literacy'] },
        { point: 'Village Health Center', timestamp: '11:30 AM', services: ['Health & Wellness', 'Insurance Awareness'] },
        { point: 'Community Learning Center', timestamp: '02:00 PM', services: ['Educational Resources'] }
      ],
      specialties: ['Agricultural Inputs', 'Health & Wellness'],
      contactNumber: '+91 9876543210',
      vehicleDetails: {
        make: 'Tata Ace',
        model: 'Transformed Retail Van',
        registrationNumber: 'MH-12-AB-1234',
        lastMaintenance: '2024-03-15'
      },
      performanceMetrics: {
        salesThisMonth: '₹95,000',
        customerSatisfaction: 4.8,
        routesCovered: 15,
        productsDelivered: 127,
        profitMargin: '32%',
        customerRetention: '85%'
      },
      benefits: {
        timeSaved: '150 hours/week',
        costReduction: '25% avg.',
        accessImproved: '3x more products',
        digitalPayments: '68% adoption'
      }
    },
    {
      id: 'MRV-002',
      entrepreneur: 'Rajesh Kumar',
      location: 'Karnataka Agricultural Region',
      status: 'Maintenance',
      mission: 'Bridging Health and Education Gaps',
      socialImpact: {
        farmersTrained: 35,
        additionalIncomeFacilitated: '₹62,000',
        sustainabilityScore: 4.5,
        healthAccess: 42,
        educationAccess: 31
      },
      route: [
        { point: 'Rural Health Clinic', timestamp: '10:15 AM', services: ['Health & Wellness', 'Educational Resources'] },
        { point: 'Seed Distribution Center', timestamp: '12:45 PM', services: ['Agricultural Inputs'] }
      ],
      specialties: ['Agricultural Inputs', 'Educational Resources'],
      contactNumber: '+91 8765432109',
      vehicleDetails: {
        make: 'Mahindra Bolero',
        model: 'Community Service Van',
        registrationNumber: 'KA-23-CD-5678',
        lastMaintenance: '2024-03-10'
      },
      performanceMetrics: {
        salesThisMonth: '₹75,000',
        customerSatisfaction: 4.5,
        routesCovered: 12,
        productsDelivered: 95,
        profitMargin: '28%',
        customerRetention: '78%'
      },
      benefits: {
        timeSaved: '120 hours/week',
        costReduction: '22% avg.',
        accessImproved: '2.5x more products',
        digitalPayments: '55% adoption'
      }
    }
  ];

  // Load data from localStorage or use initial mock data
  const [mobileVans, setMobileVans] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialMockVans;
  });

  const [newVan, setNewVan] = useState({
    entrepreneurName: '',
    mission: '',
    location: '',
    contactNumber: '',
    specialties: [],
    vehicleMake: '',
    registrationNumber: ''
  });

  // Save to localStorage whenever mobileVans changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mobileVans));
  }, [mobileVans]);

  useEffect(() => {
    // Calculate system-wide statistics
    const updatedSystemStats = {
      totalVans: mobileVans.length,
      activeVans: mobileVans.filter(van => van.status === 'Active').length,
      entrepreneursEmpowered: mobileVans.length,
      villagesReached: mobileVans.length * 5,
      totalSocialImpact: mobileVans.reduce((sum, van) => {
        const impact = parseFloat(van.socialImpact.additionalIncomeFacilitated.replace('₹', '').replace(',', ''));
        return sum + (isNaN(impact) ? 0 : impact);
      }, 0),
      incomeGenerated: mobileVans.reduce((sum, van) => {
        const income = parseFloat(van.socialImpact.additionalIncomeFacilitated.replace('₹', '').replace(',', ''));
        return sum + (isNaN(income) ? 0 : income);
      }, 0),
      farmersTrained: mobileVans.reduce((sum, van) => sum + van.socialImpact.farmersTrained, 0)
    };
  
    setSystemStats(updatedSystemStats);
  }, [mobileVans]);

  useEffect(() => {
    // Calculate product distribution data
    const productDist = mobileVans.reduce((acc, van) => {
      van.specialties.forEach(specialty => {
        acc[specialty] = (acc[specialty] || 0) + 1;
      });
      return acc;
    }, {});
  
    setProductDistributionData(
      Object.entries(productDist).map(([name, value]) => ({
        name,
        value,
        percent: mobileVans.length ? value / mobileVans.length : 0,
        ...PRODUCT_CATEGORIES.find(cat => cat.name === name)
      }))
    );
  
    // Calculate performance chart data
    setPerformanceChartData(mobileVans.map(van => {
      const sales = parseFloat(van.performanceMetrics.salesThisMonth.replace('₹', '').replace(',', ''));
      const satisfaction = van.performanceMetrics.customerSatisfaction * 20;
      const products = van.performanceMetrics.productsDelivered;
      const profit = parseFloat(van.performanceMetrics.profitMargin.replace('%', ''));
  
      return {
        name: van.id,
        sales: isNaN(sales) ? 0 : sales,
        satisfaction: isNaN(satisfaction) ? 0 : satisfaction,
        products: isNaN(products) ? 0 : products,
        profit: isNaN(profit) ? 0 : profit
      };
    }));
  
    // Calculate social impact data
    setSocialImpactData([
      { 
        name: 'Farmers Trained', 
        value: mobileVans.reduce((sum, van) => sum + van.socialImpact.farmersTrained, 0),
        icon: Leaf
      },
      { 
        name: 'Income Generated', 
        value: mobileVans.reduce((sum, van) => {
          const income = parseFloat(van.socialImpact.additionalIncomeFacilitated.replace('₹', '').replace(',', ''));
          return sum + (isNaN(income) ? 0 : income);
        }, 0),
        icon: Banknote
      },
      { 
        name: 'Health Access', 
        value: mobileVans.reduce((sum, van) => sum + van.socialImpact.healthAccess, 0),
        icon: Heart
      },
      { 
        name: 'Education Access', 
        value: mobileVans.reduce((sum, van) => sum + van.socialImpact.educationAccess, 0),
        icon: Book
      }
    ]);
  
    // Calculate revenue vs impact data
    setRevenueData(mobileVans.map(van => {
      const revenue = parseFloat(van.performanceMetrics.salesThisMonth.replace('₹', '').replace(',', ''));
      const impact = parseFloat(van.socialImpact.additionalIncomeFacilitated.replace('₹', '').replace(',', ''));
  
      return {
        name: van.id,
        revenue: isNaN(revenue) ? 0 : revenue,
        impact: isNaN(impact) ? 0 : impact,
        profit: parseFloat(van.performanceMetrics.profitMargin.replace('%', '')) || 0
      };
    }));

    // Calculate benefits data
    setBenefitsData([
      { name: 'Time Saved', value: mobileVans.reduce((sum, van) => sum + parseInt(van.benefits.timeSaved), 0) },
      { name: 'Cost Reduction', value: mobileVans.reduce((sum, van) => sum + parseInt(van.benefits.costReduction), 0) },
      { name: 'Product Access', value: mobileVans.reduce((sum, van) => sum + parseFloat(van.benefits.accessImproved), 0) },
      { name: 'Digital Inclusion', value: mobileVans.reduce((sum, van) => sum + parseInt(van.benefits.digitalPayments), 0) }
    ]);
  }, [mobileVans]);
  
  const filteredVans = useMemo(() => {
    let result = mobileVans;
    
    if (filter !== 'All') {
      result = result.filter(van => van.status === filter);
    }

    if (searchTerm) {
      result = result.filter(van => 
        van.entrepreneur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        van.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [mobileVans, filter, searchTerm]);

  const handleCreateVan = () => {
    if (!newVan.entrepreneurName || !newVan.location || !newVan.contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const newVanEntry = {
      id: `MRV-${mobileVans.length + 1}`,
      entrepreneur: newVan.entrepreneurName,
      location: newVan.location,
      status: 'Active',
      mission: newVan.mission || 'Empowering Rural Communities',
      socialImpact: {
        farmersTrained: Math.floor(Math.random() * 50),
        additionalIncomeFacilitated: `₹${(Math.floor(Math.random() * 50000) + 50000)}`,
        sustainabilityScore: +(Math.random() * 5).toFixed(1),
        healthAccess: Math.floor(Math.random() * 50),
        educationAccess: Math.floor(Math.random() * 40)
      },
      route: [{ point: newVan.location, timestamp: new Date().toLocaleTimeString(), services: newVan.specialties }],
      specialties: newVan.specialties,
      contactNumber: newVan.contactNumber,
      vehicleDetails: {
        make: newVan.vehicleMake,
        model: 'Community Service Van',
        registrationNumber: newVan.registrationNumber,
        lastMaintenance: new Date().toISOString().split('T')[0]
      },
      performanceMetrics: {
        salesThisMonth: `₹${(Math.floor(Math.random() * 50000) + 50000)}`,
        customerSatisfaction: +(Math.random() * 5).toFixed(1),
        routesCovered: Math.floor(Math.random() * 15) + 5,
        productsDelivered: Math.floor(Math.random() * 100) + 50,
        profitMargin: `${Math.floor(Math.random() * 15) + 20}%`,
        customerRetention: `${Math.floor(Math.random() * 20) + 70}%`
      },
      benefits: {
        timeSaved: `${Math.floor(Math.random() * 100) + 50} hours/week`,
        costReduction: `${Math.floor(Math.random() * 15) + 15}% avg.`,
        accessImproved: `${(Math.random() * 3 + 2).toFixed(1)}x more products`,
        digitalPayments: `${Math.floor(Math.random() * 30) + 50}% adoption`
      }
    };

    setMobileVans([...mobileVans, newVanEntry]);
    setIsCreateVanModalOpen(false);
    setNewVan({ 
      entrepreneurName: '', 
      mission: '',
      location: '', 
      contactNumber: '', 
      specialties: [], 
      vehicleMake: '',
      registrationNumber: ''
    });
  };

  const handleDeleteVan = (vanId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this van?');
    if (confirmDelete) {
      setMobileVans(mobileVans.filter(van => van.id !== vanId));
    }
  };

  const handleEditVan = (van) => {
    setSelectedVan(van);
    setIsEditModalOpen(true);
  };

  const renderVanDetailsModal = () => {
    if (!selectedVan) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-xl p-12 w-full max-w-4xl overflow-y-auto max-h-[90vh]"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Truck className="mr-4 text-blue-600" /> 
                {selectedVan.entrepreneur}'s Mobile Retail Van
              </h2>
              <p className="text-xl text-gray-600 mt-2">{selectedVan.mission}</p>
            </div>
            <button 
              onClick={() => setIsVanDetailsModalOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Van Details Card */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Van Specifications</h3>
              <div className="space-y-3">
                <div><strong>Make:</strong> {selectedVan.vehicleDetails.make}</div>
                <div><strong>Model:</strong> {selectedVan.vehicleDetails.model}</div>
                <div><strong>Reg. Number:</strong> {selectedVan.vehicleDetails.registrationNumber}</div>
                <div><strong>Last Maintained:</strong> {selectedVan.vehicleDetails.lastMaintenance}</div>
              </div>
            </div>

            {/* Social Impact Card */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-800">Social Impact</h3>
              <div className="space-y-3">
                <div><strong>Farmers Trained:</strong> {selectedVan.socialImpact.farmersTrained}</div>
                <div><strong>Additional Income:</strong> {selectedVan.socialImpact.additionalIncomeFacilitated}</div>
                <div><strong>Health Services Provided:</strong> {selectedVan.socialImpact.healthAccess}</div>
                <div><strong>Educational Services:</strong> {selectedVan.socialImpact.educationAccess}</div>
              </div>
            </div>

            {/* Performance Metrics Card */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Performance</h3>
              <div className="space-y-3">
                <div><strong>Monthly Sales:</strong> {selectedVan.performanceMetrics.salesThisMonth}</div>
                <div><strong>Profit Margin:</strong> {selectedVan.performanceMetrics.profitMargin}</div>
                <div><strong>Customer Satisfaction:</strong> {selectedVan.performanceMetrics.customerSatisfaction}/5</div>
                <div><strong>Customer Retention:</strong> {selectedVan.performanceMetrics.customerRetention}</div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 bg-yellow-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-yellow-800">Community Benefits</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  <RefreshCw className="text-blue-600 mr-2" size={18} />
                  <strong>Time Saved</strong>
                </div>
                <div>{selectedVan.benefits.timeSaved}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  <Banknote className="text-green-600 mr-2" size={18} />
                  <strong>Cost Reduction</strong>
                </div>
                <div>{selectedVan.benefits.costReduction}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  <Package className="text-purple-600 mr-2" size={18} />
                  <strong>Product Access</strong>
                </div>
                <div>{selectedVan.benefits.accessImproved}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  <Globe className="text-teal-600 mr-2" size={18} />
                  <strong>Digital Inclusion</strong>
                </div>
                <div>{selectedVan.benefits.digitalPayments}</div>
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Today's Route</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedVan.route.map((stop, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-4 shadow-md border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong>{stop.point}</strong>
                    <span className="text-sm text-gray-600">{stop.timestamp}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Services:</strong>
                    <ul className="list-disc list-inside">
                      {stop.services.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderVanView = () => {
    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {filteredVans.map((van) => (
          <motion.div 
            key={van.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all relative group"
            onClick={() => {
              setSelectedVan(van);
              setIsVanDetailsModalOpen(true);
            }}
          >
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditVan(van);
                }}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteVan(van.id);
                }}
                className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{van.entrepreneur}</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${van.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}
              >
                {van.status}
              </span>
            </div>
            <div className="space-y-2">
              <div><strong>Location:</strong> {van.location}</div>
              <div><strong>Mission:</strong> {van.mission}</div>
              <div className="flex items-center">
                <Banknote className="mr-2 text-green-600" size={16} />
                <strong>Impact:</strong> {van.socialImpact.additionalIncomeFacilitated}
              </div>
              <div className="flex items-center">
                <Smile className="mr-2 text-blue-600" size={16} />
                <strong>Satisfaction:</strong> {van.performanceMetrics.customerSatisfaction}/5
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(van.performanceMetrics.productsDelivered, 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {Math.min(van.performanceMetrics.productsDelivered, 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr>
            <th className="p-4 text-left">Entrepreneur</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Impact</th>
            <th className="p-4 text-left">Revenue</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVans.map((van) => (
            <tr 
              key={van.id} 
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedVan(van);
                setIsVanDetailsModalOpen(true);
              }}
            >
              <td className="p-4">{van.entrepreneur}</td>
              <td className="p-4">{van.location}</td>
              <td className="p-4">
                <span 
                  className={`
                    px-3 py-1 rounded-full text-xs
                    ${van.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {van.status}
                </span>
              </td>
              <td className="p-4">{van.socialImpact.additionalIncomeFacilitated}</td>
              <td className="p-4">{van.performanceMetrics.salesThisMonth}</td>
              <td className="p-4 flex space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditVan(van);
                  }}
                  className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVan(van.id);
                  }}
                  className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderImpactComparisonModal = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-xl p-12 w-full max-w-4xl"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <Info className="mr-4 text-blue-600" /> 
              Why Mobile Retail Vans?
            </h2>
            <p className="text-xl text-gray-600 mt-2">Transforming rural economies through innovative distribution</p>
          </div>
          <button 
            onClick={() => setIsImpactModalOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Advantages</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Truck className="text-blue-600" size={20} />
                </div>
                <div>
                  <strong>Last-Mile Connectivity:</strong> Reaches remote areas traditional retail can't
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Banknote className="text-green-600" size={20} />
                </div>
                <div>
                  <strong>Economic Empowerment:</strong> Creates rural entrepreneurs with 30-50% higher earnings
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Heart className="text-purple-600" size={20} />
                </div>
                <div>
                  <strong>Health & Education:</strong> Delivers essential services to underserved communities
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <Leaf className="text-yellow-600" size={20} />
                </div>
                <div>
                  <strong>Sustainable Model:</strong> Combines profitability with social impact
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Impact Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={IMPACT_COMPARISON}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="Traditional Retail" dataKey="traditional" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Mobile Retail Vans" dataKey="mrv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Rural Transformation Metrics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">3-5x</div>
              <div>Increase in product accessibility</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-2">25-40%</div>
              <div>Reduction in consumer prices</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-2">60-80%</div>
              <div>Of rural households served regularly</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-8"
    >
      <div className="container mx-auto mt-20">
        {/* Header with search and add van button */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center">
              <Truck className="mr-4 text-blue-600" /> Mobile Retail Vans
            </h1>
            <p className="text-gray-600 mt-2">Bridging the rural-urban divide through mobile commerce</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search vans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-64"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateVanModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center"
            >
              <Plus className="mr-2" /> Add New Van
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center"
            >
              <Info className="mr-2" /> Why MRVs?
            </motion.button>
          </div>
        </motion.div>

        {/* System Overview Cards */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-5 gap-6 mb-8 w-full"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Truck className="text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Vans</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.totalVans}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Active Vans</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.activeVans}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ShoppingCart className="text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Villages Reached</h3>
            </div>
            <div className="text-4xl font-bold text-purple-800">
              {systemStats.villagesReached}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Banknote className="text-yellow-600 mr-3" />
              <h3 className="text-xl font-semibold">Income Generated</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              ₹{systemStats.incomeGenerated.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Leaf className="text-teal-600 mr-3" />
              <h3 className="text-xl font-semibold">Farmers Trained</h3>
            </div>
            <div className="text-4xl font-bold text-teal-800">
              {systemStats.farmersTrained}
            </div>
          </div>
        </motion.div>

        {/* Visualization Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Product Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Package className="mr-2 text-blue-600" /> Product Distribution
            </h3>
            {productDistributionData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        value, 
                        `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                      ]}
                    />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No product distribution data available
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {productDistributionData.map((product, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="truncate">{product.name}:</span>
                  <span className="font-medium ml-1">{product.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart className="mr-2 text-green-600" /> Van Performance
            </h3>
            {performanceChartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" name="Sales (₹)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="profit" name="Profit Margin (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No performance data available
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600">
              <strong>Key Insight:</strong> Mobile retail vans achieve 25-35% profit margins while creating social impact
            </div>
          </div>

          {/* Social Impact Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-purple-600" /> Social Impact
            </h3>
            {socialImpactData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={socialImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No social impact data available
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {socialImpactData.map((impact, index) => (
                <div key={index} className="flex items-center text-sm">
                  <impact.icon className="mr-2" size={16} />
                  <span>{impact.name}:</span>
                  <span className="font-medium ml-1">
                    {impact.name.includes('Income') ? '₹' : ''}
                    {impact.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue vs Impact Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2 text-green-600" /> Revenue vs Social Impact
            </h3>
            {revenueData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#0088FE" />
                    <Bar yAxisId="right" dataKey="impact" name="Social Impact (₹)" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No revenue data available
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600">
              <strong>Key Insight:</strong> Every ₹1 in revenue generates ₹0.60-0.80 in community impact
            </div>
          </div>
        </motion.div>

        {/* Vans Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 min-h-[600px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Mobile Retail Vans</h2>
            <div className="flex space-x-4">
              <div className="flex space-x-2 mr-4">
                {['All', 'Active', 'Maintenance'].map((statusFilter) => (
                  <button 
                    key={statusFilter}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${filter === statusFilter 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}
                    onClick={() => setFilter(statusFilter)}
                  >
                    {statusFilter}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`
                    p-2 rounded-full
                    ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
                  `}
                >
                  <Grid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`
                    p-2 rounded-full
                    ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
                  `}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {filteredVans.length > 0 ? (
            renderVanView()
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Truck size={48} className="mb-4" />
              <p>No vans match your search criteria</p>
              <button 
                onClick={() => {
                  setFilter('All');
                  setSearchTerm('');
                }}
                className="mt-4 text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Create Van Modal */}
        <AnimatePresence>
          {isCreateVanModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-12 mt-12 w-full max-w-lg"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Plus className="mr-2 text-blue-600" /> Add New Mobile Retail Van
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Entrepreneur Name"
                    value={newVan.entrepreneurName}
                    onChange={(e) => setNewVan({...newVan, entrepreneurName: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Contact Number"
                    value={newVan.contactNumber}
                    onChange={(e) => setNewVan({...newVan, contactNumber: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Van Location"
                    value={newVan.location}
                    onChange={(e) => setNewVan({...newVan, location: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Mission Statement"
                    value={newVan.mission}
                    onChange={(e) => setNewVan({...newVan, mission: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Vehicle Make"
                    value={newVan.vehicleMake}
                    onChange={(e) => setNewVan({...newVan, vehicleMake: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Registration Number"
                    value={newVan.registrationNumber}
                    onChange={(e) => setNewVan({...newVan, registrationNumber: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <div>
                    <label className="block mb-2">Van Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() => {
                            const currentSpecialties = newVan.specialties;
                            setNewVan({
                              ...newVan, 
                              specialties: currentSpecialties.includes(category.name)
                                ? currentSpecialties.filter(s => s !== category.name)
                                : [...currentSpecialties, category.name]
                            });
                          }}
                          className={`
                            px-3 py-1 rounded-full text-sm flex items-center
                            ${newVan.specialties.includes(category.name) 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-700'}
                          `}
                        >
                          <category.icon className="mr-2" size={16} />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setIsCreateVanModalOpen(false)}
                      className="px-4 py-2 border rounded-full"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateVan}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full"
                    >
                      Add Van
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Van Modal */}
        <AnimatePresence>
          {isEditModalOpen && selectedVan && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-12 mt-12 w-full max-w-lg"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Edit className="mr-2 text-blue-600" /> Edit Mobile Retail Van
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Entrepreneur Name"
                    value={selectedVan.entrepreneur}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      entrepreneur: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Contact Number"
                    value={selectedVan.contactNumber}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      contactNumber: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Van Location"
                    value={selectedVan.location}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      location: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Mission Statement"
                    value={selectedVan.mission}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      mission: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Vehicle Make"
                    value={selectedVan.vehicleDetails.make}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      vehicleDetails: {
                        ...selectedVan.vehicleDetails,
                        make: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Registration Number"
                    value={selectedVan.vehicleDetails.registrationNumber}
                    onChange={(e) => setSelectedVan({
                      ...selectedVan, 
                      vehicleDetails: {
                        ...selectedVan.vehicleDetails,
                        registrationNumber: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  <div>
                    <label className="block mb-2">Van Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() => {
                            const currentSpecialties = selectedVan.specialties;
                            setSelectedVan({
                              ...selectedVan, 
                              specialties: currentSpecialties.includes(category.name)
                                ? currentSpecialties.filter(s => s !== category.name)
                                : [...currentSpecialties, category.name]
                            });
                          }}
                          className={`
                            px-3 py-1 rounded-full text-sm flex items-center
                            ${selectedVan.specialties.includes(category.name) 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-700'}
                          `}
                        >
                          <category.icon className="mr-2" size={16} />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border rounded-full"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        const updatedVans = mobileVans.map(van => 
                          van.id === selectedVan.id ? selectedVan : van
                        );
                        setMobileVans(updatedVans);
                        setIsEditModalOpen(false);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Van Details Modal */}
        <AnimatePresence>
          {isVanDetailsModalOpen && renderVanDetailsModal()}
        </AnimatePresence>

        {/* Impact Comparison Modal */}
        <AnimatePresence>
          {isImpactModalOpen && renderImpactComparisonModal()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default MobileRetailVan;