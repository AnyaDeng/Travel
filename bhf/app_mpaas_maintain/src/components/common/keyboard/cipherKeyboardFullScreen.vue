<template>
  <div id="paymentPasswordAll" class="paymentPasswordAll" :class="{cipherKeyboardAll: errorStyle === false, errorStyleAll: errorStyle === true, errorStyleBtn: errorStyleBtn}">
    <input type="password" class="hidden">
    <input type="password" id="tradePwdFullScreen" @focus="triggerKeyBar" autofocus="autofocus"
           maxlength="6" class="hidden" autocomplete="off">
    <div class="passTitle errorTitle" v-show="errorStyle">{{errorMessage}}</div>
    <div class="btn-container errorButton" v-show="!errorStyleBtn" @click="nextBtn">
      <div class="btn-success">下一步</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        value: '',
        showPassWord: true,
        showMask: false,
        lengths: 0,
        errorStyle: false,
        errorStyleBtn: true,
        selfTransferVal: true,
        errorMessage: '两次密码不一致，请重新设置'
      };
    },
    mounted() {
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
      nextBtn() {
        this.selfTransferVal = false;
        this.sendMsgToParent(this.value);
      },
      clearPsw() {
        // 清空密码
        this.checkPsw('');
        document.getElementById('tradePwdFullScreen').value = '';
      },
      closeKeyBar() {
        // 关闭键盘
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
        let input = document.getElementById('tradePwdFullScreen');
        this.KeyBoard(input);
      },
      // 密码显示同步
      checkPsw(val) {
        this.value = val;
        let length = val.length;
        if (length == 1) {
          this.errorStyle = false;
        }
        let keyPsw = document.getElementById('keyPsw');
        let yesStr = '';
        let noStr = '';
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
        let body = document.getElementById('paymentPasswordAll');
        let DIV_ID = options && options.divId || 'keyBox';

        if (document.getElementById(DIV_ID)) {
          body.removeChild(document.getElementById(DIV_ID));
        }

        this.input = input;
        this.el = document.createElement('div');

        let self = this;
//        let zIndex = 0;
        let width = options && options.width || '100%';
        let height = options && options.height || '100%';
        // let fontSize = options && options.fontSize || '0.15rem';
        let backgroundColor = options && options.backgroundColor || '#fff';
        let TABLE_ID = options && options.table_id || 'keyTable';
        let mobile = typeof orientation !== 'undefined';

        this.el.id = DIV_ID;
//        this.el.style.position = 'absolute';
//        this.el.style.left = 0;
//        this.el.style.right = 0;
//        this.el.style.bottom = 0;
//        this.el.style.zIndex = zIndex;
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

        // Button
        let btnStr = '<div style="position:relative;">' +
          '<div id="passTitle" class="passTitle SourceHanSansCN-Regular">' + this.customerInfo.title + '</div>';
        btnStr += '<div style="margin-top: 0.01rem"><div><div class="absolute width_100">';
        btnStr += '<ul style="margin-top: 0.01rem" class="width_321 marginAuto textAlign lineHeight_0535" id="keyPsw">';
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
        if (this.customerInfo.buttonShow === 'forgetPassword') {
//          btnStr += '<li class="fotgetPassword"><span>忘记密码</span><span class="icon-reminder"></span></li>';
        } else if (this.customerInfo.buttonShow === 'temporarilyNotSet') {
          btnStr += '<li class="temporarilyNotSet"><span>暂不修改</span></li>';
        } else if (this.customerInfo.buttonShow === 'backeTradeNewPsw') {
          btnStr += '<li class="backeTradeNewPsw"><span>' + this.errorMessage + '</span></li><li class="temporarilyNotSet"><span>暂不修改</span></li>';
        } else if (this.customerInfo.buttonShow === 'btn-container') {
          btnStr += '<div class="btn-container"><div class="btn-success">下一步</div></div>';
        }
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
          tableStr += '<div class="bottomBox"></div>';
        }
        if (this.lengths === 6) {
          this.el.innerHTML = cssStr;
        } else if (this.lengths === 0) {
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
            body.removeChild(self.el);
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
            alert('忘记密码');
          }
          if (clickEl.tagName.toLocaleLowerCase() === 'span' && value === "暂不修改") {
            self.$confirm('', '放弃修改交易密码？', function () {
              self.$router.push({
                name: 'passwordSet'
              });
            });
          }
        }

        if (mobile) {
          this.el.ontouchstart = addEvent;
        } else {
          this.el.onclick = addEvent;
        }
        body.appendChild(this.el);
      },
      completeButton () {

      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .paymentPasswordAll
    background-color: transparent
    height: 100%
    width: 100%
    position: relative
    .keyStyle
      position: absolute
      left: 0
      bottom: 0
      tr
        td
          font-family Roboto-Regular
        td:first-child
          border-left: 0 !important
        td.clearBtn
          background: #D2D7E0
          img
            width: 0.2rem
            height: 0.15rem
        td.clearBtn:first-child
          position: relative
          z-index: -10

    .fotgetPassword
      padding: 0.1rem 0.2rem
      span
        float: right
        font-size: 0.14rem
        color: #6098DE
        margin-bottom: 0.175rem
      span.icon-reminder
        float: right
        margin-right: 0.06rem
    .passWordBasketBox
      margin-bottom: 0.49rem
    .temporarilyNotSet
      text-align: center
      span
        font-size: 0.14rem
        color: #6098DE
    .backeTradeNewPsw
      margin-bottom: 0.1rem
      text-align: center
      span
        font-size: 0.14rem
        color: #F56361
    .btn-container
      margin-top: 0.5rem
      color: white
      font-size: 0.16rem

  .cipherKeyboardAll
    .passWordBasketBox
      margin: auto
      width: 3.21rem
      height: 0.535rem
      border-top-bottom-1px(1px, #D8DCE2)

    .passWordBasket
      width: 0.535rem
      border-right-1px(1px,  #D8DCE2)
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasketChoice
      width: 0.535rem
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasket:first-child
      border-left-right-1px(1px,  #D8DCE2)
      width: 0.535rem

  .errorStyleAll
    .passTitle
      color: #F56361
    .passWordBasketBox
      margin: auto
      width: 3.21rem
      height: 0.535rem
      border-top-bottom-1px(1px, #F56361)

    .passWordBasket
      width: 0.535rem
      border-right-1px(1px,  #F56361)
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasketChoice
      width: 0.535rem
      height: 0.535rem
      float: left
      box-sizing: border-box

    .passWordBasket:first-child
      border-left-right-1px(1px,  #F56361)
      width: 0.535rem

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
    z-index: 200
    background: #fff

  .errorButton
    width: 100%
    position: absolute
    top: 1.06rem
    left: 0
    z-index: 1
    background: #fff

  .bottomBox
    width: 100%
    height: 0.34rem
    background: #d2d7e0
    position: fixed
    bottom:0
    left: 0
</style>
