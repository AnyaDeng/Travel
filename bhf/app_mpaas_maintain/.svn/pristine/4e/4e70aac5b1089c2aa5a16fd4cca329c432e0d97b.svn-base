<template>
  <div class="container-fluid">
    <div class="row">
      <ul class="list-group">
        <custom-li class="list-group-item " @touch-delay="jumpToModifyLoginPassword">
          <div slot="structure">
            <span class="leftSetFont">修改登录密码</span>
          </div>
          <div slot="structure">
            <span class="icon-advance"></span>
          </div>
        </custom-li>
        <custom-li class="list-group-item " v-if="isSetTradePassword"
                   @touch-delay="jumpToModifyTradePassword">
          <div slot="structure">
            <span class="leftSetFont">修改交易密码</span>
          </div>
          <div slot="structure">
            <span class="icon-advance"></span>
          </div>
        </custom-li>
        <custom-li class="list-group-item "
                   v-if="!isSetTradePassword && isRealName"
                   @touch-delay="jumpToSetTradePassword">
          <div slot="structure">
            <span class="leftSetFont">设置交易密码</span>
          </div>
          <div slot="structure">
            <span class="icon-advance"></span>
          </div>
        </custom-li>
        <custom-li class="list-group-item lineSet " v-if="isSetTradePassword"
                   @touch-delay="jumpToFindTradePassword">
          <div slot="structure">
            <span class="leftSetFont">忘记交易密码</span>
          </div>
          <div slot="structure">
            <span class="icon-advance"></span>
          </div>
        </custom-li>
      </ul>
    </div>
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item" v-show="fingerPrintShow">
          <div>
            <span class="leftSetFont">{{fingerPrintTxt}}</span>
          </div>
          <div>
            <x-switch title=" " v-model="fingerPrintControl" prevent-default
                      @on-click="enableAndDisableFingerPrintPassword"></x-switch>
          </div>
        </li>
        <li class="list-group-item">
          <div>
            <span class="leftSetFont">手势登录</span>
          </div>
          <div>
            <x-switch title=" " v-model="gestureControl" prevent-default
                      @on-click="enableAndDisableGesturePassword"></x-switch>
          </div>
        </li>
      </ul>
    </div>
    <confirm ref="notBindCardDialog" :modal-options.sync="notBindCardDialogInfo">
      <div slot="header">
        <p class="prompting">您未绑卡，无法设置交易密码，请先绑卡</p>
      </div>
    </confirm>
  </div>
