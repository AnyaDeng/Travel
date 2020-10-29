<template>
  <div class="fingerprint container-fluid">
    <div class="photo">
    </div>
    <div class="passInformation">
      <div class="welcoming">{{admin}}<span v-if="admin"></span>欢迎回来</div>
      <div class="passContent" @click="checkFingerPrint()">
        <div class="faceIcon" v-if="iconChange === 'face'"></div>
        <div class="fingerIcon" v-else></div>
        <div class="fingerMessage">{{iconChangeText}}</div>
      </div>
    </div>
    <div class="ctrlBtn">
      <div class="btn-box">
        <div class="btn-container">
        <span class="btn-link" v-if="isUserSetGestureLogin()" @click="u_loginPage_gesture">
          <router-link to="/gestureCipher">手势密码解锁</router-link>
        </span>
          <span class="btn-link" @click="u_loginPage_other">
          <router-link to="/login">使用账号登录</router-link>
				</span>
        </div>
      </div>

      <div class="loginAgreement">登录即视为已阅读并同意
        <span @click="rechargeFrame(framePath_sever)">《滨海国金所服务协议（个人会员版）》（所有用户）</span>
        <span @click="rechargeFrame(privacy_sever)">《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '',
          headerRight: '',
          headerBg: this.headerColor.transparent,
          underHeader: true
        },
        admin: this.getUserDisplayName(),
        iconChange: 'touch',
        iconChangeText: '',
        framePath_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        privacy_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      };
    },
    created() {
    },
    mounted() {
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.doRefresh();
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      headerListen() {
        // 点击取消按钮
        this.mtj_event("u_loginPage_cancel", "指纹登录页点击取消按钮");
//        this.removeLocalStorage('bhfae_userInfo');
        this.$router.push({
          name: 'unloginHomePage'
        });
      },
      doRefresh() {
        this.changeIcon();
        let _this = this;
        setTimeout(function () {
          _this.checkFingerPrint();
        }, 400);
      },
      changeIcon() {
        let _this = this;
        this.fingerTouchAvailable(function (type) {
          _this.iconChange = type;
          if (type === 'face') {
            _this.iconChangeText = '点击使用面容 ID解锁';
          } else if (_this.deviceInfo().devicePlatform === 'iOS') {
            _this.iconChangeText = '点击使用Touch ID解锁';
          } else {
            _this.iconChangeText = '点击使用指纹解锁';
          }
        }, function () {
        });
      },
      checkFingerPrint() {
        let _this = this;
        if (_this.iconChange === 'face') {
          _this.mtj_event("u_loginPage_faceId", "面容登录页点击faceID解锁按钮");
          _this.analysys.ma_btnClick('面容登录页点击faceID解锁按钮');
        } else if (_this.deviceInfo().devicePlatform === 'iOS') {
          _this.mtj_event("u_loginPage_touchId", "指纹登录页点击touchID解锁按钮");
          _this.analysys.ma_btnClick('指纹登录页点击touchID解锁按钮');
        } else {
          _this.mtj_event("u_loginPage_touchId", "指纹登录页点击touchID解锁按钮");
          _this.analysys.ma_btnClick('指纹登录页点击touchID解锁按钮');
        }
        this.fingerTouchAvailable(function () {
          _this.fingerCordova();
        }, function () {
          _this.otherLogin();
        });
      },
      fingerCordova() {
        let userId = this.getUserStorage('visitorId');
        let fingerPrintToken = this.getLocalFingerPrint();
        let _this = this;
        this.fingerTouchVerify(userId, fingerPrintToken, function (authCode) {
          _this.mtj_event("u_loginPage_login", "指纹登录页开始指纹/面容登录");
          _this.analysys.ma_btnClick('指纹登录页开始指纹/面容登录');
          if (authCode) {
            _this.fingerPrintLogin(authCode);
          } else {
            _this.setLocalFingerPrint(null);
            _this.$alert('客户端出现了小状况，请使用其他方式登录!', '', function () {
              _this.jumpLogin();
            })
          }
        }, function (error) {
          if (error === -1) {
            _this.$toast('指纹解锁验证失败');
          } else if (error === -3) {
            _this.otherLogin();
          } else if (error === -8) {
            _this.$alert('错误次数过多，系统指纹已锁定，请选择其他登录方式', '', function () {
              _this.otherLogin();
            });
          }
        });
      },
      otherLogin() {
        let pathName = this.checkGesture();
        this.$router.push({
          path: pathName
        });
      },
      fingerPrintLogin(authorityId) {
        this.mtj_event('u_loginPage_fingerFaceLogin', '指纹/面容登录页使用指纹/面容登录');
        this.analysys.ma_btnClick('指纹/面容登录页使用指纹/面容登录');
        let param = {
          'authorityId': authorityId,
          'visitorId': this.getUserStorage('visitorId'),
          'machineId': this.deviceInfo().deviceUUID
        };
        let _this = this;
        this.ajax(this.apiType().fingerPrintLogin, this.serviceType().api, param, function (responseData) {
          _this.doLoginSuccess(responseData, function () {
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '指纹/面容登陆'});
            _this.$router.push({
              name: 'homePage'
            });
          });
        }, function (responseData) {
          if (responseData.resultCode !== 'net_error') {
            _this.setLocalFingerPrint(null);
            _this.jumpLogin();
          }
          _this.analysys.ma_track('login_in', {'is_success': 'maBool_0', 'login_method': '指纹/面容登陆', 'fail_reason': responseData.message});
        });
      },
      u_loginPage_gesture() {
        this.mtj_event("u_loginPage_gesture", "指纹登录页点击手势密码解锁按钮");
        this.analysys.ma_btnClick('指纹登录页点击手势密码解锁按钮');
      },
      u_loginPage_other() {
        this.mtj_event("u_loginPage_other", "指纹登录页点击其他登录方式按钮");
        this.analysys.ma_btnClick('指纹登录页点击其他登录方式按钮');
      },
      rechargeFrame(framePath) {
        this.thirdLinks(framePath);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "fingerprintLogin.styl"
</style>
