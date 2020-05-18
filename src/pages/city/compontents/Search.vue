<template>
  <div>
    <div class="search">
      <input v-model="keyword" type="text" class="search-input" placeholder="输入城市名称或拼音" />
    </div>
    <div
      class="search-content"
      ref="warpper"
      v-show="keyword"
    >
      <ul>
        <li
          class="item-list border-bottom"
          v-for="item of list"
          :key="item.id">
          {{item.name}}
        </li>
        <li class="item-list border-bottom" v-if="hasNoData">
          没有找到相应的数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CitySearch',
  props: {
    cities: {
      type: Object
    }
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.warpper)
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const reslut = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              reslut.push(value)
            }
          })
        }
        this.list = reslut
      }, 100)
    }
  }
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
  .search-content
    z-index 1 // 把这个层提到了最上面
    overflow hidden
    position absolute
    left 0
    right 0
    bottom 0
    top 1.54rem
    background #eee
    .item-list
      line-height .64rem
      padding-left .2rem
      background white
</style>
