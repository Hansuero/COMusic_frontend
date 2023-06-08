<template>
	<Dialog 
	ref="child_dialog"
	:can_visible="visible"
	:instruction="instruct" 
	:left_choice="l_choice" 
	:right_choice="r_choice"
	:right_function="to_login"
	@close="close_child_dialog"
	/>
	<div class="top"> <!--上方导航栏，里面的文字换成对应路由-->
		<img id="logo" src="../assets/logo_small.png"/>
		<el-button id="main" color="#7eec52" @click="to_index">主页</el-button>
		<el-button id="mine" color="#7eec52" @click="to_user">我的</el-button>
		<el-button id="submit" color="#7eec52" @click="to_upload">上传音乐</el-button>
		<el-button id="manage" color="#7eec52" @click="to_manage">管理模式</el-button>
		<img v-if="delta" :src="profile_url" id="img" />
		<img v-if="!delta" :src="photo_url" id="img" />
	</div>
</template>

<script>
import { inject, reactive } from 'vue';
import Dialog from './Dialog.vue'
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';

export default {
	name: 'NavNoLeft',
	props:[
		'profile_url'
	],
	setup() {
		const app = getCurrentInstance().appContext.app
		const is_login = app.config.globalProperties.$is_login
		function whether_login() {
			return is_login
		}
		return { whether_login }
	},
	methods: {
		close_child_dialog(){
			this.$data.visible = false
			this.$refs.child_dialog.update_delta()
		},
		to_login(){
			console.log("here")
			this.$router.push('/login')
		},
		/*
			点击跳转到主页面的处理函数，等主页面写好后，把这个函数里的
			this.$router.push('./index')
			这句话取消注释，使其可以运行即可实现跳转功能
			其他事件处理函数与之类似，不再赘述
		*/
		to_index(){
			console.log("go to index page\n");
			this.$router.push('/index')
		},
		//跳转到个人页面
		to_user(){
			let res = this.whether_login()
			const here = this
			console.log(res)
			//当前使用者已经登录
			if(res){
				console.log("go to user page\n");
				this.$router.push('/user/'+here.$cur_user.user_id)
			}
			//当前使用者未登录
			else{
				this.$data.visible = true
			}
		},
		//跳转到上传页面
		to_upload(){
			let res = this.whether_login()
			if(res){
				console.log("go to upload page\n");
				this.$router.push('/upload')
			}
			else{
				this.$data.visible = true
			}
		},
		//跳转到管理页面
		to_manage(){
			const here = this
			let res = this.whether_login()
			if(res){
				var is_admin = false
				if(here.$cur_user.username == 'admin'){
					is_admin = true
				}
				if(is_admin == true){
					console.log("go to manage page\n");
					this.$router.push('/manage')
				}
				else{
					alert("无管理员权限")
				}
			}
			else{
				this.$data.visible = true
			}
		},
	},
	components: {
		Dialog
	},
	data() {
		const here = this
		var t_url = here.$props.profile_url
		var delta = 1
		console.log(t_url)
		if(t_url==null){
			delta = 0
			console.log("hererere")
			t_url = here.$cur_user.photo_url
			console.log(t_url)
		}
		return{
			delta: delta,
			photo_url: t_url,
			visible: false,
			instruct: '这不是你没登录就能看的内容',
			l_choice: '我就不去登录哼',
			r_choice: '马上就去登录啦',
		}
	}
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
}

.top{
	border-bottom: 17px solid #7eec52;
	padding-bottom: 17px;
	width: 100%;
	height: 10vh;
	background-attachment: fixed;
}

.top #logo{
	width: 78px;
	height: 78px;
	position: absolute;
	top: 10px;
	left: 3%;
	bottom: 10px;
	border: 1px solid #7eec52;
	border-radius: 40px;
	float: left;
}

.top #main{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 25px;
	left: 15%;
	border: 1px solid #7eec52;
	border-radius: 5px;
	float: left;
}

.top #mine{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 25px;
	left: 23%;
	border: 1px solid #7eec52;
	border-radius: 5px;
	float: left;
}

.top #submit{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 25px;
	left: 31%;
	border: 1px solid #7eec52;
	border-radius: 5px;
	float: left;
}

.top #manage{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 25px;
	left: 39%;
	border: 1px solid#7eec52;
	border-radius: 5px;
	float: left;
}

.top #img{
	line-height: 48px;
	font-size: 20px;
	width: 78px;
	height: 78px;
	position: relative;
	top: 0;
	left: 47%;
	border: 0px solid #7eec52;
	border-radius: 40px;
	float: left;
}

.left{
	height: 82vh;
	width: 150px;
	border-right: 17px solid #7eec52;
}

.left #idv{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 5%;
	left: 13px;
	border: 1px solid #7eec52;
	border-radius: 5px;
}

.left #collect{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 12%;
	margin-right: 100px;
	border: 1px solid #7eec52;
	border-radius: 5px;
}

.left #care{
	width: 118px;
	height: 48px;
	line-height: 48px;
	font-size: 20px;
	color: white;
	position: relative;
	top: 19%;
	left: 0;
	border: 1px solid #7eec52;
	border-radius: 5px;
}

.left #message{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 26%;
	left: 0px;
	border: 1px solid #7eec52;
	border-radius: 5px;
}

.left #record{
	line-height: 48px;
	font-size: 20px;
	color: white;
	width: 118px;
	height: 48px;
	position: relative;
	top: 33%;
	left: 0px;
	border: 1px solid #7eec52;
	border-radius: 5px;
}

</style>