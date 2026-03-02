'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/CreateFarm.css';

export default function CreateFarmPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        size: '',
    });

    const [plots, setPlots] = useState([]);
    const [showPlotForm, setShowPlotForm] = useState(false);
    const [newPlot, setNewPlot] = useState({
        name: '',
        area: '',
        soil_type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlotChange = (e) => {
        const { name, value } = e.target;
        setNewPlot(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addPlot = () => {
        if (!newPlot.name || !newPlot.area) {
            alert('Vui lòng nhập tên và diện tích lô đất');
            return;
        }

        const plotArea = parseFloat(newPlot.area);
        const farmSize = parseFloat(formData.size);
        const currentTotalArea = plots.reduce((sum, p) => sum + parseFloat(p.area), 0);

        if (farmSize && (currentTotalArea + plotArea) > farmSize) {
            alert('Tổng diện tích các lô đất không được vượt quá diện tích nông trại');
            return;
        }

        setPlots([...plots, { ...newPlot, area: plotArea }]);
        setNewPlot({ name: '', area: '', soil_type: '' });
        setShowPlotForm(false);
    };

    const removePlot = (index) => {
        setPlots(plots.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Get user ID from localStorage or session
            const userId = localStorage.getItem('userId') || 1; // Default to 1 for testing

            const payload = {
                name: formData.name,
                location: formData.location || null,
                size: formData.size ? parseFloat(formData.size) : null,
                owner_id: parseInt(userId),
                plots: plots.length > 0 ? plots : undefined
            };

            const response = await fetch('http://localhost:8000/farms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra khi tạo nông trại');
            }

            alert('Tạo nông trại thành công!');
            router.push(`/farm/${data.farm.id}`); // Redirect to farm dashboard
        } catch (err) {
            setError(err.message);
            console.error('Error creating farm:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-farm-container">
            <div className="create-farm-card">
                <h1>Tạo Nông Trại Mới</h1>
                <p className="subtitle">Điền thông tin để tạo nông trại của bạn</p>

                {error && (
                    <div className="error-message">
                        <span>⚠️ {error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="farm-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Thông Tin Cơ Bản</h2>

                        <div className="form-group">
                            <label htmlFor="name">
                                Tên Nông Trại <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ví dụ: Nông trại Xanh"
                                required
                                minLength={3}
                                maxLength={100}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Địa Chỉ</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Ví dụ: Xã Tân Phú, Huyện Củ Chi, TP.HCM"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="size">Diện Tích (hecta)</label>
                            <input
                                type="number"
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="Ví dụ: 2.5"
                                step="0.01"
                                min="0"
                                max="10000"
                            />
                            <small className="form-hint">Nhập diện tích tổng của nông trại</small>
                        </div>
                    </div>

                    {/* Plots Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <h2>Lô Đất (Tùy chọn)</h2>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setShowPlotForm(!showPlotForm)}
                            >
                                {showPlotForm ? '✕ Hủy' : '+ Thêm Lô Đất'}
                            </button>
                        </div>

                        {showPlotForm && (
                            <div className="plot-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="plot-name">Tên Lô Đất</label>
                                        <input
                                            type="text"
                                            id="plot-name"
                                            name="name"
                                            value={newPlot.name}
                                            onChange={handlePlotChange}
                                            placeholder="Ví dụ: Lô A"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="plot-area">Diện Tích (hecta)</label>
                                        <input
                                            type="number"
                                            id="plot-area"
                                            name="area"
                                            value={newPlot.area}
                                            onChange={handlePlotChange}
                                            placeholder="1.0"
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="plot-soil">Loại Đất</label>
                                        <select
                                            id="plot-soil"
                                            name="soil_type"
                                            value={newPlot.soil_type}
                                            onChange={handlePlotChange}
                                        >
                                            <option value="">Chọn loại đất</option>
                                            <option value="sandy">Đất cát</option>
                                            <option value="clay">Đất sét</option>
                                            <option value="loam">Đất thịt</option>
                                            <option value="silty">Đất bùn</option>
                                            <option value="peaty">Đất than bùn</option>
                                            <option value="chalky">Đất phấn</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="button" className="btn-add-plot" onClick={addPlot}>
                                    Thêm Lô Đất
                                </button>
                            </div>
                        )}

                        {plots.length > 0 && (
                            <div className="plots-list">
                                <h3>Danh Sách Lô Đất ({plots.length})</h3>
                                <div className="plots-grid">
                                    {plots.map((plot, index) => (
                                        <div key={index} className="plot-card">
                                            <div className="plot-info">
                                                <h4>{plot.name}</h4>
                                                <p>{plot.area} hecta</p>
                                                {plot.soil_type && <span className="soil-tag">{plot.soil_type}</span>}
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-remove"
                                                onClick={() => removePlot(index)}
                                                title="Xóa lô đất"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="total-area">
                                    Tổng diện tích: {plots.reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(2)} hecta
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Đang tạo...' : 'Tạo Nông Trại'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
