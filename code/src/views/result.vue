<!--
	搜索结果页面
-->

<script>
import NavNoLeft from '../components/NavNoLeft.vue'
import SearchBox from '../components/SearchBox.vue';
import { ElMessageBox } from 'element-plus'

export default {
    name: 'result',
    components: {
        NavNoLeft,
        SearchBox
    },
    props: [
        'search_type',
        'search_input'
    ],
    data() {
        return{
            SEARCH_SONG: 1,
			SEARCH_SONGLIST: 2,
			SEARCH_USER: 3,
            result_type: -1,
            num_result: 0,
            result_list: []
        }
    },
    created() {
        console.log("here is create")
        const here = this
        //var type = here.$props.search_type //这个是实际使用的
        var type = here.$data.SEARCH_SONG //这个仅供前端开发测试使用
        here.$data.result_type = type
        //搜索的是歌曲
        if(type == here.$data.SEARCH_SONG){
            const form_data = new FormData()
            form_data.append('song_name', here.$props.search_input)
            here.$axios
            .get('http://127.0.0.1:4523/m1/2749792-0-default/api/index/search_song', form_data, {
                headers: {
    				'Content-Type': 'multipart/form-data'
  				}
            })
            .then(function(response){
                if(response.status == 200){
                    const song_list = response.data.song_list
                    here.$data.num_result = song_list.length
                    song_list.forEach(function(element){
                        var result_photo_url = element.song_cover_photo_url
                        var result_title = element.song_name
                        var result_id = element.song_id
                        var result_subtitle = element.singer
                        here.$data.result_list.push({
                            result_id: result_id,
                            result_photo_url: result_photo_url,
                            result_title: result_title,
                            result_subtitle: result_subtitle
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
        }
        //搜索的是歌单
        else if(type == here.$data.SEARCH_SONGLIST){
            const form_data = new FormData()
            form_data.append('songlist_name', here.$props.search_input)
            here.$axios
            .get('http://127.0.0.1:4523/m1/2749792-0-default/api/index/search_playlist', form_data, {
                headers: {
    				'Content-Type': 'multipart/form-data'
  				}
            })
            .then(function(response){
                if(response.status == 200){
                    const songlist_list = response.data.songlist_list
                    here.$data.num_result = songlist_list.length
                    songlist_list.forEach(function(element){
                        var result_id = element.playlist_id
                        var result_photo_url = element.playlist_cover_photo_url
                        var result_title = element.playlist_name
                        var result_subtitle = element.owner_name
                        here.$data.result_list.push({
                            result_id: result_id,
                            result_photo_url: result_photo_url,
                            result_title: result_title,
                            result_subtitle: result_subtitle
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
        }
        //搜索的是用户
        else if(type == here.$data.SEARCH_USER){
            const form_data = new FormData()
            form_data.append('username', here.$props.search_input)
            here.$axios
            .get('http://127.0.0.1:4523/m1/2749792-0-default/api/index/search_user', form_data, {
                headers: {
    				'Content-Type': 'multipart/form-data'
  				}
            })
            .then(function(response){
                if(response.status == 200){
                    const user_list = response.data.user_list
                    here.$data.num_result = user_list.length
                    user_list.forEach(function(element){
                        var result_id = element.user_id
                        var result_photo_url = element.photo_url
                        var result_title = element.username
                        var result_subtitle = ""
                        here.$data.result_list.push({
                            result_id: result_id,
                            result_photo_url: result_photo_url,
                            result_title: result_title,
                            result_subtitle: result_subtitle
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
        }
    },
    methods: {
        to_detail_page(result_id){
            const here = this
            const result_type = here.$data.result_type
            //跳转到歌曲详情页
            if(result_type == here.$data.SEARCH_SONG){
                const params = {
                    song_id: result_id
                }
                /*//合并时取消注释即可
                here.$router.push({
                    path: './song',
                    query: params
                })
                */
            }
            //跳转到歌单详情页
            else if(result_type == here.$data.SEARCH_SONGLIST){ 
                const params = {
                    songlist_id: result_id
                }
                /*//合并时取消注释即可
                here.$router.push({
                    path: './songlist',
                    query: params
                })
                */
            }
            //跳转到用户详情页
            else if(result_type == here.$data.SEARCH_USER){
                //合并时取消注释即可
                //here.$router.push('./user/'+result_id)
            }
        }
    }
}
</script>

<script setup>
import { reactive } from 'vue';

const inputData = reactive({
	input: ''
})
</script>

<template>
    <!--引入导航栏组件（不包含左侧）-->
    <NavNoLeft></NavNoLeft>
    <div class="outer_box">
        <SearchBox :delta="0"></SearchBox>
        <el-scrollbar style="height: 60vh; width: 120vh; display: flex; flex-wrap: wrap; justify-content: center">
            <div v-for="(result, index) in result_list" style="width: 120vh; display: flex; align-items: center;">
                <div @click="to_detail_page(result.result_id)" class="result_item_box">
                    <img :src="result.result_photo_url" class="small_photo" style="margin-left: 30px;"/>
                    <p class="title_font" style="width: 200px; display: flex; margin-left: 30px;">{{ result.result_title }}</p>
                    <P class="subtitle_font" style="display: flex;">{{ result.result_subtitle }}</P>   
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<style scoped>
.outer_box {
	justify-content: center;
	position: absolute; 
	display: flex; 
	flex-wrap: wrap; 
	top: 20vh;
    width: 99%;
	height: 80vh;
}
.small_photo{
	height: 80px;
	width: 80px;
	border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
}
.title_font {
	color: black;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;
}
.subtitle_font {
    color: #708090;
	font-size: medium;
	font-family:'Microsoft YaHei', sans-serif;
}
.result_item_box{
    border-bottom: 3.5px solid grey;
    border-radius: 10px;
    background-color: azure;
    width: inherit; 
    display: flex; 
    align-items: center; 
    margin-top: 20px;
}
</style>