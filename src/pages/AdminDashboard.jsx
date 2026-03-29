import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit2, Trash2, ToggleLeft, ToggleRight,
  LayoutGrid, List, LogOut, ChefHat, TrendingUp, UtensilsCrossed,
  CheckCircle2, XCircle, X
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import clsx from 'clsx';

const ALLERGEN_ICONS = {
  'Glutine': '🌾', 'Latticini': '🥛', 'Uova': '🥚', 'Pesce': '🐟',
  'Crostacei': '🦐', 'Soia': '🫘', 'Frutta Secca': '🥜', 'Sedano': '🥬',
  'Senape': '🌻', 'Lupini': '🌱', 'Molluschi': '🦪', 'Sesamo': '🌿',
  'Anidride Solforosa': '🍾',
};

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className={clsx('stat-card glass', accent && 'stat-card--accent')}>
      <div className="stat-card__icon">
        <Icon size={20} />
      </div>
      <div className="stat-card__body">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="confirm-card glass"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="confirm-icon"><Trash2 size={24} /></div>
        <h3 className="confirm-title">Conferma Eliminazione</h3>
        <p className="confirm-msg">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Annulla</button>
          <button className="btn btn-danger" onClick={onConfirm} id="confirm-delete-btn">
            <Trash2 size={15} /> Elimina
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { items, addItem, updateItem, deleteItem, toggleAvailability, logout, CATEGORIES } = useMenu();
  const navigate = useNavigate();
  const categories = CATEGORIES.filter(c => c.id !== 'all');

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [formMode, setFormMode] = useState(null); // null | 'add' | {edit: item}
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleLogout = () => { logout(); navigate('/admin'); };

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchCat = filterCat === 'all' || item.category === filterCat;
      const q = search.toLowerCase();
      const matchQ = !q || item.name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [items, search, filterCat]);

  const stats = useMemo(() => ({
    total: items.length,
    available: items.filter(i => i.available).length,
    categories: new Set(items.map(i => i.category)).size,
    avgPrice: items.length
      ? (items.reduce((s, i) => s + i.price, 0) / items.length).toFixed(2)
      : '0.00',
  }), [items]);

  const getCategoryLabel = (id) => CATEGORIES.find(c => c.id === id)?.label || id;

  const handleSave = (data) => {
    if (formMode === 'add') {
      addItem(data);
    } else {
      updateItem(formMode.edit.id, data);
    }
    setFormMode(null);
  };

  const handleDelete = (item) => setDeleteTarget(item);
  const confirmDelete = () => {
    deleteItem(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="admin-page page-container">
      <div className="page-bg-orb orb-gold" />

      {/* Sidebar */}
      <aside className="admin-sidebar glass">
        <div className="admin-sidebar__logo">
          <ChefHat size={22} />
          <span>Menu Manager</span>
        </div>
        <nav className="admin-sidebar__nav">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">
            <UtensilsCrossed size={16} /> Vedi Menu
          </a>
        </nav>
        <button className="btn btn-ghost admin-logout" onClick={handleLogout} id="logout-btn">
          <LogOut size={16} /> Esci
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-title">Dashboard</h1>
            <p className="admin-subtitle">Gestione del menu del ristorante</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setFormMode('add')}
            id="add-product-btn"
          >
            <Plus size={18} /> Nuovo Piatto
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <StatCard label="Piatti Totali" value={stats.total} icon={UtensilsCrossed} accent />
          <StatCard label="Disponibili" value={stats.available} icon={CheckCircle2} />
          <StatCard label="Categorie" value={stats.categories} icon={LayoutGrid} />
          <StatCard label="Prezzo Medio" value={`€${stats.avgPrice}`} icon={TrendingUp} />
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              id="admin-search"
              className="input admin-search"
              placeholder="Cerca piato..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-filter-tabs">
            <button
              className={clsx('admin-filter-tab', filterCat === 'all' && 'active')}
              onClick={() => setFilterCat('all')}
            >Tutto
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                className={clsx('admin-filter-tab', filterCat === c.id && 'active')}
                onClick={() => setFilterCat(c.id)}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <div className="view-toggle">
            <button
              className={clsx('view-toggle-btn', viewMode === 'list' && 'active')}
              onClick={() => setViewMode('list')}
              aria-label="Vista lista"
            ><List size={16} /></button>
            <button
              className={clsx('view-toggle-btn', viewMode === 'grid' && 'active')}
              onClick={() => setViewMode('grid')}
              aria-label="Vista griglia"
            ><LayoutGrid size={16} /></button>
          </div>
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              className="admin-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.length === 0 && (
                <div className="admin-empty">
                  <UtensilsCrossed size={32} />
                  <p>Nessun piatto trovato</p>
                </div>
              )}
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  className="admin-list-row glass"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  id={`admin-row-${item.id}`}
                >
                  <img src={item.image} alt={item.name} className="admin-row-img" />
                  <div className="admin-row-info">
                    <div className="admin-row-name">
                      {item.name}
                      {!item.available && (
                        <span className="badge badge-danger" style={{ marginLeft: 8 }}>Non disp.</span>
                      )}
                    </div>
                    <div className="admin-row-meta">
                      <span className="badge badge-accent">{getCategoryLabel(item.category)}</span>
                      {item.allergens.slice(0, 4).map(a => (
                        <span key={a} title={a} style={{ fontSize: 16 }}>{ALLERGEN_ICONS[a]}</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin-row-price">€{item.price.toFixed(2)}</div>
                  <div className="admin-row-actions">
                    <button
                      className={clsx('btn btn-icon', item.available ? 'btn-ghost' : 'btn-primary btn-sm')}
                      onClick={() => toggleAvailability(item.id)}
                      title={item.available ? 'Rendi non disponibile' : 'Rendi disponibile'}
                    >
                      {item.available
                        ? <ToggleRight size={18} style={{ color: 'var(--success)' }} />
                        : <ToggleLeft size={18} />}
                    </button>
                    <button
                      className="btn btn-ghost btn-icon"
                      onClick={() => setFormMode({ edit: item })}
                      title="Modifica"
                      id={`edit-btn-${item.id}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() => handleDelete(item)}
                      title="Elimina"
                      id={`delete-btn-${item.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="admin-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  className="admin-grid-card glass"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <img src={item.image} alt={item.name} className="admin-grid-img" />
                  <div className="admin-grid-body">
                    <h3 className="admin-grid-name">{item.name}</h3>
                    <span className="badge badge-accent">{getCategoryLabel(item.category)}</span>
                    <div className="admin-grid-price">€{item.price.toFixed(2)}</div>
                    <div className="admin-row-actions" style={{ marginTop: 'auto' }}>
                      <button className="btn btn-ghost btn-icon"
                        onClick={() => toggleAvailability(item.id)}>
                        {item.available
                          ? <ToggleRight size={18} style={{ color: 'var(--success)' }} />
                          : <ToggleLeft size={18} />}
                      </button>
                      <button className="btn btn-ghost btn-icon"
                        onClick={() => setFormMode({ edit: item })}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-danger btn-icon"
                        onClick={() => handleDelete(item)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {formMode && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="form-modal glass"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="form-modal__header">
                <h2 className="form-modal__title">
                  {formMode === 'add' ? '✨ Nuovo Piatto' : `✏️ Modifica: ${formMode.edit.name}`}
                </h2>
                <button className="btn btn-ghost btn-icon" onClick={() => setFormMode(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="form-modal__body">
                <ProductForm
                  initialData={formMode === 'add' ? null : formMode.edit}
                  onClose={() => setFormMode(null)}
                  onSave={handleSave}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmModal
            message={`Sei sicuro di voler eliminare "${deleteTarget.name}" dal menu? L'azione non è reversibile.`}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
