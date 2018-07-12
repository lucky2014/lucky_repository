<template>
    <div>
    <div class="main">
        <div class="shoppingCar-product myicon-checked-box" v-for="(carList,indexs) in shoppingCarList.data" :key="indexs" :data-status="carList.uglyName" @click="payGoods(carList,indexs)">
            <div class="shoppingCar-product-left">
                <span :class="'myicon-checked ' + carList.isChoose||''"></span>
            </div>
            <div class="shoppingCar-product-content">
                <div class="coverUrl">
                    <image :src="carList.storeGoodsInfoBase.coverUrl"/>
                </div>
                <div class="product-content-box product-content">
                    <h3 class="product-content-title" v-show="editor==0">{{carList.storeGoodsInfoBase.name}}</h3>
                    <p class="unitPrice fee-parent" v-show="editor==1">{{carList.goodsSku.sellPrice||carList.storeGoodsInfoBase.originPrice}}</p>
                    <p class="desc zhanshi" v-show="editor==0"><span v-for="(item,index) in carList.skuAttr" :key="index">{{item.attrVal}}&nbsp;</span></p>
                    
                    <p class="desc-parent">
                        <span class="desc" v-show="editor==0"><i class="feeSelf">{{carList.goodsSku.sellPrice||carList.storeGoodsInfoBase.originPrice}}</i><i class="rt desc-fee">{{carList.num}}</i></span>
                        <span class="shopFee-parent" v-show="editor==1"  @click.stop.prevent="emptyFn">
                            <i class="del shopFee-span" value="-" name="" @click.stop.prevent="descFn(indexs,carList.goodsId,carList.num,carList.skuId,carList.goodsSku.currentNum||carList.storeGoodsInfoBase.totalCurrentNum)">-</i>
                            <span class="shopFee"><b class="shopFee-cur">{{carList.num}}</b></span>
                            <i class="add shopFee-span" value="+" name="" @click.stop.prevent="addFn(indexs,carList.goodsId,carList.num,carList.skuId,carList.goodsSku.currentNum||carList.storeGoodsInfoBase.totalCurrentNum)">+</i>
                        </span>
                    </p>
                    <input type="button" :class="'btn '+carList.resource+' delete rt'" value="删除" name=""  v-show="editor==1" @click.stop.prevent="singleDelectFn(indexs,carList.id)">
                </div>
                
            </div>
        </div>
        <!-- 功能： 清楚已失效商品 -->
        <input type="button" value="清空失效商品" id="clearChoose" @click="delectnouse" v-if="overList.length">
        <div class="shoppingCar-product myicon-checked-box" v-for="(carList,indexs) in overList" :key="indexs" :data-status="carList.uglyName">
            <div class="shoppingCar-product-left">
                <span class="myicon-checked"></span>
            </div>
            <div class="shoppingCar-product-content">
                <div class="coverUrl">
                    <div>已失效</div>
                    <image :src="carList.storeGoodsInfoBase.coverUrl"/>
                </div>
                <div class="product-content-box product-content">
                    <h3 class="product-content-title">{{carList.storeGoodsInfoBase.name}}</h3>
                    <!-- <p class="unitPrice fee-parent" v-show="editor==1">{{carList.goodsSku.sellPrice||carList.storeGoodsInfoBase.originPrice}}</p> -->
                    <p class="desc zhanshi"><span v-for="(item,index) in carList.skuAttr" :key="index">{{item.attrVal}}&nbsp;</span></p>
                    
                    <p class="desc-parent">
                        <span class="desc"><i class="feeSelf">{{carList.goodsSku.sellPrice||carList.storeGoodsInfoBase.originPrice}}</i><i class="rt desc-fee">{{carList.num}}</i></span>
                        <!-- <span class="shopFee-parent" v-show="editor==1">
                            <input class="del shopFee-span" type="button" value="-" name="" @click.stop.prevent="descFn(indexs,carList.goodsId,carList.num,carList.skuId,carList.goodsSku.currentNum||carList.storeGoodsInfoBase.totalCurrentNum)">
                            <span class="shopFee"><b class="shopFee-cur">{{carList.num}}</b></span>
                            <input class="add shopFee-span" type="button" value="+" name="" @click.stop.prevent="addFn(indexs,carList.goodsId,carList.num,carList.skuId,carList.goodsSku.currentNum||carList.storeGoodsInfoBase.totalCurrentNum)">
                        </span> -->
                    </p>
                    <!-- <input type="button" :class="'btn '+carList.resource+' delete rt'" value="删除" name=""  v-show="editor==1" @click.stop.prevent="singleDelectFn(indexs,carList.id)"> -->
                </div>
                
            </div>
        </div>
    </div>
    <div class="shoppingCar-bottom container-fixed">
        <div class="complete-bottom" v-show="editor==0">
            <div class="bottom_box">
                <div class="shoppingCar-bottom-left" @click="allChoose(chooseNum == shoppingCarList.data.length?1:0)">
                    <span :class="'myicon-checked checkAll ' + (chooseNum == shoppingCarList.data.length?'active':'')"></span>
                    <span class="chooseAll shoose-span">
                        全选
                    </span>
                </div>
                <div class="shoppingCar-bottom-center">
                    <span class="feeTotal caiyuanbao">{{totalPrice}}</span>
                    <span class="desc">(不含运费等)</span>
                </div>
                <div class="shoppingCar-bottom-right">
                    <button type="button" :class="chooseNum?'btn caiyuanbao':'btn caiyuanbao disabled'" id="balance" :disabled="chooseNum?false:true" name="" @click="payFn">{{'结算'+(chooseNum?'('+chooseNum+')':'')}}</button>
                </div>
            </div>
        </div>
        <div class="edit-bottom" v-show="editor==1">
            <div class="bottom_box">
                <div class="shoppingCar-bottom-left" @click="allChoose(chooseNum == shoppingCarList.data.length?1:0)">
                    <span :class="'myicon-checked checkAll ' + (chooseNum == shoppingCarList.data.length?'active':'')"></span>
                    <span class="choosed shoose-span">全选({{chooseNum}})</span>
                </div>
                <div class="shoppingCar-bottom-right">
                    <button type="button" :class="chooseNum?'btn caiyuanbao':'btn caiyuanbao disabled'" id="deleteChoose" name="" :disabled="chooseNum?false:true" @click.stop.prevent="deleteFn">删除所选</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import index from '../../store/info';
