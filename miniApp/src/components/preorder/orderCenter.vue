<template>
    <div>
        <div class="main detailList getValueByAttr" v-for="(item,index) in preOrderFromCart" :key="index">
            <!-- <div class="shoppingCar-title container-fixed">
                <span>店铺:</span>
                <span class="desc">我的个性小铺</span>
            </div> -->
            <div class="shoppingCar-content">
                <div class="shoppingCar-product myicon-checked-box" v-for="(items,indexs) in item.goodsInfo" :key="indexs">
                    <div class="shoppingCar-product-content">
                        <div class="imgDiv"><image :src="items.coverUrl"/></div>
                        <div class="product-content-box product-content" :style="'width:calc(100% - 6rem);'">
                            <h3 class="product-content-title">{{items.name}}</h3>
                            <p  class="fee-parent" :style="'font-size:12px;line-height: 17px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;'">
                                <span class="desc" v-if="items.sku">
                                    <i v-for="(t,i) in items.sku.attributes" :key="i">{{t.attrVal}},</i>
                                </span>
                            </p>
                            <p class="desc-parent">
                                <span class="desc"><i class="feeSelf">{{items.sku?items.sku.sellPrice:items.originPrice}}</i><i class="rt desc-fee">{{items.num}}</i></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sendInfo" v-if="item.goodsInfo">
                <div class="sendWay">
                    <p class="desc lf">配送方式</p>
                    <p class="rt" v-if="item.transferFee">
                        买家自费 <span class="feeSelf">{{item.transferFee}}</span>
                    </p>
                    <p class="rt" v-else>
                        商家 包邮
                    </p>
                </div>
                <div class="leaveMessage">
                    <textarea  placeholder="给卖家留言" data-param="remark" maxlength="100" class="leaveWords canGetValue" auto-height style="padding:0;" @blur="blurFn(val,index)"  v-model="val"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ["preOrderFromCart"],
    mounted(){
    },
    watch : {
        preOrderFromCart(v){
        }
    },
    methods : {
        blurFn(event,index){
            this.preOrderFromCart[index].remark = event
        }
    }
}
</script>