</template>
<script type="text/ecmascript-6">
  import {XSwitch, Group, Cell, Checker, CheckerItem} from 'vux';

  export default {
    components: {
      XSwitch,
      Group,
      Cell,
      Checker,
      CheckerItem
    },
    data() {
      return {
        apiName: {
          disableGesturePassword: this.apiType().disableGesturePassword,
          queryIgnorePassword: this.apiType().queryIgnorePassword
        },
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '密码管理',
          headerRight: ''
        },
        notBindCardDialogInfo: {
          title: '请绑卡 ',
          cancelButtonText: '取消',
          confirmButtonText: '去绑卡'
        },
        gestureControl: false,
        fingerPrintControl: false,
        fingerPrintShow: true,
        fingerPrintTxt: '指纹登录',
        sureClose: '您是否确定关闭？',
        isSetTradePassword: this.isUserSetTradePassword(),
        isRealName: this.isUserRealName()
      };
    },
    mounted() {
      // 向父组件通信
      this.sendMsgToParent();
      this.checkIsEnableGesturePassword();
      this.checkIsFingerPassword();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      // 判断设备是否支持指纹或面部识别功能
      this.checkFingerPrint();
      // 监听刷新用户信息完成,修改页面展示内容
      this.addObserve('refreshUserInfoFinish', () => {
        this.isSetTradePassword = this.isUserSetTradePassword();
        this.isRealName = this.isUserRealName();
      });
    },
    methods: {
      checkFingerPrint() {
        let _this = this;
        this.fingerTouchAvailable(function (type) {
          _this.fingerPrintShow = true;
          if (type === 'touch') {
            _this.fingerPrintTxt = '指纹登录';
          } else if (type === 'face') {
            _this.fingerPrintTxt = '面容登录';
          }
        }, function () {
          _this.fingerPrintShow = false;
        });
      },
      headerListen() {
        // 点击回退
        this.$router.push({
          name: 'personalCenter'
        });
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      jumpToModifyLoginPassword() {
        this.mtj_event('u_manage_loginPwd', '密码管理点击修改登录密码');
        this.analysys.ma_btnClick('密码管理点击修改登录密码');
        this.$router.push({path: '/modifyLoginOriginalPassword'});
      },
      jumpToModifyTradePassword() {
        this.mtj_event('u_manage_tradePwd', '密码管理点击修改交易密码');
        this.analysys.ma_btnClick('密码管理点击修改交易密码');
        this.jumpToAccountAction('trade_password_modify');
      },
      jumpToAccountAction(acAction) {
        let params = {
          "action": "account_action",
          'ac_actions': acAction
        };
        this.showPlatformH5(params);
      },
      jumpToSetTradePassword() {
        this.refreshUserInfo(() => {
          if (!this.isUserSetTradePassword()) {
            this.jumpToAccountAction('trade_password_set');
          }
        }, true);
      },
      jumpToFindTradePassword() {
        this.mtj_event('u_manage_forgetTradePwd', '密码管理点击忘记交易密码');
        this.analysys.ma_btnClick('密码管理开启手势登录');
        this.jumpToAccountAction('trade_password_reset');
      },
      enableAndDisableGesturePassword(newVal, oldVal) {
        let _this = this;
        if (oldVal === false && newVal === true) { // 打开手势密码 开关
          this.mtj_event('u_manage_gesture_open', '密码管理开启手势登录');
          this.analysys.ma_btnClick('密码管理开启手势登录');
          this.queryIgnorePassword(function (isOk) {
            if (isOk) { // 不需要输入密码
              _this.$router.push({
                name: 'setGestureCipher',
                params: {loginPassword: '', 'sourcePage': 'passwordSet'}
              });
            } else {
              _this.$router.push({
                name: 'enableGestureLoginPassword'
              });
            }
          });
        } else if (oldVal === true && newVal === false) { //关闭
          this.mtj_event('u_manage_gesture_close', '密码管理关闭手势登录');
          this.analysys.ma_btnClick('密码管理关闭手势登录');
          this.disableGesturePassword();
        }
      },
      disableGesturePassword() {
        let _this = this;
        this.ajax(this.apiName.disableGesturePassword, this.serviceType().api, {}, function (responseData) {
          _this.gestureControl = false;
          _this.setUserStorage('isSetGesture', '0');
          _this.$toast('取消手势密码成功');
        });
      },
      checkIsEnableGesturePassword() {
        this.gestureControl = this.isUserSetGestureLogin();
      },
      checkIsFingerPassword() {
        this.fingerPrintControl = this.isUserSetFingerLogin();
      },
      enableAndDisableFingerPrintPassword(newVal, oldVal) {
        let _this = this;
        if (oldVal === false && newVal === true) {
          this.mtj_event('u_manage_fingerFace_open', '密码管理开启指纹/面容登录');
          this.analysys.ma_btnClick('密码管理开启指纹/面容登录');
          this.queryIgnorePassword(function (isOk) {
            if (isOk) {
              _this.openFingerPrint(false, '', function () {
                _this.fingerPrintControl = true;
                _this.$toast('开启成功');
              }, function () {
                _this.fingerPrintControl = false;
              });
            } else {
              _this.$router.push({path: 'enableFingerPrintLoginPassword'});
            }
          });
        } else if (oldVal === true && newVal === false) {
          this.mtj_event('u_manage_fingerFace_close', '密码管理关闭指纹/面容登录');
          this.analysys.ma_btnClick('密码管理关闭指纹/面容登录');
          this.$confirm('', this.sureClose, function () {
            _this.disableFingerPrintPassword();
          });
        }
      },
      disableFingerPrintPassword() {
        let _this = this;
        this.closeFingerPrint(function () {
          _this.fingerPrintControl = false;
          _this.$toast('关闭成功');
        });
      },
      queryIgnorePassword(cb) {
        this.ajax(this.apiName.queryIgnorePassword, this.serviceType().query, {}, function (responseData) {
          let isIgnorePassword = responseData.body[0].isIgnorePassword;
          if (cb) {
            cb(isIgnorePassword === '1');
          }
        }, function () {
          if (cb) {
            cb(false);
          }
        });
      }
    }
  }
  ;
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "passwordSet.styl";

</style>
