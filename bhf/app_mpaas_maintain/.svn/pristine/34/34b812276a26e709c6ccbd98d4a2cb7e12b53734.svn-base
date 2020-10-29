import Vue from 'vue';
// 登录成功
Vue.prototype.doLoginSuccess = function (loginInfo, callBack) {
  let param = {
    'token': loginInfo.token,
    'visitorId': loginInfo.visitorId
  };
  this.setTempLogin(param);
  let _this = this;
  this.refreshAccountInfo(function (infoData) {
    _this.removeTempLogin();
    _this.recordLoginTimes();
    _this.recordLoginDate();
    // 登陆成功上传visitorId(埋点)
    _this.analysys.ma_alias(loginInfo.visitorId);
    // 登陆成功上传用户信息(埋点)
    _this.analysys.ma_userInfo(infoData.body[0]);
    callBack();
  }, true);
};

Vue.prototype.setTempLogin = function (param) {
  this.setSessionDictionary('bhfae_tempLogin', param);
};
Vue.prototype.getTempLogin = function () {
  return this.getSessionDictionary('bhfae_tempLogin');
};
Vue.prototype.removeTempLogin = function () {
  this.removeSessionStorage("bhfae_tempLogin");
};
// 刷新全部信息
Vue.prototype.refreshAccountInfo = function (callback, isShowLoading) {
  let _this = this;
  this.queryUserInfo(function (userInfo) { // 查询用户信息
    _this.setSessionStorage('token', userInfo.token);
    _this.setUserStorage('visitorId', userInfo.visitorId);
    _this.saveUserInfo(userInfo); // 存储用户信息
    callback(userInfo);
  }, isShowLoading);
};

// 刷新用户信息
Vue.prototype.refreshUserInfo = function (callback, isShowLoading) {
  let _this = this;
  this.queryUserInfo(function (responseData) {
    _this.saveUserInfo(responseData);
    _this.$bus.emit('refreshUserInfoFinish');
    if (callback) {
      callback();
    }
  }, isShowLoading);
};
// 查询用户信息
Vue.prototype.queryUserInfo = function (cbfunc, isShowLoading) {
  if (isShowLoading) {
    this.$loading();
  }
  let ajaxPram = {};
  if (!this.isLogin()) {
    let loginInfo = this.getTempLogin();
    ajaxPram.token = loginInfo.token;
    ajaxPram.visitorId = loginInfo.visitorId;
  }
  this.ajax(this.apiType().queryAccountSummary, this.serviceType().query, ajaxPram, function (responseData) {
    if (cbfunc) {
      cbfunc(responseData);
    }
  });
};
// 存储用户信息
Vue.prototype.saveUserInfo = function (resData) {
  let user = resData.body[0];
  this.setUserStorage('name', user.name);
  this.setUserStorage('customerType', user.customerType);
  this.setUserStorage('salerNo', user.salerNo);
  this.setUserStorage('recommenderName', user.recommenderName);
  this.setUserStorage('isRealName', user.isRealName);
  this.setUserStorage('isBindCard', user.isBindCard);
  this.setUserStorage('isSetTradePassword', user.isSetTradePassword);
  this.setUserStorage('isRiskExpire', user.isRiskExpire);
  this.setUserStorage('risk', user.risk);
  this.setUserStorage('mobile', user.mobile);
  this.setUserStorage('isSetGesture', user.isSetGesture);
  this.setUserStorage('icon', user.icon);
  this.setUserStorage('nickName', user.nickName);
  this.setUserStorage('certificateNo', user.certificateNo);
  this.setUserStorage('birthday', user.birthday);
};

Vue.prototype.openFingerPrint = function (isAlert, password, success, error) {
  let _this = this;
  this.fingerTouchAvailable(function (type) {
    if (isAlert) {
      _this.openFingerPrintAlert(type, password, success, error)
    }else {
      _this.openFingerPrintCheck(type, password, success, error);
    }
  }, function () {
    if (!isAlert) {
      _this.$toast('系统指纹/面容暂不可用');
    }
    error();
  });
};

// 打开指纹弹框
Vue.prototype.openFingerPrintAlert = function (type, password, success, error) {
  let _this = this;
  let message = '';
  if (type === 'face') {
    message = '是否开启面容 ID解锁?'
  } else if (_this.deviceInfo().devicePlatform === 'iOS') {
    message = '是否开启Touch ID解锁?'
  } else {
    message = '是否开启指纹解锁?';
  }
  _this.$confirmCtrl('', message, '', '', function () {
    _this.openFingerPrintCheck(type, password, success, error);
  }, function () {
    error();
  });
};

// iOS 验证指纹后才开启, 安卓不验证直接开启
Vue.prototype.openFingerPrintCheck = function (type, password, success, error) {
  let _this = this;
  if (_this.deviceInfo().devicePlatform === 'iOS') { // iOS 指纹验证
    _this.fingerTouchVerify_iOS(function () {
      _this.openFingerPrint_request(false, password, success, error);
    }, function (errorCode) {
      let str = (type === 'face') ? '面容 ID' : 'Touch ID';
      if (errorCode === -1) {
        _this.$toast(str + '解锁验证失败');
      } else if (errorCode === -6) { // 用户拒绝授权面容
        _this.$toast('您已拒绝' + str + '解锁,如需开启请到 手机设置->滨海国金所-> 面容 ID');
      } else if (errorCode === -8) { // 错误次数太多
        _this.$toast('错误次数过多，系统'+ str +'验证已锁定');
      }
      error();
    });
  }else { // 安卓直接开启
    _this.openFingerPrint_request(false, password, success, error);
  }
};

// 开启指纹登录
Vue.prototype.openFingerPrint_request = function (isSilence, password, success, error) {
  let param = {
    'machineId': this.notEmpty(this.deviceInfo().deviceUUID, ''),
    'loginPassword': password
  };
  let _this = this;
  this.ajax(this.apiType().enableFingerPrint, this.serviceType().api, param, function (responseData) {
    let authCode = responseData.body.authorityId;
    _this.fingerTouchOpen(_this.getUserStorage('visitorId'), authCode, function (fingerPrintToken) {
      _this.setLocalFingerPrint(fingerPrintToken);
      success();
    }, function () {
      if (!isSilence) {
        _this.$toast('操作失败,请稍后再试.');
      }
      error();
    });
  }, function (responseData) {
    if (!isSilence) {
      _this.$toast(responseData.message);
    }
    error();
  }, function () {
    if (!isSilence) {
      _this.$toast('请求失败,请稍后再试.');
    }
    error();
  });
};
// 关闭指纹登录
Vue.prototype.closeFingerPrint = function (callback) {
  let _this = this;
  this.ajax(this.apiType().disableFingerPrint, this.serviceType().api, {}, function (responseData) {
    _this.fingerTouchClose(_this.getUserStorage('visitorId'), function () {
      _this.setLocalFingerPrint(null);
      callback();
    }, function () {
      _this.setLocalFingerPrint(null);
      callback();
    });
  });
};
