export default function Sidebar({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'overview', icon: '📊', label: 'Tổng Quan' },
        { id: 'plots', icon: '🏞️', label: 'Lô Đất' },
        { id: 'crops', icon: '🌾', label: 'Cây Trồng' },
        { id: 'animals', icon: '🐄', label: 'Vật Nuôi' },
        { id: 'inventory', icon: '📦', label: 'Kho' },
        { id: 'transactions', icon: '💰', label: 'Thu Chi' },
        { id: 'orders', icon: '🧾', label: 'Đơn Hàng' },
        { id: 'customers', icon: '👥', label: 'Khách Hàng' },
        { id: 'assignments', icon: '👨‍🌾', label: 'Nhân Sự' },
        { id: 'reports', icon: '📈', label: 'Báo Cáo' },
    ];

    return (
        <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
