<template>
  <div class="modal alert modal-backup authorityPopup" v-show="show" transition="fade" @touchmove.prevent>
    <div class="modal-dialog">
      <div class="modal-content">
        <!--头部-->
        <div class="modal-header basketBox">
          <slot name="header">
            <p class="title">权限用途说明</p>
          </slot>
        </div>
        <!--内容区域-->
        <div class="modal-body">
          <slot name="body">
            <div class="module-container-header">
              <div class="contentText">我们深知个人信息对您的重要性，承诺尽全力保护您个人信息的安全。为向您提供优质的服务，我们需要获取以下权限及信息：</div>
            </div>
            <div class="module-container">
              <div class="container_outer" v-for="(item, index) in msgList" :key="index">
                <div class="authority_icon">
                  <span class="iconStyle" :class="item.icon"></span>
                </div>
                <div class="container_inner">
                  <div class="container_title">{{item.title}}</div>
                  <div class="container_text">{{item.content}}</div>
                </div>
              </div>
            </div>
            <div class="module-container-footer">
              <div class="contentText">系统将弹框请求，请您允许滨海国金所获取相关权限。</div>
            </div>
          </slot>
        </div>
        <!--尾部,操作按钮-->
        <div class="modal-footer">
          <slot name="button">
            <div class="button btn-active" @click="confirm">
              <span>我知道了</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false, // 是否显示模态框,
        msgList: [],
        promptMessage: [{ // 位置信息
          icon: 'location',
          code: this.permissionCode.ACCESS_LOCATION.code,
          title: this.permissionCode.ACCESS_LOCATION.name,
          content: '用于获取手机的位置信息，以进行电子账户及注册、登录、资金交易的风控，包括为满足反洗钱要求的风险控制措施，确保交易安全合规。'
        }, { // 设备信息
          icon: 'equipment',
          code: this.permissionCode.READ_PHONE_STATE.code,
          title: this.permissionCode.READ_PHONE_STATE.name,
          content: '用于读取您的设备ID等基础信息，以进行注册、登录、资金交易时的安全校验，确保账号的安全性。'
        }, { // 存储--读取
          icon: 'storage_read',
          code: this.permissionCode.READ_EXTERNAL_STORAGE.code,
          title: this.permissionCode.READ_EXTERNAL_STORAGE.name,
          content: '用于缓存文本/图片/视频等信息；当您从相册选择图片上传或进行微信分享时，也需要从手机存储中读取文件信息。'
        }, { // 存储--写入
          icon: 'storage_write',
          code: this.permissionCode.WRITE_EXTERNAL_STORAGE.code,
          title: this.permissionCode.WRITE_EXTERNAL_STORAGE.name,
          content: '用于拍摄上传图片/视频时的内存写入。'
        }, { // 相机
          icon: 'camera',
          code: this.permissionCode.CAMERA.code,
          title: this.permissionCode.CAMERA.name,
          content: '用于拍摄上传图片/视频，包括交易风控中的人脸识别、银行卡/身份证图像识别，和其他上传图像功能中的“拍摄上传”功能。'
        }, { // 麦克风
          icon: 'audio',
          code: this.permissionCode.RECORD_AUDIO.code,
          title: this.permissionCode.RECORD_AUDIO.name,
          content: '用于完成语音互动功能中的语音获取及实时语音识别。'
        }, { // 拨打电话
          icon: 'phone',
          code: this.permissionCode.CALL_PHONE.code,
          title: this.permissionCode.CALL_PHONE.name,
          content: '用于拨打客服电话。'
        }]
      };
    },
    mounted() {
    },
    methods: {
      showPopup(config) {
        this.msgList = [];
        this.msgList = this.notEmpty(this.promptMessage.filter(item => config.indexOf(item.code) !== -1), []);
        this.show = true;
      },
      confirm(type) {
        this.show = false;
        this.$bus.emit('authorityPopupConfirm');
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .authorityPopup
    z-index: 1020
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
    border-bottom-1px(1px, #D2D7E0)
    .title
      font-family: SourceHanSansCN-Regular
      font-size: 0.18rem
      color: #232323
      margin-top: 0.12rem
    .subTitle
      font-size: 0.16rem
      color: #7D8497
      margin-top: 0.08rem

  .modal-body
    .module-container-header
      width: 100%
      padding: 0.12rem 0.19rem 0
      background: #ffffff
      .contentText
        font-family: SourceHanSansCN-Normal
        font-size: 0.12rem
        color: #232323
        line-height: 0.16rem
        text-align: justify
    .module-container
      padding: 0.1rem 0 0
      background: #ffffff
      width: 100%
      max-height: 4rem
      overflow: auto
      .container_outer
        display: flex
        display: -webkit-flex
        justify-content: flex-start
        -webkit-justify-content: flex-start
        align-items: flex-start
        -webkit-align-items: flex-start
        padding: 0 0.19rem 0.1rem
        .authority_icon
          min-width: 0.22rem
          .iconStyle
            display: inline-block
            width: 0.15rem
            height: 0.15rem
          .storage_read
            bg-image('./img/chucun')
          .storage_write
            bg-image('./img/wenjian')
          .location
            bg-image('./img/weizhi')
          .equipment
            bg-image('./img/shebei')
          .phone
            bg-image('./img/phone')
          .audio
            bg-image('./img/maikefeng')
          .camera
            bg-image('./img/xiangji')
        .container_inner
          .container_title
            margin-bottom: 0.03rem
            font-family: SourceHanSansCN-Normal
            font-size: 0.14rem
            line-height: 0.16rem
            color: #CC924F
          .container_text
            font-family: SourceHanSansCN-Normal
            font-size: 0.12rem
            line-height: 0.16rem
            color: #232323
            text-align: justify
      &::-webkit-scrollbar //隐藏滚动条
        display: none
    .module-container-footer
      padding-bottom: 0.1rem
      width: 100%
      background: #ffffff
      .contentText
        font-family: SourceHanSansCN-Normal
        font-size: 0.12rem
        color: #232323
        line-height: 0.16rem
        padding: 0 0.19rem
        text-align: justify
        span
          color: #6098DE
  .modal-footer
    display: flex
    display: -webkit-flex
    justify-content: center
    -webkit-justify-content: center
    align-items: center
    -webkit-align-items: center
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
    .btn-active
      color: #D5A764
</style>
