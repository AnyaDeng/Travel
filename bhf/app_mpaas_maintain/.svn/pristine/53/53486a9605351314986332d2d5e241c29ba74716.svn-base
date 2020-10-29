<!--自定义vue事件(产品列表点击置灰效果专用)
需修改点击效果,在子组件标签中添加&#45;&#45;&ndash;&gt; :touchClass="'btnStyleNew'"-->
<!--@touchstart不能阻止默认事件&#45;&#45;为实现touchmove页面上下滑动;
@touchend.prevent阻止默认事件&#45;&#45;为解决头像弹框无法显示问题;-->
<template>
  <li :class="{[touchClass]: btnStyleState}" @touchstart="ontouchstart" @touchend.prevent="ontouchend">
    <slot name="structure"></slot>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        btnStyleState: false,
        startY: '',
        endY: ''
      }
    },
    props: {
      touchClass: {
        type: String,
        default: 'btnStyle'
      }
    },
    methods: {
      ontouchstart: function (e) {
        this.btnStyleState = true;
        this.startY = e.changedTouches[0].pageY;
      },
      ontouchend: function (e) {
        this.btnStyleState = false;
        this.endY = e.changedTouches[0].pageY;
        let moveY = Math.abs(this.endY - this.startY);
        if (moveY <= 5) {
          this.$emit('touch-delay');
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
