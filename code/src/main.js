import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
import default_url from './assets/default_profile.png'

const app = createApp(App)
var is_login = false
var cur_user = {
    user_id: 0,
    username: 'visitor',
    photo_url: default_url
}
//云服务器ur1
//axios.defaults.baseURL = 'http://82.157.165.72/api'
//本地MOCK ur1
axios.defaults.baseURL ='http://127.0.0.1:4523/m1/2749792-0-default/api'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cur_user = cur_user
app.config.globalProperties.$is_login = is_login

/*
window.addEventListener('beforeunload', (event) => {
    console.log(app.config.globalProperties.$cur_user)
    console.log(app.config.globalProperties.$is_login)
    localStorage.setItem('buff_cur_user', app.config.globalProperties.$cur_user)
    localStorage.setItem('buff_is_login', app.config.globalProperties.$is_login)
    console.log('beforeunload event triggered');
    console.log(localStorage.getItem('buff_cur_user'))
    console.log(localStorage.getItem('buff_is_login'))
    event.preventDefault()
    event.returnValue = '';
});
*/

app.use(router)
app.use(ElementPlus)
app.mount("#app")
