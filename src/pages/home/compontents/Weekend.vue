<template>
  <ul>
    <li>
      <div class="title">
        周末旅游
      </div>
      <div class="item-img-test">
        <img class="item-img" src="http://imgs.qunarzz.com/wugc/p147/201205/30/249ffb73fa960f4193835fbb.jpg_710x360_6c75e1ac.jpg" alt="">
      </div>
      <div class="item-info">
        <p class="item-title">想去哪儿 就去哪儿</p>
        <p class="item-des">黔灵山公园</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HomeWeekend'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  .title
    text-indent .2rem
    line-height .8rem
    background #eee
  .item-img-test
    overflow hidden
    width 100%
    height 0
    padding-bottom 50%
    .item-img
      width 100%
  .item-info
    padding .1rem
    min-width 0
    flex 1
    .item-title
      line-height .54rem
      font-size .32rem
      ellipsis()
    .item-des
      line-height .44rem
      color #ccc
      ellipsis()
</style>
