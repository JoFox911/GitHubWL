import { LocalStorage } from 'quasar'

const LS_KEYS = {
  LOCALE: 'locale',
  IS_SOUNDS_ABLE: 'is_sound_able'
}

const getLocale = () => {
  return LocalStorage.getItem(LS_KEYS.LOCALE)
}

const saveLocale = (newLocale) => {
  LocalStorage.set(LS_KEYS.LOCALE, newLocale)
}

const getSoundAbility = () => {
  return LocalStorage.getItem(LS_KEYS.IS_SOUNDS_ABLE)
}

const saveSoundAbility = (newAbilityValue) => {
  LocalStorage.set(LS_KEYS.IS_SOUNDS_ABLE, newAbilityValue)
}

export {
  getLocale,
  saveLocale,
  getSoundAbility,
  saveSoundAbility
}
