"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import React from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  count?: number;
}

interface ResponsiveNavigationProps {
  items: NavItem[];
  activePage: string;
  onNavigate: (pageId: any) => void;
  profileName: string;
  headerClassName?: string;
  containerClassName?: string;
  desktopNavClassName?: string;
  mobileNavClassName?: string;
  buttonActiveClassName?: string;
  buttonInactiveClassName?: string;
  mobileButtonActiveClassName?: string;
  mobileButtonInactiveClassName?: string;
  headerContent?: React.ReactNode;
  showProfileIcon?: boolean;
}

export function ResponsiveNavigation({
  items,
  activePage,
  onNavigate,
  profileName,
  headerClassName = "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm",
  containerClassName = "max-w-6xl mx-auto px-4 md:px-6",
  desktopNavClassName = "hidden md:flex gap-1 -mb-px",
  mobileNavClassName = "md:hidden pb-4 border-t border-gray-200",
  buttonActiveClassName = "border-blue-600 text-blue-600 font-medium",
  buttonInactiveClassName = "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
  mobileButtonActiveClassName = "bg-blue-50 text-blue-600 font-medium",
  mobileButtonInactiveClassName = "text-gray-600 hover:bg-gray-50",
  headerContent,
  showProfileIcon = false,
}: ResponsiveNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={headerClassName}>
      <div className={containerClassName}>
        {/* Desktop Header + Mobile Header Row */}
        <div className="flex items-center justify-between py-4">
          {headerContent ? (
            headerContent
          ) : (
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
              {profileName}
            </h1>
          )}

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className={desktopNavClassName}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activePage === item.id
                      ? buttonActiveClassName
                      : buttonInactiveClassName
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Dropdown */}
        {isMobileMenuOpen && (
          <nav className={mobileNavClassName}>
            <div className="flex flex-col gap-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                      activePage === item.id
                        ? mobileButtonActiveClassName
                        : mobileButtonInactiveClassName
                    }`}
                  >
                    <Icon className="text-lg flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
