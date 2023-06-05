<template>
  <nav>
    <NavNoLeft/>
  </nav>
  <div class="back">
    <el-button type="text" id="backButton" @click="goBack">返回</el-button>
  </div>
  <div class="info">
    <div id="ListImg">
      <img alt="img" src="../assets/logo.png">
    </div>
    <div id="ListInf">
      <p>歌单名称: {{intro.listName}}</p><br>
      <p>歌单作者：{{intro.authorName}}</p><br>
      <p>歌单标签：{{intro.tag}}</p><br>
      <p>歌单简介：{{intro.introduction}}</p>
    </div>
  </div>
  <div class="list">
    <div id="top">
      <span>{{ title.name }}</span>
      <el-button color="#7eec52" id="complain"><strong><el-icon size=20px id="icon2"><warning /></el-icon>{{ complain }}</strong></el-button>
      <el-button color="#7eec52" id="collect" @click="collectSong" v-if="judge.isCollect===1 || judge.isCollect===2"><strong><el-icon size=20px id="icon1"><star /></el-icon>{{ collect.name }}</strong></el-button>
      <el-button color="#00bfff" id="ok" @click="collectSong" v-else><strong><el-icon size=20px id="icon1"><star /></el-icon>{{ collect.name }}</strong></el-button>
    </div>
    <div id="body">
      <ul type="none" id="songs" v-if="judge.isSong">
        <li v-for="(item, index) in songs.title" ref="songLi" :key="index" :value="item" @click="clickSong(index, nums.num[index])">{{ item }}</li>
      </ul>
      <ul type="none" id="songs" v-else>
        <li v-for="(item, index) in favos.title" ref="favoLi" :key="index" :value="item" @click="clickFavo(index, nums.f_num[index])"> {{ item }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import { reactive, ref, onMounted} from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import store from '@/store'
import axios from 'axios'
import { Star } from '@element-plus/icons'
import { Warning } from '@element-plus/icons'


export default {
  name: 'songlist',
  components: { NavNoLeft, Star, Warning },
  setup () {
    const sid = useRoute().params.id
    const favo_id = reactive({
      fid: -1
    })
    const intro = reactive({
      listName: '',
      authorName: '',
      tag: '',
      introduction: ''
    })
    const title = reactive({
      name: '歌曲'
    })
    const nums = reactive({
      num: [],
      f_num: []
    })
    let collect = reactive({
      name: '收藏'
    })
    let complain = reactive('投诉')
    const judge = reactive({
      isCollect: store.state.isCollect,
      isSong: store.state.isSong
    })
    const songs = reactive({
      id: [],
      title: []
    })
    const favos = reactive({
      id: [],
      title: []
    })
    const isCollected = reactive({
      song_id: []
    })
    const songLi = ref([])
    const favoLi = ref([])
    onMounted(()=>{
      axios.get('/music/get_playlist', {
        params: {playlist_id: sid}
      }).then(
        function (response) {
          if (response.status === 200){
            intro.listName = response.data.playlist_name
            intro.authorName = response.data.playlist_creator
            intro.tag = response.data.playlist_tag
            intro.introduction = response.data.playlist_intro
            songs.id = []
            songs.title = []
            for (var i = 0; i < response.data.playlist_songs.length; i++) {
              songs.id.push(response.data.playlist_songs[i].song_id)
              songs.title.push(response.data.playlist_songs[i].song_name)
              nums.num[i] = 1
            }
          }
        }
      )
      axios.get('/music/get_favo_list').then(
        function (response) {
          if (response.status === 200) {
            favos.id = []
            favos.title = []
            for (var i = 0; i < response.data.favo_list.length; i++) {
              favos.id.push(response.data.favo_list[i].favo_id)
              favos.title.push(response.data.favo_list[i].favo_title)
              nums.f_num[i] = 1
            }
          }
        }
      )
      songLi.value.forEach(item=>{
        item.style.background = "#7eec52"
      })
      favoLi.value.forEach(item=>{
        item.style.background = "#7eec52"
      })
    })
    function goBack () {
      router.back()
    }
    function clickSong (index, num) {
      if (judge.isCollect === 1){
        router.push('./song/'+songs.id[index])
      } else if (judge.isCollect === 3 && num === 1){
        songLi.value.forEach(item=>{
          if (songLi.value.indexOf(item) === index){
            item.style.background = "#00bfff"
            nums.num[index] = 2
            isCollected.song_id.push(songs.id[index])
          }
        })
      } else if (judge.isCollect === 3 && num === 2){
        songLi.value.forEach(item=>{
          if (songLi.value.indexOf(item) === index){
            item.style.background = "#7eec52"
            nums.num[index] = 1
            isCollected.song_id.splice(isCollected.song_id.indexOf(songs.id[index]), 1)
          }
        })
      }
    }

    function clickFavo (index, num) {
      if (judge.isCollect === 2) {
        if (num === 1) {
          favoLi.value.forEach(item=>{
            if (favoLi.value.indexOf(item) === index) {
              item.style.background = "#eeec22"
              favo_id.fid = favos.id[index]
              nums.f_num[index] = 2
            } else {
              item.style.background = "#7eec22"
              nums.f_num[favoLi.value.indexOf(item)] = 1
            }
          })
        }
        else if (num === 2) {
          favoLi.value.forEach(item=>{
            if (favoLi.value.indexOf(item) === index) {
              item.style.background = "#7eec22"
              favo_id.fid = -1
              nums.f_num[index] = 1
            }
          })
        }
      }
    }
    function collectSong () {
      if (judge.isCollect === 1) {
        collect.name = '确定'
        title.name = '请选择收藏夹'
        judge.isSong = false
        judge.isCollect = 2
      } else if (judge.isCollect === 2) {
        if (favo_id.fid !== -1) {
          judge.isCollect = 3
          title.name = '歌曲'
          judge.isSong = true
        } else {
          alert('未选择收藏夹')
          judge.isCollect = 1
          title.name = '歌曲'
          judge.isSong = true
        }
      } else if (judge.isCollect === 3) {
        judge.isCollect = 1
        collect.name = '收藏'
        songLi.value.forEach(item=>{
          item.style.background = "#7eec52"
        })
        if (isCollected.song_id.length > 0){
          const form_data = new FormData()
          form_data.append('songs_id', isCollected.song_id)
          form_data.append('playlist_id', favo_id.fid)
          axios.post('/music/add_songs_to_favo', form_data,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            function (response) {
              if (response.status === 200) {
                isCollected.song_id = []
                alert('收藏成功')
              }
            }
          )
        } else {
          alert('未收藏歌曲')
        }
      }
    }
    return {
      intro,
      title,
      goBack,
      collect,
      complain,
      clickSong,
      clickFavo,
      collectSong,
      judge,
      songs,
      favos,
      songLi,
      favoLi,
      nums
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
  width: 100%;
  height: 230px;
}
.info #ListImg{
  width: 228px;
  height: 228px;
  position: relative;
  left: 10.4%;
  float: left;
  border: 1px solid #7eec52;
}
.info #ListImg img{
  width: 228px;
  height: 228px;
}
.info #ListInf{
  padding-top: 20px;
  padding-bottom: 10px;
  width: 700px;
  height: 200px;
  position: relative;
  left: 20.83%;
  float: left;
  font-family:'Microsoft YaHei', sans-serif;
  text-align: left;
  text-justify: auto;
  text-decoration: underline blink;
  line-height: 25px;
  font-size: 20px;
}
.list #top{
  height: 35px;
  position: relative;
  top: 10px;
  text-align: left;
  margin-bottom: 6px;
}
.list #top span{
  position: relative;
  left: 10.4%;
  font-family:'Microsoft YaHei', sans-serif;
  font-size: 25px;
}
.list #top #collect{
  float: right;
  position: relative;
  right: 50px;
  width: 5%;
  height: 35px;
  line-height: 35px;
  color: white;
  font-size: 16px;
}
.list #top #ok{
  float: right;
  position: relative;
  right: 50px;
  width: 5%;
  height: 35px;
  line-height: 35px;
  color: white;
  font-size: 16px;
}
.list #top #icon1{
  position: relative;
  top: 4px;
}
.list #top #complain{
  float: right;
  position: relative;
  right: 20px;
  width: 5%;
  height: 35px;
  line-height: 35px;
  color: white;
  font-size: 16px;
}
.list #top #icon2{
  position: relative;
  top: 4px;
}
.list #body{
  padding: 20px 10px 20px;
  height: 260px;
  position: relative;
  overflow: auto;
}
.list #body #songs{
  height: 260px;
}
.list #body #songs li{
  position: relative;
  left: 10.3%;
  width: 79.2%;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: white;
  background: #7eec52;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
