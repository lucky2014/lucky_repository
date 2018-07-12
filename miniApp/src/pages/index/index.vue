<template>
	<div>
		<div id="shop_preview" class="pt40">
			<div class="header">
				<div class="input">
					<img src="https://store.iliujia.com/imgs/c/searchIcon.png" alt="">
					<div class="inputDiv"  @click="searchFn">搜索商品名称</div>
				</div>
				<div class="iconDiv" @click="addCollect">
					<i class="collectIcon"><img :src="collected?'/static/yishoucang.png':'/static/shoucang.png'" width="100%"></i>
				</div>
			</div>
			<div>
				<div id="shop_preview">
					<Banner/>
				</div>
				<div id="needModules">
					<div class="module_notice" >
						<Notic/>
					</div>
					<div v-for="(item,index) in modulesList" :key="index" :class="'module_product'+index" v-if="item.tag=='product'">
						<div :class="'goods_container '+ (item.typeId==1?'onePics':item.typeId==2?'twoPics':item.typeId==3?'bigPics':'thirdPics')">
							<Modules :modulesData="item" @goodsid="addCar" @isempty="allEmpty" :festivalButton="store.festivalButton"/>
						</div>
					</div>
					<div :class="'module_product'+index" v-if="products.data.length">
						<div v-if="products.data.length" class="goods_container thirdPics">
							<h2>
								<i class="borderColor-template"></i>
								<em class="preImg"></em>
								<span class="colorTemplate">热销商品</span>
								<i class="borderColor-template"></i>
								<em class="afterImg"></em>
							</h2>
							<Products :products="products" @goodsid="addCar"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<coupon />
		<div v-show="showSku">
			<sku :goodsInfo="skuInfo" @closeAni="closeAni"/>
		</div>
		<newman :count="count" v-if="count"/>
	</div>
</template>

<script>
import utils from '@/utils/index.js';
import Banner from '@/components/index/banner.vue';
import Notic from '@/components/index/notic.vue';
import Modules from '@/components/index/modules.vue';
import erweima from '@/components/index/erweima.vue'
import search from '@/components/index/search.vue'
import searchList from '@/components/classify/goods.vue'
import coupon from '@/components/coupon.vue'
import sku from '@/components/sku.vue'
import Products from  '@/components/index/products.vue'
import newman from '@/components/index/newman.vue'
export default {
	data () {
		return {
			modulesList : [],
			search,
			emptyModules : [],
			products : {data:[]},
			skuInfo : "",
			showSku : false,
			collected : 0,
			count : 0,
		}
	},
	components: {
		Banner,
		Notic,
		Modules,
		erweima,
		search,
		coupon,
		sku,
		Products,
		newman,
	},
	methods: {
		addCar : function(id){
			var data = {
				id : id,
			}
			utils.getProductInfo(data,(msg)=>{
				this.skuInfo = msg;
				this.showSku = true;
			})
		},
		searchFn : function(val){  
			wx.navigateTo({
				url  : '../search/main'
			})
		},
		allEmpty : function(num){
			this.emptyModules.push(num)
		},
		closeAni : function(){
			setTimeout(()=>{
				this.showSku = false
			},300)
		},
		addCollect : function(){
			var data = {
				storeId : this.store.id
			}
			if(!this.collected){
				utils.addMiniAppStoreCollect(data,(msg)=>{
					this.collected = 1
					utils.alert("收藏成功","success")
				})
			}else{
				utils.delMiniAppStoreCollect(data,(msg)=>{
					this.collected = 0
					utils.alert("取消成功","success")
				})
			}
		}
	},
	mounted(){
		var me = this;
		utils.listStoreModules(function(msg){
			me.modulesList = msg.modules;
		})
		utils.addNewPersonalityCouponCustomer((msg)=>{
			this.count = msg
			//this.count = 1
        })
		this.$store.dispatch("getCartList")
		this.$store.dispatch("getCollectList")
		this.$store.subscribe((mutation,state)=>{
			if(mutation.type == 'getCollectList'){
				for(var i=0;i<state.info.collectList.length;i++){
					var obj = state.info.collectList[i]
					if(obj.storeId == state.info.storeId){
						me.collected = 1
						return
					}
				}
			}
		})
	},
	computed : {
		store (vue){
			return vue.$store.state.info.storeInfo
		}
	},
	watch : {
		emptyModules : function(val,oldVal){
			if(val.length == this.modulesList.length-1){
				if(val.indexOf(0)==-1){
					var data = {
						pageNum: 1,
						pageSize: 5
					}
					utils.listStoreProducts(data,(msg)=>{
						this.products.data = msg.data.map(function(v){
							if(v.sellPrice){
								v.originPrice = v.sellPrice;
							}
							if(v.isFreeShipping=="y"){
								v.isFree = 1
							}
							if(v.originPrice > 999999){
								v.originPrice = "999+";
							}else{
								v.originPrice = v.originPrice.toFixed(2);
								v.priceSZ = v.originPrice.split(".")[0];
								v.priceSF = v.originPrice.split(".")[1];
							}
							if(msg.page.pageNum>1){
								v.pages = 1;
							}else{
								v.pages = 0;
							}
							return v
						})
						this.products.page = msg.page
					})
				}
			}
		},
		modulesList : function(val){
			if(val.length == 1||val.length == 0){
				var data = {
					pageNum: 1,
					pageSize: 5
				}
				utils.listStoreProducts(data,(msg)=>{
					this.products.data = msg.data.map(function(v){
						if(v.sellPrice){
							v.originPrice = v.sellPrice;
						}
						if(v.isFreeShipping=="y"){
							v.isFree = 1
						}
						if(v.originPrice > 999999){
							v.originPrice = "999+";
						}else{
							v.originPrice = v.originPrice.toFixed(2);
							v.priceSZ = v.originPrice.split(".")[0];
							v.priceSF = v.originPrice.split(".")[1];
						}
						if(msg.page.pageNum>1){
							v.pages = 1;
						}else{
							v.pages = 0;
						}
						return v
					})
					this.products.page = msg.page
				})
			}
		},
	},
	onShareAppMessage: function(res){
		return {
			title: this.store.storeName,
			path : '/pages/login/main?scene='+this.store.id,
			imageUrl : this.store.backPic,
			success: function(res) {
				// 转发成功
			},
			fail: function(res) {
				// 转发失败
			}
		}
	}
}
</script>

