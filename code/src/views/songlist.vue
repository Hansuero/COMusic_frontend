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
			<span>歌曲</span>
			<el-button color="#7eec52" id="complain"><strong><el-icon size=20px id="icon2"><warning /></el-icon>{{ complain }}</strong></el-button>
			<el-button color="#7eec52" id="collect" @click="collectSong" v-if="judge.isCollect"><strong><el-icon size=20px id="icon1"><star /></el-icon>{{ collect.name }}</strong></el-button>
			<el-button color="#00bfff" id="ok" @click="collectSong" v-else><strong><el-icon size=20px id="icon1"><star /></el-icon>{{ collect.name }}</strong></el-button>
		</div>
		<div id="body">
			<ul type="none" id="songs">
				<li v-for="(item, index) in songs.title" ref="songLi" :key="index" :value="item" @click="clickSong(index, nums.num[index])">{{ item }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import { reactive, ref, onMounted} from 'vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Star } from '@element-plus/icons'
import { Warning } from '@element-plus/icons'


export default {
	name: 'songlist',
	components: { NavNoLeft, Star, Warning },
  props: {
    'songlist_id': Number
  },
	setup (props) {
		const intro = reactive({
			listName: '十二月的肖邦',
			authorName: 'Jay',
			tag: '流行',
			introduction: '哥的幽默你不懂'
		})
		const nums = reactive({
			num: [1, 1, 1, 1, 1, 1]
		})
		let collect = reactive({
			name: '收藏'
		})
		let complain = reactive('投诉')
		const judge = reactive({
			isCollect: store.state.isCollect
		})
		const songs = reactive({
      id: [],
			title: []
		})
    const isCollected = reactive({
      song_id: []
    })
		const songLi = ref([])
		onMounted(()=>{
      axios.get('https://mock.apifox.cn/m1/2749792-0-default/api/music/get_playlist', {
        params: {playlist_id: props.songlist_id}
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
            }
          }
        }
      )
			songLi.value.forEach(item=>{
					item.style.background = "#7eec52"
			})
		})
		function goBack () {
			router.back()
		}
		function clickSong (index, num) {
			if (judge.isCollect){
				router.push('./song')
			} else if (!judge.isCollect && num === 1){
				songLi.value.forEach(item=>{
					if (songLi.value.indexOf(item) == index){
							item.style.background = "#00bfff"
							nums.num[index] = 2
              isCollected.song_id.push(songs.id[index])
						}
				})
			} else if (!judge.isCollect && num === 2){
				songLi.value.forEach(item=>{
					if (songLi.value.indexOf(item) == index){
						item.style.background = "#7eec52"
						nums.num[index] = 1
            isCollected.song_id.splice(isCollected.song_id.indexOf(songs.id[index]), 1)
					}
				})
			}
		}
		function collectSong () {
			if (judge.isCollect) {
				judge.isCollect = false
				collect.name = '确定'
			} else {
				judge.isCollect = true
				collect.name = '收藏'
				songLi.value.forEach(item=>{
					item.style.background = "#7eec52"
				})
        const form_data = new FormData()
        form_data.append('songs_id', isCollected.song_id)
        form_data.append('playlist_id', 0)
        axios.post('https://mock.apifox.cn/m1/2749792-0-default/api/music/add_songs_to_favo', form_data,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          function (response) {
            if (response.status === 200) {
              isCollected.song_id = []
            }
          }
        )
			}
		}
		return {
			intro,
			goBack,
			collect,
			complain,
			clickSong,
			collectSong,
			judge,
			songs,
			songLi,
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
	color: white;
	background: #7eec52;
	border-radius: 10px;
	margin-bottom: 20px;
}
</style>
