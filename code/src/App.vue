<template>
	<router-view v-if="isRouterAlive"/>
</template>

<script>

//将诸页面作为组件传入
export default {
	name: 'App',
	provide() {
		return{
			reload: this.reload
		}
	},
	data() {
		return {
			isRouterAlive: true
		}
	},
	methods: {
		reload() {
			const here = this
			here.isRouterAlive = false
			here.$nextTick(function(){
				here.isRouterAlive = true
			})
		},
	},
	/*
	mounted() {
		var here = this

		window.addEventListener('beforeunload', function(event){
    		console.log(here.$cur_user)
    		console.log(here.$is_login)
    		localStorage.setItem('buff_cur_user', here.$cur_user)
    		localStorage.setItem('buff_is_login', here.$is_login)
    		console.log('beforeunload event triggered');
    		console.log(localStorage.getItem('buff_cur_user'))
    		console.log(localStorage.getItem('buff_is_login'))
    		event.preventDefault()
    		event.returnValue = '';
		});

		// 在这里执行您希望在页面刷新结束后触发的操作
    	console.log('Page refreshed');
		var buff_is_login = localStorage.getItem('buff_is_login')
		var buff_cur_user = localStorage.getItem('buff_cur_user')
		this.$is_login = buff_is_login
		this.$cur_user = buff_cur_user
		console.log(this.$is_login)
		console.log(this.$cur_user)
  	}
	*/
}
</script>
