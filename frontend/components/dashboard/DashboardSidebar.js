'use client';

export default function DashboardSidebar({ tabs, activeTab, onTabChange, user }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${
                  activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'
                }`} />
                {tab.name}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <a
              href="/products"
              className="block text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              Browse Products
            </a>
            <a
              href="/cart"
              className="block text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              View Cart
            </a>
            <a
              href="/support"
              className="block text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              Get Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 