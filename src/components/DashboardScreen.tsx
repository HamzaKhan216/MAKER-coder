import React from 'react';

const DashboardScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Main Statistics Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Placeholder Card 1: Total Sales */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-500">Total Sales</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">$12,345</p>
          <p className="text-sm text-green-500 mt-2">+1.2% from last month</p>
        </div>

        {/* Placeholder Card 2: Profit */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-500">Profit</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">$5,678</p>
          <p className="text-sm text-red-500 mt-2">-0.5% from last month</p>
        </div>

        {/* Placeholder Card 3: New Customers */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-500">New Customers</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">234</p>
          <p className="text-sm text-green-500 mt-2">+5.0% from last month</p>
        </div>

        {/* Placeholder Card 4: Orders Pending */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-500">Orders Pending</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">15</p>
          <p className="text-sm text-yellow-500 mt-2">3 new orders today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions List Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #12345</p>
                <p className="text-xs text-gray-500">Jan 15, 2024</p>
              </div>
              <span className="text-sm font-semibold text-green-600">+$150.00</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Refund #67890</p>
                <p className="text-xs text-gray-500">Jan 14, 2024</p>
              </div>
              <span className="text-sm font-semibold text-red-600">-$30.00</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #12346</p>
                <p className="text-xs text-gray-500">Jan 13, 2024</p>
              </div>
              <span className="text-sm font-semibold text-green-600">+$220.00</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Payment #98765</p>
                <p className="text-xs text-gray-500">Jan 12, 2024</p>
              </div>
              <span className="text-sm font-semibold text-green-600">+$50.00</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #12347</p>
                <p className="text-xs text-gray-500">Jan 11, 2024</p>
              </div>
              <span className="text-sm font-semibold text-green-600">+$99.00</span>
            </li>
          </ul>
        </div>

        {/* Charts Area Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Performance</h2>
          <div className="h-64 bg-gray-50 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
            <p>Placeholder for Sales Chart</p>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Customer Acquisition</h2>
          <div className="h-64 bg-gray-50 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
            <p>Placeholder for Customer Acquisition Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
