<template>
  <div class="investmentFrontPage">
    <treasureTab @tabClickListen="pageTabClick"></treasureTab>
    <swiper class="swiper-container-treasure" id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-slide">
        <v-refresh :on-refresh="onRefresh" :pageConfig="pageConfig">
          <div class="product-content">
            <div class="width_100">
              <div class="product-list pageModuleTitle">
                <div class="list-header">
                  <div class="list-header-title">
                    <span>{{bankProductIntroduce.productModuleName}}</span>
                  </div>
                  <div class="list-header-link" @click="showBankIntroducePopup">
                    <span>一分钟看懂银行产品</span>
                    <span class="icon-advance"></span>
                  </div>
                </div>
                <div class="introduce" v-html="bankProductIntroduce.productIntroduce">
                  {{bankProductIntroduce.productIntroduce}}
                </div>
              </div>
              <div v-if="isNotEmpty(bankProductModuleList)">
                <!--银行产品页面顶部轮播图-->
                <div class='center-swiper-box flex-center-center' v-if="isNotEmpty(productDepositBannerList)">
                  <swiper class="center-swiper-box-inner" :options="topSwiperOption">
                    <swiper-slide style="height: 100%;width:100%;" v-for="item in productDepositBannerList" :key="item.img">
                      <img v-lazy="item.img" alt="" :onerror="defaultImg"
                           style="width: 100%;height:100%;background-size: contain" @click="jumpLink(item)">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination">
                    </div>
                  </swiper>
                </div>
                <div class="cntBox" v-if="isHasBankProducts">
                  <div class="row product-list">
                    <div class="tabBar ">
                      <div class="buttons-tab flex-f" @touchmove.stop>
                        <a class="tabBtn flex-f flex-x-vc SourceHanSansCN-Regular"
                           href="javascript:void(0);"
                           @click="toggle(index, true)"
                           v-for="(tab,index) in bankProductModuleList"
                           :class="{active:active===index}" v-if="isNotEmpty(tab.productList)">
                          {{tab.shortName}}
                        </a>
                      </div>
                      <div class="content-block">
                        <div class="tabs">
                          <bankProductModule :currentView="currentView" :sortDayCheckerItems="sortDayCheckerItems" @listenToChildEvent="openBankH5"></bankProductModule>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="noProduct" :class="{noProduct_top: !isNotEmpty(productDepositBannerList)}" v-else>
                  <div class="img-noProduct"></div>
                  <div class="warn-noProduct"><span>暂无在售产品</span></div>
                </div>
              </div>
              <div class="emptyModule" v-else>
                <div class="noProduct" v-if="bankShowType === bankShowTypes.queryFailed">
                  <div class="img-noProduct"></div>
                  <div class="warn-noProduct"><span>页面加载失败，请重试</span></div>
                  <div class="refreshBtn"><span @click="refreshBankList">刷新一下</span></div>
                </div>
                <div class="skeletonModule" v-else-if="bankShowType === bankShowTypes.showSkeleton">
                  <van-skeleton title :row="1" row-width="[100%]" />
                  <van-skeleton avatar-size="48" avatar avatar-shape="square" :row="2" />
                </div>
              </div>
            </div>
            <!--页面结束标签-->
            <v-pageEndTag></v-pageEndTag>
          </div>
        </v-refresh>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <v-refresh :on-refresh="onRefresh" :pageConfig="pageConfig">
          <div class="product-content">
            <div class="width_100">
              <div class="product-list pageModuleTitle">
                <div class="list-header">
                  <div class="list-header-title">
                    <span>{{hylProductIntroduce.productModuleName}}</span>
                  </div>
                </div>
                <div class="introduce" v-html="hylProductIntroduce.productIntroduce">
                  {{hylProductIntroduce.productIntroduce}}
                </div>
              </div>
              <!--固收产品页面顶部轮播图-->
              <div class='center-swiper-box flex-center-center' v-if="isNotEmpty(productRegularBannerList)">
                <swiper class="center-swiper-box-inner" :options="topSwiperOption">
                  <swiper-slide style="height: 100%;width:100%;" v-for="item in productRegularBannerList" :key="item.img">
                    <img v-lazy="item.img" alt="" :onerror="defaultImg"
                         style="width: 100%;height:100%;background-size: contain" @click="jumpLink(item)">
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination">
                  </div>
                </swiper>
              </div>
              <div class="cntBox width_100" v-if="isNotEmpty(fixedProductList) || isNotEmpty(fixedPeriodProductList) || isNotEmpty(transferProductList)">
                <div class="row product-list" v-if="isNotEmpty(fixedProductList) || isNotEmpty(fixedPeriodProductList)">
                  <div class="tabBar">
                    <div class="buttons-tab flex-f" @touchmove.stop>
                      <a class="tabBtn flex-f flex-x-vc SourceHanSansCN-Regular"
                         href="javascript:void(0);"
                         @click="fixedToggle(index, true)"
                         v-for="(tab,index) in fixedTabs"
                         :class="{active:fixedActive===index}" v-if="isNotEmpty(matchFixedTabInfo(tab.isPeriod).products)">
                        {{matchFixedTabInfo(tab.isPeriod).tabName}}
                      </a>
                    </div>
                    <div class="content-block">
                      <div class="tabs">
                        <fixedProductModule :productList="fixedCurrentView" :moduleDesc="fixedCurrentTabDesc" @listenToChildEvent="viewDetails"></fixedProductModule>
                      </div>
                    </div>
                  </div>
                </div>
                <!--转让专区-->
                <div class="row product-list" v-if="isNotEmpty(transferProductList)">
                  <div class="list-header">
                    <div class="list-header-title">
                      <span>鸿运来转让专区</span>
                    </div>
                    <div class="list-header-link" @click="jumpTransferProductList">
                      <span>更多</span>
                    </div>
                  </div>
                  <transferProductModule :productList="transferProductList" @listenToChildEvent="transferProductClick"></transferProductModule>
                </div>
              </div>
              <div class="noProduct" :class="{noProduct_top: !isNotEmpty(productRegularBannerList)}" v-else>
                <div class="img-noProduct"></div>
                <div class="warn-noProduct"><span>暂无在售产品</span></div>
              </div>
            </div>
            <!--页面结束标签-->
            <v-pageEndTag></v-pageEndTag>
          </div>
        </v-refresh>
      </swiper-slide>
    </swiper>
    <!--银行产品简介弹框-->
    <div class="bankIntroducePopup">
      <imgPopup ref="imgPopup"></imgPopup>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Skeleton } from 'vant';
  import imgPopup from 'components/common/popup/imgPopup.vue';
  import tabViewCtrl from "./productModule/tabViewCtrl.js";
  import bankProductModule from './productModule/bankProductModule.vue';
  import treasureTab from './productModule/treasureTab.vue';
  import fixedProductModule from 'components/home/main/productModule/fixedProductModule.vue';
  import transferProductModule from 'components/home/main/productModule/transferProductModule.vue';

  export default {
    mixins: [tabViewCtrl],
    components: {
      'van-skeleton': Skeleton,
      'imgPopup': imgPopup,
      'bankProductModule': bankProductModule,
      'treasureTab': treasureTab,
      'fixedProductModule': fixedProductModule,
      'transferProductModule': transferProductModule
    },
    data() {
      return {
        bankProductIntroduce: {
          "productModuleName": "银行精选介绍",
          "productIntroduce": "精选银行存款产品，由国金所合作银行直接提供，受中国银行保险监督管理委员会监管。根据国务院令第660号《存款保险条例》，同一家银行存款本息50万以内100%保障本息安全。"
        },
        hylProductIntroduce: {
          "productModuleName": "鸿运来尊享介绍",
          "productIntroduce": "100%历史兑付+银行资金监管，安全保障结合高收益，满足高净值客户的资产配置需求。"
        },
        pageConfig: {
          headerLeft: this.headerBtn.treasureTitle,
          headerTitle: '', // 财富
          headerRight: this.headerBtn.service,
          navigation: true,
          gradientBar: {
            color: this.headerColor.darkBlue4
          }
        },
        swiperOption: {
          notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          direction: 'horizontal', // 水平方向移动
          setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
          slidesPerView: 1, // 设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
          resistanceRatio: 0, // 抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
          observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
          on: {
            // 监听滑动切换事件，返回swiper对象
            slideChange: () => {
              this.$bus.emit('treasureTabIndex', this.swiper.activeIndex); // 同步切换页面tab
            }
          }
        },
        fixedProductList: [], // 固收产品列表--非分期
        fixedPeriodProductList: [], // 固收产品列表--分期
        transferProductList: [], //转让申请列表

        sortDayCheckerItems_main: [],
        sortDayCheckerItems: [],
        moduleSortDayItems: {},
        swiperProductModuleTag: this.$route.params.swiperProductModuleTag,
        bankModuleTag: this.$route.params.bankModuleTag,
        defaultImg: 'this.src="' + require('../../../../static/img/loading-login@3x.png') + '"',
        topSwiperOption: {
          preloadImages: true,
          updateOnImagesReady: true,
          notNextTick: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'swiper-container-bullet',
            bulletActiveClass: 'swiper-container-bullet-active'
          },
          observer: true
        },
        productRegularBannerList: [],
        productDepositBannerList: [],

        bankProductModuleList: [],
        bankProductList: [],
        bankDepositProductList: [],
        bankStructureProductList: [],
        isHasBankProducts: false,
        bankShowType: '1',
        bankShowTypes: {
          'queryFailed': '0',
          'showSkeleton': '1',
          'empty': '2'
        }
      };
    },
    created() {
      // 固收转让购买成功以后刷新列表
      this.$bus.on('refresh_transferList', this.queryTransferDeposit);
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    beforeRouteEnter(to, from, next) {
      let sourcePages = ['homePage', 'assets'];
      to.meta.isBack = (sourcePages.indexOf(from.name) === -1);
      next();
    },
    activated() {
      if (this.$route.meta.isBack === false) {
        this.swiperProductModuleTag = this.$route.params.swiperProductModuleTag;
        this.bankModuleTag = this.$route.params.bankModuleTag;
        this.initializeTabConfig();
        if (this.isUserRealName() === false) {
          // 未实名,引导去实名
          this.emitShowRealNameAlert();
        }
      }
      this.keepAliveTimeStamp(this.$route.name, () => {
        this.keepAliveFnc();
      });
      this.sendMsgToParent();
      this.$refs.imgPopup.show = false;
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    methods: {
      keepAliveFnc() {
        // 查询银行产品期限过滤项配置
        this.queryParamValueSortDay();
        // 财富页轮播图(银行产品)
        this.queryDepositBannerList();
        // 财富页轮播图(固收产品)
        this.queryRegularBannerList();
        // 查询产品介绍文案
        this.queryTreasurePageConfig();

        this.bankShowType = this.bankShowTypes.showSkeleton;
        // 查询银行产品模块及产品列表
        this.queryBankProducts();

        // 查询固收产品列表
        this.queryFixedIncomeProductList();
        // 查询转让申请列表
        this.queryTransferDeposit();
      },
      onRefresh(done) {
        this.keepAliveFnc();
        done();
      },
      pageTabClick(params) {
        if (params.btnType === 'treasureTab0') {
          this.swiper.slideTo(0, 400, false);
        } else if (params.btnType === 'treasureTab1') {
          this.swiper.slideTo(1, 400, false);
        }
      },
      // 初始话tab页签
      initializeTabConfig() {
        let swiperIndex = 0;
        if (this.swiperProductModuleTag === 'swiperHonourEnjoy') {
          swiperIndex = 1;
        }
        this.$bus.emit('treasureTabIndex', swiperIndex); // 同步切换页面tab
        this.swiper.slideTo(swiperIndex, 400, false);
        this.setCurrentView();
        this.setFixedCurrentView();
      },
      showBankIntroducePopup() {
        this.analysys.ma_btnClick("点击一分钟看懂银行产品");
        this.$refs.imgPopup.popupPath = `${this.$store.getters.h5Url}${this.fileRelativePath()}/img/bankProductFeature.png?t=${this.webhub_getStartTime()}`;
        this.$refs.imgPopup.show = true;
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      // 查询顶部银行产品banner列表
      queryDepositBannerList() {
        this.queryActivityList(this.contentIdType.PRODUCT_DEPOSIT_BANNER_A, (contentList) => {
          this.productDepositBannerList = [];
          this.productDepositBannerList = contentList;
        });
      },
      // 查询顶部固收产品banner列表
      queryRegularBannerList() {
        this.queryActivityList(this.contentIdType.PRODUCT_REGULAR_BANNER_A, (contentList) => {
          this.productRegularBannerList = [];
          this.productRegularBannerList = contentList;
        });
      },
      // banner图/活动icon跳转链接
      jumpLink(item) {
        if (!this.isNotEmpty(item.link)) return;
        this.analysys.ma_bannerClick(item);
        this.showBhfaeBrowser(this.urlJoinCommonParam(item.link))
      },
      // 查询固收产品列表--非分期
      queryFixedIncomeProductList() {
        this.queryRegularProductList({}, (productList) => {
          // 非分期
          this.fixedProductList = [];
          this.fixedProductList = productList.filter(product => product.payBackType === '00');

          this.fixedTabsInfo[0]['products'] = this.notEmpty(this.fixedProductList, []);
          const tabCnt = this.fixedTabs.find(tab => tab.isPeriod === '0');
          this.fixedTabsInfo[0]['tabName'] = this.notEmpty(tabCnt.tabName, '鸿运来-定享');
          this.fixedTabsInfo[0]['tabDesc'] = this.notEmpty(tabCnt.tabDesc, '');

          // 分期
          this.fixedPeriodProductList = [];
          this.fixedPeriodProductList = productList.filter(product => product.payBackType !== '00');

          this.fixedTabsInfo[1]['products'] = this.notEmpty(this.fixedPeriodProductList, []);
          const tabCntPeriod = this.fixedTabs.find(tab => tab.isPeriod === '1');
          this.fixedTabsInfo[1]['tabName'] = this.notEmpty(tabCntPeriod.tabName, '鸿运来-期享');
          this.fixedTabsInfo[1]['tabDesc'] = this.notEmpty(tabCntPeriod.tabDesc, '');

          this.setFixedCurrentView();
        });
      },

      // 查询转让申请列表
      queryTransferDeposit() {
        this.ajax(this.apiType().queryTransferApplyList, this.serviceType().query, {}, (responseData) => {
          if (this.isNotEmpty(responseData.body)) {
            this.transferProductList = responseData.body.filter((value, index) => index < 3);
          } else {
            this.transferProductList = [];
          }
        });
      },
      jumpTransferProductList() {
        this.mtj_event('app_i_transfer_List', '投资页点击跳转固收转让受让产品列表');
        this.analysys.ma_btnClick("转让专区点击更多");
        const params = {
          'action': 'regular_transfer_list'
        };
        this.showAppH5(params);
      },
      // 点击重新查询银行列表按钮
      refreshBankList() {
        this.analysys.ma_btnClick("点击刷新");
        this.bankShowType = this.bankShowTypes.showSkeleton;
        // 查询银行产品模块及产品列表
        this.queryBankProducts();
      },
      // 查询银行产品模块及产品列表
      queryBankProducts() {
        // 获取银行产品模块信息
        this.getProductModuleList((moduleList) => {
          if (this.isNotEmpty(moduleList)) {
            this.bankProductModuleList = this.notEmpty(moduleList, []);
            this.bankDepositProductLists();
            this.structureDepositProductList();
          }
          this.bankShowType = this.bankShowTypes.empty;
        }, () => { // 请求失败
          this.bankShowType = this.bankShowTypes.queryFailed;
        });
      },
      // 查询银行活期/定享/期享产品列表
      bankDepositProductLists() {
        const typeSmart = this.accountAssetType().OPEN_DEPOSIT;
        const typeBill = this.accountAssetType().BILL_DEPOSIT;
        const typePeriodic = this.accountAssetType().PERIODIC_DEPOSIT;
        const param = {
          'productType': `${typeSmart},${typeBill},${typePeriodic}`
        };
        this.queryDepositProductList(param, (res) => {
          let productList = this.notEmpty(res.body, []);
          if (this.isNotEmpty(productList)) {
            // 产品列表各产品利率求和
            productList.forEach((item, index, arr) => {
              item.totalRate = this.rateSum(item.expectRate, item.extraRate, item.saleRate);
              item.moduleId = this.notEmpty(item.subModuleId, '').substring(0, 1);
            });
          }
          this.bankDepositProductList = productList;
          this.bankProductList = [];
          this.bankProductList = this.bankDepositProductList.concat(this.bankStructureProductList);
          this.handleProductModuleData(this.bankProductList);
        });
      },
      // 查询益享(结构化存款)产品列表
      structureDepositProductList() {
        this.queryStructureDepositProductList({}, (res) => {
          let productList = this.notEmpty(res.body, []);
          if (this.isNotEmpty(productList)) {
            // 产品列表各产品利率求和
            productList.forEach((item, index, arr) => {
              item.totalRate = this.rateSum(item.expectRate, item.extraRate, item.saleRate);
              item.moduleId = this.notEmpty(item.subModuleId, '').substring(0, 1);
            });
          }
          this.bankStructureProductList = productList;
          this.bankProductList = [];
          this.bankProductList = this.bankDepositProductList.concat(this.bankStructureProductList);
          this.handleProductModuleData(this.bankProductList);
        });
      },
      // 处理主/子模块产品列表
      handleProductModuleData(productLists) {
        // 循环遍历产品模块
        let [...handleModuleList] = this.bankProductModuleList;
        handleModuleList.forEach(module => {
          // 匹配产品模块对应产品
          const moduleProductList = productLists.filter(item => item.moduleId === module.moduleId);
          module['productList'] = this.sortProductsByFields(moduleProductList);
          this.handleSortDayCheckerItems(module);
        });
        this.bankProductModuleList = [];
        this.bankProductModuleList = handleModuleList;
        this.setCurrentView();
        this.isHasBankProducts = this.bankProductModuleList.some(vm => this.isNotEmpty(vm['productList']));
      },
      openBankH5(productId) {
        this.mtj_event('app_i_jumpProductDetails', '投资页面点击银行存款产品跳转产品详情' + productId);
        let params = {
          'action': 'bank_productDetail',
          'productId': productId
        };
        this.showAppH5(params);
      },
      viewDetails(product) {
        const params = {
          'action': 'regular_product_list',
          'productId': product.productId
        };
        this.showAppH5(params);
      },
      // 查询转让申请列表跳转
      transferProductClick(item) {
        this.mtj_event('app_i_transfer_productDetails', '投资页点击跳转固收转让受让产品详情');
        try {
          this.analysys.ma_btnClick("点击转让产品-" + item.productName);
        } catch (e) {
        }
        const params = {
          'action': 'regular_transferDetails',
          'productId': item.productId,
          'originalTradeAccountId': item.originalTradeAccountId
        };
        this.showAppH5(params);
      },
      // 获取财富页面文案配置(产品介绍文案/tab配置)
      queryTreasurePageConfig() {
        const queryBankUrl = `${this.$store.getters.h5Url}${this.fileRelativePath()}/treasure/treasureConfig.json`;
        this.getJsonFile(queryBankUrl, (responseData) => {
          const resBody = responseData.body;
          if (this.isNotEmpty(resBody)) {
            this.bankProductIntroduce = resBody['bankModuleIntro']; // 银行模块配置信息
            this.hylProductIntroduce = resBody['regularModuleIntro']; // 固收/转让模块配置信息
            this.fixedTabs = resBody['fixedTabsList']; // 固收模块tab配置

            const tabCnt = this.fixedTabs.find(tab => tab.isPeriod === '0');
            this.fixedTabsInfo[0]['tabName'] = this.notEmpty(tabCnt.tabName, '鸿运来-定享');
            this.fixedTabsInfo[0]['tabDesc'] = this.notEmpty(tabCnt.tabDesc, '');

            const tabCntPeriod = this.fixedTabs.find(tab => tab.isPeriod === '1');
            this.fixedTabsInfo[1]['tabName'] = this.notEmpty(tabCntPeriod.tabName, '鸿运来-期享');
            this.fixedTabsInfo[1]['tabDesc'] = this.notEmpty(tabCntPeriod.tabDesc, '');

            this.setFixedCurrentView();
          }
        });
      },
      // 查询银行产品期限过滤项配置
      queryParamValueSortDay() {
        let param = {
          dictId: this.dictListType.PRODUCT_SORT_DAY
        };
        this.ajax(this.apiType().queryDictList, this.serviceType().query, param, (res) => {
          this.sortDayCheckerItems_main = this.notEmpty(res.body, []);
          this.handleSortDayCheckerItems(this.currentView);
        });
      },
      handleSortDayCheckerItems(currentView) {
        let checkerItems = [];
        const products = currentView['productList'];
        if (this.isNotEmpty(this.sortDayCheckerItems_main) && this.isNotEmpty(products)) {
          let filterItems = this.sortDayCheckerItems_main.filter(item => {
            const sortDayMin = item['value'].split('-')[0];
            const sortDayMax = item['value'].split('-')[1];
            const matchProduct = products.find(val => val['sortDay'] >= sortDayMin && val['sortDay'] <= sortDayMax);
            if (this.isNotEmpty(matchProduct)) {
              return item
            }
          });
          if (this.isNotEmpty(filterItems) && filterItems.length > 1) {
            filterItems.unshift({"label": "全部", "value": ""});
            checkerItems = filterItems;
          }
        }
        this.moduleSortDayItems[currentView.moduleId] = checkerItems;
        this.sortDayCheckerItems = checkerItems;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "investmentFrontPage.styl";
</style>