export default {
	data (){
		return {
            payList : [],
            chooseList : [],
            chooseNum : 0,
            totalPrice : "0.00",
            overList : [],
		}
	},
    props : ["editor"],
    mounted(){
        
    },
    computed: {
        shoppingCarList(vue){
            var listAll = {...vue.$store.state.info.cartList}
			var list1 =  []
            var overList = []
            var status = ["","sold",'soldOut','unshelf','delete','gongyingshangXiajia'];
            listAll.data.map(function(v){
                if(v.goodsSku.currentNum){
                    if(v.goodsSku.currentNum<v.num){
                        v.uglyName = "buzu"
                        overList.push(v)
                    }else{
                        if(v.storeGoodsInfoBase.status==1&&v.goodsSku.status==2){
                            v.uglyName = 'delete'
                            overList.push(v)
                        }else{
                            v.uglyName =  status[v.storeGoodsInfoBase.status]
                            if(v.storeGoodsInfoBase.status == 1||v.storeGoodsInfoBase.status == 0){
                                list1.push(v)
                            }else{
                                overList.push(v)
                            }
                        }
                    }
                }else if(v.storeGoodsInfoBase.totalCurrentNum){
                    if(v.storeGoodsInfoBase.totalCurrentNum<v.num){
                        v.uglyName = "buzu"
                        overList.push(v)
                    }else{
                        if(v.storeGoodsInfoBase.status==1&&v.goodsSku.status==2){
                            v.uglyName = 'delete'
                            overList.push(v)
                        }else{
                            v.uglyName =  status[v.storeGoodsInfoBase.status]
                            if(v.storeGoodsInfoBase.status == 1||v.storeGoodsInfoBase.status == 0){
                                list1.push(v)
                            }else{
                                overList.push(v)
                            }
                        }
                    }
                }
            })
            this.overList = overList
            return {data : list1}
        },
        storeId(vue){
            return vue.$store.state.info.storeInfo.id
        }
    },
	methods : {
		payGoods(data,index){ // 功能： 点击商品“选择”后,
            if(this.shoppingCarList.data[index].isChoose == 'active'){
                this.shoppingCarList.data[index].isChoose = '';
                this.chooseNum--
            }else{
                this.shoppingCarList.data[index].isChoose = 'active';
                this.chooseNum++
            };
            this.totalPriceFn();
        },
        deleteFn(){
            var me = this;
            wx.showModal({
				title: '确认删除?',
				content: '您是否确定要删除所选产品吗?',
				success: function(res) {
					if (res.confirm) {
                        var deleteList =  me.choose();
                        var carId = deleteList.map(function(v){
                            return v.id
                        })
						var data = {
                            storeId: this.storeId,
                            cartIds: JSON.stringify(carId),
                        }
                        utils.deleteCartProduct(data,(msg)=>{
                            var obj = [...me.shoppingCarList.data]
                            carId.map(function(v,i){
                                obj.map(function(v2,i2){
                                    if(v=v2.id){
                                        me.shoppingCarList.data.splice(i2,1)
                                    }
                                })
                            })
                            me.chooseNum = 0
                            me.$store.commit("getCartList",me.shoppingCarList)
                        })
					} else if (res.cancel) {

					}
				}
			})
        },
        choose(){   // 功能： 获取已经选择加入结算的商品
            var newList = [];
            for(var i=0;i<this.shoppingCarList.data.length;i++){
                if(this.shoppingCarList.data [i].isChoose == 'active'){
                    newList.push(this.shoppingCarList.data[i])
                }
            }
            return newList
        },
        payFn(){    // 功能:  点击“结算”后，跳转结算页面
            var payList = this.choose();
            var carId = payList.map(function(v){
                return v.id
            })
            this.$emit("carids",carId)
        },
        totalPriceFn(){
            var total = 0;
            for(var i=0;i<this.shoppingCarList.data.length;i++){
                if(this.shoppingCarList.data[i].isChoose == 'active'){
                    total += (this.shoppingCarList.data[i].goodsSku.sellPrice||this.shoppingCarList.data[i].storeGoodsInfoBase.originPrice) * this.shoppingCarList.data[i].num
                }
            }
            this.totalPrice = total.toFixed(2)
        },
        singleDelectFn(indexs,goodsId){
            var me = this;
            wx.showModal({
				title: '确认删除?',
				content: '您是否确定要删除所选产品吗?',
				success: function(res) {
					if (res.confirm) {
						var data = {
                            storeId: me.storeId,
                            cartIds: JSON.stringify([goodsId]),
                        }
                        utils.deleteCartProduct(data,(msg)=>{
                            me.shoppingCarList.data.splice(index,1);
                            me.$store.commit("getCartList",me.shoppingCarList)
                            me.chooseNum--
                        })
					} else if (res.cancel) {

					}
				}
			})
        },
        descFn(indexs,goodsId,num,skuId,allnum){
            var me = this;
            if(num>1){
                num--
                var data = {
                    storeId: this.storeId,
                    goodsId: goodsId,
                    num: num,
                }
                if(skuId||skuId!=undefined){
                    data.skuId = skuId
                }
                utils.updateCartProductsCount(data,(msg)=>{
                    me.shoppingCarList.data[indexs].num = num
                    me.$store.commit("getCartList",me.shoppingCarList)
                })
            }
        },
        addFn(indexs,goodsId,num,skuId,allnum){
            var me = this;
            if(num<allnum){
                num++
                var data = {
                    storeId: me.storeId,
                    goodsId: goodsId,
                    num: num,
                }
                if(skuId||skuId!=undefined){
                    data.skuId = skuId
                }
                utils.updateCartProductsCount(data,(msg)=>{
                    me.shoppingCarList.data[indexs].num = num
                    me.$store.commit("getCartList",me.shoppingCarList)
                })
            }
        },
        allChoose(choose){  // 功能： 点击“全选”后
            if(!choose){
                this.shoppingCarList.data.map(function(v){
                    v.isChoose = "active"
                })
                this.chooseNum = this.shoppingCarList.data.length
            }else{
                this.shoppingCarList.data.map(function(v){
                    v.isChoose = ""
                })
                this.chooseNum = 0
            }
            this.totalPriceFn();
        },
        delectnouse(){
            var me = this;
            wx.showModal({
				title: '确认删除?',
				content: '您是否确定要删除所选产品吗?',
				success: function(res) {
					if (res.confirm) {
                        var ids = [];
                        me.overList.map(function(v){
                            ids.push(v.id)
                        })
                        var data = {
                            storeId: me.storeId,
                            cartIds: JSON.stringify(ids),
                        }
                        utils.deleteCartProduct(data,(msg)=>{
                            me.$store.dispatch("getCartList")
                        })
					} else if (res.cancel) {

					}
				}
			})
        },
        emptyFn(){
            return false
        }
    },
    watch : {
        shoppingCarList(v){
            if(v){
                this.totalPrice = "0.00"
                this.chooseNum = this.choose().length
            }
        },
        editor(v){
            this.totalPriceFn();
        }
    },
}
</script>
<style>
.main{position: absolute;left: 0;right: 0;overflow-y: scroll;top: 44px;bottom: 50px;}
.shoppingCar-product{background:#fff;padding: 14px;margin-bottom: 7px;border-top: 1px solid #f0f0f0;border-bottom: 1px solid #F0F0F0;overflow: hidden;}
.shoppingCar-product-left{height:84px;float: left;position: relative;width: 10%;}
.shoppingCar-product-left .myicon-checked{position: absolute;top: 50%;width: 21px;height: 21px;margin-top: -10.5px;border-radius: 50%;border: 1px solid #A2A2A2;}
.myicon-checked.active{background: url(https://store.iliujia.com/imgs/b/selecteIcon.png) no-repeat;background-size: 21px 21px;background-position: -1px -1px;background-color: #ff5200;border-color: #ff5200;}
.shoppingCar-product-content{float: left;display: flex;width: 90%;height: 84px;}
.shoppingCar-product-content>.coverUrl{width: 84px;height: 84px;float: left;position: relative}
.shoppingCar-product-content>.coverUrl div{background: rgba(0,0,0,.5 );position: absolute;top: 0;left: 0;right: 0;bottom: 0;line-height: 84px;text-align: center;font-size: 14px;color: #fff;}
.shoppingCar-product-content>.coverUrl image{width: 84px;height: 84px;}
.product-content-box{padding-left: 14px;width: 68%;position: relative;}
.product-content-title{font-weight: normal;color: #1C1B20;letter-spacing: -0.43px;line-height: 24px;height: 24px;overflow: hidden;display: block;-webkit-box-orient: vertical;-webkit-line-clamp: 1;font-size: 14px;text-overflow: ellipsis;white-space: nowrap;width: 100%;}

.desc.zhanshi{font-size: 12px;line-height: 17px; overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;color: #A2A2A2;}
.desc-parent{position: absolute;bottom: 0;left: 14px;width: 95%;}
.desc-parent .desc{font-size: 12px;line-height: 15px;}
.feeSelf{font-size: 14px;}
.feeSelf:before{content: "￥";}
.rt{float: right;}
.desc-fee{color: #A2A2A2;font-size: 12px;line-height: 25rpx;}
.desc-fee:before {content: "x";}
.shopFee-parent{float: left;}
.delete {height: 100%;position: absolute;right: -26px;top: 0;background-color: #AA2327;font-size: 16px;padding: 0 20px;padding-right: 30px;border-radius: 0;text-align: center;font-size: 16px;color: #fff;line-height: 84px;}
.unitPrice:before, .feeTotal:before, .feeSelf:before, .fee:before {content: "￥";}
.productList.edit-active .shopFee-parent {overflow: hidden;min-width: 136px;float: left;}
.shopFee-span {width: 28px;outline: none;border: none;background-color: #F0F0F0;padding:0 8px;height: 32px;line-height:32px;color: #A2A2A2;float: left;letter-spacing: -0.38px;box-sizing:content-box;border-radius: 0px;text-align: center}
.shopFee {width: 32px;overflow: hidden;outline: none;display: inline-block;min-width: 32px;float: left;height: 32px;line-height: 32px;text-align: center;position: relative;margin:0 8px;background-color: #F0F0F0;font-size:14px;}
.fee-parent{font-size: 14px;}
.myicon-checked-box[data-status="sold"] .coverUrl::before{
	display: none;
}
/* .myicon-checked-box[data-status="soldOut"] .coverUrl::after{
	content: "已失效";
	line-height: 84px;
    height: 84px;
} */
.myicon-checked-box[data-status="soldOut"] .shoppingCar-product-left .myicon-checked,
.myicon-checked-box[data-status="unshelf"] .shoppingCar-product-left .myicon-checked,
.myicon-checked-box[data-status="delete"] .shoppingCar-product-left .myicon-checked,
.myicon-checked-box[data-status="gongyingshangXiajia"] .shoppingCar-product-left .myicon-checked,
.myicon-checked-box[data-status="buzu"] .shoppingCar-product-left .myicon-checked{
	display: none;
}
/* .myicon-checked-box[data-status="unshelf"] .coverUrl::after{
    background: #000;
    width: 84px;
	content: "已失效";
	line-height: 84px;
    height: 84px;
}
.myicon-checked-box[data-status="delete"] .coverUrl::after{
	content: "已失效";
	line-height: 84px;
    height: 84px;
}
.myicon-checked-box[data-status="gongyingshangXiajia"] .coverUrl::after{
	content: "已失效";
}
.myicon-checked-box[data-status="buzu"] .coverUrl::after{
	content: "库存不足";
} */
#clearChoose{width:50%;display: block;margin:10px auto;padding: 6px 0;outline: none;border:none;background-color: #AA2327;color:#fff;border: none;border-radius:0;font-size: 14px;}
</style>


