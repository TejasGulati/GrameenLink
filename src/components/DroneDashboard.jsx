import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Clock, Package, Battery, Navigation, Layers,
  Cloud, Map, BarChart2, Home, AlertCircle, Plus, Plane,
  Edit, Trash2, Save, Settings, ShieldCheck, RefreshCw,
  List, Grid, Filter, ChevronDown, ChevronUp, Heart, Leaf,X,
  Users, Droplet, Wifi, WifiOff, Sun, Moon, Zap, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default data for initial state
const DEFAULT_DRONES = [
  {
    id: 'GL-X250',
    model: 'Advanced Rural Delivery',
    maxPayload: '15 kg',
    status: 'Active',
    batteryLife: '85%',
    lastMaintenance: '2024-03-15',
    location: 'Maharashtra Region',
    assignedRoute: 'Medical Supply Chain',
    healthScore: 92,
    ruralOptimized: true,
    connectivityType: 'Satellite'
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
    healthScore: 68,
    ruralOptimized: true,
    connectivityType: 'Hybrid'
  },
  {
    id: 'GL-X350',
    model: 'Emergency Response Drone',
    maxPayload: '10 kg',
    status: 'Active',
    batteryLife: '78%',
    lastMaintenance: '2024-03-20',
    location: 'Odisha Region',
    assignedRoute: 'Emergency Medical',
    healthScore: 88,
    ruralOptimized: true,
    connectivityType: 'Mesh Network'
  }
];

const DEFAULT_DELIVERIES = [
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
    ruralArea: true,
    traditionalDeliveryTime: '4 hours',
    traditionalCost: '₹1,200',
    droneCost: '₹450',
    droneCO2: 0.8,
    traditionalCO2: 12.5,
    droneImpact: 'Critical medicine delivery to remote clinic',
    drone: {
      model: 'GL-X250',
      maxPayload: '15 kg',
      avgSpeed: '60 km/h',
      co2Saved: 11.7,
      connectivity: 'Satellite'
    },
    route: [
      { point: 'Rural Warehouse, Maharashtra', timestamp: '10:00 AM', status: 'Departed', lat: 19.0760, lng: 72.8777 },
      { point: 'Waypoint 1', timestamp: '10:15 AM', status: 'En Route', lat: 19.1500, lng: 72.9500 },
      { point: 'Village Health Center, Ahmednagar', timestamp: '10:45 AM', status: 'Estimated', lat: 19.0946, lng: 74.7384 }
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
    ruralArea: true,
    traditionalDeliveryTime: '6 hours',
    traditionalCost: '₹2,500',
    droneCost: '₹800',
    droneCO2: 1.2,
    traditionalCO2: 18.7,
    droneImpact: 'Seeds and fertilizers for planting season',
    drone: {
      model: 'GL-X300',
      maxPayload: '20 kg',
      avgSpeed: '65 km/h',
      co2Saved: 17.5,
      connectivity: 'Hybrid'
    },
    route: [
      { point: 'Agricultural Depot, Karnataka', timestamp: 'Pending', status: 'Preparing', lat: 15.8497, lng: 74.4977 }
    ]
  },
  {
    id: 'DR-003',
    origin: 'City Medical Center, Bangalore',
    destination: 'Rural Clinic, Ramanagara',
    status: 'Completed',
    eta: '35 mins',
    packages: 5,
    batteryLevel: 72,
    distance: '50 km',
    type: 'Emergency Vaccines',
    priority: 'High',
    ruralArea: true,
    traditionalDeliveryTime: '3 hours',
    traditionalCost: '₹1,800',
    droneCost: '₹600',
    droneCO2: 0.9,
    traditionalCO2: 15.2,
    droneImpact: 'Saved 12 children from preventable disease',
    drone: {
      model: 'GL-X350',
      maxPayload: '10 kg',
      avgSpeed: '70 km/h',
      co2Saved: 14.3,
      connectivity: 'Mesh Network'
    },
    route: [
      { point: 'City Medical Center, Bangalore', timestamp: '9:00 AM', status: 'Departed', lat: 12.9716, lng: 77.5946 },
      { point: 'Waypoint 1', timestamp: '9:15 AM', status: 'En Route', lat: 12.8000, lng: 77.5000 },
      { point: 'Rural Clinic, Ramanagara', timestamp: '9:35 AM', status: 'Delivered', lat: 12.7159, lng: 77.2778 }
    ]
  }
];

