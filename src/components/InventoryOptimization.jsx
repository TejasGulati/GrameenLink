import React, { useState, useEffect, useMemo } from 'react';
import { 
  Warehouse, 
  Package, 
  Truck, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Search, 
  Filter, 
  List, 
  Grid, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Edit,
  Trash2,
  Save,
  AlertCircle,
  ShieldCheck,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

function InventoryOptimization() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 'WH-001',
      name: 'Rural Karnataka Hub',
      location: 'Belgaum, Karnataka',
      stockItems: 42,
      storageCapacity: '500 sq m',
      healthScore: 92,
      status: 'Optimal',
      lastStockUpdate: '2024-03-20',
      productCategories: ['Agricultural', 'Medical', 'FMCG']
    },
    {
      id: 'WH-002',
      name: 'Maharashtra Agricultural Center',
      location: 'Pune, Maharashtra',
      stockItems: 35,
      storageCapacity: '450 sq m',
      healthScore: 85,
      status: 'Needs Attention',
      lastStockUpdate: '2024-03-15',
      productCategories: ['Agricultural', 'Seeds', 'Fertilizers']
    }
  ]);

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 'INV-001',
      name: 'Drought-Resistant Seed Kit',
      category: 'Agricultural',
      quantity: 1500,
      unit: 'packets',
      price: 95,
      reorderPoint: 500,
      warehouse: 'WH-001',
      supplier: 'GreenTech Seeds',
      trend: 'increasing'
    },
    {
      id: 'INV-002',
      name: 'Essential Medical Supplies',
      category: 'Medical',
      quantity: 750,
      unit: 'units',
      price: 150,
      reorderPoint: 250,
      warehouse: 'WH-002',
      supplier: 'HealthCare Direct',
      trend: 'stable'
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalWarehouses: 0,
    totalInventoryItems: 0,
    stockValueEstimate: 0,
    criticalStockItems: 0
  });

  const [viewMode, setViewMode] = useState('grid');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isCreateItemOpen, setIsCreateItemOpen] = useState(false);
  const [isWarehouseManagementOpen, setIsWarehouseManagementOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [inventoryDistributionData, setInventoryDistributionData] = useState([]);
  const [warehouseCapacityData, setWarehouseCapacityData] = useState([]);
  const [stockTrendData, setStockTrendData] = useState([]);
  const [categoryValueData, setCategoryValueData] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const [newInventoryItem, setNewInventoryItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    price: 0,
    reorderPoint: 0,
    warehouse: '',
    supplier: ''
  });

  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    location: '',
    storageCapacity: '',
    productCategories: []
  });

  useEffect(() => {
    // Ensure safe calculations with default values
    const calculateInventoryDistribution = () => {
      if (!inventoryItems.length) return [];
      
      const categoryDistribution = inventoryItems.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
      }, {});
    
      const totalQuantity = Object.values(categoryDistribution).reduce((sum, val) => sum + val, 0);
      
      return Object.entries(categoryDistribution).map(([name, value]) => ({
        name,
        value: value || 0,
        percent: totalQuantity > 0 ? (value / totalQuantity) : 0
      })).filter(item => item.value > 0);
    };
  
    const calculateWarehouseCapacity = () => {
      if (!warehouses.length) return [];
      
      return warehouses.map(warehouse => ({
        name: warehouse.name,
        capacity: Math.max(parseInt(warehouse.storageCapacity) || 100, 1),
        used: Math.min(Math.max((warehouse.stockItems / parseInt(warehouse.storageCapacity || 1)) * 100, 0), 100),
        health: Math.min(Math.max(warehouse.healthScore || 0, 0), 100)
      }));
    };
  
    const calculateStockTrend = () => {
      if (!inventoryItems.length) return [];
      
      const criticalCount = inventoryItems.filter(item => item.quantity <= item.reorderPoint).length;
      const lowCount = inventoryItems.filter(item => 
        item.quantity > item.reorderPoint && item.quantity <= item.reorderPoint * 1.5
      ).length;
      const goodCount = inventoryItems.filter(item => item.quantity > item.reorderPoint * 1.5).length;
      
      const total = criticalCount + lowCount + goodCount;
      
      return total > 0 ? [
        { name: 'Critical', value: criticalCount, percent: criticalCount / total },
        { name: 'Low', value: lowCount, percent: lowCount / total },
        { name: 'Good', value: goodCount, percent: goodCount / total }
      ] : [];
    };
  
    const calculateCategoryValue = () => {
      if (!inventoryItems.length) return [];
      
      const valueByCategory = inventoryItems.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + (item.quantity * item.price);
        return acc;
      }, {});
    
      const totalValue = Object.values(valueByCategory).reduce((sum, val) => sum + val, 0);
      
      return Object.entries(valueByCategory)
        .map(([name, value]) => ({
          name,
          value: value || 0,
          percent: totalValue > 0 ? (value / totalValue) : 0
        }))
        .filter(item => item.value > 0);
    };
  
    // Update state with calculated data
    setInventoryDistributionData(calculateInventoryDistribution());
    setWarehouseCapacityData(calculateWarehouseCapacity());
    setStockTrendData(calculateStockTrend());
    setCategoryValueData(calculateCategoryValue());
  
    // Update system stats
    setSystemStats({
      totalWarehouses: warehouses.length,
      totalInventoryItems: inventoryItems.length,
      stockValueEstimate: inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      criticalStockItems: inventoryItems.filter(item => item.quantity <= item.reorderPoint).length
    });
  }, [inventoryItems, warehouses]);

  // Sorted and filtered inventory items
  const filteredItems = useMemo(() => {
    let result = inventoryItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter !== 'All') {
      result = result.filter(item => item.category === filter);
    }

    return result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [inventoryItems, searchTerm, filter, sortConfig]);

  const handleCreateInventoryItem = () => {
    if (!newInventoryItem.name || !newInventoryItem.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newItem = {
      id: `INV-${inventoryItems.length + 1}`,
      ...newInventoryItem,
      trend: 'stable'
    };

    setInventoryItems([...inventoryItems, newItem]);
    setIsCreateItemOpen(false);
    setNewInventoryItem({
      name: '',
      category: '',
      quantity: 0,
      unit: '',
      price: 0,
      reorderPoint: 0,
      warehouse: '',
      supplier: ''
    });
  };

  const handleEditInventoryItem = () => {
    if (!selectedItem) return;

    const updatedItems = inventoryItems.map(item => 
      item.id === selectedItem.id ? selectedItem : item
    );

    setInventoryItems(updatedItems);
    setEditMode(false);
    setIsCreateItemOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteInventoryItem = (itemId) => {
    const updatedItems = inventoryItems.filter(item => item.id !== itemId);
    setInventoryItems(updatedItems);
  };

  const handleCreateWarehouse = () => {
    if (!newWarehouse.name || !newWarehouse.location) {
      alert('Please fill in required warehouse details');
      return;
    }

    const warehouseToAdd = {
      id: `WH-${warehouses.length + 1}`,
      ...newWarehouse,
      stockItems: 0,
      healthScore: 100,
      status: 'New',
      lastStockUpdate: new Date().toISOString().split('T')[0]
    };

    setWarehouses([...warehouses, warehouseToAdd]);
    setIsWarehouseManagementOpen(false);
    setNewWarehouse({
      name: '',
      location: '',
      storageCapacity: '',
      productCategories: []
    });
  };

  const renderInventoryView = () => {
    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${item.trend === 'increasing' 
                    ? 'bg-green-100 text-green-800' 
                    : item.trend === 'decreasing'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'}
                `}
              >
                {item.trend === 'increasing' ? 'Rising' : item.trend === 'decreasing' ? 'Falling' : 'Stable'}
              </span>
            </div>
            <div className="space-y-2">
              <div><strong>Category:</strong> {item.category}</div>
              <div><strong>Quantity:</strong> {item.quantity} {item.unit}</div>
              <div><strong>Warehouse:</strong> {item.warehouse}</div>
              <div><strong>Supplier:</strong> {item.supplier}</div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.quantity <= item.reorderPoint 
                        ? 'bg-red-600' 
                        : 'bg-green-600'
                    }`} 
                    style={{ width: `${Math.min(100, (item.quantity / item.reorderPoint) * 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {Math.round((item.quantity / item.reorderPoint) * 100)}%
                </span>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  onClick={() => {
                    setSelectedItem({...item});
                    setEditMode(true);
                    setIsCreateItemOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteInventoryItem(item.id)}
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
      <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {['ID', 'Name', 'Category', 'Quantity', 'Warehouse', 'Supplier', 'Actions'].map((header) => (
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
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.quantity} {item.unit}</td>
              <td className="p-3">{item.warehouse}</td>
              <td className="p-3">{item.supplier}</td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedItem({...item});
                    setEditMode(true);
                    setIsCreateItemOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteInventoryItem(item.id)}
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8"
    >
      <div className="container mx-auto mt-12 pt-10">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Warehouse className="mr-4 text-blue-600" />Inventory Management
          </h1>
          <div className="flex space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditMode(false);
                setIsCreateItemOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center"
            >
              <Plus className="mr-2" /> Create Inventory Item
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWarehouseManagementOpen(true)}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center"
            >
              <Warehouse className="mr-2" /> Warehouse Management
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
          {[
            { 
              icon: <Package className="text-blue-600 mr-3" />, 
              title: 'Total Items', 
              value: systemStats.totalInventoryItems 
            },
            { 
              icon: <Warehouse className="text-green-600 mr-3" />, 
              title: 'Warehouses', 
              value: systemStats.totalWarehouses 
            },
            { 
              icon: <TrendingUp className="text-green-600 mr-3" />, 
              title: 'Stock Value', 
              value: `₹${systemStats.stockValueEstimate.toLocaleString()}` 
            },
            { 
              icon: <AlertCircle className="text-red-600 mr-3" />, 
              title: 'Critical Stock', 
              value: systemStats.criticalStockItems 
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                {stat.icon}
                <h3 className="text-xl font-semibold">{stat.title}</h3>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Visualization Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Inventory Distribution by Category */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Package className="mr-2 text-blue-600" /> Inventory Distribution
            </h3>
            {inventoryDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      value, 
                      `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No inventory data available
              </div>
            )}
          </div>

          {/* Warehouse Capacity Utilization */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Warehouse className="mr-2 text-green-600" /> Warehouse Utilization
            </h3>
            {warehouseCapacityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={warehouseCapacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="used" name="Capacity Used %" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="health" name="Health Score" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No warehouse data available
              </div>
            )}
          </div>

          {/* Stock Status Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="mr-2 text-yellow-600" /> Stock Status
            </h3>
            {stockTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stockTrendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stockTrendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      value, 
                      `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No stock data available
              </div>
            )}
          </div>

          {/* Inventory Value by Category */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-green-600" /> Inventory Value
            </h3>
            {categoryValueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryValueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `₹${value.toLocaleString()}`, 
                      `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Value (₹)" fill="#8884d8">
                    {categoryValueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No value data available
              </div>
            )}
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-64"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-full"
            >
              <option value="All">All Categories</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Medical">Medical</option>
              <option value="Seeds">Seeds</option>
              <option value="FMCG">FMCG</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {renderInventoryView()}

        {/* Create Inventory Item Modal */}
        <AnimatePresence>
          {isCreateItemOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-8 w-96 relative shadow-lg"
              >
                <button 
                  onClick={() => {
                    setIsCreateItemOpen(false);
                    setEditMode(false);
                    setSelectedItem(null);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">
                  {editMode ? 'Edit Inventory Item' : 'Create New Inventory Item'}
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Enter item name (e.g., Wheat Seeds, Medical Kit)"
                    value={editMode ? selectedItem?.name || '' : newInventoryItem.name}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, name: e.target.value})
                      : setNewInventoryItem({...newInventoryItem, name: e.target.value})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <select 
                    value={editMode ? selectedItem?.category || '' : newInventoryItem.category}
                    onChange={(e) => editMode
                      ? setSelectedItem({...selectedItem, category: e.target.value})
                      : setNewInventoryItem({...newInventoryItem, category: e.target.value})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select a Category</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Medical">Medical</option>
                    <option value="Seeds">Seeds</option>
                    <option value="FMCG">FMCG</option>
                  </select>
                  <input 
                    type="number"
                    placeholder="Enter quantity (e.g., 100, 500, 1000)"
                    value={editMode ? selectedItem?.quantity || 0 : newInventoryItem.quantity}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, quantity: Number(e.target.value)})
                      : setNewInventoryItem({...newInventoryItem, quantity: Number(e.target.value)})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Specify unit (e.g., packets, units, kg, liters)"
                    value={editMode ? selectedItem?.unit || '' : newInventoryItem.unit}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, unit: e.target.value})
                      : setNewInventoryItem({...newInventoryItem, unit: e.target.value})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="number"
                    placeholder="Enter price per unit (e.g., 50, 100, 250)"
                    value={editMode ? selectedItem?.price || 0 : newInventoryItem.price}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, price: Number(e.target.value)})
                      : setNewInventoryItem({...newInventoryItem, price: Number(e.target.value)})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="number"
                    placeholder="Enter reorder point (e.g., 20, 50, 100)"
                    value={editMode ? selectedItem?.reorderPoint || 0 : newInventoryItem.reorderPoint}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, reorderPoint: Number(e.target.value)})
                      : setNewInventoryItem({...newInventoryItem, reorderPoint: Number(e.target.value)})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <select 
                    value={editMode ? selectedItem?.warehouse || '' : newInventoryItem.warehouse}
                    onChange={(e) => editMode
                      ? setSelectedItem({...selectedItem, warehouse: e.target.value})
                      : setNewInventoryItem({...newInventoryItem, warehouse: e.target.value})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Warehouse Location</option>
                    {warehouses.map(wh => (
                      <option key={wh.id} value={wh.id}>{wh.name}</option>
                    ))}
                  </select>
                  <input 
                    type="text"
                    placeholder="Enter supplier name (e.g., ABC Suppliers, XYZ Distributors)"
                    value={editMode ? selectedItem?.supplier || '' : newInventoryItem.supplier}
                    onChange={(e) => editMode 
                      ? setSelectedItem({...selectedItem, supplier: e.target.value})
                      : setNewInventoryItem({...newInventoryItem, supplier: e.target.value})
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    onClick={() => {
                      setIsCreateItemOpen(false);
                      setEditMode(false);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 border rounded-full"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={editMode ? handleEditInventoryItem : handleCreateInventoryItem}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                  >
                    {editMode ? 'Update Item' : 'Create Item'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warehouse Management Modal */}
        <AnimatePresence>
          {isWarehouseManagementOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-8 w-96 relative"
              >
                <button 
                  onClick={() => setIsWarehouseManagementOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">Add New Warehouse</h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Warehouse Name"
                    value={newWarehouse.name}
                    onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Location"
                    value={newWarehouse.location}
                    onChange={(e) => setNewWarehouse({...newWarehouse, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Storage Capacity (sq m)"
                    value={newWarehouse.storageCapacity}
                    onChange={(e) => setNewWarehouse({...newWarehouse, storageCapacity: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <div>
                    <label className="block mb-2">Product Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {['Agricultural', 'Medical', 'Seeds', 'FMCG'].map(category => (
                        <label key={category} className="inline-flex items-center">
                          <input 
                            type="checkbox"
                            value={category}
                            checked={newWarehouse.productCategories.includes(category)}
                            onChange={(e) => {
                              const updatedCategories = e.target.checked 
                                ? [...newWarehouse.productCategories, category]
                                : newWarehouse.productCategories.filter(c => c !== category);
                              setNewWarehouse({...newWarehouse, productCategories: updatedCategories});
                            }}
                            className="mr-2"
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    onClick={() => setIsWarehouseManagementOpen(false)}
                    className="px-4 py-2 border rounded-full"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateWarehouse}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                  >
                    Create Warehouse
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default InventoryOptimization;