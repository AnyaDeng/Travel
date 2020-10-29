<template>
  <p :class="{placeStyle : placeHolder}">{{inputVal}}</p>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['placeholder'],
    data() {
      return {
        placeHolder: false,
        inputVal: ''
      }
    },
    watch: {
      inputVal(value) {
        var reg = /[\u4E00-\u9FA5]/i;
        if (this.isNotEmpty(value) && !reg.test(value)) {
          this.placeHolder = false;
        } else {
          this.inputVal = this.placeholder;
          this.placeHolder = true;
        }
      }
    },
    mounted() {
      this.inputVal = this.placeholder;
      this.placeHolder = true;
    },
    methods: {}
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  p
    &.form-control
      height auto
      width: 70%
      color: #232323
      font-size: 0.14rem
      font-family: SourceHanSansCN-Regular
    &.placeStyle
      font-family: SourceHanSansCN-Regular
      font-size 0.14rem
      letter-spacing 0
      color: #c6c6c6
    display: inline-block
    line-height: normal

</style>
