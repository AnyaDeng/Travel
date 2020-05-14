<template>
  <div class="header">
    城市列表
    <router-link to="/">
      <div class="iconfont header-back">&#xe64e;</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible"
  .header
    /*position relative*/
    background $BGColor
    height .84rem
    line-height .84rem
    text-align center
    color #ffffff
    .header-back
      /*background red*/
      color #ffffff
      font-size .4rem
      text-align center
      width .64rem
      float left
</style>
