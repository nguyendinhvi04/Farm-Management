'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Wheat, Beef, Droplets, Package,
    BarChart3, Settings, HelpCircle, Sprout,
    MapPin, Maximize2, Plus, X, AlertCircle,
    ChevronLeft, CheckCircle2, Trash2
} from 'lucide-react';
import '../../styles/Dashboard.css';
import '../../styles/CreateFarm.css';

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

export default function CreateFarmPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({ name: '', location: '', size: '' });
    const [plots, setPlots] = useState([]);
    const [showPlotForm, setShowPlotForm] = useState(false);
    const [newPlot, setNewPlot] = useState({ name: '', area: '', soil_type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlotChange = (e) => {
        const { name, value } = e.target;
        setNewPlot(prev => ({ ...prev, [name]: value }));
    };

    const addPlot = () => {
        if (!newPlot.name || !newPlot.area) {
            alert('Please enter plot name and area');
            return;
        }
        const plotArea = parseFloat(newPlot.area);
        const farmSize = parseFloat(formData.size);
        const currentTotalArea = plots.reduce((sum, p) => sum + parseFloat(p.area), 0);
        if (farmSize && (currentTotalArea + plotArea) > farmSize) {
            alert('Total plot area exceeds farm size');
            return;
        }
        setPlots([...plots, { ...newPlot, area: plotArea }]);
        setNewPlot({ name: '', area: '', soil_type: '' });
        setShowPlotForm(false);
    };

    const removePlot = (index) => setPlots(plots.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId') || 1;
            const payload = {
                name: formData.name,
                location: formData.location || null,
                size: formData.size ? parseFloat(formData.size) : null,
                owner_id: parseInt(userId),
                plots: plots.length > 0 ? plots : undefined,
            };
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/farms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create farm');
            router.push(`/farm/${data.farm.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const soilTypes = [
        { value: 'sandy', label: 'Sandy' },
        { value: 'clay', label: 'Clay' },
        { value: 'loam', label: 'Loam' },
        { value: 'silty', label: 'Silty' },
        { value: 'peaty', label: 'Peaty' },
        { value: 'chalky', label: 'Chalky' },
    ];

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
                            <Link
                                key={item.name}
                                href={`/${item.name}`}
                                className={`db-nav-item ${item.name === 'new-farm' ? 'active' : ''}`}
                            >
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
                    <div className="db-user-avatar">JF</div>
                    <div className="db-user-info">
                        <p className="db-user-name">John Farmer</p>
                        <p className="db-user-role">Farm Manager</p>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="db-main">
                {/* Header */}
                <header className="db-header">
                    <div className="db-header-left">
                        <h1 className="db-page-title">New Farm</h1>
                        <p className="db-page-subtitle">Register a new farm to start managing it</p>
                    </div>
                    <Link href="/dashboard" className="cf-back-btn">
                        <ChevronLeft size={16} /> Back to Dashboard
                    </Link>
                </header>

                {/* Form Content */}
                <div className="cf-content">
                    {error && (
                        <div className="cf-error">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="cf-form">
                        {/* Left column */}
                        <div className="cf-left">
                            {/* Basic Info */}
                            <section className="cf-section">
                                <div className="cf-section-title">
                                    <Sprout size={18} color="#22c55e" />
                                    <h2>Basic Information</h2>
                                </div>

                                <div className="cf-field">
                                    <label htmlFor="name">
                                        Farm Name <span className="cf-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Green Valley Farm"
                                        required
                                        minLength={3}
                                        maxLength={100}
                                    />
                                </div>

                                <div className="cf-field">
                                    <label htmlFor="location">
                                        <MapPin size={13} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Tan Phu, Cu Chi, HCM"
                                    />
                                </div>

                                <div className="cf-field">
                                    <label htmlFor="size">
                                        <Maximize2 size={13} /> Total Area (hectares)
                                    </label>
                                    <input
                                        type="number"
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        placeholder="e.g. 2.5"
                                        step="0.01"
                                        min="0"
                                        max="10000"
                                    />
                                    <span className="cf-hint">Total area across all plots</span>
                                </div>
                            </section>

                            {/* Actions */}
                            <div className="cf-actions">
                                <button
                                    type="button"
                                    className="cf-btn-cancel"
                                    onClick={() => router.back()}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cf-btn-submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>Creating…</>
                                    ) : (
                                        <><CheckCircle2 size={16} /> Create Farm</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right column — Plots */}
                        <div className="cf-right">
                            <section className="cf-section">
                                <div className="cf-section-title">
                                    <LayoutDashboard size={18} color="#22c55e" />
                                    <h2>Land Plots <span className="cf-optional">(optional)</span></h2>
                                    <button
                                        type="button"
                                        className="cf-add-btn"
                                        onClick={() => setShowPlotForm(!showPlotForm)}
                                    >
                                        {showPlotForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Plot</>}
                                    </button>
                                </div>

                                {/* Add Plot inline form */}
                                {showPlotForm && (
                                    <div className="cf-plot-form">
                                        <div className="cf-plot-row">
                                            <div className="cf-field">
                                                <label>Plot Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={newPlot.name}
                                                    onChange={handlePlotChange}
                                                    placeholder="e.g. Plot A"
                                                />
                                            </div>
                                            <div className="cf-field">
                                                <label>Area (ha)</label>
                                                <input
                                                    type="number"
                                                    name="area"
                                                    value={newPlot.area}
                                                    onChange={handlePlotChange}
                                                    placeholder="1.0"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </div>
                                            <div className="cf-field">
                                                <label>Soil Type</label>
                                                <select name="soil_type" value={newPlot.soil_type} onChange={handlePlotChange}>
                                                    <option value="">Select soil</option>
                                                    {soilTypes.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="button" className="cf-add-plot-confirm" onClick={addPlot}>
                                            <Plus size={14} /> Add Plot
                                        </button>
                                    </div>
                                )}

                                {/* List */}
                                {plots.length > 0 ? (
                                    <div className="cf-plots-list">
                                        {plots.map((plot, index) => (
                                            <div key={index} className="cf-plot-card">
                                                <div className="cf-plot-icon">
                                                    <Sprout size={16} color="#22c55e" />
                                                </div>
                                                <div className="cf-plot-info">
                                                    <p className="cf-plot-name">{plot.name}</p>
                                                    <p className="cf-plot-meta">
                                                        {plot.area} ha{plot.soil_type ? ` · ${plot.soil_type}` : ''}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="cf-remove-btn"
                                                    onClick={() => removePlot(index)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}

                                        <div className="cf-total-bar">
                                            <span>Total area</span>
                                            <strong>{plots.reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(2)} ha</strong>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cf-plots-empty">
                                        <Sprout size={32} color="#cbd5e1" />
                                        <p>No plots added yet</p>
                                        <span>Click "Add Plot" to divide your farm into sections</span>
                                    </div>
                                )}
                            </section>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
