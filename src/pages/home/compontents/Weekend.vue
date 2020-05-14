<template>
  <ul>
    <div class="title">
      周末旅游
    </div>
    <li v-for="item of weekendList" :key="item.id">
      <div class="item-img-test">
        <img class="item-img" :src="item.imageUrl" alt="">
      </div>
      <div class="item-info">
        <p class="item-title">{{item.title}}</p>
        <p class="item-des">{{item.des}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    weekendList: {
      type: Array
    }
  }
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
