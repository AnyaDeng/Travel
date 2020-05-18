<template>
  <ul class="item-list">
    <li class="item"
        v-for="item of letters"
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlpahBar',
  data () {
    return {
      isStart: false,
      startY: 0,
      timer: null
    }
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  props: {
    cities: {
      type: Object
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('changeLetter', e.target.innerText)
    },
    handleTouchStart () {
      this.isStart = true
    },
    handleTouchMove (e) {
      // 函数节流
      if (this.isStart) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        // 16毫秒内如果重复做这个动作则不会执行
        this.timer = setTimeout(() => {
          let touchY = e.touches[0].clientY - 79
          let index = Math.floor((touchY - this.startY) / 22)
          this.$emit('changeLetter', this.letters[index])
        }, 16)
      }
    },
    handleTouchEnd () {
      this.isStart = false
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
  right .2rem
  top 1.54rem
  bottom 0
  width .4rem
  .item
    line-height .44rem
    text-align  center
    color $BGColor
</style>
