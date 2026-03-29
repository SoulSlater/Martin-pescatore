import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, ChevronDown } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import clsx from 'clsx';

export default function ProductForm({ initialData = null, onClose, onSave }) {
  const { ALLERGENS, CATEGORIES } = useMenu();
  const categories = CATEGORIES.filter(c => c.id !== 'all');

  const [form, setForm] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    category: initialData?.category || categories[0].id,
    ingredients: initialData?.ingredients || [],
    allergens: initialData?.allergens || [],
    image: initialData?.image || '',
    available: initialData?.available ?? true,
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [errors, setErrors] = useState({});
  const ingInputRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Il nome è obbligatorio';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = 'Prezzo non valido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, price: parseFloat(form.price) });
  };

  const addIngredient = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && ingredientInput.trim()) {
      e.preventDefault();
      if (!form.ingredients.includes(ingredientInput.trim())) {
        setForm(f => ({ ...f, ingredients: [...f.ingredients, ingredientInput.trim()] }));
      }
      setIngredientInput('');
    }
  };

  const removeIngredient = (ing) => {
    setForm(f => ({ ...f, ingredients: f.ingredients.filter(i => i !== ing) }));
  };

  const toggleAllergen = (a) => {
    setForm(f => ({
      ...f,
      allergens: f.allergens.includes(a)
        ? f.allergens.filter(x => x !== a)
        : [...f.allergens, a],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form" id="product-form" noValidate>
      <div className="form-grid">
        {/* Name */}
        <div className="form-group form-col-2">
          <label className="form-label" htmlFor="field-name">Nome piatto *</label>
          <input
            id="field-name"
            className={clsx('input', errors.name && 'input--error')}
            placeholder="Es. Margherita Classica"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label className="form-label" htmlFor="field-price">Prezzo (€) *</label>
          <input
            id="field-price"
            type="number"
            step="0.5"
            min="0"
            className={clsx('input', errors.price && 'input--error')}
            placeholder="0.00"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="field-category">Categoria *</label>
          <div className="select-wrap">
            <select
              id="field-category"
              className="select"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>


        {/* Image URL */}
        <div className="form-group form-col-2">
          <label className="form-label" htmlFor="field-image">URL Immagine</label>
          <input
            id="field-image"
            className="input"
            placeholder="https://images.unsplash.com/..."
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          />
          {form.image && (
            <div className="image-preview-wrap">
              <img src={form.image} alt="Anteprima" className="image-preview" onError={e => e.target.style.display='none'} />
            </div>
          )}
        </div>

        {/* Ingredients */}
        <div className="form-group form-col-2">
          <label className="form-label">Ingredienti <span className="form-hint">(Invio o virgola per aggiungere)</span></label>
          <div className="tag-container" onClick={() => ingInputRef.current?.focus()}>
            {form.ingredients.map(ing => (
              <span key={ing} className="tag">
                {ing}
                <button type="button" onClick={() => removeIngredient(ing)} aria-label={`Rimuovi ${ing}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              ref={ingInputRef}
              className="tag-input"
              placeholder={form.ingredients.length === 0 ? "Aggiungi ingrediente..." : ""}
              value={ingredientInput}
              onChange={e => setIngredientInput(e.target.value)}
              onKeyDown={addIngredient}
            />
          </div>
        </div>

        {/* Allergens */}
        <div className="form-group form-col-2">
          <label className="form-label">Allergeni</label>
          <div className="allergen-grid">
            {ALLERGENS.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => toggleAllergen(a)}
                className={clsx('allergen-pill', form.allergens.includes(a) && 'selected')}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="form-group form-col-2">
          <label className="form-label">Disponibilità</label>
          <div className="toggle-row">
            <button
              type="button"
              role="switch"
              aria-checked={form.available}
              className={clsx('toggle-btn', form.available && 'toggle-btn--on')}
              onClick={() => setForm(f => ({ ...f, available: !f.available }))}
              id="field-available"
            >
              <span className="toggle-knob" />
            </button>
            <span className="toggle-label">
              {form.available ? '✅ Disponibile' : '❌ Non disponibile'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        {onClose && (
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Annulla
          </button>
        )}
        <button type="submit" className="btn btn-primary" id="submit-product-form">
          <Save size={16} />
          {initialData ? 'Salva Modifiche' : 'Aggiungi al Menu'}
        </button>
      </div>
    </form>
  );
}
