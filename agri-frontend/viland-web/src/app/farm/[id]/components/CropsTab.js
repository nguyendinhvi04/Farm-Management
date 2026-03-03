'use client';
import { useState, useEffect } from 'react';
import { Wheat, Plus, Trash2, Pencil, X, Sprout, CalendarDays, Package } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const STATUS_COLORS = {
    growing: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: 'Đang trồng' },
    harvested: { bg: 'rgba(234,179,8,0.12)', color: '#eab308', label: 'Đã thu hoạch' },
    failed: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: 'Thất bại' },
    planned: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', label: 'Kế hoạch' },
};

export default function CropsTab({ farmId }) {
    const [crops, setCrops] = useState([]);
    const [cropTypes, setCropTypes] = useState([]);
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({
        plot_id: '', crop_type_id: '', name: '',
        plant_date: '', harvest_date: '', quantity: '', status: 'growing',
    });

    useEffect(() => { fetchAll(); }, [farmId]);

    const fetchAll = async () => {
        try {
            const [cropsRes, typesRes, plotsRes] = await Promise.all([
                fetch(`${API}/farms/${farmId}/crops`),
                fetch(`${API}/farms/${farmId}/crops/types`),
                fetch(`${API}/farms/${farmId}/plots`),
            ]);
            if (cropsRes.ok) setCrops(await cropsRes.json());
            if (typesRes.ok) setCropTypes(await typesRes.json());
            if (plotsRes.ok) setPlots(await plotsRes.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const openAdd = () => {
        setEditItem(null);
        setForm({ plot_id: '', crop_type_id: '', name: '', plant_date: '', harvest_date: '', quantity: '', status: 'growing' });
        setShowForm(true);
    };

    const openEdit = (c) => {
        setEditItem(c);
        setForm({
            plot_id: c.plot_id || '',
            crop_type_id: c.crop_type_id || '',
            name: c.name || '',
            plant_date: c.plant_date ? c.plant_date.slice(0, 10) : '',
            harvest_date: c.harvest_date ? c.harvest_date.slice(0, 10) : '',
            quantity: c.quantity || '',
            status: c.status || 'growing',
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editItem ? `${API}/crops/${editItem.id}` : `${API}/farms/${farmId}/crops`;
        const method = editItem ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) { setShowForm(false); fetchAll(); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa cây trồng này?')) return;
        await fetch(`${API}/crops/${id}`, { method: 'DELETE' });
        fetchAll();
    };

    if (loading) return <div className="loading">Đang tải cây trồng...</div>;

    return (
        <div style={{ maxWidth: 1100 }}>
            {/* Header */}
            <div className="tab-header">
                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--fd-text-p, #f1f5f9)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Wheat size={20} color="#22c55e" /> Quản Lý Cây Trồng
                    <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '0.75rem', padding: '2px 10px', borderRadius: 50, fontWeight: 600 }}>
                        {crops.length}
                    </span>
                </h2>
                <button className="btn-primary" onClick={openAdd}>
                    <Plus size={15} /> Thêm Cây Trồng
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="plot-form" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, color: 'var(--fd-text-p, #f1f5f9)' }}>{editItem ? 'Chỉnh Sửa Cây Trồng' : 'Thêm Cây Trồng Mới'}</h4>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Tên cây trồng *</label>
                                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="VD: Lúa vụ hè" />
                            </div>
                            <div className="form-group">
                                <label>Lô đất</label>
                                <select value={form.plot_id} onChange={e => setForm(p => ({ ...p, plot_id: e.target.value }))}>
                                    <option value="">-- Chọn lô đất --</option>
                                    {plots.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Loại cây</label>
                                <select value={form.crop_type_id} onChange={e => setForm(p => ({ ...p, crop_type_id: e.target.value }))}>
                                    <option value="">-- Chọn loại cây --</option>
                                    {cropTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Trạng thái</label>
                                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                                    <option value="planned">Kế hoạch</option>
                                    <option value="growing">Đang trồng</option>
                                    <option value="harvested">Đã thu hoạch</option>
                                    <option value="failed">Thất bại</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ngày trồng</label>
                                <input type="date" value={form.plant_date} onChange={e => setForm(p => ({ ...p, plant_date: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label>Ngày thu hoạch (dự kiến)</label>
                                <input type="date" value={form.harvest_date} onChange={e => setForm(p => ({ ...p, harvest_date: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label>Sản lượng (kg)</label>
                                <input type="number" value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} placeholder="0" />
                            </div>
                        </div>
                        <button type="submit" className="btn-submit">{editItem ? 'Cập Nhật' : 'Thêm Mới'}</button>
                    </form>
                </div>
            )}

            {/* List */}
            {crops.length === 0 ? (
                <div className="empty-state">
                    <Sprout size={48} color="#334155" />
                    <p style={{ marginTop: 12, color: '#94a3b8' }}>Chưa có cây trồng nào</p>
                    <p className="empty-hint">Nhấn "Thêm Cây Trồng" để bắt đầu</p>
                </div>
            ) : (
                <div className="plots-grid">
                    {crops.map(crop => {
                        const s = STATUS_COLORS[crop.status] || STATUS_COLORS.growing;
                        return (
                            <div key={crop.id} className="plot-card">
                                <div className="plot-header">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Wheat size={16} color="#22c55e" /> {crop.name}
                                    </h4>
                                    <span className="status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                                </div>
                                <div className="plot-details">
                                    {crop.crop_type_name && <p>🌱 Loại: <strong>{crop.crop_type_name}</strong></p>}
                                    {crop.plot_name && <p>📍 Lô đất: {crop.plot_name}</p>}
                                    {crop.plant_date && <p><CalendarDays size={12} style={{ display: 'inline', marginRight: 4 }} />Trồng: {new Date(crop.plant_date).toLocaleDateString('vi-VN')}</p>}
                                    {crop.harvest_date && <p>🗓️ Thu hoạch: {new Date(crop.harvest_date).toLocaleDateString('vi-VN')}</p>}
                                    {crop.quantity && <p><Package size={12} style={{ display: 'inline', marginRight: 4 }} />Sản lượng: {crop.quantity} kg</p>}
                                </div>
                                <div className="plot-actions">
                                    <button className="btn-action btn-edit" onClick={() => openEdit(crop)}><Pencil size={13} /> Sửa</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDelete(crop.id)}><Trash2 size={13} /> Xóa</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
