<template>
    <div class="detailInfor">
        <h2><span>商品详情</span></h2>
        <div>
            <div v-if="goodsInfo.detailInfo" class="goodsDetail">
                <text class="goods">{{detailInfoText}}</text>
                <div v-for="(item,index) in goodsInfo.listImg" :key="index">
                    <image :src="item.img_url" alt="" mode="widthFix"/>
                </div>
            </div>
            <div class="noDetail" v-else>
                <p>此商品暂无详情</p>
                <p>商家尚未填写此商品的详细内容</p>
            </div>
        </div>
        <h2 class="isBottom" v-if="detailInfo">—— 已经到底了 ——</h2>
    </div>
</template>
<script>
export default {
    props:["goodsInfo"],
    computed : {
        detailInfoText(){
            return this.goodsInfo.detailInfoText.replace(/<br \/>/g, "\n").replace(/<br>/g,"\n")
        }
    },
}
</script>
<style>
.goods{font-size: 14px;}
.goodsDetail image{margin-top: 10px;width: 100%;}
</style>


