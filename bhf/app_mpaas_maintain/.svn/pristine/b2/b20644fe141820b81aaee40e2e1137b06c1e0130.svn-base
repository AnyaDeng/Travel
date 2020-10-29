<template>
    <div class="full-support_npd">
      <div>
        <ul class="authenticateSuccess">
          <li >
            <img src="../../../common/img/rzcg.png" alt="">
          </li>
          <li class="authenticateResult">
            <div >
              <p >认证成功</p>
              <p>绑定银行卡，立即开启理财之门</p>
            </div>
          </li>
        </ul>
        <div class=" goToVisit ">
          <div class="">
            <router-link to="/homePage">
              <span class="seeVisitHomepge">先去逛逛</span>
            </router-link>
          </div>
          <div class="btn-container " >
            <div class="btn-success" :class="{disabled: disabled}" @click="toBindBankCard">
              <span>立即绑定</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pageConfig: {
          headerLeft: '',
          headerTitle: '',
          headerRight: this.headerBtn.service
        },
        borderBottoms: true,
        showPrompt: true,
        show: true,
        disabled: false
      };
    },
    mounted() {
      // 向父组件通信
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    props: {
      customerInfo: {
        type: Object
      }
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen() {
        // 跳转智齿客服
        this.showCustomerService();
      },
      toBindBankCard() {
        this.$router.push({
          name: 'bindBankCard',
          params: {customerInfo: this.$route.params.customerInfo}
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "verificationResult.styl"
</style>
