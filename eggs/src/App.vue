<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useSettingsStore } from '@stores/settings-store'
import { Service } from '@services/base.service'

export default defineComponent({
  name: 'App',
  created () {
    Service.prototype.$vue = this

    const settingsStore = useSettingsStore()
    settingsStore.initLocale()

    document.body.addEventListener('click', () => {
      settingsStore.initSound()
    }, {once : true});
  }
})
</script>
