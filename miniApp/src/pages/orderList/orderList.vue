<template>
    <div class="orderManage buyerOrder">
        <div class="orderTop">
            <search />
			<div class="orderNav">
				<ordernav @status="getStatus" :actives="active"/>
			</div>
        </div>
		<div class="orderListDiv">
			<orderlist :orderList="orderList" :status="status"/>
		</div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import search from '@/components/orderList/search.vue'
import ordernav from '@/components/orderList/nav.vue'
import orderlist from '@/components/orderList/orderlist.vue'
export default {
	data () {
		return {
			orderList : {data:[]},
			active : 0,
			status : 0,
            totalPage : 0,
			nowPage : 1,
			status : 0,
		}
	},
    components : {
        search,
		ordernav,
		orderlist,
    },
	methods : {
		getList (status){
			var data = {
				pageNum: 1,
				pageSize: 10,
				status : status||0
			}
			this.status = status||0
			utils.listOrders(data,(msg)=>{
				this.status = status||0
				this.nowPage = 2;
				this.totalPage = msg.page.pages;
				this.orderList = msg
			})
		},
		getStatus (status) {
			this.getList(status)
			this.status = status
		}
	},
	mounted(){
		if(this.$root.$mp.query){
			this.active = this.$root.$mp.query.status
			this.getList(this.$root.$mp.query.status)
			this.status = this.$root.$mp.query.status
		}else{
			this.active = 0
			this.getList()
		}
	},
	onReachBottom(){
		var me = this;
		if(me.nowPage<=me.totalPage){
			var me = this;
			var data = {
				pageNum : me.nowPage,
				pageSize : 10,
				status : me.status||0
			}
			utils.listOrders(data,(msg)=>{
				me.nowPage ++;
				me.totalPage = msg.page.pages;
				me.orderList.data.push(...msg.data)
			})
		}
	},
	onUnload(){
		this.orderList = {data:[]}
		this.active = 0
	}
}
</script>
<style>
.orderListDiv{margin-top: 90px;}
.headNavWrapper { background: #FFFFFF; -webkit-box-shadow: 0 1px 2px 0 rgba(213, 213, 213, 0.5); box-shadow: 0 1px 2px 0 rgba(213, 213, 213, 0.5); overflow-x: hidden; }
.headNavWrapper .liWrapper { display: -webkit-box; display: -ms-flexbox; display: -webkit-flex;  display: flex; font-size: 0; -ms-flex-pack: distribute; -webkit-justify-content: space-around; justify-content: space-around; border-top: 1px solid #F0F0F0;width: 500px;}
.headNavWrapper .liWrapper:first-child { border: 0; }
.headNavWrapper .liWrapper .chooseLi { display: inline-block; width: 25%; font-size: 13px; text-align: center; line-height: 40px; }
.headNavWrapper .liWrapper .chooseLi span { text-align: center; line-height: 18px; display: inline-block; padding: 11px 0 8px; color: #606060; }
.headNavWrapper .liWrapper .chooseLi span b { font-weight: normal; }
.headNavWrapper .liWrapper .sortLi { display: inline-block; width: 33.3%; font-size: 13px; text-align: center; line-height: 40px; }
.headNavWrapper .liWrapper .sortLi span { position: relative; text-align: center; line-height: 18px; display: inline-block; padding: 11px 0 8px; color: #606060; }
.headNavWrapper .liWrapper .sortLi span b { position: absolute; top: 50%; right: -15px; -webkit-transform: translate(0, -50%); transform: translate(0, -50%); content: ""; height: 0; width: 0; border-right: 5px dashed transparent; border-left: 5px dashed transparent; }
.headNavWrapper .liWrapper .sortLi span b.top { top: calc(50% - 5px); border-bottom: 5px solid #606060; }
.headNavWrapper .liWrapper .sortLi span b.bottom { top: calc(50% + 5px); border-top: 5px solid #606060; }
.headNavWrapper .liWrapper .chooseLi{ color: #ff5200; }
.headNavWrapper .liWrapper .chooseLi.active span { color: #ff5200; border-bottom: 3px solid #ff5200; }

.orderTop{ position:fixed; top:0; left:0; right:0; padding:1px 0;  background:#fff; z-index:9; background-size:100% 100%; }
.orderTop .searchDiv{ position:relative; height:30px; margin:6px 15px; }
.orderTop .searchDiv a{width: 100%;height: 100%;}
.orderTop .searchDiv input{ width:100%; height:100%; background:#f0f0f0; border-radius:4px; border:0; padding:0  10% 0 4%;box-sizing: border-box;font-size: 14px;}
.orderTop .searchDiv #searchBtn{ position:absolute; top:0; right:0; padding:7.5px; width:30px; height:30px;box-sizing: border-box;}
.orderTop .searchDiv #searchBtn img{ display:block; width:100%;height: 100%;}

.orderNav{ position:relative; border-top: 1px solid #f0f0f0; }
.orderNav li{height: 40px; line-height: 40px; float:left; text-align:center; color:#606060; font-size:12px;}
.orderNav li span{display: inline-block; padding: 11px 0; line-height:1; color:#606060; font-size:13px; font-weight: normal;}
.orderNav .moreStatus i{ display:inline-block; margin-top:-2px; width:18px; height:18px; vertical-align:middle; background:url(https://store.iliujia.com/imgs/c/arrowIcon1.png); background-size:100% 100%; transition: all 0.2s ease-in-out; }
.orderNav .moreStatus.show{ color:#606060; }
.orderNav .moreStatus.show i{
	transform: rotate(-180deg);
	-ms-transform: rotate(-180deg);		/* IE 9 */
	-webkit-transform: rotate(-180deg);	/* Safari and Chrome */
	-o-transform: rotate(-180deg);		/* Opera */
	-moz-transform: rotate(-180deg);		/* Firefox */
}
.buyerOrder .orderTop li{ width:20%; }
.sellerOrder .orderTop li{ width:25%;}
.orderNav .moreNav{ display:none; position:absolute; top:50px; right:10px; padding:0 12px; width:120px; z-index:9; border-radius:4px; background:#fff; box-shadow:0 0 9px rgba(0,0,0,0.30); }
.orderNav .moreNav p{ padding:10px 0; text-align:center; color:#606060; border-bottom:1px solid #f0f0f0; font-size:12px; line-height:18px; }
.orderNav .moreNav p:last-child{ border-bottom:none; }
.orderNav .moreNav p span{ color:#606060; font-size:12px; }
.orderNav .moreNav p.active{ color:#FF5900; }
.orderNav .moreNav p.active span{ color:#FF5900; }
.caiyuanbao .orderNav .moreNav p.active{ color:#BEA474; }
.caiyuanbao .orderNav .moreNav p.active span{ color:#BEA474; }
.orderNav .arrowIcon{ position:absolute; top:-18px;right:7px; width:18px; }

.updateBtn{ position:fixed; bottom:12px; left:0; right:0; }



.searchResult .orderTop{ position:static; }
.searchResult .searchDiv input{ width:78%; padding:0 4%; }
.searchResult .searchDiv #searchBtn{ width:20%; border-radius:4px; color:#fff; font-size:14px; line-height:1em; text-align:center; }
.caiyuanbao .searchResult .searchDiv #searchBtn{background:#BEA474;}
/*.returnBtn{ position:fixed; bottom:10px; left:0; right:0;cursor: pointer; }*/

.halfFrame{position: fixed;background-color: rgba(0,0,0,.5);top: 0;left: 0;bottom: 0;right: 0;z-index: 999;}
.frame{position: absolute;top:50%;left: 11.6%;transform: translate3d(0,-50%,0);-webkit-transform: translate3d(0,-50%,0);width: 76.8%;background-color: #fff;border-radius: 10px;}
.frameTop{padding: 25px 20px;}
.frameTop h3{text-align: center;font-size: 18px;color: #606060;font-weight: normal;}
.frameTop p{padding: 7px 0;width: 100%;border-bottom:1px solid #A2A2A2;margin-top: 10px;font-size: 14px;color: #606060;}
.frameTop input{height: 22px;}
.frameFoot{height: 44px;line-height: 44px;border-top: 1px solid #E8E8E8;}
.frameFoot a{float: left;width: 50%;box-sizing: border-box;color: #FF5200 ;text-align: center;}
.frameFoot a:first-child{border-right: 1px solid #E8E8E8;color: #A2A2A2;}

/* 搜索 */
#search .weui-search-bar__form{
	background-color: #F0F0F0;
    border-radius: 4px;
}
.product-list-search-wrapper{
	background-color: #fff;
	display: flex;
	display: -webkit-flex;
	align-items: center;
  /* border:1px solid #fff; */
}
.product-list-search-wrapper.focus .product-list-search-btn{
	display: block;
	margin-right:15px;
}
.product-list-search-wrapper.transition .product-list-search-btn{
	opacity: 1;
	margin-right:15px;
	transition: all ease .5s;
}
.product-list-search-box{
	display: flex;
	width:100%;
	display: -webkit-flex;
	align-items: center;
	padding-top: 5px;
	padding-bottom: 5px;
	background: #F0F0F0;
	border-radius: 4px;
	margin-top:7px;
	margin-bottom:7px;
	margin-left:15px;
	margin-right:15px;
}
.product-list-search-box,.product-list-search-btn{
	flex-grow: 1;
}
.product-list-search-btn{
	background-color: transparent;
	font-size: 14px;
	color: #606060;
	width:40px;
	opacity: 0;
	display: none;
}
.product-list-search-box:before{
	content:"";
	width:14px;
	height:14px;
	margin-left: 10px;
	margin-right:6px;
	display: block;
	background:url(https://store.iliujia.com/imgs/c/search.png) no-repeat;
	background-size: 100% 100%;
}
.product-list-search-wrapper.focus .product-list-search-close{
	content:"";
	width:18px;
	height:18px;
	margin-right: 10px;
	margin-left:6px;
	display: block;
	background:url(https://store.iliujia.com/imgs/c/cut.png) no-repeat;
  background-size: 100%;
  background-position: 50%,50%;
}
.product-list-search-input{
	width:80%;
	background-color: transparent;
}

</style>


