<template>
  <div class="register container-fluid">
    <div class="dialog">
      <confirm ref="dialog" :modal-options.sync="modal">
        <div slot="body">
          <p class="txt">1. 滨海国金所从未授权任何第三方以滨海国金所的名义开展推介或销售行为，请认准滨海国金所官方网站（www.bhfae.com）及滨海国金所官方APP，谨防诈骗；</p>
          <p class="txt">2. 理财有风险，投资需谨慎。请个人用户在注册和投资前务必审慎阅读《滨海国金所服务协议（个人会员版）》、《风险揭示书》、《免责声明》及其他相关文件，全面了解项目相关情况并谨慎决策；</p>
          <p class="txt">3. 在任何情况下，个人用户都应依其独立判断做出决策并自行承担相应风险；</p>
          <p class="txt">
            4. 滨海国金所仅提供项目信息发布、交易管理服务、客户服务等，不承担任何因项目产生的风险或代替交易方履约的责任，滨海国金所不对任何投资人及/或任何交易提供任何担保，无论是明示、默示或投资人理解为存在的；</p>
          <p class="txt">5. 个人用户点击同意视为已阅读并同意
            <span @click="viewFileDetails(file1_name)" class="relatedLiterature ">《滨海国金所服务协议（个人会员版）》</span><span
              @click="viewFileDetails(file2_name)" class="relatedLiterature ">《免责声明》</span><span
              @click="viewFileDetails(file3_name)" class="relatedLiterature ">《隐私政策》</span></p>
        </div>
      </confirm>
    </div>

    <div>
      <div class="form-group">
        <ul>
          <li class="form-label">
            <span class="form-label-font">手机号</span>
            <input class="form-control" v-model="mobile" type="number" pattern="[0-9]*"
                   @keyup="validateMobileIsRegister"
                   placeholder="请输入11位手机号" name="mobile" v-validate="'required|mobile'"
                   oninput="if(value.length>11)value=value.slice(0,11)"
                   @blur="validateMobileFormat"></li>
          <li class=""
              :class="{borderBottoms:borderBottoms}"></li>
          <li class=" validate-errors ">
            <span>{{mistakeInfo}}</span>
          </li>

        </ul>
      </div>

      <div class="btn-container">
        <div class="btn-success  " :class="{ disabled: disabled }"
             @click="onNextClicked">
          <span>下一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XButton, Group, Cell} from 'vux'

  export default {
    components: {
      XButton, Group, Cell
    },
    data() {
      return {
        apiName: {
          mobileRegisterValidate: this.apiType().mobileRegisterValidate,
          queryParamValue: this.apiType().queryParamValue,
          registerMobileLeftClick: true
        },
        mobile: this.$route.params.mobile ? this.$route.params.mobile : null,
        mobile2: '',
        disabled: !this.$route.params.mobile,
        color: true,
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '注册',
          headerRight: this.headerBtn.service
        },
        show: true,
        showPrompt: true,
        borderBottoms: false,
        mistakeInfo: '',
        modal: {
          title: '风险提示',
          cancelButtonText: '不同意',
          confirmButtonText: '同意'
        },
        loginCtrl: this.$route.params.loginCtrl,
        // fileServerUrl: '',
        file1_name: this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        file2_name: this.fileRelativePath() + '/register/disclaimer.html?bhfae_titleText=免责声明',
        file3_name: this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      }
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

        this.showAlert();

        this.mobile = this.$route.params.mobile ? this.$route.params.mobile : null;
        this.mobile2 = '';

        this.disabled = !this.$route.params.mobile;
        this.borderBottoms = false;
        this.mistakeInfo = '';
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
        this.mtj_event('u_regist_cancel', '注册页点击取消按钮');
        let _this = this;
        if (this.loginCtrl && this.loginCtrl !== '') {
          this.$router.push({
            path: _this.loginCtrl
          })
        } else {
          this.$router.push({
            path: '/login'
          })
        }
      },
      showAlert() {
        this.$refs.dialog.show = true;
        this.$refs.dialog.confirm().then(() => {
          // 点击确定按钮的回调处理
          this.mtj_event('u_regist_risk_ok', "注册页风险提示点击同意按钮");
          this.$refs.dialog.show = false
        }).catch(() => {
          // 点击取消按钮的回调处理
          this.cancelButton();
          this.mtj_event('u_regist_risk_no_ok', "注册页风险提示点击不同意按钮");
          this.$refs.dialog.show = false
        })
      },
      cancelButton() {
        this.fallBack();
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig)
      },
      validateMobileIsRegister() {
        let regMobile = /^1\d{10}$/
        if (regMobile.test(this.mobile) === true) {
          if (this.mobile === this.mobile2) {
            this.disabled = false;
            this.mistakeInfo = '';
            this.borderBottoms = false;
          } else {
            //	this.mobile2 = this.mobile
            this.mistakeInfo = ''
            this.disabled = false;
            this.borderBottoms = false;
            this.mobile2 = this.mobile;
          }
        } else if (regMobile.test(this.mobile) === false) {
          this.mistakeInfo = '';
          this.disabled = true;
          this.borderBottoms = false;
        }
      },
      onNextClicked() {
        let _this = this;
        _this.mtj_event('u_regist_phone_next', '注册输入手机号点击下一步按钮');
        _this.analysys.ma_btnClick("点击下一步");
        let param = {
          'mobile': this.mobile
        }
        this.ajax(this.apiName.mobileRegisterValidate, this.serviceType().api, param, function (responseData) {
          if (responseData.body.isRegister === '1') {
            //测试成功后可删除这两行
            // _this.borderBottoms = true;
            // _this.mistakeInfo = '该手机号已注册!';
            _this.$confirmCtrl('', '该手机号已注册,是否去登录?', '去登录', '取消', function () {
              _this.$router.push({
                name: 'login',
                params: {
                  registerMobile: _this.mobile
                }
              });
            })
          } else {
            _this.$router.push({
              name: 'registerSms',
              params: {'mobile': _this.mobile, 'sourcePage': _this.loginCtrl}
            })
          }
        }, function (responseData) {
          _this.disabled = true;
          _this.borderBottoms = true;
          _this.mistakeInfo = responseData.message;
        })
      },
      validateMobileFormat() {
        let regMobile = /^1\d{10}$/;
        if (this.mobile === '') {
          this.mistakeInfo = '手机号格式不正确';
          this.borderBottoms = true;
          this.disabled = true;
        } else if (regMobile.test(this.mobile) === false) {
          this.mistakeInfo = '请输入正确的手机号';
          this.borderBottoms = true;
          this.disabled = true;
        }
      },
      viewFileDetails(fileName) {
        this.mtj_event('u_regist_risk_statement', '注册页风险提示点击协议声明按钮');
        try {
          this.analysys.ma_btnClick("点击" + fileName);
        } catch (e) {
        }
        this.thirdLinks(this.$store.getters.h5Url + fileName);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "registerMobile.styl"
</style>

