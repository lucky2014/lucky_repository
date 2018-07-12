/*
    功能:  商品详情  店铺信息组件
*/
<template>
    <div class="shopInfor">
		<a class="gotoIndex theme_borText_color" @click="goindex">进店逛逛</a>
        <dl class="storeDiv" :storeid="storeInfo.id">
            <dt><image :src="storeInfo.storeLogo" mode="aspectFill"/></dt>
            <dd>
                <p class="shopName">
                    <span>{{storeInfo.storeName}}</span>
                </p>
                <p class="shopPhone">
                    <img src="https://store.iliujia.com/imgs/c/identify.png">
                    <span>该店铺 {{storeInfo.isCertification?'已':'未'}}通过实名认证</span>
                </p>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    computed:{
        storeInfo(vue){
            return vue.$store.state.info.storeInfo
        }
    },
    methods : {
        goindex(){
            wx.switchTab({
                url: '../index/main'
            })
        }
    }
}
</script>

