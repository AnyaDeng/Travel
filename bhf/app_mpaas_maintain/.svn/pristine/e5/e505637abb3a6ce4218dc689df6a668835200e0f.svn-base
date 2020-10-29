<template>
  <div class="authority" :class="{'authorityFitIphoneX': this.isIphoneX()}">
    <div class="module-header">
      <div class="contentText">滨海国金所深知个人信息对您的重要性，并会尽全力保护您的个人信息安全。您在使用滨海国金所APP时，为了向您提供优质的服务，我们需要获取以下权限及信息。</div>
    </div>
    <div class="module-container">
      <div class="container_outer">
        <div class="authority_icon">
          <span class="iconStyle storage"></span>
        </div>
        <div class="container_inner">
          <div class="container_title">存储</div>
          <div class="container_text">
            用于缓存文本/图片/视频等信息；当您进行设置头像/提交意见反馈等操作时，也可能需要从手机存储中读取图文信息。拒绝授权后，产品/活动图片等信息将无法正常显示，您将无法正常使用滨海国金所。
          </div>
        </div>
      </div>
      <div class="container_outer">
        <div class="authority_icon">
          <span class="iconStyle location"></span>
        </div>
        <div class="container_inner">
          <div class="container_title">位置信息</div>
          <div class="container_text">用于电子账户交易风控，保障APP交易安全。同时可供您查看相关地区的运营活动。拒绝授权后，电子账户交易/部分运营活动将可能无法正常使用。</div>
        </div>
      </div>
      <div class="container_outer">
        <div class="authority_icon">
          <span class="iconStyle equipment"></span>
        </div>
        <div class="container_inner">
          <div class="container_title">设备信息</div>
          <div class="container_text">用于确定设备ID等信息，确保账号登录的安全性。拒绝后，可能无法正常登录账号。</div>
        </div>
      </div>
      <div class="container_outer">
        <div class="authority_icon">
          <span class="iconStyle phone"></span>
        </div>
        <div class="container_inner">
          <div class="container_title">拨打电话及麦克风管理</div>
          <div class="container_text">用于与客服电话或语音沟通，或完成部分交易的语音校验。拒绝后，可能无法正常相关服务。</div>
        </div>
      </div>
    </div>
    <div class="module-footer">
      <div class="contentText">系统将弹框请求，建议您允许滨海国金所获取相关权限。如拒绝相关权限，您仍可浏览滨海国金所APP，但部分服务可能无法正常使用。</div>
      <div class="contentText">请您在使用滨海国金所APP前，认真阅读<span
        @click="rechargeFrame(framePath_sever)">《滨海国金所服务协议（个人会员版）》（所有用户）</span>及<span
        @click="rechargeFrame(privacy_sever)">《隐私政策》</span>全部条款，并确认是否同意。如您同意，请点击下方的“同意”按钮，并开始使用我们的服务。
      </div>
    </div>
    <div class="btn" :class="{'btnFitIphoneX': this.isIphoneX()}">
      <div class="btn-container" v-if="isGetPermission" >
        <div class="button btn-default" @click="disagreeBtn">
          <span>不同意</span>
        </div>
        <div class="button btn-active" @click="agreeBtn">
          <span>同意</span>
        </div>
      </div>
      <div class="btn-container" v-else>
        <div class="button btn-active" @click="entranceApp">
          <span>进入滨海国金所APP</span>
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
          headerTitle: '温馨提示'
        },
        isGetPermission: true,
        framePath_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        privacy_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      };
    },
    mounted() {
      this.sendMsgToParent();
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      rechargeFrame(framePath) {
        try {
          this.analysys.ma_btnClick(`点击了协议${framePath}`);
        } catch (e) {
        }
        this.thirdLinks(framePath);
      },
      agreeBtn() {
        this.analysys.ma_btnClick('点击同意');
        this.isGetPermission = false;
        this.setLocalStorage('bhfae_isShowPrivacyAlert', '1');
        this.entranceApp();
      },
      disagreeBtn() {
        this.analysys.ma_btnClick('点击不同意');
        this.terminateApp();
      },
      entranceApp() {
        this.analysys.ma_btnClick('点击进入滨海国金所APP');
        this.$router.push({
          path: this.getAppLaunchPath()
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .authority
    width: 100%
    min-height: 100%
    background: #fff
    padding-bottom 0.45rem
    .module-header
      width: 100%
      padding: 0.12rem 0.19rem 0.12rem
      background: #ffffff
      .contentText
        font-family: SourceHanSansCN-Normal
        font-size: 0.14rem
        color: #232323
        line-height: 0.18rem
    .module-container
      background: #ffffff
      width: 100%
      .container_outer
        display: flex
        display: -webkit-flex
        justify-content: flex-start
        -webkit-justify-content: flex-start
        align-items: flex-start
        -webkit-align-items: flex-start
        padding: 0 0.19rem 0.15rem
        .authority_icon
          min-width: 0.22rem
          .iconStyle
            display: inline-block
            width: 0.15rem
            height: 0.15rem
          .storage
            bg-image('./img/storage')
          .location
            bg-image('./img/location')
          .equipment
            bg-image('./img/equipment')
          .phone
            bg-image('./img/phone')
        .container_inner
          .container_title
            margin-bottom: 0.03rem
            font-family: SourceHanSansCN-Normal
            font-size: 0.16rem
            line-height: 0.18rem
            color: #D7A853
          .container_text
            font-family: SourceHanSansCN-Normal
            font-size: 0.14rem
            line-height: 0.18rem
            color: #232323
    .module-footer
      padding-top: 0.12rem
      padding-bottom: 0.1rem
      width: 100%
      background: #ffffff
      .contentText
        font-family: SourceHanSansCN-Normal
        font-size: 0.14rem
        color: #232323
        line-height: 0.18rem
        padding: 0 0.19rem 0.15rem
        span
          color: #6098DE
    .btn
      position: fixed
      bottom: 0
      left: 0
      background #fff
      width:100%
      .btn-container
        display: flex
        display: -webkit-flex
        justify-content: center
        -webkit-justify-content: center
        align-items: center
        -webkit-align-items: center
        flex-grow: 1
        border-top-bottom-1px(1px, #D2D7E0)
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
          font-size: 0.18rem
        .btn-default
          color: #7D8497
        .btn-active
          border-left-1px(1px, #D2D7E0)
          color: #D5A764
  .btnFitIphoneX
    padding-bottom 0.34rem
  .authorityFitIphoneX
    padding-bottom 0.79rem
</style>
