<template>
  <div class="search">
    <input type="text" class="search-input" placeholder="输入城市名称或拼音" />
  </div>
</template>

<script>
export default {
  name: 'CitySearch'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  .search
    height .72rem
    padding 0 .1rem
    background $BGColor
    .search-input
      box-sizing  border-box
      width 100%
      height .62rem
      line-height .62rem
      padding 0 .5rem
      color #666
      border-radius .06rem
      text-align center
</style>
