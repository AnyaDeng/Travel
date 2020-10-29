<template>
  <div class="contentFlex flex-center-left">
    <div class="privilege flex-center-center" :style="{background:(isNotEmpty(sloganColor)?sloganColor:'#D7A853')}">
      <p class="sloganText" :class="[labelClassName(), {'iosPaddingTop':isIOSDevice()}]">{{sloganText}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      sloganText: {
        type: String
      },
      sloganColor: {
        type: String
      }
    },
    mounted() {
    },
    methods: {
      //判断设备型号 -- 标签样式
      labelClassName() {
        let devideTypeConfig = {
          'OPPO': 'lableClassOppo'
        };
        let manufacturer = this.deviceInfo().deviceManufacturer;
        return devideTypeConfig[manufacturer];
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  div.privilege
    background: mainColor
    border-radius: 0.07rem
    margin-right: 0rem
    height: 0.14rem;
    .sloganText
      font-family: SourceHanSansCN-Normal;
      padding-left: 0.045rem;
      padding-right: 0.045rem;
      padding-top 0.02rem
      font-size: 0.1rem
      color: #fff
    .iosPaddingTop
      padding-top 0.01rem
</style>
