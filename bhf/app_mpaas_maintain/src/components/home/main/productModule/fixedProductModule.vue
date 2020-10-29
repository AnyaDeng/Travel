<template>
  <div class="list-group">
    <ul>
      <div class="listFilterModule" v-if="isNotEmpty(moduleDesc)">
        <div class="moduleIntroduce">{{moduleDesc}}</div>
      </div>
      <custom-li class="list-group-item" v-for="(product, index) in productList" :key="index"
                 :class="{'theGrey': product.saleStatus === '3'}"
                 @touch-delay="clickProduct(product)">
        <div class="produceBox" slot="structure">
          <div class="productCnt-left">
            <div>
              <span>{{rateSum(product.expectRate, product.saleRate) | rateFormat}}</span>%
            </div>
            <div>预期年化收益率</div>
          </div>
          <div class="productCnt-right">
            <div class="cntTxt">
              <div class="onSaleTime" v-if="product.saleStatus === '1'">
                <productSlogan :sloganText=product.startRaiseTimeDisplay
                               :sloganColor=product.startRaiseTimeColor></productSlogan>
              </div>
              <div class="productName">{{product.productName}}</div>
              <div class="productDetails">
                <div><span>{{product.duration}}天</span>期限</div>
                <div><span>{{product.singleSubscribeMin | amountFormat}}</span>起投</div>
                <div v-if="product.slogan1 !== null">
                  <productSlogan :sloganText=product.slogan1></productSlogan>
                </div>
                <div
                  v-if="product.slogan2 !== null && (product.duration <= 99 || product.singleSubscribeMin <= 999999)">
                  <productSlogan :sloganText=product.slogan2></productSlogan>
                </div>
                <div class="donateImg" v-if="product.saleType === 'C' && product.saleStatus !== '3'"></div>
              </div>
            </div>
            <div class="img-fullScale" v-if="product.saleStatus === '3'"></div>
          </div>
        </div>
      </custom-li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import productSlogan from 'components/common/productSlogan/productSlogan';
  export default {
    components: {
      'productSlogan': productSlogan
    },
    data() {
      return {};
    },
    props: {
      productList: {
        type: Array
      },
      moduleDesc: {
        type: String
      }
    },
    watch: {
      moduleDesc: {
        handler(val) {
          this.moduleDesc = val;
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      clickProduct(product) {
        try {
          this.analysys.ma_btnClick("点击固收产品-" + product.productName);
        } catch (e) {
        }
        this.$emit('listenToChildEvent', product);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
