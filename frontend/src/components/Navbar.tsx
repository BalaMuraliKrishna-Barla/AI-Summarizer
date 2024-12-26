import React from 'react';
import { Brain } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              AI Summarizer
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </a> */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
}