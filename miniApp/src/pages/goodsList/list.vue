<template>
    <div>
        <searchlist :goodsList="searchList" @goodsid="goodsid"/>
        <div v-show="showSku">
			<sku :goodsInfo="skuInfo" @closeAni="closeAni"/>
		</div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import searchlist from '@/components/classify/goods.vue'
import sku from '@/components/sku.vue'
export default {
    data(){
        return { 
            searchList: [],
			skuInfo : "",
            showSku : false,
            totalPage : 0,
            nowPage : 1,
        }
    },
    components : {
        searchlist,
		sku,
    },
    mounted(){
        if(this.$root.$mp.query.name){
            wx.setNavigationBarTitle({
                title: this.$root.$mp.query.name
            })
        }
        if(this.$root.$mp.query.moduleRel){
            data.moduleRel = this.$root.$mp.query.moduleRel
        }
        if(this.$root.$mp.query.id){
            var data = {
                moduleRelId:this.$root.$mp.query.id,
                pageNum: 1,
                pageSize: 10,
            }
            utils.listStoreProductsForModules(data,(msg)=>{
                this.totalPage = msg.page.pages;
                this.nowPage ++;
                this.searchList = msg.data;
            })
        }else{
            var data = {
                pageNum: 1,
                pageSize: 10,
            }
            utils.listStoreProducts(data,(msg)=>{
                this.totalPage = msg.page.pages;
                this.nowPage ++;
                this.searchList = msg.data;
            })
        }
    },
    watch : {
        // searchList(list){
        //     console.log(list)
        //     this.searchList = list.map(function(v){
        //         if(v.sellPrice){
        //             v.originPrice = v.sellPrice;
        //         }
        //         if(v.isFreeShipping=="y"){
        //             v.isFree = 1
        //         }
        //         if(v.originPrice > 999999){
        //             v.originPrice = "999+";
        //         }else{
        //             v.originPrice = v.originPrice.toFixed(2);
        //             v.priceSZ = v.originPrice.split(".")[0];
        //             v.priceSF = v.originPrice.split(".")[1];
        //         }
        //         return v
        //     })
        // }
    },
    methods : {
        goodsid(id){
			var data = {
				id : id,
			}
			utils.getProductInfo(data,(msg)=>{
				this.skuInfo = msg;
				this.showSku = true;
			})
        },

		closeAni : function(){
			setTimeout(()=>{
				this.showSku = false
			},300)
		}
    },
    onReachBottom () {
        var me = this;
        if(me.nowPage<=me.totalPage){
            if(this.$root.$mp.query.id){
                var data = {
                    moduleRelId:this.$root.$mp.query.id,
                    pageNum: me.nowPage,
                    pageSize: 10,
                }
                utils.listStoreProductsForModules(data,(msg)=>{
                    this.totalPage = msg.page.pages;
                    this.nowPage ++;
                    this.searchList.push(...msg.data);
                })
            }else{
                var data = {
                    pageNum: me.nowPage,
                    pageSize: 10,
                }
                utils.listStoreProducts(data,(msg)=>{
                    this.nowPage ++;
                    this.searchList.push(...msg.data);
                })
            }
        }
    },
    onUnload(){
        this.searchList = [];
        this.skuInfo = "";
        this.showSku = false;
        this.totalPage = 0;
        this.nowPage = 1;
    }
}
</script>
