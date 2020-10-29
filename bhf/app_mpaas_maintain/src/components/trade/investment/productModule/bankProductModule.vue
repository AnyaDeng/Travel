<template>
  <div class="list-group">
    <ul>
      <div class="listFilterModule">
        <div class="moduleIntroduce" v-if="isNotEmpty(currentView.moduleDesc)">{{currentView.moduleDesc}}</div>
        <div v-if="isShowFilterModule">
          <div class="checker-box" ref="checkerBox" @touchmove.stop>
            <div
              class="checker-default"
              :class="checkerActive === index ? 'checker-selected' : ''"
              v-for="(item, index) in checkerItems"
              :key="index"
              @click="selectItem(item, index)"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="sort-box">
            <div class="sort-container flex-center-left" v-for="(item, index) in sortItems" @click="toggleSort(item, index)">
              <span class="sort-title">{{item.sortName}}</span>
              <div class="sort-icon">
                <span class="ascending" :class="{'sortActive_ASC': sortActive === index && sortType === 'ASC'}"></span>
                <span class="descending" :class="{'sortActive_DESC': sortActive === index && sortType === 'DESC'}"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isNotEmpty(bankModuleShowList)">
        <custom-li class="list-group-item" :class="{'theGrey': product.isSubscribeAvailableLimit !== '1'}" v-for="(product,index) in bankModuleShowList" :key="index"
                   @touch-delay="clickProductModule(product)">
          <div class="produceBox" slot="structure">
            <div class="productCnt-left">
              <div class="number-font">
                <span>{{rateSum(product.expectRate, product.extraRate, product.saleRate) | rateFormat}}</span>%
              </div>
              <div>{{product.tag1}}</div>
            </div>
            <div class="productCnt-right ">
              <div class="cntTxt ">
                <div class="fundInner">{{product.productName}}</div>
                <div class="productDetails">
                  <div v-if="product.tag2 !== null" v-html="product.tag2"></div>
                  <div v-if="product.tag3 !== null" v-html="product.tag3"></div>
                  <div v-if="product.slogan1 != null">
                    <productSlogan :sloganText=product.slogan1></productSlogan>
                  </div>
                </div>
              </div>
              <div class="img-soldOut" v-if="product.isSubscribeAvailableLimit !== '1'"></div>
            </div>
          </div>
        </custom-li>
      </div>
      <div class="noProduct" v-else>
        <div class="img-noProduct"></div>
        <div class="warn-noProduct"><span>暂无在售产品</span></div>
      </div>
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
      return {
        bankModuleShowList: [],
        bankFilterShowList: [],

        checkerActive: 0,
        checkerItems: [],
        isShowFilterModule: false,
        sortActive: 0,   // 切换排序样式标识
        sortType: '',  // 排序类型（'ASC'升序、'DESC'降序、''默认）
        sortItems: [
          {
            sortName: '收益率',
            sortKey: 'totalRate'
          },
          {
            sortName: '期限',
            sortKey: 'sortDay'
          }
        ]
      };
    },
    props: {
      sortDayCheckerItems: {
        type: Array
      },
      currentView: {
        type: Object
      }
    },
    watch: {
      sortDayCheckerItems: {
        handler(val) {
          this.$nextTick(() => {
            this.checkerItems = val;
          })
        },
        immediate: true,
        deep: true
      },
      currentView: {
        handler(val) {
          this.isShowFilterModule = false; // 此参数用于实时渲染过滤器组件(强制重新渲染)
          this.$nextTick(() => {
            this.isShowFilterModule = true;
            if (this.isNotEmpty(this.checkerItems)) {
              this.checkerActive = 0;
              this.filterProductList(this.checkerItems[0]);
            } else {
              this.bankFilterShowList = this.currentView['productList'];
              this.bankModuleShowList = this.currentView['productList'];
            }
          })
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      clickProductModule(product) {
        try {
          this.analysys.ma_btnClick("点击银行存款产品-" + product.productName)
        } catch (e) {
        }
        this.$emit('listenToChildEvent', product.productId);
      },
      // 点击期限过滤器
      selectItem(item, index) {
        try {
          this.analysys.ma_btnClick("点击期限过滤器-" + item.label);
        } catch (e) {
        }
        this.checkerActive = index;
        this.filterProductList(item);
      },
      // 过滤相关期限产品列表
      filterProductList(checkerItem) {
        this.sortActive = 0;
        this.sortType = '';
        if (this.isNotEmpty(checkerItem['value'])) {
          const sortDayMin = checkerItem['value'].split('-')[0];
          const sortDayMax = checkerItem['value'].split('-')[1];
          this.bankFilterShowList = this.currentView['productList'].filter(val => val['sortDay'] >= sortDayMin && val['sortDay'] <= sortDayMax);
        } else { // 全部
          this.bankFilterShowList = this.currentView['productList'];
        }
        this.bankModuleShowList = this.bankFilterShowList;
      },
      // 点击切换排序按钮
      toggleSort(sortItem, index) {
        try {
          this.analysys.ma_btnClick("点击排序按钮-" + sortItem.sortName);
        } catch (e) {
        }
        if (this.sortActive !== index) {
          this.sortActive = index;
          this.sortType = '';
        }
        if (sortItem['sortKey'] === 'totalRate') { // 点击“收益率”排序，按排序从高到低排序，再点击为倒序、再次点击恢复默认；
          if (this.sortType === '') {
            this.sortType = 'DESC'; // 降序 由大到小
          } else if (this.sortType === 'DESC') {
            this.sortType = 'ASC';  // 升序 由小到大
          }  else if (this.sortType === 'ASC') {
            this.sortType = '';  // 默认排序
          }
        } else if (sortItem['sortKey'] === 'sortDay') { // 点击“期限”排序，按该分类下的定义产品的日期的从短到长进行排序，再次点击按从长倒短排序，再次点击恢复默认；
          if (this.sortType === '') {
            this.sortType = 'ASC'; // 升序 由小到大
          } else if (this.sortType === 'ASC') {
            this.sortType = 'DESC';  // 降序 由大到小
          }  else if (this.sortType === 'DESC') {
            this.sortType = '';  // 默认排序
          }
        }
        this.sortProductList(sortItem['sortKey'], this.sortType);
      },
      // 产品列表排序
      sortProductList(sortKey, sortType) {
        let [...sortDefaultList] = this.bankFilterShowList;
        if (this.isNotEmpty(sortType)) {
          if (sortKey === 'totalRate') { // 点击“收益率”排序，按排序从高到低排序，再点击为倒序、再次点击恢复默认；
            if (sortType === 'ASC') { // 升序
              this.bankModuleShowList = sortDefaultList.sort(this.sortByFields(['-isSubscribeAvailableLimit', 'totalRate', 'sortDay']));
            } else { // sortType为'DESC'或其他 降序
              this.bankModuleShowList = sortDefaultList.sort(this.sortByFields(['-isSubscribeAvailableLimit', '-totalRate', 'sortDay']));
            }
          } else if (sortKey === 'sortDay') { // 点击“期限”排序，按该分类下的定义产品的日期的从短到长进行排序，再次点击按从长倒短排序，再次点击恢复默认；
            if (sortType === 'ASC') { // 升序
              this.bankModuleShowList = sortDefaultList.sort(this.sortByFields(['-isSubscribeAvailableLimit', 'sortDay', '-totalRate']));
            } else { // sortType为'DESC'或其他 降序
              this.bankModuleShowList = sortDefaultList.sort(this.sortByFields(['-isSubscribeAvailableLimit', '-sortDay', '-totalRate']));
            }
          }
        } else {
          this.bankModuleShowList = this.bankFilterShowList;
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';
  .listFilterModule
    .checker-box
      padding: 0.1rem 0.2rem 0.1rem
      white-space: nowrap
      overflow: auto
      &::-webkit-scrollbar //隐藏滚动条
        display: none
      .checker-default
        display: inline-block
        margin: 0 0.08rem 0 0
        padding: 0.05rem 0.08rem
        min-width: 0.38rem
        text-align: center
        border-radius: 0.11rem
        border: 1px solid #7D8497
        font-size: 0.12rem
        color: #7D8497
        &:last-child
          margin: 0

      .checker-selected
        border: 1px solid #D5A764
        font-size: 0.12rem
        color: #D5A764
        background: rgba(216, 173, 107, 0.10)
    .sort-box
      width 100%
      background #ffffff
      padding: 0 0.2rem
      display flex

      .sort-container
        height: 0.25rem
        margin-right: 0.3rem

        .sort-title
          font-family: SourceHanSansCN-Regular
          font-size: 0.15rem
          color #182136

        .sort-icon
          margin-left: 0.05rem
          .ascending
            display block
            width: 0;
            height: 0;
            border-width: 0.04rem
            border-style: solid
            border-color: transparent transparent #AAB1C4 transparent
            margin-bottom 0.03rem

          .descending
            display block
            width: 0;
            height: 0;
            border-width: 0.04rem
            border-style: solid
            border-color: #AAB1C4 transparent transparent transparent

          .sortActive_ASC
            border-color: transparent transparent #CC924F transparent

          .sortActive_DESC
            border-color: #CC924F transparent transparent transparent
</style>
