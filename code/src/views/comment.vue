<template>
	<nav>
		<NavNoLeft/>
	</nav>
	<div class="back">
		<el-button type="text" id="backButton" @click="goBack">返回</el-button>
	</div>
	<div class="commentInput">
		<div id="imgInfo">
			<img id="cover" src="../assets/logo.png" alt="img">
			<div id="inf">
				<p>{{ inf.song }}</p>
				<p>{{ inf.singer }}</p>
			</div>
		</div>
		<div id="create">
			<p>评论</p>
			<div id="inputBar">
				<el-input maxlength="100" show-word-limit type="textarea" resize="none" rows="6" placeholder="请输入评论，请注意不多于100字" v-model="text.content"></el-input>
			</div>
			<div>
				<el-button id="inb" color="#7eec52" round @click="create">创建评论</el-button>
			</div>
		</div>
	</div>
	<div class="commentList">
		<div>评论区</div>
		<div id="cList">
			<ul type="none">
        <li v-for="(item, index) in cons.con" :key="index" :value="item">
          <div id="content">
            {{ item }}
          </div>
          <div>
            <el-button color="#7eec52" class="delete" @click="cDelete(index)">删除</el-button>
            <el-button color="#7eec52" class="modify" @click="cModify(index)">编辑</el-button>
          </div>
        </li>
			</ul>
		</div>
	</div>
</template>

<script>
import NavNoLeft from '@/components/NavNoLeft.vue'
import router from '@/router'
import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
	name: 'comment',
	components: { NavNoLeft },
  props: {
    'song_id': Number,
    'song_name': String,
    'singer': String
  },
	setup (props) {
		function goBack () {
			router.back()
		}
		const inf = reactive({
			song: '说好的幸福呢',
			singer: 'Jay'
		})
		const text = reactive({
			content: ''
		})
    let ids = reactive({
        id: []
    })
    let cons = reactive({
      con: []
    })
    let cids = reactive({
      cid: []
    })
		function create () {
      if (text.content !== ''){
        const form_data = new FormData()
        form_data.append('song_id', props.song_id)
        form_data.append('content', text.content)
        axios.post('/comment/create_comment', form_data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          function (response) {
            if (response.status === 200) {
              text.content = ''
            }
          }
        )
      } else {
        alert('请输入评论内容')
      }
		}
		function cModify (index) {
      cons.con[index] = prompt("新的评论内容为：")
      var form_data = new FormData()
      form_data.append('comment_id', cids.cid[index])
      form_data.append('content', cons.con[index])
      axios.post('/comment/change_comment', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
		}
		function cDelete (index) {
      axios.delete('/comment/delete_comment', {
        params: {comment_id: cids.cid[index]}
      }).then(
        function (response) {
          if (response.status === 200) {
            ids.id.splice(index, 1)
            cons.con.splice(index, 1)
            cids.cid.splice(index, 1)
          }
        }
      )
		}
    onMounted(()=>{
      axios.get('/comment/get_comment', {
        params: {song_id: props.song_id}
      }).then(
        function (response) {
          for (var i = 0; i < response.data.song_comments.length; i++) {
            ids.id.push(response.data.song_comments[i].comment_user_id)
            cons.con.push(response.data.song_comments[i].comment)
            cids.cid.push(response.data.song_comments[i].comment_id)
          }
        }
      )
    })
		return {
			goBack,
			inf,
			text,
			create,
			cModify,
			cDelete,
      ids,
      cons,
      cids
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
.commentInput{
	width: 100%;
	padding: 10px 0 20px;
	height: 170px;
	position: relative;
}
.commentInput #imgInfo{
	width: 23%;
	height: 100%;
	float: left;
	position: relative;
	left: 10%;
}
.commentInput #imgInfo #cover{
	width: 45%;
	height: 100%;
	float: left;
	position: relative;
}
.commentInput #imgInfo #inf{
	width: 50%;
	height: 70%;
	float: left;
	padding: 15% 0 15%;
	text-align: left;
	font-size: 20px;
	position: relative;
	left: 5%;
}
.commentInput #imgInfo #inf p {
	line-height: 230%;
}
.commentInput #create{
	width: 50%;
	height: 100%;
	float: left;
	position: relative;
	left: 17%;
}
.commentInput #create p{
	text-align: left;
	font-size: 24px;
}
.commentInput #create #inputBar {
	width: 75%;
	float: left;
}
.commentInput #create #inb{
	float: left;
	color: white;
	position: relative;
	top: 50px;
	left: 5%;
}
.commentList>div{
	text-align: left;
	font-size: 25px;
	width: 96%;
	height: 30px;
	text-decoration: underline;
	position: relative;
	left: 4%;
	top: 8px;
}
.commentList #cList{
	padding: 20px 0 20px;
	height: 330px;
	position: relative;
	left: 4%;
	overflow-y: auto;
}
.commentList #cList ul{
	height: 330px;
}
.commentList #cList li{
	position: relative;
	width: 90%;
	height: 100px;
	border: 1px solid #7eec52;
}
.commentList #cList #content{
  width: 80%;
  height: 100%;
  line-height: 100%;
  font-size: 20px;
  font-family: 'Microsoft YaHei', sans-serif;
  float: left;
}
.commentList #cList .delete{
	width: 5%;
	color: white;
	position: relative;
	top: 35px;
	right: 3.47%;
	float: right;
}
.commentList #cList .modify{
	width: 5%;
	color: white;
	position: relative;
	top: 35px;
	right: 5.5%;
	float: right;
}
</style>
