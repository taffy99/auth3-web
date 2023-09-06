import { createI18n } from 'vue-i18n'
import localZhCn from './language/zh-cn'
import localEn from './language/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const i18n = createI18n({
    legacy: false,
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    messages: {
        'zh-cn': localZhCn,
        'en': localEn
    }
}) 
export const elementLocales = {
    'zh-cn': zhCn,
    en
}
export default i18n