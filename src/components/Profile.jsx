import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Briefcase, 
  Calendar, 
  Edit, 
  LogOut,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Key,
  Settings
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    accountType: user?.accountType || 'basic'
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    try {
      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, ...editData } : u
      )
      
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.setItem('user', JSON.stringify({ ...user, ...editData }))
      
      setSuccess('Profile updated successfully!')
      setTimeout(() => {
        setSuccess('')
        setIsEditing(false)
        window.location.reload() // Refresh to update context
      }, 2000)
    } catch (err) {
      setError('Failed to update profile')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const accountTypeDisplay = {
    basic: 'Basic (Local Shop)',
    enterprise: 'Enterprise (NGO/Startup)'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-10 mt-12 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
              <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded flex items-start"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">{success}</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded flex items-start"
              >
                <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-full p-3 mb-4">
                    <User className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center">
                    {user?.name || 'User'}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {accountTypeDisplay[user?.accountType] || 'Basic User'}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to={user?.accountType === 'enterprise' ? '/enterprise' : '/basic'}
                    className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  
                  <Link
                    to="/profile/security"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Key className="h-4 w-4" />
                    Security Settings
                  </Link>
                  
                  <Link
                    to="/profile/settings"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Account Details</h3>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Profile
                    </motion.button>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setEditData({
                            name: user?.name || '',
                            accountType: user?.accountType || 'basic'
                          })
                        }}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-800">{user?.email || 'No email'}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-gray-800">{user?.name || 'No name'}</p>
                    )}
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                    {isEditing ? (
                      <select
                        name="accountType"
                        value={editData.accountType}
                        onChange={handleEditChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="basic">Basic (Local Shop)</option>
                        <option value="enterprise">Enterprise (NGO/Startup)</option>
                      </select>
                    ) : (
                      <p className="text-gray-800">
                        {accountTypeDisplay[user?.accountType] || 'Basic User'}
                      </p>
                    )}
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <p className="text-gray-800">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile