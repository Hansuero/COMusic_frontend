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
	}
}
</script>
