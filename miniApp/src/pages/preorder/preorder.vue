<template>
    <div id="productDetail" :style="'padding-bottom:68px;'">
        <div class="detail-address getValueByAttr" @click="addressFn">
			<div class="address-left">
				<img src="https://store.iliujia.com/imgs/c/pos.png" alt="">
			</div>
			<!-- <div class="address-center" v-if="chooseAdd">
				<h3>
					<span class="lf canGetValue receiverName" data-param="receiverName">{{chooseAdd.name}}</span>
					<span class="rt canGetValue receiver_moible" data-param="receiver_moible">{{chooseAdd.phone}}</span>
				</h3>
				<p class="desc canGetValue receiverAddress" data-param="receiverAddress">
					{{chooseAdd.provinceName+chooseAdd.cityName+chooseAdd.districtName+chooseAdd.address}}
				</p>
			</div> -->
			<div class="address-center" v-if="address.name">
				<h3>
					<span class="lf canGetValue receiverName" data-param="receiverName">{{address.name}}</span>
					<span class="rt canGetValue receiver_moible" data-param="receiver_moible">{{address.phone}}</span>
				</h3>
				<p class="desc canGetValue receiverAddress" data-param="receiverAddress">
					{{address.provinceName+address.cityName+address.districtName+address.address}}
				</p>
			</div>
			<div class="address-center" v-else>
				<h3>
					<span class="lf canGetValue receiverName" data-param="receiverName">选择地址</span>
					<span class="rt canGetValue receiver_moible" data-param="receiver_moible"></span>
				</h3>
				<p class="desc canGetValue receiverAddress" data-param="receiverAddress">
					
				</p>
			</div>
			<div class="address-right">
				<img src="https://store.iliujia.com/imgs/c/arrowIcon.png" alt="">
			</div>
		</div>
        <div class="container">
            <ordercenter :preOrderFromCart="preOrderFromCart"/>
        </div>
        <div class="priceList main detailList">
			<div class="priceTotal">
				<span class="desc lf">
					商品总金额
				</span>
				<span class="rt fee">{{price.totalPrice}}</span>
			</div>
			<div class="pricePost">
					<span class="desc lf">
						合计邮费
					</span>
				<span class="rt fee">{{price.transferFee}}</span>
			</div>
			<div class="couponSpan" v-if="couponList.length" @click="goCoupon">
				<span class="desc lf">优惠券</span>
				<span class="rt goList" style="color:#1C1B20;" v-if="!chooseCoupon.id">有{{couponList.length}}张可用<img class="rt" style="width:18px;position:absolute;top:50%;margin-top:-9px;right:0;margin-left:-4px;" src="https://store.iliujia.com/imgs/c/arrowRight.png"></span>
				<span class="rt goList reduceFee" style="color:#606060;"  v-if="chooseCoupon.id">-￥{{price.couponPrice}}<img class="rt" style="width:18px;position:absolute;top:50%;margin-top:-9px;right:0;margin-left:-4px;" src="https://store.iliujia.com/imgs/c/arrowRight.png"></span>
			</div>
			<div class="needPay">
				<span class="desc lf">
					应付金额
				</span>
				<span class="fee rt">{{price.actualPrice}}</span>
			</div>
		</div>
		<div class="detail-bottom">
			<div class="detail-bottom-left">
					<span class="chooseAll shoose-span">
						合计:
					</span>
			</div>
			<div class="detail-bottom-center">
				<span class="feeTotal">{{price.actualPrice}}</span>
				<span class="desc">(含运费等)</span>
			</div>
			<div class="detail-bottom-right">
				<input type="button" class="btn" id="submitOrder" value="提交订单" @click="submitOrder">
			</div>
		</div>
    </div>
