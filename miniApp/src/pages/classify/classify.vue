<template>
	<div id="goodsClassify">
		<scroll-view class="classify_header" scroll-x>
			<card :navData="navData"  @categoryid="getId"/>
		</scroll-view>
		<div class="containerView">
			<Goods :goodsList="goodsList" @goodsid="addCar"></Goods>
		</div>
		<div v-show="showSku">
			<sku :goodsInfo="skuInfo" @closeAni="closeAni"/>
		</div>
	</div>
</template>

<script>
import utils from '../../utils/index.js'
import card from '@/components/classify/nav.vue'
import Goods from '@/components/classify/goods.vue'
import sku from '@/components/sku.vue'
export default {
	data(){
		return {
			navData : "",
			goodsList : "",
			skuInfo : "",
			showSku : false,
            totalPage : 0,
			nowPage : 1,
			categoryId : 0,
		}
	},
	components:{
		card,
		Goods,
		sku,
	},
	mounted(){
		var me = this;
		utils.listCategory(function(msg){
			me.navData = msg
		})
		var data = {
			pageNum : 1,
			pageSize : 10,
		}
		utils.listCategoryGoods(data,(msg)=>{
			this.totalPage = msg.page.pages;
            this.nowPage ++;
			me.goodsList = msg.data
		})
	},
	methods : {
		getId : function(data){
			var me = this;
			var parme = {
				categoryId : data,
				pageNum : 1,
				pageSize : 10,
			}
			utils.listCategoryGoods(parme,(msg)=>{
				this.categoryId = data
				this.nowPage = 2;
				this.totalPage = msg.page.pages;
				me.goodsList = msg.data
			})
		},
		addCar : function(id){
			var data = {
				id : id,
			}
			utils.getProductInfo(data,(msg)=>{
				this.skuInfo = msg;
				this.showSku = true;
			})
		},
		closeAni : function(){
			setTimeout(()=>{
				this.showSku = false
			},300)
		}
	},
	onReachBottom () {
		var me = this;
		if(me.nowPage<=me.totalPage){
			var me = this;
			var data = {
				pageNum : me.nowPage,
				pageSize : 10,
			}
			if(me.categoryId){
				data.categoryId = me.categoryId
			}
			utils.listCategoryGoods(data,(msg)=>{
				me.nowPage ++;
				me.totalPage = msg.page.pages;
				me.goodsList.push(...msg.data)
			})
		}
	}
}
</script>
<style>
.containerView{ margin-top:50px; }
</style>
