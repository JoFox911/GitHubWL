<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <img
          class="logo-label q-mr-sm"
          src="icons/eggs.svg"
        />

        <q-toolbar-title>
          {{ $t('title') }}
        </q-toolbar-title>
        
        <img
          class="settings-label cursor-pointer"
          src="icons/icon-settings.svg" 
          @click="openSettings"
        />


        <settings-dialog v-if="displaySettingsDialog" @closeDialog="closeSettings"/>
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

import SettingsDialog from '@components/SettingsDialog.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SettingsDialog
  },
  data: function() {
    return {
      displaySettingsDialog: false,
    }
  },
  methods: {
    openSettings () {
      this.displaySettingsDialog = true
    },
    closeSettings () {
      this.displaySettingsDialog = false
    }
  }
})
</script>
