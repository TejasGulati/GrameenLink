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
  Link,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import Web3 from 'web3';
import { toast } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';

// Initialize Web3 with Ganache
const ganacheUrl = 'http://127.0.0.1:8545'; // Default Ganache URL
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

// Utility function to shorten Ethereum addresses
const shortenAddress = (address) => {
  if (!address) return 'N/A';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// BigInt serialization fix
if (typeof BigInt !== 'undefined') {
  BigInt.prototype.toJSON = function() { return this.toString() };
}

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  
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
    ethBalance: 0,
    ethereumTransactions: 0
  });

  const [viewMode, setViewMode] = useState(
    loadFromStorage(STORAGE_KEYS.VIEW_MODE, isMobile ? 'list' : 'grid')
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
    ethAmount: 0
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
          await loadInitialTransactions(accs);
        }
        
        // Load initial ETH balance
        await updateEthBalance(accs[0]);
        
        toast.success('Connected to Ganache blockchain!');
      } catch (error) {
        console.error('Error connecting to Ganache:', error);
        toast.error('Failed to connect to Ganache. Using demo data.');
        
        // Fallback to mock data if Ganache isn't available and localStorage is empty
        if (transactions.length === 0) {
          const mockAccounts = [
            '0xA23B4C9D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U',
            '0xF45G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z',
            '0xJ12K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D'
          ];
          
          setAccounts(mockAccounts);
          setCurrentAccount(mockAccounts[0]);
          
          setTransactions([
            {
              id: 'BC-001',
              type: 'Agricultural Supply',
              amount: 75000,
              date: '2024-03-20',
              status: 'Completed',
              sender: mockAccounts[0],
              recipient: mockAccounts[1],
              category: 'Seeds',
              verified: true,
              txHash: '0x123abc456def789ghi012jkl345mno678pqr901stu234vwx',
              isEthereumTx: false
            },
            {
              id: 'BC-002',
              type: 'Medical Supplies',
              amount: 95000,
              date: '2024-03-15',
              status: 'In Progress',
              sender: mockAccounts[1],
              recipient: mockAccounts[2],
              category: 'Medical',
              verified: false,
              txHash: '0x456def789ghi012jkl345mno678pqr901stu234vwx567yza',
              isEthereumTx: true,
              ethAmount: 0.5
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    connectToGanache();
  }, []);

  const loadInitialTransactions = async (accs) => {
    const mockTransactions = [
      {
        id: 'BC-001',
        type: 'Agricultural Supply',
        amount: 75000,
        date: '2024-03-20',
        status: 'Completed',
        sender: accs[0] || '0xA23B...4C9D',
        recipient: accs[1] || '0xF45G...7H8I',
        category: 'Seeds',
        verified: true,
        txHash: '0x123abc456def789ghi012jkl345mno678pqr901stu234vwx',
        isEthereumTx: false
      },
      {
        id: 'BC-002',
        type: 'Medical Supplies',
        amount: 95000,
        date: '2024-03-15',
        status: 'In Progress',
        sender: accs[1] || '0xJ12K...3L4M',
        recipient: accs[2] || '0xN56O...7P8Q',
        category: 'Medical',
        verified: false,
        txHash: '0x456def789ghi012jkl345mno678pqr901stu234vwx567yza',
        isEthereumTx: true,
        ethAmount: 0.5
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
        ethBalance: parseFloat(web3.utils.fromWei(balance.toString(), 'ether')).toFixed(4)
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
        isEthereumTx,
        sender: currentAccount || newTransaction.sender
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
      className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
    >
      {/* Transaction Type Distribution */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <PieChartIcon className="mr-2 text-blue-600" /> Transaction Types
        </h3>
        {transactionTypeData.length > 0 ? (
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isMobile ? 70 : 80}
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
                {!isMobile && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No transaction data available
          </div>
        )}
      </div>

      {/* Blockchain Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <HardDrive className="mr-2 text-blue-600" /> Blockchain Network
        </h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-600">Network Status:</span>
            <span className={`text-sm md:text-base font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-600">Network ID:</span>
            <span className="text-sm md:text-base font-semibold">{networkId || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-600">Current Account:</span>
            <span className="text-xs md:text-sm font-mono">
              {currentAccount ? shortenAddress(currentAccount) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-600">ETH Balance:</span>
            <span className="text-sm md:text-base font-semibold">
              {blockchainStats.ethBalance ? `${blockchainStats.ethBalance} ETH` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-600">ETH Transactions:</span>
            <span className="text-sm md:text-base font-semibold">
              {blockchainStats.ethereumTransactions || 0}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base text-blue-800">Why Ganache for Rural Areas?</h4>
          <ul className="list-disc pl-4 md:pl-5 text-xs md:text-sm text-gray-700 space-y-1">
            <li>Offline-capable blockchain</li>
            <li>No transaction fees</li>
            <li>Fast transaction processing</li>
            <li>Easy to set up</li>
            <li>Full transparency</li>
          </ul>
        </div>
      </div>

      {/* Category Value Distribution */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <Layers className="mr-2 text-purple-600" /> Value by Category
        </h3>
        {categoryValueData.length > 0 ? (
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
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
                {!isMobile && <Legend />}
                <Bar dataKey="value" name="Value (₹)" fill="#8884d8">
                  {categoryValueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No category data available
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
          <ShieldCheck className="mr-2 text-blue-600" /> Verification Status
        </h3>
        {verificationData.length > 0 ? (
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isMobile ? 70 : 80}
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
                {!isMobile && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
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
          <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
        </div>
      );
    }

    if (filteredTransactions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Database className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No transactions found</h3>
          <p className="text-gray-500 text-sm mb-4">
            {searchTerm ? 'Try adjusting your search' : 'Create your first transaction'}
          </p>
          <button
            onClick={() => {
              setEditMode(false);
              setIsCreateTransactionOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="mr-2" /> Create Transaction
          </button>
        </div>
      );
    }

    return viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTransactions.map((tx) => (
          <motion.div 
            key={tx.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-all ${
              tx.isEthereumTx ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base md:text-lg font-semibold truncate">{tx.type}</h3>
              <div className="flex items-center space-x-1 md:space-x-2">
                <span 
                  className={`
                    px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs
                    ${tx.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {tx.status}
                </span>
                {tx.isEthereumTx && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center">
                    <Link className="mr-1" size={10} /> ETH
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span> 
                <span className="font-medium">₹{tx.amount.toLocaleString()}</span>
              </div>
              {tx.isEthereumTx && tx.ethAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ETH Amount:</span>
                  <span className="font-medium">{tx.ethAmount} ETH</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{tx.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{tx.date}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">Verified:</span>
                {tx.verified ? (
                  <CheckCircle className="text-green-600" size={16} />
                ) : (
                  <div className="flex items-center">
                    <Lock className="text-gray-500" size={16} />
                    {!tx.verified && (
                      <button 
                        onClick={() => verifyTransaction(tx.id)}
                        className="ml-1 text-xs text-blue-600 hover:underline"
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
                    <span className="text-gray-600 text-xs mr-1">Tx Hash:</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 font-mono">
                        {shortenAddress(tx.txHash)}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(tx.txHash);
                          toast.success('Transaction hash copied!');
                        }}
                        className="ml-1 text-gray-500 hover:text-blue-600"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 space-y-1">
                <div className="flex items-center">
                  <span className="text-gray-600 text-xs mr-1">Sender:</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600 font-mono">
                      {shortenAddress(tx.sender)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(tx.sender);
                        toast.success('Address copied!');
                      }}
                      className="ml-1 text-gray-500 hover:text-blue-600"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 text-xs mr-1">Recipient:</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600 font-mono">
                      {shortenAddress(tx.recipient)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(tx.recipient);
                        toast.success('Address copied!');
                      }}
                      className="ml-1 text-gray-500 hover:text-blue-600"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <button 
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setEditMode(true);
                    setIsCreateTransactionOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full"
                  aria-label="Edit transaction"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => {
                    const updatedTransactions = transactions.filter(item => item.id !== tx.id);
                    setTransactions(updatedTransactions);
                    toast.success('Transaction deleted');
                  }}
                  className="text-red-600 hover:bg-red-50 p-1.5 rounded-full"
                  aria-label="Delete transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Type', 'Amount', 'ETH', 'Category', 'Status', 'Date', 'Verified', 'Actions'].map((header) => (
                <th 
                  key={header} 
                  className="p-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    const key = header.toLowerCase().replace(' ', '');
                    if (['id', 'type', 'amount', 'eth', 'category', 'status', 'date', 'verified'].includes(key)) {
                      const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
                      setSortConfig({
                        key,
                        direction: isAsc ? 'desc' : 'asc'
                      });
                    }
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
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 text-sm text-gray-900">{tx.id}</td>
                <td className="p-3 text-sm text-gray-900">
                  <div className="flex items-center">
                    {tx.type}
                    {tx.isEthereumTx && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center">
                        <Link className="mr-1" size={10} /> ETH
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-900">₹{tx.amount.toLocaleString()}</td>
                <td className="p-3 text-sm text-gray-900">{tx.ethAmount > 0 ? `${tx.ethAmount} ETH` : '-'}</td>
                <td className="p-3 text-sm text-gray-900">{tx.category}</td>
                <td className="p-3 text-sm">
                  <span 
                    className={`
                      px-2 py-0.5 rounded-full text-xs
                      ${tx.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'}
                    `}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-900">{tx.date}</td>
                <td className="p-3 text-sm">
                  {tx.verified ? (
                    <CheckCircle className="text-green-600" size={16} />
                  ) : (
                    <div className="flex items-center">
                      <Lock className="text-gray-500" size={16} />
                      {!tx.verified && (
                        <button 
                          onClick={() => verifyTransaction(tx.id)}
                          className="ml-1 text-xs text-blue-600 hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-3 text-sm">
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => {
                        setSelectedTransaction(tx);
                        setEditMode(true);
                        setIsCreateTransactionOpen(true);
                      }}
                      className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full"
                      aria-label="Edit transaction"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        const updatedTransactions = transactions.filter(item => item.id !== tx.id);
                        setTransactions(updatedTransactions);
                        toast.success('Transaction deleted');
                      }}
                      className="text-red-600 hover:bg-red-50 p-1.5 rounded-full"
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
            className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {editMode ? 'Edit Transaction' : 'Create New Transaction'}
              </h2>
              <button 
                onClick={() => {
                  setIsCreateTransactionOpen(false);
                  setEditMode(false);
                  setSelectedTransaction(null);
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
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
                  className="w-full p-2 border rounded-md text-sm"
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
                  className="w-full p-2 border rounded-md text-sm"
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
                  className="w-full p-2 border rounded-md text-sm"
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
                    className="w-full p-2 border rounded-md text-sm"
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
                  className="w-full p-2 border rounded-md text-sm"
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
                  className="w-full p-2 border rounded-md text-sm"
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
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => {
                  setIsCreateTransactionOpen(false);
                  setEditMode(false);
                  setSelectedTransaction(null);
                }}
                className="px-3 py-1.5 border rounded-full text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={editMode ? handleUpdateTransaction : handleCreateTransaction}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
              >
                {editMode ? 'Update' : 'Create'}
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
      className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-12 p-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
                <ShieldCheck className="mr-2 md:mr-4 text-blue-600" size={isMobile ? 24 : 32} /> 
                Blockchain Transparency
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Secure, verifiable transactions for rural supply chains
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {isConnected ? (
                <div className="flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs md:text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Connected to Ganache</span>
                </div>
              ) : (
                <div className="flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-xs md:text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>Not Connected</span>
                </div>
              )}
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setEditMode(false);
                  setIsCreateTransactionOpen(true);
                }}
                className="bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-blue-700 transition flex items-center text-sm md:text-base"
              >
                <Plus className="mr-1 md:mr-2" size={16} /> Create
              </motion.button>
            </div>
          </div>
        </header>

        {/* System Overview Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <Database className="text-blue-600 mr-2" size={isMobile ? 16 : 20} />
              <h3 className="text-sm md:text-base font-medium">Total Transactions</h3>
            </div>
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              {blockchainStats.totalTransactions}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <TrendingUp className="text-green-600 mr-2" size={isMobile ? 16 : 20} />
              <h3 className="text-sm md:text-base font-medium">Total Value</h3>
            </div>
            <div className="text-xl md:text-2xl font-bold text-green-800">
              ₹{blockchainStats.totalTransactionValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <CheckCircle className="text-green-600 mr-2" size={isMobile ? 16 : 20} />
              <h3 className="text-sm md:text-base font-medium">Completed</h3>
            </div>
            <div className="text-xl md:text-2xl font-bold text-green-800">
              {blockchainStats.completedTransactions}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <ShieldCheck className="text-blue-600 mr-2" size={isMobile ? 16 : 20} />
              <h3 className="text-sm md:text-base font-medium">Verified</h3>
            </div>
            <div className="text-xl md:text-2xl font-bold text-blue-800">
              {blockchainStats.verifiedTransactions}
            </div>
          </div>
        </motion.div>

        {/* Visualization Section */}
        {renderVisualizations()}

        {/* Transaction Management Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-48 lg:w-64">
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 border rounded-lg w-full text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                aria-label="Grid view"
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                aria-label="List view"
              >
                <List size={16} />
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