import { 
  Leaf, 
  Recycle, 
  TreePine, 
  Truck, 
  PackageOpen, 
  Factory, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  LineChart,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Filter,
  Globe,
  Award,
  Database,
  Home,
  Target,
  PieChart,
  Target as TargetIcon,
  X,
  Search,
  Grid,
  List,
  BarChart2,
  PieChart as PieChartIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { 
  BarChart,
  Bar, 
  Pie,
  XAxis, 
  YAxis, 
  Cell,
  Line,
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Droplet, Minus } from 'lucide-react';

function SustainabilityTracker() {
  const initialSustainabilityTrends = [
    { month: 'Jan', carbon: 1450, waste: 320, energy: 2800 },
    { month: 'Feb', carbon: 1320, waste: 290, energy: 2650 },
    { month: 'Mar', carbon: 1245, waste: 260, energy: 2500 },
    { month: 'Apr', carbon: 1180, waste: 240, energy: 2350 },
    { month: 'May', carbon: 1100, waste: 210, energy: 2200 },
    { month: 'Jun', carbon: 1050, waste: 190, energy: 2100 }
  ];

  const [sustainabilityMetrics, setSustainabilityMetrics] = useState({
    carbonFootprint: 1245,
    wasteRecycled: 456,
    packagingReduction: 38,
    energyEfficiency: 67,
    transportEmissions: 210,
    waterConservation: 890,
    renewableEnergyUsage: 42
  });

  const [sustainabilityTrends, setSustainabilityTrends] = useState(initialSustainabilityTrends);
  const [sustainabilityInitiatives, setSustainabilityInitiatives] = useState([
    {
      id: 'SI-001',
      title: 'Biodegradable Packaging Revolution',
      description: 'Complete transition to fully compostable packaging materials sourced from agricultural waste',
      status: 'In Progress',
      progress: 65,
      startDate: '2024-01-15',
      targetDate: '2024-12-31',
      budget: 50000,
      teamMembers: ['Alice Rodriguez', 'Bob Chen'],
      risks: ['Supply chain disruption', 'Material compatibility'],
      category: 'Waste Reduction',
      expectedImpact: {
        carbonReduction: 25,
        wasteElimination: 40,
        costSavings: 15
      }
    },
    {
      id: 'SI-002', 
      title: 'Waste Monetization & Circular Economy',
      description: 'Convert agricultural and packaging waste into valuable resources through advanced recycling techniques',
      status: 'Planned',
      progress: 30,
      startDate: '2024-03-01',
      targetDate: '2025-06-30',
      budget: 75000,
      teamMembers: ['Charlie Kumar', 'David Patel'],
      risks: ['Technology adaptation', 'Initial investment'],
      category: 'Circular Economy',
      expectedImpact: {
        carbonReduction: 35,
        wasteElimination: 55,
        costSavings: 25
      }
    }
  ]);

  const [initiativeFilter, setInitiativeFilter] = useState({
    status: 'All',
    category: 'All'
  });

  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [isAddInitiativeOpen, setIsAddInitiativeOpen] = useState(false);
  const [isEditInitiativeOpen, setIsEditInitiativeOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isMetricsChartOpen, setIsMetricsChartOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const [initiativeForm, setInitiativeForm] = useState({
    title: '',
    description: '',
    status: 'Planned',
    progress: 0,
    budget: 0,
    teamMembers: [],
    risks: [],
    startDate: '',
    targetDate: '',
    category: '',
    expectedImpact: {
      carbonReduction: 0,
      wasteElimination: 0,
      costSavings: 0
    }
  });
  
  const [impactDistribution, setImpactDistribution] = useState([
    { name: 'Carbon Footprint', value: 1245 },
    { name: 'Waste Recycled', value: 456 },
    { name: 'Energy Efficiency', value: 67 },
    { name: 'Water Conservation', value: 890 },
    { name: 'Renewable Energy', value: 42 }
  ]);
  
  const [goalProgress, setGoalProgress] = useState([
    { name: 'Carbon Reduction', current: 25, target: 50 },
    { name: 'Waste Recycling', current: 45, target: 80 },
    { name: 'Renewable Energy', current: 40, target: 100 }
  ]);
  
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57',
    '#FFC658', '#FF7F50', '#87CEEB', '#DA70D6'
  ];

  useEffect(() => {
    const calculateMetrics = () => {
      try {
        const avgCarbonReduction = sustainabilityTrends.length > 0 
          ? (sustainabilityTrends[0].carbon - sustainabilityTrends[sustainabilityTrends.length - 1].carbon) / 
            (sustainabilityTrends.length - 1)
          : 0;
  
        setSustainabilityMetrics(prev => ({
          ...prev,
          carbonFootprint: isNaN(prev.carbonFootprint) ? 0 : prev.carbonFootprint,
          wasteRecycled: isNaN(prev.wasteRecycled) ? 0 : prev.wasteRecycled,
          avgCarbonReduction: isNaN(avgCarbonReduction) ? 0 : Math.abs(avgCarbonReduction.toFixed(1))
        }));
  
        setGoalProgress(prev => prev.map(goal => {
          let currentValue;
          switch(goal.name) {
            case 'Carbon Reduction':
              currentValue = ((sustainabilityMetrics.carbonFootprint / 2500) * 100).toFixed(1);
              break;
            case 'Waste Recycling':
              currentValue = ((sustainabilityMetrics.wasteRecycled / 1000) * 100).toFixed(1);
              break;
            case 'Renewable Energy':
              currentValue = sustainabilityMetrics.renewableEnergyUsage;
              break;
            default:
              currentValue = goal.current;
          }
          
          return {
            ...goal,
            current: isNaN(currentValue) ? 0 : parseFloat(currentValue)
          };
        }));
      } catch (error) {
        console.error("Error calculating sustainability metrics:", error);
      }
    };
  
    calculateMetrics();
  }, [sustainabilityTrends, sustainabilityMetrics.carbonFootprint, sustainabilityMetrics.wasteRecycled, sustainabilityMetrics.renewableEnergyUsage]);

  const filteredInitiatives = useMemo(() => {
    return sustainabilityInitiatives.filter(initiative => 
      (initiativeFilter.status === 'All' || initiative.status === initiativeFilter.status) &&
      (initiativeFilter.category === 'All' || initiative.category === initiativeFilter.category) &&
      (initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sustainabilityInitiatives, initiativeFilter, searchTerm]);

  const metricsChartData = [
    { name: 'Carbon Footprint', value: sustainabilityMetrics.carbonFootprint },
    { name: 'Waste Recycled', value: sustainabilityMetrics.wasteRecycled },
    { name: 'Energy Efficiency', value: sustainabilityMetrics.energyEfficiency }
  ];

  const handleAddInitiative = () => {
    if (!initiativeForm.title || !initiativeForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newInitiative = {
      id: `SI-${sustainabilityInitiatives.length + 1}`,
      ...initiativeForm,
      startDate: initiativeForm.startDate || new Date().toISOString().split('T')[0],
      targetDate: initiativeForm.targetDate || 
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    };

    setSustainabilityInitiatives([...sustainabilityInitiatives, newInitiative]);
    resetInitiativeForm();
    setIsAddInitiativeOpen(false);
  };

  const handleEditInitiative = () => {
    const updatedInitiatives = sustainabilityInitiatives.map(initiative => 
      initiative.id === selectedInitiative.id ? {...initiativeForm} : initiative
    );

    setSustainabilityInitiatives(updatedInitiatives);
    setIsEditInitiativeOpen(false);
    setSelectedInitiative(null);
  };

  const handleDeleteInitiative = (id) => {
    const updatedInitiatives = sustainabilityInitiatives.filter(initiative => initiative.id !== id);
    setSustainabilityInitiatives(updatedInitiatives);
    setIsDetailModalOpen(false);
    setSelectedInitiative(null);
  };

  const resetInitiativeForm = () => {
    setInitiativeForm({
      title: '',
      description: '',
      status: 'Planned',
      progress: 0,
      budget: 0,
      teamMembers: [],
      risks: [],
      startDate: '',
      targetDate: '',
      category: '',
      expectedImpact: {
        carbonReduction: 0,
        wasteElimination: 0,
        costSavings: 0
      }
    });
  };

  const openEditModal = (initiative) => {
    setInitiativeForm(initiative);
    setSelectedInitiative(initiative);
    setIsEditInitiativeOpen(true);
  };

  const openDetailModal = (initiative) => {
    setSelectedInitiative(initiative);
    setIsDetailModalOpen(true);
  };

  const renderSustainabilityMetrics = () => {
    const metricIcons = {
      carbonFootprint: Factory,
      wasteRecycled: Recycle,
      packagingReduction: PackageOpen,
      energyEfficiency: TreePine,
      transportEmissions: Truck,
      waterConservation: Globe,
      renewableEnergyUsage: TrendingUp
    };
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-4 gap-6 mb-8"
      >
        {Object.entries(sustainabilityMetrics).slice(0, 4).map(([key, value]) => {
          const Icon = metricIcons[key];
          if (!Icon) {
            console.warn(`No icon found for metric: ${key}`);
            return null;
          }
          
          return (
            <div 
              key={key} 
              className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center mb-4">
                <Icon className="text-primary-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {value} <span className="text-sm">kg</span>
              </div>
            </div>
          );
        })}
      </motion.div>
    );
  };

  const renderSustainabilityGoals = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-green-600" /> Sustainability Goals
        </h2>
        <div className="space-y-4">
          {goalProgress.map((goal, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center">
              <div className={`mr-4 p-3 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'}`}>
                {index === 0 ? <Factory /> : index === 1 ? <Recycle /> : <TreePine />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{goal.name}</h3>
                  <span className="text-sm text-gray-600">Target: {goal.target}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${goal.current}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Current Progress: {goal.current}%</div>
                  {goal.current < goal.target ? (
                    <TrendingUp className="text-green-600" size={20} />
                  ) : (
                    <TrendingDown className="text-red-600" size={20} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrendAnalysis = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" /> Sustainability Trends
      </h3>
      {sustainabilityTrends.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={sustainabilityTrends}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="carbon" name="Carbon Footprint (kg)" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="waste" name="Waste Recycled (kg)" fill="#82ca9d" />
            <Bar yAxisId="right" dataKey="energy" name="Energy Consumption (kWh)" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No trend data available
        </div>
      )}
    </div>
  );

  const renderImpactDistribution = () => {
    const impactData = [
      { 
        name: 'Carbon Reduction', 
        value: sustainabilityInitiatives.reduce((sum, init) => sum + init.expectedImpact.carbonReduction, 0),
        icon: <Factory className="text-blue-500" />,
        trend: sustainabilityInitiatives.some(i => i.status === 'In Progress') ? 'improving' : 'stable'
      },
      { 
        name: 'Waste Elimination', 
        value: sustainabilityInitiatives.reduce((sum, init) => sum + init.expectedImpact.wasteElimination, 0),
        icon: <Recycle className="text-green-500" />,
        trend: sustainabilityMetrics.wasteRecycled > 500 ? 'improving' : 'needs work'
      },
      { 
        name: 'Cost Savings', 
        value: sustainabilityInitiatives.reduce((sum, init) => sum + init.expectedImpact.costSavings, 0),
        icon: <TrendingUp className="text-purple-500" />,
        trend: 'improving'
      },
      { 
        name: 'Energy Impact', 
        value: sustainabilityMetrics.energyEfficiency,
        icon: <TreePine className="text-yellow-500" />,
        trend: sustainabilityMetrics.energyEfficiency > 65 ? 'good' : 'needs work'
      }
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <PieChartIcon className="mr-2 text-purple-600" /> Impact Distribution
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {impactData.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 mr-3 rounded-full bg-white shadow-sm">
                    {metric.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{metric.name}</h4>
                    <p className="text-sm text-gray-500">
                      {metric.trend === 'improving' ? 'Positive trend' : 
                       metric.trend === 'good' ? 'On target' : 'Needs improvement'}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                  {metric.value}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {impactDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-3">Impact by Initiative</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sustainabilityInitiatives}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="expectedImpact.carbonReduction" name="Carbon Reduction" fill="#0088FE" />
                <Bar dataKey="expectedImpact.wasteElimination" name="Waste Elimination" fill="#00C49F" />
                <Bar dataKey="expectedImpact.costSavings" name="Cost Savings" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderGoalProgressChart = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TargetIcon className="mr-2 text-purple-600" /> Goal Progress
      </h3>
      {goalProgress.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={goalProgress}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" name="Current Progress" fill="#8884d8" />
            <Bar dataKey="target" name="Target" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No goal progress data available
        </div>
      )}
    </div>
  );

  const renderCombinedEffect = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Globe className="mr-2 text-blue-600" /> Combined Sustainability Impact
      </h3>
      {sustainabilityTrends.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={sustainabilityTrends}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbon" name="Carbon Footprint (kg)" fill="#8884d8" />
            <Bar dataKey="waste" name="Waste Recycled (kg)" fill="#82ca9d" />
            <Line 
              type="monotone" 
              dataKey="energy" 
              name="Energy Efficiency (%)" 
              stroke="#ff8042"
              activeDot={{ r: 8 }}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No combined data available
        </div>
      )}
    </div>
  );

  const renderInitiativesGrid = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {filteredInitiatives.map((initiative) => (
        <motion.div
          key={initiative.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
          onClick={() => openDetailModal(initiative)}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{initiative.title}</h3>
            <span 
              className={`
                px-3 py-1 rounded-full text-xs
                ${initiative.status === 'In Progress' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : initiative.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'}
              `}
            >
              {initiative.status}
            </span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{initiative.description}</p>
          <div className="flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${initiative.progress}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">{initiative.progress}%</span>
          </div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(initiative);
              }}
              className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteInitiative(initiative.id);
              }}
              className="text-red-600 hover:bg-red-50 p-2 rounded-full"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderInitiativesList = () => (
    <table className="w-full bg-white rounded-xl shadow-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-center">Status</th>
          <th className="p-3 text-center">Progress</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredInitiatives.map((initiative) => (
          <tr 
            key={initiative.id} 
            className="border-b hover:bg-gray-50 transition-colors"
            onClick={() => openDetailModal(initiative)}
          >
            <td className="p-3">{initiative.title}</td>
            <td className="p-3 text-gray-600 line-clamp-1">{initiative.description}</td>
            <td className="p-3 text-center">
              <span 
                className={`
                  px-2 py-1 rounded-full text-xs
                  ${initiative.status === 'In Progress' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : initiative.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'}
                `}
              >
                {initiative.status}
              </span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center">
                <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
                <span>{initiative.progress}%</span>
              </div>
            </td>
            <td className="p-3 text-center">
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(initiative);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteInitiative(initiative.id);
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderInitiativeDetailModal = () => {
    if (!selectedInitiative) return null;

    return (
      <AnimatePresence>
        {isDetailModalOpen && (
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
              className="bg-white rounded-xl p-8 w-full max-w-4xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedInitiative.title}</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(selectedInitiative)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteInitiative(selectedInitiative.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 mb-4">{selectedInitiative.description}</p>

                  <h3 className="font-semibold mb-2">Status & Progress</h3>
                  <div className="flex items-center mb-4">
                    <div
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium mr-4
                        ${selectedInitiative.status === 'In Progress' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : selectedInitiative.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'}
                      `}
                    >
                      {selectedInitiative.status}
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${selectedInitiative.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{selectedInitiative.progress}%</span>
                  </div>

                  <h3 className="font-semibold mb-2">Expected Impact</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 p-2 rounded">
                      <h4 className="text-xs font-medium">Carbon Reduction</h4>
                      <div className="text-lg font-bold text-green-700">
                        {selectedInitiative.expectedImpact.carbonReduction}%
                      </div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <h4 className="text-xs font-medium">Waste Elimination</h4>
                      <div className="text-lg font-bold text-blue-700">
                        {selectedInitiative.expectedImpact.wasteElimination}%
                      </div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <h4 className="text-xs font-medium">Cost Savings</h4>
                      <div className="text-lg font-bold text-purple-700">
                        {selectedInitiative.expectedImpact.costSavings}%
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Timeline</h3>
                  <div className="flex items-center mb-2">
                    <Clock className="mr-2 text-blue-600" />
                    <span>Start Date: {selectedInitiative.startDate}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Clock className="mr-2 text-red-600" />
                    <span>Target Date: {selectedInitiative.targetDate}</span>
                  </div>

                  <h3 className="font-semibold mb-2">Budget</h3>
                  <p className="text-green-700 font-bold mb-4">
                    ${selectedInitiative.budget.toLocaleString()}
                  </p>

                  <h3 className="font-semibold mb-2">Team Members</h3>
                  <div className="flex space-x-2 mb-4">
                    {selectedInitiative.teamMembers.map((member, index) => (
                      <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                        {member}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-semibold mb-2">Risks</h3>
                  <ul className="list-disc pl-5 text-red-600">
                    {selectedInitiative.risks.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border rounded-full mr-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  const renderInitiativeModal = () => {
    const isEditing = isEditInitiativeOpen;
    return (
      <AnimatePresence>
        {(isAddInitiativeOpen || isEditInitiativeOpen) && (
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
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Plus className="mr-2 text-green-600" />
                {isEditing ? 'Edit Initiative' : 'New Initiative'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={initiativeForm.title}
                  onChange={(e) => setInitiativeForm({...initiativeForm, title: e.target.value})}
                  className="col-span-2 p-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={initiativeForm.description}
                  onChange={(e) => setInitiativeForm({...initiativeForm, description: e.target.value})}
                  className="col-span-2 p-2 border rounded-lg h-20"
                />
                <select
                  value={initiativeForm.status}
                  onChange={(e) => setInitiativeForm({...initiativeForm, status: e.target.value})}
                  className="p-2 border rounded-lg"
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  value={initiativeForm.category}
                  onChange={(e) => setInitiativeForm({...initiativeForm, category: e.target.value})}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Category</option>
                  <option value="Waste Reduction">Waste Reduction</option>
                  <option value="Circular Economy">Circular Economy</option>
                  <option value="Energy Efficiency">Energy Efficiency</option>
                </select>
                <div className="col-span-2 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={initiativeForm.progress}
                    onChange={(e) => setInitiativeForm({...initiativeForm, progress: parseInt(e.target.value)})}
                    className="flex-grow"
                  />
                  <span className="ml-2 w-10 text-right">{initiativeForm.progress}%</span>
                </div>
                <input
                  type="number"
                  placeholder="Budget ($)"
                  value={initiativeForm.budget}
                  onChange={(e) => setInitiativeForm({...initiativeForm, budget: parseInt(e.target.value)})}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="date"
                  value={initiativeForm.startDate}
                  onChange={(e) => setInitiativeForm({...initiativeForm, startDate: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="date"
                  value={initiativeForm.targetDate}
                  onChange={(e) => setInitiativeForm({...initiativeForm, targetDate: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <div className="col-span-2 grid grid-cols-3 gap-2 text-xs">
                  {['carbonReduction', 'wasteElimination', 'costSavings'].map((key, idx) => (
                    <div key={idx}>
                      <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')} (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={initiativeForm.expectedImpact[key]}
                        onChange={(e) => setInitiativeForm({
                          ...initiativeForm,
                          expectedImpact: { ...initiativeForm.expectedImpact, [key]: parseInt(e.target.value) },
                        })}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={() => {
                    setIsAddInitiativeOpen(false);
                    setIsEditInitiativeOpen(false);
                    resetInitiativeForm();
                  }}
                  className="px-4 py-2 border rounded-full hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleEditInitiative : handleAddInitiative}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  {isEditing ? 'Update' : 'Add'} Initiative
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  

  const renderMetricsChartModal = () => (
    <AnimatePresence>
      {isMetricsChartOpen && (
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
            className="bg-white rounded-xl p-8 w-full max-w-3xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sustainability Metrics Overview</h2>
              <button 
                onClick={() => setIsMetricsChartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={metricsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
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
            <Leaf className="mr-4 text-green-600" /> Sustainability Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetInitiativeForm();
              setIsAddInitiativeOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center"
          >
            <Plus className="mr-2" /> Add Initiative
          </motion.button>
        </header>

        {/* System Overview Cards */}
        {renderSustainabilityMetrics()}

        {/* Visualization Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {renderTrendAnalysis()}
          {renderImpactDistribution()}
          {renderGoalProgressChart()}
          {renderCombinedEffect()}
        </motion.div>

        {/* Goals and Impact Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            {renderSustainabilityGoals()}
          </div>
          <div className="md:col-span-2">
            {/* Initiatives Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="mr-3 text-green-600" /> Sustainability Initiatives
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search initiatives..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-full w-64"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  </div>
                  <select 
                    value={initiativeFilter.status}
                    onChange={(e) => setInitiativeFilter({...initiativeFilter, status: e.target.value})}
                    className="px-4 py-2 border rounded-full"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
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
              </div>

              {viewMode === 'grid' ? renderInitiativesGrid() : renderInitiativesList()}
            </div>
          </div>
        </div>

        {/* Modals */}
        {renderInitiativeDetailModal()}
        {renderInitiativeModal()}
        {renderMetricsChartModal()}
      </div>
    </motion.div>
  );
}

export default SustainabilityTracker;