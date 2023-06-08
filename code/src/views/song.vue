<template>
  <nav>
    <NavNoLeft/>
  </nav>
  <div class="back">
    <el-button type="text" id="backButton" @click="goBack">返回</el-button>
  </div>
  <div class="info">
    <p id="songName">{{songInfo.songName}}</p>
    <p id="singer">{{songInfo.singer}}</p>
  </div>
  <div class="body">
    <img id="img" alt="img" :src="songInfo.song_cover">
    <div id="lyric">
      <textarea :disabled="true" :placeholder="lyric.content" id="content" v-model="lyric.content" style="resize: none" cols="53" rows="80"></textarea>
    </div>
  </div>
  <div class="play">
    <!--<div id="block">
      <el-slider :max="100" :min="0" @change="valToTime(time)" v-model="time" :format-tooltip="valToTime(time)"></el-slider>
    </div>
    <div id="control">
      <el-icon :size="35" id="minus"><minus /></el-icon>
      <el-icon :size="45" id="pause" v-if="this.$data.iplay" @click="myPause"><video-pause /></el-icon>
      <el-icon :size="45" id="continue" v-else @click="myPlay"><video-play /></el-icon>
      <el-icon :size="35" id="plus"><plus /></el-icon>
    </div>-->
    <audio type="audio/mpeg" style="float: left;position: relative;top: 12px;left: 15%;" ref="audio" @play="button_continue" @pause="button_pause" controls>
      <source :src='songInfo.song_url'>
    </audio>
    <div id="buttons">
      <el-button @click="post_complain" color="#7eec52" id="complain"><strong><el-icon size=23px id="icon4"><warning /></el-icon>{{ buttons.complain }}</strong></el-button>
      <el-button @click="collect" color="#7eec52" id="collect"><strong><el-icon size=23px id="icon3"><star /></el-icon>{{ buttons.collect }}</strong></el-button>
      <el-button @click="goToComment" color="#7eec52" id="comment"><strong><el-icon size=23px id="icon2"><chat-line-square /></el-icon>{{ buttons.comment }}</strong></el-button>
      <el-button v-if="!judge.liked" @click="like" color="#7eec52" id="like"><strong><el-icon size=23px id="icon1"><lollipop /></el-icon>{{ buttons.like }}</strong></el-button>
      <el-button v-else @click="like" color="#7eec52" id="like"><strong style="color: lightcoral"><el-icon size=23px id="icon1"><lollipop /></el-icon>{{ buttons.like }}</strong></el-button>
    </div>
    <el-drawer title="请选择收藏夹" v-model="forDrawer.drawer" :direction="forDrawer.dir" :before-close="handleClose" destroy-on-close>
      <div class="hide">
        <ul type="none" id="favos">
          <li v-for="(item, index) in favos.title" ref="favoLi" :key="index" :value="item" @click="clickFavo(index, nums.f_num[index])"> {{ item }} </li>
        </ul>
      </div>
      <div>
        <el-button @click="close" type="text" style="position: relative;left: 48.5%;font-size: larger">确认</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import store from '@/store'
import { reactive, onMounted, ref} from 'vue'
import axios from 'axios'
import { ElDrawer } from 'element-plus'
import { Minus } from '@element-plus/icons'
import { Plus } from '@element-plus/icons'
import { VideoPause } from '@element-plus/icons'
import {VideoPlay } from '@element-plus/icons'
import { Star } from '@element-plus/icons'
import { Warning } from '@element-plus/icons'
import { ChatLineSquare } from '@element-plus/icons'
import { Lollipop } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'


