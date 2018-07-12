<template>
    <div id="notice" class="template-notice" v-if="notice">
        <img src="/static/svg_notice.svg" alt="" class="svgTheme"/>
        <span :animation="animation">{{notice}}</span>
        <i class="template-notice"></i>
    </div>
</template>
<script>
export default {
    data (){
        return {
            animation : ""
        }
    },
    computed : {
        notice(vue){
            if(vue.$store.state.info.storeInfo.notice&&vue.$store.state.info.storeInfo.notice.length>25){
                setTimeout(()=>{
                    var animation1 = wx.createAnimation({
                        duration: 20000,
                        timingFunction: 'linear',
                    })
                    var animation2 = wx.createAnimation({
                        duration: 0,
                        timingFunction: 'linear',
                    })
                    this.animation = animation1.translateX("-100%").step().export()
                    setInterval(()=>{
                        this.animation = animation2.translateX("100%").step().export()
                        setTimeout(()=>{
                            this.animation = animation1.translateX("-100%").step().export()
                        },100)
                    },20000)
                },100)
            }
            return vue.$store.state.info.storeInfo.notice;
        }
    },
    mounted(){
        // if(this.notice.length>25){
        //     setTimeout(()=>{
        //         var animation1 = wx.createAnimation({
        //             duration: 20000,
        //             timingFunction: 'linear',
        //         })
        //         var animation2 = wx.createAnimation({
        //             duration: 0,
        //             timingFunction: 'linear',
        //         })
        //         this.animation = animation1.translateX("-100%").step().export()
        //         setInterval(()=>{
        //             this.animation = animation2.translateX("100%").step().export()
        //             setTimeout(()=>{
        //                 this.animation = animation1.translateX("-100%").step().export()
        //             },100)
        //         },20000)
        //     },100)
        // }
    },
    watch : {
        // notice(){
        //     var animation1 = wx.createAnimation({
        //         duration: 20000,
        //         timingFunction: 'linear',
        //     })
        //     var animation2 = wx.createAnimation({
        //         duration: 0,
        //         timingFunction: 'linear',
        //     })
        //     this.animation = animation1.translateX("-100%").step().export()
        //     setInterval(()=>{
        //         this.animation = animation2.translateX("100%").step().export()
        //         setTimeout(()=>{
        //             this.animation = animation1.translateX("-100%").step().export()
        //         },100)
        //     },20000)
        // }
    }
}
</script>
<style>
#notice{position: relative; overflow: hidden;height: 35px;line-height: 35px; }
#notice img{position: absolute;left: 14px;top: 8px; float: left; width: 20px;height: 19px;z-index: 10; }
#notice span{display: inline-block; position: absolute;left: 48px; color:#fff;white-space: nowrap;z-index: 0;font-size: 14px;transform: translate3d(0,0,0);}
#notice i{position: absolute;left: 0;top: 0; width: 38px;height: 100%;z-index: 1; }
#notice{background: #F3C73A;}
#notice i{background: #F3C73A;}
/* @keyframes myfirst
{
    0%   {transform: translate3d(100%,0,0);-webkit-transform: translate3d(100%,0,0)}
    100%  {transform: translate3d(-100%,0,0);-webkit-transform: translate3d(-100%,0,0)}
} */

</style>


