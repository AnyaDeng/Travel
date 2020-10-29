<template>
  <div id="login" class="certificateLogin container-fluid">
    <div class="photo">
      <div class="picture">
      </div>
    </div>
    <div class="full-support loginInfor" :style="{'padding-top': paddingTop}">
      <div class="cntBox">
        <div class="logo-container logo">
          <img class="logoSize" src="../../../common/img/gjsLogos.png" alt="">
        </div>
        <div class="form-group">
          <ul>
            <li class="form-label">
              <span class="form-label-font">证件类型</span></li>
            <li class="form-control-container " @click="u_loginPage_cer_type">
              <div>
                <div class="form-item item-line">
                  <div class="pc-box">
                    <input type="hidden" name="bank_id" id="bankId" value="">
                    <span id="showBank" class="SourceHanSansCN-Regular">请选择证件类型</span>
                  </div>
                </div>
                <div class="container"></div>
              </div>
            </li>
            <li class="form-border"></li>
          </ul>
        </div>

        <div class="form-group">
          <ul>
            <li class="form-label">
              <span class="form-label-font">用户名</span></li>
            <li class="form-control-container">
              <input class="form-control" v-model="userName" type="text" @blur="checkLoginType()"
                     placeholder="请输入证件号" name="userName" v-validate="'required'" @input="checkCharacter()">
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
                     maxlength="16" name="passWord" @input="changeButton()">
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
                <input type="text" class="form-control-code" v-model="graphCode" placeholder="验证码" maxlength="4"
                       onInput="value=value.replace(/[^0-9a-zA-Z]/ig,'')"
                       v-validate="'numeric|max_value:{9999}'">
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
  import {Selector, Group, Cell, CellBox, XButton} from 'vux'

  export default {
    components: {
      'v-graphCode': graphCode,
      Group,
      Selector,
      Cell,
      CellBox,
      XButton
    },
    data() {
      return {
        apiName: {
          loginValidate: this.apiType().loginValidate,
          login: this.apiType().login,
          queryAccountState: this.apiType().queryAccountState,
          queryDictList: this.apiType().queryDictList

        },
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '证件登录',
          headerBoxFlex: true,
          headerBg: this.headerColor.transparent,
          gradientBar: {
            opacity: 0,
            color: this.headerColor.darkBlue2
          },
          underHeader: true
        },
        loginTypeList: this.$store.getters.dictionaryList.LOGIN_TYPE,
        certificateType: '',
        userName: '',
        passWord: '',
        graphCode: '',
        loginType: '',
        userNameError: '',
        passWordError: '',
        dateList: this.$store.getters.dictionaryList.LOGIN_TYPE,
        graphCodeError: '',
        certificateTypeError: false,
        graphCodeShow: false,
        showGraphCode: '',
        passwordType: true,
        videoImg: '',
        btnDisabled: true,
        paddingTop: '0.64rem',
        paddingBottom: '0rem',
        sendValidateData: {
          graphCodeType: '0'
        },
        visitorIdOld: this.getUserStorage('visitorId') ? this.getUserStorage('visitorId') : "",
        checkIdFormat: true,
        framePath_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        privacy_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      };
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.$bus.on('devicePause', this.clearPassword);
      this.checkSelectData();
    },
    mounted() {
      // 监听scroll事件
      window.addEventListener('scroll', this.eventListenerScroll, false);
      // 向父组件通信
      this.sendMsgToParent();
      this.get();
      let _this = this;
      this.checkUserAgent(function () {
        _this.paddingTop = '0.88rem';
        _this.paddingBottom = '0.3rem';
      }, function () {
        _this.paddingTop = '0.64rem';
      }, function () {
        _this.paddingTop = '0.44rem';
      });
    },
    beforeRouteLeave(to, from, next) {
      // 监听scroll事件
      window.removeEventListener('scroll', this.eventListenerScroll, false);
      next();
    },
    methods: {// 监听屏幕滑动
      eventListenerScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.pageConfig.gradientBar.opacity = this.pageScroll(scrollTop);
        this.sendMsgToParent();
      },
      clearPassword() {
        this.passWord = '';
        this.changeButton();
      },
      jumpRegisterMobile() {
        this.mtj_event("u_loginPage_regist", "证件号登录页点击注册按钮");
        this.analysys.ma_btnClick("点击注册");
        this.$router.push({
          name: 'registerMobile', params: {loginCtrl: 'certificateLogin'}
        })
      },
      jumpFindLoginMobile() {
        this.mtj_event("u_loginPage_reset_password", "证件号登录页点击忘记密码按钮");
        this.analysys.ma_btnClick("点击忘记密码");
        this.$router.push({
          name: 'findLoginMobile', params: {loginCtrl: 'certificateLogin'}
        })
      },
      get() {
        var showBankDom = document.querySelector('#showBank');
        let _this = this;
        showBankDom.addEventListener('click', function () {
          _this.checkSelectData(true, function () {
            _this.showSelect();
          });
        });
      },
      showSelect() {
        let _this = this;
        var data = _this.dateList;
        var showBankDom = document.querySelector('#showBank');
        var bankIdDom = document.querySelector('#bankId');
        var bankId = showBankDom.dataset['id'];
        var bankName = showBankDom.dataset['value'];
        var bankSelect = new IosSelect(1, [data], {
          container: '.certificateLogin',
          title: '证件类型',
          itemHeight: 50,
          itemShowCount: 5,
          oneLevelId: 100,
          callback: function (selectOneObj) {
            bankIdDom.value = selectOneObj.id;
            showBankDom.innerHTML = selectOneObj.value;
            showBankDom.dataset['id'] = selectOneObj.id;
            showBankDom.dataset['value'] = selectOneObj.value;
            _this.certificateType = selectOneObj.id;
            _this.showGraphCode = 'registerTrue';
            if (_this.certificateType === '0') {
              if (_this.isNotEmpty(_this.userName)) {
                _this.checkLoginId();
              }
            } else {
              _this.checkIdFormat = true;
            }
            _this.changeButton();
          }
        });
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen() {
        // 点击取消按钮
        this.mtj_event("u_loginPage_cancel", "证件号登录页点击取消按钮");
        this.$router.push({
          path: '/login'
        });
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
          path: '/login'
        });
      },
      cancelButton() {
        this.$router.push({
          path: '/login'
        });
      },
      showPassword() {
        this.mtj_event("u_loginPage_eye", "证件号登录页点击密码显示隐藏按钮");
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
        }
      },
      changeButton() {
        this.passWord = this.passWord.replace(/[\u4e00-\u9fa5]/gi, '');
        if (this.certificateType != '' && this.userName.trim() != '' && this.passWord.trim() != '' && this.showGraphCode === 'registerTrue' && this.checkIdFormat == true) {
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
        }
      },
      // 校验身份证号格式
      checkLoginId(callback) {
        let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (regId.test(this.userName) === false) {
          this.checkIdFormat = false;
          this.$toast('身份证号格式不正确');
        } else {
          this.checkIdFormat = true;
          if (callback) {
            callback();
          }
        }
      },
      // 用户名输入字符校验
      checkCharacter() {
        if (this.certificateType === '0') {
          this.userName = this.userName.replace(/[^0-9a-zA-Z]/ig, '');
          if (this.isNotEmpty(this.userName) && this.isNotEmpty(this.passWord)) {
            this.btnDisabled = false;
          } else {
            this.btnDisabled = true;
          }
        }
      },
      // 验证登录时证件类型和证件号是否存在
      checkLoginType() {
        let _this = this;
        if (this.certificateType === '') {
          this.certificateTypeError = true;
        } else {
          if (this.certificateType == '0') {
            this.checkLoginId(function () {
              _this.certificateTypeError = false;
            });
          } else {
            this.certificateTypeError = false;
          }
        }
        this.changeButton();
      },
      // 检查验证码是否已展示
      checkGraphCode() {
        if (this.graphCodeShow === true) {
          this.loginInAjax();
        } else {
          this.graphCodeShow = true;
          this.$refs.imgCode.getCode();
          this.$toast('请输入验证码');
        }
      },
      // 校验用户名是否存在
      loginValidate() {
        let param = {
          'loginNo': this.userName.toUpperCase(),
          'loginType': this.certificateType
        };
        let _this = this;
        this.ajax(this.apiName.loginValidate, this.serviceType().api, param, function (responseData) {
          let isShowGraphCode = responseData.body.isShowGraphCode;
          _this.showGraphCode = 'registerTrue';
          if (isShowGraphCode === '0') {
            _this.graphCodeShow = false;
            _this.loginInAjax();
          } else if (isShowGraphCode === '1') {
            _this.loginInAjax();
//            _this.checkGraphCode();
          }
        }, function (responseData) {
//          _this.showGraphCode = 'registerFalse';
          let message = responseData.message;
          _this.$toast(message);
        });
      },
      // 登录
      loginIn() {
        this.mtj_event("u_loginPage_login", "证件号登录页点击登录按钮");
        this.analysys.ma_btnClick("点击登录");
        this.loginValidate();
      },
      loginInAjax() {
        this.mtj_event("u_loginPage_login", "证件号登录页点击登录按钮");
        if (this.graphCodeShow === false) {
          this.graphCode = '';
        }
        let param = {
          'loginNo': this.userName.toUpperCase(),
          'loginPassword': this.passWord,
          'loginType': this.certificateType,
          'graphCode': this.graphCode
        };
        let _this = this;
        this.ajax(this.apiName.login, this.serviceType().api, param, function (responseData) {
          _this.clearPassword();
          if (_this.visitorIdOld !== responseData.visitorId) {
            _this.setSessionStorage('isNeedRefreshUserPortrait', '1');
          }
          _this.doLoginSuccess(responseData, function () {
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '证件登陆'});
            _this.guideUser();
          });
        }, function (responseData) {
          let message = responseData.message;
          _this.$refs.imgCode.getCode();
          _this.graphCodeShow = true;
          _this.graphCode = '';
          _this.$toast(message);
          _this.analysys.ma_track('login_in', {'is_success': 'maBool_0', 'login_method': '证件登陆', 'fail_reason': message});
        });
      },
      // 引导用户开启手势密码
      guideUser() {
        let isSecond = this.checkLoginTimes() === '2';
        let isNoGesture = this.isUserSetGestureLogin() === false;
        if (isSecond && isNoGesture) { // 第2次登录且没设置手势密码
          this.jumpGesture(); // 跳转设置手势密码
        } else {
          this.jumpHomePage();
        }
      },
      jumpGesture() {
        let _this = this;
        this.$router.push({
          name: 'setGestureCipher',
          params: {
            'loginPassword': _this.passWord,
            'sourcePage': 'login'
          }
        });
      },
      jumpHomePage() {
        this.$router.push({
          name: 'homePage'
        });
      },
      checkSelectData(isLoading, callBack) {
        if (!this.dateList) {
          let param = {
            'dictId': this.dictListType.LOGIN_TYPE
          }
          let _this = this;
          if (isLoading) {
            this.$loading();
          }
          this.ajax(this.apiName.queryDictList, this.serviceType().query, param, function (responseData) {
            let dictList = responseData.body;
            let dictIdValueList = [];
            for (let i = 0; i < dictList.length; i++) {
              let date = {};
              if (dictList[i].value != 'M') {
                date.id = dictList[i].value;
                date.value = dictList[i].label;
                dictIdValueList.push(date);
              }
            }
            _this.dateList = dictIdValueList;
            if (callBack) {
              callBack();
            }
            _this.$store.dispatch('GenerateDicts', {
              "obj": dictIdValueList,
              "objName": "LOGIN_TYPE"
            }).then(() => {
            });
          });
        } else {
          if (callBack) {
            callBack();
          }
        }
      },
      u_loginPage_cer_type() {
        this.mtj_event("u_loginPage_cer_type", "证件号登录页点击证件类型按钮");
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "certificateLogin.styl"
  @import "../../../../static/css/iosSelect.css"


</style>
