// ============================================================
// Krishi Mitra — market.js
// Market price data, search/filter, and rendering (market.html).
// ============================================================

const marketData = [
  { emoji: '🌾', name: 'Wheat / गेहूं', nameEn: 'Wheat', nameHi: 'गेहूं', category: 'Cereal', price: 2450, change: 'up', changeVal: '+5.2%', bestMarket: 'Indore Mandi' },
  { emoji: '🌾', name: 'Rice / चावल', nameEn: 'Rice', nameHi: 'चावल', category: 'Cereal', price: 3200, change: 'up', changeVal: '+3.1%', bestMarket: 'Raipur Mandi' },
  { emoji: '🫘', name: 'Soybean / सोयाबीन', nameEn: 'Soybean', nameHi: 'सोयाबीन', category: 'Oilseed', price: 4800, change: 'up', changeVal: '+8.0%', bestMarket: 'Indore Mandi' },
  { emoji: '🧶', name: 'Cotton / कपास', nameEn: 'Cotton', nameHi: 'कपास', category: 'Fiber', price: 6500, change: 'stable', changeVal: '→ 0%', bestMarket: 'Rajkot Mandi' },
  { emoji: '🧅', name: 'Onion / प्याज', nameEn: 'Onion', nameHi: 'प्याज', category: 'Vegetable', price: 1800, change: 'down', changeVal: '-4.5%', bestMarket: 'Nashik Mandi' },
  { emoji: '🥔', name: 'Potato / आलू', nameEn: 'Potato', nameHi: 'आलू', category: 'Vegetable', price: 1200, change: 'stable', changeVal: '→ 0%', bestMarket: 'Agra Mandi' },
  { emoji: '🍅', name: 'Tomato / टमाटर', nameEn: 'Tomato', nameHi: 'टमाटर', category: 'Vegetable', price: 2800, change: 'down', changeVal: '-12%', bestMarket: 'Kurnool Mandi' },
  { emoji: '🌽', name: 'Maize / मक्का', nameEn: 'Maize', nameHi: 'मक्का', category: 'Cereal', price: 2100, change: 'up', changeVal: '+2.3%', bestMarket: 'Davangere Mandi' },
  { emoji: '🎋', name: 'Sugarcane / गन्ना', nameEn: 'Sugarcane', nameHi: 'गन्ना', category: 'Cash Crop', price: 350, change: 'stable', changeVal: '→ 0%', bestMarket: 'Lucknow Mandi' },
];

function renderMarket(filter = '') {
  const t = i18n[currentLang];
  const list = document.getElementById('market-list');
  if (!list) return;
  const filtered = marketData.filter(m => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return m.name.toLowerCase().includes(q) ||
           m.nameEn.toLowerCase().includes(q) ||
           m.nameHi.includes(q) ||
           m.category.toLowerCase().includes(q);
  });

  list.innerHTML = filtered.map(m => `
    <div class="market-crop-card">
      <div class="crop-row">
        <span class="crop-emoji">${m.emoji}</span>
        <div class="crop-info">
          <div class="crop-name">${currentLang === 'hi' ? m.nameHi : m.nameEn}</div>
          <div class="crop-category">${m.category}</div>
        </div>
        <div class="crop-price-area">
          <div class="crop-price">₹${m.price.toLocaleString()}</div>
          <div class="crop-unit">${t.per_quintal}</div>
          <div class="price-change ${m.change}">
            ${m.change === 'up' ? '⬆' : m.change === 'down' ? '⬇' : '➡'} ${m.changeVal}
          </div>
        </div>
      </div>
      <div class="best-market-badge">
        <span class="badge-icon">📍</span>
        <span class="badge-text">${t.best_market_label || 'Best Market'}: ${m.bestMarket}</span>
      </div>
    </div>
  `).join('');
}

function filterMarket() {
  const q = document.getElementById('market-search-input').value;
  renderMarket(q);
}

function onLanguageChange() {
  const q = document.getElementById('market-search-input') ? document.getElementById('market-search-input').value : '';
  renderMarket(q);
}

document.addEventListener('DOMContentLoaded', () => renderMarket());
