<template>
  <div class="container-fluid">
    <div class="form-group">
      <ul>
        <li>
          <div class="login">
            <span class="loginPassword">登录密码</span>
            <div class="visible" @click="showPassword()">
              <span v-if="passwordShow" class="icon-invisible"></span>
              <span v-else class="icon-visible"></span>
            </div>
            <div class="inputBox">
              <input id="password" class="form-control" type="password"
                     placeholder="请输入6-16位数字、字母" v-model="password" v-validate="'required|passWord'" name="passWord"
                     @keyup="passwordChange" maxlength="16">
            </div>
          </div>
        </li>
        <li class="confirmPassword">
          <div class="login">
            <span class="conPassword">确认密码</span>
            <div class="visible" @click="showConfirmPassword()">
              <span v-if="confirmPasswordShow" class="icon-invisible"></span>
              <span v-else class="icon-visible"></span>
            </div>
            <div class="inputBox">
              <input id="confirmPassword" class="form-control" type="password"
                     placeholder="请再次输入登录密码"
                     v-model="confirmPassword" @keyup="matchPassword" maxlength="16">
            </div>
          </div>
        </li>
        <li class=""
            :class="{borderBottoms:borderBottoms}"></li>
        <li class="validate-errors ">
          <span v-show="showPrompt || errors.has('passWord')">{{prompt || errors.first('passWord')}}</span>
        </li>
      </ul>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="submitPassword">
          <span>确认</span>
        </div>
      </div>
    </div>
    <confirm ref="findLoginSuccessDialog" :modal-options.sync="popupInfo"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          findLoginPassword: this.apiType().findLoginPassword
        },
        mobile: this.$route.params.certInfo.mobile,
        certificateNo: this.$route.params.certInfo.certificateNo,
        prompt: '',
        password: '',
        confirmPassword: '',
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '设置登录密码',
          headerRight: this.headerBtn.service
        },
        disabled: true,
        borderBottoms: false,
        showPrompt: false,
        passwordShow: true,
        confirmPasswordShow: true,
        popupInfo: {
          title: '找回登录密码成功',
          img: 'static/img/pswSuccess.png',
          showCancelButton: false,
          confirmButtonText: '确定'
        },
        sourcePage: this.$route.params.sourcePage,
        isFindPassword: false // 是否找回密码成功
      };
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.$bus.on('devicePause', this.clearPassword);
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['findLoginValidateCode', 'findLoginCertificate'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    activated() {
      // 向父组件通信
      this.sendMsgToParent();
      if (this.$route.meta.isBack === false) {
        this.sourcePage = this.$route.params.sourcePage;
        this.mobile = this.$route.params.certInfo.mobile;
        this.certificateNo = this.$route.params.certInfo.certificateNo;

        this.clearPassword();

        // this.password = '';
        // this.confirmPassword = '';
        //
        // this.borderBottoms = false;
        // this.showPrompt = false;
        // this.prompt = '';
        // this.disabled = true;
        // this.errors.clear();
        document.getElementById('password').type = 'password';
        document.getElementById('confirmPassword').type = 'password';
        this.passwordShow = true;
        this.confirmPasswordShow = true;
        try {
          this.$refs.findLoginSuccessDialog.show = false;
        } catch (e) {
          console.log(e);
        }
        this.isFindPassword = false;
      }
    },
    methods: {
      clearPassword() {
        this.password = '';
        this.confirmPassword = '';
        this.borderBottoms = false;
        this.showPrompt = false;
        this.prompt = '';
        this.disabled = true;
        this.errors.clear();
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          this.fallBack();
        } else if(params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      // 回退处理
      fallBack() {
        let _this = this;
        if (this.isFindPassword) { // 是否找回密码成功,成功点击安卓虚拟返回按键 跳转首页
          this.jumpHomePage();
        } else if (this.certificateNo && this.certificateNo !== '') { // 来源于证件页面,返回跳转证件页面
          this.$router.push({
            name: 'findLoginCertificate'
          });
        } else {
          this.$confirm('', '确定放弃找回密码？', function () {
            _this.jumpLogin();
          });
        }
      },
      jumpLogin() {
        let _this = this;
        if (this.sourcePage && this.sourcePage !== '') {
          this.$router.push({
            name: _this.getSourcePage(_this.sourcePage)
          });
        } else {
          this.$router.push({
            name: 'login'
          });
        }
      },
      jumpHomePage() {
        this.$router.push({
          path: '/homePage'
        });
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      showPassword() {
        this.mtj_event('u_resetPwd_setPassword_eye', '找回密码设置登录密码点击密码显示隐藏按钮');
//        if (this.password === '') {
//          return;
//        }
        if (this.passwordShow === true) {
          this.passwordShow = false;
          document.getElementById('password').type = 'text';
        } else {
          this.passwordShow = true;
          document.getElementById('password').type = 'password';
        }
      },
      showConfirmPassword() {
        this.mtj_event('u_resetPwd_setPassword_eye', '找回密码设置登录密码点击密码显示隐藏按钮');
//        if (this.confirmPassword === '') {
//          return;
//        }
        if (this.confirmPasswordShow === true) {
          this.confirmPasswordShow = false;
          document.getElementById('confirmPassword').type = 'text';
        } else {
          this.confirmPasswordShow = true;
          document.getElementById('confirmPassword').type = 'password';
        }
      },
      submitPassword() {
        this.mtj_event('u_resetPwd_setPassword_next', '找回密码设置登录密码点击确认按钮');
        if (this.disabled) {
          return;
        }
        let param = {
          'mobile': this.mobile,
          'newPassword': this.password,
          'confirmPassword': this.confirmPassword,
          'certificateNo': (this.certificateNo) ? this.certificateNo.toUpperCase() : ''
        };
        let _this = this;
        this.ajax(this.apiName.findLoginPassword, this.serviceType().api, param, function (responseData) {
          _this.clearPassword();
          _this.isFindPassword = true;
          _this.doLoginSuccess(responseData, function () {
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '找回密码登陆'});
            _this.onResetSuccess();
          });
          _this.borderBottoms = false;
        }, function (responseData) {
          let message = responseData.message;
          let resultCode = responseData.resultCode;
          if (resultCode !== 'SYS_FORM_TIME_OUT') {
            _this.$alert(message);
          } else {
            _this.$alert(message);
          }
        });
      },
      onResetSuccess() {
        let _this = this;
        _this.$refs.findLoginSuccessDialog.show = true;
        _this.$refs.findLoginSuccessDialog.confirm().then(() => {
          _this.mtj_event('u_resetPwd_success', '找回密码密码设置成功点击重新登录按钮');
          _this.confirmButton();
        });
      },
      matchPassword() {
        this.disabled = true;
        if (this.confirmPassword.length === 0) {
          this.prompt = '';
          this.borderBottoms = false;
          this.showPrompt = false;
          return;
        }
        if (this.password === '') {
          this.borderBottoms = true;
          this.showPrompt = true;
          this.prompt = '密码不能为空';
        } else if (this.password !== this.confirmPassword) {
          this.borderBottoms = true;
          this.showPrompt = true;
          this.prompt = '两次密码不相同';
        } else if (!this.passwordValidate()) {
          this.borderBottoms = false;
          this.showPrompt = false;
          this.prompt = '';
        } else {
          this.prompt = '';
          this.disabled = false;
          this.showPrompt = false;
          this.borderBottoms = false;
        }
      },
      passwordValidate() {
        let regPassWord = /^(?![a-zA-z]+$)(?!\d+$)[0-9A-Za-z]{6,16}$/;
        if (this.password !== '' && regPassWord.test(this.password)) {
          return true;
        } else {
          return false;
        }
      },
      passwordChange() {
        this.disabled = true;
        if (this.password === this.confirmPassword && this.password.length !== 0) {
          this.disabled = false;
          this.showPrompt = false;
          this.prompt = '';
          this.borderBottoms = false;
        }
      },
      confirmButton() {
        this.jumpHomePage();
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "findLoginPassword.styl"
</style>
