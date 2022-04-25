<template>
  <q-dialog
    v-model="show"
    :maximized="screenIsSmall"
    :transition-show="screenIsSmall ? 'slide-right' : 'fade'"
    :transition-hide="screenIsSmall ? 'slide-left' : 'fade'"
    @keydown.enter="onEnterClick"
  >
    <div class="p-dialog full-width flex column base-bg text-primary">
      <div
        class="p-dialog-header full-width row no-wrap justify-between non-selectable p-border-bottom p-border-general font-button backing-after backing-after-medium"
      >
        <div
          class="p-dialog-header-inner row no-wrap font-header q-my-auto q-px-sm"
        >
          {{ $t('settings') }}
        </div>
        <div
          class="flex q-my-auto q-px-sm font-header"
        >
          <q-btn
            icon="o_close"
            class="p-btn-tiny"
            flat
            round
            @click="onCloseBtnClick"
          />
        </div>
      </div>
      <div
        class="p-dialog-container font-button flex full-width"
      >
        <div
          class="p-dialog-inner font-main column no-wrap full-width"
        >
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
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

import { useSettingsStore } from '@stores/settings-store'

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
    screenIsSmall () {
        return this.$q.screen.width < 576
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
