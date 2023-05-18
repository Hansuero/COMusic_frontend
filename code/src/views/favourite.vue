<!--
	收藏夹页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';

export default {
	name: 'favourite',
	/*
		md，我要开始骂人了，那个sb把这个data设置成了一个函数的
	*/
	data() {
		return {
			username: 'Keine',
			num_favourite: 10,
			favourite_list: [
				{
					playlist_id: '00',
					title: '我喜欢'
				},{
					playlist_id: '01',
					title: 'Playlist A'
				},{
					playlist_id: '02',
					title: 'Playlist B'
				},{
					playlist_id: '03',
					title: 'Playlist C'
				},{
					playlist_id: '04',
					title: 'Playlist D'
				},{
					playlist_id: '05',
					title: 'Playlist E'
				},{
					playlist_id: '06',
					title: 'Playlist F'
				},{
					playlist_id: '07',
					title: 'Playlist G'
				},{
					playlist_id: '08',
					title: 'Playlist H'
				},{
					playlist_id: '09',
					title: 'Playlist I'
				},
			],
			num_song: 10,
			song_list: [
				{
					song_id: '00',
					title: 'Song A',
					artist: 'AAA'
				},{
					song_id: '01',
					title: 'Song B',
					artist: 'BBB'
				},{
					song_id: '02',
					title: 'Song C',
					artist: 'CCC'
				},{
					song_id: '03',
					title: 'Song D',
					artist: 'DDD'
				},{
					song_id: '04',
					title: 'Song E',
					artist: 'EEE'
				},{
					song_id: '05',
					title: 'Song F',
					artist: 'FFF'
				},{
					song_id: '06',
					title: 'Song G',
					artist: 'GGG'
				},{
					song_id: '07',
					title: 'Song H',
					artist: 'HHH'
				},{
					song_id: '08',
					title: 'Song I',
					artist: 'III'
				},{
					song_id: '09',
					title: 'Song J',
					artist: 'JJJ'
				},
			]
		}
	},
	components: {
		NavigationBar,
	},
	methods: {
		//选择要查看的子收藏夹
		select_favo(playlist_id){
			console.log(playlist_id)
			/*
				在这里提供选中的子收藏夹的id，并交给后端，后端给前端提供这个子收藏夹里面的歌曲列表
			*/
		},
		//跳转到点击的歌曲的歌曲详情页面，对应页面写好之后取消下面的注释即可
		to_favourite(favo_id){
			console.log(favo_id)
			//this.$router.push('./favourite')
		},
		to_song(song_id){
			console.log(song_id)
			//this.$router.push('./song')
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
	input_introduction: '',
})
</script>

<template>
	<!--引入导航栏组件（包含左侧）-->
	<NavigationBar></NavigationBar>
	<!--存放主体内容的div-->
	<div class="outer_box">
		<div style="display: flex; align-items: center; width: 100%; height: 20%;">
			<img src="../assets/profile.png" class="left_profile" style="margin-left: 60px;"/>
			<div class="rectangle_container" style="width: 20%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
		</div>
		<div style="display: flex; width: 100%; height: 80%;">
			<div style="display: flex; flex-wrap: wrap; width: 30%;">
				<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 18%;">
					<el-button style="width: 60%; border-radius: 20px; border-bottom: 2px solid grey;" color="#AFEEEE">
						<p class="theme_font" style="color: black;">创建新收藏夹</p>
					</el-button>
				</div>
				<div style="display: flex; align-items: center; height: 80%; width: 100%;">
					<el-scrollbar style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%" max-height="100%">
						<div v-for="(favo,index) in favourite_list" style="width: 100%; display: flex; justify-content: center; align-items: center;">
							<el-button :key="favo.playlist_id" color="#AFEEEE" class="favo_list_button" @click="select_favo(favo.playlist_id)">
								<p class="theme_font" style="color: black;">{{ favo.title }}</p>
							</el-button>
						</div>
					</el-scrollbar>
				</div>	
			</div>
			<div style="display: flex; width: 65%; margin-left: 50px;">
				<div style="display: flex; align-items: center; height: 100%; width: 100%;">
					<el-scrollbar style="display: flex; width: 100%" max-height="100%">
						<div v-for="(song,index) in song_list" class="box_song_list">
							<div style="width: 80%; margin-left: 50px;">
								<p class="theme_font" style="color: black;" @click="to_song(song.song_id)">{{ song.title }}</p>
							</div>
							<div style="margin-left: 400px;">
								<p class="theme_font" style="color: black;">{{ song.artist }}</p>
							</div>
						</div>
					</el-scrollbar>
				</div>	
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer_box {
	justify-content: center;
	position: absolute; 
	display: flex; 
	flex-wrap: wrap; 
	left: 185px; 
	top: 20vh;
	width: 80%;
	height: 80vh;
}
.left_profile{
	height: 90px;
	width: 90px;
	border-radius: 50%;
}
.theme_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.rectangle_container {
	border-radius: 30px;
	height: 40px;
	display: flex;
	background-color: #7eec52;
	justify-content: center;
	align-items: center;
}
.favo_list_button{
	border-bottom: 2.5px solid grey;
	height: 40px;
	width: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 15px;
}

.box_song_list{
	border-bottom: 2px solid grey;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #F0FFF0;
	margin-top: 6px;
	border-radius: 20px;
	padding-right: 50px;
}
</style>