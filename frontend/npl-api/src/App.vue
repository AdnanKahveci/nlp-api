<template>
  <v-app>
    <v-app-bar
      color="primary"
      elevation="4"
      class="px-3"
    >
      <v-app-bar-title class="text-h5 font-weight-bold">
        <v-icon icon="mdi-brain" class="mr-2" />
        NLP API
      </v-app-bar-title>

      <v-spacer />

      <v-btn
        href="https://github.com/yourusername/nlp-api"
        target="_blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>

    <v-footer
      app
      color="primary"
      class="px-4 py-3 text-center d-flex flex-column flex-sm-row"
    >
      <div>&copy; {{ new Date().getFullYear() }} - Türkçe Duygu Analizi</div>
      <v-spacer />
      <div class="mt-2 mt-sm-0">
        <v-icon icon="mdi-heart" color="red" class="mr-1" />
        ile geliştirildi
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
