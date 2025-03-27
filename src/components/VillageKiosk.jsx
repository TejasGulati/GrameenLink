import React, { useState, useEffect } from 'react';
import { 
  Store, ShoppingCart, Users, Clock, Package, DollarSign, Truck, 
  RefreshCw, MapPin, Grid, List, Plus, Edit, Trash2, Filter, 
  ChevronDown, ChevronUp, Search, Save, X, BarChart2, PieChart as PieChartIcon,
  Heart, Shield, BatteryCharging, Globe, Wifi, Smartphone, Award, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area
} from 'recharts';

// Local storage keys
const STORAGE_KEYS = {
  KIOSKS: 'villageKiosksData',
  TRANSACTIONS: 'villageKiosksTransactions'
};

function VillageKiosk() {
  // Load data from local storage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from local storage:`, error);
      return defaultValue;
    }
  };

  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to local storage:`, error);
    }
  };

  const [selectedKiosk, setSelectedKiosk] = useState(null);
  const [isCreateKioskOpen, setIsCreateKioskOpen] = useState(false);
  const [isInventoryManagementOpen, setIsInventoryManagementOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [systemStats, setSystemStats] = useState({
    totalKiosks: 0,
    activeKiosks: 0,
    totalRevenue: 0,
    dailyTransactions: 0,
    avgPerformanceScore: 0,
    inventoryItems: 0,
    villagesServed: 0,
    digitalPayments: 0,
    employmentGenerated: 0
  });
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filter, setFilter] = useState('All');
  const [kioskEditMode, setKioskEditMode] = useState(null);
  const [kioskTypeData, setKioskTypeData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [transactionTrendData, setTransactionTrendData] = useState([]);
  const [socialImpactData, setSocialImpactData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const SOCIAL_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  // Enhanced New Kiosk State with More Fields
  const [newKiosk, setNewKiosk] = useState({
    name: '',
    location: '',
    ownerName: '',
    contactNumber: '',
    type: 'Community Kiosk',
    registrationDate: new Date().toISOString().split('T')[0],
    latitude: '',
    longitude: '',
    services: ['Essential Goods', 'Digital Payments']
  });

  // Load kiosks and transactions from local storage or use defaults
  const [kiosks, setKiosks] = useState(() => {
    const defaultKiosks = [
      {
        id: 'KSK-001',
        name: 'Swarna Rural Kiosk',
        location: 'Maharashtra, Rural Cluster',
        ownerName: 'Priya Patil',
        contactNumber: '+91 9876543210',
        type: 'Community Kiosk',
        status: 'Active',
        performanceScore: 92,
        dailyTransactions: 45,
        monthlyRevenue: 125000,
        registrationDate: '2023-01-15',
        latitude: '19.0760',
        longitude: '72.8777',
        services: ['Essential Goods', 'Digital Payments', 'Agri-Inputs', 'Solar Charging'],
        impactMetrics: {
          householdsServed: 85,
          digitalLiteracyIncreased: 72,
          employmentGenerated: 3,
          distanceSaved: 15 // km average saved per household
        },
        inventory: [
          { product: 'Rice', stock: 250, unit: 'kg', minStock: 100, maxStock: 500, lastRestocked: '2024-03-20' },
          { product: 'Cooking Oil', stock: 75, unit: 'lit', minStock: 50, maxStock: 200, lastRestocked: '2024-03-15' },
          { product: 'Soap', stock: 120, unit: 'pieces', minStock: 50, maxStock: 300, lastRestocked: '2024-03-10' }
        ]
      },
      {
        id: 'KSK-002',
        name: 'Grameen Digital Hub',
        location: 'Karnataka Rural Belt',
        ownerName: 'Rajesh Kumar',
        contactNumber: '+91 8765432109',
        type: 'Mobile Retail Van',
        status: 'Maintenance',
        performanceScore: 68,
        dailyTransactions: 22,
        monthlyRevenue: 87500,
        registrationDate: '2023-06-22',
        latitude: '12.9716',
        longitude: '77.5946',
        services: ['Essential Goods', 'Mobile Banking', 'Medicine Delivery'],
        impactMetrics: {
          householdsServed: 120,
          digitalLiteracyIncreased: 65,
          employmentGenerated: 2,
          distanceSaved: 22 // km average saved per household
        },
        inventory: [
          { product: 'Wheat', stock: 180, unit: 'kg', minStock: 100, maxStock: 400, lastRestocked: '2024-03-18' },
          { product: 'Spices', stock: 50, unit: 'pack', minStock: 30, maxStock: 150, lastRestocked: '2024-03-12' },
          { product: 'Sanitizer', stock: 90, unit: 'pieces', minStock: 50, maxStock: 200, lastRestocked: '2024-03-05' }
        ]
      },
      {
        id: 'KSK-003',
        name: 'Ujjwala Rural Store',
        location: 'Uttar Pradesh Village',
        ownerName: 'Sunita Devi',
        contactNumber: '+91 7654321098',
        type: 'Community Kiosk',
        status: 'Active',
        performanceScore: 85,
        dailyTransactions: 38,
        monthlyRevenue: 110000,
        registrationDate: '2023-09-10',
        latitude: '26.8467',
        longitude: '80.9462',
        services: ['Essential Goods', 'Solar Charging', 'E-Learning'],
        impactMetrics: {
          householdsServed: 65,
          digitalLiteracyIncreased: 58,
          employmentGenerated: 4,
          distanceSaved: 18 // km average saved per household
        },
        inventory: [
          { product: 'Rice', stock: 300, unit: 'kg', minStock: 100, maxStock: 500, lastRestocked: '2024-03-22' },
          { product: 'Pulses', stock: 150, unit: 'kg', minStock: 50, maxStock: 300, lastRestocked: '2024-03-18' },
          { product: 'Detergent', stock: 80, unit: 'pieces', minStock: 30, maxStock: 200, lastRestocked: '2024-03-15' }
        ]
      }
    ];
    return loadFromStorage(STORAGE_KEYS.KIOSKS, defaultKiosks);
  });

  // Enhanced Transactions with More Details
  const [transactions, setTransactions] = useState(() => {
    // Generate more transaction data for the last 7 days
    const today = new Date();
    const defaultTransactions = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Add 2-5 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 4) + 2;
      for (let j = 0; j < transactionsPerDay; j++) {
        const kioskId = `KSK-00${Math.floor(Math.random() * 3) + 1}`;
        const amount = Math.floor(Math.random() * 2000) + 500;
        const paymentMethod = Math.random() > 0.5 ? 'Digital' : 'Cash';
        
        defaultTransactions.push({
          id: `TXN-${dateStr.replace(/-/g, '')}-${j}`,
          kioskId,
          date: dateStr,
          totalAmount: amount,
          paymentMethod,
          customerType: Math.random() > 0.5 ? 'Local Resident' : 'Farmer',
          products: [
            { name: 'Rice', quantity: Math.floor(Math.random() * 10) + 1, price: 50, discount: 0 },
            { name: 'Cooking Oil', quantity: Math.floor(Math.random() * 3) + 1, price: 200, discount: 10 }
          ]
        });
      }
    }
    
    return loadFromStorage(STORAGE_KEYS.TRANSACTIONS, defaultTransactions);
  });

  // Enhanced Inventory Management State
  const [inventoryManagement, setInventoryManagement] = useState({
    selectedKioskId: null,
    newProduct: {
      product: '',
      stock: 0,
      unit: '',
      minStock: 0,
      maxStock: 0
    }
  });

  // Save to local storage whenever kiosks or transactions change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.KIOSKS, kiosks);
  }, [kiosks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  // System Stats Calculation with Chart Data
  useEffect(() => {
    const calculateSystemStats = () => {
      const totalKiosks = kiosks.length;
      const activeKiosks = kiosks.filter(k => k.status === 'Active').length;
      const totalRevenue = transactions.reduce((sum, txn) => sum + txn.totalAmount, 0);
      const dailyTransactions = transactions.length;
      const avgPerformanceScore = kiosks.reduce((sum, k) => sum + k.performanceScore, 0) / totalKiosks;
      const inventoryItems = kiosks.reduce((sum, k) => sum + k.inventory.length, 0);
      const villagesServed = new Set(kiosks.map(k => k.location.split(',')[0])).size;
      const digitalPayments = transactions.filter(t => t.paymentMethod === 'Digital').length;
      const employmentGenerated = kiosks.reduce((sum, k) => sum + k.impactMetrics.employmentGenerated, 0);

      setSystemStats({
        totalKiosks,
        activeKiosks,
        totalRevenue,
        dailyTransactions,
        avgPerformanceScore: Math.round(avgPerformanceScore || 0),
        inventoryItems,
        villagesServed,
        digitalPayments,
        employmentGenerated
      });

      // Kiosk Type Distribution
      const typeDistribution = kiosks.reduce((acc, kiosk) => {
        acc[kiosk.type] = (acc[kiosk.type] || 0) + 1;
        return acc;
      }, {});

      setKioskTypeData(
        Object.entries(typeDistribution).map(([name, value]) => ({
          name, 
          value,
          percent: value / kiosks.length
        }))
      );

      // Revenue by Kiosk
      setRevenueData(
        kiosks.map(kiosk => ({
          name: kiosk.name,
          revenue: kiosk.monthlyRevenue,
          transactions: kiosk.dailyTransactions * 30, // Approximate monthly
          impact: kiosk.impactMetrics.householdsServed * 1000 // Weighted impact score
        }))
      );

      // Inventory Levels
      setInventoryData(
        kiosks.flatMap(kiosk => 
          kiosk.inventory.map(item => ({
            kiosk: kiosk.name,
            product: item.product,
            stock: item.stock,
            min: item.minStock,
            max: item.maxStock
          }))
        )
      );

      // Transaction Trends (last 7 days)
      const today = new Date();
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      setTransactionTrendData(
        dates.map(date => {
          const dateTransactions = transactions.filter(t => t.date === date);
          return {
            date: date.split('-').slice(1).join('/'), // MM/DD format
            transactions: dateTransactions.length,
            revenue: dateTransactions.reduce((sum, t) => sum + t.totalAmount, 0)
          };
        })
      );

      // Social Impact Data
      setSocialImpactData([
        { subject: 'Households Served', A: kiosks.reduce((sum, k) => sum + k.impactMetrics.householdsServed, 0), fullMark: 300 },
        { subject: 'Digital Literacy', A: kiosks.reduce((sum, k) => sum + k.impactMetrics.digitalLiteracyIncreased, 0)/kiosks.length, fullMark: 100 },
        { subject: 'Employment', A: kiosks.reduce((sum, k) => sum + k.impactMetrics.employmentGenerated, 0), fullMark: 10 },
        { subject: 'Distance Saved (km)', A: kiosks.reduce((sum, k) => sum + k.impactMetrics.distanceSaved, 0), fullMark: 100 },
        { subject: 'Digital Payments', A: (transactions.filter(t => t.paymentMethod === 'Digital').length / transactions.length) * 100, fullMark: 100 }
      ]);

      // Comparison with Traditional Ration Shops
      setComparisonData([
        { name: 'Availability', traditional: 60, smartKiosk: 95 },
        { name: 'Digital Payments', traditional: 15, smartKiosk: 65 },
        { name: 'Price Transparency', traditional: 40, smartKiosk: 90 },
        { name: 'Product Variety', traditional: 50, smartKiosk: 85 },
        { name: 'Accessibility', traditional: 70, smartKiosk: 95 },
        { name: 'Additional Services', traditional: 10, smartKiosk: 80 }
      ]);
    };

    calculateSystemStats();
  }, [kiosks, transactions]);

  // Sorted and filtered kiosks
  const sortedKiosks = [...kiosks]
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    })
    .filter(kiosk => 
      kiosk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kiosk.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredKiosks = filter === 'All' 
    ? sortedKiosks 
    : sortedKiosks.filter(k => k.status === filter);

  // Create new kiosk handler
  const handleCreateKiosk = () => {
    if (!newKiosk.name || !newKiosk.location || !newKiosk.ownerName) {
      alert('Please fill in all required fields');
      return;
    }

    const kioskToAdd = {
      id: `KSK-${kiosks.length + 1}`,
      ...newKiosk,
      status: 'Active',
      performanceScore: 100,
      dailyTransactions: 0,
      monthlyRevenue: 0,
      impactMetrics: {
        householdsServed: 0,
        digitalLiteracyIncreased: 0,
        employmentGenerated: 1,
        distanceSaved: 0
      },
      inventory: []
    };

    const updatedKiosks = [...kiosks, kioskToAdd];
    setKiosks(updatedKiosks);
    setIsCreateKioskOpen(false);
    setNewKiosk({
      name: '',
      location: '',
      ownerName: '',
      contactNumber: '',
      type: 'Community Kiosk',
      registrationDate: new Date().toISOString().split('T')[0],
      latitude: '',
      longitude: '',
      services: ['Essential Goods', 'Digital Payments']
    });
  };

  // Edit kiosk handler
  const handleEditKiosk = () => {
    if (!kioskEditMode.name || !kioskEditMode.location || !kioskEditMode.ownerName) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedKiosks = kiosks.map(kiosk => 
      kiosk.id === kioskEditMode.id ? kioskEditMode : kiosk
    );
    setKiosks(updatedKiosks);
    setKioskEditMode(null);
  };

  // Delete kiosk handler
  const handleDeleteKiosk = (kioskId) => {
    const updatedKiosks = kiosks.filter(k => k.id !== kioskId);
    setKiosks(updatedKiosks);
  };

  // Render kiosk view (grid/list)
  const renderKioskView = () => {
    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {filteredKiosks.map((kiosk) => (
          <motion.div 
            key={kiosk.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{kiosk.name}</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${kiosk.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}
              >
                {kiosk.status}
              </span>
            </div>
            <div className="space-y-2">
              <div><strong>Location:</strong> {kiosk.location}</div>
              <div><strong>Owner:</strong> {kiosk.ownerName}</div>
              <div><strong>Type:</strong> {kiosk.type}</div>
              <div className="mt-2">
                <strong>Services:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {kiosk.services.map((service, i) => (
                    <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${kiosk.performanceScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{kiosk.performanceScore}%</span>
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setKioskEditMode(kiosk)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteKiosk(kiosk.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedKiosk(kiosk);
                    setIsImpactModalOpen(true);
                  }}
                  className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            {['ID', 'Name', 'Location', 'Status', 'Transactions', 'Revenue', 'Households Served', 'Actions'].map((header) => (
              <th 
                key={header} 
                className="p-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  const isAsc = sortConfig.direction === 'asc';
                  setSortConfig({
                    key: header.toLowerCase().replace(' ', ''),
                    direction: isAsc ? 'desc' : 'asc'
                  });
                }}
              >
                {header}
                {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                  sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" size={16} /> : <ChevronDown className="inline ml-1" size={16} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredKiosks.map((kiosk) => (
            <tr key={kiosk.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3">{kiosk.id}</td>
              <td className="p-3">{kiosk.name}</td>
              <td className="p-3">{kiosk.location}</td>
              <td className="p-3">
                <span 
                  className={`
                    px-2 py-1 rounded-full text-xs
                    ${kiosk.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {kiosk.status}
                </span>
              </td>
              <td className="p-3">{kiosk.dailyTransactions}</td>
              <td className="p-3">₹{kiosk.monthlyRevenue.toLocaleString()}</td>
              <td className="p-3">{kiosk.impactMetrics.householdsServed}</td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => setKioskEditMode(kiosk)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteKiosk(kiosk.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedKiosk(kiosk);
                    setIsImpactModalOpen(true);
                  }}
                  className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                >
                  <Heart size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render the visualization section with charts
  const renderVisualizationSection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid md:grid-cols-2 gap-8 mb-8"
    >
      {/* Kiosk Type Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Store className="mr-2 text-blue-600" /> Kiosk Type Distribution
        </h3>
        {kioskTypeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={kioskTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {kioskTypeData.map((entry, index) => (
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
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No kiosk type data available
          </div>
        )}
      </div>

      {/* Revenue by Kiosk Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-600" /> Revenue & Impact
        </h3>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Monthly Revenue (₹)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="impact" name="Impact Score" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No revenue data available
          </div>
        )}
      </div>

      {/* Social Impact Radar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Heart className="mr-2 text-red-600" /> Social Impact Metrics
        </h3>
        {socialImpactData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={socialImpactData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 20']} />
              <Radar 
                name="Impact" 
                dataKey="A" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6} 
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No impact data available
          </div>
        )}
      </div>

      {/* Comparison with Traditional Shops */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2 text-orange-600" /> Smart Kiosk vs Traditional Shops
        </h3>
        {comparisonData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="traditional" name="Traditional Shops" fill="#8884d8" />
              <Bar dataKey="smartKiosk" name="Smart Kiosks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No comparison data available
          </div>
        )}
      </div>

      {/* Transaction Trends Area Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-purple-600" /> Transaction Trends (Last 7 Days)
        </h3>
        {transactionTrendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Transactions') return [value, 'Number of Transactions'];
                  if (name === 'Revenue (₹)') return [`₹${value}`, 'Total Revenue'];
                  return [value, name];
                }}
              />
              <Legend />
              <Area 
                yAxisId="left" 
                type="monotone" 
                dataKey="transactions" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Transactions" 
              />
              <Area 
                yAxisId="right" 
                type="monotone" 
                dataKey="revenue" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Revenue (₹)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No transaction data available
          </div>
        )}
      </div>

      {/* Inventory Levels Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Package className="mr-2 text-orange-600" /> Inventory Levels
        </h3>
        {inventoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={inventoryData.slice(0, 10)} // Show first 10 items for clarity
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="product" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" name="Current Stock" fill="#8884d8" />
              <Bar dataKey="max" name="Max Capacity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No inventory data available
          </div>
        )}
      </div>
    </motion.div>
  );

  // Modals for Create and Edit Kiosk
  const renderCreateKioskModal = () => (
    <AnimatePresence>
      {isCreateKioskOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6">Create New Kiosk</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Kiosk Name"
                value={newKiosk.name}
                onChange={(e) => setNewKiosk({...newKiosk, name: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newKiosk.location}
                onChange={(e) => setNewKiosk({...newKiosk, location: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Owner Name"
                value={newKiosk.ownerName}
                onChange={(e) => setNewKiosk({...newKiosk, ownerName: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={newKiosk.contactNumber}
                onChange={(e) => setNewKiosk({...newKiosk, contactNumber: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <select
                value={newKiosk.type}
                onChange={(e) => setNewKiosk({...newKiosk, type: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Community Kiosk">Community Kiosk</option>
                <option value="Mobile Retail Van">Mobile Retail Van</option>
              </select>
              <div className="pt-2">
                <label className="block mb-2">Services Offered:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Essential Goods', 'Digital Payments', 'Agri-Inputs', 'Solar Charging', 'Mobile Banking', 'Medicine Delivery'].map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newKiosk.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKiosk({
                              ...newKiosk,
                              services: [...newKiosk.services, service]
                            });
                          } else {
                            setNewKiosk({
                              ...newKiosk,
                              services: newKiosk.services.filter(s => s !== service)
                            });
                          }
                        }}
                        className="rounded text-green-600"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setIsCreateKioskOpen(false)}
                  className="px-4 py-2 border rounded-full hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateKiosk}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  Create Kiosk
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderEditKioskModal = () => (
    <AnimatePresence>
      {kioskEditMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6">Edit Kiosk</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Kiosk Name"
                value={kioskEditMode.name}
                onChange={(e) => setKioskEditMode({...kioskEditMode, name: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={kioskEditMode.location}
                onChange={(e) => setKioskEditMode({...kioskEditMode, location: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Owner Name"
                value={kioskEditMode.ownerName}
                onChange={(e) => setKioskEditMode({...kioskEditMode, ownerName: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={kioskEditMode.contactNumber}
                onChange={(e) => setKioskEditMode({...kioskEditMode, contactNumber: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <select
                value={kioskEditMode.status}
                onChange={(e) => setKioskEditMode({...kioskEditMode, status: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <div className="pt-2">
                <label className="block mb-2">Services Offered:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Essential Goods', 'Digital Payments', 'Agri-Inputs', 'Solar Charging', 'Mobile Banking', 'Medicine Delivery'].map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={kioskEditMode.services?.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setKioskEditMode({
                              ...kioskEditMode,
                              services: [...(kioskEditMode.services || []), service]
                            });
                          } else {
                            setKioskEditMode({
                              ...kioskEditMode,
                              services: (kioskEditMode.services || []).filter(s => s !== service)
                            });
                          }
                        }}
                        className="rounded text-green-600"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setKioskEditMode(null)}
                  className="px-4 py-2 border rounded-full hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditKiosk}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Inventory Management Modal Implementation
  const renderInventoryManagementModal = () => (
    <AnimatePresence>
      {isInventoryManagementOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl p-8 w-full max-w-4xl"
          >
            <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>
            
            {/* Kiosk Selection Dropdown */}
            <select
              value={inventoryManagement.selectedKioskId || ''}
              onChange={(e) => setInventoryManagement({
                ...inventoryManagement, 
                selectedKioskId: e.target.value
              })}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select a Kiosk</option>
              {kiosks.map(kiosk => (
                <option key={kiosk.id} value={kiosk.id}>
                  {kiosk.name}
                </option>
              ))}
            </select>

            {inventoryManagement.selectedKioskId && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {kiosks.find(k => k.id === inventoryManagement.selectedKioskId).name} Inventory
                </h3>
                
                {/* Inventory Table */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-center">Current Stock</th>
                      <th className="p-2 text-center">Min Stock</th>
                      <th className="p-2 text-center">Max Stock</th>
                      <th className="p-2 text-center">Last Restocked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kiosks
                      .find(k => k.id === inventoryManagement.selectedKioskId)
                      .inventory.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{item.product}</td>
                          <td className="p-2 text-center">{item.stock} {item.unit}</td>
                          <td className="p-2 text-center">{item.minStock} {item.unit}</td>
                          <td className="p-2 text-center">{item.maxStock} {item.unit}</td>
                          <td className="p-2 text-center">{item.lastRestocked}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add New Product Form */}
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={inventoryManagement.newProduct.product}
                    onChange={(e) => setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {...inventoryManagement.newProduct, product: e.target.value}
                    })}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={inventoryManagement.newProduct.stock}
                    onChange={(e) => setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {...inventoryManagement.newProduct, stock: Number(e.target.value)}
                    })}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={inventoryManagement.newProduct.unit}
                    onChange={(e) => setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {...inventoryManagement.newProduct, unit: e.target.value}
                    })}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Min Stock"
                    value={inventoryManagement.newProduct.minStock}
                    onChange={(e) => setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {...inventoryManagement.newProduct, minStock: Number(e.target.value)}
                    })}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max Stock"
                    value={inventoryManagement.newProduct.maxStock}
                    onChange={(e) => setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {...inventoryManagement.newProduct, maxStock: Number(e.target.value)}
                    })}
                    className="p-2 border rounded-md"
                  />
                </div>
                <button 
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
                  onClick={() => {
                    // Logic to add new product to inventory
                    const updatedKiosks = kiosks.map(kiosk => {
                      if (kiosk.id === inventoryManagement.selectedKioskId) {
                        return {
                          ...kiosk,
                          inventory: [
                            ...kiosk.inventory, 
                            {
                              ...inventoryManagement.newProduct,
                              lastRestocked: new Date().toISOString().split('T')[0]
                            }
                          ]
                        };
                      }
                      return kiosk;
                    });

                    setKiosks(updatedKiosks);
                    setInventoryManagement({
                      ...inventoryManagement,
                      newProduct: {
                        product: '',
                        stock: 0,
                        unit: '',
                        minStock: 0,
                        maxStock: 0
                      }
                    });
                  }}
                >
                  Add Product
                </button>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-4">
              <button 
                onClick={() => setIsInventoryManagementOpen(false)}
                className="px-4 py-2 border rounded-full hover:bg-gray-100 flex items-center"
              >
                <X className="mr-2" /> Close
              </button>
              <button 
                onClick={() => {
                  // Save all changes and close the modal
                  setIsInventoryManagementOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 flex items-center"
              >
                <Save className="mr-2" /> Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Social Impact Modal
  const renderImpactModal = () => (
    <AnimatePresence>
      {isImpactModalOpen && selectedKiosk && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl p-8 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Heart className="mr-2 text-red-500" /> Social Impact of {selectedKiosk.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2" /> Community Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-green-100 p-1 rounded-full mr-2">
                      <Heart size={16} className="text-green-600" />
                    </span>
                    <span><strong>{selectedKiosk.impactMetrics.householdsServed}</strong> households served</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-100 p-1 rounded-full mr-2">
                      <Smartphone size={16} className="text-green-600" />
                    </span>
                    <span><strong>{selectedKiosk.impactMetrics.digitalLiteracyIncreased}%</strong> digital literacy increase</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-100 p-1 rounded-full mr-2">
                      <Truck size={16} className="text-green-600" />
                    </span>
                    <span><strong>{selectedKiosk.impactMetrics.distanceSaved}km</strong> average distance saved per household</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <DollarSign className="mr-2" /> Economic Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-blue-100 p-1 rounded-full mr-2">
                      <Users size={16} className="text-blue-600" />
                    </span>
                    <span><strong>{selectedKiosk.impactMetrics.employmentGenerated}</strong> local jobs created</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-blue-100 p-1 rounded-full mr-2">
                      <DollarSign size={16} className="text-blue-600" />
                    </span>
                    <span><strong>₹{selectedKiosk.monthlyRevenue.toLocaleString()}</strong> monthly revenue</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-blue-100 p-1 rounded-full mr-2">
                      <Shield size={16} className="text-blue-600" />
                    </span>
                    <span><strong>10-15%</strong> cheaper than traditional shops</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Leaf className="mr-2" /> Environmental Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-purple-100 p-1 rounded-full mr-2">
                      <Truck size={16} className="text-purple-600" />
                    </span>
                    <span><strong>30%</strong> reduction in travel emissions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 p-1 rounded-full mr-2">
                      <BatteryCharging size={16} className="text-purple-600" />
                    </span>
                    <span><strong>Solar-powered</strong> operations where available</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 p-1 rounded-full mr-2">
                      <Package size={16} className="text-purple-600" />
                    </span>
                    <span><strong>Reduced</strong> packaging waste</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Wifi className="mr-2" /> Digital Inclusion
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-orange-100 p-1 rounded-full mr-2">
                      <Smartphone size={16} className="text-orange-600" />
                    </span>
                    <span><strong>Digital payment</strong> options available</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-orange-100 p-1 rounded-full mr-2">
                      <Globe size={16} className="text-orange-600" />
                    </span>
                    <span><strong>Internet access</strong> points</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-orange-100 p-1 rounded-full mr-2">
                      <Award size={16} className="text-orange-600" />
                    </span>
                    <span><strong>Digital literacy</strong> training</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border mb-6">
              <h3 className="text-lg font-semibold mb-3">Why This Kiosk is Better Than Traditional Ration Shops</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Multi-service hub</strong> - Combines retail with digital services, banking, and more</li>
                <li><strong>Transparent pricing</strong> - Digital displays show real-time prices with no hidden costs</li>
                <li><strong>Better availability</strong> - Smart inventory management prevents stock-outs</li>
                <li><strong>Digital payments</strong> - Enables cashless transactions and financial inclusion</li>
                <li><strong>Local employment</strong> - Creates jobs within the community</li>
                <li><strong>Reduced travel</strong> - Saves villagers time and transportation costs</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsImpactModalOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="container mx-auto mt-20">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center">
              <Store className="mr-4 text-green-600" /> Smart Village Kiosks
            </h1>
            <p className="text-gray-600 mt-2">
              Bridging the rural-urban divide through technology and local entrepreneurship
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateKioskOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center"
            >
              <Plus className="mr-2" /> Create New Kiosk
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsInventoryManagementOpen(true)}
              className="border border-green-600 text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition flex items-center"
            >
              <ShoppingCart className="mr-2" /> Inventory Management
            </motion.button>
          </div>
        </header>

        {/* System Overview Cards */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Kiosks</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.totalKiosks}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Serving {systemStats.villagesServed} villages
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Revenue</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              ₹{systemStats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {systemStats.digitalPayments} digital transactions
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="text-red-600 mr-3" />
              <h3 className="text-xl font-semibold">Social Impact</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.employmentGenerated}+
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Local jobs created
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart2 className="text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold">Avg Performance</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.avgPerformanceScore}%
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Across all kiosks
            </div>
          </div>
        </motion.div>

        {/* Key Benefits Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Smart Village Kiosks?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Shield className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Better Than Ration Shops</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>30-40% lower prices through direct sourcing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>No leakages or corruption with digital tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Wider product variety beyond just essentials</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Leaf className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Social Impact</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Creates local entrepreneurship opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reduces travel time and costs for villagers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Promotes digital and financial inclusion</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Smartphone className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Innovative Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Real-time inventory management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Digital payment integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Value-added services like solar charging</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Visualization Section */}
        {renderVisualizationSection()}

        {/* Kiosk Management Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search and Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search kiosks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-full w-64"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border rounded-full"
              >
                <option value="All">All Kiosks</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
              >
                <Grid />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
              >
                <List />
              </button>
            </div>
          </div>

          {/* Kiosk View */}
          {renderKioskView()}
        </div>

        {/* Modals */}
        {renderCreateKioskModal()}
        {renderEditKioskModal()}
        {renderInventoryManagementModal()}
        {renderImpactModal()}
      </div>
    </motion.div>
  );
}

export default VillageKiosk;