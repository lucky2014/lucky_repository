<template>
	<div>
		<div class="myInfo">
			<!-- <div class="theme_bk_color header">
                <img src="" id='show-actions-bg' />
                <dl>
                    <dt></dt>
                    <dd></dd>
                </dl>
            </div> -->
			<user :userInfo="userInfo"/>
            <div class="bread list_container">
            	<a id="orderManage" @click="goOrder">
            		<span>我的订单</span>
	            	<p class="list_right">
	            		<span>全部订单</span>
	            		<i class="arrowIcon"></i>
	            	</p>
            	</a>
            </div>
			<ordernum :businessOrders="businessOrders"/>
            <!-- <ul class="myOrderList">
                <li><a><span id="unPays"></span>待付款</a></li>
                <li><a><span id="unShipping"></span>待发货</a></li>
                <li><a><span id="shipping"></span>待收货</a></li>
                <li><a><span id="finish"></span>已完成</a></li>
            </ul> -->
		</div>
		<ul class="listUl">
			<li class="list_container">
            	<a href="../address/main">
            		<span>管理收件人</span>
	            	<p class="list_right">
	            		<i class="arrowIcon"></i>
	            	</p>
            	</a>
			</li>
			<li class="list_container">
            	<a href="../coupon/main">
            		<span>优惠券</span>
	            	<p class="list_right">
	            		<i class="arrowIcon"></i>
	            	</p>
            	</a>
			</li>
		</ul>
	</div>
</template>

<script>
import unils from '@/utils/index.js';
import user from '@/components/user/user.vue';
import ordernum from '@/components/user/ordernum.vue';
export default {
	data(){
		return {
			userInfo : '',
			businessOrders : '',
		}
	},
	mounted(){
		var me = this;
		var data = {
			storeId : me.$store.state.info.storeInfo.id
		}
		unils.getUserInfo(data,function(msg){
			me.userInfo = msg;
		})
	},
	onShow(){
		var me = this;
		unils.getBusinessOrdersNum(function(msg){
			me.businessOrders = msg
		})
	},
	components : {
		user,
		ordernum,
	},
	methods : {
		goOrder(){
			wx.navigateTo({
				url : '../orderList/main?status=0'
			})
		}
	},
	onUnload(){
		this.userInfo = "";
		this.businessOrders = ""
	}
}
</script>
<style>
.header{position: static;}
.list_container{ clear: both; border-bottom: 1px solid #f0f0f0;  padding-right:15px; font-size: 14.72px;
height: 48px;line-height: 48px; color: #606060;letter-spacing: -0.38px;margin-left: 15px;}
.list_container a{ display:block; font-size: 12.8px; color: #606060;}
.list_container .list_right{float: right;}
.list_container .list_right span{font-size: 12px;color: #a2a2a2;}
.list_container .list_right i{display: inline-block;width: 18px;height: 18px;vertical-align: middle;background-size: 100% 100%;background-image: url(https://store.iliujia.com/imgs/b/arrowIcon.png);background-repeat: no-repeat;}
.listUl{margin-top: 10px;background: #fff;}
.listUl .list_container:last-child{border-bottom: none;}

.myOrderList{ clear: both; overflow: hidden;padding: 16px 0;}
.myOrderList li{ float: left; width: 25%; text-align: center; font-size: 12px;}
.myOrderList li a{ display: block; color: #A2A2A2;line-height: 18px;}
.myOrderList li span{ display: block;font-size: 18.7px;line-height: 22px;margin-bottom: 5px;}

.editBox{ position: fixed; left: 0; bottom: 0; width: 100%; background: #fff;}
.editBox .title{ text-align: center; position: relative; padding-top: 10px; font-size: 14.4px;}
.editBox .title a.cut{ position: absolute; right: 14px; width: 33px; top: 4px;}
.editBox .title a.cut img{ width: 100%;}

.weui-cells:before{ border: none;}

</style>
