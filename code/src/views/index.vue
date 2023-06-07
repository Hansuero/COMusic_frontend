<template>
  <nav>
    <NavNoLeft />
  </nav>
  <SearchBox :delta="1"></SearchBox>
  <div class="songList">
    <div class="divList">
      <span style="text-decoration: underline;font-size: 20px">推荐歌单</span>
      <span class="div" v-for="(item, index) in div.tag" :key="index" @click="getRecList(index)">&nbsp;{{ item
      }}&nbsp;</span>
    </div>
    <div class="covers">
      <div class="list1" v-for="(item, index) in songList_cover.url" :key="index" @click="goToList(index)">
        <img alt="img" :src="item">
      </div>
    </div>
  </div>
  <div class="song">
    <div class="divList">
      <span style="text-decoration: underline;font-size: 20px">推荐歌曲</span>
      <span class="div" v-for="(item, index) in div.tag" :key="index" @click="getRecSong(index)">&nbsp;{{ item
      }}&nbsp;</span>
    </div>
    <div class="covers">
      <div class="song1" v-for="(item, index) in song_cover.url" :key="index" @click="goToSong(index)">
        <img alt="img" :src="item">
      </div>
    </div>
  </div>
</template>

<script>

import NavNoLeft from '@/components/NavNoLeft.vue'
import { reactive, onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'
import SearchBox from '@/components/SearchBox.vue'
import { ElMessageBox } from "element-plus";

export default {
  name: 'MainView',
  components: {
    NavNoLeft,
    SearchBox
  },
  setup() {
    const div = reactive({
      tag: ['|流行|', ' |摇滚|', ' |民谣|', ' |电子|', ' |舞曲|', ' |说唱|', ' |爵士|',
        ' |乡村|', ' |古典|', ' |轻音乐|', ' |金属|', ' |古风|'],
      tag_name: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '爵士',
        '乡村', '古典', '轻音乐', '金属', '古风']
    })
    const test = '../../static/logo.png'
    const songList_cover = reactive({
      id: [],
      url: [],
      test_url: [test]
    })
    const song_cover = reactive({
      id: [],
      url: []
    })
    function goToList(index) {
      router.push('/songList/' + songList_cover.id[index])
    }
    function goToSong(index) {
      router.push('/song/' + song_cover.id[index])
    }
    onMounted(() => {
      axios.get('/index/get_recommend_playlist', {
        params: { playlist_tag: div.tag_name[0] }
      }).then(
        function (response) {
          if (response.data.result === 0) {
            songList_cover.id = []
            songList_cover.url = []
            for (var i = 0; i < response.data.playlist_data.length; i++) {
              songList_cover.id.push(response.data.playlist_data[i].playlist_id)
              songList_cover.url.push(response.data.playlist_data[i].playlist_cover_url)
            }
          }
          else {
            ElMessageBox.alert("获取歌单失败了," + response.data.message, '提示', {
              confirmButtonText: '确认',
              confirmButtonClass: 'btnFalses'
            })
          }
        }
      )
      axios.get('/index/get_recommend_song', {
        params: { song_tag: div.tag_name[0] }
      }).then(
        function (response) {
          if (response.data.result === 0) {
            song_cover.id = []
            song_cover.url = []
            for (var i = 0; i < response.data.song_data.length; i++) {
              song_cover.id.push(response.data.song_data[i].song_id)
              song_cover.url.push(response.data.song_data[i].song_cover_url)
            }
          }
          else {
            ElMessageBox.alert("获取歌曲失败了," + response.data.message, '提示', {
              confirmButtonText: '确认',
              confirmButtonClass: 'btnFalses'
            })
          }
        }
      )
    })
    function getRecList(index) {
      axios.get('/index/get_recommend_playlist', {
        params: { playlist_tag: div.tag_name[index] }
      }).then(
        function (response) {
          if (response.data.result === 0) {
            songList_cover.id = []
            songList_cover.url = []
            for (var i = 0; i < response.data.playlist_data.length; i++) {
              songList_cover.id.push(response.data.playlist_data[i].playlist_id)
              songList_cover.url.push(response.data.playlist_data[i].playlist_cover_url)
            }
          }
          else {
            ElMessageBox.alert("获取歌单失败了," + response.data.message, '提示', {
              confirmButtonText: '确认',
              confirmButtonClass: 'btnFalses'
            })
          }
        }
      )
    }
    function getRecSong(index) {
      axios.get('/index/get_recommend_song', {
        params: { song_tag: div.tag_name[index] }
      }).then(
        function (response) {
          if (response.data.result === 0) {
            song_cover.id = []
            song_cover.url = []
            for (var i = 0; i < response.data.song_data.length; i++) {
              song_cover.id.push(response.data.song_data[i].song_id)
              song_cover.url.push(response.data.song_data[i].song_cover_url)
            }
          }
          else{
            ElMessageBox.alert("获取歌曲失败了," + response.data.message, '提示', {
              confirmButtonText: '确认',
              confirmButtonClass: 'btnFalses'
            })
          }
        }
      )
    }
    return {
      goToList,
      goToSong,
      songList_cover,
      song_cover,
      div,
      getRecSong,
      getRecList
    }
  }
}
</script>

<style scoped>
* {
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

.songList {
  width: 100%;
  height: 260px;
  position: relative;
}

.divList {
  padding-left: 20px;
  text-align: left;
}

.div {
  position: relative;
  left: 10%;
}

.div:hover {
  color: #00bfff;
}

.covers {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  width: 60%;
  height: 200px;
  position: relative;
  left: 25%;
}

.songList .list1 {
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 120px;
  top: 20px;
  display: inline-block;
}

.songList .list1 img {
  width: 150px;
  height: 150px;
}

.song {
  position: relative;
  top: 20px;
  width: 100%;
  height: 260px;
}

.song .song1 {
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 120px;
  top: 20px;
  display: inline-block;
}

.song .song1 img {
  width: 150px;
  height: 150px;
}</style>
