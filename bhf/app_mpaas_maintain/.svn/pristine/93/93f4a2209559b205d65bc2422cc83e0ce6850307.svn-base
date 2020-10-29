<template>
  <div class="popupAccountScreen" transition="fade" v-show="popupScreenShow">
    <div class="mask-layer" @touchmove.prevent></div>
    <div class="popupCnt" @click="close()">
      <!--头部-->
      <div class="modal-header" @click.stop="">
        <span class="leftCnt" @click="handleEmitCtrl('allSupportBankList')"><p>查看支持银行</p></span>
        <span class="title">选择绑定银行卡</span>
        <span class="rightCnt icon-CloseBounced" @click="close()"></span>
      </div>
      <!--内容区域-->
      <div class="modal-body" @click.stop="">
        <div class="bank flex-center-leftRight">
          <p>推荐银行</p>
          <p class="lastChild">使用这些银行，交易更方便</p>
        </div>
        <div class="row">
          <ul class="list-group">
            <li v-for="item in recommendBankList" class="flex-center-left" @click="handleEmitCtrl('bankCard')">
              <span class="bankIcon " :class="'bankIcon' + item.bankCode"></span>
              <span class="detailBank">
              <div class="bankName">{{item.bankName}}</div>
              <div class="money"><span>单笔上限 <span
                class="limitMoney">{{item.max}}元</span>，单日上限<span>{{item.dayMax}}元</span></span></div>
            </span>
            </li>
          </ul>
        </div>
        <div class="row">
          <ul class="list-group">
            <li class="list-group-item bindBank" @click="handleEmitCtrl('bankCard')">
              <div class="flex-center-center">
                <span class="bankIcon bankIcon_others"></span>
                <span class="listItem">绑定其他银行卡</span>
              </div>
              <div class="flex-center-right">
                <span class="icon-advance"></span>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="ownBankList.length>0">
          <div class="bank bankCenter flex-center-leftRight">
            <p>已有银行卡</p>
          </div>
          <div class="row">
            <ul class="list-group">
              <li v-for="item in ownBankList" class="flex-center-leftRight"
                  @click="handleEmitCtrl('choiceBankCard', item)">
                <div class="flex-center-left">
                  <span class="bankIcon " :class="'bankIcon' + item.bankCode"></span>
                  <span class="detailBank">
                      <div class="bankName">{{item.bankName}}（{{ handleBankAccountNo(item.bankAccountNo) }}）</div>
                      <div class="money"><span>单笔上限 <span class="limitMoney">{{item.max}}元</span>，单日上限<span>{{item.dayMax}}元</span></span></div>
                    </span>
                </div>
                <span class="icon-choiceItem" v-if="handleChoiceItem(item)"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ["modalOptions", "recommendBankList", "ownBankList"],
    data() {
      return {
        hasChoiceCard: {},
        popupScreenShow: false
      };
    },
    methods: {
      handleEmitCtrl(emitKey, emitParams) {
        let params = this.notEmpty(emitParams, {});
        this.$emit(emitKey, params);
        this.close();
      },
      handleChoiceItem(item) {
        if (this.isNotEmpty(this.hasChoiceCard)) {
          let isSameCode = (item.bankCode === this.hasChoiceCard.bankCode);
          let isSameMobile = (item.bankMobile === this.hasChoiceCard.bankMobile);
          let isSameAccountNo = (item.bankAccountNo === this.hasChoiceCard.bankAccountNo);
          return (isSameCode && isSameAccountNo && isSameMobile);
        }
        return false;
      },
      close() {
        this.popupScreenShow = false;
      },
      handleBankAccountNo(bankAccountNo) {
        let bankNumber = this.notEmpty(bankAccountNo, "");
        return bankNumber.substring(bankNumber.length - 4);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl'
  .popupAccountScreen
    height: 100%
    width: 100%
    display: block
    .mask-layer
      height: 100%
      width: 100%
      position: fixed
      top: 0
      left: 0
      display: block
      opacity: 1
      z-index: 500
      background: rgba(0, 0, 0, 0.6)
    .popupCnt
      height: 100%
      width: 100%
      position: fixed
      top: 0
      left: 0
      display: block
      opacity: 1
      z-index: 505
      display: flex
      display: -webkit-flex
      flex-direction: column
      justify-content: flex-end
      -webkit-justify-content: flex-end
      align-items: flex-start
      -webkit-align-items: flex-start
      .modal-header
        list-border-bottom-1px(1px, #D2D7E0)
        width: 100%
        padding: 0 0.19rem
        display: flex
        display: -webkit-flex
        justify-content space-between
        -webkit-justify-content: space-between
        align-items: center
        -webkit-align-items: center
        background: #fff
        span
          width: 30%
          text-align: right
          font-size: 0.12rem
          p
            display: inline-block
            width: auto
            border-bottom: 1px solid #6098de
        span.title
          width: 40%
          color: #232323
          font-size: 0.16rem
          text-align: center
        span.leftCnt
          padding: 0.15rem 0
          text-align: left
          color: #6098DE
          font-size: 0.12rem
      .modal-body
        background: #F7F7F9
        max-height: 78%
        width: 100%
        overflow: auto
        .bank
          height 0.43rem
          padding: 0 0.19rem
          p
            font-size: 0.14rem
            color: #7D8497
          p.lastChild
            font-size: 0.12rem
        .bankCenter
          height 0.38rem
        ul
          background: #fff
          li
            padding 0 0.2rem
            align-items: center
            -webkit-align-items: center
            height 0.58rem
            list-border-bottom-1px(1px, #E6E6E6)
            &:last-child
              list-border-bottom-1px(0px, #E6E6E6)
            .bankIcon
              display inline-block
              width 0.27rem
              height 0.27rem
            .detailBank
              display inline-block
            .detailBank
              margin-left 0.1rem
              .bankName
                color #232323
                font-size 0.14rem
                margin-bottom 0.03rem
              .money
                font-size: 0.12rem;
                color: #7D8497;
                letter-spacing: 0;
            .icon-choiceItem
              display: inline-block
              width: 0.27rem
              height: 0.27rem
              bg-image ('../../../common/img/choiceBankCard') no-repeat !important
              background-size: contain
          li.list-group-item
            height: 0.64rem
            .listItem
              margin-left 0.12rem
              font-size: 0.14rem
              color: #232323
            .icon-bindBank
              &:before
                font-size 0.28rem
            .icon-advance
              &:before
                color #7d8497


</style>

