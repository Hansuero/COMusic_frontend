<template>
	<router-view/>
</template>

<script>
import login from './views/login.vue'
import register from './views/register.vue'

//将诸页面作为组件传入
export default {
	name: 'App',
	components: {
		login, //登录页面
		register //注册页面
	}
}
</script>
