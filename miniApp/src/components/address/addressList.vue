<template>
    <ul class="lists_contianer">
        <li v-for="(item,index) in addressList" :key="index" @click="chooseFn(item)">
			<a class="address_infor rightDiv">
				<div class="icon_container"><i></i></div>
				<div class="perInfor_container">
					<div>
						<span class="name">{{item.name}}</span>
						<span class="phone">{{item.phone}}</span>
					</div>
					<p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</p>
				</div>
			</a>
			<div class="edit_container">
				<div class="isDefault notDefault setDefault" v-if="!item.isDefault">
					<i @click.stop.prevent="defaultList(item.id)"></i>
					<span>设置默认地址</span>
				</div>
				<div class="isDefault" :receiverId="item.id"  v-if="item.isDefault">
					<i></i>
					<span>设置默认地址</span>
				</div>
				<ul class="edit">
					<li :receiverId="item.id" class="goToEdit editIcon" @click.stop.prevent="editorList(item.id,index)"><i></i><span>编辑</span></li>
					<li class="delete-swipeout" @click.stop.prevent="delectList(item.id,index)"><i></i><span>删除</span></li>
				</ul>
			</div>
		</li>
    </ul>
</template>
<script>
export default {
	data(){
		return {
			
		}
	},
	props: ["choose"],
	computed : {
		addressList(vue){
			console.log("addressList",vue.$store.state.addressList.addressList)
			return vue.$store.state.addressList.addressList
		}
	},
	methods : {
		delectList :function(id,index){
			var me = this;
			wx.showModal({
				title: '确认删除?',
				content: '您确定要删除该收件人吗?',
				success: function(res) {
					if (res.confirm) {
						me.$emit("delectid",{id:id,index:index})
					} else if (res.cancel) {

					}
				}
			})
		},
		defaultList : function(id){
			this.$emit("defaultid",id)
		},
		editorList : function(id,index){
			this.$emit("editorid",{id:id,index:index})
		},
		chooseFn : function(obj){
			if(this.choose){
				this.$emit("chooseObj",obj)
			}
		}
			
	},
}
</script>
