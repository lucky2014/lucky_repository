<template>
    <div>
        <ul class="home_shopGoods">
            <li v-for="(item,index) in products.data" :key="index" :goodsId="item.id" class="micro" @click="goDetail(item.id)"> 
                <image v-if="item.typeId" :src="item.coverUrl" class="coverUrl"/>
                <image v-else :src="item.coverUrl" class="coverUrl"/>
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
        <span v-if="products.page.pages>1" class="getMoreGoods colorBorder-Template" @click.stop.prevent="lookMore">查看更多</span>
    </div>
</template>
<script>
export default {
    props : ["products"],
    methods : {
        addGoods : function(id){
            this.$emit("goodsid",id);
        },
        lookMore(){
            wx.navigateTo({
                url : '../goodsList/main?name=热销商品'
            })
        },
        goDetail(id){
            wx.navigateTo({
                url : '../goodsDetail/main?id='+id
            })
        }
    },
}
</script>

