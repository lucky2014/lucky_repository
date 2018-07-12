<template>
  <div>
	  <div style="display:none">{{$store.state.info.storeInfo}}</div>	
	  {{$store.state.info.storeInfo}}
      <div data-backpictype="1" id="preview_title" v-if="store.backPicType==1">
		  	<div class="bannerInfor" :style="'background:url('+store.backPic+') no-repeat;background-size:100%;background-position: center;height: 200px;'">
				<div class="inforName" v-if="store.shortIntro">
					<p class="">{{store.shortIntro}}</p>
				</div>
			</div>
			<div class="shopInfor">
				<dl class="storeDiv" :data-storeId="store.id">
					<dt><image :src="store.storeLogo" mode="aspectFill"/></dt>
					<dd>
						<p class="shopName">
							<span>{{store.storeName}}</span>
						</p>
						<p class="shopPhone">
							<img src="/static/identify.png"/>
							<span>该店铺{{store.isCertification?'已':'未'}}通过实名认证</span>
						</p>
					</dd>
				</dl>
				<button open-type="share" class="shareQr">
					<img src="/static/shareQr.png"/>
					<span>店铺分享</span>
				</button>
			</div>
      </div>
      <div data-backpictype="2" id="preview_title" v-if="store.backPicType==2">
		  <div class="bannerInfor" :style="'background:url('+store.backPic+') no-repeat;background-size:100%;background-position: center;height: 200px;'">
				<div class="inforName" v-if="store.shortIntro">
					<div class="storeLogo">
						<image :src="store.storeLogo" mode="aspectFill"/>
					</div>
					<div class="shortIntroBox">
						<h3 class="storeName">{{store.storeName}}</h3>
						<p class="shopPhone">
							<img src="/static/identify.png">
							<span>该店铺 已通过实名认证</span>
						</p>
						<p class="shortIntro">{{store.shortIntro}}</p>
					</div>
				</div>
				<button class="shareQrBox"  open-type="share"><img class="shareQr" src="/static/code_114.png"></button>
			</div>
      </div>
      <div data-backpictype="3" id="preview_title" v-if="store.backPicType==3">
		   <div class="bannerInfor" :style="'background:url('+store.backPic+') no-repeat;background-size:100%;background-position: center;height: 200px;'">
				<!-- <img src="{{resizeImg backPic 375 200 1}}"> -->
				
				<!-- <span></span> -->
				<button class="shareQrBox"  open-type="share"><img class="shareQr" src="/static/code_114.png"></button>
			</div>
			<div class="inforName">
				<div class="storeLogo">
					<image :src="store.storeLogo" mode="aspectFill"/>
				</div>
				<div class="shortIntroBox">
					<h3 class="storeName">{{store.storeName}}</h3>
					<p class="shortIntro">{{store.shortIntro}}</p>
					<p class="shopPhone">
						<img src="/static/identify.png">
						<span>该店铺 已通过实名认证</span>
					</p>
				</div>
			</div>
      </div>
      <div data-backpictype="4" id="preview_title" v-if="store.backPicType==4">
			<div class="bannerInfor" :style="'background:url('+store.backPic+') no-repeat;background-size:100%;background-position: center;height: 200px;'">
			<!-- <img src="{{resizeImg backPic 375 200 1}}"> -->
			<div class="inforName" v-if="store.shortIntro">
				<div class="storeLogo">
					<image :src="store.storeLogo" mode="aspectFill"/>
				</div>
				<div class="shortIntroBox">
					<h3 class="storeName">{{store.storeName}}</h3>
					<p class="shortIntro">{{store.shortIntro}}</p>
					<p class="shopPhone">
						<img src="/static/identify.png">
						<span>该店铺 已通过实名认证</span>
					</p>
					
				</div>
			</div>
			<!-- <span></span> -->
			<button class="shareQrBox"  open-type="share"><img class="shareQr" src="/static/code_114.png"></button>
		</div>
      </div>
  </div>
</template>
<script>
export default {
	computed : {
		store(vue){
			return this.$store.state.info.storeInfo
		}
	},
	// onShareAppMessage: function(res){
	// 	return {
	// 		title: this.store.storeName,
	// 		path : '/pages/login/main?scene='+encodeURI('storeId='+this.store.storeId),
	// 		success: function(res) {
	// 			// 转发成功
	// 		},
	// 		fail: function(res) {
	// 			// 转发失败
	// 		}
	// 	}
	// }
};
</script>

