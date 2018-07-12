<template>
    <div v-if="modulesList.length" :festivalButton="festivalButton">
        <h2>
            <i class="borderColor-template"></i>
            <em class="preImg"></em>
            <span class="colorTemplate">{{modulesData.moduleName}}</span>
            <i class="borderColor-template"></i>
            <em class="afterImg"></em>
        </h2>
        <ul class="home_shopGoods">
            <li v-for="(item,index) in modulesList" :key="index" :goodsId="item.id" class="micro"  @click="goDetail(item.id)">
                <image v-if="item.typeId" :src="item.coverUrl" class="coverUrl"/>
                <image v-else :src="item.coverUrl" class="coverUrl"/>
                <festivalButton v-if="festivalButton == 'y'" />
                <p>
                    <span>
                        <b v-if="item.isFree">包邮</b>
                        {{item.name}}
                    </span>
                    <i v-if="item.priceSZ"><b>¥{{item.priceSZ}}</b><em>.{{item.priceSF}}</em></i>
                    <i v-else><b>¥{{item.originPrice}}</b></i>
                    <img src="/static/addCar_grey.png" class="addToCar" @click.stop.prevent="addGoods(item.id)"/>
                </p>
            </li>
        </ul>
        <span v-if="more" class="getMoreGoods colorBorder-Template" :id="modulesData.id"  @click.stop.prevent="lookMore(modulesData.moduleName,modulesData.id)">查看更多</span>
    </div>
