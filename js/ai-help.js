// ============================================================
// Krishi Mitra — ai-help.js
// AI chat interface: suggested questions, mock responses, and
// mock voice/microphone input (ai-help.html).
// ============================================================

const aiResponses = {
  'Where should I sell my crop?': 'Based on your location and current prices, <span class="highlight-text">Indore Mandi</span> is the best option for soybean. The current rate is <span class="highlight-text">₹4,800 per quintal</span>, which is 8% higher than the regional average. You can also check Ujjain Mandi as an alternative.',
  'Which market gives the best price?': 'For soybean, <span class="highlight-text">Indore Mandi</span> is currently offering the highest price at <span class="highlight-text">₹4,800/quintal</span>. Ujjain Mandi is at ₹4,650/quintal. I recommend comparing transport costs before deciding.',
  'Is demand increasing?': 'Yes! Soybean demand has <span class="highlight-text">increased by 12% this month</span> due to export demand and oil processing. Wheat demand is also stable. This is a good time to plan your sales.',
  'Should I sell now or wait?': 'Based on current trends, <span class="highlight-text">selling within the next 7 days</span> is recommended. Prices are at a seasonal high and may dip after new harvests enter the market next month.',
  'Which nearby market is best?': 'The nearest markets to your location are: 1) <span class="highlight-text">Dewas Mandi (15 km)</span> — ₹4,700/q, 2) <span class="highlight-text">Indore Mandi (25 km)</span> — ₹4,800/q. Indore offers a slightly better price despite the extra distance.',
  'मैं अपनी फसल कहाँ बेचूं?': 'आपके स्थान और वर्तमान मूल्यों के आधार पर, <span class="highlight-text">इंदौर मंडी</span> सोयाबीन के लिए सबसे अच्छा विकल्प है। वर्तमान दर <span class="highlight-text">₹4,800 प्रति क्विंटल</span> है, जो क्षेत्रीय औसत से 8% अधिक है।',
  'कौन सा बाजार सबसे अच्छा भाव देता है?': 'सोयाबीन के लिए, <span class="highlight-text">इंदौर मंडी</span> वर्तमान में <span class="highlight-text">₹4,800/क्विंटल</span> का सबसे अधिक मूल्य दे रही है। उज्जैन मंडी ₹4,650/क्विंटल पर है।',
  'क्या मांग बढ़ रही है?': 'हां! निर्यात मांग के कारण सोयाबीन की मांग इस महीने <span class="highlight-text">12% बढ़ी है</span>। गेहूं की मांग भी स्थिर है। यह बिक्री की योजना बनाने का अच्छा समय है।',
  'क्या मैं अभी बेचूं या इंतजार करूं?': 'वर्तमान रुझानों के आधार पर, <span class="highlight-text">अगले 7 दिनों में बेचना</span> उचित है। मूल्य मौसमी उच्च पर हैं और अगले महीने नई फसल आने पर गिर सकते हैं।',
  'कौन सा नजदीकी बाजार सबसे अच्छा है?': 'आपके स्थान के निकटतम बाजार: 1) <span class="highlight-text">देवास मंडी (15 किमी)</span> — ₹4,700/q, 2) <span class="highlight-text">इंदौर मंडी (25 किमी)</span> — ₹4,800/q। इंदौर में अतिरिक्त दूरी के बावजूद बेहतर कीमत है।',
};

const defaultAIResponse = {
  en: 'Thank you for your question! Based on current market data, I recommend checking the Market Prices section for the latest updates. For personalized advice, try asking about specific crops or markets.',
  hi: 'आपके प्रश्न के लिए धन्यवाद! वर्तमान बाजार डेटा के आधार पर, मैं नवीनतम अपडेट के लिए बाजार भाव अनुभाग देखने की सलाह देता हूं। व्यक्तिगत सलाह के लिए, विशेष फसलों या बाजारों के बारे में पूछें।'
};

function askAI(question) {
  const msgs = document.getElementById('chat-messages');

  // User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = question;
  msgs.appendChild(userBubble);

  // Loading
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-bubble bot';
  loadingBubble.innerHTML = '<div class="bot-label">🤖 ' + (i18n[currentLang].ai_assistant) + '</div><div class="loading-dots"><span></span><span></span><span></span></div>';
  msgs.appendChild(loadingBubble);
  msgs.scrollTop = msgs.scrollHeight;

  // Simulate response delay
  setTimeout(() => {
    const response = aiResponses[question] || (currentLang === 'hi' ? defaultAIResponse.hi : defaultAIResponse.en);
    loadingBubble.innerHTML = '<div class="bot-label">🤖 ' + (i18n[currentLang].ai_assistant) + '</div>' + response;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  askAI(q);
}

function toggleMic() {
  const btn = document.getElementById('mic-btn');
  if (btn.classList.contains('recording')) {
    btn.classList.remove('recording');
    btn.textContent = '🎤';
    showToast(currentLang === 'hi' ? '🎤 रिकॉर्डिंग बंद' : '🎤 Recording stopped');
  } else {
    btn.classList.add('recording');
    btn.textContent = '⏹️';
    showToast(currentLang === 'hi' ? '🎤 सुन रहा हूँ...' : '🎤 Listening...');
    // Auto-stop after 5s for demo
    setTimeout(() => {
      if (btn.classList.contains('recording')) {
        btn.classList.remove('recording');
        btn.textContent = '🎤';
        const demoQ = currentLang === 'hi' ? 'क्या मैं अभी बेचूं या इंतजार करूं?' : 'Should I sell now or wait?';
        document.getElementById('chat-input').value = demoQ;
        sendChat();
      }
    }, 3000);
  }
}
