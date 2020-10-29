import Vue from 'vue';

// 存储当前日期
Vue.prototype.recordLoginDate = function () {
  let localDate = this.getLocalStorage('bhfae_loginDate');
  window.globalVue.$store.getters.lastLoginDate = localDate;
  let nowDate = new Date();
  this.setLocalStorage('bhfae_loginDate', Date.parse(nowDate));
};

// 日期比对
Vue.prototype.isDayOverTime = function () {
  let localDate = window.globalVue.$store.getters.lastLoginDate;
  let newDate = new Date();
  if (this.isNotEmpty(localDate)) {
    let t1 = this.getDateComponents(localDate);
    let t2 = this.getDateComponents(newDate);
    return (t1.year !== t2.year || t1.month !== t2.month || t1.day !== t2.day);
  }
  return false
};
// 本地弹框参数置为'0'
Vue.prototype.clearRateDisplayType = function () {
  window.globalVue.$store.getters.rateDisplayType = '0';
}

// 获取本地弹框参数
Vue.prototype.getRateDisplayType = function () {
  return window.globalVue.$store.getters.rateDisplayType;
}

// 判断客户评分弹窗是否显示
Vue.prototype.isShowRatePopup = function () {
  return this.getRateDisplayType() !== '0';
}

// 判断客户评分展示方式
Vue.prototype.checkRankDisplayType = function (callback) {
  let _this = this;
  this.addCustomerRank();
  if (this.getRateDisplayType() === '1' && this.isIOSDevice()) { // 渠道 && ios
    this.checkAppReview(function () { // 能否使用苹果评分弹框-ok
      _this.appReview(function () {
      }, function () {
      }); // 使用苹果评分弹框
    }, function () { // no
      callback();
    });
  } else { // 自定义弹窗
    callback();
  }
  this.clearRateDisplayType();
};

// 增加客户评分
Vue.prototype.addCustomerRank = function () {
  let params = this.customerRating();
  this.ajaxSilence(this.apiType().addCustomerRank, this.serviceType().api, params);
};




