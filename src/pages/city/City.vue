<template>
  <div>
    <city-header></city-header>
    <city-search></city-search>
    <city-list :cities="cities" :hot-cities="hotCities"></city-list>
    <city-alpahBar :cities="cities"></city-alpahBar>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './compontents/Header'
import CitySearch from './compontents/Search'
import CityList from './compontents/List'
import CityAlpahBar from './compontents/AlpahBar'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlpahBar
  },
  data () {
    return {
      cities: {},
      hotCities: []
    }
  },
  methods: {
    getCityInfo: function () {
      axios.get('/api/city.json').then(this.getCityInfoSucc)
    },
    getCityInfoSucc (res) {
      let responData = res.data.data
      if (responData) {
        this.cities = responData.cities
        this.hotCities = responData.hotCities
      }
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style scoped>

</style>
