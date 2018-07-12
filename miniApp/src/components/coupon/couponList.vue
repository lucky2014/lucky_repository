/*
	功能:  优惠券列表组件
	缺点:  功能不完善，后期需要配合后端进行改装
		   1.  未增加不可使用显示的模板
*/
<template>
    <ul  class="couponList couponList_C">
        <li v-for="(item,index) in couponList2" :key="index" :class="item.style">
			<div class="show-area">
				<div class="show-left">
					<p class="show-detail">
						<em>¥<i>{{item.couponAmount}}</i></em>
						<span class="limit">
							<i v-if="item.limitGetCount">每人限领{{item.limitGetCount}}张</i>
							<b v-else-if="item.limitAmount">满{{item.limitAmount}}可用</b>
							<b v-else>无门槛</b>
						</span>
					</p>
					<i class="indate" v-if="item.endTime">{{item.startTime}}-{{item.endTime}}</i>
				</div>
					<template v-if="item.notAllowReason">
						<p v-if="item.cantuseFuture" :class="'timeOut notAllowReason'+item.notAllowReason"></p>
						<p v-else :class="'timeOut show-right notAllowReason'+item.notAllowReason">
							<span>立即使用</span>
						</p>
					</template>
					<template v-else>
						<p  class="show-right uesImmediate" :style="item.id==couponIdC.id&&'background: rgba(245,166,35,0.3);'">
							<span v-if="item.id==couponIdC.id">您已选择</span>
							<span v-else @click="uesImmediate(item.goodsId,item)">立即使用</span>
						</p>
					</template>
			</div>
			<div class="edit-area">
				<img v-if="item.reasonExit" src="https://store.iliujia.com/imgs/c/coupon/why.png" />
				<p v-if="item.reasonExit" >{{item.tishi}}</p>
				<p v-else-if="item.name">{{item.name}}</p>
				<p v-else>{{item.storeName}}</p>
			</div>
			<span class="semicircle semicircle-left"></span>
			<span class="semicircle semicircle-right"></span>
		</li>
    </ul>
</template>
<script>
import { formatTime } from '@/utils/index.js';
export default {
	props:["couponList","couponIdC"],
	computed : {
		store(vue){
			return vue.$store.state.info.storeInfo
		},

		/*
			功能：  对优惠券列表信息进行处理
		*/

		couponList2(){
			var me = this;
			var list = this.couponList.map(function(obj){
				// 功能: 对优惠券起止事件格式化，将伦敦时间转化为
				obj.startTime = obj.startTime?formatTime(new Date(obj.startTime)).substring(0,16):'';
				obj.endTime = obj.endTime?formatTime(new Date(obj.endTime)).substring(0,16):'';
				if (obj.notAllowReason == "0" || obj.notAllowReason){
					obj.reasonExit = 1;
				}
				if(obj.notAllowReason == 0 || obj.notAllowReason == 1 || obj.notAllowReason == 3 || obj.notAllowReason == 6){
					obj.cantuseFuture = true
				}
				if (obj.notAllowReason == "0" || obj.notAllowReason){
					obj.reasonExit = 1;
				}
				if(obj.reasonExit == 1 && obj.couponUseScope==1){
					obj.style = "couponliJu notAllowReason allGoods reason"+obj.notAllowReason;
				}else if(obj.reasonExit == 1 && obj.couponUseScope==2){
					obj.style = "couponliJu notAllowReason specialGoods reason"+obj.notAllowReason;
				}else if(!obj.reasonExit && obj.couponUseScope==1){
					obj.style = "couponliJu canUse allGoods";
				}else if(!obj.reasonExit && obj.couponUseScope==2){
					obj.style = "couponliJu canUse specialGoods";
				}
				if(obj.notAllowReason == 1){
					obj.tishi = "优惠券已经使用过一次";
				}else if(obj.notAllowReason == 2){
					obj.tishi = "优惠券可使用时间没到";
				}else if (obj.notAllowReason == 3) {
					obj.tishi = "优惠券使用期限已过";
				}else if (obj.notAllowReason == 5) {
					obj.tishi = "商品与特定优惠券规定不符合";
				}else if (obj.notAllowReason == 6) {
					obj.tishi = "商品不存在或已下架";
				}else{
					obj.tishi = "订单金额不满" + obj.limitAmount+"元";
				}
				obj.storeName = me.store.storeName;
				return obj
			})
			return list
		},
	},
	methods : {
		uesImmediate(goodsId,obj){
			if(this.$root.$mp.query.list){
				this.$emit("couponcho",obj)
			}else{
				if(goodsId){
					wx.navigateTo({
						url:'../goodsDetail/main?id='+goodsId
					})
				}else{
					wx.switchTab({
						url: '../index/main'
					})
				}
			}
		}
	},
	watch : {
		couponIdC(v){
			console.log(v)
		}
	},
	mounted: function(){
		console.log('couponList: ',this.couponList)
		console.log('couponIdC: ',this.couponIdC)
	}
}
</script>

