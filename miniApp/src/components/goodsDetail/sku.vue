<template>
    <div>
	<div class="addShopping" v-show="animation" @click="closeAni"></div>
    <div class="addInner thIndex"  :animation="animation">
        <div class="addHeader">
            <image :src="chooseCoverimg||goodsInfo.coverUrl" class="theme_border_color" mode="aspectFill"/>
            <ul>
                <li class="price" v-if="goodsInfo.origin_price!=goodsInfo.max_price&&!choosePrice">¥<em>{{goodsInfo.origin_price}}</em>~¥<em>{{goodsInfo.max_price}}</em></li>
                <li class="price" v-else>¥<em>{{choosePrice||goodsInfo.origin_price}}</em></li>
                <li class="stock">库存 <span>{{currentNum||goodsInfo.totalCurrentNum}}</span></li>
            </ul>
            <i @click="closeAni"><img src="https://store.iliujia.com/imgs/c/cut.png"></i>
        </div>
        <div class="addSelect">
            <div class="commonSelect" v-for="(item,index) in goodsList" :key="index">
                <h2 :attrname="item.name">{{item.name}}</h2>
                <ul>
                    <li v-for="(items,indexs) in item.list" :key="indexs" :val="items" @click="chooseSku(index,items,indexs)" :class="indexs==currentList[index]?'selected':''">{{items}}</li>
                </ul>
                <span v-if="pages" class="getMoreGoods colorBorder-Template" :id="modulesData.id">查看更多</span>
            </div>
        </div>
        <div class="numSelect">
            <span>购买数量</span>
            <ul>
                <li class="reduceNum" @click="minusNum">-</li>
                <li class="nowNum"><input type="number" :value="num" @change="inputFn(num)"></li>
                <li class="addNum" @click="addNum">+</li>
            </ul>
            <ul class="butBtn">
                <li class="addCarButton indexAdd" status="1" @click="addCar">加入购物车</li>
                <li class="canBuy indexBuy addCarButton" status="2" id="936" goodsid="1438" @click="goRight">立即下单</li>
            </ul>
        </div>
    </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js';
