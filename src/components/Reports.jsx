import React, { useState } from 'react'
import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react'

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const reports = [
    {
      id: 1,
      title: 'Weekly Performance Report',
      description: 'Detailed analysis of your trading performance',
      date: '2024-01-15',
      type: 'Performance',
      status: 'Ready',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Risk Assessment Report',
      description: 'Portfolio risk analysis and recommendations',
      date: '2024-01-14',
      type: 'Risk',
      status: 'Ready',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Monthly Trading Summary',
      description: 'Complete overview of monthly trading activities',
      date: '2024-01-01',
      type: 'Summary',
      status: 'Ready',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'Tax Report 2024',
      description: 'Annual tax report for trading activities',
      date: '2024-01-01',
      type: 'Tax',
      status: 'Generating',
      size: 'Pending'
    }
  ]

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Reports
          </h2>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Generate</span>
          </button>
        </div>

        {/* Period Filter */}
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {report.title}
                    </h3>
                    <span
                      className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium ${
                        report.status === 'Ready'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {report.date}
                    </span>
                    <span>{report.type}</span>
                    <span>{report.size}</span>
                  </div>
                </div>

                {/* Download or Loading Spinner */}
                <div className="ml-4 flex-shrink-0">
                  {report.status === 'Ready' ? (
                    <button
                      type="button"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      aria-label={`Download ${report.title}`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-900">Quick Insight</p>
              <p className="text-sm text-blue-700">
                Your portfolio performance improved by 12% this week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
