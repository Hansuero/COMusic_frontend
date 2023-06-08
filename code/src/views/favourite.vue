<!--
	收藏夹页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive } from "vue";
import { ref } from "vue";
import { treeEmits } from "element-plus/es/components/tree-v2/src/virtual-tree";

const tagList = [
	{ id: 1, name: '流行' },
	{ id: 2, name: '摇滚' },
	{ id: 3, name: '民谣' },
	{ id: 4, name: '电子' },
	{ id: 5, name: '舞曲' },
	{ id: 6, name: '说唱' },
	{ id: 7, name: '爵士' },
	{ id: 8, name: '乡村' },
	{ id: 9, name: '古典' },
	{ id: 10, name: '轻音乐' },
	{ id: 11, name: '金属' },
	{ id: 12, name: '古风' },
];

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
			song_list: [],
			is_share_visible: ref(true),
			share_tips: '',
			share_cover_file: '',
			share_cover_url: '',
			ready_share: false,
			selectedTag: '',
			have_shared: false
		}
	},
	created() {
		const here = this
		here.$axios
		.get('/music/get_favo_list')
		.then(function(response_1){
			if(response_1.status == 200){
				const re_data_1 = response_1.data
				if(re_data_1.result == 0){
					console.log('get favourite list success')
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
					here.$axios
					.get('/music/get_songs_in_favo', {
						params: {
							favo_id: here.$data.cur_favo_id
						}
					})
					.then(function(response_2){
						if(response_2.status == 200){
							const re_data_2 = response_2.data
							if(re_data_2.result == 0){
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
								alert(re_data_2.message)
							}
						}
						else{
							alert("error! response status is not 200!")
						}
					})
				}
				else{
					alert(re_data_1.message)
				}
			}
			else{
				alert("error! response status is not 200!")
			}
		})
		
	},
	components: {
		NavigationBar,
		ElMessageBox
	},
	methods: {
		get_input_data(){
			let t_playlist_tag = this.$data.selectTag
			return{
				playlist_tag: t_playlist_tag
			}
		},
		//选择要查看的子收藏夹
		select_favo(playlist_id, title){
			console.log(playlist_id)
			/*
				在这里提供选中的子收藏夹的id，并交给后端，后端给前端提供这个子收藏夹里面的歌曲列表
			*/
			const here = this
			here.$data.cur_favo_id = playlist_id
			here.$data.cur_favo_title = title
			here.$axios
			.get('/music/get_songs_in_favo', {
				params: {
					favo_id: playlist_id
				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
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
						alert(re_data.message)
					}	
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		//跳转到点击的歌曲的歌曲详情页面
		to_song(song_id){
			console.log(song_id)
			this.$router.push('./song/'+song_id)
		},
		//创建新收藏夹
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
				.post('/music/create_new_favo', form_data, {
					headers: {
    					'Content-Type': 'multipart/form-data'
  					}
				})
				.then(function(response){
					if(response.status == 200){
						const re_data = response.data
						if(re_data.result == 0){
							alert(re_data.message)
							var favo_id = re_data.favo_id
							var favo_title =re_data.favo_title
							here.$data.favourite_list.push({
								playlist_id: favo_id,
								title: favo_title
							})
							here.$data.num_favourite = here.$data.favourite_list.length
						}
						else{
							alert(re_data.message)
						}
					}
					else{
						alert("error! response status is not 200!")
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
		//分享收藏夹，使之成为歌单
		share_favo(){
			const here = this
			here.$data.is_share_visible = ref(true)
			var tips = '分享收藏夹《'
			tips += here.$data.cur_favo_title
			tips += '》，并使之成为歌单'
			here.$data.share_tips = tips
		},
		upload_cover(){
			const here = this
			console.log("AAAAAAAAAAAAAAAAAAAAA")
			here.$refs.cover_select.click()
		},
		select_cover(event){
			console.log("start select cover")
			const here = this
			const cover = event.target.files[0];
			//使用二进制流
			const cover_read = new FileReader()
			cover_read.readAsBinaryString(cover)
			
			cover_read.onload = () => {
				const binary_cover = cover_read.result
				here.$data.share_cover_file = cover
			}
			const cover_read_2 =  new FileReader()
			cover_read_2.readAsDataURL(cover)
			cover_read_2.onload = () => {
				const url_cover = cover_read_2.result
				here.$data.share_cover_url = url_cover
			}
			here.$data.ready_share = true
			console.log("finish select cover")
		},
		confirm_share(){
			const here = this
			const playlist_tag = here.$data.selectedTag.name
			console.log(playlist_tag)
			
			if(playlist_tag == ''){
				ElMessageBox.alert('未完成相关设置，不得分享', '提示', {
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
				return
			}
			here.$data.is_share_visible = ref(false)
			const favo_id = here.$data.cur_favo_id
			const playlist_cover = here.$data.share_cover_file
			const form_data = new FormData()
			form_data.append('playlist_id', favo_id)
			form_data.append('playlist_tag', playlist_tag)
			form_data.append('playlist_cover', playlist_cover)
			here.$data.share_cover_file = ''
			here.$data.ready_share = false
			here.$axios
			.post('/music/set_shared', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				console.log(response)
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						here.$data.have_shared = true
						alert(re_data.message)
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		cancel_share(){
			const here = this
			here.$data.is_share_visible = ref(false)
			here.$data.share_cover_file = ''
			here.$data.ready_share = false
		},
		//删除收藏夹
		remove_favo(){
			const here = this
			const favo_id = here.$data.cur_favo_id
			here.$axios
			.delete('/music/delete_list', {
				params: {
					playlist_id: favo_id
				}
			})
			.then(function(response){
				console.log(response)
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						var t_index = 0
						here.$data.favourite_list.forEach(function(element, index){
							if(element.playlist_id == favo_id){
								t_index = index
							}
						})
						here.$data.favourite_list.splice(t_index, 1)
						alert(re_data.message)
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		remove_song_from_favo(song_id){
			const here = this
			here.$axios
			.delete('/music/cancel_favo', {
				params: {
					playlist_id: here.$data.cur_favo_id,
					song_id: song_id
				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						var t_index = 0
						here.$data.song_list.forEach(function(element, index){
							if(element.song_id == song_id){
								t_index = index
							}
						})
						here.$data.song_list.splice(t_index, 1)
						alert(re_data.message)
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		},
		selectTag(value) {
			this.selectTag = value;
		},
		unshare_favo(){
			const here = this
			const form_data = new FormData()
			form_data.append('songlist_id', here.$data.cur_favo_id)
			here.$axios
			.post('/music/unshare_songlist', form_data, {
				headers: {
    				'Content-Type': 'multipart/form-data'
  				}
			})
			.then(function(response){
				if(response.status == 200){
					const re_data = response.data
					if(re_data.result == 0){
						here.$data.have_shared = false
						alert(re_data.message)
					}
					else{
						alert(re_data.message)
					}
				}
				else{
					alert("error! response status is not 200!")
				}
			})
		}
	}
}
</script>

<script setup>
import { reactive } from "vue";

const input_data = reactive({
	input_playlist_tag: '',
})
</script>

<template>
	<!--引入导航栏组件（包含左侧）-->
	<NavigationBar></NavigationBar>
	<!--存放主体内容的div-->
	<div class="outer_box">
		<div style="display: flex; align-items: center; width: 100%; height: 20%; padding-right: 0px;">
			<img :src="photo_url" class="left_profile" style="margin-left: 20px;"/>
			<div class="rectangle_container" style="width: 120%; margin-left: 30px;">
				<p class="theme_font">{{ username }}</p>
			</div>
			<div style="margin-left: 250px;">
				<el-button style="width: 120%; border-radius: 20px; border-bottom: 2px solid grey;" color="#40E0D0" @click="remove_favo">
					<p class="theme_font" style="color: black;">删除当前收藏夹</p>
				</el-button>
			</div>
			<div style="margin-left: 130px;">
				<el-button v-if="have_shared == false" style="width: 120%; border-radius: 20px; border-bottom: 2px solid grey;" color="#40E0D0" @click="share_favo">
					<p class="theme_font" style="color: black;">分享当前收藏夹</p>
				</el-button>
				<el-button v-if="have_shared == true" style="width: 120%; border-radius: 20px; border-bottom: 2px solid grey;" color="#40E0D0" @click="unshare_favo">
					<p class="theme_font" style="color: black;">取消分享当前收藏夹</p>
				</el-button>
				<el-dialog v-model="is_share_visible" title="分享" id="share_dialog">
					<p class="theme_font" style="color: black;">{{ share_tips }}</p>
					<div style="display: flex; margin-top: 30px;">
						<div class="tag_container" style="margin-left: 20px;">
  							<p class="theme_font" style="color: black;">歌单标签</p>
						</div>
						<div class="upload_cover_container" style="margin-left: 20px;">
							<el-form v-model="input_data" :rules="rules" ref="a_input_data">
								<el-form-item props="input_playlist_tag">
									<!--
									<el-input id="i_playlist_tag" type="text" 
									v-model="input_data.input_playlist_tag" placeholder="请输入歌单标签" />
									-->
									<el-select id="i_tag" v-model="selectedTag" placeholder="请选择标签" style="width: 100%;" 
									filterable @change="selectTag" value-key="id">
										<el-option v-for="item in tagList" id="i_playlist_tag"
										:key="item.id" :label="item.name" :value="item" />
									</el-select>
								</el-form-item>
							</el-form>
						</div>
					</div>
					<div style="display: flex; justify-content: left; align-items: center;">
						<el-button style="margin-top: 10px;">
							<p class="theme_font" style="color: black;" @click="upload_cover">选择上传歌单封面</p>
							<input type="file" accept=".jpg, .png" ref="cover_select" @change="select_cover" style="display: none;" />
						</el-button>
						<img v-if="ready_share" :src="share_cover_url" class="select_cover" style="margin-left: 40px;"/>
					</div>		
					<template #footer>
      					<span class="dialog-footer">
				        	<el-button @click="cancel_share">
								取消分享
							</el-button>
        					<el-button type="primary" @click="confirm_share">
          						确认分享
        					</el-button>
      					</span>
    				</template>
				</el-dialog>
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
							<el-button style="width: 100%; border-radius: 20px; border-bottom: 2px solid grey;" color="#FFDEAD" @click="remove_song_from_favo(song.song_id)">
								<p class="theme_font" style="color: black;">取消收餐</p>
							</el-button>
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
.tag_container{
	width: 20%; 
	background-color: white; 
	height: 50px; 
	display: flex; 
	align-items: center; 
	justify-content: left; 
	border-radius: 30px; 
	height: 40px;
}
.upload_cover_container{
	display: flex; 
	align-items: center; 
	justify-content: left; 
	height: 50px; 
	margin-top: 10px;
}
.select_cover{
	height: 50px;
	width: 50px;
	border-radius: 50%;
}
</style>