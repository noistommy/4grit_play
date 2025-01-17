import './frog.css'
import './assets/main.css'
import './assets/icomoon/style.css'

import './plugins/snackbar/snackbar.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n";

import App from './App.vue'
import router from './router'

import { createMetaManager, defaultConfig, deepestResolver } from 'vue-meta'

import Snackbars from './plugins/snackbar'

// import messages from "@intlify/unplugin-vue-i18n/messages";
import i18nMessages from '@/locales/i18n-sample.json'

import Tooltip from './directives/tooltip'


let maxLength = 0

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ko",
    fallbackLocale: "en",
    availableLocales: ["ko", "en", "ja"],
    // messages: getLoadMessage(),
    messages: getLoadMessage(),
})
const app = createApp(App)

app.use(Tooltip, {
    maxWidth: 250,
    theme: 'dark',
    direction: 'top', // top | bottom | left | right
    align: 'center' // start | center | end
})

app.use(i18n)
app.use(Snackbars)

// app.provide('$snackbars', Snackbars)

app.use(createPinia())
app.use(router)
app.use(createMetaManager(defaultConfig, deepestResolver))

app.mount('#app')

// i18n 설정
// function getMessages () {
//     console.log(messages)
//     return messages
// }

function getLoadMessage () {
    const availableLocales = ['en', 'ko', 'ja']
    const mgs = {}
    availableLocales.forEach(locale => {
        mgs[locale] = setLocalMessage(locale)
    })
    return mgs
}

function setLocalMessage (locale) {
    const messagesData = {}
    setMessage(i18nMessages.messages, messagesData, locale)
    // if (locale === 'ko') {
    //     console.log(findPath(i18nMessages.messages, locale, []))
    //     console.log(maxLength)
    // }
    return messagesData
}

function setMessage(data, container, locale) {
    for(const key of Object.keys(data)) {
        if (typeof data[key] !== 'object') {
            continue
        }
        if (Object.keys(data[key]).includes(locale)) {
            container[key] = data[key][locale]
            continue
        } else {
            container[key] = {}
        }
        setMessage(data[key], container[key], locale)
    }
}

// function findPath(data, locale, parents) {
//     let result = []
//     for (const key in data) {
//         if (typeof data[key] !== 'object') {
//             continue
//         }
//         if (Object.keys(data[key]).includes(locale)) {
//             result.push([...parents, key])
//             maxLength = Math.max([...parents, key].length, maxLength)
//         } else {
//             const parent = [...parents, key]
//             const child = findPath(data[key], locale, parent)
//             child.forEach(item => {
//                 result.push(item)
//             })
//         }
//     }
//     return result
// }