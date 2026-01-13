'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../../styles/Dashboard.css';

export default function FarmDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for dashboard
  const cropData = [
    { name: 'Wheat', growth: 75, color: '#4CAF50', icon: '🌾' },
    { name: 'Corn', growth: 60, color: '#FFEB3B', icon: '🌽' },
    { name: 'Rice', growth: 85, color: '#8BC34A', icon: '🍚' }
  ];

  const weatherData = {
    temperature: 24,
    humidity: 65,
    forecast: [
      { day: 'Today', temp: '24°C', rain: '10%', icon: '☀️' },
      { day: 'Tomorrow', temp: '22°C', rain: '30%', icon: '⛅' },
      { day: 'Wed', temp: '20°C', rain: '60%', icon: '🌧️' }
    ]
  };

  const irrigationData = {
    tankLevel: 78,
    pumps: [
      { name: 'Pump 1', status: 'Active', flow: '12L/min' },
      { name: 'Pump 2', status: 'Idle', flow: '0L/min' },
      { name: 'Pump 3', status: 'Active', flow: '8L/min' }
    ]
  };

  const financialData = {
    expenses: '$12,450',
    revenue: '$28,900',
    profit: '$16,450',
    profitColor: '#4CAF50'
  };

  const recentActivities = [
    { id: 1, action: 'Fertilizer added to wheat field', time: '2 hours ago', icon: '🌱' },
    { id: 2, action: 'Corn harvested - 2.5 tons', time: '4 hours ago', icon: '🌽' },
    { id: 3, action: 'Livestock health check completed', time: '6 hours ago', icon: '🐄' },
    { id: 4, action: 'Irrigation schedule updated', time: '1 day ago', icon: '💧' }
  ];

  const navigationItems = [
    { name: 'dashboard', label: 'Dashboard', icon: '📊' },
    { name: 'crops', label: 'Crop Management', icon: '🌾' },
    { name: 'livestock', label: 'Livestock', icon: '🐄' },
    { name: 'irrigation', label: 'Irrigation', icon: '💧' },
    { name: 'inventory', label: 'Inventory', icon: '📦' },
    { name: 'reports', label: 'Reports', icon: '📈' },
    { name: 'settings', label: 'Settings', icon: '⚙️' },
    { name: 'help', label: 'Help', icon: '❓' }
  ];

  return (
    <div className="farm-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🌱 FarmPro</h2>
        </div>
        <nav className="sidebar-nav">
          {navigationItems.map(item => (
            <Link
              key={item.name}
              href={`/${item.name === 'dashboard' ? 'dashboard' : item.name}`}
              className={`nav-item ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => setActiveNav(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Farm Dashboard</h1>
            <p>Welcome back, Farm Manager</p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <button className="notification-btn">
              <span>🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <span>👨‍🌾</span>
              <span>John Farmer</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Crop Growth Status */}
          <div className="dashboard-card">
            <h3>Crop Growth Status</h3>
            <div className="crop-status">
              {cropData.map(crop => (
                <div key={crop.name} className="crop-item">
                  <div className="crop-header">
                    <span className="crop-icon">{crop.icon}</span>
                    <span className="crop-name">{crop.name}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${crop.growth}%`, backgroundColor: crop.color }}
                    ></div>
                  </div>
                  <span className="progress-text">{crop.growth}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="dashboard-card">
            <h3>Weather Forecast</h3>
            <div className="weather-widget">
              <div className="current-weather">
                <span className="weather-icon">☀️</span>
                <div>
                  <p className="weather-temp">{weatherData.temperature}°C</p>
                  <p className="weather-desc">Sunny</p>
                </div>
              </div>
              <div className="weather-forecast">
                {weatherData.forecast.map(day => (
                  <div key={day.day} className="forecast-day">
                    <span>{day.day}</span>
                    <span>{day.icon}</span>
                    <span>{day.temp}</span>
                    <span>{day.rain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Irrigation System */}
          <div className="dashboard-card">
            <h3>Irrigation System</h3>
            <div className="irrigation-status">
              <div className="tank-level">
                <h4>Water Tank Level</h4>
                <div className="tank-bar">
                  <div 
                    className="tank-fill" 
                    style={{ width: `${irrigationData.tankLevel}%` }}
                  ></div>
                </div>
                <span>{irrigationData.tankLevel}%</span>
              </div>
              <div className="pump-status">
                <h4>Pump Status</h4>
                {irrigationData.pumps.map(pump => (
                  <div key={pump.name} className="pump-item">
                    <span>{pump.name}</span>
                    <span className={`status ${pump.status.toLowerCase()}`}>
                      {pump.status}
                    </span>
                    <span>{pump.flow}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="dashboard-card">
            <h3>Financial Summary</h3>
            <div className="financial-summary">
              <div className="finance-item">
                <span className="finance-label">Expenses</span>
                <span className="finance-value expenses">{financialData.expenses}</span>
              </div>
              <div className="finance-item">
                <span className="finance-label">Revenue</span>
                <span className="finance-value revenue">{financialData.revenue}</span>
              </div>
              <div className="finance-item">
                <span className="finance-label">Profit</span>
                <span className="finance-value profit" style={{ color: financialData.profitColor }}>
                  {financialData.profit}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-card full-width">
            <h3>Recent Activities</h3>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p>{activity.action}</p>
                    <small>{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
