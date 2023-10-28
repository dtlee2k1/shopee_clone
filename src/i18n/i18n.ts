import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HEADER_EN from 'src/locales/en/header.json'
import FOOTER_EN from 'src/locales/en/footer.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import CART_EN from 'src/locales/en/cart.json'
import USER_SIDE_NAV_EN from 'src/locales/en/userSideNav.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import CHANGE_PASSWORD_EN from 'src/locales/en/changePassword.json'
import HISTORY_PURCHASE_EN from 'src/locales/en/historyPurchase.json'

import HOME_VI from 'src/locales/vi/home.json'
import HEADER_VI from 'src/locales/vi/header.json'
import FOOTER_VI from 'src/locales/vi/footer.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import CART_VI from 'src/locales/vi/cart.json'
import USER_SIDE_NAV_VI from 'src/locales/vi/userSideNav.json'
import PROFILE_VI from 'src/locales/vi/profile.json'
import CHANGE_PASSWORD_VI from 'src/locales/vi/changePassword.json'
import HISTORY_PURCHASE_VI from 'src/locales/vi/historyPurchase.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
} as const

export const resources = {
  en: {
    header: HEADER_EN,
    footer: FOOTER_EN,
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    user_nav: USER_SIDE_NAV_EN,
    profile: PROFILE_EN,
    change_password: CHANGE_PASSWORD_EN,
    history_purchase: HISTORY_PURCHASE_EN
  },
  vi: {
    header: HEADER_VI,
    footer: FOOTER_VI,
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    user_nav: USER_SIDE_NAV_VI,
    profile: PROFILE_VI,
    change_password: CHANGE_PASSWORD_VI,
    history_purchase: HISTORY_PURCHASE_VI
  }
}

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  defaultNS,
  ns: ['header', 'footer', 'home', 'product', 'cart', 'user_nav', 'profile', 'change_password', 'history_purchase'],
  interpolation: {
    escapeValue: false
  }
})

export default i18n
