# Natural Language Processing (NLP) API and Web Interface
# Doğal Dil İşleme (NLP) API ve Web Arayüzü

[English](#english) | [Türkçe](#turkish)

## English

This project is a web application developed for Turkish text analysis. It is built using Vue.js frontend and FastAPI backend.

### Technologies

#### Frontend
- Vue.js 3
- Vuetify (UI Framework)
- Axios (for HTTP requests)

#### Backend
- FastAPI
- Transformers (Hugging Face)
- PyTorch

### Features

- Sentiment Analysis
- Modern and User-Friendly Interface
- Real-Time Analysis
- REST API Endpoints

### Installation

#### Backend (API)

1. Create and activate Python virtual environment:
```bash
python -m venv backend/venv
# For Windows
.\backend\venv\Scripts\activate
# For Linux/Mac
source backend/venv/bin/activate
```

2. Install requirements:
```bash
cd backend
pip install -r requirements.txt
```

3. Run the API:
```bash
uvicorn main:app --reload
```

#### Frontend (Vue.js)

1. Install Node.js modules:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

### Project Structure

```
nlp-api/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

### API Endpoints

#### Sentiment Analysis

**Endpoint:** `/api/sentiment`
**Method:** POST

**Request:**
```json
{
    "text": "This product is amazing, I definitely recommend it!"
}
```

**Response:**
```json
{
    "sentiment": "positive",
    "confidence": 0.95
}
```

### Web Interface

The web interface will run at http://localhost:5173 by default.
The API will run at http://localhost:8000.

### Screenshots

#### Main Interface
[Screenshot of the main interface will be here]

#### Analysis Results
[Screenshot of analysis results will be here]

### License

MIT License

### Contact

[Contact information]

---

## Turkish

Bu proje, Türkçe metin analizi için geliştirilmiş bir web uygulamasıdır. Vue.js frontend ve FastAPI backend kullanılarak geliştirilmiştir.

## Teknolojiler

### Frontend
- Vue.js 3
- Vuetify (UI Framework)
- Axios (HTTP istekleri için)

### Backend
- FastAPI
- Transformers (Hugging Face)
- PyTorch

## Özellikler

- Duygu Analizi (Sentiment Analysis)
- Modern ve Kullanıcı Dostu Arayüz
- Gerçek Zamanlı Analiz
- REST API Endpoints

## Kurulum

### Backend (API)

1. Python sanal ortamı oluşturun ve aktifleştirin:
```bash
python -m venv backend/venv
# Windows için
.\backend\venv\Scripts\activate
# Linux/Mac için
source backend/venv/bin/activate
```

2. Gereksinimleri yükleyin:
```bash
cd backend
pip install -r requirements.txt
```

3. API'yi çalıştırın:
```bash
uvicorn main:app --reload
```

### Frontend (Vue.js)

1. Node.js modüllerini yükleyin:
```bash
cd frontend
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Proje Yapısı

```
nlp-api/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

### Duygu Analizi

**Endpoint:** `/api/sentiment`
**Metod:** POST

**İstek (Request):**
```json
{
    "text": "Bu ürün harika, kesinlikle tavsiye ederim!"
}
```

**Yanıt (Response):**
```json
{
    "sentiment": "pozitif",
    "confidence": 0.95
}
```

## Web Arayüzü

Web arayüzü varsayılan olarak http://localhost:5173 adresinde çalışacaktır.
API ise http://localhost:8000 adresinde çalışacaktır.

## Lisans

MIT License

## İletişim

[İletişim bilgileri] 