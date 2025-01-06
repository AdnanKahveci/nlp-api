const express = require('express');
const cors = require('cors');
const { NlpManager } = require('node-nlp');

const app = express();
const port = process.env.PORT || 4000;

// CORS ayarları
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());

// NLP Manager'ı oluştur ve eğit
const manager = new NlpManager({ languages: ['tr'] });

// Pozitif örnekler
manager.addDocument('tr', 'harika', 'positive');
manager.addDocument('tr', 'mükemmel', 'positive');
manager.addDocument('tr', 'çok iyi', 'positive');
manager.addDocument('tr', 'güzel', 'positive');
manager.addDocument('tr', 'süper', 'positive');
manager.addDocument('tr', 'tavsiye ederim', 'positive');
manager.addDocument('tr', 'beğendim', 'positive');

// Negatif örnekler
manager.addDocument('tr', 'kötü', 'negative');
manager.addDocument('tr', 'berbat', 'negative');
manager.addDocument('tr', 'rezalet', 'negative');
manager.addDocument('tr', 'beğenmedim', 'negative');
manager.addDocument('tr', 'tavsiye etmem', 'negative');
manager.addDocument('tr', 'çok kötü', 'negative');
manager.addDocument('tr', 'hiç iyi değil', 'negative');

// Modeli eğit
(async() => {
    try {
        await manager.train();
        console.log('Model eğitimi tamamlandı');
    } catch (error) {
        console.error('Model eğitimi sırasında hata:', error);
        process.exit(1);
    }
})();

// Ana sayfa
app.get('/', (req, res) => {
    res.json({ message: 'Doğal Dil İşleme API\'sine Hoş Geldiniz!' });
});

// Duygu analizi endpoint'i
app.post('/api/sentiment', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text alanı gereklidir' });
        }

        const result = await manager.process('tr', text);
        
        // En yüksek olasılıklı sınıflandırmayı al
        const sentiment = result.intent === 'positive' ? 'pozitif' : 'negatif';
        const confidence = Math.max(...result.classifications.map(c => c.score));

        res.json({
            sentiment,
            confidence: parseFloat(confidence.toFixed(3))
        });
    } catch (error) {
        console.error('API Hatası:', error);
        res.status(500).json({ error: 'Bir hata oluştu: ' + error.message });
    }
});

// Sunucuyu başlat
const server = app.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} kullanımda. Lütfen farklı bir port deneyin.`);
        process.exit(1);
    } else {
        console.error('Sunucu başlatılırken hata:', err);
        process.exit(1);
    }
}); 