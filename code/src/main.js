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
//服务器
axios.defaults.baseURL = 'http://82.157.165.72/api'
//本地
//axios.defaults.baseURL ='http://127.0.0.1:4523/m1/2749792-0-default/api‘
app.config.globalProperties.$cur_user = cur_user
app.use(router)
app.use(ElementPlus)
app.mount("#app")
