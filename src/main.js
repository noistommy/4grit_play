import './assets/main.css'
import './assets/icomoon/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createMetaManager, defaultConfig, deepestResolver } from 'vue-meta'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager(defaultConfig, deepestResolver))

app.mount('#app')
