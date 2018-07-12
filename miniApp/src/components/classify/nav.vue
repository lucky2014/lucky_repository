<template>
    <div class="classifyNav" :style="'width:'+navData.length*75+'px;overfow:hidden;'">
        <ul class="showClassify" :style="'width:'+(navData.length+1)*75+'px'">
            <li @click="changeTap('',0)" :class="current==0?'current':''">
                <span>全部</span>
            </li>
            <li v-for="(item, index) in navData" :key="index" :data-categoryid="item.categoryId"  @click="changeTap(item.categoryId,index+1)" :class="current==index+1?'current':''">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
	data(){
        return {
            current : 0,
        }
	},
	props: ["navData"],
	methods : {
		changeTap : function(id,index){
            this.current = index;
            this.$emit("categoryid",id);
		}
	}
}
</script>
<style>
.classify_header{ position:fixed; left:0; top:0; width:100%; height:40px; background:#fff; z-index:98; }
.classifyNav .showClassify{ overflow: hidden; width:80%; }
.classifyNav .showClassify li{ float:left; width:68.18px; color:#606060; font-size:13px; line-height:16px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-align:center; }
.classifyNav .showClassify li span{
  display: inline-block;
  padding: 11px 0 8px;
  line-height: 18px;
}
/*.classifyNav .showClassify li.current{ color:#BEA474; }*/
.classifyNav li.current span {
    color: #ff5200;
    border-bottom: 3px solid #ff5200;
}

.moreDiv{ float:left; width:20%; }
.moreDiv p{ padding:12px 0; font-size:13px; line-height:16px; text-align:center; color:#606060; }
.moreDiv p i{ transition: all 0.2s ease-in-out; display:inline-block; margin:-4px 0 0 5px; width:14px; vertical-align:middle; }
.moreDiv p.current i{
	transform:rotate(-180deg);
	-ms-transform:rotate(-180deg); 	/* IE 9 */
	-moz-transform:rotate(-180deg); 	/* Firefox */
	-webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
	-o-transform:rotate(-180deg); 	/* Opera */
}

.classifyNav .allClassify{ display:none; position:absolute; top:40px; right:0; width:100%; max-height:300px; border-top:1px solid #F0F0F0; overflow-y:scroll; background:#fff; box-shadow:0 2px 2px rgba(0,0,0,0.30); }
.classifyNav .allClassify li{ float:left; width:50%; border-bottom:1px solid #F0F0F0; }
.classifyNav .allClassify li a{ display:block; padding:12px 20px; font-size:13px; border-left:3px solid #fff; line-height:16px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.classifyNav .allClassify li:nth-child(2n+1) a{ border-right:1px solid #F0F0F0; }
.caiyuanbao .classifyNav .allClassify li.current a{ border-left:3px solid #BEA474; color:#BEA474; }
.microStore .classifyNav .allClassify li.current a{ border-left:3px solid #ff5200; color:#ff5200; }


</style>
