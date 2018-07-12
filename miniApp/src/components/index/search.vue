<template>
    <div>
       <div class="header">
           <div class="input">
               <img src="https://store.iliujia.com/imgs/c/searchIcon.png" alt="">
               <input placeholder="搜索商品名称" confirm-type="search" @confirm="bindconfirm" focus="true"/>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    methods : {
        bindconfirm : function(e){
            this.$emit('searchValue',e.target.value)
        },
    }
}
</script>
<style>
.header{overflow: hidden;background: #fff;padding: 7px 15px;position: fixed;top: 0;
left: 0;right: 0;z-index: 99;}
.input{position: relative;float: left;display: inline-block;width: 100%;height: 30px;background: #f0f0f0;border-radius: 4px;border: 0;padding: 0 15px 0 35px;box-sizing: border-box;}
.header img{position: absolute;top: 7.5px;left: 7.5px;width: 15px;height: 15px;}
.header input{font-size: 14px;line-height: 30px;height: 30px;}
</style>