export default {
  name: 'song',
  components: {
    NavNoLeft,
    Minus,
    VideoPause,
    VideoPlay,
    Plus,
    Star,
    Warning,
    ChatLineSquare,
    Lollipop,
    ElDrawer
  },
  data() {
    return {
    }
  },
  methods: {
  },
  setup () {
    const forDrawer = reactive({
      drawer: false,
      dir: 'btt'
    })
    function handleClose () {
      ElMessageBox.confirm("取消收藏?", '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(()=>{
        forDrawer.drawer = false
      })
        .catch(()=>{
          forDrawer.drawer = true
        })
    }
    const songInfo = reactive({
      song_url: '',
      song_id: useRoute().params.id,
      songName: '',
      singer: '',
      song_cover: ''
    })

    const useInfo = reactive({
      uid: 0
    })
    function close () {
      if (favo_id.fid !== -1) {
        forDrawer.drawer = false
        const form_data = new FormData()
        form_data.append('song_id', songInfo.song_id)
        form_data.append('playlist_id', favo_id.fid)
        axios.post('/music/add_song_to_favo', form_data,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          function (response) {
            if (response.status === 200) {
              if (response.data.result === 0){
                ElMessage.success({
                  type: 'success',
                  message: '收藏成功'
                })
              }
              else {
                alert(response.data.message)
              }
            }
          }
        )
      } else {
        ElMessageBox.alert("请选择收藏夹", "注意", {
          confirmButtonText: '确认'
        })
      }
    }
    const favo_id = reactive({
      fid: -1
    })
    const lyric = reactive({
      content: ''
    })
    const favos = reactive({
      id: [],
      title: []
    })
    const nums = reactive({
      f_num: []
    })
    const favoLi = ref([])
    const audio = ref(null)
    onMounted(()=>{
      axios.get('/music/get_song', {
        params: {song_id: songInfo.song_id}
      }).then(
        function (response) {
          if (response.status === 200) {
            songInfo.song_url = response.data.song_url
            audio.value.src = songInfo.song_url
            songInfo.songName = response.data.song_name
            songInfo.singer = response.data.singer
            lyric.content = response.data.lyric
            songInfo.song_cover = response.data.song_cover_url
            judge.liked = response.data.is_like
          }
        }
      )
      axios.get('/music/get_favo_list').then(
        function (response) {
          if (response.status === 200) {
            favos.id = []
            favos.title = []
            for (var i = 1; i < response.data.favo_list.length; i++) {
              favos.id.push(response.data.favo_list[i].favo_id)
              favos.title.push(response.data.favo_list[i].favo_title)
              nums.f_num[i-1] = 1
            }
          }
        }
      )
      axios.get('/user/get_user_info').then(
        function (response) {
          if (response.status === 200) {
            if (response.data.result === 0){
              useInfo.uid = response.data.user_data.user_id
            } else {
              alert(response.data.message)
            }
          }
        }
      )
      favoLi.value.forEach(item=>{
        item.style.background = "#00bfff"
      })
    })
    const isPlay = reactive({
      judge: store.state.play
    })
    const buttons = reactive({
      like: '我喜欢',
      comment: '评论',
      collect: '收藏',
      complain: '投诉'
    })
    function goBack () {
      router.back()
    }
    const judge = reactive({
      liked: false
    })
    function collect () {
      if (useInfo.uid == 0){
        ElMessageBox.confirm("请先登录", "提示", {
          confirmButtonText: '去登录',
          cancelButtonText: '就不登'
        }).then(()=>{
          router.push('/login')
        })
          .catch(()=>{
            ElMessage.info({
              type: 'info',
              message: '没有权限'
            })
          })
      } else {
        forDrawer.drawer = true
      }
    }
    function like () {
      if (useInfo.uid == 0) {
        ElMessageBox.confirm("请先登录", "提示", {
          confirmButtonText: '去登录',
          cancelButtonText: '就不登'
        }).then(()=>{
          router.push('/login')
        })
          .catch(()=>{
            ElMessage.info({
              type: 'info',
              message: '没有权限'
            })
          })
      } else {
        if (!judge.liked) {
          const form_data = new FormData()
          form_data.append('song_id', songInfo.song_id)
          axios.post('/music/add_i_like', form_data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            function (response) {
              if (response.status === 200) {
                if (response.data.result === 0){
                  judge.liked = true
                } else {
                  alert(response.data.message)
                }
              }
            }
          )
        } else {
          axios.delete('/music/cancel_i_like', {
            params: {song_id: songInfo.song_id}
          }).then(
            function (response) {
              if (response.status === 200) {
                if (response.data.result === 0){
                  judge.liked = false
                } else {
                  alert(response.data.message)
                }
              }
            }
          )
        }
      }
    }
    function clickFavo (index, num) {
      if (num === 1) {
        favoLi.value.forEach(item=>{
          if (favoLi.value.indexOf(item) === index) {
            item.style.background = "#eeec22"
            favo_id.fid = favos.id[index]
            nums.f_num[index] = 2
          } else {
            item.style.background = "#00bfff"
            nums.f_num[favoLi.value.indexOf(item)] = 1
          }
        })
      }
      else if (num === 2) {
        favoLi.value.forEach(item=>{
          if (favoLi.value.indexOf(item) === index) {
            item.style.background = "#00bfff"
            favo_id.fid = -1
            nums.f_num[index] = 1
          }
        })
      }
    }
    function goToComment () {
      router.push('/comment/' + songInfo.song_id)
    }
    /*function valToTime (val) {
      return val
    }*/
    function button_pause () {
    }
    function button_continue () {
      if (useInfo.uid != 0) {
        var form_data = new FormData()
        form_data.append('song_id', songInfo.song_id)
        axios.post('/music/add_to_recent', form_data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }
    function post_complain () {
      if (useInfo.uid == 0) {
        ElMessageBox.confirm("还没登录就投诉？没道理的", "提示", {
          confirmButtonText: '去登录',
          cancelButtonText: '就不登'
        }).then(()=>{
          router.push('/login')
        })
          .catch(()=>{
            ElMessage.info({
              type: 'info',
              message: '投诉失败'
            })
          })
      } else {
        ElMessageBox.prompt("投诉理由为：", '投诉', {
          confirmButtonText: '狠心投诉',
          cancelButtonText: '手下留情',
        }).then(({ value }) => {
          if (value === '' || value === null) {
            ElMessage.info({
              type: 'info',
              message: '请输入投诉理由'
            })
          } else {
            const form_data = new FormData()
            form_data.append('complaint', value)
            form_data.append('song_id', songInfo.song_id)
            axios.post('/super_admin/complain_song', form_data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(
              function (response) {
                if (response.status === 200) {
                  ElMessage.success({
                    type: 'success',
                    message: '投诉成功'
                  })
                }
              }
            )
          }
        })
          .catch(()=>{
            ElMessage.info({
              type: 'info',
              message: '取消投诉'
            })
          })
      }
    }
    return {
      audio,
      forDrawer,
      handleClose,
      close,
      goBack,
      favos,
      nums,
      favoLi,
      judge,
      collect,
      like,
      clickFavo,
      goToComment,
      songInfo,
      //valToTime,
      isPlay,
      button_pause,
      button_continue,
      buttons,
      lyric,
      post_complain
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
nav {
  margin: 0;
  padding: 0;
  background-attachment: fixed;
}
nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.back{
  height: 2%;
}
.back #backButton{
  font-size: 18px;
  text-decoration: underline;
  color: black;
  position: relative;
  left: 2%;
}
.info{
  height: 60px;
  text-align: center;
  font-family: 'Microsoft YaHei', sans-serif;
}
.info #songName{
  line-height: 25px;
  font-size: 25px;
  margin-bottom: 5px;
}
.info #singer{
  line-height: 16px;
  font-size: 16px;
}
.body{
  height: 450px;
  font-family: 'Microsoft YaHei', sans-serif;
}
.body #img{
  height: 99.5%;
  width: 31.2%;
  border: 1px solid #7eec52;
  position: relative;
  left: 15%;
  float: left;
}
.body #lyric{
  height: 100%;
  width: 31.25%;
  position: relative;
  right: 15%;
  float: right;
  overflow-y: auto;
}
.body #lyric #content{
  font-size: 16px;
  border: none;
  color: #2c3e50;
  text-align: center;
  line-height: 35px;
  overflow: hidden;
}
.play{
  height: 60px;;
  padding: 20px 10px 20px;
}
.play #block{
  width: 31.2%;
  position: relative;
  top: 25%;
  left: 10%;
  float: left;
}
.play #control{
  width: 13.9%;
  height: 100%;
  position: relative;
  left: 10%;
  text-align: left;
  float: left;
}
.play #control audio{
  width: 100%;
  height: 100%;
}
.play #control #minus{
  position: relative;
  left: 12%;
  top: 5%;
}
.play #control #pause{
  position: relative;
  left: 18%;
  top: 12%;
}
.play #control #continue{
  position: relative;
  left: 18%;
  top: 12%;
}
.play #control #plus{
  position: relative;
  left: 24%;
  top: 5%
}
.play #buttons{
  width: 46%;
  height: 100%;
  position: relative;
  left: 27%;
  float: left;
}
.play #buttons #like{
  margin: 0;
  float: right;
  position: relative;
  right: 34.8%;
  top: 21%;
  width: 15.4%;
  height: 58.3%;
  line-height: 35px;
  color: white;
  font-size: 18px;
}
.play #buttons #icon1{
  position: relative;
  top: 5px;
}
.play #buttons #comment{
  margin: 0;
  float: right;
  position: relative;
  right: 27.8%;
  top: 21%;
  width: 15.4%;
  height: 58.3%;
  line-height: 35px;
  color: white;
  font-size: 18px;
}
.play #buttons #icon2{
  position: relative;
  top: 5px;
}
.play #buttons #collect{
  margin: 0;
  float: right;
  position: relative;
  right: 20.1%;
  top: 21%;
  width: 15.4%;
  height: 58.3%;
  line-height: 35px;
  color: white;
  font-size: 18px;
}
.play #buttons #icon3{
  position: relative;
  top: 5px;
}
.play #buttons #complain{
  margin: 0;
  float: right;
  position: relative;
  right: 12.3%;
  top: 21%;
  width: 15.4%;
  height: 58.3%;
  line-height: 35px;
  color: white;
  font-size: 18px;
}
.play #buttons #icon4{
  position: relative;
  top: 5px;
}
.hide{
  overflow: auto;
}
.hide #favos li{
  position: relative;
  left: 5%;
  width: 90%;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: white;
  background: #00bfff;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
