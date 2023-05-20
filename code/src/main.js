import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'

const app = createApp(App)
const is_login = false
app.provide('is_login', is_login)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
