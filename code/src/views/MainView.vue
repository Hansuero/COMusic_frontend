<template>
  <nav>
    <NavNoLeft/>
  </nav>
  <div class="search">
    <div id="input">
      <el-input v-model="inputData.input" placeholder="搜素歌曲/歌单/用户"/>
    </div>
    <div id="button">
      <el-button type="success" color="#7eec52" id="button1" @click="searchSong">搜索歌曲/歌单</el-button>
      <el-button type="success" color="#7eec52" id="button2" @click="searchUser">搜索用户</el-button>
    </div>
  </div>
  <div class="songList">
    <p>推荐歌单</p>
    <div id="list1" @click="searchSong"></div>
    <div id="list2" @click="searchSong"></div>
    <div id="list3"></div>
  </div>
  <div class="song">
    <p>推荐歌曲</p>
    <div id="song1"></div>
    <div id="song2"></div>
    <div id="song3"></div>
  </div>
</template>

<script>

import NavNoLeft from '@/components/NavNoLeft.vue'
import { reactive } from 'vue'
import router from '@/router'
export default {
  name: 'MainView',
  components: {
    NavNoLeft
  },
  setup () {
    const inputData = reactive({
      input: ''
    })
    function searchSong () {
      router.push('./songList')
    }
    function searchUser () {
      alert('找到了' + inputData.input)
    }
    return {
      inputData,
      searchSong,
      searchUser
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
  width: 500px;
  height: 30px;
  position: relative;
  top: 20px;
  left: 360px;
  float: left;
}
.search #button{
  width: 300px;
  height: 30px;
  position: relative;
  top: 20px;
  left: 310px;
  float: left;
}
.search #button #button1{
  position: relative;
  left: 20px;
  color: white;
  font-size: 14px;
  width: 100px;
  font-family:'Microsoft YaHei', sans-serif;
}
.search #button #button2{
  position: relative;
  left: 40px;
  width: 70px;
  color: white;
  font-size: 14px;
  font-family:'Microsoft YaHei', sans-serif;
}
.songList{
  width: 100%;
  height: 260px;
  position: relative;
}
.songList p{
  padding-left: 10px;
  text-align: left;
}
.songList #list1{
  width: 250px;
  height: 200px;
  position: relative;
  top: 20px;
  left: 200px;
  background: #7eec52;
  float: left;
}
.songList #list2{
  width: 250px;
  height: 200px;
  position: relative;
  top: 20px;
  left: 400px;
  background: #7eec52;
  float: left;
}
.songList #list3{
  width: 250px;
  height: 200px;
  position: relative;
  top: 20px;
  left: 600px;
  background: #7eec52;
  float: left;
}
.song{
  position: relative;
  top: 20px;
  width: 100%;
  height: 260px;
}
.song p{
  padding-left: 10px;
  text-align: left;
}
.song #song1{
  width: 250px;
  height: 150px;
  position: relative;
  top: 40px;
  left: 200px;
  background: #7eec52;
  border-radius: 20px;
  float: left;
}
.song #song2{
  width: 250px;
  height: 150px;
  position: relative;
  top: 40px;
  left: 400px;
  background: #7eec52;
  border-radius: 20px;
  float: left;
}
.song #song3{
  width: 250px;
  height: 150px;
  position: relative;
  top: 40px;
  left: 600px;
  background: #7eec52;
  border-radius: 20px;
  float: left;
}
</style>
