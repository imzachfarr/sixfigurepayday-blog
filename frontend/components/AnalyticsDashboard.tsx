import React, { useEffect, useState } from 'react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  zephryxLabsViews: number
  moneyMakingViews: number
  topPages: Array<{ page: string; views: number }>
  topKeywords: Array<{ keyword: string; impressions: number }>
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would typically fetch from Google Analytics API
    // For now, we'll simulate the data
    const fetchAnalyticsData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setAnalyticsData({
          pageViews: 15420,
          uniqueVisitors: 8234,
          zephryxLabsViews: 5678,
          moneyMakingViews: 4321,
          topPages: [
            { page: 'ZephryxLabs Review', views: 2345 },
            { page: 'Is ZephryxLabs Legit', views: 1890 },
            { page: 'ZephryxLabs Scam', views: 1567 },
            { page: 'AI Money Making', views: 1234 },
            { page: 'Online Business Tips', views: 987 }
          ],
          topKeywords: [
            { keyword: 'ZephryxLabs review', impressions: 8900 },
            { keyword: 'ZephryxLabs scam', impressions: 6700 },
            { keyword: 'ZephryxLabs legit', impressions: 5400 },
            { keyword: 'make money online', impressions: 3200 },
            { keyword: 'AI money making', impressions: 2800 }
          ]
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching analytics:', error)
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
        <p className="text-gray-600">Unable to load analytics data.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-6">SEO Performance Dashboard</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-600">Total Page Views</h4>
          <p className="text-2xl font-bold text-blue-900">{analyticsData.pageViews.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-600">Unique Visitors</h4>
          <p className="text-2xl font-bold text-green-900">{analyticsData.uniqueVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-600">ZephryxLabs Views</h4>
          <p className="text-2xl font-bold text-purple-900">{analyticsData.zephryxLabsViews.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-600">Money Making Views</h4>
          <p className="text-2xl font-bold text-orange-900">{analyticsData.moneyMakingViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Top Pages */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h4>
        <div className="space-y-3">
          {analyticsData.topPages.map((page, index) => (
            <div key={page.page} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                <span className="text-gray-900">{page.page}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">{page.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Keywords */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Ranking Keywords</h4>
        <div className="space-y-3">
          {analyticsData.topKeywords.map((keyword, index) => (
            <div key={keyword.keyword} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                <span className="text-gray-900">{keyword.keyword}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">{keyword.impressions.toLocaleString()} impressions</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Tips */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">SEO Optimization Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• ZephryxLabs content is performing well - focus on more reviews</li>
          <li>• Money-making keywords need more content</li>
          <li>• Consider creating comparison posts</li>
          <li>• Add more FAQ content for featured snippets</li>
        </ul>
      </div>
    </div>
  )
} 