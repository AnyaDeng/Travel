<template>
  <div>
    <div class="modal" v-show="show" transition="fade" @touchmove.prevent>
      <div class="modal-dialog">
        <div class="modal-content">
          <!--头部-->
          <div class="modal-header">
            <slot name="header">
              <p class="title" :class="{ 'fontColor': modal.color}">{{modal.title}}</p>
              <p class="subTitle">{{modal.subTitle}}</p>
            </slot>
            <a @click="close(0)" class="close" href="javascript:void(0)"></a>
          </div>
          <!--内容区域-->
          <div class="modal-body">
            <slot name="body">
              <p class="cntImg"><img v-bind:src="modal.img" alt=""></p>
              <span class=" step stepFirst "><span class="">1.</span>填写充值金额</span>
              <span class=" step stepSecond "><span class="">2.</span>获取充值码</span>
              <span class=" step  stepThird "><span>3.</span>银行转账</span>
              <p class="cntTxt">{{modal.text}}</p>
              <p class="note">{{modal.note}}</p>
            </slot>
          </div>
          <!--尾部,操作按钮-->
          <div class="modal-footer">
            <slot name="button">
              <div class="btn-container">
                <div class="btn-radius " :class="{disabled: btnDisabled}" @click="close(1)">
                  <span>{{modal.btnCnt}}</span>
                </div>
              </div>
              <!--<a @click="close(0)" href="javascript:void(0)" class="textAlign marginAuto background_D5 borderRadius_100 height_045 margin_bottom2" ><span class="color_fff fontSize_018">去充值</span></a>-->
              <!-- <a v-if="modal.showCancelButton" href="javascript:void(0)" class="button" :class="modal.cancelButtonClass"
                  @click="close(1)">{{modal.cancelButtonText}}</a>
               <a v-if="modal.showConfirmButton" href="javascript:void(0)" class="button"
                  :class="modal.confirmButtonClass"
                  @click="submit">{{modal.confirmButtonText}}</a>-->
            </slot>
          </div>
          <a @click="close(0)" href="javascript:void(0)" class="positionCloseIcon">
            <div class="borderRadius024">
              <span class="✕style">✕</span>
            </div>
          </a>
        </div>
        <!--<a @click="close(0)" href="javascript:void(0)" class="positionCloseIcon">
          <div class="borderRadius024">
            <span class="✕style">✕</span>
          </div>
        </a>-->
      </div>
    </div>
    <div v-show="show" class="modal-backup" transition="fade"></div>
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
            title: modal.title || '提示', // 主标题
            subTitle: modal.subTitle || '', // 副标题
            img: modal.img, // 弹框图片
            text: modal.text, // 弹框文本
            note: modal.note, // 弹框注意文本
            btnCnt: modal.btnCnt || '去充值', //按钮文字
            color: modal.color, // 字体颜色
            showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton, // 是否显示取消按钮，默认true
            cancelButtonClass: modal.cancelButtonClass ? modal.cancelButtonClass : 'btn-default', // 取消按钮样式
            cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消', // 取消按钮文本
            showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton, // 是否显示确定按钮，默认true
            confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-active', // 确定按钮样式
            confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定' // 确定按钮文本
          };
          return modal;
        }
      }
    },
    data() {
      return {
        show: false,   // 是否显示模态框
        resolve: '',
        btnDisabled: false,
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
        if (type === 1) {
          this.mtj_event('a_recharge_big_alert', '大额充值点击提示框确定按钮');
        } else {
          this.mtj_event('a_recharge_big_alert', '大额充值点击提示框取消按钮');
        }

        this.show = false;
        // this.reject(type);
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

  .positionRelativeTopRight
    position: relative
    top: -1rem
    right: -0.05rem

  .✕style
    height: 0.38rem
    line-height: 0.38rem
    display: block
    color: #FFF
    text-align: center
    font-size: 0.19rem

  .borderRadius024
    width: 0.38rem
    height: 0.38rem
    border: 1px solid #FFF
    border-radius: 0.24rem

  .positionCloseIcon
    position: absolute
    bottom: -0.52rem
    left: 1.31rem

  .modal
    position: fixed;
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 1001
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

  .modal-content
    position: relative

  .modal-backup
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 1000
    background: rgba(0, 0, 0, 0.6)

  .modal-header
    display: flex
    display: -webkit-flex
    flex-direction: column
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
    /*height: 0.665rem*/
    .title
      font-family: SourceHanSansCN-Regular;
      font-size: 0.18rem;
      color: #111111;
      letter-spacing: 0;
      line-height: 0.27rem
      margin-top: 0.2rem
    .fontColor
      color: #59402c;
    .subTitle
      font-size: 0.16rem
      color: #7D8497
      margin-top: 0.08rem

  .modal-body
    .cntImg
      width 2.34rem;
      height 1.35rem
      margin 0.41rem 0.32rem 0.075rem 0.34rem
      img
        width: 100%
    .step
      font-family: SourceHanSansCN-Normal;
      font-size: 0.11rem;
      color: #232323;
      letter-spacing: 0;
      line-height: 0.2rem;
      span
        font-family: Roboto-Regular;
        font-size: 0.18rem;
        color: #D5A764;
        letter-spacing: 0;
    .stepFirst
      margin-left 0.2rem
    .stepSecond
      position: relative
      top: -1rem
      right: -0.05rem
    .stepThird
      float right
      padding-right 0.4rem
    .cntTxt
      padding: 0.33rem 0.18rem 0 0.18rem
      font-family: SourceHanSansCN-Normal;
      font-size: 0.12rem;
      color: #7D8497;
      letter-spacing: 0;
      line-height: 0.18rem;
    .note
      padding: 0.15rem 0.18rem 0 0.18rem
      font-family: SourceHanSansCN-Normal;
      font-size: 0.12rem;
      color: #7D8497;
      letter-spacing: 0;
      line-height: 0.18rem;
      text-align center
      padding-left 0
      padding-right 0

  .modal-footer
    display: flex
    display: -webkit-flex
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
    margin-top: 0.06rem
    .btn-container
      width 3rem
      margin-top: 0
      .btn-radius
        margin: 0.15rem 0.35rem 0.185rem
    .btn-default
      border-right: 0.005rem solid #D2D7E0
      color: #7D8497
    .btn-active
      border-left: 0.005rem solid #D2D7E0
      color: #D5A764
</style>
