/* 在这里使用cordova插件,实现所有移动统计分析功能 */
import Vue from 'vue';

/********************************* ↓↓↓↓↓↓ 百度统计 ↓↓↓↓↓ *********************************/

// 进入 页面统计
Vue.prototype.mtj_in = function (pageName) {
};

// 离开 页面统计
Vue.prototype.mtj_out = function (pageName) {
};
// 点击事件统计
Vue.prototype.mtj_event = function (eventId, eventLabel) {
};


/********************************* ↑↑↑↑↑↑ 百度统计 ↑↑↑↑↑↑ *********************************/

// 统计页面 通过路由地址得到对应的中文名称
Vue.prototype.mtjPageName = function (routerPath) {
  if (routerPath) {
    routerPath = routerPath.replace('/', '');
    let pageName = getPathMap()[routerPath];
    if (pageName) {
      return pageName;
    }
    return '未知页面';
  }
  return '程序启动';
};

function getPathMap() {
  return {
    "unloginHomePage": "未登录首页",
    "homePage": "登录后首页",
    "login": "账号登录页",
    "certificateLogin": "证件号登录页",
    "registerMobile": "注册手机号页",
    "registerSms": "注册获取验证码页",
    "registerResult": "注册设置登录密码页",
    "findLoginCertificate": "实名用户找回密码页(验证身份)",
    "findLoginMobile": "忘记密码手机号页",
    "findLoginValidateCode": "忘记密码获取验证码页",
    "findLoginPassword": "忘记密码设置密码页",
    "investmentFrontPage": "财富页",
    "assets": "我的-资产首页",
    "personalCenter": "个人中心页",
    "passwordSet": "个人中心-密码设置页",
    "aboutUs": "个人中心-关于我们页",
    "modifyLoginOriginalPassword": "原始登录密码输入页",
    "modifyLoginNewPassword": "设置新的登录密码页",
    "gestureCipher": "手势密码登录页",
    "setGestureCipher": "修改手势密码页",
    "enableGestureLoginPassword": "启用手势密码输入登录密码页",
    "enableFingerPrintLoginPassword": "启用指纹登录输入登录密码页",
    "fingerprintLogin": "指纹登录页",
    "startPage": "启动页",
    "authority": "授权提示页面"
  };
}
