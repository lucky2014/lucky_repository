<template>
    <div>
        <search @searchValue="searchFn"/>
        <div class="pt44">
            <searchlist :goodsList="searchList" @goodsid="goodsid"/>
        </div>

		<div v-show="showSku">
			<sku :goodsInfo="skuInfo" @closeAni="closeAni"/>
		</div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import search from '@/components/index/search.vue'
import searchlist from '@/components/classify/goods.vue'
import sku from '@/components/sku.vue'
export default {
    data(){
        return { 
            searchList: [],
			skuInfo : "",
			showSku : false,
        }
    },
    components : {
        search,
        searchlist,
		sku,
    },
    methods : {
        searchFn : function(val){
            var data = {
                pageNum: 1,
                pageSize: 100,
                name: val,
            }
            this.val = val
            utils.listStoreProducts(data,(msg)=>{
                this.searchList = msg.data;
            })
        },
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
    onUnload(){
        this.searchList = [];
        this.skuInfo = "";
        this.showSku = false;
    }
}
</script>
<style>
.pt44{padding-top: 44px;}
</style>


