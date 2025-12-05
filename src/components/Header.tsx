import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Initial theme
  const location = useLocation(); // To highlight the active link

  useEffect(() => {
    // Check local storage for theme preference or system preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic here (e.g., clear tokens, redirect to login)
    console.log('User attempting to sign out...');
    alert('Signing out...'); // Placeholder for demonstration
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Billing', path: '/billing' },
    { name: 'Settings', path: '/settings' },
    // Add more navigation links as needed for other screens
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link to="/">MyApp</Link>
        </div>

        {/* Navigation Tabs */}
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`
                    text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                    transition-colors duration-200
                    ${location.pathname === link.path ? 'font-bold text-blue-600 dark:text-blue-400' : ''}
                  `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Theme Toggle and Sign Out */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.582a1 1 0 01-1.393.04L7.5 12.169V11a1 1 0 012 0v1.169l1.648 2.013a1 1 0 01.04 1.393zm-9.31-9.31a1 1 0 010-1.414L3.293 2.5a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0l-.707-.707zm14.858 0a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0l-.707-.707z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
