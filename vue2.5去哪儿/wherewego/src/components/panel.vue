<template>
  <div class="panel">
    <h4><span></span>{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '@/assets/style/color.scss';
  
  .panel{
    h4{
      position: relative;
      height: 22px; 
      line-height: 22px;
      padding: 10px 15px;
      color: $f1b1b1b;
      span{
        background: $ff5200;
        width: 4px; 
        height: 15px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
