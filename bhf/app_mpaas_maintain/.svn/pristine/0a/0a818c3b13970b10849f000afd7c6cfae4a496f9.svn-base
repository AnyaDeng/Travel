<template>
  <div v-transfer-dom class="popupBottomScreen">
    <popup v-model="popupScreenShow" position="bottom" :hide-on-blur="modal.hideOnBlur" @touchmove.prevent>
      <div class="modal-content">
        <!--头部-->
        <div class="modal-header" v-show="modal.showHeader">
          <slot name="header">
            <a href="javascript:void(0)"></a>
            <p class="title">{{modal.title}}</p>
            <a @click="close(1)" class="close" href="javascript:void(0)">完成</a>
          </slot>

        </div>
        <!--内容区域-->
        <div class="modal-body">
          <slot name="body">
            <p class="cntImg" v-if="modal.img"><img v-bind:src="modal.img" alt=""></p>
            <p class="cntTxt" v-else>{{modal.text}}</p>
          </slot>
        </div>
        <!--尾部,操作按钮-->
        <div class="modal-footer">
          <slot name="button">
            <div class="row">
              <div class="btn-container">
                <div v-if="modal.showChangeBankButton" class="btn-success unBund " :class="modal.changeBankButtonClass"
                     @click="changeBank">
                  <span>换卡</span>
                </div>
              </div>
              <div class="btn-container">
                <div v-if="modal.showConfirmButton" class="btn-success unBund " :class="modal.confirmButtonClass"
                     @click="submit">
                  <span>解绑</span>
                </div>
              </div>
              <div class="btn-container">
                <div v-if="modal.showCancelButton" class="btn-success cancle " :class="modal.cancelButtonClass"
                     @click="close(1)">
                  <span>取消</span>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {TransferDom, Popup, Checker, CheckerItem, DatetimeView} from 'vux';

  export default {
    /**
     * modal 模态接口参数
     * @param {string} modal.showHeader 模态框头部显隐
     * @param {string} modal.title 模态框标题
     * @param {string} modal.subTitle 模态框副标题
     * @param {string} modal.text 模态框内容
     * @param {boolean} modal.showCancelButton 是否显示取消按钮
     * @param {string} modal.cancelButtonClass 取消按钮样式
     * @param {string} modal.cancelButtonText 取消按钮文字
     * @param {string} modal.showConfirmButton 是否显示确定按钮
     * @param {string} modal.confirmButtonClass 确定按钮样式
     * @param {string} modal.confirmButtonText 确定按钮标文字
     * @param {string} modal.showChangeBankButton 是否显示换卡按钮
     * @param {string} modal.changeBankButtonClass 换卡按钮样式
     * @param {string} modal.changeBankButtonText 换卡按钮标文字
     */
    props: ['modalOptions'],
    directives: {
      TransferDom
    },
    components: {
      DatetimeView,
      Checker,
      CheckerItem,
      Popup
    },
    computed: {
      /**
       * 格式化props进来的参数,对参数赋予默认值
       */
      modal: {
        get() {
          let modal = this.modalOptions;
          modal = {
            showHeader: typeof modal.showHeader === 'undefined' ? false : modal.showHeader, // 模态框头部显隐,默认false
            title: modal.title || '解绑银行卡', // 主标题
            img: modal.img, // 弹框图片
            showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton, // 是否显示取消按钮，默认true
            cancelButtonClass: modal.cancelButtonClass ? modal.cancelButtonClass : '', // 取消按钮样式
            cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消', // 取消按钮文本
            showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton, // 是否显示确定按钮，默认true
            confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : '', // 确定按钮样式
            confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定', // 确定按钮文本
            showChangeBankButton: typeof modal.showChangeBankButton === 'undefined' ? true : modal.showChangeBankButton, // 是否显示换卡按钮，默认true
            changeBankButtonClass: modal.changeBankButtonClass ? modal.changeBankButtonClass : '', // 换卡按钮样式
            changeBankButtonText: modal.changeBankButtonText ? modal.changeBankButtonText : '确定', // 换卡按钮文本
            hideOnBlur: !modal.hideOnBlur ? modal.hideOnBlur : true // 点击遮罩时是否自动关闭
          };
          return modal;
        }
      }
    },
    data() {
      return {
        popupScreenShow: false,   // 是否显示模态框
        resolve: '',
        reject: '',
        promise: ''  // 保存promise对象
      }
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      /**
       * 换卡,将promise断定为完成态
       */
      changeBank(type) {
        this.popupScreenShow = false;
        this.reject(type);
      },
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
      close() {
        this.popupScreenShow = false;
      },
      /**
       * 显示confirm弹出,并创建promise对象
       * @returns {Promise}
       */
      confirm() {
        this.popupScreenShow = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;   // 返回promise对象,给父级组件调用
      }
    },
    watch: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .popupBottomScreen
    .vux-popup-dialog
      overflow-y: hidden
      background: #fff

    .modal-header
      padding: 0.14rem 0.15rem
      border-bottom: 0.005rem solid #D2D7E0
      display: flex
      display: -webkit-flex
      justify-content space-between
      -webkit-justify-content: space-between
      align-items: center
      -webkit-align-items: center
      .title
        color: #232323
        font-size: 0.16rem
      a
        width: 25%
        text-align: right
        color: #6CA0E1
        font-size: 0.16rem
    .modal-body
      .cntImg
        display: flex
        justify-content: center
        align-items: center
        img
          width: 3rem
          margin: 0.1rem 0 1.825rem 0
    .modal-footer
      .row
        margin-bottom 0
      .unBund
        margin-bottom 0
        background-image: linear-gradient(-227deg, #EBC678 0%, #D7AB69 100%)
      .cancle
        border: 1px solid #D5A764;
        background-color #f3f5f7
        background-image: linear-gradient(-227deg, #fff 0%, #fff 100%)
        box-shadow: none
        span
          color #EBC678
      .button-share
        border: none
        margin-bottom 0
        span
          color #232323
</style>

