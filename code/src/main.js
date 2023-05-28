import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
import default_url from "./assets/profile.png"

const app = createApp(App)
const is_login = true
app.provide('is_login', is_login)
var cur_user = {
  user_id: 0,
  username: 'visitor',
  photo_url: default_url
}
app.config.globalProperties.$cur_user = cur_user
app.config.globalProperties.$axios=axios
app.use(router)
app.use(ElementPlus)
app.mount("#app")
