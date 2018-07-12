<template>
    <div>   
        <div class="all" v-for="(item,index) in footList" :key="index">
            <div class="dateDiv"><b>{{item.date}}</b> <span></span></div>
            <div class="pr40" v-for="(items,indexs) in item.storeList" :key="indexs">
                <h3 class="toph3">{{items.storeName}}<span @click="collect(items.collected,items.storeId)" :class="items.collected=='收藏'?'collect':''">{{items.collected}}</span></h3>
                <ul>
                    <li class="goodsList">
                        <dl @click="goindex(items.storeId,items.goodsId)">
                            <dt><image :src="items.coverUrl" mode="aspectFill"/></dt>
                            <dd>
                                <p class="goodsName">{{items.goodsName}}</p>
                                <div class="bottomDiv">
                                    <span class="priceSpan">¥{{items.price}}</span>
                                    <img src="/static/addCar_grey.png" alt="" class="numberSpan">
                                </div>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
var zheshiyigebianliang
export default {
    data(){
        return {
            history:[]
        }
    },
    computed : {
        collectList(vue){
            return vue.$store.state.info.collectList
        },
        footList(){
            var data = [],
            ischose = 0,
            list = this.history;
            var wdy = {
                date: '',
                storeList: ''
            }
            for (var i = 0; i < list.length; i++) {
                var az = '';
                var obj = JSON.parse(list[i])
                for (var j = 0; j < data.length; j++) {
                    if (data[j].date == obj.timestamp) {
                        ischose = 1;
                        az = j;
                        break;
                    }
                }
                if (ischose == 1) {
                    var ab = data[az];
                    ab.storeList.push(obj);
                    ischose = 0;
                } else if (ischose == 0) {
                    wdy = {};
                    wdy.date = obj.timestamp;
                    wdy.storeList = [];
                    wdy.storeList.push(obj);
                    data.push(wdy);
                }
            }
            return data
        }
    },
    mounted(){
        this.history = wx.getStorageSync('history');
    },
    methods : {
        goindex(storeId,goodsId){
            this.$store.commit("setStoreId",storeId);
            this.$store.dispatch('getStoreInfo');
            zheshiyigebianliang = zheshiyigebianliang?zheshiyigebianliang:function(){};
            zheshiyigebianliang();
            zheshiyigebianliang = this.$store.subscribe((mutation,state)=>{
                if(mutation.type == 'storeInfo'){
                    wx.redirectTo({
                        url : '../goodsDetail/main?id='+goodsId
                    })
                }
            })
        },
        collect(collected,storeId){
            var data = {
				storeId : storeId
			}
			if(collected=="收藏"){
				utils.addMiniAppStoreCollect(data,(msg)=>{
                    this.$store.dispatch("getCollectList")
				})
			}else{
				utils.delMiniAppStoreCollect(data,(msg)=>{
					this.$store.dispatch("getCollectList")
				})
            }
        }
    },
    watch : {
        collectList(col){
            // this.footList.map((v)=>{
            //     v.storeList.map((v2)=>{
            //         if(col.indexOf(v2.storeId)!=-1){
            //             v2.collected = "已收藏"
            //         }else{
            //             v2.collected = "收藏"
            //         }
            //         return
            //     })
            // })
            if(col.length>0){
                var list = []
                for(var i=0;i<this.history.length;i++){
                    var h = JSON.parse(this.history[i])
                    for(var j=0;j<col.length;j++){
                        if(h.storeId == col[j].storeId){
                            h.collected = "已收藏"
                            break
                        }else{
                            h.collected = "收藏"
                        }
                    }
                    list.push(JSON.stringify(h))
                }
                this.history =list
                // var list = this.history.map((v2)=>{
                //     var h = JSON.parse(v2)
                //     v2  = col.map((v)=>{ 
                //         if(v.storeId == h.storeId){
                //             h.collected = "已收藏"
                //         }else if(!h.collected){
                //             h.collected = "收藏"
                //         }
                //         return JSON.stringify(h)
                //     })
                //     return v2[0]
                // })
                // this.history =list
            }else{
                var list = this.history.map((v2)=>{
                    var h = JSON.parse(v2)
                    h.collected = "收藏"
                    return JSON.stringify(h)    
                })
                this.history =list
            }
        }
    }
}
</script>
<style>
.all{margin-bottom: 20px;}
.dateDiv{font-size: 12px;color: #CACACA;height: 17px;position: relative;}
.pr40{padding-right: 20px;}
.dateDiv b{display: block;font-weight: normal;height: 17px;background-color: #fff;width: 50px;line-height: 17px;z-index: 10;position: absolute;left: 0;top: 0;}
.dateDiv span{width: 100%;display: block;height: 1px;border-bottom:1px solid #F0F0F0;height:8px;}
.toph3{font-size: 16px;color: #1B1B1B;margin-top: 10px;}
.toph3 span{border: 1px solid #A2A2A2;border-radius: 20px;height: 22px;width: 56px;line-height: 22px;text-align: center;font-size: 12px;color: #A2A2A2;float: right;}
.toph3 span.collect{border: 1px solid #FF5200;color: #FF5200;}
.goodsList dl{ position:relative; padding:5px 0; width:100%; overflow:hidden;background: #fff;padding-bottom: 20px;border-bottom: 1px solid #F0F0F0;}
.goodsList dt{ float:left; width:90px; height:90px; overflow:hidden; }
.goodsList dt image{ display:block; width:100%;height: 100%;}
.goodsList dd{ padding-left:100px; }
.goodsList dd .goodsName{ margin-bottom:4px; font-size:14px; line-height:19px; color:#1B1B1B; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.goodsList dd .specSpan{ max-height:34px; font-size:12px; line-height:17px; color:#A2A2A2; overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; }

.goodsList .bottomDiv{ position:absolute; bottom:14px; left:100px; right:15px; line-height:16px; }
.goodsList .bottomDiv .priceSpan{ float:left; padding-right:5px; font-size:16px; line-height:32px; color:#1B1B1B; text-align: right;color: #AA2327;}
.goodsList .bottomDiv .numberSpan{ float:right;height: 32px;width: 32px;}
</style>


