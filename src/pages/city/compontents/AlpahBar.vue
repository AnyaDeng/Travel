<template>
  <ul class="item-list">
    <li class="item" v-for="(item,key) of cities" :key="key">
      {{key}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlpahBar',
  props: {
    cities: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible"
.item-list
  display flex
  flex-direction column
  justify-content center
  position absolute
  right 0
  top 1.54rem
  bottom 0
  width .4rem
  .item
    line-height .44rem
    text-align  center
    color $BGColor
</style>
