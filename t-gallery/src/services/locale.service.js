import { Service } from './base.service'
import { i18n } from '@/boot/i18n.js'

class LocaleService extends Service {
  setLocale (locale) {
    i18n.global.locale = locale
    import(`quasar/lang/${locale}`).then(qlocale => {
      this.$vue.$q.lang.set(qlocale.default)
    })
    document.documentElement.lang = i18n.language
  }
}
export default new LocaleService()
