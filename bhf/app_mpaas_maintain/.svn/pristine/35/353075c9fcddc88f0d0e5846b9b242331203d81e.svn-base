<template>
  <div class="netWorkAnomaly alert" v-show="show" @touchmove.prevent>
    <div class="netWorkAnomaly_icon"></div>
    <div class="netWorkAnomaly_msg">网络连接失败</div>
    <div class="btn-retry" @click="againRefresh(1)">
      <span>点击重试</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['modalOptions'],
    computed: {
      modal: {
        get() {
          let modal = this.modalOptions;
          modal = {
            dialogStyle: modal.dialogStyle ? modal.dialogStyle : ''
          };
          return modal;
        }
      }
    },
    data() {
      return {
        show: false,   // 是否显示模态框
        resolve: '',
        reject: '',
        promise: '' // 保存promise对象
      };
    },
    methods: {
      /**
       * 重新刷新,将promise断定为reject状态
       * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
       */
      againRefresh(type) {
        if (this.isNoNetWork()) {
          let _this = this;
          _this.$loading();
          setTimeout(function () {
            _this.$loadingHide();
          }, 1000);
        } else {
          this.show = false;
          this.resolve(type);
          this.$bus.emit(this.getNetWorkKey());
        }
      },
      /**
       * 显示confirm弹出,并创建promise对象
       * @returns {Promise}
       */
      confirm() {
        this.show = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;   // 返回promise对象,给父级组件调用
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .netWorkAnomaly
    background: #f7f7f9
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    display: -webkit-flex
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
    flex-direction: column
    .netWorkAnomaly_icon
      /*margin-top: 0.89rem*/
      width: 3rem
      height: 1.6rem
      bg-image('../../../common/img/netWorkAnomaly')
      background-size: contain
    .netWorkAnomaly_msg
      margin-top: 0.215rem
      margin-bottom: 0.66rem
      font-family: SourceHanSansCN-Medium
      font-size: 0.15rem
      color: #7D8497
      letter-spacing: 0
    .btn-retry
      width: 1.145rem
      height: 0.26rem
      border: 0.01rem solid #7D8497
      border-radius: 0.13rem
      display: flex
      display: -webkit-flex
      justify-content: center
      -webkit-justify-content: center
      align-items: center
      -webkit-align-items: center
      margin-bottom: 0.8rem
      span
        font-family: SourceHanSansCN-Regular
        font-size: 0.15rem
        color: #7D8497
</style>
