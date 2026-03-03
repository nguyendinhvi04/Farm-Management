'use client';

import { useState, useEffect } from 'react';

export default function PlotsTab({ farmId }) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        area: '',
        soil_type: '',
        status: 'active'
    });

    useEffect(() => {
        fetchPlots();
    }, [farmId]);

    const fetchPlots = async () => {
        try {
            const response = await fetch(`${API_BASE}/farms/${farmId}/plots`);
            if (response.ok) {
                const data = await response.json();
                setPlots(data);
            }
        } catch (error) {
            console.error('Error fetching plots:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE}/farms/${farmId}/plots`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thêm lô đất thành công!');
                setFormData({ name: '', area: '', soil_type: '', status: 'active' });
                setShowForm(false);
                fetchPlots();
            }
        } catch (error) {
            console.error('Error creating plot:', error);
        }
    };

    const handleDelete = async (plotId) => {
        if (!confirm('Bạn có chắc muốn xóa lô đất này?')) return;

        try {
            const response = await fetch(`${API_BASE}/plots/${plotId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa lô đất thành công!');
                fetchPlots();
            }
        } catch (error) {
            console.error('Error deleting plot:', error);
        }
    };

    if (loading) {
        return <div className="loading">Đang tải danh sách lô đất...</div>;
    }

    return (
        <div className="plots-tab">
            <div className="tab-header">
                <h2 className="tab-title">Quản Lý Lô Đất</h2>
                <button
                    className="btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '✕ Hủy' : '➕ Thêm Lô Đất'}
                </button>
            </div>

            {/* Add Plot Form */}
            {showForm && (
                <form className="plot-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên Lô Đất *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ví dụ: Lô A"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Diện Tích (ha) *</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                placeholder="1.5"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Loại Đất</label>
                            <select
                                value={formData.soil_type}
                                onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                            >
                                <option value="">Chọn loại đất</option>
                                <option value="sandy">Đất cát</option>
                                <option value="clay">Đất sét</option>
                                <option value="loam">Đất thịt</option>
                                <option value="silty">Đất bùn</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">Thêm Lô Đất</button>
                </form>
            )}

            {/* Plots List */}
            <div className="plots-list">
                {plots.length === 0 ? (
                    <div className="empty-state">
                        <p>🏞️ Chưa có lô đất nào</p>
                        <p className="empty-hint">Nhấn "Thêm Lô Đất" để bắt đầu</p>
                    </div>
                ) : (
                    <div className="plots-grid">
                        {plots.map((plot) => (
                            <div key={plot.id} className="plot-card">
                                <div className="plot-header">
                                    <h4>{plot.name}</h4>
                                    <span className={`status-badge ${plot.status}`}>
                                        {plot.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </div>
                                <div className="plot-details">
                                    <p><strong>Diện tích:</strong> {plot.area} ha</p>
                                    {plot.soil_type && <p><strong>Loại đất:</strong> {plot.soil_type}</p>}
                                </div>
                                <div className="plot-actions">
                                    <button className="btn-action btn-edit">✏️ Sửa</button>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => handleDelete(plot.id)}
                                    >
                                        🗑️ Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Statistics Summary */}
            {plots.length > 0 && (
                <div className="plots-summary">
                    <h3>Thống Kê</h3>
                    <div className="summary-stats">
                        <div className="summary-item">
                            <span>Tổng số lô:</span>
                            <strong>{plots.length}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Tổng diện tích:</span>
                            <strong>{plots.reduce((sum, p) => sum + parseFloat(p.area || 0), 0).toFixed(2)} ha</strong>
                        </div>
                        <div className="summary-item">
                            <span>Đang hoạt động:</span>
                            <strong>{plots.filter(p => p.status === 'active').length}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
