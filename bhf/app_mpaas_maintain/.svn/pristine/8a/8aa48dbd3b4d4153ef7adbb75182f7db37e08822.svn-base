import Vue from 'vue';
import homePage from 'components/home/main/homePage'; // 首页
import unloginHomePage from 'components/home/main/unloginHomePage'; // 未登录首页
import login from 'components/login/login/login'; // 登录
import certificateLogin from 'components/login/certificateLogin/certificateLogin'; // 证件号登录

import registerMobile from 'components/account/register/registerMobile'; // 注册手机号
import registerSms from 'components/account/register/registerSms'; // 获取验证码
import registerResult from 'components/account/register/registerResult'; // 设置登录密码
import keyboard from 'components/common/keyboard/keyboard'; // 充值
import findLoginCertificate from 'components/passWord/findLoginPassword/findLoginCertificate'; // 实名用户找回密码-验证身份
import findLoginMobile from 'components/passWord/findLoginPassword/findLoginMobile'; // 忘记密码输入手机号
import findLoginValidateCode from 'components/passWord/findLoginPassword/findLoginValidateCode'; // 忘记密码获取手机验证码
import findLoginPassword from 'components/passWord/findLoginPassword/findLoginPassword'; // 忘记密码设置密码

import investmentFrontPage from 'components/trade/investment/investmentFrontPage'; // 财富-投资首页

import assets from 'components/home/asset/assets'; // 资产首页
import personalCenter from 'components/personalCenter/personalCenter'; // 个人中心

import passwordSet from 'components/personalCenter/passwordSet'; // 密码设置

import aboutUs from 'components/personalCenter/aboutUs' // 关于我们

import modifyLoginOriginalPassword from 'components/passWord/modifyLoginPassword/modifyLoginOriginalPassword'; // 原始登录密码输入
import modifyLoginNewPassword from 'components/passWord/modifyLoginPassword/modifyLoginNewPassword'; // 设置新的登录密码

import gestureCipher from 'components/login/gesture-cipher/gesture-cipher'; // 手势密码
import setGestureCipher from 'components/login/gesture-cipher/set-gesture-cipher'; // 设置手势密码
import enableGestureLoginPassword from 'components/passWord/enableGesturePassword/enableGestureLoginPassword'; // 启用手势密码输入登录密码
import enableFingerPrintLoginPassword
  from 'components/passWord/enableFingerPrintPassword/enableFingerPrintLoginPassword'; // 启用指纹登录输入登录密码
import fingerprintLogin from 'components/login/fingerprintLogin/fingerprintLogin'; // 指纹登录

import startPage from 'src/startPage'; // 启动页

import authority from 'components/authority/authority'; // 授权提示页面

Vue.prototype.routes = [{
  path: '/',
  redirect: '/unloginHomePage'
}, {
  path: '/keyboard',
  component: keyboard,
  name: 'keyboard'
}, {
  path: '/gestureCipher',
  component: gestureCipher,
  name: 'gestureCipher'
}, {
  path: '/setGestureCipher',
  component: setGestureCipher,
  name: 'setGestureCipher'
}, {
  path: '/startPage',
  component: startPage,
  name: 'startPage'
}, {
  path: '/unloginHomePage',
  component: unloginHomePage,
  name: 'unloginHomePage',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/homePage',
  component: homePage,
  name: 'homePage',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/login',
  component: login,
  name: 'login'
}, {
  path: '/certificateLogin',
  component: certificateLogin,
  name: 'certificateLogin'
}, {
  path: '/registerMobile',
  component: registerMobile,
  name: 'registerMobile',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/registerSms',
  component: registerSms,
  name: 'registerSms',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/registerResult',
  component: registerResult,
  name: 'registerResult',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/assets',
  component: assets,
  name: 'assets',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/personalCenter',
  component: personalCenter,
  name: 'personalCenter'
}, {
  path: '/passwordSet',
  component: passwordSet,
  name: 'passwordSet'
}, {
  path: '/aboutUs',
  component: aboutUs,
  name: 'aboutUs'
}, {
  path: '/findLoginCertificate',
  component: findLoginCertificate,
  name: 'findLoginCertificate',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/investmentFrontPage',
  component: investmentFrontPage,
  name: 'investmentFrontPage',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/findLoginMobile',
  component: findLoginMobile,
  name: 'findLoginMobile',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/findLoginValidateCode',
  component: findLoginValidateCode,
  name: 'findLoginValidateCode',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/findLoginPassword',
  component: findLoginPassword,
  name: 'findLoginPassword',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/modifyLoginOriginalPassword',
  component: modifyLoginOriginalPassword,
  name: 'modifyLoginOriginalPassword',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/modifyLoginNewPassword',
  component: modifyLoginNewPassword,
  name: 'modifyLoginNewPassword',
  meta: {
    keepAlive: true,
    isBack: false
  }
}, {
  path: '/enableGestureLoginPassword',
  component: enableGestureLoginPassword,
  name: 'enableGestureLoginPassword'
}, {
  path: '/enableFingerPrintLoginPassword',
  component: enableFingerPrintLoginPassword,
  name: 'enableFingerPrintLoginPassword'
}, {
  path: '/fingerprintLogin',
  component: fingerprintLogin,
  name: 'fingerprintLogin'
}, {
  path: '/authority',
  component: authority,
  name: 'authority'
}
];
