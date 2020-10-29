<template>
  <div>
    <div class="row product-list" v-for="(productCnt, index) in productModuleList" :key="index"
         v-show="isNotEmpty(productCnt.productSubModuleList_render)">
      <div class="list-header">
        <div class="list-header-title">
          <span>{{productCnt.name}}</span>
        </div>
        <div class="list-header-link" @click="jumpInvestmentFrontPage(productCnt)">
          <div class="header-link">
            <span>更多</span>
          </div>
        </div>
      </div>
      <div class="introduce">{{productCnt.moduleDesc}}</div>
      <div class="list-group container-productList">
        <ul class="showProduct" :style="{'height': isShowMore[productCnt.moduleId] ? productCnt.moduleAllHeight : productCnt.moduleInitHeight}">
          <custom-li class="list-group-item" :style="{height: `${heightBase}rem`}" v-for="(item, index) in productCnt.productSubModuleList_render" :key="index"
                     @touch-delay="clickProductModule(item)">
            <div class="custom-li-structure" slot="structure">
              <div class="productCnt">
                <div class="productContent-left">
                  <div class="number-font">
                      <span v-if="item.minRate !== 0 && item.minRate !== item.maxRate"><span class="rate">{{item.minRate | rateFormat}}</span>%<span
                        class="line">-</span></span><span class="rate">{{item.maxRate | rateFormat}}</span>%
                  </div>
                  <div>综合年化收益率</div>
                </div>
              </div>
              <div class="titleLable flex-center-left">
                <div class="title">{{item.name}}</div>
                <div class="lableBox flex-center-left">
                  <div class="privilege flex-center-center" v-if="item.slogan1 !== null">
                    <p class="sloganText">{{item.slogan1}}</p>
                  </div>
                  <div class="privilege flex-center-center" v-if="item.slogan2 !== null">
                    <p class="sloganText">{{item.slogan2}}</p>
                  </div>
                </div>
              </div>
            </div>
          </custom-li>
        </ul>
        <div class="listShowCtrl flex-center-center"
             v-if="isNotEmpty(productCnt.productSubModuleList_render) && productCnt.productSubModuleList_render.length > 2">
          <div class="flex-center-center" @click="isShowMore[productCnt.moduleId] = !isShowMore[productCnt.moduleId]">{{isShowMore[productCnt.moduleId] ? '收起' : '展开更多'}}<span
            :class="{'unfold': !isShowMore[productCnt.moduleId], 'packUp': isShowMore[productCnt.moduleId]}"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        moduleHeight: '1.81rem',
        isShowMore: {}
      };
    },
    props: {
      heightBase: {
        type: Number
      },
      productModuleList: {
        type: Array
      },
      productCnt: {
        type: Object
      }
    },
    watch: {
      productModuleList: {
        handler(val) {
          this.$nextTick(() => {
            this.productModuleList = val;
            // 循环设置模块"展开更多"参数
            this.productModuleList.forEach(vm => {
              this.$set(this.isShowMore, vm.moduleId, false);
            })
          })
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      clickProductModule(item) {
        this.$emit('listenToChildEvent', item);
      },
      jumpInvestmentFrontPage(productCnt) {
        try {
          this.analysys.ma_btnClick(`首页银行${productCnt.moduleId}模块的更多跳转到财富页`)
        } catch (e) {
        }
        this.$router.push({
          name: 'investmentFrontPage',
          params: {
            bankModuleTag: productCnt.moduleId
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';

  .container-productList
    ul
      .list-group-item
        /*height: 0.905rem*/
        min-height: auto
        padding: 0.1rem 0.2rem

        .custom-li-structure
          display: flex
          display: -webkit-flex
          justify-content: flex-start
          -webkit-justify-content: flex-start
          align-items: flex-start
          -webkit-align-items: flex-start

          .productCnt
            min-width: 1.5rem

            .productContent-left
              div:first-child
                font-family: Roboto-Regular
                color: #CC924F
                font-size: 0.13rem
                margin-bottom: 0.09rem

                span
                  font-size: 0.13rem

                span.rate
                  font-size: 0.23rem
                  font-weight: bold

                span.line
                  font-size: 0.20rem

              div:last-child
                margin-top: 0.04rem
                font-family: SourceHanSansCN-Normal
                color: #7D8497
                font-size: 0.12rem

          .titleLable
            height: 100%
            display: flex
            display: -webkit-flex
            flex-direction: column
            justify-content: flex-start
            align-items: flex-start
            -webkit-align-items: flex-start

            .title
              font-family: SourceHanSansCN-Regular
              font-size: 0.15rem
              color: #182136
              margin: 0.05rem 0 0.08rem

            .lableBox
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
                  font-size: 0.11rem
                  /*text-overflow: ellipsis*/
                  white-space: nowrap
                  overflow: hidden

    .showProduct
      height: 0
      overflow: hidden
      -webkit-transition: height 0.4s ease-out
      -moz-transition: height 0.4s ease-out
      -o-transition: height 0.4s ease-out
      transition: height 0.4s ease-out

    .listShowCtrl
      list-border-top-1px(1px, #e6e6e6)
      font-family: SourceHanSansCN-Normal
      color: #7D8497
      font-size: 0.12rem
      text-align: center

      div
        width: 100%
        padding: 0.14rem

        span
          display block
          width: 0
          height: 0
          border-width: 0.04rem
          border-style: solid
          margin-left: 0.035rem

        .unfold
          border-color: #AAB1C4 transparent transparent transparent
          margin-top: 0.04rem

        .packUp
          border-color: transparent transparent #AAB1C4 transparent
          margin-bottom: 0.04rem
</style>
