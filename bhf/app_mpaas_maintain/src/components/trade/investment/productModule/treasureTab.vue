<template>
  <div class="treasureTab">
    <div>
      <span v-for="(tab,index) in pageTabs" :class="{pageActive:pageActive===index}" @click="onClick('treasureTab' + index, index)">{{tab.type}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageActive: 0,
        pageTabs: [{
          type: '银行精选'
        }, {
          type: '鸿运来尊享'
        }
        ]
      };
    },
    mounted() {
      this.addObserve("treasureTabIndex", (index) => {
        this.pageActive = this.notEmpty(index, 0);
      });
    },
    methods: {
      onClick(btnType, index) {
        this.$emit('tabClickListen', {'btnType': btnType});
        try {
          this.analysys.ma_btnClick("点击" + this.pageTabs[index].type);
        } catch (e) {
        }
        this.pageActive = index;
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';
  .treasureTab
    background: #ffffff
    div
      border-bottom-1px(1px, #E6E6E6)
      padding: 0.18rem 0 0
      margin: 0 0.2rem
      height: 0.51rem
      span
        font-family SourceHanSansCN-Medium
        font-size: 0.17rem
        color: #9DA4B6
        letter-spacing 0
        margin-right: 0.2rem
        padding: 0 0 0.13rem
        border-bottom: 0.02rem solid transparent
      span.pageActive
        color: #182136
        border-bottom: 0.02rem solid #182136

</style>
