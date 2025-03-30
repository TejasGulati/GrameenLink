import React, { useState, useEffect, useMemo } from 'react';
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
  X,
  Search,
  Grid,
  List,
  BarChart2,
  PieChart as PieChartIcon,
  Users,
  Sun,
  Droplet,
  Shield,
  DollarSign,
  Heart,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useMediaQuery } from 'react-responsive';

// Error boundary for charts
class ChartErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chart Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 text-sm">
          <AlertTriangle className="inline mr-2" />
          Chart failed to load. Please try again.
        </div>
      );
    }
    return this.props.children;
  }
}

const SustainabilityTracker = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  
  // Enhanced initial data with rural impact metrics
  const initialSustainabilityTrends = [
    { month: 'Jan', carbon: 1450, waste: 320, energy: 2800, ruralJobs: 12, localSupply: 35 },
    { month: 'Feb', carbon: 1320, waste: 290, energy: 2650, ruralJobs: 15, localSupply: 42 },
    { month: 'Mar', carbon: 1245, waste: 260, energy: 2500, ruralJobs: 18, localSupply: 50 },
    { month: 'Apr', carbon: 1180, waste: 240, energy: 2350, ruralJobs: 22, localSupply: 58 },
    { month: 'May', carbon: 1100, waste: 210, energy: 2200, ruralJobs: 25, localSupply: 65 },
    { month: 'Jun', carbon: 1050, waste: 190, energy: 2100, ruralJobs: 30, localSupply: 72 }
  ];

  // Load data from localStorage or use initial data
  const loadData = (key, initialData) => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialData;
    }
  };

  // Save data to localStorage
  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Initialize state with localStorage data
  const [sustainabilityMetrics, setSustainabilityMetrics] = useState(
    loadData('sustainabilityMetrics', {
      carbonFootprint: 1245,
      wasteRecycled: 456,
      packagingReduction: 38,
      energyEfficiency: 67,
      transportEmissions: 210,
      waterConservation: 890,
      renewableEnergyUsage: 42,
      ruralEmployment: 30,
      localSourcing: 72,
      communityProjects: 5,
      avgCarbonReduction: 0
    })
  );
  
  const [sustainabilityTrends, setSustainabilityTrends] = useState(
    loadData('sustainabilityTrends', initialSustainabilityTrends)
  );
  
  const [sustainabilityInitiatives, setSustainabilityInitiatives] = useState(
    loadData('sustainabilityInitiatives', [
      {
        id: 'SI-001',
        title: 'Biodegradable Packaging',
        description: 'Transition to compostable packaging materials sourced from agricultural waste, creating rural jobs',
        status: 'In Progress',
        progress: 65,
        startDate: '2024-01-15',
        targetDate: '2024-12-31',
        budget: 50000,
        teamMembers: ['Alice Rodriguez', 'Bob Chen'],
        risks: ['Supply chain disruption', 'Material compatibility'],
        category: 'Waste Reduction',
        ruralImpact: { jobsCreated: 15, farmsSupported: 8, communitiesImpacted: 3 },
        expectedImpact: { carbonReduction: 25, wasteElimination: 40, costSavings: 15, revenueIncrease: 10 }
      },
      {
        id: 'SI-002', 
        title: 'Waste Monetization',
        description: 'Convert agricultural waste into valuable resources through advanced recycling, empowering rural economies',
        status: 'Planned',
        progress: 30,
        startDate: '2024-03-01',
        targetDate: '2025-06-30',
        budget: 75000,
        teamMembers: ['Charlie Kumar', 'David Patel'],
        risks: ['Technology adaptation', 'Initial investment'],
        category: 'Circular Economy',
        ruralImpact: { jobsCreated: 25, farmsSupported: 12, communitiesImpacted: 5 },
        expectedImpact: { carbonReduction: 35, wasteElimination: 55, costSavings: 25, revenueIncrease: 18 }
      },
      {
        id: 'SI-003',
        title: 'Rural Solar Microgrids',
        description: 'Install renewable energy microgrids in underserved rural communities',
        status: 'Completed',
        progress: 100,
        startDate: '2023-06-01',
        targetDate: '2023-12-15',
        budget: 120000,
        teamMembers: ['Eva Johnson', 'Frank Liu'],
        risks: ['Regulatory approval', 'Community adoption'],
        category: 'Energy',
        ruralImpact: { jobsCreated: 42, farmsSupported: 0, communitiesImpacted: 8 },
        expectedImpact: { carbonReduction: 60, wasteElimination: 5, costSavings: 40, revenueIncrease: 15 }
      }
    ])
  );

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData('sustainabilityMetrics', sustainabilityMetrics);
  }, [sustainabilityMetrics]);

  useEffect(() => {
    saveData('sustainabilityTrends', sustainabilityTrends);
  }, [sustainabilityTrends]);

  useEffect(() => {
    saveData('sustainabilityInitiatives', sustainabilityInitiatives);
  }, [sustainabilityInitiatives]);

  const [initiativeFilter, setInitiativeFilter] = useState({ status: 'All', category: 'All' });
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [isAddInitiativeOpen, setIsAddInitiativeOpen] = useState(false);
  const [isEditInitiativeOpen, setIsEditInitiativeOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(isMobile ? 'list' : 'grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

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
    ruralImpact: { jobsCreated: 0, farmsSupported: 0, communitiesImpacted: 0 },
    expectedImpact: { carbonReduction: 0, wasteElimination: 0, costSavings: 0, revenueIncrease: 0 }
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Comparison data: Traditional vs Sustainable methods
  const comparisonData = [
    { category: 'Packaging', traditional: { cost: 100, carbon: 85, ruralImpact: 2 }, sustainable: { cost: 90, carbon: 30, ruralImpact: 8 } },
    { category: 'Energy', traditional: { cost: 120, carbon: 95, ruralImpact: 1 }, sustainable: { cost: 80, carbon: 15, ruralImpact: 15 } },
    { category: 'Waste Mgmt', traditional: { cost: 75, carbon: 65, ruralImpact: 3 }, sustainable: { cost: 60, carbon: 20, ruralImpact: 12 } },
    { category: 'Transport', traditional: { cost: 110, carbon: 90, ruralImpact: 0 }, sustainable: { cost: 95, carbon: 40, ruralImpact: 6 } }
  ];

  // Rural impact metrics
  const ruralImpactData = [
    { subject: 'Jobs Created', A: 30, fullMark: 50 },
    { subject: 'Local Sourcing', A: 72, fullMark: 100 },
    { subject: 'Farm Support', A: 20, fullMark: 50 },
    { subject: 'Community Projects', A: 5, fullMark: 10 },
    { subject: 'Skill Development', A: 15, fullMark: 30 }
  ];

  useEffect(() => {
    const calculateMetrics = () => {
      try {
        const avgCarbonReduction = sustainabilityTrends.length > 0 
          ? (sustainabilityTrends[0].carbon - sustainabilityTrends[sustainabilityTrends.length - 1].carbon) / 
            (sustainabilityTrends.length - 1)
          : 0;

        const totalRuralJobs = sustainabilityInitiatives.reduce(
          (sum, initiative) => sum + (initiative.ruralImpact?.jobsCreated || 0), 0
        );

        const totalCommunitiesImpacted = sustainabilityInitiatives.reduce(
          (sum, initiative) => sum + (initiative.ruralImpact?.communitiesImpacted || 0), 0
        );

        setSustainabilityMetrics(prev => ({
          ...prev,
          carbonFootprint: isNaN(prev.carbonFootprint) ? 0 : prev.carbonFootprint,
          wasteRecycled: isNaN(prev.wasteRecycled) ? 0 : prev.wasteRecycled,
          ruralEmployment: totalRuralJobs,
          communityProjects: totalCommunitiesImpacted,
          avgCarbonReduction: isNaN(avgCarbonReduction) ? 0 : Math.abs(avgCarbonReduction.toFixed(1))
        }));
      } catch (error) {
        console.error("Error calculating sustainability metrics:", error);
      }
    };
  
    calculateMetrics();
  }, [sustainabilityTrends, sustainabilityInitiatives]);

  const filteredInitiatives = useMemo(() => {
    return sustainabilityInitiatives.filter(initiative => 
      (initiativeFilter.status === 'All' || initiative.status === initiativeFilter.status) &&
      (initiativeFilter.category === 'All' || initiative.category === initiativeFilter.category) &&
      (initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sustainabilityInitiatives, initiativeFilter, searchTerm]);

  const handleAddInitiative = () => {
    if (!initiativeForm.title || !initiativeForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newInitiative = {
      id: `SI-${Date.now()}`,
      ...initiativeForm,
      startDate: initiativeForm.startDate || new Date().toISOString().split('T')[0],
      targetDate: initiativeForm.targetDate || 
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    };

    setSustainabilityInitiatives(prev => [...prev, newInitiative]);
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
      ruralImpact: { jobsCreated: 0, farmsSupported: 0, communitiesImpacted: 0 },
      expectedImpact: { carbonReduction: 0, wasteElimination: 0, costSavings: 0, revenueIncrease: 0 }
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

  // Component rendering functions
  const renderMetricsCards = () => {
    const metrics = [
      { 
        name: 'carbonFootprint', 
        label: 'Carbon Footprint', 
        value: sustainabilityMetrics.carbonFootprint, 
        unit: 'kg', 
        icon: <Factory size={20} />,
        trend: sustainabilityMetrics.avgCarbonReduction > 0 ? 'down' : 'up'
      },
      { 
        name: 'wasteRecycled', 
        label: 'Waste Recycled', 
        value: sustainabilityMetrics.wasteRecycled, 
        unit: 'kg', 
        icon: <Recycle size={20} />,
        trend: 'up'
      },
      { 
        name: 'energyEfficiency', 
        label: 'Energy Efficiency', 
        value: sustainabilityMetrics.energyEfficiency, 
        unit: '%', 
        icon: <TreePine size={20} />,
        trend: 'up'
      },
      { 
        name: 'ruralEmployment', 
        label: 'Rural Jobs', 
        value: sustainabilityMetrics.ruralEmployment, 
        unit: '', 
        icon: <Users size={20} />,
        trend: 'up'
      }
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <motion.div 
            key={metric.name}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gray-100 text-green-600">
                {metric.icon}
              </div>
              {metric.trend === 'up' ? (
                <TrendingUp className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              {metric.label}
            </h3>
            <div className="text-3xl font-bold text-gray-900">
              {metric.value} {metric.unit && <span className="text-sm font-normal text-gray-500">{metric.unit}</span>}
            </div>
            {metric.name === 'carbonFootprint' && (
              <div className="text-sm text-gray-500 mt-1">
                Avg reduction: {sustainabilityMetrics.avgCarbonReduction} kg/month
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderGoals = () => {
    const goals = [
      { name: 'Carbon Reduction', current: 25, target: 50, icon: <Factory size={16} />, color: 'bg-red-500' },
      { name: 'Waste Recycling', current: 45, target: 80, icon: <Recycle size={16} />, color: 'bg-blue-500' },
      { name: 'Renewable Energy', current: 40, target: 100, icon: <Sun size={16} />, color: 'bg-green-500' },
      { name: 'Rural Employment', current: sustainabilityMetrics.ruralEmployment, target: 100, icon: <Users size={16} />, color: 'bg-purple-500' }
    ];

    return (
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Target size={20} className="mr-2 text-green-600" /> Sustainability Goals
        </h2>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`p-1.5 mr-3 rounded-full ${goal.color} text-white`}>
                    {goal.icon}
                  </div>
                  <span className="font-medium">{goal.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {goal.current}/{goal.target}{goal.name === 'Rural Employment' ? ' jobs' : '%'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${goal.color}`} 
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrendChart = () => (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp size={18} className="mr-2 text-blue-600" /> Monthly Trends
      </h3>
      <div className="h-64">
        <ChartErrorBoundary>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sustainabilityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="carbon" name="Carbon (kg)" stroke="#8884d8" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="waste" name="Waste (kg)" stroke="#82ca9d" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="ruralJobs" name="Rural Jobs" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartErrorBoundary>
      </div>
    </div>
  );

  const renderImpactRadar = () => (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Home size={18} className="mr-2 text-green-600" /> Rural Impact
      </h3>
      <div className="h-64">
        <ChartErrorBoundary>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={ruralImpactData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} />
              <Radar name="Impact" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartErrorBoundary>
      </div>
    </div>
  );

  const renderComparisonChart = () => (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BarChart2 size={18} className="mr-2 text-blue-600" /> Traditional vs Sustainable
      </h3>
      <div className="h-64">
        <ChartErrorBoundary>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="traditional.cost" name="Traditional Cost" fill="#8884d8" />
              <Bar dataKey="sustainable.cost" name="Sustainable Cost" fill="#82ca9d" />
              <Bar dataKey="traditional.ruralImpact" name="Traditional Rural Impact" fill="#ffc658" />
              <Bar dataKey="sustainable.ruralImpact" name="Sustainable Rural Impact" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </ChartErrorBoundary>
      </div>
    </div>
  );

  const renderInitiativesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredInitiatives.map((initiative) => (
        <motion.div
          key={initiative.id}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 cursor-pointer"
          onClick={() => openDetailModal(initiative)}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold line-clamp-1">{initiative.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              initiative.status === 'Completed' ? 'bg-green-100 text-green-800' :
              initiative.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {initiative.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{initiative.description}</p>
          
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center text-gray-500">
              <Users size={14} className="mr-1" />
              <span>{initiative.ruralImpact.jobsCreated} jobs</span>
            </div>
            <div className="flex items-center text-gray-500">
              <DollarSign size={14} className="mr-1" />
              <span>${initiative.budget.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="h-2 rounded-full bg-green-500" 
              style={{ width: `${initiative.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{initiative.startDate}</span>
            <span>{initiative.progress}%</span>
            <span>{initiative.targetDate}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderInitiativeDetailModal = () => (
    <AnimatePresence>
      {isDetailModalOpen && selectedInitiative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedInitiative.title}</h2>
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedInitiative.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  selectedInitiative.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedInitiative.status}
                </span>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
                  {selectedInitiative.category}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{selectedInitiative.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800 border-b pb-2">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{selectedInitiative.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Date</p>
                      <p className="font-medium">{selectedInitiative.targetDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">${selectedInitiative.budget.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-800 border-b pb-2">Progress</h3>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="h-2.5 rounded-full bg-green-500" 
                        style={{ width: `${selectedInitiative.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-right">{selectedInitiative.progress}% complete</p>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInitiative.teamMembers.map((member, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800 border-b pb-2">Rural Impact</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-600">Jobs Created</p>
                      <p className="text-xl font-bold text-green-600">
                        {selectedInitiative.ruralImpact.jobsCreated}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-600">Farms Supported</p>
                      <p className="text-xl font-bold text-blue-600">
                        {selectedInitiative.ruralImpact.farmsSupported}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-600">Communities</p>
                      <p className="text-xl font-bold text-purple-600">
                        {selectedInitiative.ruralImpact.communitiesImpacted}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-800 border-b pb-2">Expected Impact</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Carbon Reduction</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {selectedInitiative.expectedImpact.carbonReduction}%
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Waste Elimination</p>
                      <p className="text-lg font-bold text-red-600">
                        {selectedInitiative.expectedImpact.wasteElimination}%
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Cost Savings</p>
                      <p className="text-lg font-bold text-green-600">
                        {selectedInitiative.expectedImpact.costSavings}%
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Revenue Increase</p>
                      <p className="text-lg font-bold text-blue-600">
                        {selectedInitiative.expectedImpact.revenueIncrease}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-800 border-b pb-2">Potential Risks</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {selectedInitiative.risks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    openEditModal(selectedInitiative);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Edit size={16} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderInitiativeFormModal = () => {
    const isEditing = isEditInitiativeOpen;
    const title = isEditing ? 'Edit Initiative' : 'Add New Initiative';

    return (
      <AnimatePresence>
        {(isAddInitiativeOpen || isEditInitiativeOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <button 
                    onClick={() => {
                      setIsAddInitiativeOpen(false);
                      setIsEditInitiativeOpen(false);
                      resetInitiativeForm();
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                    <input
                      type="text"
                      value={initiativeForm.title}
                      onChange={(e) => setInitiativeForm({...initiativeForm, title: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Initiative title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                    <textarea
                      value={initiativeForm.description}
                      onChange={(e) => setInitiativeForm({...initiativeForm, description: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                      placeholder="Detailed description of the initiative"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={initiativeForm.status}
                        onChange={(e) => setInitiativeForm({...initiativeForm, status: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={initiativeForm.category}
                        onChange={(e) => setInitiativeForm({...initiativeForm, category: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select category</option>
                        <option value="Waste Reduction">Waste Reduction</option>
                        <option value="Energy Efficiency">Energy Efficiency</option>
                        <option value="Rural Development">Rural Development</option>
                        <option value="Circular Economy">Circular Economy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={initiativeForm.progress}
                        onChange={(e) => setInitiativeForm({...initiativeForm, progress: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <span className="text-sm w-10">{initiativeForm.progress}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={initiativeForm.startDate}
                        onChange={(e) => setInitiativeForm({...initiativeForm, startDate: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                      <input
                        type="date"
                        value={initiativeForm.targetDate}
                        onChange={(e) => setInitiativeForm({...initiativeForm, targetDate: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                    <input
                      type="number"
                      value={initiativeForm.budget}
                      onChange={(e) => setInitiativeForm({...initiativeForm, budget: parseInt(e.target.value || 0)})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Budget amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (comma separated)</label>
                    <input
                      type="text"
                      value={initiativeForm.teamMembers.join(', ')}
                      onChange={(e) => setInitiativeForm({
                        ...initiativeForm,
                        teamMembers: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="John Doe, Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Potential Risks (comma separated)</label>
                    <input
                      type="text"
                      value={initiativeForm.risks.join(', ')}
                      onChange={(e) => setInitiativeForm({
                        ...initiativeForm,
                        risks: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Supply issues, Regulatory hurdles"
                    />
                  </div>

                  <div className="pt-2">
                    <h3 className="font-medium text-gray-800 mb-2">Rural Impact</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Jobs Created</label>
                        <input
                          type="number"
                          min="0"
                          value={initiativeForm.ruralImpact.jobsCreated}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            ruralImpact: {
                              ...initiativeForm.ruralImpact,
                              jobsCreated: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Farms Supported</label>
                        <input
                          type="number"
                          min="0"
                          value={initiativeForm.ruralImpact.farmsSupported}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            ruralImpact: {
                              ...initiativeForm.ruralImpact,
                              farmsSupported: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Communities</label>
                        <input
                          type="number"
                          min="0"
                          value={initiativeForm.ruralImpact.communitiesImpacted}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            ruralImpact: {
                              ...initiativeForm.ruralImpact,
                              communitiesImpacted: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="font-medium text-gray-800 mb-2">Expected Impact (%)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Carbon Reduction</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={initiativeForm.expectedImpact.carbonReduction}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            expectedImpact: {
                              ...initiativeForm.expectedImpact,
                              carbonReduction: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Waste Elimination</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={initiativeForm.expectedImpact.wasteElimination}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            expectedImpact: {
                              ...initiativeForm.expectedImpact,
                              wasteElimination: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Cost Savings</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={initiativeForm.expectedImpact.costSavings}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            expectedImpact: {
                              ...initiativeForm.expectedImpact,
                              costSavings: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Revenue Increase</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={initiativeForm.expectedImpact.revenueIncrease}
                          onChange={(e) => setInitiativeForm({
                            ...initiativeForm,
                            expectedImpact: {
                              ...initiativeForm.expectedImpact,
                              revenueIncrease: parseInt(e.target.value || 0)
                            }
                          })}
                          className="w-full p-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={() => {
                      setIsAddInitiativeOpen(false);
                      setIsEditInitiativeOpen(false);
                      resetInitiativeForm();
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isEditing ? handleEditInitiative : handleAddInitiative}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    {isEditing ? 'Update' : 'Add'} Initiative
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 p-6 mb-6">
<div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <Leaf className="mr-3 text-green-600" /> Sustainability Tracker
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor and manage your sustainable initiatives and their rural impact
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                resetInitiativeForm();
                setIsAddInitiativeOpen(true);
              }}
              className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Plus className="mr-2" /> Add Initiative
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('initiatives')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'initiatives' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Initiatives
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'impact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Impact Analysis
            </button>
          </div>
        </motion.div>

        {activeTab === 'overview' && (
          <>
            {renderMetricsCards()}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {renderTrendChart()}
              </div>
              <div>
                {renderGoals()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderImpactRadar()}
              {renderComparisonChart()}
            </div>
          </>
        )}

        {activeTab === 'initiatives' && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">All Initiatives</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <input 
                    type="text"
                    placeholder="Search initiatives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
                <select 
                  value={initiativeFilter.status}
                  onChange={(e) => setInitiativeFilter({...initiativeFilter, status: e.target.value})}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {filteredInitiatives.length > 0 ? (
              renderInitiativesGrid()
            ) : (
              <div className="text-center py-12">
                <Database className="mx-auto text-gray-400 mb-4" size={40} />
                <h3 className="text-lg font-medium text-gray-900">No initiatives found</h3>
                <p className="text-gray-500 mt-1">
                  {searchTerm ? 'Try a different search term' : 'Create your first initiative'}
                </p>
                <button
                  onClick={() => {
                    resetInitiativeForm();
                    setIsAddInitiativeOpen(true);
                  }}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center mx-auto"
                >
                  <Plus className="mr-2" /> Add Initiative
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Impact Comparison</h2>
              <div className="h-80">
                <ChartErrorBoundary>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="traditional.carbon" name="Traditional Carbon" fill="#8884d8" />
                      <Bar dataKey="sustainable.carbon" name="Sustainable Carbon" fill="#82ca9d" />
                      <Bar dataKey="traditional.ruralImpact" name="Traditional Rural Impact" fill="#ffc658" />
                      <Bar dataKey="sustainable.ruralImpact" name="Sustainable Rural Impact" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartErrorBoundary>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Profit vs Social Impact</h2>
              <div className="h-80">
                <ChartErrorBoundary>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" dataKey="profitImpact" name="Profit Impact" />
                      <YAxis type="number" dataKey="socialImpact" name="Social Impact" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter 
                        name="Initiatives" 
                        data={sustainabilityInitiatives.map(i => ({
                          name: i.title,
                          profitImpact: i.expectedImpact.costSavings + i.expectedImpact.revenueIncrease,
                          socialImpact: i.ruralImpact.jobsCreated * 2 + i.ruralImpact.communitiesImpacted * 5,
                          budget: i.budget / 1000
                        }))} 
                        fill="#8884d8" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartErrorBoundary>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderInitiativeDetailModal()}
      {renderInitiativeFormModal()}
    </div>
  );
};

export default SustainabilityTracker;