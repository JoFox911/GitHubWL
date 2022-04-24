<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <img
          class="lang-label q-mr-sm"
          src="icons/eggs.svg" 
          @click="setLocale('uk')"
        />

        <q-toolbar-title>
          {{ $t('title') }}
        </q-toolbar-title>

        <img
          class="lang-label cursor-pointer q-mr-sm"
          src="icons/flags/ukraine.png" 
          @click="setLocale('uk')"
        />

        <img
          class="lang-label cursor-pointer q-mr-sm"
          src="icons/flags/vereinigte-staaten.png" 
          @click="setLocale('en-US')"
        />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="default-bg relative-position fit column no-wrap">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

import { useSettingsStore } from '@stores/settings-store'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const settingsStore = useSettingsStore()

    return {
      settingsStore
    }
  },
  methods: {
    setLocale (locale) {
      this.settingsStore.changeLocale(locale)
    }
  }
})
</script>
