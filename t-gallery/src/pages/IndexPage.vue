<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    {{ $t('test') }}

    <q-select 
      v-model="lang" 
      :options="locales" 
      label="Standard" 
      option-value="value"
      option-label="label"
      class="full-width"
    />

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useSettingsStore } from '@stores/settings-store'
import { LOCALES } from '@/config/locales.enum.js'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const settingsStore = useSettingsStore()

    return {
      settingsStore,

      languageArray: ['uk', 'en-US']
    }
  },
  computed: {
    locales: () => Object.values(LOCALES),
    lang: {
      get: function() {
        return this.locales.find(locale => locale.value === this.settingsStore.locale)
      },
      set: function(newVal) {
        this.settingsStore.changeLocale(newVal.value)
      }
    }
  }
})
</script>
