import type React from "react";

import "./Dashboard.css";
import {
  alerts,
  recentProducts,
  summaryStats,
  topProducts,
} from "../data/products";
import {
  IconAlertTriangle,
  IconArrowUp,
  IconBan,
  IconCoin,
  IconFolder,
  IconPackage,
} from "../utils/icons";

const maxSales = Math.max(...topProducts.map((p) => p.sales));

function getGreeting(hour: number): string {
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const Dashboard: React.FC = () => {
  const greeting = getGreeting(new Date().getHours());

  return (
    <main className="dashboard">
      <div className="dash-header">
        <div>
          <h1 className="dash-greeting">{greeting}, Admin</h1>
          <p className="dash-sub">Resumen del inventario — hoy</p>
        </div>
        <span className="dash-updated">Actualizado hace 5 min</span>
      </div>

      {/* ── Tarjetas resumen ── */}
      <div className="stat-grid">
        <div className="stat-card stat-card--blue">
          <div className="stat-icon">
            <IconPackage />
          </div>
          <p className="stat-value">{summaryStats.totalProducts}</p>
          <p className="stat-label">Productos</p>
          <p className="stat-trend stat-trend--up">
            <IconArrowUp />
            {summaryStats.productsTrend}
          </p>
        </div>

        <div className="stat-card stat-card--teal">
          <div className="stat-icon">
            <IconCoin />
          </div>
          <p className="stat-value">
            {formatCurrency(summaryStats.inventoryValue)}
          </p>
          <p className="stat-label">Valor inventario</p>
          <p className="stat-trend stat-trend--up">
            <IconArrowUp />
            {summaryStats.inventoryTrend}
          </p>
        </div>

        <div className="stat-card stat-card--amber">
          <div className="stat-icon">
            <IconAlertTriangle />
          </div>
          <p className="stat-value">{summaryStats.lowStock}</p>
          <p className="stat-label">Stock bajo</p>
          <p className="stat-trend">Requieren reposición</p>
        </div>

        <div className="stat-card stat-card--red">
          <div className="stat-icon">
            <IconBan />
          </div>
          <p className="stat-value">{summaryStats.outOfStock}</p>
          <p className="stat-label">Agotados</p>
          <p className="stat-trend stat-trend--danger">Acción inmediata</p>
        </div>

        <div className="stat-card stat-card--gray">
          <div className="stat-icon">
            <IconFolder />
          </div>
          <p className="stat-value">{summaryStats.categories}</p>
          <p className="stat-label">Categorías</p>
          <p className="stat-trend">&nbsp;</p>
        </div>
      </div>

      {/* ── Columnas inferiores ── */}
      <div className="dash-columns">
        <div className="alert-panel">
          <p className="alert-panel__title">Requieren atención</p>
          {alerts.map((a) => (
            <div key={a.id} className="alert-row">
              <span className={`badge badge--${a.variant}`}>
                {a.variant === "red" ? "Agotado" : "Stock bajo"}
              </span>
              <span className="alert-name">{a.name}</span>
              <span className="alert-stock">{a.stock} uds.</span>
            </div>
          ))}
        </div>

        <div className="top-products">
          <p className="top-products__title">Top productos</p>
          {topProducts.map((p) => (
            <div key={p.id} className="top-product-row">
              <div className="top-product-row__header">
                <span>{p.name}</span>
                <span className="top-product-row__sales">{p.sales} vtas.</span>
              </div>
              <div className="top-product-row__track">
                <div
                  className="top-product-row__bar"
                  style={{ width: `${(p.sales / maxSales) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Últimos productos agregados ── */}
      <div className="recent-panel">
        <p className="recent-panel__title">Últimos productos agregados</p>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th className="recent-table__num">Stock</th>
              <th className="recent-table__num">Precio</th>
            </tr>
          </thead>
          <tbody>
            {recentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="recent-table__muted">{p.category}</td>
                <td className="recent-table__num">{p.stock}</td>
                <td className="recent-table__num">{formatCurrency(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
