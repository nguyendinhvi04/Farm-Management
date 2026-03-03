'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard, Wheat, Beef, Droplets, Package,
    BarChart3, Settings, HelpCircle, Sprout, Plus,
    User, Mail, Lock, Save, ChevronLeft,
    Eye, EyeOff, AlertCircle, CheckCircle2, LogOut, Shield
} from 'lucide-react';
import '../../styles/Dashboard.css';
import '../../styles/Profile.css';

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

export default function ProfilePage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

    // Form states
    const [infoForm, setInfoForm] = useState({ full_name: '', username: '', email: '' });
    const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });

    const [infoLoading, setInfoLoading] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);
    const [infoMsg, setInfoMsg] = useState(null); // { type: 'success'|'error', text }
    const [pwMsg, setPwMsg] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('user');
            if (stored) {
                const user = JSON.parse(stored);
                setCurrentUser(user);
                setInfoForm({
                    full_name: user.full_name || '',
                    username: user.username || '',
                    email: user.email || '',
                });
            }
        } catch { }
    }, []);

    const getInitials = (user) => {
        if (!user) return 'U';
        const name = user.full_name || user.username || '';
        return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';
    };

    const getDisplayName = (user) => {
        if (!user) return 'User';
        return user.full_name || user.username || user.email || 'User';
    };

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        setInfoLoading(true);
        setInfoMsg(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    full_name: infoForm.full_name,
                    username: infoForm.username,
                    email: infoForm.email,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Update failed');
            // Update localStorage
            const updated = { ...currentUser, ...infoForm };
            localStorage.setItem('user', JSON.stringify(updated));
            setCurrentUser(updated);
            setInfoMsg({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setInfoMsg({ type: 'error', text: err.message });
        } finally {
            setInfoLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPwMsg(null);
        if (pwForm.new_password !== pwForm.confirm_password) {
            setPwMsg({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        if (pwForm.new_password.length < 6) {
            setPwMsg({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }
        setPwLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/users/${currentUser.id}/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    current_password: pwForm.current_password,
                    new_password: pwForm.new_password,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Password change failed');
            setPwMsg({ type: 'success', text: 'Password changed successfully!' });
            setPwForm({ current_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            setPwMsg({ type: 'error', text: err.message });
        } finally {
            setPwLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div className="db-layout">
            {/* Sidebar */}
            <aside className="db-sidebar">
                <div className="db-sidebar-logo">
                    <Sprout size={22} color="#22c55e" />
                    <span>Viland Farm</span>
                </div>
                <nav className="db-sidebar-nav">
                    <p className="db-nav-section">MAIN MENU</p>
                    {navigationItems.slice(0, 7).map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={`/${item.name}`} className="db-nav-item">
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                    <p className="db-nav-section" style={{ marginTop: '1.5rem' }}>SUPPORT</p>
                    {navigationItems.slice(7).map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={`/${item.name}`} className="db-nav-item">
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

            {/* Main */}
            <main className="db-main">
                <header className="db-header">
                    <div className="db-header-left">
                        <h1 className="db-page-title">My Profile</h1>
                        <p className="db-page-subtitle">Manage your account settings</p>
                    </div>
                    <div className="db-header-right">
                        <Link href="/dashboard" className="cf-back-btn">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <button className="pf-logout-btn" onClick={handleLogout}>
                            <LogOut size={16} /> Sign out
                        </button>
                    </div>
                </header>

                <div className="pf-content">
                    {/* Profile Card */}
                    <div className="pf-hero-card">
                        <div className="pf-avatar-xl">{getInitials(currentUser)}</div>
                        <div>
                            <h2 className="pf-hero-name">{getDisplayName(currentUser)}</h2>
                            <p className="pf-hero-email">{currentUser?.email || '—'}</p>
                            <span className="pf-role-badge"><Shield size={12} /> Farm Manager</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="pf-tabs">
                        <button
                            className={`pf-tab ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => setActiveTab('info')}
                        >
                            <User size={15} /> Personal Info
                        </button>
                        <button
                            className={`pf-tab ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            <Lock size={15} /> Change Password
                        </button>
                    </div>

                    {/* Info Form */}
                    {activeTab === 'info' && (
                        <form className="pf-form" onSubmit={handleInfoSubmit}>
                            {infoMsg && (
                                <div className={`pf-msg ${infoMsg.type}`}>
                                    {infoMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {infoMsg.text}
                                </div>
                            )}

                            <div className="pf-field-row">
                                <div className="pf-field">
                                    <label><User size={13} /> Full Name</label>
                                    <input
                                        type="text"
                                        value={infoForm.full_name}
                                        onChange={e => setInfoForm(p => ({ ...p, full_name: e.target.value }))}
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="pf-field">
                                    <label><User size={13} /> Username</label>
                                    <input
                                        type="text"
                                        value={infoForm.username}
                                        onChange={e => setInfoForm(p => ({ ...p, username: e.target.value }))}
                                        placeholder="username"
                                    />
                                </div>
                            </div>

                            <div className="pf-field">
                                <label><Mail size={13} /> Email Address</label>
                                <input
                                    type="email"
                                    value={infoForm.email}
                                    onChange={e => setInfoForm(p => ({ ...p, email: e.target.value }))}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="pf-form-footer">
                                <button type="submit" className="pf-save-btn" disabled={infoLoading}>
                                    {infoLoading ? 'Saving…' : <><Save size={15} /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Password Form */}
                    {activeTab === 'password' && (
                        <form className="pf-form" onSubmit={handlePasswordSubmit}>
                            {pwMsg && (
                                <div className={`pf-msg ${pwMsg.type}`}>
                                    {pwMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {pwMsg.text}
                                </div>
                            )}

                            <div className="pf-field">
                                <label><Lock size={13} /> Current Password</label>
                                <div className="pf-pw-wrap">
                                    <input
                                        type={showPw.current ? 'text' : 'password'}
                                        value={pwForm.current_password}
                                        onChange={e => setPwForm(p => ({ ...p, current_password: e.target.value }))}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" className="pf-pw-eye" onClick={() => setShowPw(p => ({ ...p, current: !p.current }))}>
                                        {showPw.current ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="pf-field-row">
                                <div className="pf-field">
                                    <label><Lock size={13} /> New Password</label>
                                    <div className="pf-pw-wrap">
                                        <input
                                            type={showPw.new ? 'text' : 'password'}
                                            value={pwForm.new_password}
                                            onChange={e => setPwForm(p => ({ ...p, new_password: e.target.value }))}
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                        <button type="button" className="pf-pw-eye" onClick={() => setShowPw(p => ({ ...p, new: !p.new }))}>
                                            {showPw.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="pf-field">
                                    <label><Lock size={13} /> Confirm New Password</label>
                                    <div className="pf-pw-wrap">
                                        <input
                                            type={showPw.confirm ? 'text' : 'password'}
                                            value={pwForm.confirm_password}
                                            onChange={e => setPwForm(p => ({ ...p, confirm_password: e.target.value }))}
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button type="button" className="pf-pw-eye" onClick={() => setShowPw(p => ({ ...p, confirm: !p.confirm }))}>
                                            {showPw.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pf-form-footer">
                                <button type="submit" className="pf-save-btn" disabled={pwLoading}>
                                    {pwLoading ? 'Updating…' : <><Save size={15} /> Update Password</>}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
