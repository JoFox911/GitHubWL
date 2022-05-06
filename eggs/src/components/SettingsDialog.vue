<template>
  <q-dialog
    v-model="show"
    :maximized="screenIsSmall"
    :transition-show="screenIsSmall ? 'slide-right' : 'fade'"
    :transition-hide="screenIsSmall ? 'slide-left' : 'fade'"
    @keydown.enter="onEnterClick"
  >
    <div class="p-dialog full-width flex column base-bg text-warning">
      <div class="p-dialog-header full-width row no-wrap justify-between non-selectable">
        <div class="p-dialog-header-inner row no-wrap font-header q-my-auto q-px-sm">
          {{ $t('settings') }}
        </div>
        <div class="flex q-my-auto q-px-sm">
          <q-btn
            icon="o_close"
            flat
            round
            @click="onCloseBtnClick"
          />
        </div>
      </div>
      <div class="p-dialog-container flex full-width">
        <div class="p-dialog-inner font-main column no-wrap full-width q-pa-sm">

          <img
            class="lang-label cursor-pointer q-mr-sm"
            v-for="locale in localesArray"
            :key="locale.value"
            :src="locale.icon"
            @onClick="setLocale(locale.value)"
          />


          <q-checkbox v-model="isSoundEnabled" label="Sound" color="primary" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

import { useSettingsStore } from '@stores/settings-store'

import { LOCALES } from '@/config/locales.enum.js'

export default defineComponent({
  name: 'SettingsDialog',
  emits: ['closeDialog'],
  data () {
    return {
      show: true
    }
  },
  setup() {
    const settingsStore = useSettingsStore()

    return {
      settingsStore
    }
  },
  computed: {
    localesArray () {
      return Object.values(LOCALES)
    },
    screenIsSmall () {
        return this.$q.screen.width < 576
    },
    isSoundEnabled: {
      get: function() {
        return this.settingsStore.isSoundEnabled
      },
      set: function(newVal) {
        this.settingsStore.changeSoundAbility(newVal)
      }
    }
  },
  methods: {
    onCloseBtnClick () {
      this.$emit('closeDialog')
    },
    onEnterClick () {
      this.$emit('closeDialog')
    },
    setLocale (locale) {
      this.settingsStore.changeLocale(locale)
    }
  }
})
</script>
