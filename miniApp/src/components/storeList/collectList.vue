<template>
    <div>
        <scroll-view scroll-x>
            <ul class="list" :style="'width:'+collectList.length*140+'rpx'">
                <li v-for="(item,index) in collectList" :key="index" @click="gotoStore(item.storeId)">
                    <image :src="item.storeLogo" alt="" mode="aspectFill"/>
                    <p>{{item.storeName}}</p>
                </li>
            </ul>
        </scroll-view>
    </div>
</template>
<script>
var zheshiyigebianliang
import utils from '../../utils/index.js'
export default {
    computed : {
        collectList(vue){
            return vue.$store.state.info.collectList
        }
    },
    methods : {
        gotoStore(id){
            this.$store.commit("setStoreId",id);
            this.$store.dispatch('getStoreInfo');
            zheshiyigebianliang = zheshiyigebianliang?zheshiyigebianliang:function(){};
            zheshiyigebianliang = this.$store.subscribe((mutation,state)=>{
                if(mutation.type == 'storeInfo'){
                    wx.switchTab({
                        url : '../index/main'
                    })
                }
            })
        }
    }

}
</script>
<style>
.list{width: 57px;margin-right: 25px;overflow: hidden;}
.list li{width: 57px;float: left;margin-right: 10px;}
.list image{height: 57px;width: 57px;border-radius:50%;margin-bottom: 10px;}
.list p{font-size: 12px;color: #1B1B1B;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center}
</style>
