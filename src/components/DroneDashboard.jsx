import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Clock, Package, Battery, Navigation, Layers,
  Cloud, Map, BarChart2, Home, AlertCircle, Plus, Plane,
  Edit, Trash2, Save, Settings, ShieldCheck, RefreshCw,
  List, Grid, Filter, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { MapIcon } from "lucide-react";

function DroneDashboard() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [filter, setFilter] = useState('All');
  const [systemStats, setSystemStats] = useState({
    totalDeliveries: 0,
    completedDeliveries: 0,
    averageDeliveryTime: 0,
    carbonSaved: 0
  });
  const [isCreateDeliveryOpen, setIsCreateDeliveryOpen] = useState(false);
  const [isFleetManagementOpen, setIsFleetManagementOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [droneEditMode, setDroneEditMode] = useState(null);
  const [deliveryTypeData, setDeliveryTypeData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [droneHealthData, setDroneHealthData] = useState([]);

  const [newDelivery, setNewDelivery] = useState({
    origin: '',
    destination: '',
    packages: 0,
    type: '',
    priority: 'Medium'
  });

  const [drones, setDrones] = useState([
    {
      id: 'GL-X250',
      model: 'Advanced Rural Delivery',
      maxPayload: '15 kg',
      status: 'Active',
      batteryLife: '85%',
      lastMaintenance: '2024-03-15',
      location: 'Maharashtra Region',
      assignedRoute: 'Medical Supply Chain',
      healthScore: 92
    },
    {
      id: 'GL-X300',
      model: 'Agricultural Supply Drone',
      maxPayload: '20 kg',
      status: 'Maintenance',
      batteryLife: '45%',
      lastMaintenance: '2024-02-28',
      location: 'Karnataka Region',
      assignedRoute: 'Agricultural Supply Line',
      healthScore: 68
    }
  ]);

  const [droneDeliveries, setDroneDeliveries] = useState([
    {
      id: 'DR-001',
      origin: 'Rural Warehouse, Maharashtra',
      destination: 'Village Health Center, Ahmednagar',
      status: 'In Transit',
      eta: '45 mins',
      packages: 12,
      batteryLevel: 85,
      distance: '42 km',
      type: 'Medical Supplies',
      priority: 'High',
      drone: {
        model: 'GL-X250',
        maxPayload: '15 kg',
        avgSpeed: '60 km/h',
        co2Saved: 12.5
      },
      route: [
        { point: 'Rural Warehouse, Maharashtra', timestamp: '10:00 AM', status: 'Departed' },
        { point: 'Waypoint 1', timestamp: '10:15 AM', status: 'En Route' },
        { point: 'Village Health Center, Ahmednagar', timestamp: '10:45 AM', status: 'Estimated' }
      ]
    },
    {
      id: 'DR-002',
      origin: 'Agricultural Depot, Karnataka',
      destination: 'Remote Farming Community, Belgaum',
      status: 'Pending',
      eta: '1 hr 15 mins',
      packages: 8,
      batteryLevel: 100,
      distance: '75 km',
      type: 'Agricultural Supplies',
      priority: 'Medium',
      drone: {
        model: 'GL-X300',
        maxPayload: '20 kg',
        avgSpeed: '65 km/h',
        co2Saved: 18.7
      },
      route: [
        { point: 'Agricultural Depot, Karnataka', timestamp: 'Pending', status: 'Preparing' }
      ]
    }
  ]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Update useEffect to calculate chart data
  useEffect(() => {
    const calculateSystemStats = () => {
      const totalDeliveries = droneDeliveries.length;
      const completedDeliveries = droneDeliveries.filter(d => d.status === 'Completed').length;
      const averageDeliveryTime = droneDeliveries.reduce((sum, d) => {
        const etaMinutes = parseInt(d.eta.split(' ')[0]);
        return sum + etaMinutes;
      }, 0) / totalDeliveries;
      
      const carbonSaved = droneDeliveries.reduce((sum, d) => sum + d.drone.co2Saved, 0);

      setSystemStats({
        totalDeliveries,
        completedDeliveries,
        averageDeliveryTime: Math.round(averageDeliveryTime),
        carbonSaved: Math.round(carbonSaved)
      });

      // Set Delivery Type Distribution Data
      const typeDistribution = droneDeliveries.reduce((acc, delivery) => {
        acc[delivery.type] = (acc[delivery.type] || 0) + 1;
        return acc;
      }, {});

      setDeliveryTypeData(
        Object.entries(typeDistribution).map(([name, value]) => ({
          name, 
          value,
          percent: value / droneDeliveries.length
        }))
      );

      // Set Performance Data
      setPerformanceData([
        { name: 'Total Deliveries', value: totalDeliveries },
        { name: 'Completed', value: completedDeliveries },
        { name: 'Pending', value: totalDeliveries - completedDeliveries }
      ]);

      // Set Drone Health Data
      setDroneHealthData(drones.map(drone => ({
        name: drone.id,
        health: drone.healthScore,
        battery: parseInt(drone.batteryLife)
      })));
    };

    calculateSystemStats();
  }, [droneDeliveries, drones]);

  // Advanced sorting and filtering functions
  const sortedDrones = [...drones].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  }).filter(drone => 
    drone.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drone.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorted and filtered deliveries
  const filteredDeliveries = filter === 'All' 
    ? droneDeliveries 
    : droneDeliveries.filter(d => d.status === filter);

  // Create new delivery handler
  const handleCreateDelivery = () => {
    if (!newDelivery.origin || !newDelivery.destination || !newDelivery.type) {
      alert('Please fill in all required fields');
      return;
    }

    const newDeliveryObj = {
      id: `DR-${droneDeliveries.length + 1}`,
      ...newDelivery,
      status: 'Pending',
      eta: '1 hr',
      batteryLevel: 100,
      distance: 'N/A',
      route: [
        { point: newDelivery.origin, timestamp: new Date().toLocaleTimeString(), status: 'Preparing' }
      ],
      drone: {
        model: 'GL-X300',
        maxPayload: '20 kg',
        avgSpeed: '65 km/h',
        co2Saved: Math.round(Math.random() * 20)
      }
    };

    setDroneDeliveries([...droneDeliveries, newDeliveryObj]);
    setIsCreateDeliveryOpen(false);
    setNewDelivery({
      origin: '',
      destination: '',
      packages: 0,
      type: '',
      priority: 'Medium'
    });
  };

  // Enhanced drone edit handler
  const handleDroneEdit = (editedDrone) => {
    setDrones(drones.map(drone => 
      drone.id === editedDrone.id ? editedDrone : drone
    ));
    setDroneEditMode(null);
  };

  // Drone deletion with confirmation
  const handleDroneDeletion = (droneId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this drone from the fleet?');
    if (confirmDelete) {
      setDrones(drones.filter(drone => drone.id !== droneId));
    }
  };

  // Enhanced add drone functionality
  const handleAddDrone = () => {
    const newDrone = {
      id: `GL-X${Math.floor(Math.random() * 1000)}`,
      model: 'Next-Gen Delivery Drone',
      maxPayload: '25 kg',
      status: 'Active',
      batteryLife: '100%',
      lastMaintenance: new Date().toISOString().split('T')[0],
      location: 'Unassigned',
      assignedRoute: 'Pending',
      healthScore: 100
    };

    setDrones([...drones, newDrone]);
  };

  const renderVisualizationSection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid md:grid-cols-2 gap-8 mb-8"
    >
      {/* Delivery Type Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Package className="mr-2 text-blue-600" /> Delivery Type Distribution
        </h3>
        {deliveryTypeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deliveryTypeData.map((entry, index) => (
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
            No delivery data available
          </div>
        )}
      </div>

      {/* Delivery Performance Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="mr-2 text-green-600" /> Delivery Performance
        </h3>
        {performanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Deliveries" fill="#8884d8">
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No performance data available
          </div>
        )}
      </div>

      {/* Drone Health Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <ShieldCheck className="mr-2 text-purple-600" /> Drone Health Status
        </h3>
        {droneHealthData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={droneHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="health" name="Health Score" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="battery" name="Battery %" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No drone health data available
          </div>
        )}
      </div>

      {/* Carbon Savings Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Cloud className="mr-2 text-green-600" /> Environmental Impact
        </h3>
        {droneDeliveries.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  name: 'Total Savings',
                  co2: droneDeliveries.reduce((sum, d) => sum + d.drone.co2Saved, 0),
                  trips: droneDeliveries.length
                }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="co2" name="CO2 Saved (kg)" fill="#00C49F" />
              <Bar yAxisId="right" dataKey="trips" name="Total Trips" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No environmental data available
          </div>
        )}
      </div>
    </motion.div>
  );

  // Comprehensive render of drone cards/list
  const renderDroneView = () => {
    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {sortedDrones.map((drone) => (
          <motion.div 
            key={drone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{drone.model}</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${drone.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}
              >
                {drone.status}
              </span>
            </div>
            <div className="space-y-2">
              <div><strong>Drone ID:</strong> {drone.id}</div>
              <div><strong>Max Payload:</strong> {drone.maxPayload}</div>
              <div><strong>Battery:</strong> {drone.batteryLife}</div>
              <div><strong>Location:</strong> {drone.location}</div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${drone.healthScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{drone.healthScore}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <table className="w-full bg-white rounded-xl shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            {['ID', 'Model', 'Payload', 'Status', 'Battery', 'Location', 'Actions'].map((header) => (
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
          {sortedDrones.map((drone) => (
            <tr key={drone.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3">{drone.id}</td>
              <td className="p-3">{drone.model}</td>
              <td className="p-3">{drone.maxPayload}</td>
              <td className="p-3">
                <span 
                  className={`
                    px-2 py-1 rounded-full text-xs
                    ${drone.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {drone.status}
                </span>
              </td>
              <td className="p-3">{drone.batteryLife}</td>
              <td className="p-3">{drone.location}</td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => setDroneEditMode(drone)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDroneDeletion(drone.id)}
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
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="container mx-auto mt-20">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Navigation className="mr-4 text-green-600" />Drone Logistics
          </h1>
          <div className="flex space-x-4 mt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateDeliveryOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center mt-2"
            >
              <Plus className="mr-2" /> Create New Delivery
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFleetManagementOpen(true)}
              className="border border-green-600 text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition flex items-center mt-2"
            >
              <Truck className="mr-2" /> Fleet Management
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
              <Truck className="text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Deliveries</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.totalDeliveries}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Battery className="text-yellow-600 mr-3" />
              <h3 className="text-xl font-semibold">Avg Battery</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {Math.round(droneDeliveries.reduce((sum, d) => sum + d.batteryLevel, 0) / droneDeliveries.length)}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Cloud className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">CO2 Saved</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              {systemStats.carbonSaved} kg
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Avg Delivery Time</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {systemStats.averageDeliveryTime} mins
            </div>
          </div>
        </motion.div>

        {/* Visualization Section */}
        {renderVisualizationSection()}

        {/* Deliveries Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Current Deliveries</h2>
            <div className="flex space-x-2">
              {['All', 'In Transit', 'Pending', 'Completed'].map((statusFilter) => (
                <button 
                  key={statusFilter}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${filter === statusFilter 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                  onClick={() => setFilter(statusFilter)}
                >
                  {statusFilter}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <motion.div 
                key={delivery.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  border rounded-lg p-4 transition 
                  ${selectedDelivery === delivery.id 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'}
                `}
                onClick={() => setSelectedDelivery(delivery.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Navigation className="mr-3 text-green-600" />
                    <div>
                      <div className="font-semibold">
                        {delivery.id} - {delivery.origin} to {delivery.destination}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Package className="inline-block mr-1 h-4 w-4" />
                        {delivery.packages} Packages | 
                        <MapPin className="inline-block ml-2 mr-1 h-4 w-4" />
                        {delivery.distance}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${delivery.status === 'In Transit' 
                          ? 'bg-green-100 text-green-800' 
                          : delivery.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'}
                      `}
                    >
                      {delivery.status}
                    </div>
                    <div 
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${delivery.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : delivery.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'}
                      `}
                    >
                      {delivery.priority}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Delivery Information */}
        <AnimatePresence>
          {selectedDelivery && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Delivery Details: {selectedDelivery}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BarChart2 className="mr-2 text-blue-600" /> Drone Specifications
                  </h3>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <strong>Model:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.drone?.model}
                    </div>
                    <div>
                      <strong>Max Payload:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.drone?.maxPayload}
                    </div>
                    <div>
                      <strong>Average Speed:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.drone?.avgSpeed}
                    </div>
                    <div>
                      <strong>CO2 Saved:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.drone?.co2Saved} kg
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <MapIcon className="mr-2 text-green-600" /> Route Tracking
                  </h3>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    {droneDeliveries.find(d => d.id === selectedDelivery)?.route?.map((routePoint, index) => (
                      <div key={index} className="flex items-center">
                        <AlertCircle 
                          className={`mr-2 ${
                            routePoint.status === 'Departed' ? 'text-yellow-600' :
                            routePoint.status === 'En Route' ? 'text-blue-600' :
                            'text-green-600'
                          }`} 
                        />
                        <div>
                          <strong>{routePoint.point}</strong>
                          <div className="text-sm text-gray-600">{routePoint.timestamp} - {routePoint.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Delivery Modal */}
        <AnimatePresence>
          {isCreateDeliveryOpen && (
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
                  <Plus className="mr-2 text-green-600" /> Create New Delivery
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Origin"
                    value={newDelivery.origin}
                    onChange={(e) => setNewDelivery({...newDelivery, origin: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="text"
                    placeholder="Destination"
                    value={newDelivery.destination}
                    onChange={(e) => setNewDelivery({...newDelivery, destination: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input 
                    type="number"
                    placeholder="Number of Packages"
                    value={newDelivery.packages}
                    onChange={(e) => setNewDelivery({...newDelivery, packages: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                  />
                  <select
                    value={newDelivery.type}
                    onChange={(e) => setNewDelivery({...newDelivery, type: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Delivery Type</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Agricultural Supplies">Agricultural Supplies</option>
                    <option value="Emergency Aid">Emergency Aid</option>
                  </select>
                  <select
                    value={newDelivery.priority}
                    onChange={(e) => setNewDelivery({...newDelivery, priority: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setIsCreateDeliveryOpen(false)}
                      className="px-4 py-2 border rounded-full"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateDelivery}
                      className="bg-green-600 text-white px-4 py-2 rounded-full"
                    >
                      Create Delivery
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fleet Management Modal */}
        <AnimatePresence>
          {isFleetManagementOpen && (
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
                className="bg-white rounded-2xl p-12 mt-12 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Truck className="mr-2 text-green-600" /> Fleet Management
                  </h2>
                  <div className="flex space-x-4 items-center">
                    <input 
                      type="text"
                      placeholder="Search drones..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                      >
                        <Grid size={20} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                      >
                        <List size={20} />
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddDrone}
                      className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center"
                    >
                      <Plus className="mr-2" /> Add Drone
                    </motion.button>
                  </div>
                </div>
                
                {renderDroneView()}
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setIsFleetManagementOpen(false)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default DroneDashboard;