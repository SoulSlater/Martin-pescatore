import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import clsx from 'clsx';


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

  // Auto-select first category specific to section instead of "all"
  useEffect(() => {
    if (visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0].id);
    }
  }, [section, visibleCategories]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeCategory]);

  const filtered = useMemo(() => {
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  const categoryCount = (catId) =>
    items.filter(i => i.category === catId).length;

  return (
    <div className="menu-page page-container">
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

        {/* Category tabs */}
        <nav className="category-tabs" aria-label="Filtra categoria">
          {visibleCategories.map(cat => (
            <button
              key={cat.id}
              id={`cat-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx('category-tab', activeCategory === cat.id && 'category-tab--active')}
            >
              <span className="category-tab__emoji">{cat.emoji}</span>
              <span className="category-tab__label">{cat.label}</span>
              <span className="category-tab__count">{categoryCount(cat.id)}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="menu-grid-section">
        {filtered.length > 0 ? (
          <div className="menu-grid">
            {filtered.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <UtensilsCrossed size={48} className="menu-empty__icon" />
            <p className="menu-empty__text">Nessun piatto trovato</p>
            <p className="menu-empty__hint">Prova a modificare la ricerca o la categoria</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="menu-footer">
        <p>Informazioni sugli allergeni disponibili su richiesta • ©{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
