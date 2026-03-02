'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';

export default function OverviewTab({ farmId }) {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatistics();
    }, [farmId]);

    const fetchStatistics = async () => {
        try {
            const response = await fetch(`http://localhost:8000/farms/${farmId}/statistics`);
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Đang tải thống kê...</div>;
    }

    return (
        <div className="overview-tab">
            <h2 className="tab-title">Tổng Quan Nông Trại</h2>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <StatCard
                    icon="🏞️"
                    title="Lô Đất"
                    stats={[
                        { label: 'Tổng số lô', value: statistics?.total_plots || 0 },
                        { label: 'Đang hoạt động', value: statistics?.total_plots || 0 },
                    ]}
                    color="#48bb78"
                />

                <StatCard
                    icon="🌾"
                    title="Cây Trồng"
                    stats={[
                        { label: 'Tổng số cây', value: statistics?.total_crops || 0 },
                        { label: 'Sắp thu hoạch', value: 0 },
                    ]}
                    color="#4299e1"
                />

                <StatCard
                    icon="🐄"
                    title="Vật Nuôi"
                    stats={[
                        { label: 'Tổng số', value: statistics?.total_animals || 0 },
                        { label: 'Khỏe mạnh', value: statistics?.total_animals || 0 },
                    ]}
                    color="#f6ad55"
                />

                <StatCard
                    icon="💰"
                    title="Tài Chính"
                    stats={[
                        { label: 'Thu nhập', value: `${(statistics?.total_income || 0).toLocaleString()} đ` },
                        { label: 'Chi phí', value: `${(statistics?.total_expense || 0).toLocaleString()} đ` },
                        { label: 'Lợi nhuận', value: `${((statistics?.total_income || 0) - (statistics?.total_expense || 0)).toLocaleString()} đ` },
                    ]}
                    color="#667eea"
                />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h3>Hành Động Nhanh</h3>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn">
                        <span className="action-icon">➕</span>
                        <span>Thêm Lô Đất</span>
                    </button>
                    <button className="quick-action-btn">
                        <span className="action-icon">🌱</span>
                        <span>Trồng Cây</span>
                    </button>
                    <button className="quick-action-btn">
                        <span className="action-icon">🐮</span>
                        <span>Thêm Vật Nuôi</span>
                    </button>
                    <button className="quick-action-btn">
                        <span className="action-icon">📦</span>
                        <span>Nhập Kho</span>
                    </button>
                    <button className="quick-action-btn">
                        <span className="action-icon">💵</span>
                        <span>Ghi Thu Chi</span>
                    </button>
                    <button className="quick-action-btn">
                        <span className="action-icon">👥</span>
                        <span>Thêm Khách Hàng</span>
                    </button>
                </div>
            </div>

            {/* Recent Activities Placeholder */}
            <div className="recent-activities">
                <h3>Hoạt Động Gần Đây</h3>
                <div className="activities-placeholder">
                    <p>Chưa có hoạt động nào được ghi nhận</p>
                </div>
            </div>
        </div>
    );
}
