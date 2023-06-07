import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import axios from 'axios'
import default_url from './assets/default_profile.png'
import { reactive, toRefs } from 'vue';

const app = createApp(App)
var is_login = false
var cur_user = {
    user_id: 0,
    username: 'visitor',
    photo_url: default_url
}
//云服务器ur1
axios.defaults.baseURL = 'http://82.157.165.72/api'
//本地MOCK ur1
//axios.defaults.baseURL ='http://127.0.0.1:4523/m1/2749792-0-default/api'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cur_user = cur_user
app.config.globalProperties.$is_login = is_login

axios.get('/user/get_user_info')
.then(function(response){
    if(response.status == 200){
        console.log(response)
        const re_data = response.data
        //已经登录的用户
        if(re_data.result == 0){
            app.config.globalProperties.$is_login = true
            var t_cur_user = {
                user_id: re_data.user_data.user_id,
                username: re_data.user_data.username,
                photo_url: re_data.user_data.photo_url
            }
            app.config.globalProperties.$cur_user = t_cur_user
        }
        else if(re_data.result == 2){
            console.log("未登录的用户")
        }
        else{
            alert(re_data.message)
        }
    }
    else{
        alert("error! response status is not 200!")
    }
})

app.use(router)
app.use(ElementPlus)
app.mount("#app")
