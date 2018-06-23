<template>
  <div class="content">
  	<web class="web" ref="myweb" :src="src" @pagestart="start" @pagefinish="finish" @error="error"></web>

  	<div @click="pre"><text>上一页</text></div>
  	<div @click="reload"><text>刷新</text></div>
  	<div @click="next"><text>下一页</text></div>
  </div>
</template>

<script>
	const webview = weex.requireModule("webview");
	exports default {
		data: {
			src: "http://imooc.com"
		},
		methods: {
			pre(e){
				webview.goBack(this.$refs.myweb);
			},
			reload(e){
				webview.goBack(this.$refs.myweb);
			},
			next(e){
				webview.goBack(this.$refs.myweb);
			},
			start(e){
				console.log("start")
			},
			finish(e){
				console.log("finish")
			},
			error(e){
				console.log("error")
			}
		}
	}
</script>


<style>

</style>
