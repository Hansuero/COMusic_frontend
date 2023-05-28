import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'

const app = createApp(App)
const is_login = true
var default_url = "./assets/default_profile.png"
var cur_user = {
    user_id: 0,
    username: 'visitor',
    photo_url: default_url
}
app.provide('is_login', is_login)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cur_user = cur_user
app.use(router)
app.use(ElementPlus)
app.mount("#app")
