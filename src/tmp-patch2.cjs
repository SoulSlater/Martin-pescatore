const fs = require('fs');
const content = fs.readFileSync('c:/Users/Nicolò/.gemini/antigravity/scratch/menu-manager/src/context/MenuContext.jsx', 'utf-8');

const newCategories = `export const CATEGORIES = [
  { id: 'all', label: 'Tutto', emoji: '✨', section: 'all' },
  { id: 'caffetteria', label: 'Caffetteria', emoji: '☕', section: 'bar' },
  { id: 'panini', label: 'Panini', emoji: '🥪', section: 'bar' },
  { id: 'aperitivi', label: 'Aperitivi Alcolici', emoji: '🍹', section: 'bar' },
  { id: 'aperitivi_analcolici', label: 'Aperitivi Analcolici', emoji: '🥤', section: 'bar' },
  { id: 'birre', label: 'Birre', emoji: '🍻', section: 'bar' },
  { id: 'cocktail', label: 'Cocktail & Premium', emoji: '🍸', section: 'bar' },
  { id: 'vini', label: 'Vini', emoji: '🍷', section: 'bar' },
  { id: 'bevande', label: 'Bevande', emoji: '🧃', section: 'bar' },
  { id: 'amari', label: 'Amari & Grappe', emoji: '🥃', section: 'bar' },
  
  { id: 'tradizionali', label: 'Le Tradizionali', emoji: '🍕', section: 'pizzeria' },
  { id: 'bianche', label: 'Le Bianche', emoji: '👨‍🍳', section: 'pizzeria' },
  { id: 'speciali', label: 'Le Speciali', emoji: '🌟', section: 'pizzeria' },
  { id: 'extra', label: 'Aggiunte & Coperto', emoji: '➕', section: 'pizzeria' },
  { id: 'menu_compleanni', label: 'Eventi & Fissi', emoji: '🎉', section: 'pizzeria' },
];`;

let part1 = content.substring(0, content.indexOf('export const CATEGORIES = ['));
let part2 = content.substring(content.indexOf('const SEED_ITEMS = ['));

// inside part2, keep everything up to // --- PIZZE SPECIALI ---
let itemsPart1 = part2.substring(0, part2.indexOf('  // --- PIZZE SPECIALI ---'));

let itemsPart2 = `  // --- PIZZE TRADIZIONALI ---
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
`;

let part3 = part2.substring(part2.indexOf('];\n\nexport function MenuProvider'));

let finalContent = part1 + newCategories + '\n\n' + itemsPart1 + itemsPart2 + '\n' + part3;

finalContent = finalContent.replace("STORAGE_KEY = 'menu_manager_items_v3'", "STORAGE_KEY = 'menu_manager_items_v5'");

fs.writeFileSync('c:/Users/Nicolò/.gemini/antigravity/scratch/menu-manager/src/context/MenuContext.jsx', finalContent);
console.log("Successfully replaced the file contents.");
