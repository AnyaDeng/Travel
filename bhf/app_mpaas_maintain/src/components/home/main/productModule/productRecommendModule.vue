<template>
  <div class="product-recommend">
    <div class="list-header">
      <div class="list-header-title">
        <span>产品推荐</span>
      </div>
      <div class="list-header-link" @click="jumpH5RecommendList">
        <span>更多</span>
      </div>
    </div>
    <div class="list-group">
      <ul>
        <li class="list-group-item" v-for="(product,index) in productList" :key="index" @click="clickProductModule(product)">
          <div class="productBox" slot="structure">
            <div class="fundInner">{{product.productName}}</div>
            <div class="number-font">
              <span>{{rateSum(product.expectRate, product.extraRate, product.saleRate) | rateFormat}}</span>%
            </div>
            <div v-if="product.productType === accountAssetType().REGULAR_TERM">预期年化收益率</div>
            <div v-else>综合年化收益率</div>
            <div class="lableBox flex-center-left">
              <div class="privilege flex-center-center" v-if="product.slogan1 !== null">
                <p class="sloganText">{{product.slogan1}}</p>
              </div>
              <div class="privilege flex-center-center" v-if="product.slogan2 !== null">
                <p class="sloganText">{{product.slogan2}}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

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
    watch: {},
    methods: {
      jumpH5RecommendList() {
        this.analysys.ma_btnClick("产品推荐点击更多");
        let params = {
          'action': 'bank_productRecommend'
        };
        this.showAppH5(params);
      },
      clickProductModule(item) {
        try {
          this.analysys.ma_btnClick("产品推荐点击" + item.productName);
        } catch (e) {
        }
        this.$emit('listenToChildEvent', item);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';
  .product-recommend
    width: 100%
    padding-top: 0
    .list-header
      padding: 0.2rem 0.2rem 0.15rem
      .list-header-link
        span
          color: #aab1c4
          font-size: 0.12rem
          font-family: SourceHanSansCN-Normal
    .list-group
      ul
        display: flex
        display: -webkit-flex
        justify-content: center
        -webkit-justify-content: center
        align-items: flex-start
        -webkit-align-items: flex-start

        .list-group-item
          width: 50%
          padding: 0 0.1rem 0 0.2rem
          margin-bottom: 0.08rem
          list-border-bottom-1px(0, #e6e6e6)
          position: relative
          &:after
            content: ''
            width: 200%
            height: 200%
            position: absolute
            top: 0
            left: 0
            border-right: 0.01rem solid #e6e6e6
            transform: scale(0.5, 0.5)
            -webkit-transform-origin: top left

          .productBox
            display: flex
            display: -webkit-flex
            flex-direction: column
            justify-content: flex-start
            align-items: flex-start
            -webkit-align-items: flex-start
            font-family: SourceHanSansCN-Normal
            color: #7D8497
            font-size: 0.12rem

            .fundInner
              font-family: SourceHanSansCN-Regular
              color: #151F36
              font-size: 0.15rem
              line-height: 0.225rem
              max-width: 1.5rem
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden

            .number-font
              margin-top: 0.04rem
              font-family: Roboto-Regular
              color: #CC924F
              font-size: 0.2rem

              span
                font-size: 0.25rem
                line-height: 0.305rem
                font-weight: bold

            .lableBox
              margin-top: 0.06rem
              .privilege
                /*height: 0.165rem*/
                padding: 0 0.035rem
                border: 0.01rem solid #DCA361
                border-radius: 0.02rem
                margin-right: 0.05rem

                .sloganText
                  padding: 0.035rem 0 0.02rem
                  max-width: 0.72rem
                  font-family: SourceHanSansCN-Normal
                  color: #DCA361
                  font-size: 0.1rem
                  /*text-overflow: ellipsis*/
                  white-space: nowrap
                  overflow: hidden
        .list-group-item:last-child
          &:after
            border-right: 0rem solid #e6e6e6
</style>
