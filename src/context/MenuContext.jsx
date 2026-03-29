import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MenuContext = createContext(null);

const STORAGE_KEY = 'menu_manager_items_v5';
const AUTH_KEY = 'menu_manager_auth';
const ADMIN_PASSWORD = 'admin123';

const ALLERGENS = [
  'Glutine', 'Crostacei', 'Uova', 'Pesce', 'Arachidi', 'Soia', 'Latticini',
  'Frutta a Guscio', 'Sedano', 'Senape', 'Sesamo', 'Anidride Solforosa', 'Lupini', 'Molluschi'
];

export const CATEGORIES = [
  { id: 'caffetteria', label: 'Caffetteria', emoji: '☕', section: 'bar' },
  { id: 'panini', label: 'Panini', emoji: '🥪', section: 'bar' },
  { id: 'aperitivi', label: 'Aperitivi Alcolici', emoji: '🍹', section: 'bar' },
  { id: 'aperitivi_analcolici', label: 'Aperitivi Analcolici', emoji: '🥤', section: 'bar' },
  { id: 'birre', label: 'Birre', emoji: '🍻', section: 'all' },
  { id: 'cocktail', label: 'Cocktail & Premium', emoji: '🍸', section: 'bar' },
  { id: 'vini', label: 'Vini', emoji: '🍷', section: 'all' },
  { id: 'bevande', label: 'Bevande', emoji: '🧃', section: 'bar' },
  { id: 'amari', label: 'Amari & Grappe', emoji: '🥃', section: 'bar' },
  
  { id: 'tradizionali', label: 'Le Tradizionali', emoji: '🍕', section: 'pizzeria' },
  { id: 'bianche', label: 'Le Bianche', emoji: '👨‍🍳', section: 'pizzeria' },
  { id: 'speciali', label: 'Le Speciali', emoji: '🌟', section: 'pizzeria' },
  { id: 'extra', label: 'Aggiunte & Coperto', emoji: '➕', section: 'pizzeria' },
  { id: 'menu_compleanni', label: 'Eventi & Fissi', emoji: '🎉', section: 'pizzeria' },
];

