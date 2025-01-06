<template>
  <v-container class="pa-0 fill-height">
    <v-row class="fill-height ma-0">
      <!-- Sol taraf: API Dokümantasyonu -->
      <v-col cols="12" md="5" lg="4" class="pa-4">
        <v-card class="mb-4" elevation="2" theme="dark">
          <v-card-title class="text-h6 py-4 px-4 bg-primary">
            <v-icon icon="mdi-book-open-variant" class="mr-2" />
            API Dokümantasyonu
          </v-card-title>
          <v-card-text class="pa-4">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">Endpoint</h3>
            <v-chip color="primary" class="mb-4" size="large">POST /api/sentiment</v-chip>

            <h3 class="text-subtitle-1 font-weight-bold mb-2">İstek Formatı</h3>
            <v-sheet color="grey-darken-3" class="pa-4 mb-4 rounded code-block">
              <pre class="text-body-2 white--text">{ "text": "Analiz edilecek metin" }</pre>
            </v-sheet>

            <h3 class="text-subtitle-1 font-weight-bold mb-2">Yanıt Formatı</h3>
            <v-sheet color="grey-darken-3" class="pa-4 mb-4 rounded code-block">
              <pre class="text-body-2 white--text">{
                "sentiment": "pozitif|negatif",
                "confidence": 0.95
              }</pre>
            </v-sheet>
          </v-card-text>
        </v-card>

        <v-card elevation="2" theme="dark">
          <v-card-title class="text-h6 py-4 px-4 bg-secondary">
            <v-icon icon="mdi-lightbulb-on" class="mr-2" />
            Örnek Kullanımlar
          </v-card-title>
          <v-card-text class="pa-4">
            <v-list bg-color="transparent">
              <v-list-item
                v-for="(example, i) in examples"
                :key="i"
                :subtitle="example.description"
                class="mb-2 rounded-lg"
                hover
              >
                <template v-slot:prepend>
                  <v-chip
                    :color="example.sentiment === 'pozitif' ? 'success' : 'error'"
                    size="small"
                    variant="elevated"
                  >
                    {{ example.sentiment }}
                  </v-chip>
                </template>
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    density="comfortable"
                    icon="mdi-content-copy"
                    @click="useExample(example.text)"
                    color="primary"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sağ taraf: Duygu Analizi -->
      <v-col cols="12" md="7" lg="8" class="pa-4">
        <v-card class="h-100" elevation="2">
          <v-card-title class="text-center text-h4 py-6 gradient">
            <v-icon size="x-large" icon="mdi-brain" class="mr-3" />
            Türkçe Duygu Analizi
          </v-card-title>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="analyzeSentiment">
              <v-textarea
                v-model="text"
                label="Analiz edilecek metni girin"
                :rules="[v => !!v || 'Metin gereklidir']"
                rows="4"
                counter
                maxlength="500"
                auto-grow
                variant="outlined"
                class="mb-6"
                color="primary"
                bg-color="grey-lighten-4"
                placeholder="Örnek: Bu ürün gerçekten harika, kesinlikle tavsiye ederim!"
              ></v-textarea>

              <v-btn
                block
                color="primary"
                size="x-large"
                :loading="loading"
                :disabled="!text"
                type="submit"
                class="mb-6 text-uppercase font-weight-bold"
                elevation="2"
              >
                <v-icon left class="mr-2">mdi-magnify</v-icon>
                Analiz Et
              </v-btn>

              <v-expand-transition>
                <v-alert
                  v-if="result"
                  :color="result.sentiment === 'pozitif' ? 'success' : 'error'"
                  :icon="result.sentiment === 'pozitif' ? 'mdi-emoticon-happy' : 'mdi-emoticon-sad'"
                  variant="tonal"
                  class="mb-4"
                  elevation="2"
                  border="start"
                >
                  <v-row align="center" no-gutters>
                    <v-col cols="12" class="text-h5 mb-3 font-weight-bold">
                      Duygu: {{ result.sentiment }}
                    </v-col>
                    <v-col cols="12">
                      <div class="text-subtitle-1 mb-2">Güven Oranı:</div>
                      <v-progress-linear
                        :model-value="result.confidence * 100"
                        :color="result.sentiment === 'pozitif' ? 'success' : 'error'"
                        height="24"
                        rounded
                        class="confidence-bar"
                      >
                        <template v-slot:default>
                          <span class="font-weight-bold text-subtitle-2">
                            {{ (result.confidence * 100).toFixed(1) }}%
                          </span>
                        </template>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-expand-transition>

              <v-expand-transition>
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  closable
                  class="mb-4"
                  elevation="2"
                  border="start"
                >
                  <div class="text-subtitle-1 font-weight-medium">
                    <v-icon left class="mr-2">mdi-alert-circle</v-icon>
                    {{ error }}
                  </div>
                </v-alert>
              </v-expand-transition>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface SentimentResult {
  sentiment: 'pozitif' | 'negatif'
  confidence: number
}

const examples = [
  {
    text: 'Bu ürün harika, kesinlikle tavsiye ederim!',
    sentiment: 'pozitif',
    description: 'Olumlu bir ürün değerlendirmesi'
  },
  {
    text: 'Çok kötü bir deneyimdi, hiç memnun kalmadım.',
    sentiment: 'negatif',
    description: 'Olumsuz bir deneyim paylaşımı'
  },
  {
    text: 'Müşteri hizmetleri çok ilgili ve yardımsever.',
    sentiment: 'pozitif',
    description: 'Olumlu müşteri hizmetleri deneyimi'
  },
  {
    text: 'Ürün beklediğim gibi çıkmadı, hayal kırıklığı.',
    sentiment: 'negatif',
    description: 'Olumsuz ürün değerlendirmesi'
  }
]

const text = ref('')
const loading = ref(false)
const result = ref<SentimentResult | null>(null)
const error = ref<string | null>(null)

const useExample = (exampleText: string) => {
  text.value = exampleText
}

const analyzeSentiment = async () => {
  if (!text.value.trim()) return

  loading.value = true
  error.value = null
  result.value = null
  
  try {
    const response = await axios.post<SentimentResult>('http://localhost:4000/api/sentiment', {
      text: text.value
    })
    result.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.'
    console.error('Hata:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(135deg, #1867C0 0%, #5CBBF6 100%);
  color: white;
}

.v-card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}

.v-card-title {
  border-radius: 16px 16px 0 0;
}

.code-block {
  font-family: 'Fira Code', monospace;
  position: relative;
}

.code-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.confidence-bar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

:deep(.v-alert) {
  border-radius: 12px;
}

:deep(.v-progress-linear) {
  border-radius: 12px;
}

.v-list-item {
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: rgba(255,255,255,0.1) !important;
}

.fill-height {
  min-height: calc(100vh - 80px);
}

.v-main {
  flex: 1 0 auto;
}

.h-100 {
  height: 100%;
}

.v-container {
  max-width: 100% !important;
}
</style>
