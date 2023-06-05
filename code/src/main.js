import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
<<<<<<< HEAD

//云服务器 url
axios.defaults.baseURL = 'http://82.157.165.72/api'
//本地MOCK url
//axios.defaults.baseURL = 'http://127.8.0.1/m1/2749792-0-default/api'
=======
import default_url from './assets/default_profile.png'
>>>>>>> origin/combine1-tq
const app = createApp(App)
const is_login = true
var cur_user = {
    user_id: 0,
    username: 'visitor',
    photo_url: default_url
}
//云服务器ur1
axios.defaults.baseURL = 'http://82.157.165.72/api'
//本地MOCK ur1
//axios.defaults.baseURL ='http://127.0.0.1/m1/2749792-0-default/api'
app.provide('is_login', is_login)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cur_user = cur_user
app.use(router)
app.use(ElementPlus)
app.mount("#app")
