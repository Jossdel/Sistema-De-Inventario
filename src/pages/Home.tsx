import type React from "react";
import "./Home.css";

interface StatCard {
  icon: React.ReactNode;
  value: number;
  label: string;
  variant: "blue" | "teal" | "amber" | "red";
}

interface AlertItem {
  name: string;
  stock: number;
  variant: "amber" | "red";
}

const stats: StatCard[] = [
  { icon: "📦", value: 125, label: "Productos", variant: "blue" },
  { icon: "🗂", value: 8, label: "Categorías", variant: "teal" },
  { icon: "⚠️", value: 12, label: "Stock bajo", variant: "amber" },
  { icon: "🚫", value: 3, label: "Agotados", variant: "red" },
];

const alerts: AlertItem[] = [
  { name: "Cable HDMI 2m", stock: 0, variant: "red" },
  { name: "Teclado inalámbrico K3", stock: 0, variant: "red" },
  { name: 'Monitor 24" Full HD', stock: 2, variant: "amber" },
  { name: "Auriculares Sony WH", stock: 3, variant: "amber" },
];

export const Dashboard: React.FC = () => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <main className="dashboard">
      <h1 className="dash-greeting">{greeting}, Admin</h1>
      <p className="dash-sub">Resumen del inventario — hoy</p>

      {/* ── Tarjetas ── */}
      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card stat-card--${s.variant}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Alertas ── */}
      <div className="alert-panel">
        <p className="alert-panel__title">Requieren atención</p>
        {alerts.map((a) => (
          <div key={a.name} className="alert-row">
            <span className={`badge badge--${a.variant}`}>
              {a.variant === "red" ? "Agotado" : "Stock bajo"}
            </span>
            <span className="alert-name">{a.name}</span>
            <span className="alert-stock">{a.stock} uds.</span>
          </div>
        ))}
      </div>
    </main>
  );
};
