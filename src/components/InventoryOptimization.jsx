// InventoryOptimization.js
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Warehouse, Package, Truck, TrendingUp, TrendingDown, RefreshCw, 
  Search, Filter, List, Grid, ChevronDown, ChevronUp, Plus, Edit, 
  Trash2, Save, AlertCircle, ShieldCheck, X, Users, Globe, Heart, 
  Shield, Leaf, Droplet, Activity, Zap, Sun, CloudRain, Thermometer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { useAuth } from '../context/AuthContext';

// Local storage keys
const STORAGE_KEYS = {
  WAREHOUSES: 'ruralInventory_warehouses',
  INVENTORY_ITEMS: 'ruralInventory_items'
};

// Initial mock data
const INITIAL_WAREHOUSES = [
  {
    id: 'WH-001',
    name: 'Rural Karnataka Agricultural Hub',
    location: 'Belgaum, Karnataka',
    stockItems: 42,
    storageCapacity: '500 sq m',
    healthScore: 92,
    status: 'Optimal',
    lastStockUpdate: '2024-03-20',
    productCategories: ['Agricultural', 'Medical', 'FMCG'],
    ruralImpact: {
      villagesServed: 28,
      farmersSupported: 1250,
      lastMileDelivery: 'Bicycle/Animal Transport',
      avgDeliveryTime: '2 days',
      climateResilient: true,
      solarPowered: true
    }
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
    productCategories: ['Agricultural', 'Seeds', 'Fertilizers'],
    ruralImpact: {
      villagesServed: 18,
      farmersSupported: 850,
      lastMileDelivery: 'Motorcycle/Tractor',
      avgDeliveryTime: '3 days',
      climateResilient: false,
      solarPowered: false
    }
  }
];

const INITIAL_INVENTORY_ITEMS = [
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
    trend: 'increasing',
    ruralBenefits: {
      yieldIncrease: '30-40%',
      waterSavings: '50% less water needed',
      climateAdaptation: 'Drought resistant',
      farmerIncomeImpact: '+₹15,000/acre',
      shelfLife: '18 months'
    },
    demandSeasonality: ['Monsoon', 'Pre-Monsoon']
  },
  {
    id: 'INV-002',
    name: 'Essential Medical Supplies Kit',
    category: 'Medical',
    quantity: 750,
    unit: 'units',
    price: 150,
    reorderPoint: 250,
    warehouse: 'WH-002',
    supplier: 'HealthCare Direct',
    trend: 'stable',
    ruralBenefits: {
      healthImpact: 'Reduces infant mortality by 15%',
      diseasePrevention: 'Malaria, Diarrhea',
      lifespanIncrease: 'Estimated +5 years',
      accessibility: 'Reaches remote clinics',
      shelfLife: '24 months'
    },
    demandSeasonality: ['Year-round', 'Monsoon']
  },
  {
    id: 'INV-003',
    name: 'Solar-Powered Irrigation Pump',
    category: 'Agricultural',
    quantity: 120,
    unit: 'units',
    price: 12500,
    reorderPoint: 30,
    warehouse: 'WH-001',
    supplier: 'SolarTech Solutions',
    trend: 'increasing',
    ruralBenefits: {
      energySavings: '100% diesel replacement',
      costRecovery: '1.5 years',
      co2Reduction: '5 tons/year',
      farmerIncomeImpact: '+₹50,000/acre',
      waterConservation: '40% less usage'
    },
    demandSeasonality: ['Summer', 'Dry Season']
  }
];

