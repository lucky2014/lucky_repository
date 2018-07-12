<template>
    <swiper indicator-dots="true" autoplay="true" interval="3000" duration="500" circular>
        <block wx:for="imgList" v-for="(item,index) in imgList" :key="index" >
            <swiper-item>
                <image :src="item" class="slide-image" width="375" height="375"/>
            </swiper-item>
        </block>
    </swiper>
</template>
<script>
export default {
    props : ["imgList"]
}
</script>
<style>
swiper,swiper image{width: 375px;height: 375px;}
</style>