<style>
	.header{overflow: hidden;background: #fff;padding: 7px 15px;position: fixed;top: 0;
	left: 0;right: 0;z-index: 99;padding-right :40px; }
	.iconDiv{position: absolute;right: 20px;top: 7px;}
	.iconDiv i {float: left;width: 20px;}
	.iconDiv i img{height: 30px;width: 30px;top: 2px;right: 10px;}
	.input{position: relative;float: left;width: 100%;height: 30px;background: #f0f0f0;border-radius: 4px;border: 0;padding: 0 15px 0 35px;box-sizing: border-box;}
	.header img{position: absolute;top: 7.5px;left: 7.5px;width: 15px;height: 15px;}
	.header .inputDiv{font-size: 14px;line-height: 30px;height: 30px;color: #a2a2a2;}
	.bannerInfor{
		position: relative;
		height: 200px;
	}
	.bannerInfor .inforName p{
		background:none;
		padding: 0;
		margin:0;
	}
	.bannerInfor .inforName{
		position: relative;
	}
	.storeLogo image{
		width:78px;
		height:78px;
		border-radius: 50%;
	}
	.shareQrBox{
		position: absolute;
		right:15px;
		top:15px;
		width:50px;
		height:50px;
		background-color: rgba(0,0,0,.5);
		border-radius: 50%;
		padding: 0;
	}
	.bannerInfor img.shareQr{
		min-height: auto;
		padding: 0;
		margin:0;
		position: static;
		width:24px;
		height:24px;
		margin-top:13px;
	}
	#preview_title .inforName{
		border: 1px solid transparent;
	}
	#preview_title .shopPhone{
		display: flex;
		display: -webkit-flex;
		display: -o-flex;
	}
	#preview_title .shopPhone{
		align-items: center;
	}
	#preview_title .shopPhone span{
		font-size: 12px;
		color: #1B1B1B;
		letter-spacing: -0.32px;
	}
	#preview_title .shopPhone img{
		width:16px;
		height:19px;
		margin-right: 6px;
	}
	#preview_title[data-backpictype='1'] .bannerInfor .inforName{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%); 
		width: 85%;
		border: 3px solid #fff;
		border-color:rgba(255,255,255,0.7);  
		padding: 6px;
	}
	#preview_title[data-backpictype='1'] .bannerInfor .inforName p{
		padding: 10px 26px;
		font-size: 14px;
		line-height: 20px; 
		letter-spacing: 1px;
		background: rgba(255,255,255,0.7);
		text-align: center; 
		word-break: break-all;
	}
	#preview_title[data-backpictype='1'] .shopInfor{
		position: relative;
		 background: #fff;
		 overflow: hidden;
	}
	#preview_title[data-backpictype='1'] .shopInfor{
		position: relative;
		background: #fff;
		overflow: hidden;
	}
	#preview_title[data-backpictype='1'] .shopInfor dl{
		float: left;
		 margin-left:15px;
		 padding: 15px 0;
		 margin-right: 100px;
		 overflow: hidden;
	}
	#preview_title[data-backpictype='1'] .shopInfor dl dt{
		position: absolute;
		top: 50%;
		left: 15px;
		margin-top: -35px;
		width: 70px;
		height: 70px;
	}
	#preview_title[data-backpictype='1'] .shopInfor dl dt img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	#preview_title[data-backpictype='1'] .shopInfor dl dd{    
		margin-left: 80px;
		margin-top: 10px;
	}
	#preview_title[data-backpictype='1'] .shopInfor dl dd p{
		position: relative; 
		display: flex; 
		overflow: hidden;
		margin: 4px 0 10px 0;
	}
	#preview_title[data-backpictype='1'] .shopInfor dd p.shopName span{
		font-size: 16px;
		color: #1b1b1b;
		margin-left: 1px;
	}
	#preview_title[data-backpictype='1'] .shopInfor dd p.shopPhone{
		height: 24px;
		line-height: 24px;
		margin-top: 5px;
	}
	#preview_title[data-backpictype='1'] .shareQr{
		display: inline-block;
		border-left: 1px dashed #F0F0F0;
		padding-left: 15px;
		height: 67px;
		position: absolute;
		right: 15px;
		top: 50%;
		margin-top: -39px;
	}
	#preview_title[data-backpictype='1'] .shareQr img{
		display: block;
		margin: 0 auto; 
		width: 22px;
		height: 22px;
		margin-top: 10px;
	}
	#preview_title[data-backpictype='1'] .shareQr span{
		display: block;
		text-align: center; 
		font-size: 12px;
		color: #606060;
		margin-top: 7px;
	}
	/*第一种类型*/
	#preview_title[data-backpictype='2'] .shortIntroBox{
		margin-left:12px;
	}
	#preview_title[data-backpictype='2'] .shortIntro{
		font-size: 12px;
		color: #FFFFFF;
		letter-spacing: 1px;
		line-height: 15px;
		text-shadow: 0 1px 2px rgba(0,0,0,0.50);
		position: relative;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 3;
	    margin-top: 6px;
	}
	#preview_title[data-backpictype='2'] .bannerInfor .inforName{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%); 
		width: 85%;
	}
	#preview_title[data-backpictype='2'] .storeName{
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 1px;
		text-shadow: 0 1px 2px rgba(104,104,104,0.50);
		font-weight: normal;
	}
	#preview_title[data-backpictype='2'] .shopPhone span{
		color:#fff;
		text-shadow: 0 1px 2px rgba(0,0,0,0.50);
	}
	#preview_title[data-backpictype='2'] .storeLogo img{
		margin-top: 6px;
	}
	#preview_title[data-backpictype='2'] .inforName{
		display: flex;
		display: -webkit-flex;
		display: -o-flex;
	}
	/*第三种类型*/
	#preview_title[data-backpictype='3'] .storeLogo{
		width:78px;
		margin:0 auto;
		position: absolute;
		height:78px;
		top:-39px;
		left:50%;
		margin-left:-39px;
	}
	#preview_title[data-backpictype='3'] .storeLogo img{
		border-radius: 50%;
	}
	#preview_title[data-backpictype='3'] .inforName{
		position: relative;
		padding-bottom: 16px;
	}
	#preview_title[data-backpictype='3'] .shortIntroBox{
		margin-top: 46px;
		height: 100%;
	    transform: translateX(-50%);
	    -webkit-transform: translateX(-50%);
	    position: relative;
	    left: 50%;
	    display: table;
	    max-width: 85%;
	    width: auto;
	}
	#preview_title[data-backpictype='3'] .storeName{
		text-align: center;
		font-size: 18px;
		color: #000000;
		font-weight: normal;
		letter-spacing: 1px;
	}
	#preview_title[data-backpictype='3'] .shopPhone{
		justify-content: center;
	}
	#preview_title[data-backpictype='3'] .shortIntro{
		margin-top:10px;
		margin-bottom:6px;
		text-align: center;
		font-size: 12px;
		color: #5E5E5E;
		letter-spacing: 0.67px;
		line-height: 16px;
	}
	/*第四种类型*/
	#preview_title[data-backpictype='4'] .storeLogo{
		width:78px;
		margin:0 auto;
		height:78px;
	}
	#preview_title[data-backpictype='4'] .storeLogo img{
		border-radius: 50%;
	}
	#preview_title[data-backpictype='4'] .inforName{
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%); 
		width: 85%;
	}
	#preview_title[data-backpictype='4'] .shortIntroBox{
		margin-top: 5px;
		height: 100%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		position: relative;
		left: 50%;
		display: table;
		max-width: 85%;
		width: auto;
	}
	#preview_title[data-backpictype='4'] .shopPhone span{
		color:#fff;
		text-shadow: 0 1px 2px rgba(0,0,0,0.50);
	}
	#preview_title[data-backpictype='4'] .storeName{
		text-align: center;
		font-size: 18px;
		color: #fff;
		text-shadow: 0 1px 2px rgba(0,0,0,0.50);
		font-weight: normal;
		letter-spacing: 1px;
	}
	#preview_title[data-backpictype='4'] .shopPhone{
		justify-content: center;
	}
	#preview_title[data-backpictype='4'] .shortIntro{
		margin-top: 2px;
		margin-bottom: 4px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		text-shadow: 0 1px 2px rgba(0,0,0,0.50);
		letter-spacing: 0.67px;
		line-height: 16px;
	}

	.goodsShare{display: none; position: fixed;left: 0;top: 0;width: 100%;z-index:-9999;height: 100%; background: rgba(0,0,0,0);}
	.goodsShare .shareInner{ position: relative; width: 80%;height: 410px; background: #fff;border-radius: 10px;z-index: -9999;} 
	/*.goodsShare{position: fixed;left: 0;top: 0;width: 100%;height: 100%; background: rgba(0,0,0,0);}
	.goodsShare .shareInner{ position: relative; width: 80%;height: 410px; background: #fff;border-radius: 10px;} */
	.goodsShare .shareInner .backPicImg{width: 100%;border-radius: 10px 10px 0 0;overflow: hidden;height: 173px;margin: 0;padding: 0;}
	.goodsShare .shareInner>img{width: 100%; border-radius: 10px 10px 0 0;overflow-y:hidden;}
	.goodsShare .shareInner .imgDiv>img{width: 300px;}
	.goodsShare .shareInner .shareDiv{position: absolute;top: 230px;width: 100%;background: #fff;}
	.goodsShare .shopShareInner{height: 450px;padding-bottom: 10px;}
	/*.goodsShare .shopShareInner>img{height: 173px;}*/
	.goodsShare .shareInner .backPicImg img{width: 100%;}
	.goodsShare .shopShareInner .shopIdentify{display: flex;justify-content: center;margin-top: 1px;}
	.goodsShare .shopShareInner .shopIdentify span{font-size: 12px;color: #A2A2A2;line-height: 21px;margin-left: 4px; letter-spacing: -0.32px;}
	.goodsShare .shopShareInner .shortIntro{display: block;width: 70%;margin-left: 15%; text-align: center;line-height: 16px;font-size: 12px;color: #606060;letter-spacing: 0.67px;margin-top: 12px;}
	.goodsShare .shopShareInner>p.storeName img{position: absolute;left: 50%;margin-left: -30px;top: 142px; width: 60px;height: 60px;border: 1px solid #BEA474;border-radius: 50%;}
	.goodsShare .shopShareInner .shopIdentify img{display: inline-block; width: 18px;height: 21px;}
	.goodsShare .shopShareInner>p.storeName span{display: block;text-align: center;font-size: 16px;line-height:22px;margin-top: 36px; color: #1B1B1B;letter-spacing: -0.43px;}
	.goodsShare .shopShareInner>div{margin: 10px 15px;padding-top: 10px;}
	.goodsShare .shopShareInner>div .qrcode{display: block;margin: 0 auto; width: 80px;height: 80px;}
	.goodsShare .shopShareInner>div span{display: block;text-align: center;font-size: 12px;margin-top: 10px;}

	.goodsShare.picImg{z-index:99;background: rgba(0,0,0,0.5)}
	.goodsShare.picImg .shareInner{position: absolute; top:50%;margin-top:-250px;left:10%;z-index:100;}

	.goodsShare .shareInner .tips{border-top: none;margin-top: 10px;padding-top: 0;}
	.goodsShare .shopShareInner .tips{margin-top: 15px;}
	.goodsShare .shareInner .tips i{position: relative; display: block;width: 40px;height: 40px;margin: 0 auto;}
	.goodsShare .shareInner .tips span{display: block;text-align: center; color: #fff;font-size: 14px;}
	.goodsShare .shareInner .tips img{position: absolute;top: 5.5px;left: 5.5px; display: block; width: 29px;height: 29px;}
	.goodsShare .thBase64>img{position: absolute;top: 90px;left: 15%;}
	.grayBk{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: #f4f4f4;z-index: -9900;}
	.pt40{padding-top: 44px;}
	#shop_preview h2{
		display: flex;
	    align-items: center;
	    justify-content: center;
	    text-align: center;
	    height: 24px;
	    line-height: 24px;
	    margin: 17px 0 12px 0;
	}
	#shop_preview h2 i {
	    flex:1;
	    height: 0;
	    width: 30px;
	    border-bottom-width: 1px;
	    border-bottom-style: solid;
	}

	#shop_preview h2 span {
	    display: inline-block;
	    height: 24px;
	    line-height: 24px;
	    font-size: 18px;
	    text-align: center;
	    padding: 0 15px;
	    letter-spacing: 1px;
	}
	#shop_preview h2 i {
	    border-bottom: 1px solid #a2a2a2;
	}
</style>
