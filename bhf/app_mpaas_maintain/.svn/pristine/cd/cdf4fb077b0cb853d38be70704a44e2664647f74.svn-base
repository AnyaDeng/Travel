<!--该组件仅为兼容自动化测试时浏览器无法识别touch事件问题-->
<template>
  <li @click="onClick">
    <slot name="structure"></slot>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    props: {
      touchClass: {
        type: String,
        default: 'btnStyle'
      }
    },
    methods: {
      onClick: function () {
        this.$emit('touch-delay');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
