import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import clsx from 'clsx';

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.18 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12 },
  },
};

export default function MenuPage() {
  const { items, CATEGORIES } = useMenu();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const section = searchParams.get('section'); // 'bar' or 'pizzeria'

  const visibleCategories = useMemo(() => {
    const matching = CATEGORIES.filter(cat => cat.section === section || cat.section === 'all');
    // Per la pizzeria: prima le categorie specifiche della sezione, poi quelle 'all' (birre, vini)
    return matching.sort((a, b) => {
      if (a.section === b.section) return 0;
      if (a.section === section) return -1;
      if (b.section === section) return 1;
      return 0;
    });
  }, [CATEGORIES, section]);

  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  // Auto-select first category specific to section instead of "all"
  useEffect(() => {
    if (visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0].id);
    }
    setSearch('');
  }, [section, visibleCategories]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  const filtered = useMemo(() => {
    return items.filter(item => {
      // Filter by the active category tab
      const matchCategory = item.category === activeCategory;

      const q = search.toLowerCase();
      const matchSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.ingredients || []).some(i => i.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, search]);

  const categoryCount = (catId) =>
    items.filter(i => i.category === catId).length;

  return (
    <div className="menu-page page-container">
      {/* Sticky Controls incl Header */}
      <div className="menu-controls">
        <div className="menu-controls-left">
          <button
            className="back-home-btn"
            onClick={() => navigate('/')}
            aria-label="Torna alla Home"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="logo-bubble logo-bubble--small">
            <div className="logo-bubble__inner">
              <span className="logo-text-top">RISTORO</span>
              <div className="logo-text-main-wrap">
                <span className="logo-text-main">MARTIN</span>
                <div className="logo-dot"></div>
              </div>
              <span className="logo-text-main">PESCATORE</span>
              <div className="logo-divider"></div>
              <span className="logo-text-bottom">CASTEL D'AZZANO</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="menu-search-wrap">
          <Search size={18} className="menu-search-icon" />
          <input
            id="menu-search"
            className="menu-search"
            type="search"
            placeholder="Cerca piatti, ingredienti..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Cerca nel menu"
          />
        </div>

        {/* Category tabs */}
        <nav className="category-tabs" aria-label="Filtra categoria">
          {visibleCategories.map(cat => (
            <motion.button
              key={cat.id}
              id={`cat-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx('category-tab', activeCategory === cat.id && 'category-tab--active')}
              whileTap={{ scale: 0.95 }}
            >
              <span className="category-tab__emoji">{cat.emoji}</span>
              <span className="category-tab__label">{cat.label}</span>
              <span className="category-tab__count">{categoryCount(cat.id)}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Grid */}
      <main className="menu-grid-section">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              className="menu-grid"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {filtered.map(item => (
                <ProductCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="menu-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <UtensilsCrossed size={48} className="menu-empty__icon" />
              <p className="menu-empty__text">Nessun piatto trovato</p>
              <p className="menu-empty__hint">Prova a modificare la ricerca o la categoria</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="menu-footer">
        <p>Informazioni sugli allergeni disponibili su richiesta • ©{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
