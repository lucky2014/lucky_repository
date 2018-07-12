<template>
    <div>
      <div class="noData noDataFixed" style="display: block;" >
        <img src="https://store.iliujia.com/imgs/noData2.png">
        <p>{{msg?msg:'抱歉，没有相关宝贝'}}</p>
      </div>
    </div>
</template>
<script>
export default {
  props : ["msg"]
}
</script>

