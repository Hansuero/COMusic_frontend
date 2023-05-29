<template>
	<nav>
		<NavNoLeft/>
	</nav>
	<SearchBox :delta="1"></SearchBox>
	<div class="songList">
		<div class="divList">
			<span style="text-decoration: underline;font-size: 20px">推荐歌单</span>
			<span class="div" v-for="(item, index) in songList_div.tag_name" :key="index">{{ item }}</span>
		</div>
		<div class="covers">
			<div class="list1" v-for="(item, index) in songList_cover.covers" :key="index" @click="goToList">{{ item }}</div>
		</div>
	</div>
	<div class="song">
		<div class="divList">
			<span style="text-decoration: underline;font-size: 20px">推荐歌曲</span>
			<span class="div" v-for="(item, index) in songList_div.tag_name" :key="index" @click="get(index)">{{ item }}</span>
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
import SearchBox from '@/components/SearchBox.vue'

export default {
	name: 'index',
	components: {
		NavNoLeft,
		SearchBox
	},
	setup () {
		const songList_div = reactive({
		 tag_name: ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
				' | 乡村 |', ' | 古典 |', ' | 轻音乐 |', ' | 金属 |', ' | 古风 |']
		})
		const songList_cover = reactive({
			covers: ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
				' | 乡村 |', ' | 古典 |', ' | 轻音乐 |']
		})
		const song_cover = reactive({
			covers: ['| 流行 |', ' | 摇滚 |', ' | 民谣 |', ' | 电子 |', ' | 舞曲 |', ' | 说唱 |', ' | 爵士 |',
				' | 乡村 |', ' | 古典 |', ' | 轻音乐 |']
		})
		function goToList () {
			router.push('./songList')
		}
		function goToSong () {
			router.push('./song')
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
	left: 25%;
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
	left: 23%;
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