function InventoryOptimization() {
  const { user } = useAuth();
  
  // Load data from localStorage or use initial mock data
  const [warehouses, setWarehouses] = useState(() => {
    const savedWarehouses = localStorage.getItem(STORAGE_KEYS.WAREHOUSES);
    return savedWarehouses ? JSON.parse(savedWarehouses) : INITIAL_WAREHOUSES;
  });

  const [inventoryItems, setInventoryItems] = useState(() => {
    const savedItems = localStorage.getItem(STORAGE_KEYS.INVENTORY_ITEMS);
    return savedItems ? JSON.parse(savedItems) : INITIAL_INVENTORY_ITEMS;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WAREHOUSES, JSON.stringify(warehouses));
    localStorage.setItem(STORAGE_KEYS.INVENTORY_ITEMS, JSON.stringify(inventoryItems));
  }, [warehouses, inventoryItems]);

  const [systemStats, setSystemStats] = useState({
    totalWarehouses: 0,
    totalInventoryItems: 0,
    stockValueEstimate: 0,
    criticalStockItems: 0,
    ruralImpact: {
      totalVillagesServed: 0,
      totalFarmersSupported: 0,
      climateSmartWarehouses: 0
    }
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
  const [ruralImpactData, setRuralImpactData] = useState([]);
  const [seasonalDemandData, setSeasonalDemandData] = useState([]);
  const [farmerIncomeImpactData, setFarmerIncomeImpactData] = useState([]);

  // Enhanced color palette for visualizations
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const RURAL_COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722'];

  const [newInventoryItem, setNewInventoryItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    price: 0,
    reorderPoint: 0,
    warehouse: '',
    supplier: '',
    ruralBenefits: {
      yieldIncrease: '',
      waterSavings: '',
      climateAdaptation: '',
      farmerIncomeImpact: '',
      shelfLife: ''
    },
    demandSeasonality: []
  });

  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    location: '',
    storageCapacity: '',
    productCategories: [],
    ruralImpact: {
      villagesServed: 0,
      farmersSupported: 0,
      lastMileDelivery: '',
      avgDeliveryTime: '',
      climateResilient: false,
      solarPowered: false
    }
  });

  useEffect(() => {
    // Calculate all data visualizations
    const calculateInventoryDistribution = () => {
      const categoryDistribution = inventoryItems.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
      }, {});
    
      const totalQuantity = Object.values(categoryDistribution).reduce((sum, val) => sum + val, 0);
      
      return Object.entries(categoryDistribution).map(([name, value]) => ({
        name,
        value,
        percent: totalQuantity > 0 ? (value / totalQuantity) : 0
      })).filter(item => item.value > 0);
    };
  
    const calculateWarehouseCapacity = () => {
      return warehouses.map(warehouse => ({
        name: warehouse.name,
        capacity: parseInt(warehouse.storageCapacity) || 100,
        used: Math.min((warehouse.stockItems / parseInt(warehouse.storageCapacity || 1)) * 100),
        health: Math.min(warehouse.healthScore || 0, 100),
        climateResilient: warehouse.ruralImpact.climateResilient ? 100 : 0,
        villagesServed: warehouse.ruralImpact.villagesServed
      }));
    };
  
    const calculateStockTrend = () => {
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
      const valueByCategory = inventoryItems.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + (item.quantity * item.price);
        return acc;
      }, {});
    
      const totalValue = Object.values(valueByCategory).reduce((sum, val) => sum + val, 0);
      
      return Object.entries(valueByCategory)
        .map(([name, value]) => ({
          name,
          value,
          percent: totalValue > 0 ? (value / totalValue) : 0
        }))
        .filter(item => item.value > 0);
    };

    const calculateRuralImpact = () => {
      return warehouses.map(warehouse => ({
        name: warehouse.name,
        villages: warehouse.ruralImpact.villagesServed,
        farmers: warehouse.ruralImpact.farmersSupported,
        climateSmart: warehouse.ruralImpact.climateResilient ? 1 : 0
      }));
    };

    const calculateSeasonalDemand = () => {
      const seasons = ['Monsoon', 'Pre-Monsoon', 'Summer', 'Winter', 'Dry Season'];
      return seasons.map(season => {
        const itemsInSeason = inventoryItems.filter(item => 
          item.demandSeasonality.includes(season)
        ).length;
        return {
          season,
          items: itemsInSeason,
          percentage: (itemsInSeason / inventoryItems.length) * 100
        };
      });
    };

    const calculateFarmerIncomeImpact = () => {
      return inventoryItems
        .filter(item => item.ruralBenefits.farmerIncomeImpact)
        .map(item => {
          const impactValue = parseInt(item.ruralBenefits.farmerIncomeImpact.replace(/[^\d]/g, '') || 0);
          return {
            name: item.name,
            impact: impactValue,
            quantity: item.quantity,
            totalImpact: impactValue * item.quantity
          };
        })
        .sort((a, b) => b.totalImpact - a.totalImpact)
        .slice(0, 5);
    };

    // Update all data states
    setInventoryDistributionData(calculateInventoryDistribution());
    setWarehouseCapacityData(calculateWarehouseCapacity());
    setStockTrendData(calculateStockTrend());
    setCategoryValueData(calculateCategoryValue());
    setRuralImpactData(calculateRuralImpact());
    setSeasonalDemandData(calculateSeasonalDemand());
    setFarmerIncomeImpactData(calculateFarmerIncomeImpact());
  
    // Update system stats
    const totalVillages = warehouses.reduce((sum, wh) => sum + (wh.ruralImpact.villagesServed || 0), 0);
    const totalFarmers = warehouses.reduce((sum, wh) => sum + (wh.ruralImpact.farmersSupported || 0), 0);
    const climateSmartWHs = warehouses.filter(wh => wh.ruralImpact.climateResilient).length;

    setSystemStats({
      totalWarehouses: warehouses.length,
      totalInventoryItems: inventoryItems.length,
      stockValueEstimate: inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      criticalStockItems: inventoryItems.filter(item => item.quantity <= item.reorderPoint).length,
      ruralImpact: {
        totalVillagesServed: totalVillages,
        totalFarmersSupported: totalFarmers,
        climateSmartWarehouses: climateSmartWHs
      }
    });
  }, [inventoryItems, warehouses]);

  // Sorted and filtered inventory items
  const filteredItems = useMemo(() => {
    let result = inventoryItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.ruralBenefits && Object.values(item.ruralBenefits).join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
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
      id: `INV-${Date.now().toString().slice(-6)}`,
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
      supplier: '',
      ruralBenefits: {
        yieldIncrease: '',
        waterSavings: '',
        climateAdaptation: '',
        farmerIncomeImpact: '',
        shelfLife: ''
      },
      demandSeasonality: []
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
      id: `WH-${Date.now().toString().slice(-6)}`,
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
      productCategories: [],
      ruralImpact: {
        villagesServed: 0,
        farmersSupported: 0,
        lastMileDelivery: '',
        avgDeliveryTime: '',
        climateResilient: false,
        solarPowered: false
      }
    });
  };

  const renderInventoryView = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Inventory Items Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'No items match your search criteria' : 'Your inventory is currently empty'}
          </p>
          <button
            onClick={() => {
              setEditMode(false);
              setIsCreateItemOpen(true);
              setSearchTerm('');
              setFilter('All');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center mx-auto"
          >
            <Plus className="mr-2" /> Add New Item
          </button>
        </div>
      );
    }

    return viewMode === 'grid' ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3>
              <span 
                className={`
                  px-2 sm:px-3 py-1 rounded-full text-xs
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
            
            <div className="space-y-2 text-sm sm:text-base">
              <div><strong>Category:</strong> {item.category}</div>
              <div><strong>Quantity:</strong> {item.quantity} {item.unit}</div>
              <div><strong>Warehouse:</strong> {item.warehouse}</div>
              <div><strong>Supplier:</strong> {item.supplier}</div>
              
              {/* Stock Level Indicator */}
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Stock Level</span>
                  <span>{Math.round((item.quantity / item.reorderPoint) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.quantity <= item.reorderPoint 
                        ? 'bg-red-600' 
                        : item.quantity <= item.reorderPoint * 1.5
                          ? 'bg-yellow-500'
                          : 'bg-green-600'
                    }`} 
                    style={{ width: `${Math.min(100, (item.quantity / (item.reorderPoint * 2)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Rural Impact Highlights */}
              {item.ruralBenefits && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-sm text-green-700 flex items-center mb-2">
                    <Leaf className="mr-1" size={14} /> Rural Impact
                  </h4>
                  <ul className="text-xs space-y-1">
                    {item.ruralBenefits.yieldIncrease && (
                      <li className="flex items-start">
                        <TrendingUp className="mr-1 text-green-600 mt-0.5" size={12} />
                        <span>Yield: {item.ruralBenefits.yieldIncrease}</span>
                      </li>
                    )}
                    {item.ruralBenefits.waterSavings && (
                      <li className="flex items-start">
                        <Droplet className="mr-1 text-blue-600 mt-0.5" size={12} />
                        <span>Water: {item.ruralBenefits.waterSavings}</span>
                      </li>
                    )}
                    {item.ruralBenefits.farmerIncomeImpact && (
                      <li className="flex items-start">
                        <Zap className="mr-1 text-yellow-600 mt-0.5" size={12} />
                        <span>Income: {item.ruralBenefits.farmerIncomeImpact}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {/* Demand Seasonality */}
              {item.demandSeasonality && item.demandSeasonality.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h4 className="font-medium text-sm text-blue-700 flex items-center mb-1">
                    <CloudRain className="mr-1" size={14} /> Seasonal Demand
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {item.demandSeasonality.map(season => (
                      <span key={season} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
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
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Name', 'Category', 'Quantity', 'Warehouse', 'Supplier', 'Rural Impact', 'Actions'].map((header) => (
                <th 
                  key={header} 
                  className="p-3 text-left text-sm sm:text-base cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    const isAsc = sortConfig.direction === 'asc';
                    setSortConfig({
                      key: header.toLowerCase().replace(' ', ''),
                      direction: isAsc ? 'desc' : 'asc'
                    });
                  }}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === header.toLowerCase().replace(' ', '') && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 text-sm sm:text-base">{item.id}</td>
                <td className="p-3 font-medium text-sm sm:text-base">{item.name}</td>
                <td className="p-3 text-sm sm:text-base">{item.category}</td>
                <td className="p-3 text-sm sm:text-base">{item.quantity} {item.unit}</td>
                <td className="p-3 text-sm sm:text-base">{item.warehouse}</td>
                <td className="p-3 text-sm sm:text-base">{item.supplier}</td>
                <td className="p-3">
                  {item.ruralBenefits?.farmerIncomeImpact && (
                    <div className="flex items-center text-green-700 text-sm sm:text-base">
                      <Zap className="mr-1" size={14} />
                      <span>{item.ruralBenefits.farmerIncomeImpact}</span>
                    </div>
                  )}
                </td>
                <td className="p-3 flex space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedItem({...item});
                      setEditMode(true);
                      setIsCreateItemOpen(true);
                    }}
                    className="text-blue-600 hover:bg-blue-50 p-1 sm:p-2 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteInventoryItem(item.id)}
                    className="text-red-600 hover:bg-red-50 p-1 sm:p-2 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6"
    >
      <div className="max-w-7xl mx-auto mt-12 pt-10">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
              <Warehouse className="mr-3 text-blue-600" /> 
              <span>Rural Inventory Optimization</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Bridging profit with social impact through intelligent inventory management
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditMode(false);
                setIsCreateItemOpen(true);
              }}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center text-xs sm:text-sm md:text-base"
            >
              <Plus className="mr-1 sm:mr-2" /> Add Inventory
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWarehouseManagementOpen(true)}
              className="border border-blue-600 text-blue-600 px-3 sm:px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center text-xs sm:text-sm md:text-base"
            >
              <Warehouse className="mr-1 sm:mr-2" /> Manage Warehouses
            </motion.button>
          </div>
        </header>

        {/* Key Benefits Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-200"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
            Why Our System Beats Traditional Rural Inventory Management
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Activity className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Real-Time Visibility",
                description: "Traditional methods rely on manual counts. Our system provides live inventory tracking across all rural hubs.",
                impact: "Farmers get critical supplies when needed"
              },
              {
                icon: <Thermometer className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Climate-Adaptive",
                description: "Seasonal demand forecasting prevents waste of perishable goods and ensures availability.",
                impact: "Reduces agricultural losses by 30-40%"
              },
              {
                icon: <Users className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Community-Centric",
                description: "Tracks impact metrics like farmers served and villages reached.",
                impact: "Demonstrates CSR value to stakeholders"
              },
              {
                icon: <RefreshCw className="text-yellow-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Automated Replenishment",
                description: "Smart algorithms account for rural logistics delays, triggering orders automatically.",
                impact: "Eliminates 80% of emergency shipments"
              },
              {
                icon: <Globe className="text-red-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Last-Mile Optimization",
                description: "Integrates with rural delivery networks to minimize transportation costs.",
                impact: "Cuts delivery costs by 45%"
              },
              {
                icon: <Heart className="text-pink-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />,
                title: "Social Impact Dashboard",
                description: "Quantifies benefits like farmer income increases and water savings.",
                impact: "Attracts impact investors and grants"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{feature.description}</p>
                  <div className="text-xs sm:text-sm bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full">
                    {feature.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Overview Cards */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8"
        >
          {[
            { 
              icon: <Package className="text-blue-600 mr-1 sm:mr-2" size={16} />, 
              title: 'Items', 
              value: systemStats.totalInventoryItems,
              trend: '+12%'
            },
            { 
              icon: <Warehouse className="text-green-600 mr-1 sm:mr-2" size={16} />, 
              title: 'Warehouses', 
              value: systemStats.totalWarehouses,
              trend: '+2 new'
            },
            { 
              icon: <TrendingUp className="text-purple-600 mr-1 sm:mr-2" size={16} />, 
              title: 'Stock Value', 
              value: `₹${systemStats.stockValueEstimate.toLocaleString()}`,
              trend: '↑15%'
            },
            { 
              icon: <Users className="text-orange-600 mr-1 sm:mr-2" size={16} />, 
              title: 'Farmers', 
              value: systemStats.ruralImpact.totalFarmersSupported.toLocaleString(),
              trend: '↑24%'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-1 sm:mb-3">
                <div className="flex items-center">
                  {stat.icon}
                  <h3 className="text-xs sm:text-sm font-semibold ml-1 sm:ml-2">{stat.title}</h3>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {/* Inventory Distribution by Category */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <Package className="mr-2 text-blue-600" size={18} /> Inventory Distribution
            </h3>
            {inventoryDistributionData.length > 0 ? (
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={70}
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
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                No inventory data available
              </div>
            )}
          </div>

          {/* Rural Impact Visualization */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <Users className="mr-2 text-green-600" size={18} /> Rural Outreach
            </h3>
            {ruralImpactData.length > 0 ? (
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ruralImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="villages" name="Villages" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="farmers" name="Farmers" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                No rural impact data available
              </div>
            )}
          </div>

          {/* Farmer Income Impact */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <Zap className="mr-2 text-yellow-600" size={18} /> Farmer Income Impact
            </h3>
            {farmerIncomeImpactData.length > 0 ? (
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmerIncomeImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, "Total Impact"]}
                    />
                    <Legend />
                    <Bar dataKey="totalImpact" name="Total Impact (₹)" fill="#FFBB28">
                      {farmerIncomeImpactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={RURAL_COLORS[index % RURAL_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                No impact data available
              </div>
            )}
          </div>

          {/* Seasonal Demand Patterns */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <CloudRain className="mr-2 text-blue-600" size={18} /> Seasonal Demand
            </h3>
            {seasonalDemandData.length > 0 ? (
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={seasonalDemandData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="season" />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Radar name="Items in Demand" dataKey="items" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                No seasonal data available
              </div>
            )}
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48 md:w-64">
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-full text-sm sm:text-base"
              />
              <Search className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 border rounded-full w-full sm:w-auto text-sm sm:text-base"
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
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <List size={18} />
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl relative shadow-lg max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => {
                    setIsCreateItemOpen(false);
                    setEditMode(false);
                    setSelectedItem(null);
                  }}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  {editMode ? 'Edit Inventory Item' : 'Create New Inventory Item'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-medium border-b pb-2">Basic Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
                      <input 
                        type="text"
                        placeholder="Enter item name"
                        value={editMode ? selectedItem?.name || '' : newInventoryItem.name}
                        onChange={(e) => editMode 
                          ? setSelectedItem({...selectedItem, name: e.target.value})
                          : setNewInventoryItem({...newInventoryItem, name: e.target.value})
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                      <select 
                        value={editMode ? selectedItem?.category || '' : newInventoryItem.category}
                        onChange={(e) => editMode
                          ? setSelectedItem({...selectedItem, category: e.target.value})
                          : setNewInventoryItem({...newInventoryItem, category: e.target.value})
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      >
                        <option value="">Select a Category</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Medical">Medical</option>
                        <option value="Seeds">Seeds</option>
                        <option value="FMCG">FMCG</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                        <input 
                          type="number"
                          placeholder="Enter quantity"
                          value={editMode ? selectedItem?.quantity || 0 : newInventoryItem.quantity}
                          onChange={(e) => editMode 
                            ? setSelectedItem({...selectedItem, quantity: Number(e.target.value)})
                            : setNewInventoryItem({...newInventoryItem, quantity: Number(e.target.value)})
                          }
                          className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit*</label>
                        <input 
                          type="text"
                          placeholder="Specify unit"
                          value={editMode ? selectedItem?.unit || '' : newInventoryItem.unit}
                          onChange={(e) => editMode 
                            ? setSelectedItem({...selectedItem, unit: e.target.value})
                            : setNewInventoryItem({...newInventoryItem, unit: e.target.value})
                          }
                          className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹)*</label>
                        <input 
                          type="number"
                          placeholder="Enter price"
                          value={editMode ? selectedItem?.price || 0 : newInventoryItem.price}
                          onChange={(e) => editMode 
                            ? setSelectedItem({...selectedItem, price: Number(e.target.value)})
                            : setNewInventoryItem({...newInventoryItem, price: Number(e.target.value)})
                          }
                          className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point*</label>
                        <input 
                          type="number"
                          placeholder="Reorder threshold"
                          value={editMode ? selectedItem?.reorderPoint || 0 : newInventoryItem.reorderPoint}
                          onChange={(e) => editMode 
                            ? setSelectedItem({...selectedItem, reorderPoint: Number(e.target.value)})
                            : setNewInventoryItem({...newInventoryItem, reorderPoint: Number(e.target.value)})
                          }
                          className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse*</label>
                      <select 
                        value={editMode ? selectedItem?.warehouse || '' : newInventoryItem.warehouse}
                        onChange={(e) => editMode
                          ? setSelectedItem({...selectedItem, warehouse: e.target.value})
                          : setNewInventoryItem({...newInventoryItem, warehouse: e.target.value})
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      >
                        <option value="">Select Warehouse Location</option>
                        {warehouses.map(wh => (
                          <option key={wh.id} value={wh.id}>{wh.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier*</label>
                      <input 
                        type="text"
                        placeholder="Enter supplier name"
                        value={editMode ? selectedItem?.supplier || '' : newInventoryItem.supplier}
                        onChange={(e) => editMode 
                          ? setSelectedItem({...selectedItem, supplier: e.target.value})
                          : setNewInventoryItem({...newInventoryItem, supplier: e.target.value})
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-medium border-b pb-2">Rural Impact Metrics</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Yield Increase</label>
                      <input 
                        type="text"
                        placeholder="Estimated yield improvement"
                        value={editMode ? selectedItem?.ruralBenefits?.yieldIncrease || '' : newInventoryItem.ruralBenefits.yieldIncrease}
                        onChange={(e) => editMode 
                          ? setSelectedItem({
                              ...selectedItem, 
                              ruralBenefits: {
                                ...selectedItem.ruralBenefits,
                                yieldIncrease: e.target.value
                              }
                            })
                          : setNewInventoryItem({
                              ...newInventoryItem, 
                              ruralBenefits: {
                                ...newInventoryItem.ruralBenefits,
                                yieldIncrease: e.target.value
                              }
                            })
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Water Savings</label>
                      <input 
                        type="text"
                        placeholder="Water conservation impact"
                        value={editMode ? selectedItem?.ruralBenefits?.waterSavings || '' : newInventoryItem.ruralBenefits.waterSavings}
                        onChange={(e) => editMode 
                          ? setSelectedItem({
                              ...selectedItem, 
                              ruralBenefits: {
                                ...selectedItem.ruralBenefits,
                                waterSavings: e.target.value
                              }
                            })
                          : setNewInventoryItem({
                              ...newInventoryItem, 
                              ruralBenefits: {
                                ...newInventoryItem.ruralBenefits,
                                waterSavings: e.target.value
                              }
                            })
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Climate Adaptation</label>
                      <input 
                        type="text"
                        placeholder="Climate resilience features"
                        value={editMode ? selectedItem?.ruralBenefits?.climateAdaptation || '' : newInventoryItem.ruralBenefits.climateAdaptation}
                        onChange={(e) => editMode 
                          ? setSelectedItem({
                              ...selectedItem, 
                              ruralBenefits: {
                                ...selectedItem.ruralBenefits,
                                climateAdaptation: e.target.value
                              }
                            })
                          : setNewInventoryItem({
                              ...newInventoryItem, 
                              ruralBenefits: {
                                ...newInventoryItem.ruralBenefits,
                                climateAdaptation: e.target.value
                              }
                            })
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Income Impact</label>
                      <input 
                        type="text"
                        placeholder="Estimated income increase"
                        value={editMode ? selectedItem?.ruralBenefits?.farmerIncomeImpact || '' : newInventoryItem.ruralBenefits.farmerIncomeImpact}
                        onChange={(e) => editMode 
                          ? setSelectedItem({
                              ...selectedItem, 
                              ruralBenefits: {
                                ...selectedItem.ruralBenefits,
                                farmerIncomeImpact: e.target.value
                              }
                            })
                          : setNewInventoryItem({
                              ...newInventoryItem, 
                              ruralBenefits: {
                                ...newInventoryItem.ruralBenefits,
                                farmerIncomeImpact: e.target.value
                              }
                            })
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life</label>
                      <input 
                        type="text"
                        placeholder="Product shelf life"
                        value={editMode ? selectedItem?.ruralBenefits?.shelfLife || '' : newInventoryItem.ruralBenefits.shelfLife}
                        onChange={(e) => editMode 
                          ? setSelectedItem({
                              ...selectedItem, 
                              ruralBenefits: {
                                ...selectedItem.ruralBenefits,
                                shelfLife: e.target.value
                              }
                            })
                          : setNewInventoryItem({
                              ...newInventoryItem, 
                              ruralBenefits: {
                                ...newInventoryItem.ruralBenefits,
                                shelfLife: e.target.value
                              }
                            })
                        }
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seasonal Demand</label>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {['Monsoon', 'Pre-Monsoon', 'Summer', 'Winter', 'Dry Season'].map(season => (
                          <label key={season} className="inline-flex items-center text-xs sm:text-sm">
                            <input 
                              type="checkbox"
                              value={season}
                              checked={
                                editMode 
                                  ? selectedItem?.demandSeasonality?.includes(season) || false
                                  : newInventoryItem.demandSeasonality.includes(season)
                              }
                              onChange={(e) => {
                                const updatedSeasons = e.target.checked 
                                  ? [...(editMode ? selectedItem.demandSeasonality || [] : newInventoryItem.demandSeasonality), season]
                                  : (editMode ? selectedItem.demandSeasonality || [] : newInventoryItem.demandSeasonality).filter(s => s !== season);
                                
                                if (editMode) {
                                  setSelectedItem({
                                    ...selectedItem,
                                    demandSeasonality: updatedSeasons
                                  });
                                } else {
                                  setNewInventoryItem({
                                    ...newInventoryItem,
                                    demandSeasonality: updatedSeasons
                                  });
                                }
                              }}
                              className="mr-1"
                            />
                            {season}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 sm:space-x-4 mt-4 sm:mt-6">
                  <button 
                    onClick={() => {
                      setIsCreateItemOpen(false);
                      setEditMode(false);
                      setSelectedItem(null);
                    }}
                    className="px-3 sm:px-4 py-2 border rounded-full text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={editMode ? handleEditInventoryItem : handleCreateInventoryItem}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base"
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl relative shadow-lg max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setIsWarehouseManagementOpen(false)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Add New Rural Warehouse</h2>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-medium border-b pb-2">Basic Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse Name*</label>
                      <input 
                        type="text"
                        placeholder="Warehouse Name"
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                      <input 
                        type="text"
                        placeholder="Village/District, State"
                        value={newWarehouse.location}
                        onChange={(e) => setNewWarehouse({...newWarehouse, location: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Storage Capacity*</label>
                      <input 
                        type="text"
                        placeholder="Capacity in sq m"
                        value={newWarehouse.storageCapacity}
                        onChange={(e) => setNewWarehouse({...newWarehouse, storageCapacity: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {['Agricultural', 'Medical', 'Seeds', 'FMCG'].map(category => (
                          <label key={category} className="inline-flex items-center text-xs sm:text-sm">
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
                              className="mr-1"
                            />
                            {category}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-medium border-b pb-2">Rural Impact Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Villages Served*</label>
                      <input 
                        type="number"
                        placeholder="Number of villages served"
                        value={newWarehouse.ruralImpact.villagesServed}
                        onChange={(e) => setNewWarehouse({
                          ...newWarehouse, 
                          ruralImpact: {
                            ...newWarehouse.ruralImpact,
                            villagesServed: Number(e.target.value)
                          }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farmers Supported*</label>
                      <input 
                        type="number"
                        placeholder="Estimated farmers supported"
                        value={newWarehouse.ruralImpact.farmersSupported}
                        onChange={(e) => setNewWarehouse({
                          ...newWarehouse, 
                          ruralImpact: {
                            ...newWarehouse.ruralImpact,
                            farmersSupported: Number(e.target.value)
                          }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last-Mile Delivery Method*</label>
                      <select 
                        value={newWarehouse.ruralImpact.lastMileDelivery}
                        onChange={(e) => setNewWarehouse({
                          ...newWarehouse, 
                          ruralImpact: {
                            ...newWarehouse.ruralImpact,
                            lastMileDelivery: e.target.value
                          }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      >
                        <option value="">Select Delivery Method</option>
                        <option value="Bicycle/Animal Transport">Bicycle/Animal Transport</option>
                        <option value="Motorcycle/Tractor">Motorcycle/Tractor</option>
                        <option value="Small Truck">Small Truck</option>
                        <option value="Local Partners">Local Partners</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Average Delivery Time*</label>
                      <input 
                        type="text"
                        placeholder="Average delivery time"
                        value={newWarehouse.ruralImpact.avgDeliveryTime}
                        onChange={(e) => setNewWarehouse({
                          ...newWarehouse, 
                          ruralImpact: {
                            ...newWarehouse.ruralImpact,
                            avgDeliveryTime: e.target.value
                          }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <label className="flex items-center text-xs sm:text-sm">
                        <input 
                          type="checkbox"
                          checked={newWarehouse.ruralImpact.climateResilient}
                          onChange={(e) => setNewWarehouse({
                            ...newWarehouse, 
                            ruralImpact: {
                              ...newWarehouse.ruralImpact,
                              climateResilient: e.target.checked
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Climate Resilient Design</span>
                      </label>
                      
                      <label className="flex items-center text-xs sm:text-sm">
                        <input 
                          type="checkbox"
                          checked={newWarehouse.ruralImpact.solarPowered}
                          onChange={(e) => setNewWarehouse({
                            ...newWarehouse, 
                            ruralImpact: {
                              ...newWarehouse.ruralImpact,
                              solarPowered: e.target.checked
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Solar Powered</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 sm:space-x-4 mt-4 sm:mt-6">
                  <button 
                    onClick={() => setIsWarehouseManagementOpen(false)}
                    className="px-3 sm:px-4 py-2 border rounded-full text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateWarehouse}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base"
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