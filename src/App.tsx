import React, { useState } from 'react';

// --- Placeholder Components (in a real application, these would typically be in separate files) ---

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to the Application
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please log in to continue
          </p>
        </div>
        <button
          onClick={onLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

interface HeaderProps {
  onLogout: () => void;
  onChangeView: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onChangeView, currentView }) => {
  const navLinkClass = (viewName: string) =>
    `px-4 py-2 rounded-md text-sm font-medium ${currentView === viewName ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav className="flex items-center space-x-4">
          <button onClick={() => onChangeView('dashboard')} className={navLinkClass('dashboard')}>
            Dashboard
          </button>
          <button onClick={() => onChangeView('settings')} className={navLinkClass('settings')}>
            Settings
          </button>
          <button
            onClick={onLogout}
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

const DashboardScreen: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
      <p className="text-gray-700">Welcome to your personalized dashboard! Here you can see a summary of your activities and key metrics.</p>
      {/* Add dashboard widgets or content here */}
    </div>
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Settings</h2>
      <p className="text-gray-700">Manage your account preferences, notifications, and other application settings.</p>
      {/* Add settings forms or options here */}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    // In a real application, this would involve authenticating with a backend
    // and potentially storing a session token.
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view to default on logout
    // In a real application, this would involve clearing session tokens and user data.
  };

  // Renders the component corresponding to the current active view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />; // Fallback to dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <>
          <Header
            onLogout={handleLogout}
            onChangeView={setCurrentView}
            currentView={currentView}
          />
          <main className="container mx-auto mt-6 px-4">
            {renderCurrentView()}
          </main>
        </>
      ) : (
        <AuthScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