const SEED_ITEMS = [
  // --- CAFFETTERIA ---
  { id: 'c1', name: 'Caffè liscio / macchiato', category: 'caffetteria', price: 1.30, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c2', name: 'Caffè deca', category: 'caffetteria', price: 1.40, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c3', name: 'Caffè americano', category: 'caffetteria', price: 1.40, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c4', name: 'Caffè corretto', category: 'caffetteria', price: 1.80, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c5', name: 'Orzo / Caffè Ginseng', category: 'caffetteria', price: 1.70, description: '', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'c6', name: 'Macchiatone', category: 'caffetteria', price: 1.50, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c7', name: 'Macchiatone deca', category: 'caffetteria', price: 1.60, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c8', name: 'Macchiatone Orzo / Ginseng', category: 'caffetteria', price: 1.80, description: '', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'c9', name: 'Cappuccino', category: 'caffetteria', price: 1.80, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c10', name: 'Cappuccino deca', category: 'caffetteria', price: 1.90, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c11', name: 'Cappuccino orzo / ginseng', category: 'caffetteria', price: 2.00, description: '', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'c12', name: 'Schiumetta', category: 'caffetteria', price: 1.00, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c13', name: 'Latte macchiato', category: 'caffetteria', price: 1.00, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c14', name: 'Bicchiere di latte', category: 'caffetteria', price: 1.00, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c15', name: 'Cioccolata calda', category: 'caffetteria', price: 2.50, description: '', ingredients: [], allergens: ['Latticini'], available: true },
  { id: 'c16', name: 'Thè caldo', category: 'caffetteria', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c17', name: 'Succo di frutta', category: 'caffetteria', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c18', name: 'Spremuta d\'arancia', category: 'caffetteria', price: 3.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'c19', name: 'Croissant', category: 'caffetteria', price: 1.50, description: '', ingredients: [], allergens: ['Glutine', 'Latticini', 'Uova'], available: true },
  { id: 'c20', name: 'Treccina', category: 'caffetteria', price: 1.50, description: '', ingredients: [], allergens: ['Glutine', 'Latticini', 'Uova'], available: true },
  { id: 'c21', name: 'Bocconcino', category: 'caffetteria', price: 1.50, description: '', ingredients: [], allergens: ['Glutine', 'Latticini', 'Uova'], available: true },

  // --- PANINI ---
  { id: 'pa1', name: 'Tramezzino', category: 'panini', price: 3.00, description: 'Prosciutto cotto, fontina, maionese / Tonno, insalata e maionese', ingredients: ['Prosciutto cotto', 'Fontina', 'Maionese', 'Tonno', 'Insalata'], allergens: ['Glutine', 'Uova', 'Pesce', 'Latticini'], available: true },
  { id: 'pa2', name: 'Toast', category: 'panini', price: 3.50, description: 'Prosciutto cotto e fontina', ingredients: ['Pane', 'Prosciutto Cotto', 'Fontina'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa3', name: 'Focaccia', category: 'panini', price: 4.00, description: 'Prosciutto cotto / crudo, fontina, insalata', ingredients: ['Focaccia', 'Prosciutto', 'Fontina', 'Insalata'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa4', name: 'Toscano', category: 'panini', price: 5.00, description: 'Prosciutto cotto, fontina', ingredients: ['Pane Toscano', 'Prosciutto Cotto', 'Fontina'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa5', name: 'Piadina', category: 'panini', price: 6.00, description: 'Prosciutto cotto / crudo, fontina', ingredients: ['Piadina', 'Prosciutto', 'Fontina'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa6', name: 'Panino cotoletta', category: 'panini', price: 6.00, description: 'Cotoletta, fontina', ingredients: ['Panino', 'Cotoletta', 'Fontina'], allergens: ['Glutine', 'Latticini', 'Uova'], available: true },
  { id: 'pa7', name: 'Hamburger', category: 'panini', price: 6.00, description: 'Carne di manzo e fontina', ingredients: ['Pane Hamburger', 'Carne Manzo', 'Fontina'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa8', name: 'Alpino', category: 'panini', price: 6.00, description: 'Fontina, speck e funghi', ingredients: ['Pane', 'Fontina', 'Speck', 'Funghi'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa9', name: 'Rustico', category: 'panini', price: 6.00, description: 'Crudo e gorgonzola', ingredients: ['Pane', 'Prosciutto Crudo', 'Gorgonzola'], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'pa10', name: 'Boscaiolo', category: 'panini', price: 6.00, description: 'Speck, brie', ingredients: ['Pane', 'Speck', 'Brie'], allergens: ['Glutine', 'Latticini'], available: true },
  // Aggiunte Panini
  { id: 'pa11', name: 'Aggiunta Pomodoro, Insalata', category: 'panini', price: 0.50, description: 'Aggiunta per panini', ingredients: [], allergens: [], available: true },
  { id: 'pa12', name: 'Aggiunta Salse', category: 'panini', price: 0.50, description: 'Maionese, Ketchup, ecc.', ingredients: [], allergens: ['Uova'], available: true },

  // --- BEVANDE ANALCOLICHE ---
  { id: 'ba1', name: 'Acqua naturale / frizzante', category: 'bevande', price: 1.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba2', name: 'Acqua e menta', category: 'bevande', price: 2.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba3', name: 'Coca cola / Zero', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba4', name: 'Fanta / Sprite / Lemon soda', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba5', name: 'Chinotto', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba6', name: 'Tè alla pesca / Limone', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba7', name: 'Tonica', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba8', name: 'Aranciata amara', category: 'bevande', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba9', name: 'Redbull', category: 'bevande', price: 3.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba10', name: 'Bicchiere spuma', category: 'bevande', price: 1.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ba11', name: 'Bicchiere acqua e menta', category: 'bevande', price: 1.50, description: '', ingredients: [], allergens: [], available: true },

  // --- APERITIVI ANALCOLICI ---
  { id: 'aan1', name: 'Crodino', category: 'aperitivi_analcolici', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'aan2', name: 'Gingerino', category: 'aperitivi_analcolici', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'aan3', name: 'San bitter', category: 'aperitivi_analcolici', price: 2.50, description: '', ingredients: [], allergens: [], available: true },
  { id: 'aan4', name: 'Cocktail analcolico fruttato', category: 'aperitivi_analcolici', price: 4.00, description: '', ingredients: [], allergens: [], available: true },

  // --- AMARI & GRAPPE ---
  { id: 'am1', name: 'Amari', category: 'amari', price: 3.50, description: 'Selezione di amari', ingredients: [], allergens: [], available: true },
  { id: 'am2', name: 'Grappe', category: 'amari', price: 4.00, description: 'Selezione di grappe', ingredients: [], allergens: [], available: true },
  { id: 'am3', name: 'Shot', category: 'amari', price: 2.00, description: 'Shottino', ingredients: [], allergens: [], available: true },

  // --- APERITIVI ALCOLICI ---
  { id: 'b1', name: 'Crodino / Gingerino / San bitter + vino bianco', category: 'aperitivi', price: 3.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b2', name: 'Crodino / Gingerino / San bitter + prosecco', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b3', name: 'Crodino / Gingerino / San bitter in 2 + vino bianco', category: 'aperitivi', price: 5.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b4', name: 'Crodino / Gingerino / San bitter in 2 + prosecco', category: 'aperitivi', price: 7.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b5', name: 'Bianco alla spina', category: 'aperitivi', price: 1.50, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b6', name: 'Aperol / Campari + vino bianco', category: 'aperitivi', price: 3.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b7', name: 'Aperol / Campari + prosecco', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b8', name: 'Spritz bianco', category: 'aperitivi', price: 2.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b9', name: 'Spritz rosso', category: 'aperitivi', price: 2.50, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b10', name: 'Spritz Aperol', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b11', name: 'Spritz Campari', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b12', name: 'Spritz Misto', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b13', name: 'Spritz Select', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b14', name: 'Spritz Cynar', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b15', name: 'Spritz Hugo', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b16', name: 'Campari lemon', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'b17', name: 'Campari soda', category: 'aperitivi', price: 3.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'b18', name: 'Campari soda + vino bianco', category: 'aperitivi', price: 3.50, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b19', name: 'Campari soda + prosecco', category: 'aperitivi', price: 4.00, description: '', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'b20', name: 'Americano', category: 'aperitivi', price: 6.00, description: '', ingredients: [], allergens: [], available: true },

  // --- BIRRE IN BOTTIGLIA ---
  { id: 'br1', name: 'Hell (bionda)', category: 'birre', price: 5.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br2', name: 'Zwickl (non filtrata)', category: 'birre', price: 5.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br3', name: 'Weiss', category: 'birre', price: 5.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br4', name: 'Dunkel (Scura)', category: 'birre', price: 5.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br5', name: 'Gold', category: 'birre', price: 4.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br6', name: 'Pils', category: 'birre', price: 4.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br7', name: 'Ceres', category: 'birre', price: 4.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'br8', name: 'Corona', category: 'birre', price: 4.00, description: 'In Bottiglia', ingredients: [], allergens: ['Glutine'], available: true },

  // --- BIRRE ALLA SPINA ---
  { id: 'bs1', name: 'Bionda piccola', category: 'birre', price: 3.00, description: 'Alla Spina', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'bs2', name: 'Zwickl piccola', category: 'birre', price: 3.00, description: 'Alla Spina', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'bs3', name: 'Bionda media', category: 'birre', price: 5.00, description: 'Alla Spina', ingredients: [], allergens: ['Glutine'], available: true },
  { id: 'bs4', name: 'Zwickl media', category: 'birre', price: 5.00, description: 'Alla Spina', ingredients: [], allergens: ['Glutine'], available: true },

  // --- VINI ---
  { id: 'v1', name: 'Garganega', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v2', name: 'Custoza', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v3', name: 'Chardonnay', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v4', name: 'Vermentino', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v5', name: 'Lugana', category: 'vini', price: 3.00, description: 'Bottiglia: 20,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v6', name: 'Soave', category: 'vini', price: 3.00, description: 'Bottiglia: 20,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  
  { id: 'v7', name: 'Valdobbiadene Prosecco', category: 'vini', price: 3.50, description: 'Bottiglia: 24,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v8', name: 'Valdobbiadene 0 zuccheri', category: 'vini', price: 3.50, description: 'Bottiglia: 35,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v9', name: 'Trento DOC', category: 'vini', price: 3.50, description: 'Bottiglia: 35,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v10', name: 'Trento DOC Rosè', category: 'vini', price: 3.50, description: 'Bottiglia: 35,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },

  { id: 'v11', name: 'Bardolino', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v12', name: 'Corvina', category: 'vini', price: 2.00, description: 'Bottiglia: 13,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v13', name: 'Valpolicella classico', category: 'vini', price: 2.80, description: 'Bottiglia: 19,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v14', name: 'Valpolicella superiore', category: 'vini', price: 3.30, description: 'Bottiglia: 22,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v15', name: 'Valpolicella ripasso', category: 'vini', price: 3.50, description: 'Bottiglia: 27,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v16', name: 'Pinot nero', category: 'vini', price: 3.00, description: 'Bottiglia: 20,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v17', name: 'Merlot', category: 'vini', price: 3.00, description: 'Bottiglia: 20,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },
  { id: 'v18', name: 'Merlot Cabernet', category: 'vini', price: 3.00, description: 'Bottiglia: 20,00 €', ingredients: [], allergens: ['Anidride Solforosa'], available: true },

  // --- COCKTAIL ---
  { id: 'ck1', name: 'Gin Tonic Gordon', category: 'cocktail', price: 7.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck2', name: 'Gin Tonic Premium', category: 'cocktail', price: 8.00, description: 'Bombay, Tanqueray, Dolce Vita Pompelmo', ingredients: [], allergens: [], available: true },
  { id: 'ck3', name: 'Gin Lemon', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck4', name: 'Mojito', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck5', name: 'Negroni', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck6', name: 'Verdone', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck7', name: 'Verdone corretto sambuca', category: 'cocktail', price: 9.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck8', name: 'Vodka tonic / Lemon / Redbull', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck9', name: 'Passoa Lemon', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck10', name: 'Malibù cola', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck11', name: 'Monte cola', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck12', name: 'Rum cola', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck13', name: 'Jagher Bomb', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck14', name: 'Angelo azzurro', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  { id: 'ck15', name: 'Cuba libre', category: 'cocktail', price: 8.00, description: '', ingredients: [], allergens: [], available: true },
  // DRINK PREMIUM
  { id: 'ck16', name: 'Sour', category: 'cocktail', price: 10.00, description: 'Drink Premium', ingredients: [], allergens: ['Uova'], available: true },
  { id: 'ck17', name: 'Respiro rosso', category: 'cocktail', price: 10.00, description: 'Drink Premium', ingredients: [], allergens: [], available: true },
  { id: 'ck18', name: 'Moscow Mule', category: 'cocktail', price: 10.00, description: 'Drink Premium', ingredients: [], allergens: [], available: true },
  { id: 'ck19', name: 'Paloma', category: 'cocktail', price: 11.00, description: 'Drink Premium', ingredients: [], allergens: [], available: true },
  { id: 'ck20', name: 'Tommys Margarita', category: 'cocktail', price: 11.00, description: 'Drink Premium', ingredients: [], allergens: [], available: true },

  // --- PIZZE TRADIZIONALI ---
  { id: 't1', name: 'MARINARA', category: 'tradizionali', price: 5.50, description: 'Pomodoro, aglio, olio, origano', ingredients: ['Pomodoro', 'Aglio', 'Olio', 'Origano'], allergens: ['Glutine', 'Soia', 'Senape', 'Sesamo'], available: true },
  { id: 't2', name: 'MARGHERITA', category: 'tradizionali', price: 6.50, description: 'Pomodoro, mozzarella', ingredients: ['Pomodoro', 'Mozzarella'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't3', name: 'WURSTEL', category: 'tradizionali', price: 8.00, description: 'Pomodoro, mozzarella, wurstel', ingredients: ['Pomodoro', 'Mozzarella', 'Wurstel'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't4', name: 'PROSCIUTTO', category: 'tradizionali', price: 8.00, description: 'Pomodoro, mozzarella, prosciutto cotto', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't5', name: 'PROSCIUTTO E FUNGHI', category: 'tradizionali', price: 8.50, description: 'Pomodoro, mozzarella, prosciutto cotto e funghi', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Funghi'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't6', name: 'ROMANA', category: 'tradizionali', price: 8.00, description: 'Pomodoro mozzarella, acciughe, origano', ingredients: ['Pomodoro', 'Mozzarella', 'Acciughe', 'Origano'], allergens: ['Glutine', 'Pesce', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't7', name: 'NAPOLETANA', category: 'tradizionali', price: 8.50, description: 'Pomodoro, mozzarella, acciughe, capperi, origano', ingredients: ['Pomodoro', 'Mozzarella', 'Acciughe', 'Capperi', 'Origano'], allergens: ['Glutine', 'Pesce', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't8', name: 'DIAVOLA', category: 'tradizionali', price: 8.00, description: 'Pomodoro, mozzarella, salamino piccante', ingredients: ['Pomodoro', 'Mozzarella', 'Salamino piccante'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't9', name: 'QUATTRO FORMAGGI', category: 'tradizionali', price: 10.00, description: 'Pomodoro, mozzarella, emmental, gorgonzola, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Emmental', 'Gorgonzola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't10', name: 'QUATTRO STAGIONI', category: 'tradizionali', price: 9.50, description: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Funghi', 'Carciofi', 'Olive'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't11', name: 'CAPRICCIOSA', category: 'tradizionali', price: 9.50, description: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Funghi', 'Carciofi', 'Olive'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't12', name: 'TONNO E CIPOLLA', category: 'tradizionali', price: 8.50, description: 'Pomodoro, mozzarella, tonno, cipolla', ingredients: ['Pomodoro', 'Mozzarella', 'Tonno', 'Cipolla'], allergens: ['Glutine', 'Pesce', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't13', name: 'BUFALA', category: 'tradizionali', price: 9.00, description: 'Pomodoro, mozzarella di bufala, basilico', ingredients: ['Pomodoro', 'Mozzarella di bufala', 'Basilico'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't14', name: 'VEGETARIANA', category: 'tradizionali', price: 10.00, description: 'Pomodoro, mozzarella, zucchine, melanzane, spinaci, peperoni', ingredients: ['Pomodoro', 'Mozzarella', 'Zucchine', 'Melanzane', 'Spinaci', 'Peperoni'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't15', name: 'CRUDO', category: 'tradizionali', price: 9.00, description: 'Pomodoro, mozzarella, prosciutto crudo', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Crudo'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't16', name: 'FRITTOSA', category: 'tradizionali', price: 8.00, description: 'Pomodoro, mozzarella, patatine fritte', ingredients: ['Pomodoro', 'Mozzarella', 'Patatine fritte'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 't17', name: 'CALZONE', category: 'tradizionali', price: 10.00, description: 'Pomodoro, mozzarella, prosciutto cotto, funghi, ricotta', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Funghi', 'Ricotta'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },

  // --- LE BIANCHE ---
  { id: 'bi1', name: 'FOCACCIA', category: 'bianche', price: 4.00, description: 'Olio, rosmarino, grana', ingredients: ['Olio', 'Rosmarino', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi2', name: 'FOCACCIA CRUDO', category: 'bianche', price: 8.00, description: 'Olio, rosmarino, grana, crudo', ingredients: ['Olio', 'Rosmarino', 'Grana', 'Crudo'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi3', name: 'FOCACCIA SPECK', category: 'bianche', price: 8.00, description: 'Olio, rosmarino, grana, speck', ingredients: ['Olio', 'Rosmarino', 'Grana', 'Speck'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi4', name: 'SAPORITA', category: 'bianche', price: 10.50, description: 'Mozzarella, prosciutto cotto, gorgonzola, salvia', ingredients: ['Mozzarella', 'Prosciutto Cotto', 'Gorgonzola', 'Salvia'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi5', name: 'SILVY', category: 'bianche', price: 10.00, description: 'Mozzarella, prosciutto cotto, zucchine, stracchino', ingredients: ['Mozzarella', 'Prosciutto Cotto', 'Zucchine', 'Stracchino'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi6', name: 'FAGIANO', category: 'bianche', price: 11.00, description: 'Mozzarella, salamino, salsiccia, peperoni, gorgonzola', ingredients: ['Mozzarella', 'Salamino', 'Salsiccia', 'Peperoni', 'Gorgonzola'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi7', name: 'VESUVIO', category: 'bianche', price: 12.00, description: 'Mozzarella di bufala, friarielli, salsiccia', ingredients: ['Mozzarella di bufala', 'Friarielli', 'Salsiccia'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi8', name: 'BEPPE', category: 'bianche', price: 12.00, description: 'Mozzarella, radicchio, scamorza, crema di tartufo, speck', ingredients: ['Mozzarella', 'Radicchio', 'Scamorza', 'Crema di tartufo', 'Speck'], allergens: ['Glutine', 'Crostacei', 'Uova', 'Pesce', 'Latticini', 'Frutta a Guscio', 'Sedano', 'Senape', 'Sesamo'], available: true },
  { id: 'bi9', name: 'STAGISTA', category: 'bianche', price: 11.00, description: 'Mozzarella, salamino, brie, pancetta, rosmarino', ingredients: ['Mozzarella', 'Salamino', 'Brie', 'Pancetta', 'Rosmarino'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'bi10', name: 'CARBONARA', category: 'bianche', price: 10.00, description: 'Mozzarella, pancetta, grana, uovo, pepe nero', ingredients: ['Mozzarella', 'Pancetta', 'Grana', 'Uovo', 'Pepe rosso'], allergens: ['Glutine', 'Uova', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },

  // --- LE SPECIALI ---
  { id: 'p1', name: 'ROMEO', category: 'speciali', price: 11.00, description: 'Pomodoro, mozzarella, patate, brie, speck', ingredients: ['Pomodoro', 'Mozzarella', 'Patate', 'Brie', 'Speck'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p2', name: 'GIULIETTA', category: 'speciali', price: 11.00, description: 'Pomodoro, mozzarella, patate, philadelphia, crudo', ingredients: ['Pomodoro', 'Mozzarella', 'Patate', 'Philadelphia', 'Crudo'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p3', name: 'PRIMA B', category: 'speciali', price: 11.00, description: 'Pomodoro, mozzarella, pancetta, salamino, cipolla, brie, origano', ingredients: ['Pomodoro', 'Mozzarella', 'Pancetta', 'Salamino', 'Cipolla', 'Brie', 'Origano'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p4', name: 'LOPEZ', category: 'speciali', price: 12.00, description: 'Pomodoro, emmental, salamino, peperoni, gorgonzola, grana', ingredients: ['Pomodoro', 'Emmental', 'Salamino', 'Peperoni', 'Gorgonzola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p5', name: 'VERONESE', category: 'speciali', price: 8.50, description: 'Pomodoro, mozzarella, salsiccia, cipolla', ingredients: ['Pomodoro', 'Mozzarella', 'Salsiccia', 'Cipolla'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p6', name: 'PATATOSA', category: 'speciali', price: 8.50, description: 'Pomodoro, mozzarella, salsiccia, patate', ingredients: ['Pomodoro', 'Mozzarella', 'Salsiccia', 'Patate'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p7', name: 'PARMIGIANA', category: 'speciali', price: 8.50, description: 'Pomodoro, mozzarella, melanzane, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Melanzane', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p8', name: 'AFFINATA', category: 'speciali', price: 10.50, description: 'Pomodoro, mozzarella, porcini, speck, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Porcini', 'Speck', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p9', name: 'CAMPAGNOLA', category: 'speciali', price: 10.50, description: 'Pomodoro, mozzarella, pancetta, radicchio, gorgonzola, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Pancetta', 'Radicchio', 'Gorgonzola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p10', name: 'SFIZIOSA', category: 'speciali', price: 11.50, description: 'Pomodoro, mozzarella, friarielli, salamino, zucchine, brie', ingredients: ['Pomodoro', 'Mozzarella', 'Friarielli', 'Salamino', 'Zucchine', 'Brie'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p11', name: 'CONTADINA', category: 'speciali', price: 12.00, description: 'Pomodoro, mozzarella, misto funghi, peperoni, salsiccia, ricotta', ingredients: ['Pomodoro', 'Mozzarella', 'Misto Funghi', 'Peperoni', 'Salsiccia', 'Ricotta'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p12', name: 'INVERNO', category: 'speciali', price: 10.50, description: 'Pomodoro, mozzarella, radicchio, gorgonzola, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Radicchio', 'Gorgonzola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p13', name: 'PRIMAVERA', category: 'speciali', price: 10.50, description: 'Pomodoro, mozzarella, zucchine, stracchino, grana, basilico', ingredients: ['Pomodoro', 'Mozzarella', 'Zucchine', 'Stracchino', 'Grana', 'Basilico'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p14', name: 'ESTATE', category: 'speciali', price: 10.50, description: 'Pomodoro, bufala, cirio, scaglie di grana, basilico', ingredients: ['Pomodoro', 'Bufala', 'Cirio', 'Scaglie grana', 'Basilico'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p15', name: 'AUTUNNO', category: 'speciali', price: 10.50, description: 'Pomodoro, mozzarella, funghi freschi, scamorza, salsiccia', ingredients: ['Pomodoro', 'Mozzarella', 'Funghi freschi', 'Scamorza', 'Salsiccia'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p16', name: 'RUSTICA', category: 'speciali', price: 11.00, description: 'Pomodoro, mozzarella, funghi freschi, salamino, peperoni, cipolla', ingredients: ['Pomodoro', 'Mozzarella', 'Funghi freschi', 'Salamino', 'Peperoni', 'Cipolla'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p17', name: 'VALTELLINA', category: 'speciali', price: 11.00, description: 'Pomodoro, mozzarella, bresaola, rucola, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Bresaola', 'Rucola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p18', name: 'ZINGARA', category: 'speciali', price: 10.00, description: 'Pomodoro, mozzarella, patate, brie, salsiccia, rosmarino', ingredients: ['Pomodoro', 'Mozzarella', 'Patate', 'Brie', 'Salsiccia', 'Rosmarino'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p19', name: 'MARTIN PESCATORE', category: 'speciali', price: 14.00, description: 'Pomodoro, mozzarella, prosciutto cotto, olive, salamino piccante, funghi, cipolla, gorgonzola, grana', ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Olive', 'Salamino piccante', 'Funghi', 'Cipolla', 'Gorgonzola', 'Grana'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p20', name: 'CASTEL', category: 'speciali', price: 12.00, description: 'Pomodoro, mozzarella, mascarpone, crudo', ingredients: ['Pomodoro', 'Mozzarella', 'Mascarpone', 'Crudo'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p21', name: 'TOSCANA', category: 'speciali', price: 13.00, description: 'Pomodoro, bufala, porcini, crema di tartufo', ingredients: ['Pomodoro', 'Bufala', 'Porcini', 'Crema Tartufo'], allergens: ['Glutine', 'Crostacei', 'Uova', 'Pesce', 'Soia', 'Latticini', 'Frutta a Guscio', 'Sedano', 'Senape', 'Sesamo'], available: true },
  { id: 'p22', name: 'BOSCAIOLA', category: 'speciali', price: 12.00, description: 'Pomodoro, mozzarella, misto funghi, scamorza, speck', ingredients: ['Pomodoro', 'Mozzarella', 'Misto Funghi', 'Scamorza', 'Speck'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p23', name: 'DECO', category: 'speciali', price: 12.00, description: 'Pomodoro, mozzarella, misto funghi, salsiccia, brie', ingredients: ['Pomodoro', 'Mozzarella', 'Misto Funghi', 'Salsiccia', 'Brie'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },
  { id: 'p24', name: 'REGINA', category: 'speciali', price: 12.00, description: 'Pomodoro, mozzarella, stracchino, rucola, crudo', ingredients: ['Pomodoro', 'Mozzarella', 'Stracchino', 'Rucola', 'Crudo'], allergens: ['Glutine', 'Soia', 'Latticini', 'Senape', 'Sesamo'], available: true },

  // --- MENU COMPLEANNI & FISSO ---
  { id: 'f1', name: 'Menu Compleanno', category: 'menu_compleanni', price: 10.00, description: 'A persona. Include: gazebo, tramezzino, focaccina, panino, pizzetta, panzerotto, patatine, acqua, caraffa analcolico.', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'f2', name: 'Menu Pizzeria Fisso (Adulti)', category: 'menu_compleanni', price: 18.00, description: 'Menu per classi. Include: pizza, birra media, caffè.', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },
  { id: 'f3', name: 'Menu Pizzeria Fisso (Bambini)', category: 'menu_compleanni', price: 13.00, description: 'Menu per classi. Include: pizza, bibita.', ingredients: [], allergens: ['Glutine', 'Latticini'], available: true },

  // --- AGGIUNTE E COPERTO ---
  { id: 'extra1', name: 'AGGIUNTE NORMALI', category: 'extra', price: 2.00, description: 'Es. olive, cipolla, ecc.', ingredients: [], allergens: [], available: true },
  { id: 'extra2', name: 'AGGIUNTE SPECIALI', category: 'extra', price: 3.00, description: 'Bufala, crudo, speck, tartufo, porcini', ingredients: [], allergens: [], available: true },
  { id: 'extra3', name: 'COPERTO', category: 'extra', price: 2.00, description: '', ingredients: [], allergens: [], available: true }

];

export function MenuProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_ITEMS;
    } catch {
      return SEED_ITEMS;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  const addItem = useCallback((item) => {
    const newItem = { ...item, id: crypto.randomUUID(), available: true };
    setItems(prev => [...prev, newItem]);
    showToast(`"${item.name}" aggiunto al menu!`);
  }, [showToast]);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    showToast('Elemento aggiornato!');
  }, [showToast]);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Elemento rimosso dal menu.', 'error');
  }, [showToast]);

  const toggleAvailability = useCallback((id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  }, []);

  return (
    <MenuContext.Provider value={{
      items, addItem, updateItem, deleteItem, toggleAvailability,
      isAuthenticated, login, logout,
      toast, showToast,
      ALLERGENS, CATEGORIES,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside MenuProvider');
  return ctx;
};
