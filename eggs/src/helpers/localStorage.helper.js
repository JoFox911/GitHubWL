import { LocalStorage } from 'quasar'

const LS_KEYS = {
  LOCALE: 'locale'
}

const getLocale = () => {
  return LocalStorage.getItem(LS_KEYS.LOCALE)
}

const saveLocale = (newLocale) => {
  LocalStorage.set(LS_KEYS.LOCALE, newLocale)
}

export {
  getLocale,
  saveLocale
}
