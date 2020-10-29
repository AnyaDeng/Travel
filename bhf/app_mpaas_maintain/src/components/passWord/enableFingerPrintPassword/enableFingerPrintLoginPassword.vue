<template>
  <div class="register container-fluid">
    <div>
      <div class="form-group">
        <ul>
          <li class="form-label flex-center-leftRight">
            <span class="form-label-font">登录密码</span>

            <input id="password" class="form-control" type="password" name="password" v-validate="'required|passWord'"
                   placeholder="请输入登录密码"
                   v-model="loginPassword" maxlength="16" @keyup="checkLoginPasswordFormat()">
            <div class="visible " @click="showPassword()">
              <span v-if="passwordType" class="icon-invisible"></span>
              <span v-else class="icon-visible"></span>
            </div>
          </li>
          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors">
            <span v-show="showMistake">{{mistakeInfo}}</span>
          </li>
        </ul>
      </div>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="nextStep()">
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
        loginPassword: '',
        color: true,
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '登录密码',
          headerRight: ''
        },
        show: true,
        disabled: true,
        showPrompt: true,
        borderBottoms: false,
        mistakeInfo: '',
        showMistake: false,
        passwordType: true
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
      // 监听头部组件事件
      headerListen() {
        // 路由回退back(-1)
        this.routerBack();
      },
      checkLoginPasswordFormat () {
        let regPassword = /^(?![a-zA-Z]+$)(?!\d+$)[0-9A-Za-z]{6,16}$/;
        if (this.loginPassword === '') {
          this.disabled = true;
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '登录密码不能为空';
          return false;
        } else if (!regPassword.test(this.loginPassword)) {
          this.disabled = true;
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '登录密码格式不正确';
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
        if (this.passwordType === true) {
          this.passwordType = false;
          document.getElementById('password').type = 'text';
        } else {
          this.passwordType = true;
          document.getElementById('password').type = 'password';
        }
      },
      nextStep() {
        this.analysys.ma_btnClick('点击下一步按钮');
        let _this = this;
        this.openFingerPrint(false, this.loginPassword, function () {
          _this.jumpPasswordSet();
        }, function () {
          _this.jumpPasswordSet();
        });
      },
      jumpPasswordSet() {
        this.$router.push({
          path: '/passwordSet'
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "enableFingerPrintLoginPassword.styl"
</style>
