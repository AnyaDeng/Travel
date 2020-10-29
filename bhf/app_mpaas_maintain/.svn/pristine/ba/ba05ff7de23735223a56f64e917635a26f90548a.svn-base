<template>
  <div id="login" class="login container-fluid">
    <div class="photo"></div>
    <div class="full-support">
      <div class="cntBox">
        <div class="logo-container" :style="{'margin-top': marginTop}">
          <img class="logoSize" src="../../../common/img/gjsLogos.png" alt="">
        </div>
        <div class="form-group">
          <ul>
            <li class="form-label">
              <span class="form-label-font">用户名</span></li>
            <li class="form-control-container">
              <input class="form-control" v-model="userName" type="number" pattern="[0-9]*"
                     @input="changeButtonLogin(userName)"
                     placeholder="请输入手机号" name="userName" v-validate="'required|loginName'" maxlength="11">
            </li>
            <li class="form-border"></li>
          </ul>
        </div>
        <div class="form-group">
          <ul>
            <li class="form-label">
              <span class="form-label-font">密码</span></li>
            <li class="form-control-container">
              <div @click="showPassword()">
                <span v-if="passwordType" class="icon-invisible"></span>
                <span v-else class="icon-visible"></span>
              </div>
              <input class="form-control" v-model="passWord" id="password" type="password" placeholder="请输入登录密码"
                     maxlength="16" name="passWord" @input="onPasswordKeyup()" @focus="showElement('password')">
            </li>
            <li class="form-border"></li>
          </ul>
        </div>
        <div class="form-group" v-show="graphCodeShow">
          <ul>
            <li class="form-label-code">
              <span class="form-label-font">验证码</span></li>
            <li class="form-control-container">
              <div class="flex-f flex-hc">
                <input id="graphCode" type="text" class="form-control-code" v-model="graphCode" placeholder="验证码"
                       maxlength="4" onInput="value=value.replace(/[^0-9a-zA-Z]/ig,'')"
                       v-validate="'numeric|max_value:{9999}'" @focus="showElement('graphCode')">
                <v-graphCode ref="imgCode" v-bind:sendValidateData="sendValidateData"></v-graphCode>
              </div>
            </li>
            <li class="form-border"></li>
          </ul>
        </div>
      </div>
      <div class="loginDetail" :style="{'padding-bottom': paddingBottom}">
        <div class="loginAgreement">登录即视为已阅读并同意
          <span @click="rechargeFrame(framePath_sever)">《滨海国金所服务协议（个人会员版）》（所有用户）</span>
          <span @click="rechargeFrame(privacy_sever)">《隐私政策》</span>
        </div>
        <div class="btn-container">
          <div class="btn-success" :class="{disabled: btnDisabled}" @click="loginIn">
            <span>登录</span>
          </div>
        </div>
        <div class="btn-container register">
				<span class="btn-link">
        <a href="javascript:void(0)" @click="jumpRegisterMobile">
          <span class="color_fff">注册</span>
				</a>
				</span>
          <span class="btn-link">
        <a href="javascript:void(0)" @click="jumpFindLoginMobile">
          <span class="color_fff">忘记密码</span>
				</a>
				</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import graphCode from 'components/common/graphCode/graphCode';

  export default {
    components: {
      'v-graphCode': graphCode
    },
    data() {
      return {
        apiName: {
          loginValidate: this.apiType().loginValidate,
          login: this.apiType().login,
          queryAccountState: this.apiType().queryAccountState
        },
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '登录',
          headerRight: this.headerBtn.certificateLogin,
          headerBoxFlex: true,
          headerBg: this.headerColor.transparent,
          gradientBar: {
            opacity: 0,
            color: this.headerColor.darkBlue2
          },
          underHeader: true
        },
        userName: this.$route.params.registerMobile ? this.$route.params.registerMobile : '',
        passWord: '',
        graphCode: '',
        loginType: 'M',
        userNameError: '',
        passWordError: '',
        graphCodeError: '',
        graphCodeShow: false,
        showGraphCode: '',
        passwordType: true,
        videoImg: '',
        btnDisabled: true,
        visitorIdOld: this.getUserStorage('visitorId') ? this.getUserStorage('visitorId') : "",
        marginTop: '0.64rem',
        paddingBottom: '0rem',
        sendValidateData: {
          graphCodeType: '0'
        },
        tempLoginNumber: '',
        framePath_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        privacy_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      };
    },
    mounted() {
      this.$bus.on('devicePause', this.clearPassword);
      // 监听scroll事件
      window.addEventListener('scroll', this.eventListenerScroll, false);
      // 向父组件通信
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.changeMargin();
      if (this.$route.params.registerMobile) {
        this.changeButtonLogin(this.userName);
      }
    },
    beforeRouteLeave(to, from, next) {
      // 监听scroll事件
      window.removeEventListener('scroll', this.eventListenerScroll, false);
      next();
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.cancel) {
          // 点击取消按钮
          this.mtj_event("u_loginPage_cancel", "账户密码登录页点击取消按钮");
          this.$router.push({
            name: 'unloginHomePage'
          });
        } else if (params.btnType === this.headerBtn.certificateLogin) {
          // 点击证件登录
          this.$router.push({
            name: 'certificateLogin'
          });
        }
      },
      // 监听屏幕滑动
      eventListenerScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.pageConfig.gradientBar.opacity = this.pageScroll(scrollTop);
        this.sendMsgToParent();
      },
      clearPassword() {
        this.passWord = '';
        this.btnDisabled = true;
      },
      changeMargin() {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        let isLargeScreen = (clientHeight / clientWidth > 2.16);
        if (isLargeScreen) {
          if (this.isIOSDevice()) {
            this.marginTop = '1.34rem';
          } else {
            this.marginTop = '1.14rem';
          }
          this.paddingBottom = '0.3rem';
        } else if (this.isIOSDevice()) {
          this.marginTop = '0.96rem';
        } else {
          this.marginTop = '0.76rem';
        }
      },
      showElement(elementId) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        if (isAndroid) {
          setTimeout(function () {
            try {
              let element = document.getElementById(elementId);
              // block: start,center,end,nearest
              element.scrollIntoView({block: 'center'});
              element.scrollIntoViewIfNeeded(true);
            } catch (e) {
              console.log(e);
            }
          }, 300);
        }
      },
      jumpRegisterMobile() {
        this.mtj_event("u_loginPage_regist", "账户密码登录页点击注册按钮");
        this.analysys.ma_btnClick("点击注册");
        this.$router.push({
          name: 'registerMobile', params: {loginCtrl: 'login'}
        })
      },
      jumpFindLoginMobile() {
        this.mtj_event("u_loginPage_reset_password", "账户密码登录页点击忘记密码按钮");
        this.analysys.ma_btnClick("点击忘记密码");
        this.$router.push({
          name: 'findLoginMobile', params: {loginCtrl: 'login'}
        })
      },
      loginOut() {
        this.$refs.dialog.show = true;
        this.$refs.dialog.confirm().then(() => {
          // 点击取消按钮的回调处理
          this.cancelButton();
          this.$refs.dialog.show = false;
        }).catch(() => {
          // 点击确定按钮的回调处理
          this.confirmButton();
          this.$refs.dialog.show = false;
        });
      },
      confirmButton() {
        this.$router.push({
          path: '/homePage'
        });
      },
      cancelButton() {
        this.$router.push({
          path: '/login'
        });

      },
      showPassword() {
        this.mtj_event("u_loginPage_eye", "账号密码登录页点击密码显示隐藏按钮");
        if (this.passwordType === true) {
          this.passwordType = false;
          document.getElementById('password').type = 'text';
        } else {
          this.passwordType = true;
          document.getElementById('password').type = 'password';
        }
      },
      changeButtonLogin(userName) {
        if (userName.length < 11) {
          this.btnDisabled = true;
        } else {
          this.checkLoginType();
          if (this.tempLoginNumber !== this.userName.toUpperCase()) {
            this.graphCodeShow = false;
          } else {
            this.getImgCode();
          }
        }
      },
      changeButton() {
        this.btnDisabled = !this.isNotEmpty(this.passWord.trim());
      },
      onPasswordKeyup() {
        this.passWord = this.passWord.replace(/[\u4e00-\u9fa5]/gi, '');
        if (this.userName.trim() != '' && this.passWord.trim() != '' && this.showGraphCode === 'registerTrue') {
          this.btnDisabled = false;
        } else if (this.userName.trim() != '' && this.passWord.trim() != '' && this.showGraphCode === 'registerFalse') {
          this.btnDisabled = true;
        } else {
          this.btnDisabled = true;
        }
      },
      // 验证登录类型
      checkLoginType() {
        let regPhone = /^1\d{10}$/;
        this.btnDisabled = true;
        if (this.userName !== '' && regPhone.test(this.userName) === true) {
          this.showGraphCode = 'registerTrue';
          this.changeButton();
        } else {
          this.showGraphCode = 'registerFalse';
        }
      },
      // 登录
      loginIn() {
        let _this = this;
        this.mtj_event("u_loginPage_login", "账户密码登录页点击登录按钮");
        this.checkGraphCode(function () {
          _this.loginValidate();
        });
      },
      // 检查验证码是否已展示
      checkGraphCode(showback) {
        if (this.graphCodeShow === true && this.graphCode === '') {
          this.$toast('请输入验证码');
        } else {
          showback();
        }
      },
      // 校验用户名是否存在
      loginValidate() {
        this.tempLoginNumber = this.userName.toUpperCase();
        let param = {
          'loginNo': this.userName.toUpperCase(),
          'loginType': this.loginType
        };
        let _this = this;
        this.ajax(this.apiName.loginValidate, this.serviceType().api, param, function (responseData) {
          let isShowGraphCode = responseData.body.isShowGraphCode;
          if (isShowGraphCode === '1' && _this.graphCodeShow === false) { // 页面需展示验证码
            _this.getImgCode();
            _this.$toast('请输入验证码');
          } else { // 页面不需展示验证码
            _this.loginInAjax();
          }
        }, function (responseData) {
          let resultCode = responseData.resultCode;
          let message = responseData.message;
          if (resultCode === 'AC_MOBILE_NOT_REGISTER') {
            _this.$confirmCtrl('', '该手机号尚未注册,是否去注册?', '去注册', '取消', function () {
              _this.$router.push({
                name: 'registerMobile',
                params: {
                  mobile: _this.userName.toUpperCase()
                }
              });
            })
          } else {
            _this.$toast(message);
          }
        });
      },
      loginInAjax() {
        if (this.graphCodeShow === false) {
          this.graphCode = '';
        }
        let param = {
          'loginNo': this.userName.toUpperCase(),
          'loginPassword': this.passWord,
          'loginType': this.loginType,
          'graphCode': this.graphCode
        };
        let _this = this;
        this.ajax(this.apiName.login, this.serviceType().api, param, function (responseData) {
          _this.passWord = '';
          if (_this.visitorIdOld !== responseData.visitorId) {
            _this.setSessionStorage('isNeedRefreshUserPortrait', '1');
          }
          _this.doLoginSuccess(responseData, function (userInfo) {
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '密码登陆'});
            _this.afterLogin();
          });
        }, function (responseData) {
          let message = responseData.message;
          _this.getImgCode();
          _this.$toast(message);
          _this.analysys.ma_track('login_in', {'is_success': 'maBool_0', 'login_method': '密码登陆', 'fail_reason': message});
        });
      },
      getImgCode() {
        this.$refs.imgCode.getCode();
        this.graphCodeShow = true;
        this.graphCode = '';
      },
      afterLogin() {
        let isSecond = this.checkLoginTimes() === '2';
        let isNoGesture = this.isUserSetGestureLogin() === false;
        if (isSecond && isNoGesture) { // 第2次登录且没设置手势密码
          this.jumpGesture(); // 跳转设置手势密码
        } else {
          this.jumpHomePage();
        }
      },
      jumpHomePage() {
        this.$router.push({
          name: 'homePage'
        });
      },
      jumpGesture() {
        let _this = this;
        this.$router.push({
          name: 'setGestureCipher',
          params: {
            loginPassword: _this.passWord,
            sourcePage: 'login'
          }
        });
      },
      rechargeFrame(framePath) {
        try {
          this.analysys.ma_btnClick("点击" + framePath);
        } catch (e) {
        }
        this.thirdLinks(framePath);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "login.styl"
</style>
