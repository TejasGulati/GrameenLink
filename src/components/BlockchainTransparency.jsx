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
  Database,
  HardDrive,
  Link
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import Web3 from 'web3';
import { toast } from 'react-hot-toast';

// Initialize Web3 with Ganache
const ganacheUrl = 'http://127.0.0.1:8545'; // Default Ganache URL
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

// Utility function to shorten Ethereum addresses
const shortenAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// BigInt serialization fix
BigInt.prototype.toJSON = function() { return this.toString() };

// LocalStorage keys
const STORAGE_KEYS = {
  TRANSACTIONS: 'blockchain_transactions',
  ACCOUNTS: 'blockchain_accounts',
  CURRENT_ACCOUNT: 'blockchain_current_account',
  NETWORK_ID: 'blockchain_network_id',
  VIEW_MODE: 'blockchain_view_mode',
  SORT_CONFIG: 'blockchain_sort_config',
  FILTER: 'blockchain_filter'
};

function BlockchainTransparency() {
  // Load initial state from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [transactions, setTransactions] = useState(
    loadFromStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );
  const [accounts, setAccounts] = useState(
    loadFromStorage(STORAGE_KEYS.ACCOUNTS, [])
  );
  const [currentAccount, setCurrentAccount] = useState(
    loadFromStorage(STORAGE_KEYS.CURRENT_ACCOUNT, '')
  );
  const [isConnected, setIsConnected] = useState(false);
  const [networkId, setNetworkId] = useState(
    loadFromStorage(STORAGE_KEYS.NETWORK_ID, null)
  );

  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 0,
    totalTransactionValue: 0,
    completedTransactions: 0,
    pendingTransactions: 0,
    verifiedTransactions: 0,
    avgTransactionValue: 0,
    ethBalance: 0
  });

  const [viewMode, setViewMode] = useState(
    loadFromStorage(STORAGE_KEYS.VIEW_MODE, 'grid')
  );
  const [sortConfig, setSortConfig] = useState(
    loadFromStorage(STORAGE_KEYS.SORT_CONFIG, { key: 'date', direction: 'desc' })
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(
    loadFromStorage(STORAGE_KEYS.FILTER, 'All')
  );
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    status: 'Pending',
    ethAmount: 0 // New field for ETH transactions
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Save to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ACCOUNT, JSON.stringify(currentAccount));
  }, [currentAccount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NETWORK_ID, JSON.stringify(networkId));
  }, [networkId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, JSON.stringify(viewMode));
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT_CONFIG, JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FILTER, JSON.stringify(filter));
  }, [filter]);

  // Connect to Ganache and load initial data
  useEffect(() => {
    const connectToGanache = async () => {
      try {
        // Check if Ganache is running
        const id = await web3.eth.net.getId();
        setNetworkId(id);
        
        // Get accounts from Ganache
        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
        setCurrentAccount(accs[0]); // Use first account by default
        setIsConnected(true);
        
        // Load initial transactions (only if localStorage is empty)
        if (transactions.length === 0) {
          await loadInitialTransactions();
        }
        
        // Load initial ETH balance
        await updateEthBalance(accs[0]);
        
        toast.success('Connected to Ganache blockchain!');
      } catch (error) {
        console.error('Error connecting to Ganache:', error);
        toast.error('Failed to connect to Ganache. Make sure it\'s running on port 8545.');
        
        // Fallback to mock data if Ganache isn't available and localStorage is empty
        if (transactions.length === 0) {
          setTransactions([
            {
              id: 'BC-001',
              type: 'Agricultural Supply',
              amount: 75000,
              date: '2024-03-20',
              status: 'Completed',
              sender: '0xA23B...4C9D',
              recipient: '0xF45G...7H8I',
              category: 'Seeds',
              verified: true,
              txHash: '0x123...abc',
              isEthereumTx: false
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
              verified: false,
              txHash: '0x456...def',
              isEthereumTx: true
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    connectToGanache();
  }, []);

  const loadInitialTransactions = async () => {
    // In a real app, you would query smart contract events here
    // For demo purposes, we'll use mock data but mark some as Ethereum transactions
    const mockTransactions = [
      {
        id: 'BC-001',
        type: 'Agricultural Supply',
        amount: 75000,
        date: '2024-03-20',
        status: 'Completed',
        sender: accounts[0] || '0xA23B...4C9D',
        recipient: accounts[1] || '0xF45G...7H8I',
        category: 'Seeds',
        verified: true,
        txHash: '0x123...abc',
        isEthereumTx: false
      },
      {
        id: 'BC-002',
        type: 'Medical Supplies',
        amount: 95000,
        date: '2024-03-15',
        status: 'In Progress',
        sender: accounts[1] || '0xJ12K...3L4M',
        recipient: accounts[2] || '0xN56O...7P8Q',
        category: 'Medical',
        verified: false,
        txHash: '0x456...def',
        isEthereumTx: true
      }
    ];
    setTransactions(mockTransactions);
  };

  const updateEthBalance = async (account) => {
    if (!account) return;
    try {
      const balance = await web3.eth.getBalance(account);
      setBlockchainStats(prev => ({
        ...prev,
        ethBalance: web3.utils.fromWei(balance.toString(), 'ether')
      }));
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
    }
  };

  // Calculate blockchain stats and chart data
  useEffect(() => {
    const calculateBlockchainStats = () => {
      const totalTransactions = transactions.length;
      const totalTransactionValue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const completedTransactions = transactions.filter(tx => tx.status === 'Completed').length;
      const pendingTransactions = transactions.filter(tx => tx.status === 'In Progress').length;
      const verifiedTransactions = transactions.filter(tx => tx.verified).length;
      const avgTransactionValue = totalTransactions > 0 ? totalTransactionValue / totalTransactions : 0;
      const ethereumTransactions = transactions.filter(tx => tx.isEthereumTx).length;

      setBlockchainStats(prev => ({
        ...prev,
        totalTransactions,
        totalTransactionValue: Math.round(totalTransactionValue),
        completedTransactions,
        pendingTransactions,
        verifiedTransactions,
        avgTransactionValue: Math.round(avgTransactionValue),
        ethereumTransactions
      }));

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
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txHash?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleCreateTransaction = async () => {
    if (!newTransaction.type || !newTransaction.recipient || !newTransaction.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let txHash = '';
      let isEthereumTx = false;
      
      // If ETH amount is specified, create an Ethereum transaction
      if (newTransaction.ethAmount > 0 && isConnected) {
        isEthereumTx = true;
        const amountInWei = web3.utils.toWei(newTransaction.ethAmount.toString(), 'ether');
        
        const receipt = await web3.eth.sendTransaction({
          from: currentAccount,
          to: newTransaction.recipient,
          value: amountInWei
        });
        
        txHash = receipt.transactionHash;
        toast.success(`ETH Transaction successful! Hash: ${shortenAddress(txHash)}`);
        
        // Update ETH balance after transaction
        await updateEthBalance(currentAccount);
      }

      const transactionToAdd = {
        id: `BC-${(transactions.length + 1).toString().padStart(3, '0')}`,
        ...newTransaction,
        date: new Date().toISOString().split('T')[0],
        verified: false,
        txHash,
        isEthereumTx
      };

      setTransactions([...transactions, transactionToAdd]);
      setIsCreateTransactionOpen(false);
      setNewTransaction({
        type: '',
        amount: 0,
        sender: currentAccount || '',
        recipient: '',
        category: '',
        status: 'Pending',
        ethAmount: 0
      });
      
      toast.success('Transaction created successfully!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error(`Failed to create transaction: ${error.message}`);
    }
  };

  const handleUpdateTransaction = () => {
    if (!selectedTransaction.type || !selectedTransaction.recipient || !selectedTransaction.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedTransactions = transactions.map(tx => 
      tx.id === selectedTransaction.id ? selectedTransaction : tx
    );

    setTransactions(updatedTransactions);
    setIsCreateTransactionOpen(false);
    setSelectedTransaction(null);
    setEditMode(false);
    toast.success('Transaction updated successfully!');
  };

  const verifyTransaction = async (txId) => {
    try {
      // In a real app, you would verify against the blockchain
      // For demo, we'll just mark it as verified
      const updatedTransactions = transactions.map(tx => 
        tx.id === txId ? { ...tx, verified: true } : tx
      );
      
      setTransactions(updatedTransactions);
      toast.success('Transaction verified successfully!');
    } catch (error) {
      console.error('Error verifying transaction:', error);
      toast.error('Failed to verify transaction');
    }
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

      {/* Blockchain Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <HardDrive className="mr-2 text-blue-600" /> Blockchain Network
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Network Status:</span>
            <span className={`font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected to Ganache' : 'Not Connected'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Network ID:</span>
            <span className="font-semibold">{networkId || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Account:</span>
            <span className="font-mono text-sm">
              {currentAccount ? shortenAddress(currentAccount) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">ETH Balance:</span>
            <span className="font-semibold">
              {blockchainStats.ethBalance ? `${blockchainStats.ethBalance} ETH` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ethereum Transactions:</span>
            <span className="font-semibold">
              {blockchainStats.ethereumTransactions || 0}
            </span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-800">Why Ganache for Rural Areas?</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Offline-capable blockchain for areas with poor internet</li>
            <li>No transaction fees compared to main Ethereum network</li>
            <li>Fast transaction processing (instant confirmations)</li>
            <li>Easy to set up and maintain with minimal infrastructure</li>
            <li>Provides full transparency while keeping data private</li>
          </ul>
        </div>
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
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return viewMode === 'grid' ? (
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTransactions.map((tx) => (
          <motion.div 
            key={tx.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all ${
              tx.isEthereumTx ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{tx.type}</h3>
              <div className="flex items-center space-x-2">
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
                {tx.isEthereumTx && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center">
                    <Link className="mr-1" size={12} /> ETH
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <strong>Amount:</strong> ₹{tx.amount.toLocaleString()}
              </div>
              {tx.isEthereumTx && tx.ethAmount > 0 && (
                <div className="flex justify-between">
                  <strong>ETH Amount:</strong> {tx.ethAmount} ETH
                </div>
              )}
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
                  <div className="flex items-center">
                    <Lock className="text-gray-500" size={18} />
                    {!tx.verified && (
                      <button 
                        onClick={() => verifyTransaction(tx.id)}
                        className="ml-2 text-xs text-blue-600 hover:underline"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                )}
              </div>
              {tx.txHash && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <strong className="mr-2">Tx Hash:</strong>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 font-mono">
                        {shortenAddress(tx.txHash)}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(tx.txHash);
                          toast.success('Transaction hash copied!');
                        }}
                        className="ml-2 text-gray-500 hover:text-blue-600"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <strong className="mr-2">Sender:</strong>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 font-mono">
                      {shortenAddress(tx.sender)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(tx.sender);
                        toast.success('Address copied!');
                      }}
                      className="ml-2 text-gray-500 hover:text-blue-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">Recipient:</strong>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 font-mono">
                      {shortenAddress(tx.recipient)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(tx.recipient);
                        toast.success('Address copied!');
                      }}
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
                    toast.success('Transaction deleted');
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
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Type', 'Amount', 'ETH', 'Category', 'Status', 'Date', 'Verified', 'Actions'].map((header) => (
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
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{tx.id}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    {tx.type}
                    {tx.isEthereumTx && (
                      <span className="ml-2 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center">
                        <Link className="mr-1" size={12} /> ETH
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">₹{tx.amount.toLocaleString()}</td>
                <td className="p-3">{tx.ethAmount > 0 ? `${tx.ethAmount} ETH` : '-'}</td>
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
                <td className="p-3">
                  {tx.verified ? (
                    <CheckCircle className="text-green-600" size={18} />
                  ) : (
                    <div className="flex items-center">
                      <Lock className="text-gray-500" size={18} />
                      {!tx.verified && (
                        <button 
                          onClick={() => verifyTransaction(tx.id)}
                          className="ml-2 text-xs text-blue-600 hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  )}
                </td>
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
                      toast.success('Transaction deleted');
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
      </div>
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
            className="bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editMode ? 'Edit Transaction' : 'Create New Transaction'}
              </h2>
              <button 
                onClick={() => {
                  setIsCreateTransactionOpen(false);
                  setEditMode(false);
                  setSelectedTransaction(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type*</label>
                <input 
                  type="text"
                  placeholder="e.g. Agricultural Supply"
                  value={editMode ? selectedTransaction.type : newTransaction.type}
                  onChange={(e) => editMode 
                    ? setSelectedTransaction({...selectedTransaction, type: e.target.value})
                    : setNewTransaction({...newTransaction, type: e.target.value})
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                  <option value="Education">Education</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)*</label>
                <input 
                  type="number"
                  placeholder="Transaction Amount in INR"
                  value={editMode ? selectedTransaction.amount : newTransaction.amount}
                  onChange={(e) => editMode 
                    ? setSelectedTransaction({...selectedTransaction, amount: Number(e.target.value)})
                    : setNewTransaction({...newTransaction, amount: Number(e.target.value)})
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              {isConnected && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ETH Amount (optional)
                    <span className="text-xs text-gray-500 ml-1">Current balance: {blockchainStats.ethBalance} ETH</span>
                  </label>
                  <input 
                    type="number"
                    step="0.01"
                    placeholder="ETH amount to send (0 for no ETH transfer)"
                    value={editMode ? (selectedTransaction.ethAmount || 0) : newTransaction.ethAmount}
                    onChange={(e) => editMode 
                      ? setSelectedTransaction({...selectedTransaction, ethAmount: Number(e.target.value)})
                      : setNewTransaction({...newTransaction, ethAmount: Number(e.target.value)})
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sender Address</label>
                <input 
                  type="text"
                  placeholder="Sender wallet address"
                  value={editMode ? selectedTransaction.sender : (newTransaction.sender || currentAccount || '')}
                  onChange={(e) => editMode 
                    ? setSelectedTransaction({...selectedTransaction, sender: e.target.value})
                    : setNewTransaction({...newTransaction, sender: e.target.value})
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address*</label>
                <input 
                  type="text"
                  placeholder="Recipient wallet address"
                  value={editMode ? selectedTransaction.recipient : newTransaction.recipient}
                  onChange={(e) => editMode 
                    ? setSelectedTransaction({...selectedTransaction, recipient: e.target.value})
                    : setNewTransaction({...newTransaction, recipient: e.target.value})
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Connected to Ganache</span>
              </div>
            ) : (
              <div className="flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Not Connected</span>
              </div>
            )}
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