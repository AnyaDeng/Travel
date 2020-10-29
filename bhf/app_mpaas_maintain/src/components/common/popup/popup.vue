<template>
  <div>
    <div class="modal   alert  modal-backup" v-show="show" transition="fade" @touchmove.prevent>
      <div class="modal-dialog"  :class="{ 'min-modal-dialog': modal.min}">
        <div class="modal-content">
          <!--头部-->
          <div class="modal-header" v-if="!modal.isShowCloseBtn" >
            <slot name="header">
              <p class="title" :class="modal.cancelTitle">{{modal.title}}</p>
              <p class="subTitle">{{modal.subTitle}}</p>
            </slot>
            <a @click="close(0)" class="close" href="javascript:void(0)"></a>
          </div>
          <!--内容区域-->
          <div class="modal-body">
            <slot name="body">
              <p class="cntImg" :class="modal.cancelCntImg" v-if="modal.img"><img v-bind:src="modal.img" alt=""></p>
              <p class="cntTxt" v-else>{{modal.text}}</p>
            </slot>
            <slot name="evaluation" v-if="modal.highpraise">
              <img class="evaluation" src="../../../common/img/evaluation@3x.png"/>
              <p class="evaluationText">请为我们的服务评价</p>
            </slot>
          </div>
          <!--尾部,操作按钮-->
          <div class="modal-footer">
            <slot name="button">
              <div v-if="modal.showCancelButton"  class="button " :class="modal.cancelButtonClass"
                 @click="close(1)">
                <span>{{modal.cancelButtonText}}</span>
              </div>
              <div v-if="modal.showConfirmButton" class="button "
                 :class="modal.confirmButtonClass"
                 @click="submit">
                <span>{{modal.confirmButtonText}}</span>
              </div>
            </slot>
          </div>
          <a v-if="modal.isShowCloseBtn" @click="close(0)" href="javascript:void(0)" class="positionCloseIcon">
            <div class="borderRadius024">
              <span class="✕style">✕</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!--<div v-show="show" class="modal-backup" transition="fade"></div>-->
  </div>
</template>

<script>
  export default {
    /**
     * modal 模态接口参数
     * @param {string} modal.title 模态框标题
     * @param {string} modal.subTitle 模态框副标题
     * @param {string} modal.text 模态框内容
     * @param {boolean} modal.showCancelButton 是否显示取消按钮
     * @param {string} modal.cancelButtonClass 取消按钮样式
     * @param {string} modal.cancelButtonText 取消按钮文字
     * @param {string} modal.showConfirmButton 是否显示确定按钮
     * @param {string} modal.confirmButtonClass 确定按钮样式
     * @param {string} modal.confirmButtonText 确定按钮标文字
     */
    props: ['modalOptions'],
    computed: {
      /**
       * 格式化props进来的参数,对参数赋予默认值
       */
      modal: {
        get() {
          let modal = this.modalOptions;
          modal = {
            min: modal.min,
            title: modal.title || '提示', // 主标题
            cancelTitle: modal.cancelTitle ? 'cancelTitle' : '', // 主标题样式
            subTitle: modal.subTitle || '', // 副标题
            img: modal.img, // 弹框图片
            cancelCntImg: modal.cancelCntImg ? 'cancelCntImg' : '', // 弹框图片样式
            text: modal.text, // 弹框文本
            showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton, // 是否显示取消按钮，默认true
            cancelButtonClass: modal.cancelButtonClass ? modal.cancelButtonClass : 'btn-default', // 取消按钮样式
            cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消', // 取消按钮文本
            showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton, // 是否显示确定按钮，默认true
            confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-active', // 确定按钮样式
            confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定', // 确定按钮文本
            isShowCloseBtn: modal.isShowCloseBtn ? modal.isShowCloseBtn : false,   //是否显示关闭弹窗的叉号
            highpraise: modal.highpraise ? modal.highpraise : false    // 好评body
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
    top: 50%
    transform: translate(-50%, 0)
    width: 3rem
    -webkit-transform: translateX(-50%) translateY(-50%)
    background: #fff
    border-radius: 0.08rem
  .min-modal-dialog
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, 0)
    width: 2.45rem
    -webkit-transform: translateX(-50%) translateY(-50%)
    background: #fff
    box-shadow: 4px 5px 8px 3px rgba(35,46,68,0.25);
    border-radius: 0.1rem;


  .modal-backup
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, 0.6)

  .modal-header
    display: flex
    display: -webkit-flex
    flex-direction: column
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
    padding-bottom: 0.12rem
    /*height: 0.665rem*/
    .title
      font-family: SourceHanSansCN-Regular
      font-size: 0.18rem
      color: #232323
      margin-top: 0.12rem
    .cancelTitle
      font-family: SourceHanSansCN-Regular
      font-size: 0.14rem
      color: #232323
      margin-top: 0.24rem
    .subTitle
      font-size: 0.16rem
      color: #7D8497
      margin-top: 0.08rem

  .modal-body
    .cntImg
      img
        width: 100%
    .cntTxt
      padding: 0 0.3rem 0 0.35rem
      font-size: 0.12rem
      color: #232323
      line-height: 0.18rem
      text-align center
    .cancelCntImg
      padding 0.15rem 0.72rem
  .modal-footer
    display: flex
    display: -webkit-flex
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
    margin-top: 0.1rem
    flex-grow: 1
    border-top-1px(1px, #D2D7E0)
    div
      font-family: SourceHanSansCN-Normal
      display: flex
      display: -webkit-flex
      justify-content: center
      -webkit-justify-content: center
      align-items: center
      -webkit-align-items: center
      flex-grow: 1
      width: 100%
      height: 0.445rem
      font-size: 0.16rem
    .btn-default
      color: #7D8497
    .btn-active
      /*border-left: 0.005rem solid #D2D7E0*/
      border-left-1px(1px, #D2D7E0)
      color: #D5A764
  .positionCloseIcon
    position: absolute
    left: 50%;
    transform: translate(-50%,50%);
  .borderRadius024
    width: 0.38rem
    height: 0.38rem
    border: 1px solid #FFF
    border-radius: 0.24rem
  .✕style
    height: 0.38rem
    line-height: 0.38rem
    display: block
    color: #FFF
    text-align: center
    font-size: 0.19rem
  .evaluation
    width: 2.1rem
    height: 1.7rem
    display: flex;
    margin: 0 auto;

  .evaluationText
    font-size 0.16rem
    padding-bottom: 0.04rem
    text-align: center

</style>
