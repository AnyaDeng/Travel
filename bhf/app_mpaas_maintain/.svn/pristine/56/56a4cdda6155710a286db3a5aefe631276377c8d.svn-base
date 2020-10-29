<template>
  <div>
    <div class="modal   alert  modal-backup" v-show="show" transition="fade" @touchmove.prevent>
      <div class="modal-dialog">
        <div class="modal-content">
          <!--头部-->
          <div class="modal-header">
            <slot name="header">
              <p class="title">输入图中验证码</p>
              <p @click="close(1)" class="icon-CloseBounced close" href="javascript:void(0)"></p>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="graphCode">
                <img class="verifica_img" :src="imgSrc" :onerror="defaultImg" id="changeCode" @click="getCode">
              </div>
              <p class="tipText">看不清？点击刷新</p>
              <p class="captcha">
                <input type="number" @input="graphCodeInput(graphCode)" pattern="[0-9]*"
                       oninput="if(value.length>4)value=value.slice(0,4)"
                       v-model="graphCode" placeholder="输入验证码" >
              </p>
            </slot>
          </div>
          <!--尾部,操作按钮-->
          <div class="modal-footer">
            <slot name="button">
              <div class="btn-container">
                <div class="btn-success " :class="{disabled: disabled}" @click="submit()">
                  <span>确认</span>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      graphCodeType: {
        type: String
      }
    },
    data() {
      return {
        show: false,   // 是否显示模态框
        disabled: true,
        graphCode: '',
        imgSrc: '',
        defaultImg: 'this.src="' + require('../../../../static/img/clickRetry.png') + '"'
      };
    },
    methods: {
      submit() {
        this.$emit('graphCodeEvent', {'graphCode': this.graphCode});
        this.show = false;
        this.graphCode = '';
      },
      openView() {
        this.show = true;
        this.getCode();
      },
      close() {
        this.show = false;
      },
      graphCodeInput(graphCode) {
        let isOk = this.isNotEmpty(graphCode.trim()) && graphCode.trim().length === 4
        if (isOk) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      getCode() {
        this.disabled = true;
        this.graphCode = '';
        let type = this.graphCodeType;
        let url = this.toShowCode(type);
        this.imgSrc = url;
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
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center

  .title
    font-family: SourceHanSansCN-Regular
    font-size: 0.18rem
    color: #232323
    margin-top: 0.26rem

  .close
    position absolute
    top 0.1rem
    right 0.1rem

  .icon-CloseBounced
    &:before
      color #C6C6C6
      font-size 0.12rem

  .modal-body
    display: flex
    display: -webkit-flex
    flex-direction: column
    justify-content: center
    align-items: center
    -webkit-align-items: center
    .graphCode
      width: 1.4rem
      height: 0.56rem
      margin-top 0.41rem
      text-align: center
      .verifica_img
        max-width: 1.4rem;
    .tipText
      margin-top 0.06rem
      font-size 0.12rem
      color #c6c6c6
    .captcha
      margin-top 0.34rem
      border-bottom-1px(1px, #acafb8)
      input
        font-size 0.14rem
        color #232323
        height 0.3rem
        line-height 0.15rem
        text-align center
        &.form-control
          height 90%
          overflow: hidden;
          font-family: SourceHanSansCN-Regular;
        &::-webkit-input-placeholder
          font-family: SourceHanSansCN-Regular;
          font-size 0.14rem
          color #acafb8
          letter-spacing 0
          text-align center

  .modal-footer
    display: flex
    display: -webkit-flex
    flex-direction: column
    justify-content: center
    align-items: center
    -webkit-align-items: center
    .btn-container
      margin-top 0.3rem
      width 2.3rem


</style>
