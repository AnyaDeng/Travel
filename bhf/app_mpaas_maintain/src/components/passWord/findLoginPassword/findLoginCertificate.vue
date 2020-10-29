<template>
  <div class="container-fluid">
    <div class="prompt">
      <p>您已实名认证，请输入实名的身份信息</p>
    </div>
    <div class="row" >
      <ul class="list-group">
        <li class=" "
            :class="{borderBottoms:borderBottoms}">
          <span class="cardId">身份证号</span>
          <span>
          <input class="form-control" type="text" placeholder="输入持卡人身份证号"
                 v-model="certificateNo" v-on:input="checkCertificateNo" maxlength="18" >
          </span>
        </li>
      </ul>
    </div>
    <div class="prompt" >
      <p class="mistake" v-show="showPrompt">{{mistakeInfo}} </p>
    </div>

    <div class="btn-container">
      <div  class="btn-success" :class="{disabled: disable}" @click="jumpToFindLoginPasswordView()">
        <span>下一步</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        message: '错误提示',
        disable: true,
        mistakeInfo: '身份信息错误提示',
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '身份证号',
          headerRight: this.headerBtn.service
        },
        borderBottoms: false,
        certificateNo: '',
        certificateType: 0,
        showPrompt: false,
        show: false,
        mobile: this.$route.params.mobile,
        sourcePage: this.$route.params.sourcePage,
        test: ''
      };
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['findLoginValidateCode'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    activated() {
      if (this.$route.meta.isBack === false) {
        this.sourcePage = this.$route.params.sourcePage;
        this.mobile = this.$route.params.mobile;
        this.certificateNo = '';

        this.mistakeInfo = '';
        this.borderBottoms = false;
        this.showPrompt = false;
        this.disable = true;

      }
      this.sendMsgToParent();
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击取消回退
          this.fallBack();
        } else if(params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      fallBack() {
        let _this = this;
        this.$confirm('', '确定放弃找回密码？', function () {
          if (_this.sourcePage && _this.sourcePage !== '') {
            _this.$router.push({
              name: _this.getSourcePage(_this.sourcePage)
            });
          } else {
            _this.$router.push({
              name: 'login'
            });
          }
        });
      },
      checkCertificateNo() {
        this.disable = true;
        let pattern = /^(\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x))|(\d{15)$/;
        let certificateNo = this.certificateNo;
        if (this.certificateNo.length !== 18) {
          return;
        }
        if (pattern.test(certificateNo) !== true) {
          this.borderBottoms = true;
          this.mistakeInfo = "身份证格式不正确,请输入正确格式的身份证号";
          this.disable = true;
          this.showPrompt = true;
          return false;
        } else {
          this.borderBottoms = false;
          this.showPrompt = false;
          this.mistakeInfo = '';
          this.disable = false;
          return true;
        }
      },
      jumpToFindLoginPasswordView() {
        this.mtj_event('u_resetPwd_idCard_next', '找回密码输入身份证页面点击下一步按钮');
        this.analysys.ma_btnClick("点击下一步按钮");
        if (!this.checkCertificateNo()) {
          return;
        }
        let _this = this;
        const certInfo = {};
        certInfo.certificateNo = _this.certificateNo;
        certInfo.mobile = _this.mobile;
        _this.$router.push({
          name: 'findLoginPassword',
          params: {'certInfo': certInfo, 'sourcePage': _this.sourcePage}
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "findLoginCertificate.styl"
</style>
