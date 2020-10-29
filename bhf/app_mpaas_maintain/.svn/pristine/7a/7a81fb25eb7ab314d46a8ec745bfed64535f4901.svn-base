import Vue from 'vue';

// 持久化存储 设置用户相关数据 (跟用户无关数据 不要加)
function getLocalUserKeys() {
  return [
    'name', // 姓名
    'nickName', // 昵称
    'mobile', // 手机号
    'visitorId', // 用户id
    'isSetGesture' // 是否开启手势登录
  ];
}

function isLocalKey(key) {
  return getLocalUserKeys().indexOf(key) > -1;
}

// 临时存储 设置用户相关数据 (跟用户无关数据 不要加)
function getSessionUserKeys() {
  return [
    'name', // 姓名
    'visitorId', // 用户id
    'isSetGesture', // 是否设置手势密码
    'customerType', // 用户类型
    'isRealName', // 是否实名
    'isBindCard', // 是否绑卡
    'isSetTradePassword', // 是否设置交易密码
    'isRiskExpire', // 是否风险测评过期
    'risk', // 风险测评类型
    'mobile', // 手机号
    'icon', // 头像地址
    'nickName', // 昵称
    'salerNo', // 营销员的邀请码
    'recommenderName', // 绑定邀请人
    'certificateNo', // 身份证号
    'birthday'   //生日
  ];
}

function isSessionKey(key) {
  return getSessionUserKeys().indexOf(key) > -1;
}

// 设置本地存储--与用户相关信息
Vue.prototype.setUserStorage = function (key, value) {
  let val = !value ? '' : value;
  let allVal = JSON.parse(window.sessionStorage.getItem('userInfo')) ? JSON.parse(window.sessionStorage.getItem('userInfo')) : {};
  let allLocalVal = JSON.parse(window.localStorage.getItem('bhfae_userInfo')) ? JSON.parse(window.localStorage.getItem('bhfae_userInfo')) : {};
  if (isLocalKey(key)) {
    allLocalVal[key] = val;
    this.setLocalStorage('bhfae_userInfo', JSON.stringify(allLocalVal));
  }
  if (isSessionKey(key)) {
    allVal[key] = val;
    this.setSessionStorage('userInfo', JSON.stringify(allVal));
  }
};
// 获取本地存储--与用户相关信息
Vue.prototype.getUserStorage = function (key) {
  if (isLocalKey(key)) {
    let objLocal = JSON.parse(window.localStorage.getItem('bhfae_userInfo')) ? JSON.parse(window.localStorage.getItem('bhfae_userInfo')) : '';
    try {
      return eval('objLocal.' + key) ? eval('objLocal.' + key) : '';
    } catch (e) {
      return '';
    }
  } else if (isSessionKey(key)) {
    let obj = JSON.parse(window.sessionStorage.getItem('userInfo')) ? JSON.parse(window.sessionStorage.getItem('userInfo')) : '';
    try {
      return eval('obj.' + key) ? eval('obj.' + key) : '';
    } catch (e) {
      return '';
    }
  } else {
    return '';
  }
};

// 设置、获取本地存储--与用户不相关信息
Vue.prototype.setSessionStorage = function (key, value) {
  let val = !value ? '' : value;
  if (typeof val === 'object') {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  } else {
    window.sessionStorage.setItem(key, val);
  }
};
Vue.prototype.getSessionStorage = function (key) {
  return window.sessionStorage.getItem(key) ? window.sessionStorage.getItem(key) : '';
};
Vue.prototype.setLocalStorage = function (key, value) {
  let val = !value ? '' : value;
  window.localStorage.setItem(key, val);
};
Vue.prototype.getLocalStorage = function (key) {
  return window.localStorage.getItem(key) ? window.localStorage.getItem(key) : '';
};
Vue.prototype.setLocalDictionary = function (key, value) {
  try {
    if (typeof value === 'object') {
      let obj = JSON.stringify(value);
      this.setLocalStorage(key, obj);
    }
  } catch (e) {
    console.log(e);
  }
};
Vue.prototype.getLocalDictionary = function (key) {
  let dict = {};
  let obj = this.getLocalStorage(key);
  if (obj !== '') {
    let tmpDict = JSON.parse(obj);
    if (typeof tmpDict === 'object') {
      dict = tmpDict;
    }
  }
  return dict;
};
Vue.prototype.setSessionDictionary = function (key, value) {
  try {
    if (typeof value === 'object') {
      let obj = JSON.stringify(value);
      this.setSessionStorage(key, obj);
    }
  } catch (e) {
    console.log(e);
  }
};
Vue.prototype.getSessionDictionary = function (key) {
  let dict = {};
  let obj = this.getSessionStorage(key);
  if (obj !== '') {
    let tmpDict = JSON.parse(obj);
    if (typeof tmpDict === 'object') {
      dict = tmpDict;
    }
  }
  return dict;
};
// 清除本地存储
Vue.prototype.removeSessionStorage = function (key) {
  window.sessionStorage.removeItem(key);
};
Vue.prototype.removeLocalStorage = function (key) {
  window.localStorage.removeItem(key);
};
Vue.prototype.removeUserLocalStorage = function (key) {
  let allLocalVal = JSON.parse(window.localStorage.getItem('bhfae_userInfo')) ? JSON.parse(window.localStorage.getItem('bhfae_userInfo')) : {};
  delete allLocalVal[key];
  this.setLocalStorage('bhfae_userInfo', JSON.stringify(allLocalVal));
};
