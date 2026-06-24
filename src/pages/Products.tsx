import React, { useState, useMemo } from "react";
import "./Products.css";
import { initialProducts, CATEGORIES } from "../data/products";
import type { Product, ProductStatus } from "../data/products";
import {
  IconPackage,
  IconSearch,
  IconPlus,
  IconX,
  IconPhoto,
} from "../utils/icons";

function getStatus(stock: number): ProductStatus {
  if (stock === 0) return "out";
  if (stock <= 5) return "low";
  return "active";
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  active: "Activo",
  low: "Stock bajo",
  out: "Agotado",
};

const EMPTY_FORM = {
  name: "",
  sku: "",
  category: CATEGORIES[0],
  stock: "",
  price: "",
  image: "",
};

export const Productos: React.FC = () => {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Todas");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [imagePreview, setImagePreview] = useState<string>("");

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "Todas" || p.category === filterCat;
      const matchStatus = filterStatus === "Todos" || p.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    });
  }, [items, search, filterCat, filterStatus]);

  /* ── Open drawer ── */
  function openNew() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setImagePreview("");
    setDrawerOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      sku: p.sku,
      category: p.category,
      stock: String(p.stock),
      price: String(p.price),
      image: p.image,
    });
    setImagePreview(p.image);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditing(null);
  }

  /* ── Image upload ── */
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setImagePreview(url);
      setForm((f) => ({ ...f, image: url }));
    };
    reader.readAsDataURL(file);
  }

  /* ── Save ── */
  function handleSave() {
    const stock = parseInt(form.stock) || 0;
    const price = parseFloat(form.price) || 0;
    const status = getStatus(stock);

    if (!form.name.trim() || !form.sku.trim()) return;

    if (editing) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...form, stock, price, status } : p,
        ),
      );
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category,
        stock,
        price,
        image: form.image,
        status,
      };
      setItems((prev) => [newProduct, ...prev]);
    }
    closeDrawer();
  }

  /* ── Delete ── */
  function handleDelete() {
    if (!editing) return;
    setItems((prev) => prev.filter((p) => p.id !== editing.id));
    closeDrawer();
  }

  return (
    <>
      <main className="productos">
        {/* ── Header ── */}
        <div className="productos-header">
          <div>
            <h1 className="productos-title">Productos</h1>
            <p className="productos-sub">
              {items.length} productos en inventario
            </p>
          </div>
          <button className="btn-add" onClick={openNew}>
            <IconPlus />
            Agregar producto
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div className="productos-toolbar">
          <div className="search-wrap">
            <IconSearch />
            <input
              className="search-input"
              placeholder="Buscar por nombre o SKU…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option>Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="low">Stock bajo</option>
            <option value="out">Agotado</option>
          </select>
        </div>

        {/* ── Table ── */}
        <div className="table-panel">
          <table className="prod-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th className="col-num">Stock</th>
                <th className="col-num">Precio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="table-empty">
                      No hay productos que coincidan con la búsqueda.
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} onClick={() => openEdit(p)}>
                    <td>
                      <div className="prod-cell">
                        <div className="prod-thumb">
                          {p.image ? (
                            <img src={p.image} alt={p.name} />
                          ) : (
                            <IconPackage />
                          )}
                        </div>
                        <div>
                          <div className="prod-name">{p.name}</div>
                          <div className="prod-sku">{p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "rgba(29,29,31,.55)" }}>
                      {p.category}
                    </td>
                    <td className="col-num">{p.stock}</td>
                    <td className="col-num">{formatCurrency(p.price)}</td>
                    <td>
                      <span
                        className={`status-badge status-badge--${p.status}`}
                      >
                        {STATUS_LABEL[p.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ── Drawer overlay ── */}
      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeDrawer}
      />

      {/* ── Drawer ── */}
      <div className={`drawer${drawerOpen ? " open" : ""}`}>
        <div className="drawer-header">
          <p className="drawer-title">
            {editing ? "Editar producto" : "Nuevo producto"}
          </p>
          <button className="drawer-close" onClick={closeDrawer}>
            <IconX />
          </button>
        </div>

        <div className="drawer-body">
          {/* Imagen */}
          <div className="field">
            <label>Imagen</label>
            <div className="image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" />
              ) : (
                <>
                  <span className="image-upload-icon">
                    <IconPhoto />
                  </span>
                  <span>Subir imagen</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>
          </div>

          {/* Nombre */}
          <div className="field">
            <label>Nombre del producto</label>
            <input
              placeholder="Ej. Auriculares Bluetooth"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          {/* SKU + Categoría */}
          <div className="field-row">
            <div className="field">
              <label>SKU / Código</label>
              <input
                placeholder="ELC-001"
                value={form.sku}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sku: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>Categoría</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stock + Precio */}
          <div className="field-row">
            <div className="field">
              <label>Stock</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>Precio (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          {editing && (
            <button className="btn-delete" onClick={handleDelete}>
              Eliminar
            </button>
          )}
          <button className="btn-cancel" onClick={closeDrawer}>
            Cancelar
          </button>
          <button className="btn-save" onClick={handleSave}>
            {editing ? "Guardar cambios" : "Agregar producto"}
          </button>
        </div>
      </div>
    </>
  );
};
