<template>
  <div>
    <div class="modal alert modal-backup updateIndex" v-show="show" transition="fade">
      <div class="modal-dialog">
        <a href="javascript:void(0)" class="positionCloseIcon" v-if="!isForceUpdate">
          <div class="borderRadius024" @click="close(1)">
            <span class="✕style">✕</span>
          </div>
          <div class="closeLine"></div>
        </a>
        <div class="modal-content">
          <div class="content-upgrade" v-html="msg">{{msg}}</div>
          <div class="btn-upgrade" @click="submit">
            <span>立即升级</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * modal 模态接口参数
     */
    props: ['modalOptions'],
    computed: {
      /**
       * 格式化props进来的参数,对参数赋予默认值
       */
      modal: {
        get() {
          let modal = this.modalOptions;
          modal = {};
          return modal;
        }
      }
    },
    data() {
      return {
        show: false,   // 是否显示模态框
        isForceUpdate: false,
        msg: '',
        resolve: '',
        reject: '',
        promise: ''  // 保存promise对象
      };
    },
    methods: {
      /**
       * 确定,将promise断定为完成态
       */
      submit() {
        this.resolve('submit');
      },
      /**
       * 关闭,将promise断定为reject状态
       * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
       */
      close(type) {
        this.show = false;
        if(type == 1) {
          this.reject(type);
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
  .modal
    position: fixed;
    left: 0
    top: 0
    right: 0
    bottom: 0
    outline: 0

  .modal-dialog
    position: absolute
    left: 50%
    top: 48%
    transform: translate(-50%, -50%)
    width: 2.81rem
    min-height: 3.71rem
    -webkit-transform: translateX(-50%) translateY(-50%)
    bg-image('../../../common/img/upgradeBg')

  .modal-content
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 100%
    padding: 2.08rem 0.33rem 0.26rem
    .content-upgrade
      height: 0.85rem
      line-height: 0.21rem
      margin-bottom: 0.1rem
      font-size: 0.14rem
      color: #7D8497
      font-family SourceHanSansCN-Regular
      overflow: auto
    .btn-upgrade
      width: 100%
      text-align: center
      line-height: 0.45rem
      height: 0.45rem
      background-image: linear-gradient(-227deg, #ebc678 0%, #d7ab69 100%)
      -webkit-border-radius: 0.5rem
      -moz-border-radius: 0.5rem
      border-radius: 0.5rem
      font-family: SourceHanSansCN-Medium
      span
        color: #fff
        font-size: 0.16rem
        font-family: SourceHanSansCN-Medium

  .modal-backup
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, 0.6)

  .positionCloseIcon
    position: absolute
    right: 0
    top: -0.6rem
    display: flex
    display: -webkit-flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    -webkit-align-items: center

  .borderRadius024
    width: 0.24rem
    height: 0.24rem
    border: 0.01rem solid #B0B0B0
    border-radius: 0.12rem

  .✕style
    height: 0.24rem
    line-height: 0.24rem
    display: block
    color: #B0B0B0
    text-align: center
    font-size: 0.2rem
  .closeLine
    height: 0.57rem
    border-left: 0.01rem solid #999999
  .updateIndex
    z-index: 1005;

</style>
