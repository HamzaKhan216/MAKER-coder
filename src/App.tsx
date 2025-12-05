import React, { useState } from 'react';

// Assuming these components will be created in their respective files
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import SettingsView from './views/SettingsView';
// Import other view components as needed (e.g., import ProfileView from './views/ProfileView';)

const App: React.FC = () => {
  // State to manage the user's authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // State to manage the currently active view within the application
  const [activeView, setActiveView] = useState<string>('dashboard'); // Default view on login

  /**
   * Handles the login action.
   * Sets authentication status to true and defaults to the dashboard view.
   */
  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveView('dashboard'); // Set a default view after successful login
  };

  /**
   * Handles the logout action.
   * Sets authentication status to false and resets the active view.
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('dashboard'); // Reset to a default view (or login screen state) after logout
  };

  /**
   * Changes the currently active view.
   * @param viewName The name of the view to switch to.
   */
  const handleChangeView = (viewName: string) => {
    setActiveView(viewName);
  };

  /**
   * Renders the component corresponding to the current activeView state.
   * Add more cases for additional application views.
   */
  const renderActiveViewComponent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'settings':
        return <SettingsView />;
      // Add more cases here for other application views
      // Example: case 'profile': return <ProfileView />;
      default:
        return <DashboardView />; // Fallback to DashboardView if activeView is unrecognized
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        // If the user is authenticated, render the main application layout
        <>
          {/* The Header component manages navigation and logout functionality */}
          <Header onLogout={handleLogout} onChangeView={handleChangeView} currentView={activeView} />
          <main className="app-content">
            {/* Render the component for the currently active view */}
            {renderActiveViewComponent()}
          </main>
        </>
      ) : (
        // If the user is not authenticated, render the authentication screen
        <AuthScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
