import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Lead, DashboardStats } from '@/lib/supabase';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  TrendingUp, Users, DollarSign, Calendar,
  Download, Trash2, Edit, LogOut
} from 'lucide-react';

const COLORS = {
  new: '#fbbf24',
  contacted: '#60a5fa',
  qualified: '#34d399',
  converted: '#10b981'
};

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdatingLead, setIsUpdatingLead] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/dashboard-stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
        setLeads(result.data.recentLeads);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setIsUpdatingLead(true);
    try {
      const response = await fetch(`https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/leads-manage/${leadId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadDashboardData();
      }
    } catch (error) {
      console.error('Failed to update lead status:', error);
    } finally {
      setIsUpdatingLead(false);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      const response = await fetch(`https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/leads-manage/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        loadDashboardData();
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/leads-export', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `aureum-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to export CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-gray-300 mt-4 text-sm sm:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-2 mr-2 sm:mr-3">
                <span className="font-bold text-lg sm:text-xl">A</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">Aureum Admin</h1>
                <p className="text-xs sm:text-sm text-gray-400">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-300 hidden sm:inline">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm min-h-[44px] px-2 sm:px-0"
              >
                <LogOut size={16} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">Total Leads</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stats.kpis.totalLeads}</p>
                </div>
                <div className="bg-blue-900/30 p-2 sm:p-3 rounded-full">
                  <Users className="text-blue-400" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">Conversion Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stats.kpis.conversionRate}%</p>
                </div>
                <div className="bg-green-900/30 p-2 sm:p-3 rounded-full">
                  <TrendingUp className="text-green-400" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">Revenue Pipeline</p>
                  <p className="text-xl sm:text-3xl font-bold text-white">${stats.kpis.revenuePipeline.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-900/30 p-2 sm:p-3 rounded-full">
                  <DollarSign className="text-yellow-400" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">New This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stats.kpis.newLeadsThisMonth}</p>
                </div>
                <div className="bg-purple-900/30 p-2 sm:p-3 rounded-full">
                  <Calendar className="text-purple-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Leads Over Time */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Leads Over Time</h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.charts.leadsOverTime.labels.map((label, index) => ({
                    month: label,
                    leads: stats.charts.leadsOverTime.data[index]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '14px'
                      }} 
                    />
                    <Line type="monotone" dataKey="leads" stroke="#fbbf24" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Status Distribution */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Lead Status Distribution</h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.charts.statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.charts.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '14px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-white">Recent Leads</h3>
            <button
              onClick={exportCSV}
              disabled={isExporting}
              className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
            >
              {isExporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              ) : (
                <Download size={14} />
              )}
              Export CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Project Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-700">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">{lead.name}</div>
                        {lead.phone && (
                          <div className="text-xs text-gray-400">{lead.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      <div className="truncate max-w-[120px] sm:max-w-none" title={lead.email}>
                        {lead.email}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      <div className="truncate max-w-[100px] sm:max-w-none" title={lead.project_type}>
                        {lead.project_type}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        disabled={isUpdatingLead}
                        className="text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[36px]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      ${lead.estimated_value.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-blue-400 hover:text-blue-300 transition-colors p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {leads.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm sm:text-base">No leads found. Lead submissions will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Lead Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Name:</label>
                <p className="text-sm sm:text-base text-white">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Email:</label>
                <p className="text-sm sm:text-base text-white break-all">{selectedLead.email}</p>
              </div>
              {selectedLead.phone && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-400">Phone:</label>
                  <p className="text-sm sm:text-base text-white">{selectedLead.phone}</p>
                </div>
              )}
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Project Type:</label>
                <p className="text-sm sm:text-base text-white">{selectedLead.project_type}</p>
              </div>
              {selectedLead.message && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-400">Message:</label>
                  <p className="text-sm sm:text-base text-white">{selectedLead.message}</p>
                </div>
              )}
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Status:</label>
                <p className="text-sm sm:text-base text-white capitalize">{selectedLead.status}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Estimated Value:</label>
                <p className="text-sm sm:text-base text-white">${selectedLead.estimated_value.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400">Created:</label>
                <p className="text-sm sm:text-base text-white">{new Date(selectedLead.created_at).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}