<!--
	个人页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';

export default {
	name: 'user',
    /*
        md，我要开始骂人了，那个sb把这个data设置成了一个函数的
    */
    data() {
        return {
            username: 'Keine',
            introduction: '快来编辑你的个人简介啊嘿嘿嘿！',
            can_modify: false
        }
    },
	components: {
		NavigationBar,
	},
    methods: {
        upload_profile(){
            console.log("this is upload_profile");
            /*
                这里应该要实现弹出一个选择框，选择本地的一个文件，并且获取它的路径，
                并且把它移动到../assets/profile.png文件的功能

                你说的对，但明天再写，现在的当务之急是睡觉
            */
        },
        modify_introduction(){
            let former = this.$data.can_modify
            if(former){
                this.$data.can_modify = false
                let new_introduction = document.getElementById('i_introduction').value
                console.log(new_introduction)
            }
            else{
                this.$data.can_modify = true
            }
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
        <div style="width: 100%; height: 40%; display: flex; justify-content: center; align-items: center;">
            <el-button class="profile">
                <img class="profile" src="../assets/profile.png" @click="upload_profile()"/>
            </el-button>
        </div>
        <div style="width: 100%; height: 5%; display: flex; justify-content: center; align-items: center;">
            <div class="rectangle_container" style="width: 20%;">
                <p class="Chinese_font">{{ username }}</p>
            </div>
        </div>
        <div style="width: 100%; height: 50%; display: flex; justify-content: center; align-items: center;">
            <div v-if="can_modify">
                <el-form :model="input_data" :rules="rules" ref="a_input_data">
                    <el-form-item prop="input_introduction">
					    <el-input :rows="8" style="width: 500px;" id="i_introduction" v-model="introduction" type="textarea"/>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="!can_modify">
                <el-form :model="input_data" :rules="rules" ref="a_input_data">
                    <el-form-item prop="input_introduction">
                        <el-input :rows="8" disabled="true" style="width: 500px;" v-model="introduction" type="textarea"/>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-left: 50px;">
                <el-button v-if="can_modify" color="#7eec52" @click="modify_introduction()">
                    <p class="Chinese_font">保存个人简介</p>
                </el-button>
                <el-button v-if="!can_modify" color="#7eec52" @click="modify_introduction()">
                    <p class="Chinese_font">编辑个人简介</p>
                </el-button>
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
.profile {
	height: 180px;
	width: 180px;
	left: 40%;
	top: 40%;
    border-radius: 50%;
}
.Chinese_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.rectangle_container {
  	border-radius: 30px;
  	height: 40px;
	background-color: #7eec52;
  	display: flex;
    justify-content: center;
  	align-items: center;
}
.rectangle_container p {
  margin: 0; /* 将内联元素的margin属性设置为0,以使它们紧贴在一起 */
}
</style>