</template>
<script>
import utils from '@/utils/index.js';
import ordercenter from '@/components/preorder/orderCenter.vue';
var subscribe;
export default {
    data(){
        return {
            carids : "",
			preOrderFromCart : [],
			userNum : 0,
			from : 0,//1购物车 2waimian
			couponList : [],
        }
    },
    mounted(){
		var me = this;
		this.$store.dispatch('getAddlist');
		subscribe = subscribe?subscribe:function(){};
		subscribe();
		subscribe = this.$store.subscribe((mutation,state)=>{
			if(mutation.type == "isAjax"){
				/*
					功能:  根据路由参数来判断是由订单中心进入还是由sku组件(立即下单)进入
					参数:  ids  由购物车页面 跳转到订单中心页面，所选订单id
						   data 立即下单，所选商品信息
				*/
				if(this.$root.$mp.query.ids){
					me.from = 1
					var data = {
						cartIds : this.$root.$mp.query.ids,	// 所选商品的id
					}
					if(this.address.id){
						data.receiverId = this.address.id
					}
					// 请求功能:  点击“结算”后请求结算商品信息
					// 请求参数:  cartIds 所选商品的id
					utils.preOrderFromCart(data,(msg)=>{
						this.preOrderFromCart = msg
						var goodsIdS = '';
						var pricesS = '';
						var goodsArr = [],pricesArr = [];
						var totalPrice = 0;
						msg.map(function(v,i){
							totalPrice += v.totalPrice
							for(var j=0;j<v.goodsInfo.length;j++){
								for(var k=0;k<goodsArr.length;k++){
									if(goodsArr[k]==v.goodsInfo[j].goodsId){
										break;
									}
								}
								if(j!=0&&k<goodsArr.length){
									if(v.goodsInfo[j].sku&&v.goodsInfo[j].sku.sellPrice){
										pricesArr[k] = pricesArr[k]*1.0+v.goodsInfo[j].sku.sellPrice*v.goodsInfo[j].num;
									}else{
										pricesArr[k] = pricesArr[k]*1.0+v.goodsInfo[j].originPrice*v.goodsInfo[j].num;
									}
								}else{
									goodsArr.push(v.goodsInfo[j].goodsId);
									if(v.goodsInfo[j].sku&&v.goodsInfo[j].sku.sellPrice){
										pricesArr.push(v.goodsInfo[j].sku.sellPrice*v.goodsInfo[j].num);
									}else{
										pricesArr.push(v.goodsInfo[j].originPrice*v.goodsInfo[j].num);
									}
								}
							}
							goodsIdS = goodsArr.join("|");
							pricesS = pricesArr.join("|");
						})

						var data = {
							limitAmount : totalPrice,
							isUsed : 1,
							goodsIdS : goodsIdS,
							pricesS : pricesS,
						}
						// 请求功能:  获取优惠券列表
						// 请求参数:  limitAmount isUsed goodsIds pricesS
						utils.listStoreCouponCustomer(data, (msg)=>{
							this.couponList = msg
						})
					})
				}else if(this.$root.$mp.query.data){
					me.from = 2
					var data = {
						data : this.$root.$mp.query.data,
					}
					if(this.address.id){
						data.receiverId = this.address.id
					}
					utils.preOrder(data,(msg)=>{
						this.preOrderFromCart = []
						this.preOrderFromCart.push(msg)
						var data = {
							limitAmount : msg.totalPrice,
							isUsed : 1,
							goodsIdS : msg.goodsInfo[0].goodsId,
							pricesS : msg.totalPrice,
						}
						utils.listStoreCouponCustomer(data, (msg)=>{
							this.couponList = msg
						})
					})
				}
			}
		})

    },
    components: {
        ordercenter,
    },
    computed : {
		price(){
			var totalPrice = 0;
			var transferFee = 0;
			var couponCamount = 0;
			this.preOrderFromCart.map(function(v){
				totalPrice += v.totalPrice||0
				transferFee += v.transferFee||0
				couponCamount += v.couponCamount||0
			})
			return {
						totalPrice:totalPrice.toFixed(2),
						transferFee:transferFee.toFixed(2),
						couponPrice : couponCamount.toFixed(2),
						actualPrice:(totalPrice+transferFee-couponCamount).toFixed(2)
					}
		},
		address(vue){
			var chooseAdd = vue.$store.state.addressList.chooseAdd;
			return chooseAdd
		},
		chooseCoupon(vue){
			return vue.$store.state.info.chooseCou
		},
		storeId(vue){
			return vue.$store.state.info.storeInfo.id;
		}
    },
    watch : {
        price : function(v){
			var allPrice = v.totalPrice;
			var userNum = 0;
			if(this.coupon){
				this.coupon.map((i)=>{
					if(i.limitAmount<=allPrice){
						userNum++
					}
				})
				this.userNum = userNum
			}
		},
		address : function(v){
			if(v.id){
				console.log(this.$root.$mp.query)
				if(this.$root.$mp.query&&this.$root.$mp.query.ids){
					var data = {
						cartIds : this.$root.$mp.query.ids,
						receiverId : v.id,
					}
					if(this.chooseCoupon.couponCode){
						data.couponCode = this.chooseCoupon.couponCode
					}
					utils.preOrderFromCart(data,(msg)=>{
						this.preOrderFromCart = msg
					})
				}else if(this.$root.$mp.query&&this.$root.$mp.query.data){
					var data = {
						data : this.$root.$mp.query.data,
						receiverId : v.id,
					}
					if(this.chooseCoupon.couponCode){
						data.couponCode = this.chooseCoupon.couponCode
					}
					utils.preOrder(data,(msg)=>{
						this.preOrderFromCart = []
						this.preOrderFromCart.push(msg)
					})
				}
			}
			
		},
		chooseCoupon(v){
			if(v.id){
				if(this.$root.$mp.query&&this.$root.$mp.query.ids){
					var data = {
						cartIds : this.$root.$mp.query.ids,
						couponCode : v.couponCode
					}
					if(this.address.id){
						data.receiverId = this.address.id
					}
					utils.preOrderFromCart(data,(msg)=>{
						this.preOrderFromCart = msg
					})
				}else if(this.$root.$mp.query&&this.$root.$mp.query.data){
					var data = {
						data : this.$root.$mp.query.data,
						couponCode : v.couponCode
					}
					if(this.address.id){
						data.receiverId = this.address.id
					}
					utils.preOrder(data,(msg)=>{
						this.preOrderFromCart = []
						this.preOrderFromCart.push(msg)
					})
				}
			}
			
		}
	},
	methods : {
		addressFn(){
			wx.navigateTo({
				url : '../address/main?type=1'
			})
		},
		submitOrder(){
			if(this.address.id){
				var me = this;
				var cards = [];
				for(var i=0;i<this.preOrderFromCart.length;i++){
					var obj = {}
					obj.remark = this.preOrderFromCart[i].remark
					obj.resourceId = this.preOrderFromCart[i].goodsInfo[0].resourceNo
					obj.goodsParams = [];
					for(var j=0;j<this.preOrderFromCart[i].goodsInfo.length;j++){
						var obj2 = {};
						obj2.goodsId = this.preOrderFromCart[i].goodsInfo[j].goodsId,
						obj2.num = this.preOrderFromCart[i].goodsInfo[j].num,
						obj2.skuId = this.preOrderFromCart[i].goodsInfo[j].sku?this.preOrderFromCart[i].goodsInfo[j].sku.skuId:"",
						obj2.specId = this.preOrderFromCart[i].goodsInfo[j].sku?this.preOrderFromCart[i].goodsInfo[j].sku.specId:"",
						obj.goodsParams.push(obj2)
					}
					cards.push(obj)
				}
				var data = {
					data : JSON.stringify({orders:cards,couponCode:me.chooseCoupon.couponCode}),
					receiverId : me.address.id,
					storeId:me.storeId,
				}
				utils.submitOrder(data,(msg)=>{
					if(this.$root.$mp.query.ids){
						var data = {
							store:this.storeId,
                            cartIds: JSON.stringify(this.$root.$mp.query.ids.split(",")),
                        }
                        utils.deleteCartProduct(data,(msg)=>{
                            me.$store.dispatch("getCartList")
                        })
					}
					wx.redirectTo({
						url : '../pay/main?actualPrice='+this.price.actualPrice+'&num='+this.preOrderFromCart.length+'&orderNo='+msg
					})
				},(msg)=>{
					if(msg.resultCode==6504){
						wx.showModal({
							title: '提示',
							content: '部分商品已失效,请重新选择',
							showCancel : false,
							success: function(res) {
								if (res.confirm) {
									me.$store.dispatch("getCartList")
									wx.navigateBack()
								} 
							}
						})
					}else{
						wx.showToast({
							title : msg.returnObject,
							icon : "none",
							mask : true,
						})
					}
				})
			}else{
				utils.alert("请选择收货地址")
			}
			
		},
		goCoupon(){	// 功能： 点击“<”跳转到优惠券页面
			wx.navigateTo({
				url : "../coupon/main?list="+JSON.stringify(this.couponList)
			})
		}
	},
	onUnload() {
		this.$store.commit("chooseCou", {})
		this.$store.commit("chooseAdd", {})
		this.carids = ""
		this.preOrderFromCart = []
		this.userNum = 0
		this.from = 0//1购物车 2waimian
		this.couponList = []
	}
}
</script>
<style>
*{font-size:14px;font-style: normal;}
.container{padding: 0;}
.rt{float: right;}
.lf{float: left;}
.desc{color: #A2A2A2;}
.desc-fee:before{content: "x";}
.detail-address{
	display: table;
	width: 100%;
	vertical-align: middle;
	padding:6px .5rem;
	background: #fff;
}
.detail-address>div{
	display: table-cell;
	vertical-align: middle;
}
.address-left{
	width:14%;
	text-align: left;
}
.address-left,.address-center,.address-right{
	display: table-cell;
	vertical-align: middle;
}
.address-left img{
	width:1.3rem;
}
.address-center{
	width:74%;
	min-width: 240px;
	min-height:3rem;
}
.address-center h3{
	font-weight: normal;
	font-size:16px;
}
.address-center h3 span{
	font-size:inherit;
}
.address-center h3:before,.address-center h3:after,.sendInfo:before,.sendInfo:after,.sendInfo>div:before,.sendInfo>div:after,.main:before,.main:after,.sendInfo>div:after,.priceList>div:before,.priceList>div:after{
	content: '';
	clear: both;
	display: table;
}
.address-center .desc{font-size: 12px;}
.product-content-title{font-weight: normal;color: #1C1B20;letter-spacing: -0.43px;line-height: 26.5px;height: 26.5px;overflow: hidden;display: block;-webkit-box-orient: vertical;-webkit-line-clamp: 1;font-size:14px;text-overflow:ellipsis}
.product-content{float: left;width: calc(100% - 6rem);padding-left: 15px;position: relative;}
.unitPrice:before,.feeTotal:before,.feeSelf:before,.fee:before{content:"￥";}
.desc-parent{position: absolute;bottom:0;right:0;left:15px;font-size: 14px;}
.shoppingCar-product{border-top:1px solid #f0f0f0;border-bottom: 1px solid #F0F0F0;}
.detailList{margin-top: .8rem;background: #fff;}
#payment h1{position: relative; height: 50px;line-height: 50px;background: #fff;}
#payment h1 p{font-size: 16px;margin-left: 16px;}
#payment h1 span{position: absolute;top: 0;right: 91px; font-size: 12px;color: #a2a2a2;}
#payment h1 span b{font-weight: normal;font-size: 12px;color: #a2a2a2;}
#payment h1 i{position: absolute;right: 15px;top: 0;color: #aa2327;font-size: 18px;font-style: normal;}
#payment h1 i em{color: #aa2327;font-size: 18px;font-style: normal;}
.detail-bottom{
	position: fixed;
	left:0;
	bottom:1px;
	width:100%;
	display: table;
	background-color: #fff;
	padding:0 .5rem;
	margin-top:.8rem;
}
.detail-bottom>div{
	display: table-cell;
}
.detail-bottom-center{
	width: 55%;
}
.detail-bottom-right{
	text-align: right;
	width:30%;
}
.detail-bottom-right input{
	width:100%;
	color:#fff;
}
.feeTotal{
	font-weight: bold;
	color: #AA2327;
	font-size: 16px;
}
.priceList span {
    color: #606060;
}
.shoose-span {
    margin-left: .3rem;
    color: #606060;
}
#payment ul{background: #fff;}
#payment ul li{overflow: hidden; border-top:  1px solid #F0F0F0;}
#payment ul li>i{float: left; width: 20px;height: 20px;margin: 10px 15px;}
#payment ul li.alipay>i{background: url(https://store.iliujia.com/imgs/c/bk_payment.png) -7px -4px;}
#payment ul li.weChat>i{background: url(https://store.iliujia.com/imgs/c/bk_payment.png) -36px -5px;}
#payment ul li>span{float: left; height: 40px;line-height: 40px;color: #a2a2a2;}
.detailList .desc-parent .desc{width: 100%;}
#payment ul li b{float: right; display: inline-block; width: 22px;height: 22px;margin: 9px 10px;background: url(https://store.iliujia.com/imgs/c/bk_payment.png) -57px -3px;}

.shoppingCar-product{ margin-bottom:0; }
.priceList{ padding:0; }
.priceList .needPay{padding:0 15px; height:40px;line-height: 40px; }
.couponSpan span.rt{
	padding-right: 14px;
	position: relative;
}
.imgDiv{ float:left; width:90px; height:90px; overflow:hidden; }
.shoppingCar-product-content image{ width:100%; height:100%; }

.sendInfo>div{
    font-size: 14px;
    border-bottom: 1px solid #F0F0F0;
}
.detail-address{
	padding: 15px 10px 15px 15px;
	box-sizing: border-box;
}
.address-right{text-align: right;}
.address-right img{display: inline-block;}
.detail-address a{
	display: flex;
	align-items:center;
}
.address-center{
	min-height: 0;
	flex:1;
}
.address-center h3{
	letter-spacing: -0.49px;
	line-height: 22px;
}
.address-center .desc{
	color: #606060;
	letter-spacing: 0.03px;
}
.address-left{
	width: 21px;
	margin-right: 25px;
}
.address-left img{
	width: 21px;
	height: 24px;
}
.address-right{
	width: 22px;
	margin-left: 10px;
}
.address-right img{
	width: 22px;
	height: 22px;
}
.shoppingCar-product{
	padding: 15px;
}
.shoppingCar-product>div{
	height: auto;
}
.shoppingCar-product-content{
	display: flex;
	align-items:center;
}
.detailList .product-content{
	flex:1;
	display: flex;
	flex-direction:column;
	height:90px;
}
.sendInfo>div{
	height: 40px;
	line-height: 40px;
	padding: 0 15px;
}
.sendInfo>div.leaveMessage{
	height: auto;
	padding: 10px 15px;
}
.leaveWords{
	height: 40px;
	padding: 8px 0px;
    box-sizing: border-box;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    border: none;
}
.priceList>div{
	padding: 0 15px;
	height: 40px;
	line-height: 40px;
    font-size: 12px;
}
.priceList .couponSpan{
	padding: 0 10px 0 15px;
	position: relative;
}
.priceList .couponSpan img{
	height: 18px;
}
.detail-bottom{
	padding: 0 3px;
	height: 50px;
	line-height: 50px;
	box-sizing: border-box;
	font-size: 14px;
}
.detail-bottom .btn{
	height: 44px;
	line-height: 44px;
    font-size: 16px;
	background: #AA2327;
	border-radius: 0;
}
.detailList{
	margin-top: 10px;
}

</style>

