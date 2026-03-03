'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Wheat, Beef, Droplets, Package,
  BarChart3, Settings, HelpCircle, Search, Bell,
  TrendingUp, TrendingDown, Sprout, Thermometer,
  Wind, CloudRain, Activity, ChevronRight, Circle, Plus,
  MapPin, ArrowRight, AlertTriangle, Tractor, Menu, X
} from 'lucide-react';
import '../../styles/Dashboard.css';

export default function FarmDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [farms, setFarms] = useState([]);
  const [farmsLoading, setFarmsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUser(user);
        fetchUserFarms(user.id);
      } else {
        setFarmsLoading(false);
      }
    } catch { setFarmsLoading(false); }
  }, []);

  const fetchUserFarms = async (userId) => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${API_BASE}/farms/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setFarms(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to fetch farms:', e);
    } finally {
      setFarmsLoading(false);
    }
  };

  const getInitials = (user) => {
    if (!user) return 'U';
    const name = user.full_name || user.username || '';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';
  };

  const getDisplayName = (user) => {
    if (!user) return 'Guest';
    return user.full_name || user.username || user.email || 'User';
  };

  const cropData = [
    { name: 'Wheat', growth: 75, color: '#22c55e', icon: Wheat },
    { name: 'Corn', growth: 60, color: '#eab308', icon: Sprout },
    { name: 'Rice', growth: 85, color: '#3b82f6', icon: Sprout },
  ];

  const weatherData = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Today', temp: '24°C', rain: '10%', icon: Thermometer },
      { day: 'Tmr', temp: '22°C', rain: '30%', icon: CloudRain },
      { day: 'Wed', temp: '20°C', rain: '60%', icon: Wind },
    ],
  };

  const irrigationData = {
    tankLevel: 78,
    pumps: [
      { name: 'Pump 1', status: 'Active', flow: '12 L/min' },
      { name: 'Pump 2', status: 'Idle', flow: '0 L/min' },
      { name: 'Pump 3', status: 'Active', flow: '8 L/min' },
    ],
  };

  const stats = [
    { label: 'Total Revenue', value: '$28,900', trend: '+12.5%', up: true, icon: TrendingUp },
    { label: 'Total Expenses', value: '$12,450', trend: '-3.2%', up: false, icon: TrendingDown },
    { label: 'Net Profit', value: '$16,450', trend: '+18.1%', up: true, icon: BarChart3 },
    { label: 'Active Fields', value: '14', trend: '+2', up: true, icon: Sprout },
  ];

  const recentActivities = [
    { id: 1, action: 'Fertilizer added to wheat field', time: '2 hours ago', type: 'crop' },
    { id: 2, action: 'Corn harvested — 2.5 tons', time: '4 hours ago', type: 'harvest' },
    { id: 3, action: 'Livestock health check completed', time: '6 hours ago', type: 'livestock' },
    { id: 4, action: 'Irrigation schedule updated', time: '1 day ago', type: 'irrigation' },
  ];

  const navigationItems = [
    { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { name: 'crops', label: 'Crop Management', icon: Wheat },
    { name: 'new-farm', label: 'New Farm', icon: Plus },
    { name: 'livestock', label: 'Livestock', icon: Beef },
    { name: 'irrigation', label: 'Irrigation', icon: Droplets },
    { name: 'inventory', label: 'Inventory', icon: Package },
    { name: 'reports', label: 'Reports', icon: BarChart3 },
    { name: 'settings', label: 'Settings', icon: Settings },
    { name: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="db-layout">
      {/* Mobile overlay */}
      <div
        className={`db-mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`db-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="db-sidebar-logo">
          <Sprout size={22} color="#22c55e" />
          <span>Viland Farm</span>
        </div>

        <nav className="db-sidebar-nav">
          <p className="db-nav-section">MAIN MENU</p>
          {navigationItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={`/${item.name === 'dashboard' ? 'dashboard' : item.name}`}
                className={`db-nav-item ${activeNav === item.name ? 'active' : ''}`}
                onClick={() => setActiveNav(item.name)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <p className="db-nav-section" style={{ marginTop: '1.5rem' }}>SUPPORT</p>
          {navigationItems.slice(6).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={`/${item.name}`}
                className={`db-nav-item ${activeNav === item.name ? 'active' : ''}`}
                onClick={() => setActiveNav(item.name)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="db-sidebar-footer">
          <Link href="/profile" className="db-sidebar-footer-link">
            <div className="db-user-avatar">{getInitials(currentUser)}</div>
            <div className="db-user-info">
              <p className="db-user-name">{getDisplayName(currentUser)}</p>
              <p className="db-user-role">Farm Manager</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="db-main">
        {/* Header */}
        <header className="db-header">
          {/* Hamburger — mobile only */}
          <button
            className="db-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="db-header-left">
            <h1 className="db-page-title">Dashboard</h1>
            <p className="db-page-subtitle">Welcome back, {getDisplayName(currentUser)} 👋</p>
          </div>
          <div className="db-header-right">
            <div className="db-search">
              <Search size={16} className="db-search-icon" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="db-icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="db-badge">3</span>
            </button>
            <Link href="/profile" className="db-header-user">
              <div className="db-header-avatar">{getInitials(currentUser)}</div>
              <span className="db-header-username">{getDisplayName(currentUser)}</span>
            </Link>
          </div>
        </header>

        {/* ===== MY FARMS SECTION ===== */}
        <div className="db-section-header">
          <div>
            <h2 className="db-section-title"><Tractor size={18} /> My Farms</h2>
            <p className="db-section-sub">Click on a farm to manage it</p>
          </div>
          <Link href="/new-farm" className="db-add-farm-btn">
            <Plus size={15} /> Add Farm
          </Link>
        </div>

        <div className="db-farms-grid">
          {farmsLoading ? (
            <div className="db-farms-loading">
              <Sprout size={24} className="db-spin" color="#22c55e" />
              <span>Loading farms...</span>
            </div>
          ) : farms.length === 0 ? (
            <div className="db-farms-empty">
              <AlertTriangle size={32} color="#94a3b8" />
              <p>No farms yet</p>
              <Link href="/new-farm" className="db-add-farm-btn">+ Create your first farm</Link>
            </div>
          ) : (
            farms.map((farm) => (
              <Link key={farm.id} href={`/farm/${farm.id}`} className="db-farm-card">
                <div className="db-farm-card-top">
                  <div className="db-farm-icon-wrap">
                    <Tractor size={20} color="#22c55e" />
                  </div>
                  <ArrowRight size={16} className="db-farm-arrow" />
                </div>
                <h3 className="db-farm-name">{farm.name}</h3>
                <p className="db-farm-location">
                  <MapPin size={12} /> {farm.location || 'No location set'}
                </p>
                <div className="db-farm-meta">
                  <span>{farm.size ? `${farm.size} ha` : '—'}</span>
                  <span className="db-farm-status active">Active</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Stats Row */}
        <div className="db-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="db-stat-card">
                <div className="db-stat-header">
                  <p className="db-stat-label">{stat.label}</p>
                  <div className="db-stat-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>
                <p className="db-stat-value">{stat.value}</p>
                <p className={`db-stat-trend ${stat.up ? 'up' : 'down'}`}>
                  {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.trend} vs last month
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Cards Grid */}
        <div className="db-grid">
          {/* Crop Growth */}
          <div className="db-card">
            <div className="db-card-header">
              <h3><Wheat size={18} /> Crop Growth Status</h3>
              <button className="db-link-btn">View all <ChevronRight size={14} /></button>
            </div>
            <div className="db-crop-list">
              {cropData.map((crop) => {
                const Icon = crop.icon;
                return (
                  <div key={crop.name} className="db-crop-item">
                    <div className="db-crop-meta">
                      <div className="db-crop-icon" style={{ backgroundColor: `${crop.color}20`, color: crop.color }}>
                        <Icon size={16} />
                      </div>
                      <span className="db-crop-name">{crop.name}</span>
                      <span className="db-crop-pct" style={{ color: crop.color }}>{crop.growth}%</span>
                    </div>
                    <div className="db-progress-track">
                      <div
                        className="db-progress-fill"
                        style={{ width: `${crop.growth}%`, backgroundColor: crop.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weather */}
          <div className="db-card">
            <div className="db-card-header">
              <h3><CloudRain size={18} /> Weather Forecast</h3>
            </div>
            <div className="db-weather-hero">
              <div className="db-weather-big">
                <Thermometer size={40} color="#f97316" />
                <div>
                  <p className="db-weather-temp">{weatherData.temperature}°C</p>
                  <p className="db-weather-label">Sunny · Hanoi</p>
                </div>
              </div>
              <div className="db-weather-chips">
                <div className="db-chip"><Droplets size={14} /> {weatherData.humidity}% Humidity</div>
                <div className="db-chip"><Wind size={14} /> {weatherData.windSpeed} km/h</div>
              </div>
            </div>
            <div className="db-forecast-row">
              {weatherData.forecast.map((day) => {
                const Icon = day.icon;
                return (
                  <div key={day.day} className="db-forecast-item">
                    <p className="db-forecast-day">{day.day}</p>
                    <Icon size={20} color="#64748b" />
                    <p className="db-forecast-temp">{day.temp}</p>
                    <p className="db-forecast-rain">{day.rain} rain</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Irrigation */}
          <div className="db-card">
            <div className="db-card-header">
              <h3><Droplets size={18} /> Irrigation System</h3>
            </div>
            <div className="db-tank-section">
              <div className="db-tank-header">
                <span>Water Tank Level</span>
                <span className="db-tank-pct">{irrigationData.tankLevel}%</span>
              </div>
              <div className="db-tank-track">
                <div className="db-tank-fill" style={{ width: `${irrigationData.tankLevel}%` }} />
              </div>
            </div>
            <div className="db-pump-list">
              {irrigationData.pumps.map((pump) => (
                <div key={pump.name} className="db-pump-row">
                  <Circle size={8} fill={pump.status === 'Active' ? '#22c55e' : '#94a3b8'} color="transparent" />
                  <span className="db-pump-name">{pump.name}</span>
                  <span className={`db-pump-status ${pump.status === 'Active' ? 'active' : 'idle'}`}>
                    {pump.status}
                  </span>
                  <span className="db-pump-flow">{pump.flow}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities — full width */}
          <div className="db-card db-card-full">
            <div className="db-card-header">
              <h3><Activity size={18} /> Recent Activities</h3>
              <button className="db-link-btn">View all <ChevronRight size={14} /></button>
            </div>
            <div className="db-activity-list">
              {recentActivities.map((act) => (
                <div key={act.id} className="db-activity-row">
                  <div className="db-activity-dot" />
                  <div className="db-activity-content">
                    <p className="db-activity-text">{act.action}</p>
                    <p className="db-activity-time">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ===== BOTTOM NAV BAR (Mobile) ===== */}
      <nav className="db-bottom-nav" aria-label="Mobile navigation">
        <div className="db-bottom-nav-inner">
          {[
            { href: '/dashboard', icon: LayoutDashboard, label: 'Trang chủ', key: 'dashboard' },
            { href: '/new-farm', icon: Wheat, label: 'Nông trại', key: 'new-farm' },
            { href: '/new-farm', icon: Plus, label: 'Thêm', key: '__add__', fab: true },
            { href: '/profile', icon: Settings, label: 'Cài đặt', key: 'settings' },
            { href: '/profile', icon: Sprout, label: 'Tôi', key: 'profile' },
          ].map(({ href, icon: Icon, label, key, fab }) => (
            <Link
              key={key}
              href={href}
              className={`db-bottom-nav-item${activeNav === key ? ' active' : ''}`}
              onClick={() => setActiveNav(key)}
            >
              <div className="db-bottom-nav-icon" style={fab ? { background: '#22c55e', borderRadius: '50%' } : {}}>
                <Icon size={22} color={fab ? '#fff' : undefined} />
              </div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
