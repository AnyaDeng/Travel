<template>
  <div id="paymentPassword"
       :class="{cipherKeyboard: errorStyle === false, errorStyle: errorStyle === true, checkMessageLength: errorMessage.length >=20}"
       class="bombBox width_100 height_100 backgroundTransparent paymentPassword">
    <input type="password" class="hidden">
    <input type="password" id="tradePwdIpt" @focus="triggerKeyBar" autofocus="autofocus"
           maxlength="6" class="hidden" autocomplete="off">
    <div class="minMask" v-show="minMaskShow" :style="{bottom:minMaskBottom}"></div>
    <div class="maskStyle" v-show="maskStyleShow" @click="closeKeyBar"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupScreenShow: false,   // 是否显示模态框
        showPassWord: true,
        showMask: false,
        lengths: 0,
        pageConfig: {
          headerLeft: '',
          headerTitle: '银行卡',
          headerRight: ''
        },
        menus8: {
          success: '解绑',
          delete: '取消'
        },
        actualAmount: '',
        bankTailNo: '',
        bankName: '',
        errorStyle: false,
        showErrMessage: false,
        errorMessage: '请输入交易密码',
        minMaskShow: false,
        maskStyleShow: false,
        sourcePage: '',
        minMaskBottom: '4.2rem'
      };
    },
    mounted() {
      let _this = this;
      let accountBottomSize = '';
      if (this.customerInfo.accountShow === true) {
        accountBottomSize = 0.77;
      }
      this.checkUserAgent(function () {
        _this.minMaskBottom = Number(3.57) + Number(accountBottomSize) + 'rem';
      }, function () {
        _this.minMaskBottom = Number(3.03) + Number(accountBottomSize) + 'rem';
      }, function () {
        _this.minMaskBottom = Number(3.23) + Number(accountBottomSize) + 'rem';
      })
      // 向父组件通信
//      this.sendMsgToParent();
      // 清空密码
//      this.clearPsw();
    },
    props: {
      customerInfo: {
        type: Object
      }
    },
    methods: {
      sendMsgToParent(val) {
        this.$emit('listenToChildEvent', val);
      },
      clearPsw() {
        // 清空密码
        this.checkPsw('');
        document.getElementById('tradePwdIpt').value = '';
      },
      closeKeyBar() {
        // 关闭键盘
        this.minMaskShow = false;
        this.maskStyleShow = false;
        // document.getElementById('keyBox').remove();
        try {
          document.getElementById('keyBox').remove();
        } catch (e) {

        }
      },
      setTradePassword(val) {
      },
      // 触发键盘
      triggerKeyBar() {
        let input = document.getElementById('tradePwdIpt');
        this.KeyBoard(input);
      },
      // 密码显示同步
      checkPsw(val) {
        let length = val.length;
        let keyPsw = document.getElementById('keyPsw');
        let yesStr = '';
        let noStr = '';
        if (length == 1) {
          this.errorStyle = false;
          document.getElementById('pass').innerText = '请输入交易密码';
        }
        if (length == 1 && this.showErrMessage == true) {
          this.showErrMessage = false;
        }
        for (let i = 0; i < length; i++) {
          yesStr += '<li class="passWordBasketChoice"><span class="passWordCircular"></span></li>';
        }
        for (let i = 0; i < 6 - length; i++) {
          noStr += '<li></li>';
        }
        keyPsw.innerHTML = yesStr + noStr;
        if (length === 6) {
          this.sendMsgToParent(val);
        }
      },
      KeyBoard(input, options) {
        const _this = this;
        _this.minMaskShow = true;
        _this.maskStyleShow = true;
        let body = document.getElementById('paymentPassword');
        let DIV_ID = options && options.divId || 'keyBox';

        if (document.getElementById(DIV_ID)) {
          body.removeChild(document.getElementById(DIV_ID));
        }

        this.input = input;
        this.el = document.createElement('div');

        let self = this;
        let zIndex = options && options.zIndex || 99;
        let width = options && options.width || '100%';
        let height = options && options.height || '3.95';
        // let fontSize = options && options.fontSize || '0.15rem';
        let backgroundColor = options && options.backgroundColor || '#fff';
        let TABLE_ID = options && options.table_id || 'keyTable';
        let mobile = typeof orientation !== 'undefined';

        this.el.id = DIV_ID;
        this.el.style.position = 'fixed';
        this.el.style.left = 0;
        this.el.style.right = 0;
        this.el.style.bottom = 0;
        this.el.style.zIndex = zIndex;
        this.el.style.width = width;
        this.el.style.height = height;
        this.el.style.backgroundColor = backgroundColor;

        // 样式
        let cssStr = '<style type="text/css">';
        cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;}';
        cssStr += '#' + TABLE_ID + ' td{width:33%;vertical-align:middle;font-size:0.18rem;font-weight: bold;}';
        if (!mobile) {
          cssStr += '#' + TABLE_ID + ' td:hover{background-color:#b7c5d3;color:#FFF;}';
        } else {
          cssStr += '#' + TABLE_ID + ' td:active{background-color:#b7c5d3;color:#FFF;}';
        }
        cssStr += '</style>';

        // 打乱键盘顺序
        function randomsort(a, b) {
          return Math.random() > 0.5 ? -1 : 1;
          // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
        }

        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        if (this.$store.getters.keyBoard_confuse_switch === '1') {
          arr.sort(randomsort);
        }

//        let modalHtml = '<div class="maskStyle"></div>';
        // Button

        let btnStr = '<div class="keyTitle">' +
          '<i class="icon-CloseBounced" ></i><div id="pass" class="pass">' + this.errorMessage + '</div>' +
          '<div class="topTitleBorder"></div>';
        if (this.customerInfo.accountShow === true) {
          btnStr += '<div id="passTitle"  class="passTitle">' + this.customerInfo.moneyTitle + '</div><div><span style="font-size: 0.3rem;color: #232323;font-family: Roboto-Regular;">' + this.splitDigit(this.actualAmount) + '</span><span>元</span></div>';
        } else if (this.customerInfo.onlyCheckPassword === true) {
          btnStr += '';
        } else if (this.customerInfo.accountShow === false) {
          btnStr += this.showTip();
        }
        btnStr += '<div class="basketBox"><div><div class="absolute width_100">';
        btnStr += '<ul style="margin-top: 0.01rem; line-height: 0.535rem " class="width_321 marginAuto textAlign" id="keyPsw">';
        btnStr += '<li></li><li></li><li></li><li></li><li></li><li></li>';
        btnStr += '</ul>';
        btnStr += '</div>';
        btnStr += '<ul class="">';
        btnStr += '<li class="passWordBasketBox">';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '<span class="passWordBasket"></span>';
        btnStr += '</li>';
        btnStr += '<li class="fotgetPassword"><span >?</span><span>忘记密码</span></li>';
        btnStr += '<li>';
        btnStr += '</li>';
        btnStr += '</ul>';
        btnStr += '</div>';
        btnStr += '</div>';
        btnStr += '</div>';

        // table
        let tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0" class="keyStyle">';
        tableStr += '<tr><td>' + arr[0] + '</td><td>' + arr[1] + '</td><td>' + arr[2] + '</td></tr>';
        tableStr += '<tr><td>' + arr[3] + '</td><td>' + arr[4] + '</td><td>' + arr[5] + '</td></tr>';
        tableStr += '<tr><td>' + arr[6] + '</td><td>' + arr[7] + '</td><td>' + arr[8] + '</td></tr>';
        tableStr += '<tr><td class="clearBtn"></td><td>' + arr[9] + '</td>';
        tableStr += '<td class="clearBtn"><img src="static/img/num.png"></td></tr>';
        tableStr += '</table>';
        if (this.isIphoneX()) {
          tableStr += '<div class="bottomBoxPosition"></div>';
        }
        if (this.lengths === 6) {
          _this.$router.push({name: 'rechargeVerification'});
        } else if (this.lengths === 0) {
//          this.el.innerHTML = modalHtml + cssStr + btnStr + tableStr;
          this.el.innerHTML = cssStr + btnStr + tableStr;
        }

        function addEvent(e) {
          let ev = e || window.event;
          let clickEl = ev.element || ev.target;
          let value = clickEl.textContent || clickEl.innerText;
          let num = self.input.value;
          if (clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "" && num.length < 6) {
            if (self.input) {
              self.input.value += value;
              self.checkPsw(self.input.value);
            }
          } else if (clickEl.tagName.toLocaleLowerCase() === 'i' && value === "") {
            _this.mtj_event('c_pswClose', '活期密码输入弹框点击关闭icon');
            body.removeChild(self.el);
            self.maskStyleShow = false;
            setTimeout(function () {
              self.minMaskShow = false;
            }, 400);
          } else if (clickEl.tagName.toLocaleLowerCase() === 'td' && value === "") {
            if (num) {
              let newNum = num.substr(0, num.length - 1);
              self.input.value = newNum;
              self.checkPsw(self.input.value);
            }
          } else if (clickEl.tagName.toLocaleLowerCase() === 'img' && value === "") {
            if (num) {
              let newNum = num.substr(0, num.length - 1);
              self.input.value = newNum;
              self.checkPsw(self.input.value);
            }
          }

          if (clickEl.tagName.toLocaleLowerCase() === 'span' && value === "完成") {
            _this.$router.push({path: '/recharge'});
          }

          if (clickEl.tagName.toLocaleLowerCase() === 'span' && value === "忘记密码") {
            _this.mtj_event('a_inputTradPwd_forgetPwd', '交易密码输入框点击忘记密码按钮');
            _this.closeKeyBar();
            let params = {
              "action": "account_action",
              'ac_actions': "trade_password_reset"
            };
            _this.showPlatformH5(params);
          }
        }

        if (mobile) {
          this.el.ontouchstart = addEvent;
        } else {
          this.el.onclick = addEvent;
        }
        body.appendChild(this.el);
      },
      completeButton() {

      },
      showTip() {
        let btnStr = '';
        if (this.showErrMessage) {
          btnStr += '<div id="passTitle"  class="passTitle">' + this.errorMessage + '</div>';
          return btnStr;
        } else {
          btnStr += '<div id="passTitle"  class="passTitle">请输入您' + this.bankName + '尾号为' + this.bankTailNo + '的交易密码</div>';
          return btnStr;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .minMask
    width: 0.7rem
    height 1.2rem
    background: #fff
    opacity: 0
    position: fixed
    bottom: 4.2rem
    right: 0rem
    z-index: 1

  /*.minMask
    width: 0.5rem
    height: 0.4rem
    background: #fff
    opacity: 0
    position: fixed
    bottom: 4.2rem
    right: 0.1rem
    z-index: 1*/

  .paymentPassword
    position: relative
    top: 0
    left: 0
    .maskStyle
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
      background: rgba(0, 0, 0, 0.6);
      tap-highlight-color: rgba(0, 0, 0, 0);
      z-index: 10;
      transition: opacity 400ms;
    .keyTitle
      position: relative
      text-align: center
      background: #fff
      .icon-CloseBounced
        font-size: 0.14rem
        position: absolute
        right: 0.18rem
        top: 0.14rem
        background: #fff
      .pass
        font-family: SourceHanSansCN-Regular
        font-size: 0.16rem
        color: #232323
        letter-spacing: 0
        padding: 0.135rem 0.205rem
      .passTitle
        font-family: SourceHanSansCN-Regular;
        font-size: 0.15rem;
        color: #82889B;
        letter-spacing: 0;
        padding: 0.24rem 0 0.075rem
      .basketBox
        padding: 0.265rem 0 0.385rem
      .topTitleBorder
        margin: 0 0.205rem
        border-bottom-1px(1px, #D2D7E0)
    .keyStyle
      margin 0 auto
      tr
        td:first-child
          border-left: 0 !important
        td
          font-family: Roboto-Regular;
        td.clearBtn
          background: #D2D7E0
          img
            width: 0.2rem
            height: 0.15rem
        td.clearBtn:first-child
          position: relative
          z-index: -10
    .fotgetPassword
      padding: 0.08rem 0.2rem
      span
        float: right
        font-size: 0.14rem
        color: #6098DE
        margin-bottom: 0.175rem
        font-family: SourceHanSansCN-Regular;
      span.icon-reminder
        float: right
        margin-right: 0.06rem
    .temporarilyNotSet
      margin-top: 0.49rem
      text-align: center
      span
        font-size: 0.14rem
        color: #6098DE
    .btn-container
      margin-top: 0.35rem
      color: white
      font-size: 0.16rem

  .cipherKeyboard
    .passWordBasketBox
      margin: auto
      width: 3.21rem
      height: 0.535rem
      border-top-bottom-1px(1px, #D8DCE2)

    .passWordBasket
      width: 0.535rem
      border-right-1px(1px, #D8DCE2)
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasketChoice
      width: 0.535rem
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasket:first-child
      border-left-right-1px(1px, #D8DCE2)
      width: 0.535rem

  .errorStyle
    .pass
      color: #F56361 !important
    .passTitle
      color: #F56361
    .passWordBasketBox
      margin: auto
      width: 3.21rem
      height: 0.535rem
      border-top-bottom-1px(1px, #F56361)

    .passWordBasket
      width: 0.535rem
      border-right-1px(1px, #F56361)
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasketChoice
      width: 0.535rem
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasket:first-child
      border-left-right-1px(1px, #F56361)
      width: 0.535rem

  .checkMessageLength
    .pass
      font-size: 0.14rem !important

  .errorStyleBtn
    #keyBox
      .btn-success
        background: #acafb8
        pointer-events: none
        box-shadow: none
        z-index: 0

  .errorTitle
    position: absolute
    top: 0
    left: 0
    color: #F56361
    z-index: 98
    background: #fff

  .errorButton
    width: 100%
    position: absolute
    top: 1.06rem
    left: 0
    z-index: 1
    background: #fff

  .bottomBoxPosition
    width: 100%
    height: 0.34rem
    background: #d2d7e0
</style>
