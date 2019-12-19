<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe6a8;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe613;</span>
      输入城市/景点/游玩主题
    </div>
    <div class="header-right">
      城市
      <span class="iconfont">&#xe638;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>
<!--scoped 只对当前的组件有效 使用stylus样式 -->
<style lang="stylus" scoped>
  @import '../../../assets/style/varibles.styl'
  .header
    display flex
    line-height .86rem
    background $bgColor
    .header-left
      width .64rem
      float left
        .back-icon
          font-size 2.4rem
          text-align center
    .header-input
      flex 1
      margin-top .12rem
      margin-left .2rem
      background #eaeaea
      color #cacaca
      height .64rem
      line-height .64rem
      padding-left .4rem
    .header-right
      width 1.24rem
      float right
      color #eaeaea
      text-align center
</style>
