<template>
  <iframe id="show-iframe" frameborder=0 scrolling=auto :src="path"></iframe>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        html: '',
        path: this.$route.params.path,
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: this.$route.params.frameName,
          headerRight: ''
        }
      }
    },
    mounted() {
      const oIframe = document.getElementById('show-iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = deviceHeight + 'px';
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen() {
        // 路由回退back(-1)
        this.routerBack();
      }
    }
  }
</script>

<style>

</style>
