<template>
    <div>
        <transition :name="transitionName">
            <router-view keep-alive class="Router"></router-view>
        </transition>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Vue from 'vue'
import store from './store/index.js'
import tool from './api/tool.js'
import MuseUI from 'muse-ui'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import './assets/css/theme.css'

Vue.use(MuseUI)
export default {
    data() {
　　　　return {
　　　　　　transitionName: 'slide-right'  // 默认动态路由变化为slide-right
　　　　}
　　},
    computed:mapState({
        thumbImgUrl:'thumbImgUrl'
    }),
    watch: {
    　　　'$route' (to, from) {
        　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
        　　　　　　if(isBack) {
        　　　　　　　　this.transitionName = 'slide-right'
        　　　　　　} else {
        　　　　　　       this.transitionName = 'slide-left'
        　　　　　}
        　　      this.$router.isBack = false
        　　}
    },
    mounted(){
        tool.created({
            shareTitle:'端午答题赢好礼，你不来pick一下？',
            imgUrl:this.thumbImgUrl,
            wxShareUrl:location.origin+location.pathname+'?attach='+encodeURIComponent(`${store.state.activity.openId}`)
        });
    }
}
</script>
<style>
    .Router {
        transition: all .35s ease;
        position: absolute;
        left:0;
        top:0;
        width:100%;
        min-height: 100%;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
    }
</style>

