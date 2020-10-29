import Vue from 'vue';
// 固收产品查询
Vue.prototype.queryRegularProductList = function (params, callback, failedCallback) {
  let _this = this;
  this.ajax(this.apiType().queryRegularProductList, this.serviceType().query, params, function (responseData) {
    const productList = _this.notEmpty(responseData.body, []).map(product => {
      if (product.saleStatus === '1' && _this.isNotEmpty(product.startRaiseTime)) {
        product.startRaiseTimeDisplay = product.startRaiseTime.replace('/', '月').replace('-', '日') + '开售';
        product.startRaiseTimeColor = '#ff6c00';
      }
      return product;
    });
    if (callback) {
      callback(productList);
    }
  }, function (responseData) {
    if (failedCallback) {
      failedCallback(responseData);
    } else {
      let message = responseData.message;
      _this.$alert(message);
    }
  }, function () {
    if (failedCallback) {
      failedCallback();
    } else {
      _this.$toast('服务器请求超时，请稍后再试');
    }
  });
};

// 获取产品模块列表
Vue.prototype.getProductModuleList = function (callback, failedCallback) {
  const bankProductModuleList = window.globalVue.$store.getters.bankProductModuleList;
  const token = this.getSessionStorage("token");
  const queryModuleKey = this.getLocalStorage("bhfae_queryProductModuleListFlag");
  const isLocalToken = (this.checkToken(token) && queryModuleKey === token);
  if (this.isNotEmpty(bankProductModuleList) && isLocalToken) { // 本地已存储模块列表信息 且 同一登录周期内
    callback(bankProductModuleList);
  } else {
    this.setLocalStorage("bhfae_queryProductModuleListFlag", token);
    this.queryProductModuleList((res) => {
      window.globalVue.$store.getters.bankProductModuleList = res.body;
      callback(res.body);
    }, failedCallback);
  }
};

// 查询产品模块列表
Vue.prototype.queryProductModuleList = function (callback, failedCallback) {
  this.ajax(this.apiType().queryProductModuleList, this.serviceType().query, {}, (responseData) => {
    if (callback) {
      callback(responseData);
    }
  }, (responseData) => {
    if (failedCallback) {
      failedCallback(responseData);
    } else {
      const message = responseData.message;
      this.$alert(message);
    }
  }, () => {
    if (failedCallback) {
      failedCallback();
    } else {
      this.$toast('服务器请求超时，请稍后再试');
    }
  });
};

// 查询银行存款产品列表
Vue.prototype.queryDepositProductList = function (param, callback, failedCallback) {
  // let param = {
  //   'productType': this.isNotEmpty(productType) ? productType : ''
  // };
  let _this = this;
  this.ajax(this.apiType().queryDepositProductList, this.serviceType().query, param, function (responseData) {
    if (callback) {
      callback(responseData);
    }
  }, function (responseData) {
    if (failedCallback) {
      failedCallback(responseData);
    } else {
      let message = responseData.message;
      _this.$alert(message);
    }
  }, function () {
    if (failedCallback) {
      failedCallback();
    } else {
      _this.$toast('服务器请求超时，请稍后再试');
    }
  });
};
// 查询结构性存款产品列表
Vue.prototype.queryStructureDepositProductList = function (param, callback, failedCallback) {
  let _this = this;
  this.ajax(this.apiType().queryStructureDepositProductList, this.serviceType().query, param, function (responseData) {
    if (callback) {
      callback(responseData);
    }
  }, function (responseData) {
    if (failedCallback) {
      failedCallback(responseData);
    } else {
      let message = responseData.message;
      _this.$alert(message);
    }
  }, function () {
    if (failedCallback) {
      failedCallback();
    } else {
      _this.$toast("服务器请求超时，请稍后再试");
    }
  });
};

// 获取推荐产品列表及对应产品详细信息
Vue.prototype.getProductPreferList = function (callback, isLoading) {
  this.queryProductPreferList('MAIN', (productPreferList) => {
    productPreferList = productPreferList.length > 1 ? productPreferList.slice(0, 2) : []; // 列表元素数量小于2不展示,大于2只展示前2条
    if (this.isNotEmpty(productPreferList)) {
      this.queryAllProductInfo(productPreferList, (productList) => {
        callback(productList);
      }, isLoading);
    } else {
      callback([]);
    }
  }, isLoading);
};

// 查询推荐产品列表
Vue.prototype.queryProductPreferList = function (productPreferType, callback, isLoading) {
  const param = {
    'productPreferType': productPreferType
  };
  this.ajaxLong(this.apiType().queryProductPreferList, this.serviceType().query, param, isLoading, null, (res) => {
    const productPreferList = this.notEmpty(res.body, []);
    callback(productPreferList);
  }, () => {
    callback([]);
  }, () => {
    callback([]);
  });
};

// 遍历查询推荐产品详情
Vue.prototype.queryAllProductInfo = function (productIdList, callback, isLoading) {
  if (this.isNotEmpty(productIdList)) {
    let productInfoList = [];
    for (let i = 0; i < productIdList.length; i++) {
      productInfoList.push(this.productInfo_promise(productIdList[i].productId, isLoading));
    }
    Promise.all(productInfoList).then((results) => {
      callback(results);
    }).catch((e) => {
      callback([]);
    });
  } else {
    callback([]);
  }
};

// Promise--根据产品ID查询详细信息
Vue.prototype.productInfo_promise = function (productId, isLoading) {
  return new Promise((resolve, reject) => {
    let params = {
      'productId': productId
    };
    this.ajaxLong(this.apiType().queryProductDetailInfo, this.serviceType().query, params, isLoading, null, (res) => {
      if (this.isNotEmpty(res.body))  {
        resolve(res.body[0]);
      } else {
        reject([]);
      }
    }, () => {
      reject([]);
    }, () => {
      reject([]);
    });
  });
};
