<template>
    <div>
        <div class="shoppingCar-content">
            <div class="main">
                <div class="noShop noDataFixed">
                    <img src="https://store.iliujia.com/imgs/gouwuche.png">
                    <p>购物车空空如也~</p>
                    <span class="goToShopping" @click="goIndex">去挑选商品</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods : {
        goIndex : function(){
            wx.switchTab({
                url: '../index/main'
            })
        }
    }
}
</script>

