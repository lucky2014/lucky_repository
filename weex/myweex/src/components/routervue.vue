<template>
  <div class="content">
  	<div class="header">
  		<text class="headerworld">{{header}}</text>
  	</div>

  	<div class="nav">
  		<text @click="jump('index')" :class="[selectpath=='index' ? 'selected' : '']">
  		<text @click="jump('car')" :class="[selectpath=='car' ? 'selected' : '']">
  		<text @click="jump('me')" :class="[selectpath=='me' ? 'selected' : '']">
  	</div>

	<!-- 定义路由模板视图，这个是用来加载组件的 -->
	<router-view class='teplate'></router-view>

  </div>
</template>

<script>
	const MOREDATA = 4;
	const webview = weex.requireModule("webview");
	exports default {
		data: {
			header: "首页"
		},
		methods: {
			jump: function(e){
				switch(e){
					case 'index':
						this._data.header = "首页";
						break;

					case 'car':
						this._data.header = "购物车";
						break;

					case 'me':
						this._data.header = "我的";
						break;
				}
			}
		}
	}
</script>


<style>
	.panel{
		background-color: #ccc;
		height: 50px; 
		line-height: 50px;
		text-align: center;
	}
</style>
