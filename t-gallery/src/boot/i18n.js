import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'
import { LOCALES } from '@/config/locales.enum.js'


// Pluralization of ukrainian words
// 0 учасників; 1 учасник; 2 учасника; 5 учасників і тд
function customRule (choice, choicesLength, orgRule) {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

const i18n = createI18n({
  locale: LOCALES.UKRAINE.value,
  fallbackLocale: LOCALES.UKRAINE.value,
  globalInjection: true,
  messages,
  pluralizationRules: {
    uk: customRule
  }
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})

export { i18n } // if you need this instance elsewhere
