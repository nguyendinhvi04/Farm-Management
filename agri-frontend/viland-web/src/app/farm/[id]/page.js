'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import PlotsTab from './components/PlotsTab';
import './styles/Dashboard.css';

export default function FarmDashboard() {
    const params = useParams();
    const farmId = params.id;

    const [activeTab, setActiveTab] = useState('overview');
    const [farmData, setFarmData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFarmData();
    }, [farmId]);

    const fetchFarmData = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/farms/${farmId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch farm data');
            }

            setFarmData(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching farm:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab farmId={farmId} />;
            case 'plots':
                return <PlotsTab farmId={farmId} />;
            case 'crops':
                return <div className="tab-placeholder">🌾 Cây Trồng - Coming Soon</div>;
            case 'animals':
                return <div className="tab-placeholder">🐄 Vật Nuôi - Coming Soon</div>;
            case 'inventory':
                return <div className="tab-placeholder">📦 Kho - Coming Soon</div>;
            case 'transactions':
                return <div className="tab-placeholder">💰 Thu Chi - Coming Soon</div>;
            case 'orders':
                return <div className="tab-placeholder">🧾 Đơn Hàng - Coming Soon</div>;
            case 'customers':
                return <div className="tab-placeholder">👥 Khách Hàng - Coming Soon</div>;
            case 'assignments':
                return <div className="tab-placeholder">👨‍🌾 Nhân Sự - Coming Soon</div>;
            case 'reports':
                return <div className="tab-placeholder">📈 Báo Cáo - Coming Soon</div>;
            default:
                return <OverviewTab farmId={farmId} />;
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu nông trại...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <h2>⚠️ Lỗi</h2>
                <p>{error}</p>
                <button onClick={() => window.location.href = '/'}>Về Trang Chủ</button>
            </div>
        );
    }

    return (
        <div className="farm-dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="farm-info">
                        <h1>{farmData?.name || 'Farm Dashboard'}</h1>
                        <p className="farm-location">
                            📍 {farmData?.location || 'Chưa có địa chỉ'}
                        </p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-header">⚙️ Cài Đặt</button>
                        <button className="btn-header btn-primary">✏️ Chỉnh Sửa</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="dashboard-main">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="dashboard-content">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
}
