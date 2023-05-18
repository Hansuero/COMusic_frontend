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
    <img id="img" alt="img" src="../assets/logo.png">
    <div id="lyric"></div>
  </div>
  <div class="play"></div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import router from '@/router'
import { reactive } from 'vue'
export default {
  name: 'SongView',
  components: {
    NavNoLeft
  },
  setup () {
    const songInfo = reactive({
      songName: '说好的幸福呢',
      singer: 'Jay'
    })
    function goBack() {
      router.back()
    }
    return {
      goBack,
      songInfo
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
  left: -48%;
}
.info{
  height: 60px;
  background: #42b983;
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
  background: aqua;
  font-family: 'Microsoft YaHei', sans-serif;
}
.body #img{
  height: 448px;
  width: 448px;
  border: 1px solid #7eec52;
  position: relative;
  left: 15%;
  float: left;
}
.body #lyric{
  height: 450px;
  width: 450px;
  position: relative;
  right: 15%;
  float: right;
  overflow-y: auto;
  background: #7eec52;
}
.play{
  height: 100px;
  background: gray;
}
</style>
