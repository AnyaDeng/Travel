<template>
  <div class="list-group">
    <ul>
      <custom-li class="list-group-item" v-for="(item,index) in productList" :key="index"
                 @touch-delay="clickProduct(item)">
        <div class="produceBox" slot="structure">
          <div class="productCnt-left">
            <div class="number-font " v-if="isNotEmpty(item.actualRate)">
              <span>{{Number(item.actualRate) | rateFormat}}</span>%
            </div>
            <div class="number-font" v-else>
              <span>--</span>
            </div>
            <div>预期年化收益率</div>
          </div>
          <div class="productCnt-right ">
            <div class="cntTxt ">
              <div class="fundInner">{{item.productName}}</div>
              <div class="productDetails">
                <div>转让本金 <span class="number-font">{{item.transferVolume | currency('', '2')}}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </custom-li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    props: {
      productList: {
        type: Array
      }
    },
    methods: {
      clickProduct(product) {
        this.$emit('listenToChildEvent', product);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
