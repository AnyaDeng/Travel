<template>
  <div class="register container-fluid">
    <div>
      <div class="form-group">
        <ul>
          <li class="form-label">
            <span class="form-label-font">原密码</span>
            <div class=" visible " @click="showPassword()">
              <span v-if="passwordShow" class="icon-invisible iconVisible"></span>
              <span v-else class="icon-visible iconVisible"></span>
            </div>
            <div class="inputBox">
              <input id="password" class="form-control" type="password" name="password" v-validate="'required|passWord'"
                     placeholder="请输入原密码"
                     v-model="originalPassword" maxlength="16" @keyup="checkOriginalPasswordFormat()">
            </div>
          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors">
            <span v-show="showMistake">{{mistakeInfo}}</span>
          </li>
        </ul>
      </div>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="jumpToModifyLoginNewPasswordView">
          <span>下一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XButton, Group, Cell} from 'vux';

  export default {
    components: {
      XButton, Group, Cell
    },
    data() {
      return {
        apiName: {
          checkMobileRegister: this.apiType().checkMobileRegister,
          loginPasswordValidate: this.apiType().loginPasswordValidate
        },
        originalPassword: '',
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '原登录密码',
          headerRight: this.headerBtn.service
        },
        show: true,
        disabled: true,
        showPrompt: true,
        borderBottoms: false,
        mistakeInfo: '',
        showMistake: false,
        passwordShow: true
      };
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['passwordSet'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
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
        this.hidePassword();
        this.clearPassword();
        // this.originalPassword = '';
        // this.mistakeInfo = '';
        // this.borderBottoms = false;
        // this.showMistake = false;
        // this.disabled = true;
      }
    },
    methods: {
      clearPassword() {
        this.originalPassword = '';
        this.mistakeInfo = '';
        this.borderBottoms = false;
        this.showMistake = false;
        this.disabled = true;
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击回退
          this.$router.push({
            name: 'passwordSet'
          });
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      jumpToModifyLoginNewPasswordView() {
        this.analysys.ma_btnClick('点击了下一步按钮');
        if (this.checkOriginalPasswordFormat()) {
          let param = {
            'password': this.originalPassword.trim()
          };
          let _this = this;
          this.ajax(this.apiName.loginPasswordValidate, this.serviceType().api, param, function (responseData) {
            _this.disabled = false;
            _this.$router.push({
              name: 'modifyLoginNewPassword',
              params: {'originalPassword': _this.originalPassword}
            });
          });
        } else {
          this.disabled = true;
          this.borderBottoms = false;
        }
      },
      checkOriginalPasswordFormat() {
        if (this.originalPassword.trim() === '') {
          this.disabled = true;
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '原始密码不能为空';
          return false;
        } else {
          this.showMistake = false;
          this.borderBottoms = false;
          this.mistakeInfo = '';
          this.disabled = false;
          return true;
        }
      },
      showPassword() {
        this.analysys.ma_btnClick('点击了原密码的显隐控制');
        if (this.passwordShow === true) {
          this.passwordShow = false;
          document.getElementById('password').type = 'text';
        } else {
          this.hidePassword();
        }
      },
      hidePassword(){
        this.passwordShow = true;
        document.getElementById('password').type = 'password';
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "modifyLoginOriginalPassword.styl"
</style>
