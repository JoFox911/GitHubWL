import { defineStore } from 'pinia';
import LocaleService from '@services/locale.service'
import SoundsService from '@services/sounds.service'
import { getLocale, saveLocale, getSoundAbility, saveSoundAbility } from '@helpers/localStorage.helper.js'
import { LOCALES } from '@/config/locales.enum.js'



export const useSettingsStore = defineStore('settings', {
    state: () => ({
        locale: '',
        isSoundEnabled: true
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
        },

        changeSoundAbility(newAbility) {
            saveSoundAbility(newAbility)
            this.isSoundEnabled = newAbility
            if (newAbility) {
                SoundsService.playBackgroundSound()
            } else {
                SoundsService.stopBackgroundSound()
            }
        },

        initSound() {
            const isSoundEnabledLS = getSoundAbility()
            this.changeSoundAbility(isSoundEnabledLS)
        }
    },
});
