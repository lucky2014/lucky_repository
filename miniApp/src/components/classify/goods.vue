<template>
    <div class="home_shopGoods">
		<ul v-if="goodsList2.length">
			<li v-for="(item, index) in goodsList2" :key="index">
				<a :href="'../../pages/goodsDetail/main?id='+item.id">
					<festivalButton v-if="store.festivalButton == 'y'" />
					<image :src="item.coverUrl" mode="aspectFill"/>
					<p>
						<span>
							<b v-if="item.isFree">包邮</b>
							{{item.name}}
						</span>
						<i v-if="item.priceSZ"><b>¥{{item.priceSZ}}</b><em>.{{item.priceSF}}</em></i>
						<i v-else><b>¥{{item.originPrice}}</b></i>
					</p>
				</a>
				<img src="/static/addCar_grey.png" class="addToCar" @click="addGoods(item.id)">
			</li>
		</ul>
    <!--该页面请求数据暂未拿到时，显示空页面，该功能暂时隐藏-->
		<!--<div  v-else>-->
			<!--<Empty/>-->
		<!--</div>-->
    </div>
</template>
<script>
// import Empty from '@/components/empty.vue'
import festivalButton from '@/components/festivalButton.vue'
export default {
	data(){

	},
	computed : {
		store (vue){
			return vue.$store.state.info.storeInfo
		}
	},
	computed:{
		goodsList2 : function(){
			var goodsList = this.goodsList||[]
			var newList = goodsList.map(function(n){
				var v = {...n}
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
				return v
			})
			return newList
		},
		store (vue){
			return vue.$store.state.info.storeInfo
		}
	},
	props : {
		goodsList : {
			type: Array,
			default: [],
			required : true,
            validator :function(value){
				console.log(value)
                return value.length < 0
            }
		}
	},
	components : {
		// Empty,
		festivalButton
	},
	methods : {
		addGoods : function(id){
            this.$emit("goodsid",id);
        }
	},
}
</script>
<style>

.noScroll{ height:100%; overflow:hidden; }

#allGoods .home_shopGoods{margin-bottom:0;}
.home_shopGoods ul{margin: 10px 10px 0 10px; overflow: hidden;}
.home_shopGoods ul li{position: relative;float: left;width: 48.5%;background: #fff;padding-bottom: 13px;margin-bottom: 10px;}
.home_shopGoods ul li:nth-child(2n+2){float: right;}
/*#allGoods .home_shopGoods ul li:first-child{width: 94.5%;}
#allGoods .home_shopGoods ul li:first-child p span{min-height: auto;}
#allGoods .home_shopGoods ul li:first-child img.addToCar{bottom: 10px;}*/
.home_shopGoods ul li p{height: 80px;}
.home_shopGoods ul li p i{font-style: normal;color: #aa2327;font-size: 20px;line-height: 28px;letter-spacing: -0.54px;margin-left: 6px;}
.home_shopGoods ul li p span{display: block;font-size: 14px;line-height: 19px;letter-spacing: -0.38px;    word-break: break-all;margin: 10px 6px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; }
.home_shopGoods ul li p i b{font-size: 20px;font-weight: normal;display: inline;}
.home_shopGoods ul li p i em{font-size: 14px;font-style: normal;display: inline;}
.home_shopGoods ul li img.addToCar{position: absolute;right: 6px; bottom: 10px; width: 37px;height: 37px;}
.home_shopGoods ul li>a>image{display: block; width: 100%;height: 172.18px;}
.home_shopGoods ul li p span b{ display:inline-block; width:35px; height:18px; font-size:12px; line-height:16px; text-align:center; vertical-align:middle; background:#AA2327; color:#fff; border-radius:2px; margin-top:-2px; font-weight:normal; }

/*.noData{display: none;}
.noData>img{display: block; width: 160px;margin: 15% auto 15px;}
.noData p{color: #a2a2a2;text-align: center;}*/
.noData span{display: block;width: 165px;height: 50px;line-height: 50px;border: 1px solid #BEA474;color: #BEA474;font-size: 16px;text-align: center;margin: 70px auto 0;}
.noMoreData{background: #F0F0F0;text-align: center;font-size: 12px;color: #a2a2a2;}
#allGoods .noMoreData{margin-bottom: 7px;}

.weui-cells{background-color: #fff;}
</style>

