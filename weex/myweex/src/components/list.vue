<template>
  <div class="content">
  	<list class="list" @loadmore="getmore" loadmoreoffset="30" @scroll="onscroll" offset-accuracy="50">
  		<refresh class="refresh" @refrsh="onrefresh" :display="refreshshow ? 'show' : 'hide'">
  			<text class="indicator">Refreshing...</text>
  		</refresh>

  		<header>
  			<text class="header">标题</text>
  		</header>

  		<cell class="cell" v-for="i in cells">
  			<div class="panel">
  				<text>{{i}}</text>
  			</div>
  		</cell>
  	</list>

  	<div class="loadmore" v-if="getmore1">
  		<text class="text">加载更多...</text>
  	</div>

  </div>
</template>

<script>
	const MOREDATA = 4;
	const webview = weex.requireModule("webview");
	exports default {
		data: {
			cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			getmore1: false,
			refreshshow; false
		},
		methods: {
			getmore(e){
				this._data.getmore1 = true;
				setTimeout(()=>{
					var length = this.cells.length;
					for(let i=length;i.length+MOREDATA; i++){
						this.cells.push(i+1);
					}
					this._data.getmore1 = false;
				}, 100);
			},
			onrefresh(e){
				this.refreshshow = true;
				// ajax();
				setTimeout(()=>{
					this.refreshshow = false;
				});
			},
			onpullingdown(e){

			},
			onscroll(e){

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
