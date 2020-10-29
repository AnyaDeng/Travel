<template>
  <div class="register container-fluid">
    <div>
      <div class="form-group">
        <ul>
          <li class="form-label">
            <span class="form-label-font">手机号</span>
            <input class="form-control" type="number" pattern="[0-9]*" name="mobile" v-validate="'required|mobile'"
                   placeholder="请输入11位手机号" oninput="if(value.length>11)value=value.slice(0,11)"
                   v-model="mobile" @input="checkMobileIsRegister">

          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors">
            <span class="" v-show="showMistake">{{mistakeInfo}}</span>
          </li>
        </ul>
      </div>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="jumpToFindLoginValidateView()">
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
          mobileRegisterValidate: this.apiType().mobileRegisterValidate
        },
        mobile: '',
        color: true,
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '找回密码',
          headerRight: this.headerBtn.service
        },
        disabled: true,
        showPrompt: true,
        borderBottoms: false,
        mistakeInfo: '',
        showMistake: false,
        isRegister: '',
        loginCtrl: this.$route.params.loginCtrl
      };
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['login', 'certificateLogin'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    activated() {
      // 向父组件通信
      this.sendMsgToParent();
      if (this.$route.meta.isBack === false) {
        this.loginCtrl = this.$route.params.loginCtrl;
        this.mobile = '';
        this.disabled = true;
        this.borderBottoms = false;
        this.mistakeInfo = '';
        this.showMistake = false;
      }
    },
    methods: {
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.cancel) {
          // 点击取消回退
          this.fallBack();
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      fallBack() {
        this.mtj_event('u_resetPwd_cancel', '找回密码点击取消按钮');
        if (this.loginCtrl === 'certificateLogin') {
          this.$router.push({
            name: 'certificateLogin'
          });
        } else {
          this.$router.push({
            name: 'login'
          });
        }
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      checkMobileIsRegister() {
        if (this.checkMobileFormat() === true) {
          this.disabled = false;
          this.isRegister = true;
          this.borderBottoms = false;
        } else {
          this.disabled = true;
          this.borderBottoms = true;
          this.isRegister = false;
        }
      },
      jumpToFindLoginValidateView() {
        this.mtj_event('u_resetPwd_phone_next', '找回密码输入手机号点击下一步按钮');
        this.analysys.ma_btnClick("点击下一步按钮");
        if (!this.isRegister) {
          return;
        }
        let param = {
          'mobile': this.mobile
        };
        let _this = this;
        this.ajax(this.apiName.mobileRegisterValidate, this.serviceType().api, param, function (responseData) {
          if (responseData.body.isRegister === '1') {
            _this.$router.push({
              name: 'findLoginValidateCode',
              params: {'mobile': _this.mobile, 'sourcePage': _this.loginCtrl}
            });
          } else {
            _this.mistakeInfo = '该手机号码尚未注册';
            _this.showMistake = true;
            _this.isRegister = false;
            _this.borderBottoms = true;
          }
        }, function (responseData) {
          _this.$toast(responseData.message, '');
        });
      },
      checkMobileFormat() {
        let regMobile = /^1\d{10}$/;
        if (this.mobile === '') {
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '手机号格式不正确';
          return false;
        } else if (!regMobile.test(this.mobile)) {
          this.borderBottoms = true;
          this.showMistake = true;
          this.mistakeInfo = '手机号格式不正确';
          return false;
        } else {
          this.mistakeInfo = '';
          this.showMistake = false;
          this.borderBottoms = false;
          return true;
        }
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "findLoginMobile.styl"
</style>

