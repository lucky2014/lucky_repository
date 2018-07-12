<template>
        <div class="searchDiv" @click="searchFn">
            <a>
                <i id="searchBtn"><img src="https://store.iliujia.com/imgs/c/searchIcon.png"></i>
                <input id="searchInput" type="text" placeholder="搜索订单号、手机号、收货人"  disabled/>
            </a>
        </div>
</template>
<script>
export default {
    methods : {
        searchFn(){
            wx.navigateTo({
                url : '../searchOrder/main'
            })
        }
    }
}
</script>
<style>
#searchInput[disabled]{background-color:#f0f0f0  !important;}
</style>


