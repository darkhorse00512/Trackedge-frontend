import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Plus,
  BarChart3,
  Calendar,
  Activity
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Profit',
      value: '$2,450.00',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: 'Win Rate',
      value: '68.5%',
      change: '+2.1%',
      trend: 'up',
      icon: <Target className="h-4 w-4" />,
    },
    {
      title: 'Total Trades',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: 'This Month',
      value: '8',
      change: '-2',
      trend: 'down',
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  const recentTrades = [
    {
      symbol: 'AAPL',
      type: 'Long',
      entry: 150.25,
      exit: 152.80,
      profit: 255.00,
      date: '2024-01-15',
      status: 'win',
    },
    {
      symbol: 'TSLA',
      type: 'Short',
      entry: 245.50,
      exit: 242.30,
      profit: 320.00,
      date: '2024-01-14',
      status: 'win',
    },
    {
      symbol: 'NVDA',
      type: 'Long',
      entry: 485.75,
      exit: 482.10,
      profit: -365.00,
      date: '2024-01-13',
      status: 'loss',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's an overview of your trading performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Trades */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Trades</CardTitle>
                    <CardDescription>
                      Your latest trading activity
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trade
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {trade.symbol}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {trade.type} • {trade.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          ${trade.profit.toFixed(2)}
                        </div>
                        <Badge
                          variant={trade.status === 'win' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {trade.status === 'win' ? 'Win' : 'Loss'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Trade
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Create Strategy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>
                  Your trading performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Chart coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 