<!--
    搜索框组件
-->

<script>
export default {
    name: 'SearchBox',
    inject: [ 'reload' ],
    props: [
        'delta'
    ],
    data() {
        return{
            SEARCH_SONG: 1,
			SEARCH_SONGLIST: 2,
			SEARCH_USER: 3
        }
    },
    methods: {
        get_input_data(){
            let search_input = document.getElementById('i_input').value
            return search_input
        },
        to_search_result(search_type){
            const here = this
            var search_input = this.get_input_data()
            const params = {
                search_type: search_type,
                search_input: search_input
            }
            if(here.$props.delta == 1){
                here.$router.push({
                    path: './result',
                    query: params,
                    replace: true
                })
            }
            else{
                here.reload()
            }
        },
        searchSong(){
            this.to_search_result(this.$data.SEARCH_SONG)
        },
        searchSongList(){
            this.to_search_result(this.$data.SEARCH_SONGLIST)
        },
        searchUser(){
            this.to_search_result(this.$data.SEARCH_USER)
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
    <div class="search">
    	<div id="input">
			<el-input id="i_input" v-model="inputData.input" placeholder="搜素歌曲/歌单/用户"/>
		</div>
    	<div id="button">
    		<el-button type="success" color="#7eec52" id="button1" @click="searchSong">搜索歌曲</el-button>
		    <el-button type="success" color="#7eec52" id="button2" @click="searchSongList">搜索歌单</el-button>
		    <el-button type="success" color="#7eec52" id="button3" @click="searchUser">搜索用户</el-button>
	    </div>
	</div>
</template>

<style scoped>
.search{
	width: 100vh;
	height: 80px;
	display: flex;
	justify-content: center;
}
.search #input{
	width: 300px;
	height: 30px;
	position: relative;
	top: 20px;
	float: left;
}
.search #button{
	width: 300px;
	height: 30px;
	position: relative;
	top: 20px;
	left: 20px;
	float: left;
}
.search #button #button1{
	position: relative;
	left: 20px;
	color: white;
	font-size: 14px;
	width: 70px;
	font-family:'Microsoft YaHei', sans-serif;
	float: left;
}
.search #button #button2{
	position: relative;
	left: 30px;
	width: 70px;
	color: white;
	font-size: 14px;
	font-family:'Microsoft YaHei', sans-serif;
	float: left;
}
.search #button #button3{
	position: relative;
	left: 40px;
	width: 70px;
	color: white;
	font-size: 14px;
	font-family:'Microsoft YaHei', sans-serif;
	float: left;
}
</style>