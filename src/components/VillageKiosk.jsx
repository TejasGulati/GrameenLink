import React, { useState, useEffect } from 'react';
import { 
  Store, ShoppingCart, Users, Clock, Package, DollarSign, Truck, 
  RefreshCw, MapPin, Grid, List, Plus, Edit, Trash2, Filter, 
  ChevronDown, ChevronUp, Search, Save, X, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line 
} from 'recharts';

function VillageKiosk() {
  const [selectedKiosk, setSelectedKiosk] = useState(null);
  const [isCreateKioskOpen, setIsCreateKioskOpen] = useState(false);
  const [isInventoryManagementOpen, setIsInventoryManagementOpen] = useState(false);
  const [systemStats, setSystemStats] = useState({
    totalKiosks: 0,
    activeKiosks: 0,
    totalRevenue: 0,
    dailyTransactions: 0,
    avgPerformanceScore: 0,
    inventoryItems: 0
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

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Enhanced New Kiosk State with More Fields
  const [newKiosk, setNewKiosk] = useState({
    name: '',
    location: '',
    ownerName: '',
    contactNumber: '',
    type: 'Community Kiosk',
    registrationDate: new Date().toISOString().split('T')[0],
    latitude: '',
    longitude: ''
  });

  // Enhanced Kiosks with More Detailed Information
  const [kiosks, setKiosks] = useState([
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
      inventory: [
        { product: 'Rice', stock: 300, unit: 'kg', minStock: 100, maxStock: 500, lastRestocked: '2024-03-22' },
        { product: 'Pulses', stock: 150, unit: 'kg', minStock: 50, maxStock: 300, lastRestocked: '2024-03-18' },
        { product: 'Detergent', stock: 80, unit: 'pieces', minStock: 30, maxStock: 200, lastRestocked: '2024-03-15' }
      ]
    }
  ]);

  // Enhanced Transactions with More Details
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      kioskId: 'KSK-001',
      date: '2024-03-20',
      totalAmount: 1250,
      paymentMethod: 'Cash',
      customerType: 'Local Resident',
      products: [
        { name: 'Rice', quantity: 10, price: 50, discount: 0 },
        { name: 'Cooking Oil', quantity: 2, price: 200, discount: 10 }
      ]
    },
    {
      id: 'TXN-002',
      kioskId: 'KSK-002',
      date: '2024-03-21',
      totalAmount: 875,
      paymentMethod: 'Digital',
      customerType: 'Farmer',
      products: [
        { name: 'Wheat', quantity: 5, price: 100, discount: 5 },
        { name: 'Spices', quantity: 3, price: 125, discount: 0 }
      ]
    },
    {
      id: 'TXN-003',
      kioskId: 'KSK-001',
      date: '2024-03-22',
      totalAmount: 650,
      paymentMethod: 'Digital',
      customerType: 'Local Resident',
      products: [
        { name: 'Soap', quantity: 5, price: 40, discount: 0 },
        { name: 'Cooking Oil', quantity: 1, price: 200, discount: 10 }
      ]
    },
    {
      id: 'TXN-004',
      kioskId: 'KSK-003',
      date: '2024-03-22',
      totalAmount: 1125,
      paymentMethod: 'Cash',
      customerType: 'Farmer',
      products: [
        { name: 'Rice', quantity: 15, price: 50, discount: 0 },
        { name: 'Pulses', quantity: 5, price: 75, discount: 0 }
      ]
    }
  ]);

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

  // System Stats Calculation with Chart Data
  useEffect(() => {
    const calculateSystemStats = () => {
      const totalKiosks = kiosks.length;
      const activeKiosks = kiosks.filter(k => k.status === 'Active').length;
      const totalRevenue = transactions.reduce((sum, txn) => sum + txn.totalAmount, 0);
      const dailyTransactions = transactions.length;
      const avgPerformanceScore = kiosks.reduce((sum, k) => sum + k.performanceScore, 0) / totalKiosks;
      const inventoryItems = kiosks.reduce((sum, k) => sum + k.inventory.length, 0);

      setSystemStats({
        totalKiosks,
        activeKiosks,
        totalRevenue,
        dailyTransactions,
        avgPerformanceScore: Math.round(avgPerformanceScore || 0),
        inventoryItems
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
          transactions: kiosk.dailyTransactions * 30 // Approximate monthly
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
      inventory: []
    };

    setKiosks([...kiosks, kioskToAdd]);
    setIsCreateKioskOpen(false);
    setNewKiosk({
      name: '',
      location: '',
      ownerName: '',
      contactNumber: '',
      type: 'Community Kiosk',
      registrationDate: new Date().toISOString().split('T')[0],
      latitude: '',
      longitude: ''
    });
  };

  // Edit kiosk handler
  const handleEditKiosk = () => {
    if (!kioskEditMode.name || !kioskEditMode.location || !kioskEditMode.ownerName) {
      alert('Please fill in all required fields');
      return;
    }

    setKiosks(kiosks.map(kiosk => 
      kiosk.id === kioskEditMode.id ? kioskEditMode : kiosk
    ));
    setKioskEditMode(null);
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
                  onClick={() => setKiosks(kiosks.filter(k => k.id !== kiosk.id))}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
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
            {['ID', 'Name', 'Location', 'Status', 'Transactions', 'Revenue', 'Actions'].map((header) => (
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
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => setKioskEditMode(kiosk)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => setKiosks(kiosks.filter(k => k.id !== kiosk.id))}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
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
          <DollarSign className="mr-2 text-green-600" /> Revenue by Kiosk
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
              <Bar yAxisId="right" dataKey="transactions" name="Monthly Transactions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No revenue data available
          </div>
        )}
      </div>

      {/* Transaction Trends Line Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-purple-600" /> Transaction Trends
        </h3>
        {transactionTrendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="transactions" stroke="#8884d8" name="Transactions" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue (₹)" />
            </LineChart>
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="container mx-auto mt-20">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Store className="mr-4 text-green-600" /> Smart Village Kiosks
          </h1>
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
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Revenue</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              ₹{systemStats.totalRevenue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Inventory Items</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.inventoryItems}
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
      </div>
    </motion.div>
  );
}

export default VillageKiosk;