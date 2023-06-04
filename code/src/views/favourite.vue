<!--
	收藏夹页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';
import { ElMessageBox, ElMessage } from "element-plus";


export default {
	name: 'favourite',
	/*
		md，我要开始骂人了，那个sb把这个data设置成了一个函数的
	*/
	data() {
		const here = this
		return {
			username: this.$cur_user.username,
			photo_url: this.$cur_user.photo_url,
			user_id: this.$cur_user.user_id,
			num_favourite: 0,
			favourite_list: [],
			cur_favo_id: 0,
			cur_favo_title: '',
			num_song: 0,
			song_list: []
		}
	},
	created() {
		const here = this
		here.$axios
		.get('http://127.0.0.1:4523/m1/2749792-0-default/api/music/get_favo_list')
		.then(function(response_1){
			if(response_1.status == 200){
				console.log('get favourite list success')
				const re_data_1 = response_1.data
				var favo_list = re_data_1.favo_list
				here.$data.num_favourite = favo_list.length
				favo_list.forEach(function(element){
					var playlist_id = element.favo_id
					var title = element.favo_title
					here.$data.favourite_list.push({
						playlist_id: playlist_id,
						title: title
					})
				})
				console.log(here.$data.favourite_list[0])
				here.$data.cur_favo_id = here.$data.favourite_list[0].playlist_id
				here.$data.cur_favo_title = here.$data.favourite_list[0].title
				const form_data_1 = new FormData()
				form_data_1.append('favo_id', here.$data.cur_favo_id)
				here.$axios
				.get('http://127.0.0.1:4523/m1/2749792-0-default/api/music/get_songs_in_favo', form_data_1, {
					headers: {
    					'Content-Type': 'multipart/form-data'
	  				}
				})
				.then(function(response_2){
					if(response_2.status == 200){
						const re_data_2 = response_2.data
						const song_list = re_data_2.song_list
						here.$data.num_song = song_list.length
						song_list.forEach(function(element){
							var song_id = element.song_id
							var title = element.song_title
							var artist = element.song_artist
							here.$data.song_list.push({
								song_id: song_id,
								title: title,
								artist: artist
							})
						})
					}
					else{
						const dialog = new ElMessageBox({
							title: "糟糕，出错啦",
							message: response_2.message
						})
					}
				})
			}
			else{
				const dialog = new ElMessageBox({
					title: "糟糕，出错啦",
					message: response_1.message
				})
			}
		})
		
	},
	components: {
		NavigationBar,
		ElMessageBox
	},
	methods: {
		//选择要查看的子收藏夹
		select_favo(playlist_id, title){
			console.log(playlist_id)
			/*
				在这里提供选中的子收藏夹的id，并交给后端，后端给前端提供这个子收藏夹里面的歌曲列表
			*/
			const here = this
			here.$data.cur_favo_id = playlist_id
			here.$data.cur_favo_title = title
			const form_data = new FormData()
			form_data.append('favo_id', playlist_id)
			here.$axios
			.get('http://127.0.0.1:4523/m1/2749792-0-default/api/music/get_songs_in_favo', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					const song_list = re_data.song_list
					here.$data.num_song = song_list.length
					here.$data.song_list = []
					song_list.forEach(function(element){
						var song_id = element.song_id
						var title = element.song_title
						var artist = element.song_artist
						here.$data.song_list.push({
							song_id: song_id,
							title: title,
							artist: artist
						})
					})
				}
				else{
					const dialog = new ElMessageBox({
						title: "糟糕，出错啦",
						message: response.data.message
					})
				}
			})
		},
		//跳转到点击的歌曲的歌曲详情页面
		to_song(song_id){
			console.log(song_id)
			const params = {
				song_id: song_id
			}
			this.$router.push({
				path: './song',
				query: params
			})
		},
		create_new_favo(){
			console.log("create new favourite list")
			const here = this
			var title_new_favo
			this.$prompt('请输入新收藏夹名', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
        	})
			.then(({ value }) => {
          		this.$message({
            		type: 'success',
            		message: '新收藏夹名是: ' + value
          		});
				title_new_favo = value
				const form_data = new FormData()
				form_data.append('favo_title', title_new_favo)
				here.$axios
				.post('http://127.0.0.1:4523/m1/2749792-0-default/api/music/create_new_favo', form_data, {
					headers: {
    					'Content-Type': 'multipart/form-data'
  					}
				})
				.then(function(response){
					if(response.status == 200){
						var favo_id = response.data.favo_id
						var favo_title =response.data.favo_title
						here.$data.favourite_list.push({
							playlist_id: favo_id,
							title: favo_title
						})
						here.$data.num_favourite = here.$data.favourite_list.length
					}
					else{
						const dialog = new ElMessageBox({
							title: "糟糕，出错啦",
							message: response.data.message
						})
					}
				})
        	})
			.catch(() => {
          		this.$message({
            		type: 'info',
            		message: '取消输入'
          		});       
        	});
		},
		share_favo(){
			const here = this
			const favo_id = here.$data.cur_favo_id
			const form_data = new FormData()
			form_data.append('playlist_id', favo_id)
			here.$axios
			.post('http://127.0.0.1:4523/m1/2749792-0-default/api/music/set_shared', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				console.log(response)
				if(response.status == 200){
					var alert_message = '分享歌单《'
					alert_message += here.$data.cur_favo_title
					alert_message += '》成功'
					ElMessageBox.alert(alert_message, '分享', {
    				// if you want to disable its autofocus
    				// autofocus: false,
    					confirmButtonText: 'OK',
    					callback: (action) => {
      						ElMessage({
        						type: 'info',
        						message: `action: ${action}`,
      						})
    					},
  					})
				}
			})
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
})
</script>

