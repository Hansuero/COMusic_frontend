import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'

const app = createApp(App)
const is_login = false
app.provide('is_login', is_login)
app.config.globalProperties.$axios=axios
app.use(router)
app.use(ElementPlus)
app.mount("#app")
