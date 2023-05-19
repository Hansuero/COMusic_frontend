<!--
	个人关注页面
-->

<script>
import NavigationBar from '../components/NavigationBar.vue';

export default {
	name: 'interest',
	/*
		md，我要开始骂人了，那个sb把这个data设置成了一个函数的
	*/
	data() {
		return {
            num_interest: 10,
			interest_list: [{
                    intere_user_id: '00',
                    intere_user_name: 'AAAA',
                },{
                    intere_user_id: '01',
                    intere_user_name: 'BBBB',
                },{
                    intere_user_id: '02',
                    intere_user_name: 'CCCC',
                },{
                    intere_user_id: '03',
                    intere_user_name: 'DDDD',
                },{
                    intere_user_id: '04',
                    intere_user_name: 'EEEE',
                },{
                    intere_user_id: '05',
                    intere_user_name: 'FFFF',
                },{
                    intere_user_id: '06',
                    intere_user_name: 'GGGG',
                },{
                    intere_user_id: '07',
                    intere_user_name: 'HHHH',
                },{
                    intere_user_id: '08',
                    intere_user_name: 'IIII',
                },{
                    intere_user_id: '09',
                    intere_user_name: 'JJJJ',
                },
            ]
		}
	},
	components: {
		NavigationBar,
	},
	methods: {
		//取消关注相关方法
		cancel_interest(intere_user_id){
			console.log(intere_user_id)
		},
		//跳转到关注用户主页的方法
		to_intere_user(intere_user_id){
			console.log(intere_user_id)
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
        <el-scrollbar style="display: flex; width: 100%;" max-height="100%">
            <div style="display: flex; align-items: center;">
                <div v-for="intere in interest_list" class="box_interest_item">
					<div style="width: 100%;">
						<img src="../assets/profile.png" class="profile" @click="to_intere_user(intere.intere_user_id)"/>
					</div>
					<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
						<p class="theme_font" style="color: black;">{{ intere.intere_user_name }}</p>
					</div>
					<el-button color="#7eec52" @click="cancel_interest(intere.intere_user_id)">
						<p class="theme_font">取消关注</p>
					</el-button>
				</div>
            </div>
		</el-scrollbar>
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
.profile{
	height: 200px;
	width: 200px;
	border-radius: 50%;
}
.theme_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
.box_interest_item{
	height: 500px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background-color: #E1FFFF;
	margin-left: 40px;
	margin-right: 40px;
	border-radius: 50px;
	padding-left: 30px;
	padding-right: 30px;
}
</style>