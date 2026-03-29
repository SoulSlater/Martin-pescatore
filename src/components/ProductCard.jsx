import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, ChefHat, X } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

const ALLERGEN_ICONS = {
  'Glutine': '🌾', 'Latticini': '🥛', 'Uova': '🥚', 'Pesce': '🐟',
  'Crostacei': '🦐', 'Soia': '🌱', 'Frutta Secca': '🥜', 'Sedano': '🥬',
  'Senape': '🌻', 'Lupini': '🌼', 'Molluschi': '🐚', 'Sesamo': '🌿',
  'Anidride Solforosa': '🍾',
};

export default function ProductCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);

  return (
    <>
      <motion.article
        className={`product-card glass glass-hover ${!item.available ? 'product-card--unavailable' : ''}`}
        onClick={() => setShowDetails(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        role="button"
        tabIndex={0}
        aria-label={`Dettagli di ${item.name}`}
        onKeyDown={(e) => e.key === 'Enter' && setShowDetails(true)}
        id={`product-${item.id}`}
      >
        {!item.available && (
          <div className="product-card__unavailable-banner">
            Non disponibile
          </div>
        )}

        {/* Content */}
        <div className="product-card__body">
          <h3 className="product-card__name">{item.name}</h3>
          <div className="product-card__price">{formatPrice(item.price)}</div>
          {item.description && <p className="product-card__desc">{item.description}</p>}

          {/* Allergens preview */}
          {item.allergens.length > 0 && (
            <div className="product-card__allergens">
              <ShieldAlert size={12} className="allergen-icon" />
              {item.allergens.slice(0, 3).map(a => (
                <span key={a} className="allergen-micro" title={a}>
                  {ALLERGEN_ICONS[a] || '⚠️'}
                </span>
              ))}
              {item.allergens.length > 3 && (
                <span className="allergen-more">+{item.allergens.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </motion.article>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
          >
            <motion.div
              className="modal-card glass"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              <button
                className="modal-close btn btn-ghost btn-icon"
                onClick={() => setShowDetails(false)}
                aria-label="Chiudi"
              >
                <X size={18} />
              </button>

              <div className="modal-body">
                <div className="modal-header-vertical">
                  <h2 className="modal-title">{item.name}</h2>
                  <span className="modal-price-large">{formatPrice(item.price)}</span>
                </div>
                {item.description && <p className="modal-desc">{item.description}</p>}

                {/* Ingredients */}
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="modal-section">
                    <h4 className="modal-section-title">
                      <ChefHat size={14} /> Ingredienti
                    </h4>
                    <div className="modal-tags">
                      {item.ingredients.map(ing => (
                        <span key={ing} className="badge">{ing}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergens */}
                {item.allergens.length > 0 && (
                  <div className="modal-section">
                    <h4 className="modal-section-title allergen-title">
                      <AlertTriangle size={14} /> Allergeni
                    </h4>
                    <div className="modal-tags">
                      {item.allergens.map(a => (
                        <span key={a} className="badge badge-danger">
                          {ALLERGEN_ICONS[a]} {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!item.available && (
                  <div className="modal-unavailable-banner">
                    ⚠️ Questo piatto non è disponibile oggi
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
