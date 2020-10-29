<template>
  <div class="container-fluid registerResult">
    <div>
      <div class="form-group">
        <ul>
          <li>
            <div class="login">
              <span class="loginPassword">登录密码</span>
              <div class=" visible " @click="fn()">
                <span v-if="willShow" class="icon-invisible"></span>
                <span v-else class="icon-visible"></span>
              </div>
              <div class="inputBox">
                <input id="newPassword" class="form-control " type="password"
                       placeholder="请输入6-16位数字、字母" v-model="newPassword" @input="validatePassword(newPassword)" maxlength="16">
              </div>
            </div>
          </li>

          <li class=" confirmPassword ">
            <div class="login">
              <span class="conPassword">确认密码</span>
              <div class="visible " @click="fns()">
                <span v-if="confirmWillShow" class="icon-invisible"></span>
                <span v-else class="icon-visible"></span>
              </div>
              <div class="inputBox">
                <input id="confirmPassword" class="form-control " type="password"
                       placeholder="请再次输入登录密码" v-model="confirmPassword" @input="validatePassword(confirmPassword)" maxlength="16">
              </div>
            </div>
          </li>


          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors ">
            <span>{{mistakeInfo}}</span>
          </li>
        </ul>


        <div class="btn-container">
          <div class="btn-success  " :class="{disabled: disabled}" @click="registerButtonThree">
            <span>下一步</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          openVisitorAccount: this.apiType().openVisitorAccount
        },
        mobile: this.$route.params.accountInfo.mobile,
        disabled: true,
        mistakeInfo: '',
        newPassword: '',
        confirmPassword: '',
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '设置登录密码',
          headerRight: this.headerBtn.service
        },
        borderBottoms: false,
        willShow: true,
        confirmWillShow: true,
        sourcePage: this.$route.params.sourcePage,
        isRegister: false
      };
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['registerSms'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    beforeRouteLeave(to, from, next) {
      this.isRegister = false;
      next();
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.$bus.on('devicePause', this.clearPassword);
    },
    activated() {
      // 向父组件通信
      this.sendMsgToParent();
      if (this.$route.meta.isBack === false) {
        this.sourcePage = this.$route.params.sourcePage;
        this.mobile = this.$route.params.accountInfo.mobile;

        this.clearPassword();

        // this.newPassword = '';
        // this.confirmPassword = '';
        //
        // this.mistakeInfo = '';
        // this.borderBottoms = false;
        // this.disabled = true;

        this.willShow = false;
        this.confirmWillShow = false;
        this.fn();
        this.fns();

        this.isRegister = false;
      }
    },
    methods: {
      clearPassword() {
        this.newPassword = '';
        this.confirmPassword = '';
        this.mistakeInfo = '';
        this.borderBottoms = false;
        this.disabled = true;
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击取消回退
          this.fallBack();
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      fallBack() {
        if (this.isRegister) { // 注册成功以后 点击 安卓虚拟返回按钮 默认调用"去首页看看"
          this.confirmButton();
        } else {
          let _this = this;
          this.$confirm('', '确定放弃注册？', function () {
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
        }
      },
      confirmButton() {
        this.$router.push({
          path: '/homePage'
        });
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      fn() {
        this.mtj_event('u_regist_setPassword_eye', '注册设置登录密码点击密码显示隐藏按钮');
        this.analysys.ma_btnClick("登录密码点击密码显示隐藏按钮");
        if (this.willShow === true) {
          this.willShow = false;
          document.getElementById('newPassword').type = 'text';
        } else {
          this.willShow = true;
          document.getElementById('newPassword').type = 'password';
        }
      },
      fns() {
        this.mtj_event('u_regist_setPassword_eye', '注册设置登录密码点击密码显示隐藏按钮');
        this.analysys.ma_btnClick("确认密码点击密码显示隐藏按钮");
        if (this.confirmWillShow === true) {
          this.confirmWillShow = false;
          document.getElementById('confirmPassword').type = 'text';
        } else {
          this.confirmWillShow = true;
          document.getElementById('confirmPassword').type = 'password';
        }
      },
      registerButtonThree() {
        this.mtj_event('u_regist_setPassword_next', '注册设置登录密码点击下一步按钮');
        this.analysys.ma_btnClick("点击下一步按钮");
        let param = {
          'mobile': this.mobile,
          'newPassword': this.newPassword.trim(),
          'confirmPassword': this.confirmPassword.trim()
        };
        let _this = this;
        this.ajax(this.apiName.openVisitorAccount, this.serviceType().api, param, function (responseData) {
          _this.clearPassword();
          _this.isRegister = true;
          _this.doLoginSuccess(responseData, function () {
            _this.analysys.ma_track('register', {'is_success': 'maBool_1', 'register_resource': 'APP'});
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '注册成功登陆'});
            _this.recordLoginTimes('0'); // 注册成功认为是第0次登录
            _this.confirmButton();
          });
        }, function (responseData) {
          _this.borderBottoms = true;
          _this.$alert(responseData.message);
          _this.analysys.ma_track('register', {'is_success': 'maBool_0', 'register_resource': 'APP', 'fail_reason': responseData.message});
        });
      },
      // 校验密码是否符合规则
      validatePassword(password) {
        const regPassWord = /^(?![a-zA-z]+$)(?!\d+$)[a-zA-Z\d]{6,16}$/;
        if (password.trim() !== '' && regPassWord.test(password.trim())) {
          this.borderBottoms = false;
          this.mistakeInfo = '';
          this.validateTwicePassword();
        } else {
          this.borderBottoms = true;
          this.disabled = true;
          this.mistakeInfo = '密码由6-16位数字、字母组成';
        }
      },
      // 比对两次密码是否一致
      validateTwicePassword() {
        const newPassword = this.newPassword.trim();
        const confirmPassword = this.confirmPassword.trim();
        if (this.isNotEmpty(newPassword) && this.isNotEmpty(confirmPassword)) {
          if (newPassword !== confirmPassword) {
            this.borderBottoms = true;
            this.disabled = true;
            this.mistakeInfo = '两次密码不相同';
          } else {
            this.mistakeInfo = '';
            this.borderBottoms = false;
            this.disabled = false;
          }
        } else {
          this.disabled = true;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "registerResult.styl"
</style>
