<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont icon-back">&#xe64e;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe624;</span>
      输入城市景点
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{this.$store.state.city}}
        <span class="iconfont icon-arrow">&#xe6b0;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  .header
    display flex
    line-height .86rem
    background-color $BGColor
    color #ffffff
    .header-left
      width .64rem
      float left
      .icon-back
        text-align center
        font-size .4rem
    .header-input
      flex 1
      background-color white
      color #ccc
      text-align center
      border-radius .1rem
      margin-top .12rem
      height .64rem /* 用来设置元素的高度 line-height 用来设置行高*/
      line-height .64rem
    .header-right
      width 1.24rem
      float right
      text-align center
      color #ffffff
      .icon-arrow
        font-size .24rem
        margin-left -.04rem
</style>
