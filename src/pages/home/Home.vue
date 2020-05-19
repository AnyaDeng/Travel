<template>
  <div>
    <home-header></home-header>
    <home-swiper :swiperList="homeSwiperList"></home-swiper>
    <home-icons :iconList="homeIconList"></home-icons>
    <home-recommend :recommendList="homeRecommendList" ></home-recommend>
    <home-weekend :weekendList="homeWeekendList"></home-weekend>
  </div>
</template>
<script>
import HomeHeader from './compontents/Header'
import HomeSwiper from './compontents/Swiper'
import HomeIcons from './compontents/Icons'
import HomeRecommend from './compontents/Recommend'
import HomeWeekend from './compontents/Weekend'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      homeSwiperList: [],
      homeIconList: [],
      homeRecommendList: [],
      homeWeekendList: []
    }
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  methods: {
    getHomeInfo: function () {
      axios.get('/api/index.json')
        .then(this.getHomeInfoSuccess)
    },
    getHomeInfoSuccess (res) {
      let data = res.data
      if (data && data.body) {
        let body = data.body
        this.homeSwiperList = body.swiperList
        this.homeIconList = body.iconList
        this.homeRecommendList = body.recommendList
        this.homeWeekendList = body.weekendList
        console.log(this.homeIconList)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}

</script>

<style>

</style>
