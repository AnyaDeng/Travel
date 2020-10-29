<template>
  <div class="container-fluid">
    <div class="sendSms">
      <div v-show="smsEncodingCtrl">
        <div class="sendPhoneNum">
          已向手机号<span>{{mobile | mobileFilter}}</span>
          发送编号为<span>{{tailNo}}</span>
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
                     @input="validateCodeFormat">
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
      <v-popupGraphCode ref="dialog" :graphCodeType="graphCodeType"
                        @graphCodeEvent="onGraphCodeEvent"></v-popupGraphCode>
      <div class="btn-container">
        <div class="btn-success" :class="{disabled: disabled}" @click="enterSetPassword()">
          <span>下一步</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import shortMessageCode from 'components/common/mobileValidateCode/smsCode'; // 短信验证
  import popupGraphCodeShow from 'components/common/popup/popupGraphCode'

  export default {
    components: {
      'v-shortMessageCode': shortMessageCode,
      'v-popupGraphCode': popupGraphCodeShow
    },
    data() {
      return {
        apiName: {
          checkValidateCode: this.apiType().checkValidateCode
        },
        validateCode: '',
        disabled: true,
        mobile: this.$route.params.mobile,
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '注册',
          headerRight: this.headerBtn.service
        },
        borderBottoms: false,
        mistakeInfo: '',
        smsEncodingCtrl: false,
        tailNo: '',
        sendValidateData: {
          sendType: '1'
        },
        graphCodeType: '1',
        sourcePage: this.$route.params.sourcePage,
        isHasSendMessage: false  //是否发送了短信
      };
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['registerMobile'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    activated() {
      // 向父组件通信
      this.sendMsgToParent();
      if (this.$route.meta.isBack === false) {
        this.mobile = this.$route.params.mobile;
        this.sourcePage = this.$route.params.sourcePage;
        this.validateCode = '';
        this.isHasSendMessage = false;

        this.mistakeInfo = '';
        this.borderBottoms = false;
        this.disabled = true;

        this.smsEncodingCtrl = false;
        this.tailNo = '';
        this.$refs.txtCode.countEnd();
      }
    },
    methods: {
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 点击取消回退
          this.$router.push({
            name: 'registerMobile'
          });
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
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
        this.mtj_event('u_regist_sms_query', '注册点击获取验证码按钮');
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
          _this.isHasSendMessage = true;
          _this.$refs.txtCode.countStart(responseData.body.sendIntervalLeft);
          _this.ctrlParentComponent({'smsEncodingCtrl': true, 'tailNo': responseData.body.tailNo});
          let isRealSend = responseData.body.isRealSend;
          let sendIntervalLeft = responseData.body.sendIntervalLeft;
          if (isRealSend === '0') {
            _this.$alert('发送时间间隔过短，距离下次可发送还有' + sendIntervalLeft + '秒');
          }
        }, function (responseData) {
          _this.isHasSendMessage = false;
          let resultCode = responseData.resultCode;
          let message = responseData.message;
          if (resultCode === 'CO_VALIDATE_CODE_SEND_INTERVAL') {
            _this.isHasSendMessage = true;
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
      validateCodeFormat() {
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
      enterSetPassword() {
        if (!this.isHasSendMessage) {
          this.$toast('请获取验证码');
          return;
        }
        let param = {
          'mobile': this.mobile,
          'sendType': '1',
          'code': this.validateCode
        };
        let _this = this;
        _this.mtj_event('u_regist_sms_next', '注册获取验证码点击下一步按钮');
        _this.analysys.ma_btnClick("点击下一步");
        this.ajax(this.apiName.checkValidateCode, this.serviceType().api, param, function (responseData) {
          const accountInfo = {};
          accountInfo.mobile = _this.mobile;
          accountInfo.sendType = _this.sendType;
          _this.borderBottoms = false;
          _this.smsEncodingCtrl = false;
          _this.$refs.txtCode.btnUse = false;
          _this.$router.push({
            name: 'registerResult',
            params: {accountInfo: accountInfo, 'sourcePage': _this.sourcePage}
          });
        });
      }
    }

  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "registerSms.styl"
</style>
