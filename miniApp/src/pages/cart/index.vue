/*
	功能： 购物车页面
*/
<template>
	<div id="shoppingCar" class="productList">
		<div v-if="shoppingCarList.data&&shoppingCarList.data.length>0" class="shoppingCar-content">
			<div class="shoppingCar-title container-fixed" style="">
				<span class="desc">{{storeName}}</span>
				<p class="editBox" @click="editorFn">
					<a class="edit theme_color caiyuanbao" v-show="editor==0">编辑</a>
					<a class="complete theme_color caiyuanbao" v-show="editor==1">完成</a>
				</p>
			</div>
			<carlist :shoppingCarList="shoppingCarList" @carids="carids" :editor="editor"/>
		</div>
    	<!--该页面请求数据暂未拿到时，显示购物车页面专门的空页面-->
		<div v-else-if="shoppingCarList.data&&shoppingCarList.data.length==0">
			<Empty/>
		</div>

	</div>
</template>

<script>
import utils from '@/utils/index.js'
import Empty from '@/components/cart/empty.vue'	// 购物车页面专门的空页面
import carlist from '@/components/cart/carList.vue'
import indexVue from '../goodsDetail/index.vue';
export default {
	data () {
		return {
			editor :0,	// 功能:  控制订单 编辑 状态
		}
	},
	components: {
		Empty,
		carlist,
	},
	// onShow(){
	// 	this.storeName = this.$store.state.info.storeInfo.storeName
	// 	var data = {
	// 		pageNum: 1,
	// 		pageSize: 1000,
	// 		storeId: this.$store.state.info.storeInfo.id,
	// 	}
	// 	utils.listCartProducts(data,(msg)=>{
	// 		this.shoppingCarList = msg;
	// 	})
	// },
	methods : {
		carids(ids){	// 功能： 由子组件触发，ids为所选商品的id
			console.log('所选商品的id数组：',ids)
			wx.navigateTo({
				url : '../preorder/main?ids='+ids.join(",")
			})
		},
		editorFn(){
			if(this.editor){
				this.editor = 0
			}else{
				this.editor = 1
			}
		},
	},
	watch : {

	},
	computed : {
		shoppingCarList(vue){	// 功能: 返回购物车列表,即商品信息
			console.log('购物车打开之后订单列表: ',vue.$store.state.info.cartList)
			return vue.$store.state.info.cartList
		},
		storeName(vue){
			return vue.$store.state.info.storeInfo.storeName
		}
	},
	onUnload(){
		this.editor = 0
	}
}
</script>
<style>
*{font-size:14px;font-style: normal;}
.shoppingCar-title{height: 44px;line-height: 44px;padding: 0 15px;background-color: #fff;}
.shoppingCar-title .desc{color: #A2A2A2;font-size: 14px;}
.shoppingCar-title .editBox{float: right;height: 44px;overflow: hidden;position: relative;width: 60px;font-size: 14px;text-align: right;}
.shoppingCar-title .editBox a{color: #ff5200;}
.shoppingCar-bottom{position: fixed;bottom: 0;left: 0;right: 0;height: 50px;background-color: #fff;box-shadow: 0 0px 4px rgba(0,0,0,.1);}
.complete-bottom,.edit-bottom{padding: 0 3px 0 14px;height: 50px;}
.shoppingCar-bottom>div>div.bottom_box{display: block;vertical-align: middle;height: 50px;padding-right: 68px;}
.complete-bottom .shoppingCar-bottom-left,.edit-bottom .shoppingCar-bottom-left{width: 38px;height: 50px;position: relative;padding-left: 42px;line-height: 50px;float: left;}
.myicon-checked.checkAll{width: 21px;height: 21px;display: inline-block;border-radius: 50%;overflow: hidden;border: 1px solid #A2A2A2;position: absolute;top: 50%;margin-top: -11px;left: 0;}
.shoose-span{margin-left:6px;color: #606060;font-size: 14px;}
.complete-bottom .shoppingCar-bottom-center{text-align: right;width: 70%;padding-right: 4px;float: left;line-height: 50px;}
.complete-bottom .shoppingCar-bottom-right,.edit-bottom .shoppingCar-bottom-right{display: table-cell;position: absolute;top: 3px;right: 5px;height: 44px;text-align: right;float: left;line-height: 50px;}
.complete-bottom .shoppingCar-bottom-right button,.edit-bottom .shoppingCar-bottom-right button{width: 68px;height: 100%;background-color: #A2A2A2;color: #fff;font-size: 14px;padding: 0;margin: 0;border-radius: 0;line-height: 44px;background-color:#AA2327; }
.complete-bottom .shoppingCar-bottom-right button.disabled,.edit-bottom .shoppingCar-bottom-right button.disabled{background-color: #cacaca;}
.feeTotal {font-weight: bold;color: #AA2327;font-size: 16px;}
.feeTotal:before{content: "￥";}
.shoppingCar-bottom-center .desc{font-size: 12px;line-height: 15px;}
.noShop .goToShopping {position: static;display: block;width: 130px;height: 30px;margin: 50px auto 0;border: 1px solid #AA2327;border-radius: 52px;color: #AA2327;line-height: 28px;text-align: center;}
</style>
