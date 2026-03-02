export default function StatCard({ icon, title, stats, color }) {
    return (
        <div className="stat-card" style={{ borderLeftColor: color }}>
            <div className="stat-header">
                <span className="stat-icon">{icon}</span>
                <h3 className="stat-title">{title}</h3>
            </div>
            <div className="stat-body">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <span className="stat-label">{stat.label}:</span>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
