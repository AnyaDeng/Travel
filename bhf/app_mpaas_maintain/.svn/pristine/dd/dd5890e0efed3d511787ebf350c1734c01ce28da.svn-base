<template>
  <div class="container-fluid">
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item">
          <span class="list-group-item-left">新密码</span>
          <div class="inputBox">
            <input id="password" class="form-control" type="password"
                   placeholder="请输入6-16位数字、字母" v-model="password" v-validate="'required|passWord'" name="passWord"
                   @keyup="passwordChange()" maxlength="16">
          </div>
          <div class=" visible " @click="showPassword()">
            <span v-if="passwordShow" class="icon-invisible iconVisible"></span>
            <span v-else class="icon-visible iconVisible"></span>
          </div>
        </li>

        <li class=" list-group-item"
            :class="{borderBottoms:borderBottoms}">
          <span class="list-group-item-left">确认密码</span>
          <div class="inputBox">
            <input id="confirmPassword" type="password" class="form-control"
                   placeholder="请再次输入登录密码"
                   v-model="confirmPassword" @keyup="matchPassword()" maxlength="16">
          </div>
          <div class=" visible " @click="showConfirmPassword()">
            <span v-if="confirmPasswordShow" class="icon-invisible iconVisible"></span>
            <span v-else class="icon-visible iconVisible"></span>
          </div>
        </li>
      </ul>
      <div class="validate-errors ">
        <span v-show="showPrompt || errors.has('passWord')">{{prompt || errors.first('passWord')}}</span>
      </div>
    </div>
    <div class="btn-container">
      <div class="btn-success" :class="{disabled: disabled}" @click="submitModifyLoginPassword">
        <span>确认</span>
      </div>
    </div>
    <confirm ref="modifyLoginSuccessDialog" :modal-options.sync="popupInfo"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          modifyLoginPassword: this.apiType().modifyLoginPassword
        },
        originalPassword: this.$route.params.originalPassword,
        prompt: '',
        password: '',
        confirmPassword: '',
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '新登录密码',
          headerRight: this.headerBtn.service
        },
        disabled: true,
        borderBottoms: false,
        showPrompt: false,
        passwordShow: true,
        confirmPasswordShow: true,
        popupInfo: {
          title: '修改登录密码成功',
          img: 'static/img/pswSuccess.png',
          showCancelButton: false,
          confirmButtonText: '确定'
        },
        isSuccess: false
      };
    },
    beforeRouteLeave(to, from, next) {
      this.isSuccess = false;
      next();
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['modifyLoginOriginalPassword'];
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
        this.originalPassword = this.$route.params.originalPassword;

        this.clearPassword();
        // this.password = '';
        // this.confirmPassword = '';
        // this.borderBottoms = false;
        // this.showPrompt = false;
        // this.prompt = '';
        // this.disabled = true;
        this.$refs.modifyLoginSuccessDialog.show = false

        this.hidePassword();
        this.hideConfirmPassword();
        this.errors.items = [];
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
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击回退
          this.fallBack();
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      fallBack() {
        if (this.isSuccess) {
          this.jumpToPersonalCenterView();
        } else {
          this.$router.push({
            name: 'modifyLoginOriginalPassword'
          });
        }
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      showPassword() {
        this.analysys.ma_btnClick('点击了新密码的显隐控制');
        if (this.passwordShow === true) {
          this.passwordShow = false;
          document.getElementById('password').type = 'text';
        } else {
          this.hidePassword();
        }
      },
      hidePassword() {
        this.passwordShow = true;
        document.getElementById('password').type = 'password';
      },
      showConfirmPassword() {
        this.analysys.ma_btnClick('点击了确认密码的显隐控制');
        if (this.confirmPasswordShow === true) {
          this.confirmPasswordShow = false;
          document.getElementById('confirmPassword').type = 'text';
        } else {
          this.hideConfirmPassword();
        }
      },
      hideConfirmPassword() {
        this.confirmPasswordShow = true;
        document.getElementById('confirmPassword').type = 'password';
      },
      submitModifyLoginPassword() {
        this.analysys.ma_btnClick('点击了确认按钮');
        if (this.disabled) {
          return;
        }
        let param = {
          'originalPassword': this.originalPassword,
          'newPassword': this.password,
          'confirmPassword': this.confirmPassword
        };
        let _this = this;
        this.ajax(this.apiName.modifyLoginPassword, this.serviceType().api, param, function (responseData) {
          _this.isSuccess = true;
          _this.$refs.modifyLoginSuccessDialog.show = true;
          _this.$refs.modifyLoginSuccessDialog.confirm().then(() => {
            _this.jumpToPersonalCenterView();
          });
          _this.borderBottoms = false;
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
          return;
        } else if (this.password !== this.confirmPassword) {
          this.borderBottoms = true;
          this.showPrompt = true;
          this.prompt = '两次密码不相同';
          return;
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
        this.matchPassword();
        if (this.password === this.confirmPassword && this.password.length !== 0 && this.passwordValidate()) {
          this.disabled = false;
          this.showPrompt = false;
          this.borderBottoms = false;
          this.prompt = '';
        }
      },
      jumpToPersonalCenterView() {
        this.$router.push({
          path: '/personalCenter'
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "modifyLoginNewPassword.styl";
</style>
