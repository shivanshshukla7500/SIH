// ============================================================
// Krishi Mitra — buyers.js
// Buyer/market data, filtering, and rendering (buyers.html).
// ============================================================

const buyerData = [
  { type: 'market', name: 'Indore Mandi', nameHi: 'इंदौर मंडी', location: 'Indore, MP', crop: 'Soybean / सोयाबीन', price: '₹4,800/q', qty: '500+ Quintals', distance: '25 km' },
  { type: 'company', name: 'AgriPro Pvt Ltd', nameHi: 'एग्रीप्रो प्रा. लि.', location: 'Ujjain, MP', crop: 'Wheat / गेहूं', price: '₹2,600/q', qty: '200 Quintals', distance: '40 km' },
  { type: 'trader', name: 'Ramesh Traders', nameHi: 'रमेश ट्रेडर्स', location: 'Dewas, MP', crop: 'Soybean / सोयाबीन', price: '₹4,750/q', qty: '100 Quintals', distance: '15 km' },
  { type: 'market', name: 'Ujjain Mandi', nameHi: 'उज्जैन मंडी', location: 'Ujjain, MP', crop: 'Wheat / गेहूं', price: '₹2,500/q', qty: '300+ Quintals', distance: '55 km' },
  { type: 'company', name: 'FreshHarvest Foods', nameHi: 'फ्रेशहार्वेस्ट फूड्स', location: 'Bhopal, MP', crop: 'Onion / प्याज', price: '₹1,900/q', qty: '150 Quintals', distance: '80 km' },
  { type: 'trader', name: 'Sharma & Sons', nameHi: 'शर्मा एंड संस', location: 'Dhar, MP', crop: 'Cotton / कपास', price: '₹6,600/q', qty: '50 Quintals', distance: '35 km' },
];

let currentBuyerFilter = 'all';

function renderBuyers(typeFilter = 'all') {
  const t = i18n[currentLang];
  const list = document.getElementById('buyers-list');
  if (!list) return;
  const filtered = buyerData.filter(b => typeFilter === 'all' || b.type === typeFilter);

  list.innerHTML = filtered.map(b => `
    <div class="buyer-card" data-type="${b.type}">
      <div class="buyer-header">
        <div class="buyer-avatar ${b.type}">
          ${b.type === 'market' ? '🏪' : b.type === 'company' ? '🏢' : '👤'}
        </div>
        <div>
          <div class="buyer-name">${currentLang === 'hi' ? b.nameHi : b.name}</div>
          <div class="buyer-type">${b.type === 'market' ? (currentLang === 'hi' ? 'मंडी' : 'Market') : b.type === 'company' ? (currentLang === 'hi' ? 'कंपनी' : 'Company') : (currentLang === 'hi' ? 'व्यापारी' : 'Trader')}</div>
        </div>
      </div>
      <div class="buyer-details">
        <div class="detail-item">
          <span class="detail-icon">📍</span>
          <span>${b.location}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">🌾</span>
          <span class="detail-value">${b.crop}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">💰</span>
          <span class="detail-value">${b.price}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">📦</span>
          <span>${b.qty}</span>
        </div>
      </div>
      <button class="btn-view-details" onclick="showToast('${currentLang === 'hi' ? b.nameHi + ' — विवरण जल्द उपलब्ध!' : b.name + ' — Details coming soon!'}')">
        👁️ ${t.view_details || 'View Details'}
      </button>
    </div>
  `).join('');
}

function filterBuyers(btn, type) {
  currentBuyerFilter = type;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderBuyers(type);
}

function onLanguageChange() {
  renderBuyers(currentBuyerFilter);
}

document.addEventListener('DOMContentLoaded', () => renderBuyers());
