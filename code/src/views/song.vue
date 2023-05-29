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
		<div id="lyric">
			<textarea id="content" v-model="lyric.content" style="resize: none" cols="53" rows="80"></textarea>
		</div>
	</div>
	<div class="play">
		<div id="block">
			<el-slider :max="100" :min="0" @change="valToTime(time)" v-model="time" :format-tooltip="valToTime(time)"></el-slider>
		</div>
		<div id="control">
			<el-icon :size="35" id="minus"><minus /></el-icon>
			<el-icon :size="45" id="pause" v-if="isPlay.judge" @click="button_pause"><video-pause /></el-icon>
			<el-icon :size="45" id="continue" v-else @click="button_continue"><video-play /></el-icon>
			<el-icon :size="35" id="plus"><plus /></el-icon>
		</div>
		<div id="buttons">
			<el-button color="#7eec52" id="complain"><strong><el-icon size=23px id="icon4"><warning /></el-icon>{{ buttons.complain }}</strong></el-button>
			<el-button color="#7eec52" id="collect"><strong><el-icon size=23px id="icon3"><star /></el-icon>{{ buttons.collect }}</strong></el-button>
			<el-button @click="goToComment" color="#7eec52" id="comment"><strong><el-icon size=23px id="icon2"><chat-line-square /></el-icon>{{ buttons.comment }}</strong></el-button>
			<el-button color="#7eec52" id="like"><strong><el-icon size=23px id="icon1"><lollipop /></el-icon>{{ buttons.like }}</strong></el-button>
		</div>
	</div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import router from '@/router'
import store from '@/store'
import { reactive } from 'vue'
import { Minus } from '@element-plus/icons'
import { Plus } from '@element-plus/icons'
import { VideoPause } from '@element-plus/icons'
import {VideoPlay } from '@element-plus/icons'
import { Star } from '@element-plus/icons'
import { Warning } from '@element-plus/icons'
import { ChatLineSquare } from '@element-plus/icons'
import { Lollipop } from '@element-plus/icons'


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
		Lollipop
	},
	setup () {
		const songInfo = reactive({
			songName: '说好的幸福呢',
			singer: 'Jay'
		})
		const time = reactive({
			timeValue: 0
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
		const lyric = reactive({
			songName: '说好的幸福呢',
			singer: 'Jay',
			content: '你的回话凌乱着\n在这个时刻\n我想起喷泉旁的白鸽\n甜蜜散落了\n情绪莫名的拉扯\n' +
				'我还爱你呢\n而你断断续续唱着歌\n假装没事了\n时间过了走了\n爱情面临选择\n你冷了倦了我哭了\n' +
				'离开时的不快乐\n你用卡片手写着\n有些爱只给到这\n真的痛了\n怎么了你累了说好的\n幸福呢\n' +
				'我懂了不说了\n爱淡了梦远了\n'
		})
		function goBack () {
			router.back()
		}
		function goToComment () {
			router.push('./comment')
		}
		function valToTime (val) {
			return val
		}
		function button_pause () {
			isPlay.judge = false
		}
		function button_continue () {
			isPlay.judge = true
		}
		return {
			goBack,
			goToComment,
			songInfo,
			time,
			valToTime,
			isPlay,
			button_pause,
			button_continue,
			buttons,
			lyric
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
	left: 8.7%;
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
</style>
