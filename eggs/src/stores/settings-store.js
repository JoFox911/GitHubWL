import { defineStore } from 'pinia';
import LocaleService from '@services/locale.service'
import { getLocale, saveLocale } from '@helpers/localStorage.helper.js'
import { LOCALES } from '@/config/locales.enum.js'



export const useSettingsStore = defineStore('settings', {
    state: () => ({
        locale: ''
    }),
    actions: {
        changeLocale(newLocale) {
            this.locale = newLocale
            saveLocale(newLocale)
            LocaleService.setLocale(newLocale)
        },

        initLocale() {
            const newLocale = getLocale() || LOCALES.UKRAINE.value
            this.changeLocale(newLocale)
        }
    },
});