export default {
    data(){
        return {
            goodsInfo :  {},
            goodsList : [],
            chooseList : [],
            choosePrice : 0,
            currentNum : 0,
            choosesskuId : 0,
            chooseCoverimg : "",
            currentList : [],
            num :1,
            animation:'',
        }
    },
    props : ["goodsInfo","editor"],
    methods : {
        chooseSku : function(index,items,indexs){
            this.$set(this.chooseList,index,items);
            this.$set(this.currentList,index,indexs);
            this.isWho();
        },
        isWho : function(){
            var me = this;
            var newArr = [...this.goodsInfo.skuInfos];
            var newObj = [];
            for(var i=0;i<newArr.length;i++){
                var n = 0;
                for(var j=0;j<me.chooseList.length;j++){
                    if(newArr[i].attributes[j].attrVal == me.chooseList[j]||me.chooseList[j]==""){
                        n++
                        if(n == me.chooseList.length){
                            if(newArr[i].currentNum>0){
                                newObj.push(newArr[i])
                            }
                        }
                    }
                }
            }
            if(newObj.length == 1){
                this.choosePrice = newObj[0].sellPrice
                this.currentNum = newObj[0].currentNum
                this.choosesskuId = newObj[0].id
                this.chooseCoverimg = newObj[0].attributes.map(function(i){
                    return i.imgUrl || ""
                }).join("")
            }
            this.showList = newObj[0].attributes.map(function(v,i){
                return newObj.map(function(g){
                    return g.attributes[i].attrVal
                })
            })
        },
        minusNum : function(){
            this.num>1?this.num--:1
        },
        addNum : function(){
            if(this.currentNum){
                this.num<this.currentNum?this.num++:this.currentNum
            }else{
                utils.alert("请先选择规格")
            }
        },
        goRight : function(){
            if(this.choosePrice){
                var data = {
                    goodsId : this.goodsInfo.id,
                    skuId : this.choosesskuId||"",
                    num : this.num,
                }
                this.$store.commit('goodsDetail',data);
                this.closeAni();
                this.$emit("closeAni",1);
                wx.navigateTo({
                    url: '../preorder/main?data='+JSON.stringify(data)
                })
            }else{
                 utils.alert("请先选择规格")
            }
        },
        addCar : function(){
            if(this.choosePrice){
                var data = {
                    goodsId : this.goodsInfo.id,
                    num : this.num,
                }
                if(this.choosesskuId){
                    data.skuId = this.choosesskuId
                }
                utils.saveProductToCart(data,(msg)=>{
                    this.$store.dispatch("getCartList")
                    utils.alert("添加成功",'success')
                    this.closeAni();
                })
            }else{
                 utils.alert("请先选择规格")
            }
        },
        closeAni : function(){
            this.animation = wx.createAnimation({
                duration: 300,
                timingFunction: 'linear',
            }).translateY('100%').step().export();
            this.goodsList = [];
            this.chooseList = [];
            this.choosePrice = 0;
            this.currentNum = 0;
            this.choosesskuId = 0;
            this.chooseCoverimg = "";
            this.currentList = [];
            this.num = 1;
            this.$emit("closeAni",1);
        },
        inputFn : function(e){
            console.log(e)
        }
    },
    watch : {
        editor : function(v){
            console.log(v)
            if(v==1){
                var me = this;
                var goodsSku = this.goodsInfo
                if(goodsSku.skuInfos.length){
                    this.goodsList = goodsSku.skuInfos[0].attributes.map(function(v,i){
                        var obj = {name : v.attrName}
                        me.chooseList.push("");
                        me.currentList.push(-1);
                        obj.list = Array.from(new Set(goodsSku.skuInfos.map(function(g) {
                            return g.attributes[i].attrVal;
                        })))
                        return obj
                    })
                }else{
                    this.choosePrice = goodsSku.origin_price;
                    this.currentNum = goodsSku.totalCurrentNum;
                }
                this.animation = wx.createAnimation({
                    duration: 300,
                    timingFunction: 'linear',
                }).translateY(0).step().export();
            }
        }
    }, 
}
</script>
<style>
.addShopping{position: fixed;bottom:0;right: 0;top: 0;left: 0; cursor: pointer;background: rgba(0,0,0,0.50);z-index: 999;}
.addInner{position: fixed;left: 0;bottom: 0;width: 100%; background: #fff;z-index: 999;font-size: 14px;transform: translate3d(0,100%,0)}
.addInner .addHeader{position: relative; height: 70px;}
.addInner .addHeader>image{position: absolute;left: 13px;top: -35px; width: 90px;height: 90px;border: 1px solid #ff5200;}
.addInner .addHeader ul{margin-left: 117px;padding-top: 8px;}
.addInner .addHeader ul li.price{font-size: 20px;color: #AA2327;}
.addInner .addHeader ul li.price em{font-size: 20px;color: #AA2327;font-style: normal;}
.addInner .addHeader ul li.stock,.addInner .addHeader ul li.stock span{font-size: 12px;color: #a2a2a2;}
.addInner .addHeader i{position: absolute;right: 0px;top: 0px; display: inline-block;width: 40px;height: 40px; }
.addInner .addHeader i img{width: 20px;height: 20px;margin:10px 5px;}
.addInner .addSelect{max-height: 230px;overflow-y:scroll;}
.addInner .addSelect .commonSelect{border-top: 1px solid #F0F0F0;min-height: 90px;}
.addInner .addSelect .commonSelect h2{margin: 10px 15px;font-weight: normal;}
.addInner .addSelect .commonSelect ul{overflow: hidden;margin: 0 7px 2px 7px;}
.addInner .addSelect .commonSelect ul li{float: left; margin:0 0 8px 8px;color: #a2a2a2; background: #fff;border: 1px solid #979797;border-radius: 20px;text-align: center;padding: 2px 10px;}
.addInner .addSelect .commonSelect ul li.b{border: 1px dotted #ccc;color: #ddd;}
.addInner .addSelect .commonSelect ul li.selected{color: #fff;border: none;background: #ff5200;border: 1px solid #ff5200;}
.addInner .numSelect{height: 40px; border-top: 1px solid #F0F0F0;border-bottom: 1px solid #F0F0F0;}
.addInner .numSelect span{display: inline-block;line-height: 40px;margin-left: 15px;}
.addInner .numSelect ul{float: right;overflow: hidden;margin: 6.5px 15px;}
.addInner .numSelect ul li{float: left;width: 25px;height: 25px;line-height: 25px; background: #f0f0f0;margin-right: 2px;text-align: center;}
.addInner .numSelect ul li.addNum,.addInner .numSelect ul li.reduceNum{color: #a2a2a2;width: 45px;font-family: monospace;}
.addInner .numSelect ul li.nowNum input{background: #f0f0f0;outline: none;border: none;width: 100%;height: 100%; text-align: center;}
.addInner ul.butBtn{width: 100%;margin:0 auto;padding: 10px 15px;overflow: hidden;box-sizing: border-box;}
.addInner ul.butBtn li{float: left;width: 100%;color: #fff;font-size: 16px;height: 50px;line-height: 50px;text-align: center;margin: 0;}
.addInner.thIndex .butBtn li{width: 50%; }
.addInner ul li.addCarButton.indexAdd{background: #1C1B20;}
.addInner ul li.addCarButton.cantBuy{background: #a2a2a2 !important;color: #fff;}
.addInner .butBtn .indexBuy{display: none;}
.addInner.thIndex .indexBuy{background: #AA2327!important;display: inline-block;}

.weui-toast{padding: 0 5px;}
/* .weui-toast{width: 88px;height: 88px;min-height:88px;}  */
.weui-toast--forbidden .weui-icon_toast{font-size: 30px;margin-top: 25px;}
.weui-toast_content{font-size: 12px;}
.weui-dialog, .weui-toast{top: auto;bottom: 200px;}
.weui-icon-success-no-circle{margin-top: 10px;}
</style>