// Custom component to handle map view changes
function MapViewHandler({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Error boundary for map components
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Map rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-red-50 text-red-600">
          <AlertCircle className="mr-2" /> Error rendering map
        </div>
      );
    }
    return this.props.children;
  }
}

function DroneDashboard() {
  // Load data from localStorage or use defaults
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [filter, setFilter] = useState('All');
  const [systemStats, setSystemStats] = useState({
    totalDeliveries: 0,
    completedDeliveries: 0,
    averageDeliveryTime: 0,
    carbonSaved: 0,
    ruralImpactScore: 0,
    costSavings: 0
  });
  const [isCreateDeliveryOpen, setIsCreateDeliveryOpen] = useState(false);
  const [isFleetManagementOpen, setIsFleetManagementOpen] = useState(false);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [droneEditMode, setDroneEditMode] = useState(null);
  const [deliveryTypeData, setDeliveryTypeData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [droneHealthData, setDroneHealthData] = useState([]);
  const [ruralImpactData, setRuralImpactData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [connectivityData, setConnectivityData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [newDelivery, setNewDelivery] = useState({
    origin: '',
    destination: '',
    packages: 0,
    type: '',
    priority: 'Medium',
    ruralArea: true,
    route: [
      { 
        point: '', 
        timestamp: new Date().toLocaleTimeString(), 
        status: 'Preparing',
        lat: 20.5937, // Default India coordinates
        lng: 78.9629
      }
    ]
  });

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize state with localStorage or defaults
  const [drones, setDrones] = useState(() => 
    loadFromLocalStorage('droneDashboard_drones', DEFAULT_DRONES)
  );

  const [droneDeliveries, setDroneDeliveries] = useState(() => 
    loadFromLocalStorage('droneDashboard_deliveries', DEFAULT_DELIVERIES)
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage('droneDashboard_drones', drones);
  }, [drones]);

  useEffect(() => {
    saveToLocalStorage('droneDashboard_deliveries', droneDeliveries);
  }, [droneDeliveries]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const RURAL_COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722'];

  // Update useEffect to calculate all data
  useEffect(() => {
    const calculateSystemStats = () => {
      const totalDeliveries = droneDeliveries.length;
      const completedDeliveries = droneDeliveries.filter(d => d.status === 'Completed').length;
      const averageDeliveryTime = droneDeliveries.reduce((sum, d) => {
        const etaMinutes = parseInt(d.eta.split(' ')[0]);
        return sum + etaMinutes;
      }, 0) / totalDeliveries;
      
      const carbonSaved = droneDeliveries.reduce((sum, d) => sum + d.drone.co2Saved, 0);
      const costSavings = droneDeliveries.reduce((sum, d) => {
        const tradCost = parseInt(d.traditionalCost.replace(/[^0-9]/g, ''));
        const droneCost = parseInt(d.droneCost.replace(/[^0-9]/g, ''));
        return sum + (tradCost - droneCost);
      }, 0);

      // Calculate rural impact score (weighted average of different factors)
      const ruralImpactScore = droneDeliveries.reduce((sum, d) => {
        if (!d.ruralArea) return sum;
        let score = 0;
        if (d.type === 'Medical Supplies') score += 30;
        if (d.type === 'Emergency Vaccines') score += 40;
        if (d.type === 'Agricultural Supplies') score += 20;
        if (d.priority === 'High') score += 10;
        return sum + score;
      }, 0) / droneDeliveries.filter(d => d.ruralArea).length;

      setSystemStats({
        totalDeliveries: totalDeliveries,
        completedDeliveries,
        averageDeliveryTime: Math.round(averageDeliveryTime),
        carbonSaved: Math.round(carbonSaved),
        ruralImpactScore: Math.round(ruralImpactScore),
        costSavings
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
        battery: parseInt(drone.batteryLife),
        ruralOptimized: drone.ruralOptimized ? 100 : 0
      })));

      // Set Rural Impact Data
      setRuralImpactData([
        { subject: 'Healthcare', A: 85, B: 100, fullMark: 100 },
        { subject: 'Agriculture', A: 75, B: 100, fullMark: 100 },
        { subject: 'Education', A: 60, B: 100, fullMark: 100 },
        { subject: 'Emergency', A: 90, B: 100, fullMark: 100 },
        { subject: 'Economy', A: 70, B: 100, fullMark: 100 }
      ]);

      // Set Comparison Data
      setComparisonData([
        { name: 'Cost', drone: 1, traditional: 3.5 },
        { name: 'Time', drone: 1, traditional: 4.2 },
        { name: 'CO2', drone: 1, traditional: 12.5 },
        { name: 'Access', drone: 1, traditional: 0.3 }
      ]);

      // Set Connectivity Data
      setConnectivityData(drones.map(drone => ({
        name: drone.id,
        connectivity: drone.connectivityType === 'Satellite' ? 95 : 
                     drone.connectivityType === 'Hybrid' ? 85 : 75,
        offlineCapable: drone.connectivityType === 'Satellite' ? 90 : 
                       drone.connectivityType === 'Hybrid' ? 70 : 95
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
      eta: `${Math.floor(Math.random() * 60) + 30} mins`,
      batteryLevel: 100,
      distance: `${Math.floor(Math.random() * 100) + 20} km`,
      traditionalDeliveryTime: `${Math.floor(Math.random() * 5) + 2} hours`,
      traditionalCost: `₹${Math.floor(Math.random() * 2000) + 1000}`,
      droneCost: `₹${Math.floor(Math.random() * 800) + 300}`,
      droneCO2: (Math.random() * 2).toFixed(1),
      traditionalCO2: (Math.random() * 20 + 10).toFixed(1),
      droneImpact: newDelivery.type === 'Medical Supplies' ? 'Critical medicine delivery' :
                   newDelivery.type === 'Agricultural Supplies' ? 'Seeds and fertilizers' :
                   'Emergency supplies',
      route: [
        { 
          point: newDelivery.origin, 
          timestamp: new Date().toLocaleTimeString(), 
          status: 'Preparing',
          lat: 20.5937 + (Math.random() * 2 - 1), // Randomize near India center
          lng: 78.9629 + (Math.random() * 2 - 1)
        }
      ],
      drone: {
        model: 'GL-X300',
        maxPayload: '20 kg',
        avgSpeed: '65 km/h',
        co2Saved: Math.round(Math.random() * 20),
        connectivity: newDelivery.ruralArea ? 
          ['Satellite', 'Hybrid', 'Mesh Network'][Math.floor(Math.random() * 3)] : 
          '4G'
      }
    };

    const updatedDeliveries = [...droneDeliveries, newDeliveryObj];
    setDroneDeliveries(updatedDeliveries);
    setIsCreateDeliveryOpen(false);
    setNewDelivery({
      origin: '',
      destination: '',
      packages: 0,
      type: '',
      priority: 'Medium',
      ruralArea: true,
      route: [
        { 
          point: '', 
          timestamp: new Date().toLocaleTimeString(), 
          status: 'Preparing',
          lat: 20.5937,
          lng: 78.9629
        }
      ]
    });
  };

  // Enhanced drone edit handler
  const handleDroneEdit = (editedDrone) => {
    const updatedDrones = drones.map(drone => 
      drone.id === editedDrone.id ? editedDrone : drone
    );
    setDrones(updatedDrones);
    setDroneEditMode(null);
  };

  // Drone deletion with confirmation
  const handleDroneDeletion = (droneId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this drone from the fleet?');
    if (confirmDelete) {
      const updatedDrones = drones.filter(drone => drone.id !== droneId);
      setDrones(updatedDrones);
    }
  };

  // Enhanced add drone functionality
  const handleAddDrone = () => {
    const newDrone = {
      id: `GL-X${Math.floor(Math.random() * 1000)}`,
      model: 'Next-Gen Rural Delivery Drone',
      maxPayload: '25 kg',
      status: 'Active',
      batteryLife: '100%',
      lastMaintenance: new Date().toISOString().split('T')[0],
      location: 'Unassigned',
      assignedRoute: 'Pending',
      healthScore: 100,
      ruralOptimized: true,
      connectivityType: ['Satellite', 'Hybrid', 'Mesh Network'][Math.floor(Math.random() * 3)]
    };

    const updatedDrones = [...drones, newDrone];
    setDrones(updatedDrones);
  };

  // Reset to default data
  const handleResetData = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.');
    if (confirmReset) {
      setDrones(DEFAULT_DRONES);
      setDroneDeliveries(DEFAULT_DELIVERIES);
      localStorage.removeItem('droneDashboard_drones');
      localStorage.removeItem('droneDashboard_deliveries');
    }
  };

  const renderVisualizationSection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8"
    >
      {/* Delivery Type Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Package className="mr-2 text-blue-600" /> Delivery Type Distribution
        </h3>
        <div className="h-64 md:h-80">
          {deliveryTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deliveryTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isMobile ? 60 : 80}
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
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No delivery data available
            </div>
          )}
        </div>
      </div>

      {/* Rural Impact Radar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Heart className="mr-2 text-red-600" /> Rural Community Impact
        </h3>
        <div className="h-64 md:h-80">
          {ruralImpactData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ruralImpactData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Current Impact" 
                  dataKey="A" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Potential Impact" 
                  dataKey="B" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.2} 
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No impact data available
            </div>
          )}
        </div>
      </div>

      {/* Delivery Comparison Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Activity className="mr-2 text-purple-600" /> Drone vs Traditional Delivery
        </h3>
        <div className="h-64 md:h-80">
          {comparisonData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="drone" name="Drone Delivery" fill="#8884d8" />
                <Bar dataKey="traditional" name="Traditional" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No comparison data available
            </div>
          )}
        </div>
        <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
          <Zap className="inline mr-1" size={14} /> Drones are 3-5x more efficient in rural areas
        </div>
      </div>

      {/* Connectivity Reliability Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Wifi className="mr-2 text-blue-600" /> Rural Connectivity Performance
        </h3>
        <div className="h-64 md:h-80">
          {connectivityData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={connectivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="connectivity" name="Connectivity %" fill="#8884d8" />
                <Bar dataKey="offlineCapable" name="Offline Capability" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No connectivity data available
            </div>
          )}
        </div>
        <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
          <WifiOff className="inline mr-1" size={14} /> Specialized connectivity solutions for remote areas
        </div>
      </div>

      {/* Carbon Savings Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Leaf className="mr-2 text-green-600" /> Environmental Impact
        </h3>
        <div className="h-64 md:h-80">
          {droneDeliveries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: 'Total Savings',
                    co2: droneDeliveries.reduce((sum, d) => sum + d.drone.co2Saved, 0),
                    trips: droneDeliveries.length,
                    ruralTrips: droneDeliveries.filter(d => d.ruralArea).length
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
                <Bar yAxisId="right" dataKey="ruralTrips" name="Rural Deliveries" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No environmental data available
            </div>
          )}
        </div>
        <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
          <Sun className="inline mr-1" size={14} /> 92% of CO2 savings come from rural deliveries
        </div>
      </div>

      {/* Cost Savings Line Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Users className="mr-2 text-green-600" /> Economic Impact
        </h3>
        <div className="h-64 md:h-80">
          {droneDeliveries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={droneDeliveries.map((d, i) => ({
                  name: d.id,
                  cost: parseInt(d.droneCost.replace(/[^0-9]/g, '')),
                  savings: parseInt(d.traditionalCost.replace(/[^0-9]/g, '')) - parseInt(d.droneCost.replace(/[^0-9]/g, '')),
                  rural: d.ruralArea ? 1 : 0
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cost" name="Drone Cost (₹)" stroke="#8884d8" />
                <Line type="monotone" dataKey="savings" name="Savings vs Traditional (₹)" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No economic data available
            </div>
          )}
        </div>
        <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
          <Droplet className="inline mr-1" size={14} /> Average 65% cost reduction in rural deliveries
        </div>
      </div>
    </motion.div>
  );

  const renderDroneView = () => {
    return viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {sortedDrones.map((drone) => (
          <motion.div 
            key={drone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="text-lg md:text-xl font-semibold">{drone.model}</h3>
              <div className="flex space-x-1 md:space-x-2">
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
                {drone.ruralOptimized && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Rural
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1 md:space-y-2 text-sm">
              <div><strong>Drone ID:</strong> {drone.id}</div>
              <div><strong>Max Payload:</strong> {drone.maxPayload}</div>
              <div><strong>Battery:</strong> {drone.batteryLife}</div>
              <div><strong>Location:</strong> {drone.location}</div>
              <div><strong>Connectivity:</strong> {drone.connectivityType}</div>
              <div className="flex justify-between items-center mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${drone.healthScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs md:text-sm text-gray-600">{drone.healthScore}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Model', 'Payload', 'Status', 'Battery', 'Location', 'Rural', 'Actions'].map((header) => (
                <th 
                  key={header} 
                  className="p-2 md:p-3 text-left text-xs md:text-sm cursor-pointer hover:bg-gray-200"
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
                      sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={14} /> : <ChevronDown className="ml-1" size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDrones.map((drone) => (
              <tr key={drone.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-3 text-xs md:text-sm">{drone.id}</td>
                <td className="p-2 md:p-3 text-xs md:text-sm">{drone.model}</td>
                <td className="p-2 md:p-3 text-xs md:text-sm">{drone.maxPayload}</td>
                <td className="p-2 md:p-3 text-xs md:text-sm">
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-xs
                      ${drone.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : drone.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'}
                    `}
                  >
                    {drone.status}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-xs md:text-sm">{drone.batteryLife}</td>
                <td className="p-2 md:p-3 text-xs md:text-sm">{drone.location}</td>
                <td className="p-2 md:p-3 text-xs md:text-sm">
                  {drone.ruralOptimized ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Optimized
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      Standard
                    </span>
                  )}
                </td>
                <td className="p-2 md:p-3 text-xs md:text-sm flex space-x-1 md:space-x-2">
                  <button 
                    onClick={() => setDroneEditMode(drone)}
                    className="text-blue-600 hover:bg-blue-50 p-1 md:p-2 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDroneDeletion(drone.id)}
                    className="text-red-600 hover:bg-red-50 p-1 md:p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRuralBenefitsModal = () => (
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
        className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center">
            <Heart className="mr-3" size={28} /> Rural Drone Delivery Benefits
          </h2>
          <button 
            onClick={() => setIsBenefitsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <div className="bg-green-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center text-green-700">
              <Zap className="mr-2" /> Efficiency Advantages
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-2 md:mr-3">
                  <Clock size={16} className="text-green-600" />
                </span>
                <span className="text-sm md:text-base"><strong>4-10x faster</strong> than road transport in rural areas</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-2 md:mr-3">
                  <Droplet size={16} className="text-green-600" />
                </span>
                <span className="text-sm md:text-base"><strong>60-80% cost reduction</strong> per delivery compared to traditional methods</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-2 md:mr-3">
                  <Leaf size={16} className="text-green-600" />
                </span>
                <span className="text-sm md:text-base"><strong>90% less CO2</strong> emissions than road vehicles</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 p-1 rounded-full mr-2 md:mr-3">
                  <Wifi size={16} className="text-green-600" />
                </span>
                <span className="text-sm md:text-base"><strong>Specialized connectivity</strong> solutions for areas with poor infrastructure</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center text-blue-700">
              <Users className="mr-2" /> Social Impact
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start">
                <span className="bg-blue-100 p-1 rounded-full mr-2 md:mr-3">
                  <Heart size={16} className="text-blue-600" />
                </span>
                <span className="text-sm md:text-base"><strong>Life-saving deliveries</strong> of medicines and vaccines to remote clinics</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 p-1 rounded-full mr-2 md:mr-3">
                  <Package size={16} className="text-blue-600" />
                </span>
                <span className="text-sm md:text-base"><strong>Agricultural supplies</strong> delivered just-in-time for planting seasons</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 p-1 rounded-full mr-2 md:mr-3">
                  <Activity size={16} className="text-blue-600" />
                </span>
                <span className="text-sm md:text-base"><strong>Economic empowerment</strong> by connecting rural producers to markets</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 p-1 rounded-full mr-2 md:mr-3">
                  <Sun size={16} className="text-blue-600" />
                </span>
                <span className="text-sm md:text-base"><strong>All-weather capability</strong> reaching areas inaccessible during monsoons</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-4 md:p-6 rounded-xl mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center text-purple-700">
            <BarChart2 className="mr-2" /> Business Case
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-bold text-purple-600 mb-1 md:mb-2">₹450-800</div>
              <div className="text-xs md:text-sm">Average cost per rural delivery</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-bold text-purple-600 mb-1 md:mb-2">65-80%</div>
              <div className="text-xs md:text-sm">Cost savings vs traditional</div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow">
              <div className="text-xl md:text-2xl font-bold text-purple-600 mb-1 md:mb-2">2-3x</div>
              <div className="text-xs md:text-sm">More deliveries per day per drone</div>
            </div>
          </div>
          <div className="mt-4 md:mt-6 text-sm md:text-base text-purple-700">
            <strong>Profit meets purpose:</strong> Our rural-optimized drone network achieves profitability while 
            serving communities traditional logistics cannot reach, creating shared value for businesses and rural populations.
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => setIsBenefitsModalOpen(false)}
            className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8"
    >
      <div className="container mx-auto mt-16 md:mt-20">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
                <Navigation className="mr-2 md:mr-4 text-green-600" />Rural Drone Logistics Network
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                Bridging the last-mile gap in rural India with sustainable aerial delivery
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBenefitsModalOpen(true)}
                className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-blue-700 transition flex items-center"
              >
                <Heart className="mr-1 md:mr-2" size={16} /> Rural Benefits
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetData}
                className="bg-gray-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-gray-700 transition flex items-center"
              >
                <RefreshCw className="mr-1 md:mr-2" size={16} /> Reset Data
              </motion.button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateDeliveryOpen(true)}
              className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-green-700 transition flex items-center"
            >
              <Plus className="mr-1 md:mr-2" size={16} /> Create New Delivery
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFleetManagementOpen(true)}
              className="border border-green-600 text-green-600 px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-green-50 transition flex items-center"
            >
              <Truck className="mr-1 md:mr-2" size={16} /> Fleet Management
            </motion.button>
          </div>
        </header>

        {/* System Overview Cards */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <Truck className="text-blue-600 mr-2 md:mr-3" size={16} />
              <h3 className="text-sm md:text-base font-semibold">Total Deliveries</h3>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              {systemStats.totalDeliveries}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {droneDeliveries.filter(d => d.ruralArea).length} rural ({Math.round(droneDeliveries.filter(d => d.ruralArea).length / droneDeliveries.length * 100)}%)
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <Clock className="text-purple-600 mr-2 md:mr-3" size={16} />
              <h3 className="text-sm md:text-base font-semibold">Avg Delivery Time</h3>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              {systemStats.averageDeliveryTime} mins
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              vs 4.2 hours traditional
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <Leaf className="text-green-600 mr-2 md:mr-3" size={16} />
              <h3 className="text-sm md:text-base font-semibold">CO2 Saved</h3>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-800">
              {systemStats.carbonSaved} kg
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              92% from rural deliveries
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <Users className="text-blue-600 mr-2 md:mr-3" size={16} />
              <h3 className="text-sm md:text-base font-semibold">Cost Savings</h3>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-800">
              ₹{systemStats.costSavings}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              vs traditional methods
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
          className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Current Deliveries</h2>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {['All', 'In Transit', 'Pending', 'Completed'].map((statusFilter) => (
                <button 
                  key={statusFilter}
                  className={`
                    px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium
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
          <div className="space-y-3 md:space-y-4">
            {filteredDeliveries.map((delivery) => (
              <motion.div 
                key={delivery.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  border rounded-lg p-3 md:p-4 transition 
                  ${selectedDelivery === delivery.id 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'}
                `}
                onClick={() => setSelectedDelivery(delivery.id)}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
                  <div className="flex items-center">
                    <Navigation className="mr-2 md:mr-3 text-green-600" size={16} />
                    <div>
                      <div className="font-semibold text-sm md:text-base">
                        {delivery.id} - {delivery.origin} to {delivery.destination}
                        {delivery.ruralArea && (
                          <span className="ml-2 px-2 py-0.5 md:py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            Rural Area
                          </span>
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="flex items-center">
                          <Package className="inline-block mr-1 h-3 w-3 md:h-4 md:w-4" />
                          {delivery.packages} Packages
                        </span>
                        <span className="flex items-center">
                          <MapPin className="inline-block mr-1 h-3 w-3 md:h-4 md:w-4" />
                          {delivery.distance}
                        </span>
                        <span className="flex items-center">
                          <Clock className="inline-block mr-1 h-3 w-3 md:h-4 md:w-4" />
                          {delivery.eta} (vs {delivery.traditionalDeliveryTime} traditional)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div 
                      className={`
                        px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium
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
                        px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium
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
              className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8"
            >
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Delivery Details: {selectedDelivery}
                </h2>
                <button 
                  onClick={() => setSelectedDelivery(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                    <BarChart2 className="mr-2 text-blue-600" size={16} /> Delivery Specifications
                  </h3>
                  <div className="space-y-2 bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">
                    <div>
                      <strong>Type:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.type}
                    </div>
                    <div>
                      <strong>Priority:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.priority}
                    </div>
                    <div>
                      <strong>Packages:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.packages}
                    </div>
                    <div>
                      <strong>Distance:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.distance}
                    </div>
                    <div>
                      <strong>ETA:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.eta}
                    </div>
                    <div>
                      <strong>Rural Area:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.ruralArea ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <strong>Impact:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.droneImpact}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                    <Activity className="mr-2 text-green-600" size={16} /> Efficiency Comparison
                  </h3>
                  <div className="space-y-2 bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">
                    <div className="flex justify-between">
                      <span>Method</span>
                      <span>Drone</span>
                      <span>Traditional</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost</span>
                      <span className="font-medium">{droneDeliveries.find(d => d.id === selectedDelivery)?.droneCost}</span>
                      <span>{droneDeliveries.find(d => d.id === selectedDelivery)?.traditionalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time</span>
                      <span className="font-medium">{droneDeliveries.find(d => d.id === selectedDelivery)?.eta}</span>
                      <span>{droneDeliveries.find(d => d.id === selectedDelivery)?.traditionalDeliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO2 Emissions</span>
                      <span className="font-medium">{droneDeliveries.find(d => d.id === selectedDelivery)?.droneCO2} kg</span>
                      <span>{droneDeliveries.find(d => d.id === selectedDelivery)?.traditionalCO2} kg</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-gray-200 text-xs md:text-sm text-green-600">
                      <Zap className="inline mr-1" size={12} /> 
                      {droneDeliveries.find(d => d.id === selectedDelivery)?.ruralArea ? 
                        'This rural delivery achieves significant savings' : 
                        'Standard urban delivery efficiency'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                    <Truck className="mr-2 text-blue-600" size={16} /> Drone Specifications
                  </h3>
                  <div className="space-y-2 bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">
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
                    <div>
                      <strong>Connectivity:</strong> {droneDeliveries.find(d => d.id === selectedDelivery)?.drone?.connectivity}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                    <Map className="mr-2 text-green-600" size={16} /> Route Tracking
                  </h3>
                  <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <MapErrorBoundary>
                      {droneDeliveries.find(d => d.id === selectedDelivery)?.route?.length > 0 ? (
                        <MapContainer 
                          center={[
                            droneDeliveries.find(d => d.id === selectedDelivery)?.route[0]?.lat || 20.5937,
                            droneDeliveries.find(d => d.id === selectedDelivery)?.route[0]?.lng || 78.9629
                          ]} 
                          zoom={7} 
                          style={{ height: '100%', width: '100%' }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <MapViewHandler 
                            center={[
                              droneDeliveries.find(d => d.id === selectedDelivery)?.route[0]?.lat || 20.5937,
                              droneDeliveries.find(d => d.id === selectedDelivery)?.route[0]?.lng || 78.9629
                            ]}
                          />
                          {droneDeliveries.find(d => d.id === selectedDelivery)?.route?.map((point, i) => (
                            point.lat && point.lng && (
                              <Marker key={i} position={[point.lat, point.lng]}>
                                <Popup>
                                  <div className="text-sm">
                                    <strong>{point.point}</strong><br />
                                    {point.timestamp} - {point.status}
                                  </div>
                                </Popup>
                              </Marker>
                            )
                          ))}
                          {droneDeliveries.find(d => d.id === selectedDelivery)?.route?.length > 1 && (
                            <Polyline 
                              positions={droneDeliveries.find(d => d.id === selectedDelivery)?.route
                                ?.filter(p => p.lat && p.lng)
                                ?.map(p => [p.lat, p.lng])} 
                              color="green"
                            />
                          )}
                        </MapContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No route data available
                        </div>
                      )}
                    </MapErrorBoundary>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-4 md:p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <Plus className="mr-2 text-green-600" /> Create New Delivery
                  </h2>
                  <button 
                    onClick={() => setIsCreateDeliveryOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <input 
                    type="text"
                    placeholder="Origin"
                    value={newDelivery.origin}
                    onChange={(e) => setNewDelivery({...newDelivery, origin: e.target.value})}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  />
                  <input 
                    type="text"
                    placeholder="Destination"
                    value={newDelivery.destination}
                    onChange={(e) => setNewDelivery({...newDelivery, destination: e.target.value})}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  />
                  <input 
                    type="number"
                    placeholder="Number of Packages"
                    value={newDelivery.packages}
                    onChange={(e) => setNewDelivery({...newDelivery, packages: parseInt(e.target.value)})}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  />
                  <select
                    value={newDelivery.type}
                    onChange={(e) => setNewDelivery({...newDelivery, type: e.target.value})}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  >
                    <option value="">Select Delivery Type</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Agricultural Supplies">Agricultural Supplies</option>
                    <option value="Emergency Vaccines">Emergency Vaccines</option>
                    <option value="Educational Materials">Educational Materials</option>
                  </select>
                  <select
                    value={newDelivery.priority}
                    onChange={(e) => setNewDelivery({...newDelivery, priority: e.target.value})}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="ruralArea"
                      checked={newDelivery.ruralArea}
                      onChange={(e) => setNewDelivery({...newDelivery, ruralArea: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="ruralArea" className="text-sm md:text-base">Rural Area Delivery</label>
                  </div>
                  <div className="flex justify-end space-x-2 md:space-x-4">
                    <button 
                      onClick={() => setIsCreateDeliveryOpen(false)}
                      className="px-3 py-2 md:px-4 md:py-2 border rounded-full text-sm md:text-base"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateDelivery}
                      className="px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white rounded-full text-sm md:text-base"
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <Truck className="mr-2 text-green-600" /> Fleet Management
                  </h2>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
                    <input 
                      type="text"
                      placeholder="Search drones..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm md:text-base w-full"
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                        >
                          <Grid size={16} />
                        </button>
                        <button 
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                        >
                          <List size={16} />
                        </button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddDrone}
                        className="bg-green-600 text-white px-3 py-2 rounded-full flex items-center text-sm md:text-base"
                      >
                        <Plus className="mr-1 md:mr-2" /> Add Drone
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                {renderDroneView()}
                
                <div className="flex justify-end mt-4 md:mt-6">
                  <button 
                    onClick={() => setIsFleetManagementOpen(false)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rural Benefits Modal */}
        {isBenefitsModalOpen && renderRuralBenefitsModal()}
      </div>
    </motion.div>
  );
}

export default DroneDashboard;