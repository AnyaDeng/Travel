<template>
  <div class="container-fluid">
    <div class="sendSms">
      <div v-show="smsEncodingCtrl">
        <div class="sendPhoneNum ">
          已向手机号<span class="">{{mobile | mobileFilter}}</span>
          发送编号为<span class="">{{tailNo}}</span>
          的短信验证，填写您收到的验证码
        </div>
      </div>
    </div>
    <div class="verificationCode">
      <div class="form-group">
        <ul class="">
          <li class="form-label">
            <span>验证码</span>
            <div class="inputBox">
              <input class=" form-control" type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="validateCode"
                     @input="checkValidateCode">
            </div>
            <span>
              <v-shortMessageCode ref="txtCode" @smsEvent="onSmsEvent"></v-shortMessageCode>
            </span>
          </li>
          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class="validate-errors ">
            <span>{{mistakeInfo}}</span>
          </li>
          <v-smsCodeReminder></v-smsCodeReminder>
        </ul>
      </div>
      <v-popupGraphCode ref="dialog" :graphCodeType="graphCodeType"  @graphCodeEvent="onGraphCodeEvent"></v-popupGraphCode>
      <div class="btn-container">
        <div class="btn-radius" :class="{disabled: disabled}" @click="jumpToNextViewByIsRealName()">
          <span>下一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import shortMessageCode from 'components/common/mobileValidateCode/smsCode'; // 短信验证;
  import popupGraphCodeShow from 'components/common/popup/popupGraphCode'

  export default {
    components: {
      'v-shortMessageCode': shortMessageCode,
      'v-popupGraphCode': popupGraphCodeShow
    },
    data() {
      return {
        apiName: {
          findLoginPasswordValidate: this.apiType().findLoginPasswordValidate,
          checkValidateCode: this.apiType().checkValidateCode
        },
        validateCode: '',
        mobile: this.$route.params.mobile,
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '找回密码',
          headerRight: this.headerBtn.service
        },
        count: '',
        disabled: true,
        borderBottoms: false,
        showPrompt: true,
        mistakeInfo: '',
        isNeedValidateCert: false,
        smsEncodingCtrl: false,
        tailNo: '',
        sendValidateData: {
          sendType: '2'
        },
        graphCodeType: '2',
        sourcePage: this.$route.params.sourcePage
      };
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['findLoginMobile'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    activated() {
      if (this.$route.meta.isBack === false) {
        this.validateCode = '';
        this.mistakeInfo = '';
        this.borderBottoms = false;
        this.disabled = true;
        this.mobile = this.$route.params.mobile;
        this.tailNo = '';
        this.smsEncodingCtrl = false;
        this.isNeedValidateCert = false;
        try {
          this.$refs.dialog.show = false;
        } catch (e) {
          console.log(e);
        }
        this.sourcePage = this.$route.params.sourcePage;
        this.$refs.txtCode.countEnd();
      }
      // 向父组件通信
      this.sendMsgToParent();
      this.getIsNeedValidateCert();
    },
    methods: {
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击取消回退
          this.fallBack();
        } else if(params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      fallBack() {
        let _this = this;
        this.$confirm('', '确定放弃找回密码？', function () {
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
      },
      onSmsEvent(data) {
        let key = data.eventType;
        if (key === this.$refs.txtCode.eventType.onClick) {
          this.showPopup();
        } else if (key === this.$refs.txtCode.eventType.timeStop) {
          this.onTimeOver();
        }
      },
      showPopup() {
        let _this = this;
        this.mtj_event('u_resetPwd_sms_query', '找回密码点击获取验证码按钮');
        this.$refs.dialog.openView();
      },
      onGraphCodeEvent(data) {
        let params = {
          'mobile': this.mobile,
          'graphCode': data.graphCode,
          'graphCodeType': this.graphCodeType,
          'sendType': this.sendValidateData.sendType
        };
        let _this = this;
        this.getSmsValidateCode(params, function (responseData) {
          _this.$refs.txtCode.countStart(responseData.body.sendIntervalLeft);
          _this.ctrlParentComponent({'smsEncodingCtrl': true, 'tailNo': responseData.body.tailNo});
          let isRealSend = responseData.body.isRealSend;
          let sendIntervalLeft = responseData.body.sendIntervalLeft;
          if (isRealSend === '0') {
            _this.$alert('发送时间间隔过短，距离下次可发送还有' + sendIntervalLeft + '秒');
          }
        }, function (responseData) {
          let resultCode = responseData.resultCode;
          let message = responseData.message;
          if (resultCode === 'CO_VALIDATE_CODE_SEND_INTERVAL') {
            _this.$refs.txtCode.countStart(responseData.body.sendIntervalLeft);
          }
          _this.$alert(message);
        })
      },
      onTimeOver() {
        this.smsEncodingCtrl = false;
      },
      ctrlParentComponent(param) {
        this.smsEncodingCtrl = param.smsEncodingCtrl;
        this.tailNo = param.tailNo;
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      checkValidateCode() {
        let pattern = /(^[0-9]{4}$)/;
        if (pattern.test(this.validateCode) === false) {
          if (this.validateCode.length > 4) {
            this.validateCode = this.validateCode.slice(0, 4);
            this.mistakeInfo = '';
            this.disabled = false;
            this.borderBottoms = false;
          } else {
            this.mistakeInfo = '请输入4位数字的短信验证码';
            this.disabled = true;
            this.borderBottoms = true;
          }
        } else {
          this.mistakeInfo = '';
          this.disabled = false;
          this.borderBottoms = false;
        }
      },
      jumpToNextViewByIsRealName() {
        this.mtj_event('u_resetPwd_sms_next', '找回密码获取验证码点击下一步按钮');
        let param = {
          'mobile': this.mobile,
          'sendType': '2',
          'code': this.validateCode
        };
        let _this = this;
        this.ajax(this.apiName.checkValidateCode, this.serviceType().api, param, function (responseData) {
          _this.borderBottoms = false;
          if (_this.isNeedValidateCert === true) {
            _this.$router.push({
              name: 'findLoginCertificate',
              params: {'mobile': _this.mobile, 'sourcePage': _this.sourcePage}
            });
          } else {
            const certInfo = {};
            certInfo.mobile = _this.mobile;
            certInfo.certifacateNo = '';
            _this.$router.push({
              name: 'findLoginPassword',
              params: {'certInfo': certInfo, 'sourcePage': _this.sourcePage}
            });
          }
        });
      },
      getIsNeedValidateCert() {
        let param = {
          'mobile': this.mobile
        };
        let _this = this;
        this.ajax(this.apiName.findLoginPasswordValidate, this.serviceType().api, param, function (responseData) {
          if (responseData.body.isNeedValidateCert === '1') {
            _this.isNeedValidateCert = true;
          } else {
            _this.isNeedValidateCert = false;
          }
        });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "findLoginValidateCode.styl"


</style>
