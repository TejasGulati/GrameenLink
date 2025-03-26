import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  List, 
  Grid, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Edit,
  Trash2,
  X,
  Copy,
  CheckCircle,
  BarChart2,
  PieChart as PieChartIcon,
  Layers,
  Cloud,
  ArrowUpRight,
  ArrowDownLeft,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

function BlockchainTransparency() {
  const [transactions, setTransactions] = useState([
    {
      id: 'BC-001',
      type: 'Agricultural Supply',
      amount: 75000,
      date: '2024-03-20',
      status: 'Completed',
      sender: '0xA23B...4C9D',
      recipient: '0xF45G...7H8I',
      category: 'Seeds',
      verified: true
    },
    {
      id: 'BC-002',
      type: 'Medical Supplies',
      amount: 95000,
      date: '2024-03-15',
      status: 'In Progress',
      sender: '0xJ12K...3L4M',
      recipient: '0xN56O...7P8Q',
      category: 'Medical',
      verified: false
    }
  ]);

  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 0,
    totalTransactionValue: 0,
    completedTransactions: 0,
    pendingTransactions: 0,
    verifiedTransactions: 0,
    avgTransactionValue: 0
  });

  const [viewMode, setViewMode] = useState('grid');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Chart data states
  const [transactionTypeData, setTransactionTypeData] = useState([]);
  const [transactionStatusData, setTransactionStatusData] = useState([]);
  const [categoryValueData, setCategoryValueData] = useState([]);
  const [verificationData, setVerificationData] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    type: '',
    amount: 0,
    sender: '',
    recipient: '',
    category: '',
    status: 'Pending'
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Calculate blockchain stats and chart data
  useEffect(() => {
    const calculateBlockchainStats = () => {
      const totalTransactions = transactions.length;
      const totalTransactionValue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const completedTransactions = transactions.filter(tx => tx.status === 'Completed').length;
      const pendingTransactions = transactions.filter(tx => tx.status === 'In Progress').length;
      const verifiedTransactions = transactions.filter(tx => tx.verified).length;
      const avgTransactionValue = totalTransactions > 0 ? totalTransactionValue / totalTransactions : 0;

      setBlockchainStats({
        totalTransactions,
        totalTransactionValue: Math.round(totalTransactionValue),
        completedTransactions,
        pendingTransactions,
        verifiedTransactions,
        avgTransactionValue: Math.round(avgTransactionValue)
      });

      // Transaction Type Distribution
      const typeDistribution = transactions.reduce((acc, tx) => {
        acc[tx.type] = (acc[tx.type] || 0) + 1;
        return acc;
      }, {});

      setTransactionTypeData(
        Object.entries(typeDistribution).map(([name, value]) => ({
          name, 
          value,
          percent: value / transactions.length
        }))
      );

      // Transaction Status Distribution
      const statusDistribution = transactions.reduce((acc, tx) => {
        acc[tx.status] = (acc[tx.status] || 0) + 1;
        return acc;
      }, {});

      setTransactionStatusData(
        Object.entries(statusDistribution).map(([name, value]) => ({
          name, 
          value,
          percent: value / transactions.length
        }))
      );

      // Category Value Distribution
      const categoryValue = transactions.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

      setCategoryValueData(
        Object.entries(categoryValue).map(([name, value]) => ({
          name,
          value: Math.round(value),
          percent: value / totalTransactionValue
        }))
      );

      // Verification Status
      const verifiedCount = transactions.filter(tx => tx.verified).length;
      const unverifiedCount = transactions.length - verifiedCount;
      setVerificationData([
        { name: 'Verified', value: verifiedCount },
        { name: 'Unverified', value: unverifiedCount }
      ]);
    };

    calculateBlockchainStats();
  }, [transactions]);

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(tx => 
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter !== 'All') {
      result = result.filter(tx => tx.status === filter);
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
  }, [transactions, searchTerm, filter, sortConfig]);

  const handleCreateTransaction = () => {
    if (!newTransaction.type || !newTransaction.recipient || !newTransaction.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const transactionToAdd = {
      id: `BC-${(transactions.length + 1).toString().padStart(3, '0')}`,
      ...newTransaction,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    setTransactions([...transactions, transactionToAdd]);
    setIsCreateTransactionOpen(false);
    setNewTransaction({
      type: '',
      amount: 0,
      sender: '',
      recipient: '',
      category: '',
      status: 'Pending'
    });
  };

  const handleUpdateTransaction = () => {
    if (!selectedTransaction.type || !selectedTransaction.recipient || !selectedTransaction.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedTransactions = transactions.map(tx => 
      tx.id === selectedTransaction.id ? selectedTransaction : tx
    );

    setTransactions(updatedTransactions);
    setIsCreateTransactionOpen(false);
    setSelectedTransaction(null);
    setEditMode(false);
  };

  // Render visualizations section
  const renderVisualizations = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid md:grid-cols-2 gap-8 mb-8"
    >
      {/* Transaction Type Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <PieChartIcon className="mr-2 text-blue-600" /> Transaction Types
        </h3>
        {transactionTypeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transactionTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {transactionTypeData.map((entry, index) => (
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
            No transaction data available
          </div>
        )}
      </div>

      {/* Transaction Status Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="mr-2 text-green-600" /> Transaction Status
        </h3>
        {transactionStatusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name, props) => [
                  value, 
                  `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                ]}
              />
              <Legend />
              <Bar dataKey="value" name="Transactions" fill="#8884d8">
                {transactionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No status data available
          </div>
        )}
      </div>

      {/* Category Value Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Layers className="mr-2 text-purple-600" /> Value by Category
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
                  `${name}: ${(props.payload.percent * 100).toFixed(1)}% of total`
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
            No category data available
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <ShieldCheck className="mr-2 text-blue-600" /> Verification Status
        </h3>
        {verificationData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={verificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {verificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : '#FF8042'} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  value, 
                  `${name}: ${Math.round((value / verificationData.reduce((a, b) => a + b.value, 0)) * 100)}%`
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No verification data available
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderTransactionView = () => {
    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTransactions.map((tx) => (
          <motion.div 
            key={tx.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{tx.type}</h3>
              <span 
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${tx.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}
              >
                {tx.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <strong>Amount:</strong> ₹{tx.amount.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <strong>Category:</strong> {tx.category}
              </div>
              <div className="flex justify-between items-center">
                <strong>Date:</strong> {tx.date}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <strong>Verified:</strong>
                {tx.verified ? (
                  <CheckCircle className="text-green-600" size={18} />
                ) : (
                  <Lock className="text-gray-500" size={18} />
                )}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <strong className="mr-2">Sender:</strong>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">{tx.sender}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(tx.sender)}
                      className="ml-2 text-gray-500 hover:text-blue-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">Recipient:</strong>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">{tx.recipient}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(tx.recipient)}
                      className="ml-2 text-gray-500 hover:text-blue-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setEditMode(true);
                    setIsCreateTransactionOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => {
                    const updatedTransactions = transactions.filter(item => item.id !== tx.id);
                    setTransactions(updatedTransactions);
                  }}
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
            {['ID', 'Type', 'Amount', 'Category', 'Status', 'Date', 'Actions'].map((header) => (
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
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3">{tx.id}</td>
              <td className="p-3">{tx.type}</td>
              <td className="p-3">₹{tx.amount.toLocaleString()}</td>
              <td className="p-3">{tx.category}</td>
              <td className="p-3">
                <span 
                  className={`
                    px-3 py-1 rounded-full text-xs
                    ${tx.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {tx.status}
                </span>
              </td>
              <td className="p-3">{tx.date}</td>
              <td className="p-3 flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setEditMode(true);
                    setIsCreateTransactionOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => {
                    const updatedTransactions = transactions.filter(item => item.id !== tx.id);
                    setTransactions(updatedTransactions);
                  }}
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

  // Create/Edit Transaction Modal
  const renderTransactionModal = () => (
    <AnimatePresence>
      {isCreateTransactionOpen && (
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
            <h2 className="text-2xl font-bold mb-6">
              {editMode ? 'Edit Transaction' : 'Create New Transaction'}
            </h2>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Transaction Type"
                value={editMode ? selectedTransaction.type : newTransaction.type}
                onChange={(e) => editMode 
                  ? setSelectedTransaction({...selectedTransaction, type: e.target.value})
                  : setNewTransaction({...newTransaction, type: e.target.value})
                }
                className="w-full p-2 border rounded-md"
              />
              <select 
                value={editMode ? selectedTransaction.category : newTransaction.category}
                onChange={(e) => editMode
                  ? setSelectedTransaction({...selectedTransaction, category: e.target.value})
                  : setNewTransaction({...newTransaction, category: e.target.value})
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Medical">Medical</option>
                <option value="Seeds">Seeds</option>
                <option value="FMCG">FMCG</option>
              </select>
              <input 
                type="number"
                placeholder="Transaction Amount"
                value={editMode ? selectedTransaction.amount : newTransaction.amount}
                onChange={(e) => editMode 
                  ? setSelectedTransaction({...selectedTransaction, amount: Number(e.target.value)})
                  : setNewTransaction({...newTransaction, amount: Number(e.target.value)})
                }
                className="w-full p-2 border rounded-md"
              />
              <input 
                type="text"
                placeholder="Sender Address"
                value={editMode ? selectedTransaction.sender : newTransaction.sender}
                onChange={(e) => editMode 
                  ? setSelectedTransaction({...selectedTransaction, sender: e.target.value})
                  : setNewTransaction({...newTransaction, sender: e.target.value})
                }
                className="w-full p-2 border rounded-md"
              />
              <input 
                type="text"
                placeholder="Recipient Address"
                value={editMode ? selectedTransaction.recipient : newTransaction.recipient}
                onChange={(e) => editMode 
                  ? setSelectedTransaction({...selectedTransaction, recipient: e.target.value})
                  : setNewTransaction({...newTransaction, recipient: e.target.value})
                }
                className="w-full p-2 border rounded-md"
              />
              <select 
                value={editMode ? selectedTransaction.status : newTransaction.status}
                onChange={(e) => editMode
                  ? setSelectedTransaction({...selectedTransaction, status: e.target.value})
                  : setNewTransaction({...newTransaction, status: e.target.value})
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => {
                  setIsCreateTransactionOpen(false);
                  setEditMode(false);
                  setSelectedTransaction(null);
                }}
                className="px-4 py-2 border rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={editMode ? handleUpdateTransaction : handleCreateTransaction}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                {editMode ? 'Update Transaction' : 'Create Transaction'}
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
            <ShieldCheck className="mr-4 text-blue-600" /> 
            Blockchain Transparency
          </h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditMode(false);
              setIsCreateTransactionOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="mr-2" /> Create Transaction
          </motion.button>
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
              <Database className="text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Transactions</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {blockchainStats.totalTransactions}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Total Value</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              ₹{blockchainStats.totalTransactionValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Completed</h3>
            </div>
            <div className="text-4xl font-bold text-green-800">
              {blockchainStats.completedTransactions}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Verified</h3>
            </div>
            <div className="text-4xl font-bold text-blue-800">
              {blockchainStats.verifiedTransactions}
            </div>
          </div>
        </motion.div>

        {/* Visualization Section */}
        {renderVisualizations()}

        {/* Transaction Management Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
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
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
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

          {/* Transaction View */}
          {renderTransactionView()}
        </div>

        {/* Transaction Modal */}
        {renderTransactionModal()}
      </div>
    </motion.div>
  );
}

export default BlockchainTransparency;