export default {
  data() {
    return {
      active: 0,
      currentView: {},

      // 固收tab标签渲染及排序配置--默认
      fixedTabs: [{
        tabName: '鸿运来-定享',
        tabDesc: '鸿运来-定享产品到期一次性兑付认购金额及收益，适合约定期限投资。',
        isPeriod: '0'
      }, {
        tabName: '鸿运来-期享',
        tabDesc: '鸿运来-期享产品分期兑付认购金额及收益，资金分期回款，适合投资后相对灵活配置和使用资金的投资。',
        isPeriod: '1'
      }],
      fixedActive: 0,
      fixedCurrentView: [],
      fixedCurrentTabDesc: '',
      // 固收tab相关信息
      fixedTabsInfo: [{
        tabName: '',
        tabDesc: '',
        isPeriod: '0',
        products: []
      }, {
        tabName: '',
        tabDesc: '',
        isPeriod: '1',
        products: []
      }]
    }
  },
  methods: {
    setCurrentView() {
      let tabIndex = this.bankProductModuleList.findIndex(tab => this.isNotEmpty(tab.productList));
      let bankModuleIndex = this.bankProductModuleList.findIndex(tab => tab.moduleId === this.bankModuleTag && this.isNotEmpty(tab.productList));
      if (bankModuleIndex !== -1) {
        tabIndex = bankModuleIndex;
      }
      this.active = 0;
      this.currentView = {};
      if (tabIndex !== -1) {
        this.toggle(tabIndex);
      }
    },
    toggle(index, isClick) {
      this.active = index;
      this.currentView = Object.assign({}, this.currentView, this.bankProductModuleList[index]);
      this.sortDayCheckerItems = this.moduleSortDayItems[this.currentView.moduleId];
      if (isClick) {
        this.mtj_event('app_i_toggle', '投资页点击福运来切换');
        try {
          this.analysys.ma_btnClick("银行精选-" + this.currentView.shortName);
        } catch (e) {
        }
      }
    },
    matchFixedTabInfo(isPeriod) {
      return this.fixedTabsInfo.find(tab => tab.isPeriod === isPeriod);
    },
    setFixedCurrentView() {
      let tabIndex = this.fixedTabs.findIndex(tab => this.isNotEmpty(this.matchFixedTabInfo(tab.isPeriod).products));

      this.fixedActive = 0;
      this.fixedCurrentView = [];
      if (tabIndex !== -1) {
        this.fixedToggle(tabIndex);
      }
    },
    fixedToggle(index, isClick) {
      if (isClick) {
        try {
          this.analysys.ma_btnClick("点击" + this.matchFixedTabInfo(this.fixedTabs[index]['isPeriod']).tabName);
        } catch (e) {
        }
      }
      this.fixedActive = index;
      this.fixedCurrentView = this.matchFixedTabInfo(this.fixedTabs[index]['isPeriod']).products;
      this.fixedCurrentTabDesc = this.matchFixedTabInfo(this.fixedTabs[index]['isPeriod']).tabDesc;
    }
  }
}