<template>
	<!--引入导航栏组件（包含左侧）-->
	<NavigationBar></NavigationBar>
	<!--存放主体内容的div-->
	<div class="outer_box">
		<div style="display: flex; align-items: center; width: 100%; height: 20%; padding-right: 0px;">
			<img :src="photo_url" class="left_profile" style="margin-left: 60px;"/>
			<div class="rectangle_container" style="width: 20%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
			<div style="margin-left: 520px;">
				<el-button style="width: 120%; border-radius: 20px; border-bottom: 2px solid grey;" color="#40E0D0" @click="share_favo">
					<p class="theme_font" style="color: black;">分享当前收藏夹</p>
				</el-button>
			</div>
		</div>
		<div style="display: flex; width: 100%; height: 80%;">
			<div style="display: flex; flex-wrap: wrap; width: 30%;">
				<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 18%;">
					<el-button style="width: 60%; border-radius: 20px; border-bottom: 2px solid grey;" color="#AFEEEE" @click="create_new_favo">
						<p class="theme_font" style="color: black;">创建新收藏夹</p>
					</el-button>
				</div>
				<div style="display: flex; align-items: center; height: 80%; width: 100%;">
					<el-scrollbar style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%" max-height="100%">
						<div v-for="(favo,index) in favourite_list" style="width: 100%; display: flex; justify-content: center; align-items: center;">
							<el-button :key="favo.playlist_id" color="#AFEEEE" class="favo_list_button" @click="select_favo(favo.playlist_id, favo.title)">
								<p class="theme_font" style="color: black;">{{ favo.title }}</p>
							</el-button>
						</div>
					</el-scrollbar>
				</div>	
			</div>
			<div style="display: flex; width: 65%; margin-left: 50px;">
				<div style="display: flex; align-items: center; height: 100%; width: 650px;">
					<el-scrollbar style="display: flex; width: 650px" max-height="100%">
						<div v-for="(song,index) in song_list" class="box_song_list">
							<p class="theme_font" style="width: 200px; margin-left: 50px; color: black;" @click="to_song(song.song_id)">{{ song.title }}</p>
							<p class="theme_font" style="color: black;">{{ song.artist }}</p>
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
	width: 600px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background-color: #F0FFF0;
	margin-top: 6px;
	border-radius: 20px;
	padding-right: 50px;
}
</style>