</template>
<script>
import utils from '../../utils/index.js';
import festivalButton from '@/components/festivalButton.vue'
export default {
    data(){
        return{
            modulesList:"",
            more : 0,
        }
    },
    props : ["modulesData", "festivalButton"],
    mounted(){
        var me = this;
        var data = {
            moduleRelId: this.modulesData.id,
            pageNum: 1,
            pageSize: this.modulesData.typeId==2?4:5,
        }
        utils.listStoreProductsForModules(data,(msg)=>{
            if(msg.data.length){
                me.modulesList = msg.data.map(function(v){
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
                if(msg.page.pages>1){
                    this.more = 1;
                }else{
                    this.more = 0;
                }
                this.$emit("isempty",0)
            }else{
                this.$emit("isempty",1)
            }
        })
    },
    methods : {
        addGoods : function(id){
            this.$emit("goodsid",id);
        },
        goDetail(id){
            wx.navigateTo({
                url : '../goodsDetail/main?id='+id
            })
        },
        lookMore(moduleName,id){
            wx.navigateTo({
                url : '../goodsList/main?name='+moduleName+"&id="+id
            })
        }
    },
    components: {
        festivalButton
    }
}
</script>
<style>
em{display: inline;}
b{display: inline;}
i{display: inline;}
.goods_container{margin: 0 10px;}
.goods_container ul{overflow: hidden;}
.goods_container ul li{background: #fff;}

.goods_container.bigPics ul li{position: relative; display: inline-block;float: left; width: 100%;margin-bottom: 10px;padding-bottom: 10px;}
.goods_container.bigPics ul li p,.picsContent p{margin-top: 8px;}
.goods_container.bigPics ul li p span,.picsContent p span{color: #1b1b1b;letter-spacing: -0.38px;margin: 10px 6px;line-height: 19px;font-size: 14px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;}
.picsContent p span{-webkit-line-clamp: 2;width: 77%;}
.picsContent p span.goodsName{min-height: 35px;}
.goods_container.bigPics ul li p i,.picsContent p i{display: inline-block;line-height: 34px;height: 34px; font-style: normal; color: #aa2327;font-size: 20px;letter-spacing: -0.54px;margin-left: 6px;}
.picsContent p{position: relative;}
.picsContent p b{font-weight: normal;color: #A0A0A0;float: right;margin-top: 4px;font-size: 12px;}
.picsContent p .addToCar{position: absolute;right: 20px;top: 24px;width: 34px;height: 34px;}
.goods_container.bigPics ul li .addToCar{position: absolute;right: 6px;bottom: 10px;width: 34px;height: 34px; }
.picsContent .buyIm{display: block;background: #AA2327;border-radius: 26px;text-align: center;font-size: 16px;color: #FFFFFF;width: 100%; height: 40px;line-height: 40px;margin-top: 10px;margin-bottom: 0;}
.goods_container.bigPics image{width: 355px;height: 355px;}

.goods_container.onePics ul li{position: relative;margin-bottom: 10px;overflow: hidden;}
.goods_container.onePics ul li>image{float: left; width: 100px;height: 100px;}
.goods_container.onePics ul li p{float: right; width: 70%;padding: 10px 0;}
.goods_container.onePics ul li p span{color: #1b1b1b;padding-right: 5px; letter-spacing: -0.37px;font-size: 14px; margin-bottom: 5px; min-height: 0; line-height: 19px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.goods_container.onePics ul li p i{position: absolute;bottom: 4.5px;height: 34px; font-style: normal; color: #aa2327;font-size: 16px;}
.goods_container.onePics ul li .addToCar{position: absolute;bottom: 10px;right:6px;width: 34px;height: 34px;}

.goods_container.twoPics ul li{position: relative; display: inline-block;float: left; width: 48.5%;margin-bottom: 10px;padding-bottom: 10px;}
.goods_container.twoPics ul li:nth-child(2n-1) {margin-right: 3%;}
.goods_container.twoPics ul li p{margin-top: 8px;}
.goods_container.twoPics ul li p span{color: #1b1b1b;letter-spacing: -0.38px;margin: 10px 6px; line-height: 19px;font-size: 14px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.goods_container.twoPics ul li p i{display: inline-block;line-height: 34px;height: 34px; font-style: normal; color: #aa2327;font-size: 20px;letter-spacing: -0.54px;margin-left: 6px;}
.goods_container.twoPics ul li p .addToCar{position: absolute;right: 6px;bottom: 10px;width: 34px;height: 34px;}
.goods_container.twoPics ul li>image{width: 100%;height: 172px;}

.goods_container.thirdPics ul li{position: relative; display: inline-block;float: left; width: 48.5%;margin-bottom: 10px;padding-bottom: 10px;}
.goods_container.thirdPics ul li:nth-child(2n-2) {margin-right: 3%;}
.goods_container.thirdPics ul li>image{width: 100%;height: 172px}
.goods_container.thirdPics ul li p{margin-top: 8px;}
.goods_container.thirdPics ul li p span{color: #1b1b1b;letter-spacing: -0.38px;margin: 10px 6px;  line-height: 19px;font-size: 14px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.goods_container.thirdPics ul li:first-child{width: 100%;}
.goods_container.thirdPics ul li:first-child>image{width: 100%;height: 355px;}
.goods_container.thirdPics ul li:first-child p span{min-height: 0;font-size: 16px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;}
.goods_container.thirdPics ul li p i{display: inline-block;line-height: 34px;height: 34px; font-style: normal; color: #aa2327;font-size: 20px;letter-spacing: -0.54px;margin-left: 6px;}
.goods_container.thirdPics ul li .addToCar{position: absolute;right: 6px;bottom: 10px;width: 34px;height: 34px;}
.goods_container ul li p span b{ display:inline-block; width:35px; height:18px; font-size:12px; line-height:16px; text-align:center; vertical-align:middle; background:#AA2327; color:#fff; border-radius:2px; margin-top:-2px; font-weight:normal; }

.goods_container ul li>img{ width: 100%;}

#picsOuter{display: none; position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
#picsOuter .goodsPics{position: absolute;left: 10%;top: 50%;-webkit-transform: translate(0,-50%);width: 80%;}
#picsOuter .goodsPics .picsContent{ background: #fff;}
#picsOuter .goodsPics p{margin-top: 0;padding: 20px 20px 15px;}
.goodsPics .close{position: relative; display: block; width: 40px;height: 40px;margin: 24.5px auto 0;cursor: pointer;}
.goodsPics .close img{position: absolute;top: 5.5px;left: 5.5px; width: 29px;height: 29px;}

#picsOuter.serviceOuter{background: #000;}
#picsOuter .goodsPics.servicePics{left: 0;width: 100%;}

.goods_container ul li p i b{font-size: 20px;font-weight: normal;}
.goods_container ul li p i em{font-size: 14px;font-style: normal;}
.getMoreGoods{display: block; width: 100px;height: 28px;line-height: 26px;text-align: center;margin: 15px auto 20px; border-radius: 20px;border-width: 1px;border-style: solid;color: #a2a2a2; border: 1px solid #A2A2A2;font-size: 14px;box-sizing: border-box;}

.micro{ 
    position: relative;
} 
</style>


