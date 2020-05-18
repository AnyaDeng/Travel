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
      isStart: false
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
  methods: {
    handleLetterClick (e) {
      this.$emit('changeLetter', e.target.innerText)
    },
    handleTouchStart () {
      this.isStart = true
    },
    handleTouchMove (e) {
      if (this.isStart) {
        let startY = this.$refs['A'][0].offsetTop
        let touchY = e.touches[0].clientY - 79
        let index = Math.floor((touchY - startY) / 22)
        this.$emit('changeLetter', this.letters[index])
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
  right 0
  top 1.54rem
  bottom 0
  width .4rem
  .item
    line-height .44rem
    text-align  center
    color $BGColor
</style>
