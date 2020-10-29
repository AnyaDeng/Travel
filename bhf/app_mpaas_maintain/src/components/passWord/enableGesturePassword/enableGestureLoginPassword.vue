<template>
  <div class="register container-fluid">
    <div>
      <div class="form-group">
        <ul>
          <li class="form-label">
            <span class="form-label-font">登录密码</span>
            <div class=" visible " @click="showPassword()">
              <span v-if="passwordShow" class="icon-invisible iconVisible"></span>
              <span v-else class="icon-visible iconVisible"></span>
            </div>
            <input id="password" class="form-control" type="password" name="password" v-validate="'required|passWord'"
                   placeholder="请输入登录密码"
                   v-model="loginPassword" maxlength="16" @keyup="checkLoginPasswordFormat()">
          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors">
            <span v-show="showMistake">{{mistakeInfo}}</span>
          </li>
        </ul>
      </div>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="jumpToSetGestureLoginPassword">
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
        loginPassword: '',
        color: true,
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '开启手势登录',
          headerRight: ''
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
    mounted() {
      // 向父组件通信
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      headerListen() {
        // 路由回退back(-1)
        this.routerBack();
      },
      jumpToSetGestureLoginPassword() {
        this.analysys.ma_btnClick('点击下一步按钮');
        if (this.checkLoginPasswordFormat()) {
          let param = {
            'password': this.loginPassword
          };
          let _this = this;
          this.ajax(this.apiName.loginPasswordValidate, this.serviceType().api, param, function (responseData) {
            _this.disabled = false;
            _this.$router.push({
              name: 'setGestureCipher',
              params: {loginPassword: _this.loginPassword, sourcePage: 'passwordSet'}
            });
          });
        } else {
          this.disabled = true;
          this.borderBottoms = false;
        }
      },
      checkLoginPasswordFormat() {
        if (this.loginPassword === '') {
          this.disabled = true;
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '登录密码不能为空';
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
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "enableGestureLoginPassword.styl"
</style>
