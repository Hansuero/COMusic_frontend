<template>
  <nav>
    <NavNoLeft/>
  </nav>
  <div class="search">
    <div id="input">
      <el-input v-model="inputData.input" placeholder="搜素歌曲/歌单/用户"/>
    </div>
    <div id="button">
      <el-button type="success" color="#7eec52" id="button1" @click="searchSong">搜索歌曲</el-button>
      <el-button type="success" color="#7eec52" id="button2" @click="searchSongList">搜索歌单</el-button>
      <el-button type="success" color="#7eec52" id="button3" @click="searchUser">搜索用户</el-button>
    </div>
  </div>
  <div class="songList">
    <div class="divList">
      <span style="text-decoration: underline;font-size: 20px">推荐歌单</span>
      <span class="div" v-for="(item, index) in songList_div.tag_name" :key="index">&nbsp;&nbsp;{{ item }}&nbsp;&nbsp;</span>
    </div>
    <div class="covers">
      <div class="list1" v-for="(item, index) in songList_cover.covers" :key="index" @click="goToList">{{ item }}</div>
    </div>
  </div>
  <div class="song">
    <div class="divList">
      <span style="text-decoration: underline;font-size: 20px">推荐歌曲</span>
      <span class="div" v-for="(item, index) in songList_div.tag_name" :key="index" @click="get(index)">&nbsp;&nbsp;{{ item }}&nbsp;&nbsp;</span>
    </div>
    <div class="covers">
      <div class="song1" v-for="(item, index) in songList_cover.covers" :key="index" @click="goToList">{{ item }}</div>
    </div>
  </div>
</template>

<script>

import NavNoLeft from '@/components/NavNoLeft.vue'
import { reactive } from 'vue'
import router from '@/router'
import axios from 'axios'
export default {
  name: 'MainView',
  components: {
    NavNoLeft
  },
  setup () {
    const inputData = reactive({
      input: ''
    })
    const songList_div = reactive({
     tag_name: ['| 流行 |', '| 摇滚 |', '| 民谣 |', '| 电子 |', '| 舞曲 |', '| 说唱 |', '| 爵士 |',
        '| 乡村 |', '| 古典 |', '| 轻音乐 |', '| 金属 |', '| 古风 |']
    })
    const songList_cover = reactive({
      covers: ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
        ' | 乡村 |', ' | 古典 |', ' | 轻音乐 |']
    })
    const song_cover = reactive({
      covers: ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
        ' | 乡村 |', ' | 古典 |', ' | 轻音乐 |']
    })
    function searchSongList () {
      alert('找到了' + inputData.input)
    }
    function searchSong () {
      alert('找到了' + inputData.input)
    }
    function goToList () {
      router.push('./songList')
    }
    function goToSong () {
      router.push('./song')
    }
    function searchUser () {
      alert('找到了' + inputData.input)
    }
    function get(index) {
      let song_tag = ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
        ' | 乡村 |', ' | 古典 |', ' | 轻音乐 |', ' | 金属 |', ' | 古风 |']
      axios.get('http://127.0.0.1:4523/m2/2749792-0-default/84335811', {
        params: song_tag[index]
      }).then(
        response => {
          alert(response.data.data)
        }
      )
    }
    return {
      inputData,
      searchSong,
      searchUser,
      searchSongList,
      goToList,
      goToSong,
      songList_cover,
      song_cover,
      songList_div,
      get
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
.search{
  width: 100%;
  height: 80px;
}
.search #input{
  width: 300px;
  height: 30px;
  position: relative;
  top: 20px;
  left: 450px;
  float: left;
}
.search #button{
  width: 300px;
  height: 30px;
  position: relative;
  top: 20px;
  left: 450px;
  float: left;
}
.search #button #button1{
  position: relative;
  left: 20px;
  color: white;
  font-size: 14px;
  width: 70px;
  font-family:'Microsoft YaHei', sans-serif;
  float: left;
}
.search #button #button2{
  position: relative;
  left: 30px;
  width: 70px;
  color: white;
  font-size: 14px;
  font-family:'Microsoft YaHei', sans-serif;
  float: left;
}
.search #button #button3{
  position: relative;
  left: 40px;
  width: 70px;
  color: white;
  font-size: 14px;
  font-family:'Microsoft YaHei', sans-serif;
  float: left;
}
.songList{
  width: 100%;
  height: 260px;
  position: relative;
}
.divList{
  padding-left: 20px;
  text-align: left;
}
.div{
  position: relative;
  left: 19%;
}
.div:hover{
  color: #00bfff;
}
.covers{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  width: 60%;
  height: 200px;
  position: relative;
  left: 25%;
}
.songList .list1{
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 120px;
  top: 20px;
  background: #7eec52;
  display: inline-block;
}
.song{
  position: relative;
  top: 20px;
  width: 100%;
  height: 260px;
}
.song .song1{
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 120px;
  top: 20px;
  background: #7eec52;
  display: inline-block;
}
</style>
