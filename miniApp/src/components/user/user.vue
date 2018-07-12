<template>
    <div class="theme_bk_color header">
        <image :src="userInfo.headImg?userInfo.headImg:store.storeLogo" id='show-actions-bg' mode="aspectFill"/>
        <dl>
            <dt>{{userInfo.name?userInfo.name:store.storeName}}</dt>
            <dd>ID：{{userInfo.customerId}}</dd>
        </dl>
    </div>
</template>
<script>
export default {
    props : ["userInfo"],
    computed : {
        store(vue){
            return vue.$store.state.info.storeInfo
        }
    }
}
</script>
<style>
.theme_bk_color {background: #ff5200;}
.myInfo{ background: #fff;font-size: 14px;}
.myInfo .header{display: flex; clear: both; height: 120px; overflow: hidden;}
.myInfo .header image{ width: 70px; height: 70px; border-radius: 100%; float: left;border: 1px solid #fff; margin: 30px 0 20px 16px;}
.myInfo .header dl{height: 70px;margin: 40px 0 20px 20px; color: #fff;}
.myInfo .header dt{ font-size: 20.3px; line-height: 25px;height: 25px;color: #fff;letter-spacing: -0.48px;}
.myInfo .header dd{letter-spacing: -0.38px;height: 20px;line-height: 20px;margin-top: 8px;}
</style>


