/*
    功能:  商品详情 商品信息组件
*/
<template>
    <div class="goodsPrice">
        <span class="goodsTitle">
            <b v-if="info.isFree">包邮</b>{{info.name}}
        </span>
        <i class="lowPrice"><b>¥{{info.priceSZ}}</b>.<em>{{info.priceSF}}</em></i>
        <i class="highPrice" v-if="info.priceDZ">~<b>¥{{info.priceDZ}}</b>.<em>{{info.priceDF}}</em></i>
        <p class="stock" v-if="info.saleValume">热销<b>{{info.saleValume}}</b></p>
        <button class="shareQr" open-type="share">
            <img src="https://store.iliujia.com/imgs/c/shareQr.png"/>
            <span>分享</span>
        </button>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
export default {
    props : ["goodsInfo"],
    computed : {
        info(){
            var msg = {...this.goodsInfo}
            if (msg.valid == "false") {
                utils.alert("该店铺授权已失效，请联系店主!");
            }
            if (msg.isFreeShipping == "y") {
                msg.isFree = 1
            }
            msg.max_price = msg.maxPrice;
            msg.ResourceNo = msg.ResourceNo || "暂无供应商信息";
            // if (msg.origin_price && msg.max_price) {
            //     msg.priceLow = msg.origin_price;
            //     msg.priceHig = msg.max_price;
            //     if (msg.priceHig == msg.priceLow) {
            //         msg.priceTotal = Number(msg.priceLow).toFixed(2);
            //         msg.priceSZ = msg.priceTotal.split(".")[0];
            //         msg.priceSF = msg.priceTotal.split(".")[1];
            //     } else {
            //         msg.priceTotal = Number(msg.priceLow).toFixed(2) + "~" + Number(msg.priceHig).toFixed(2);
            //         msg.priceSZ = Number(msg.priceLow).toFixed(2).split(".")[0];
            //         msg.priceSF = Number(msg.priceLow).toFixed(2).split(".")[1];
            //         msg.priceDZ = Number(msg.priceHig).toFixed(2).split(".")[0];
            //         msg.priceDF = Number(msg.priceHig).toFixed(2).split(".")[1];
            //     }
            // } else {
            //     msg.priceTotal = Number(msg.origin_price).toFixed(2) || Number(msg.max_price).toFixed(2);
            //     msg.priceSZ = msg.priceTotal.split(".")[0];
            //     msg.priceSF = msg.priceTotal.split(".")[1];
            // }
            return msg
        }
    },
}
</script>
<style>
button.shareQr{background-color: #fff;border:none;outline: none;padding-right: 0;box-shadow: 3px 3px 3px #fff;}
button:after{content: none}
</style>


