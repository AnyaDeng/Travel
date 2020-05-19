<template>
  <div>
    <div class="recommend-title">推荐列表</div>
    <ul>
      <router-link
        tag="li"
        class="item border-bottom"
        v-for="item of recommendList"
        :key="item.id"
        :to="'detail/' + item.id"
      >
        <img class="item-img" :src="item.imgUrl" alt="">
        <div class="info">
          <p class="info-title">{{item.title}}</p>
          <p class="info-desc">{{item.des}}</p>
          <button class="info-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommendList: {
      type: Array
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  .recommend-title
    margin-top .2rem
    line-height .8rem
    background-color #eee
    text-indent .2rem
  .item
    overflow hidden
    display flex
    height 1.9rem
    .item-img
      width 2.26rem
      height 1.48rem
      margin-top .2rem
      padding 0 .1rem
    .info
      overflow hidden
      flex 1
      padding .1rem
      min-width 0
      .info-title
        line-height .54rem
        font-size .32rem
        ellipsis()
      .info-desc
        line-height .44rem
        color #ccc
        ellipsis()
      .info-button
        line-height .44rem
        margin-top .16rem
        background #ff9300
        padding 0 .2rem
        border-radius .06rem
        color #ffffff
</style>
