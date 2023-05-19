<template>
  <div class="top"> <!--上方导航栏，里面的文字换成对应路由-->
		<img id="logo" src="../assets/logo_small.png"/>
		<el-button id="main" color="#7eec52" @click="to_index">主页</el-button>
		<el-button id="mine" color="#7eec52" @click="to_user">我的</el-button>
		<el-button id="submit" color="#7eec52" @click="to_upload">上传音乐</el-button>
		<el-button id="manage" color="#7eec52" @click="to_manage">管理模式</el-button>
		<img id="img" src="../assets/profile.png" />
	</div>
</template>

<script>
export default {
  name: 'NavNoLeft',
  methods: {
		/*
			点击跳转到主页面的处理函数，等主页面写好后，把这个函数里的
			this.$router.push('./index')
			这句话取消注释，使其可以运行即可实现跳转功能
			其他事件处理函数与之类似，不再赘述
		*/
		to_index(){
			console.log("go to index page\n");
			//this.$router.push('./index')
		},
		//跳转到个人页面
		to_user(){
			console.log("go to user page\n");
			//this.$router.push('./user')
		},
		//跳转到上传页面
		to_upload(){
			console.log("go to upload page\n");
			//this.$router.push('./upload')
		},
		//跳转到管理页面
		to_manage(){
			console.log("go to manage page\n");
			//this.$router.push('./manage')
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
	color: white;
	width: 78px;
	height: 78px;
	position: relative;
	top: 0;
	left: 47%;
	border: 0px solid #7eec52;
	border-radius: 40px;
	float: left;
}
</style>
