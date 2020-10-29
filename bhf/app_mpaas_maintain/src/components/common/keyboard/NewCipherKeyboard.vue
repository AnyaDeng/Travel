<template>
  <div class="keyboard">
    <popup v-model="popupScreenShow" position="bottom" :hide-on-deactivated=true :show-mask="false" @touchmove.prevent>
      <div class="left">
        <table id="keyTable" border="0" cellspacing="0" cellpadding="0" class="keyStyle">
          <tbody class="keyBody">
          <tr v-if="flag === 'amount'" v-for="(keys, index) in baseArray()">
            <td title="keys" v-for="key in keys" @touchstart="handleNumberKey(key)">{{key}}</td>
            <td title="keys" v-if="index === 3" @touchstart="handleNumberKey('00')">00</td>
            <td title="keys" v-if="index === 3" @touchstart="handleNumberKey('.')">.</td>
          </tr>
          <tr v-if="flag === 'idNum'" v-for="(keys, index) in baseArray()">
            <td title="keys" v-if="index === 3" @touchstart="handleNumberKey('X')">X</td>
            <td title="keys" v-for="key in keys" @touchstart="handleNumberKey(key)">{{key}}</td>
            <td title="keys" v-if="index === 3" class="lastTd"  ></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="right">
        <div title="keys" class="key-cancel flex-center-center" @touchstart="handleDeleteKey">
          <div title="keys" class="cancel-icon"></div>
        </div>
        <div title="keys" class="key-confirm" @touchstart="close">完成</div>
      </div>

      <div class="bottomBoxPosition" v-show="isIphonex"></div>
    </popup>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Popup} from 'vux';

  export default {
    components: {
      Popup
    },
    props: {
      customerInfo: {
        type: Object
      }
    },
    data() {
      return {
        isIphonex: false,
        popupScreenShow: false, // 是否显示模态框
        keyAry: [],
        flag: 'amount',
        modalVal: ''
      };
    },
    mounted() {
      this.addObserve('outerCloseKeyboard', this.close);
    },
    methods: {
      randomSort() { // 打乱键盘顺序
        return Math.random() > 0.5 ? -1 : 1; // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      },
      baseArray() {
        // 打乱键盘顺序
        let ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        if (this.$store.getters.keyBoard_confuse_switch === '1') {
          ary.sort(this.randomSort); // sort()方法可以接受一个比较函数
        }
        // 转换为二维数组,渲染页面结构
        let len = ary.length;
        let n = 3; //每行显示3个
        let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
        let res = [];
        for (let i = 0; i < lineNum; i++) {
          // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
          let temp = ary.slice(i * n, i * n + n);
          res.push(temp);
        }
        return res;
      },
      open(flag, modal) {
        this.flag = flag;
        this.modalVal = modal;
        this.isIphonex = this.isIphoneX();
        this.popupScreenShow = true;
      },
      close() {
        this.popupScreenShow = false;
      },
      handleNumberKey(num) {
        let param = {};
        param.flag = this.flag;
        param.keyStatus = 'keys';
        param.keyVal = num;
        param.modalVal = this.modalVal;
        param.parentDom = this.$parent;
        this.$emit('keyBoardEvent', param);
      },
      handleDeleteKey() {
        let param = {};
        param.keyStatus = 'delete';
        param.modalVal = this.modalVal;
        param.parentDom = this.$parent;
        this.$emit('keyBoardEvent', param);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .keyboard
    width: 100%
    position: fixed
    left: 0
    bottom: 0
    transition: all .5s ease-in
    .vux-popup-dialog
      overflow-y: hidden
      background: #fff
    .keyStyle
      width: 100%
      margin 0 auto
      tr
        td:first-child
          border-left: 0 !important
        td
          width: 25%
          vertical-align: middle
          font-size: 0.18rem
          font-weight: bold
          font-family: Roboto-Regular
        td.clearBtn
          background: #D2D7E0
          img
            width: 0.2rem
            height: 0.15rem
        td:active
          background-color: #b7c5d3
          color: #FFF
        .lastTd:active
          background-color: #FFFFFF !important

    .keyBody
      position relative
    .key-confirm
      position absolute
      height 1rem
      text-align center
      line-height 1rem
      right 0
      bottom 0
      width 25%
      background-color #D7AB69
      z-index 2
      color #FFFFFF
    .key-cancel
      position absolute
      height 1rem
      right 0
      top 0
      width 25%
      z-index 2
      background-color #FFFFFF
      .cancel-icon
        bg-image('./img/cancel')
        width 0.2rem
        height 0.15rem

    .bottomBoxPosition
      width: 100%
      height: 0.34rem
      background: #d2d7e0

  .left
    width 75%
    border-right-1px(1px, #d2d7e0)

  .right
    width 25%


</style>
