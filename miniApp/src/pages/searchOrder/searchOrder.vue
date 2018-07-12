<template>
    <div>
       <div class="header">
           <div class="input">
               <img src="https://store.iliujia.com/imgs/c/searchIcon.png" alt="">
               <input placeholder="搜索订单号、手机号、收货人" confirm-type="search" @confirm="bindconfirm" focus="true"/>
           </div>
       </div>
		<div class="orderListDiv">
            <orderlist  :orderList="orderList"/>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import orderlist from '@/components/orderList/orderlist.vue'
export default {
    data(){
        return {
            orderList : {data:[]},
        }
    },
    methods : {
        bindconfirm(e){
            var data = {
                status: 0,
                searchParam: e.target.value,
                pageNum: 1,
                pageSize: 100,
            }
            utils.listOrders(data,(msg)=>{
				this.orderList = msg
			})
        }
    },
    components:{
        orderlist,
    },
    onUnload(){
        this.orderList = {data:[]}
    }
}
</script>
<style>
.header{overflow: hidden;background: #fff;padding: 7px 15px;position: fixed;top: 0;
left: 0;right: 0;z-index: 99;}
.input{position: relative;float: left;display: inline-block;width: 100%;height: 30px;background: #f0f0f0;border-radius: 4px;border: 0;padding: 0 15px 0 35px;box-sizing: border-box;}
.header img{position: absolute;top: 7.5px;left: 7.5px;width: 15px;height: 15px;}
.header input{font-size: 14px;line-height: 30px;height: 30px;}
.orderListDiv{padding-top: 50px;}
</style>


