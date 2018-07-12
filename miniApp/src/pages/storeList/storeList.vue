<template>
    <div>
        <div class="headercon">
            <dl>
                <dd>
                    <img :src="url" alt="">
                </dd>
                <dt>
                    <p>{{name}}</p>
                    <a href="../address/main">收货地址</a>
                </dt>
            </dl>
        </div>
        <div class="writeDiv">
            <h3>店铺收藏</h3> 
            <collectlist />
        </div>
        <div class="writeDiv">
            <h3>我的足迹</h3>
            <footprint />
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import collectlist from '@/components/storeList/collectList.vue'
import footprint from '@/components/storeList/footprint.vue'
export default {
    data(){
        return {
            collectList : [],
            name : "",
            url : "",
        }
    },
    mounted(){
        this.$store.dispatch("getCollectList")
        var me = this
		wx.getUserInfo({
			success : function(res){
                console.log(res)
                me.name = res.userInfo.nickName
                me.url = res.userInfo.avatarUrl
            },
            fail(res){
                console.log(res)
            }
		})
    },
    components : {
        collectlist,
        footprint,
    }
}
</script>
<style>
.writeDiv{background-color: #ffffff;padding: 15px 20px;padding-right: 0;margin-top: 10px;}
.writeDiv h3{font-size: 14px;color: #606060;margin-bottom: 15px;}
.headercon{height: 153px;width: 100%;background:url('https://store.iliujia.com/imgs/b/shopBg_all.png')}
.headercon dl{padding-top: 40px;margin-left: 16px;}
.headercon dd{float: left;}
.headercon dt{float: left;margin-left: 16px;}
.headercon p{color: #fff;font-size: 18px;}
.headercon a{border: 1px solid #FFFFFF;border-radius: 39px;display: inline-block;color: #fff;margin-top: 6px;width: 80px;height: 26px;font-size: 14px;text-align: center;line-height: 26px;}
.headercon img{height: 70px;width: 70px;border-radius: 50%;}
</style>


