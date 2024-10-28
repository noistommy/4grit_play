import './frog.css'
import './assets/main.css'
import './assets/icomoon/style.css'

import './plugins/snackbar/snackbar.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createMetaManager, defaultConfig, deepestResolver } from 'vue-meta'

import Snackbars from './plugins/snackbar'


const app = createApp(App)

app.use(Snackbars)

app.use(createPinia())
app.use(router)
app.use(createMetaManager(defaultConfig, deepestResolver))

app.mount('#app')
