<template>
  <div class="container-fluid keyboard">
    <ul>
      <li class=" top-up-amount">
        <span class="category">金额</span>
        <span>
            <input @focus="showKeyboard('amount', 'amount')" class="form-control" type="text" v-model="amount"
                   placeholder="输入充值金额" readonly>
          </span>
        <span>元</span>
      </li>
      <li class=" top-up-amount">
        <span class="category">身份证号</span>
        <span>
            <input class="form-control" type="text" @focus="showKeyboard('idNum', 'idNumber')" v-model="idNumber"
                   placeholder="输入身份证" readonly>
          </span>
        <span></span>
      </li>
      <li class=" top-up-amount">
        <span class="category">输入框1</span>
        <span>
            <v-input class="form-control" @click.native="showKeyboard('amount', 'iptAmount')" v-model="iptAmount"
                     ref="iptAmount"
                     :placeholder="'输入充值金额'"></v-input>
        </span>
        <span>元</span>
      </li>
      <li class=" top-up-amount">
        <span class="category">输入框2</span>
        <span>
            <v-input class="form-control" @click.native="showKeyboard('idNum', 'iptId')" v-model="iptId" ref="iptId"
                     :placeholder="'输入身份证'"></v-input>
        </span>
        <span></span>
      </li>
    </ul>
    <div class="a">
      <v-cipherKeyboard ref="newCipherKeyboard" @keyBoardEvent="dealVal"></v-cipherKeyboard>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import cipherKeyboard from './NewCipherKeyboard'; // 带密码框键盘
  import vInput from 'components/common/inputModule/inputModule'; // 带密码框键盘
  export default {
    components: {
      'v-cipherKeyboard': cipherKeyboard,
      'v-input': vInput
    },
    data() {
      return {
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '充值',
          headerRight: this.headerBtn.service
        },
        amount: '',
        idNumber: '',
        iptAmount: '',
        iptId: ''
      }
    },
    mounted() {
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.backArrow) {
          // 路由回退back(-1)
          this.routerBack();
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  ul
    padding-top 0.1rem
    .bank
      height 0.53rem
      margin-bottom 0.1rem
      padding-left 0.19rem
      background-color #ffff
      span.bankIcon
        display: inline-block
        width: 0.3rem
        height: 0.3rem
        margin: 0
      .icon-CCB
        &:before
          content: "\e906";
          color: #6098DE;
          font-size: 0.35rem;
      .detail
        margin-left 0.12rem
        .bankName
          font-family: SourceHanSansCN-Regular;
          font-size: 0.14rem;
          color: #232323;
          letter-spacing: 0;
        .bankType
          margin-top 0.05rem
          margin-bottom: 0.01rem
          font-family: SourceHanSansCN-Regular;
          font-size: 0.12rem
          color: #7D8497;
          letter-spacing: 0;
          .money
            color #FF6C00
            font-family: Roboto-Regular;
            font-size: 0.12rem;
            letter-spacing: 0;
    .top-up-amount
      height 0.45rem
      line-height 0.45rem
      padding 0 0.19rem
      background-color #ffffff
      .category
        color #232323
        font-size 0.14rem
        display inline-block
        width 0.6rem
        padding-right 0.225rem
        font-family: SourceHanSansCN-Regular;
      .form-control
        width: 65%
</style>
