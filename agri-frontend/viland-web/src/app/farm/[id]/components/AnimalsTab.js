'use client';
import { useState, useEffect } from 'react';
import { Beef, Plus, Trash2, Pencil, X, Heart, Syringe, Hash } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const HEALTH_COLORS = {
    healthy: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: 'Khỏe mạnh' },
    sick: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: 'Đang bệnh' },
    recovery: { bg: 'rgba(234,179,8,0.12)', color: '#eab308', label: 'Hồi phục' },
    dead: { bg: 'rgba(100,116,139,0.2)', color: '#94a3b8', label: 'Đã chết' },
};

export default function AnimalsTab({ farmId }) {
    const [animals, setAnimals] = useState([]);
    const [animalTypes, setAnimalTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({
        animal_type_id: '', type: '', quantity: '', health_status: 'healthy', vaccine_date: '',
    });

    useEffect(() => { fetchAll(); }, [farmId]);

    const fetchAll = async () => {
        try {
            const [animalsRes, typesRes] = await Promise.all([
                fetch(`${API}/farms/${farmId}/animals`),
                fetch(`${API}/farms/${farmId}/animals/types`),
            ]);
            if (animalsRes.ok) setAnimals(await animalsRes.json());
            if (typesRes.ok) setAnimalTypes(await typesRes.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const openAdd = () => {
        setEditItem(null);
        setForm({ animal_type_id: '', type: '', quantity: '', health_status: 'healthy', vaccine_date: '' });
        setShowForm(true);
    };

    const openEdit = (a) => {
        setEditItem(a);
        setForm({
            animal_type_id: a.animal_type_id || '',
            type: a.type || '',
            quantity: a.quantity || '',
            health_status: a.health_status || 'healthy',
            vaccine_date: a.vaccine_date ? a.vaccine_date.slice(0, 10) : '',
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editItem ? `${API}/animals/${editItem.id}` : `${API}/farms/${farmId}/animals`;
        const method = editItem ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) { setShowForm(false); fetchAll(); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa vật nuôi này?')) return;
        await fetch(`${API}/animals/${id}`, { method: 'DELETE' });
        fetchAll();
    };

    const totalAnimals = animals.reduce((sum, a) => sum + (Number(a.quantity) || 0), 0);

    if (loading) return <div className="loading">Đang tải vật nuôi...</div>;

    return (
        <div style={{ maxWidth: 1100 }}>
            {/* Header */}
            <div className="tab-header">
                <div>
                    <h2 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--fd-text-p, #f1f5f9)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Beef size={20} color="#22c55e" /> Quản Lý Vật Nuôi
                        <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '0.75rem', padding: '2px 10px', borderRadius: 50, fontWeight: 600 }}>
                            {animals.length} loài
                        </span>
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>Tổng số: <strong style={{ color: '#22c55e' }}>{totalAnimals}</strong> con</p>
                </div>
                <button className="btn-primary" onClick={openAdd}>
                    <Plus size={15} /> Thêm Vật Nuôi
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="plot-form" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, color: 'var(--fd-text-p, #f1f5f9)' }}>{editItem ? 'Chỉnh Sửa Vật Nuôi' : 'Thêm Vật Nuôi Mới'}</h4>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Tên / Mô tả *</label>
                                <input required value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} placeholder="VD: Bò sữa, Gà công nghiệp" />
                            </div>
                            <div className="form-group">
                                <label>Loại vật nuôi</label>
                                <select value={form.animal_type_id} onChange={e => setForm(p => ({ ...p, animal_type_id: e.target.value }))}>
                                    <option value="">-- Chọn loại --</option>
                                    {animalTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Số lượng (con)</label>
                                <input type="number" required value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} placeholder="0" />
                            </div>
                            <div className="form-group">
                                <label>Tình trạng sức khỏe</label>
                                <select value={form.health_status} onChange={e => setForm(p => ({ ...p, health_status: e.target.value }))}>
                                    <option value="healthy">Khỏe mạnh</option>
                                    <option value="sick">Đang bệnh</option>
                                    <option value="recovery">Đang hồi phục</option>
                                    <option value="dead">Đã chết</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ngày tiêm vaccine gần nhất</label>
                                <input type="date" value={form.vaccine_date} onChange={e => setForm(p => ({ ...p, vaccine_date: e.target.value }))} />
                            </div>
                        </div>
                        <button type="submit" className="btn-submit">{editItem ? 'Cập Nhật' : 'Thêm Mới'}</button>
                    </form>
                </div>
            )}

            {/* List */}
            {animals.length === 0 ? (
                <div className="empty-state">
                    <Beef size={48} color="#334155" />
                    <p style={{ marginTop: 12, color: '#94a3b8' }}>Chưa có vật nuôi nào</p>
                    <p className="empty-hint">Nhấn "Thêm Vật Nuôi" để bắt đầu</p>
                </div>
            ) : (
                <div className="plots-grid">
                    {animals.map(animal => {
                        const h = HEALTH_COLORS[animal.health_status] || HEALTH_COLORS.healthy;
                        return (
                            <div key={animal.id} className="plot-card">
                                <div className="plot-header">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Beef size={16} color="#22c55e" /> {animal.type}
                                    </h4>
                                    <span className="status-badge" style={{ background: h.bg, color: h.color }}>
                                        <Heart size={10} style={{ display: 'inline', marginRight: 3 }} />{h.label}
                                    </span>
                                </div>
                                <div className="plot-details">
                                    {animal.animal_type_name && <p>🐾 Loại: <strong>{animal.animal_type_name}</strong></p>}
                                    <p><Hash size={12} style={{ display: 'inline', marginRight: 4 }} />Số lượng: <strong style={{ color: '#22c55e' }}>{animal.quantity} con</strong></p>
                                    {animal.vaccine_date && (
                                        <p><Syringe size={12} style={{ display: 'inline', marginRight: 4 }} />Tiêm vaccine: {new Date(animal.vaccine_date).toLocaleDateString('vi-VN')}</p>
                                    )}
                                </div>
                                <div className="plot-actions">
                                    <button className="btn-action btn-edit" onClick={() => openEdit(animal)}><Pencil size={13} /> Sửa</button>
                                    <button className="btn-action btn-delete" onClick={() => handleDelete(animal.id)}><Trash2 size={13} /> Xóa</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
