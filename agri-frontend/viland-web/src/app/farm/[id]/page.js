'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, MapPin, Maximize2, Calendar, Settings,
    LayoutDashboard, ScanLine, Wheat, Beef, Package,
    DollarSign, ShoppingCart, Users, UserCheck, BarChart3,
    ChevronRight, Sprout, Edit3, Bell
} from 'lucide-react';
import OverviewTab from './components/OverviewTab';
import PlotsTab from './components/PlotsTab';
import CropsTab from './components/CropsTab';
import AnimalsTab from './components/AnimalsTab';
import './styles/Dashboard.css';

const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Tổng Quan' },
    { id: 'plots', icon: ScanLine, label: 'Lô Đất' },
    { id: 'crops', icon: Wheat, label: 'Cây Trồng' },
    { id: 'animals', icon: Beef, label: 'Vật Nuôi' },
    { id: 'inventory', icon: Package, label: 'Kho' },
    { id: 'transactions', icon: DollarSign, label: 'Thu Chi' },
    { id: 'orders', icon: ShoppingCart, label: 'Đơn Hàng' },
    { id: 'customers', icon: Users, label: 'Khách Hàng' },
    { id: 'assignments', icon: UserCheck, label: 'Nhân Sự' },
    { id: 'reports', icon: BarChart3, label: 'Báo Cáo' },
];

export default function FarmDashboard() {
    const params = useParams();
    const router = useRouter();
    const farmId = params.id;

    const [activeTab, setActiveTab] = useState('overview');
    const [farmData, setFarmData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => { fetchFarmData(); }, [farmId]);

    const fetchFarmData = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/farms/${farmId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Không tải được dữ liệu');
            setFarmData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab farmId={farmId} />;
            case 'plots': return <PlotsTab farmId={farmId} />;
            case 'crops': return <CropsTab farmId={farmId} />;
            case 'animals': return <AnimalsTab farmId={farmId} />;
            default:
                return (
                    <div className="fd-coming-soon">
                        <div className="fd-coming-icon">
                            {(() => { const T = tabs.find(t => t.id === activeTab); return T ? <T.icon size={48} /> : null; })()}
                        </div>
                        <h3>{tabs.find(t => t.id === activeTab)?.label}</h3>
                        <p>Tính năng đang được phát triển</p>
                        <span className="fd-badge-soon">Coming Soon</span>
                    </div>
                );
        }
    };

    if (loading) return (
        <div className="fd-loading-screen">
            <Sprout size={36} className="fd-loading-icon" color="#22c55e" />
            <p>Đang tải dữ liệu nông trại...</p>
        </div>
    );

    if (error) return (
        <div className="fd-error-screen">
            <h2>⚠️ Lỗi</h2>
            <p>{error}</p>
            <button onClick={() => router.push('/dashboard')} className="fd-back-btn">← Quay lại Dashboard</button>
        </div>
    );

    return (
        <div className="fd-root">
            {/* ===== SIDEBAR ===== */}
            <aside className="fd-sidebar">
                <div className="fd-sidebar-top">
                    <Link href="/dashboard" className="fd-back-link">
                        <ArrowLeft size={16} /> Dashboard
                    </Link>
                    <div className="fd-sidebar-farm-name">
                        <Sprout size={16} color="#22c55e" />
                        <span>{farmData?.name || 'Farm'}</span>
                    </div>
                </div>

                <nav className="fd-nav">
                    {tabs.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            className={`fd-nav-item ${activeTab === id ? 'active' : ''}`}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon size={17} />
                            <span>{label}</span>
                            {activeTab === id && <ChevronRight size={14} className="fd-nav-arrow" />}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* ===== MAIN ===== */}
            <div className="fd-main">
                {/* Header */}
                <header className="fd-header">
                    <div className="fd-header-left">
                        <h1 className="fd-farm-title">{farmData?.name || 'Farm Dashboard'}</h1>
                        <div className="fd-farm-chips">
                            {farmData?.location && (
                                <span className="fd-chip"><MapPin size={12} /> {farmData.location}</span>
                            )}
                            {farmData?.size && (
                                <span className="fd-chip"><Maximize2 size={12} /> {farmData.size} ha</span>
                            )}
                            {farmData?.created_at && (
                                <span className="fd-chip">
                                    <Calendar size={12} />
                                    {new Date(farmData.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            )}
                            <span className="fd-chip fd-chip-active">● Active</span>
                        </div>
                    </div>
                    <div className="fd-header-right">
                        <button className="fd-icon-btn" aria-label="Notifications">
                            <Bell size={18} />
                        </button>
                        <button className="fd-icon-btn" aria-label="Settings">
                            <Settings size={18} />
                        </button>
                        <button className="fd-btn-edit">
                            <Edit3 size={15} /> Chỉnh Sửa
                        </button>
                    </div>
                </header>

                {/* Tab Bar */}
                <div className="fd-tab-bar">
                    {tabs.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            className={`fd-tab ${activeTab === id ? 'active' : ''}`}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <main className="fd-content">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
}
