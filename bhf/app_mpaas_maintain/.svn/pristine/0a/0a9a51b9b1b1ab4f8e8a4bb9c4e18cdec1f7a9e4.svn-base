/**
 * Created by Administrator on 2017/7/25 0025.
 */
import Vue from 'vue';

// 说明:使用activity服务器均需要在这里特殊配置
Vue.prototype.activityUrls = [
  'queryActivityList' // 获取图文信息
];

Vue.prototype.apiType = function () {
  return {
    fetchToken: 'fetchToken', // 页面刷新获取token
    checkTokenActive: 'checkTokenActive', // 检查token是否有效
    login: 'login', // 登录
    getGraphCode: 'getGraphCode', // 获取验证码
    queryContentItemList: 'queryContentItemList', // 获取图文信息(未登录首页依旧使用该接口)
    queryActivityList: 'queryActivityList', // 获取图文信息(使用activity服务器)
    queryAppVersion: 'queryAppVersion', // App版本检查

    loginValidate: 'loginValidate', // 校验用户名是否存在
    mobileRegisterValidate: 'mobileRegisterValidate', // 手机号是否注册
    sendValidateCode: 'sendValidateCode', // 发送手机验证码
    checkValidateCode: 'checkValidateCode', // 检查验证码
    findLoginPassword: 'findLoginPassword', // 找回密码
    openVisitorAccount: 'openVisitorAccount', // 注册

    queryRegularProductList: 'queryRegularProductList', // 获取固收产品列表
    queryProductDetailInfo: 'queryProductDetailInfo', // 根据产品编号获取产品详情
    findLoginPasswordValidate: 'findLoginPasswordValidate', // 是否需要校验身份证
    queryAccountSummary: 'queryAccountSummary', // 查询用户信息
    queryAccountAsset: 'queryAccountAsset', // 查询用户资产
    loginPasswordValidate: 'loginPasswordValidate', // 校验原始登录密码
    modifyLoginPassword: 'modifyLoginPassword', // 修改登录密码
    queryDictList: 'queryDictList', // 查询字典
    queryParamValue: 'queryParamValue', // 查询参数
    enableGesturePassword: 'enableGesturePassword', // 启用手势密码
    disableGesturePassword: 'disableGesturePassword', //  取消手势密码
    gestureLogin: 'gestureLogin', //  手势密码登录
    uploadIcon: 'uploadIcon', // 头像上传
    fingerPrintLogin: 'fingerPrintLogin', // 指纹登录
    disableFingerPrint: 'disableFingerPrint', // 关闭指纹登录
    enableFingerPrint: 'enableFingerPrint', // 开启指纹登录
    queryIgnorePassword: 'queryIgnorePassword', // 查询是否免密

    logout: 'logout', //退出登录

    addCustomerRank: 'addCustomerRank', // app评分-增加客户评分
    queryCustomerRankDisplay: 'queryCustomerRankDisplay', // app评分-查询客户评分展示方式

    queryDepositProductList: 'queryDepositProductList', //银行存款产品列表
    queryStructureDepositProductList: "queryStructureDepositProductList", //结构性存款

    queryAvailableCapitalBalance: 'queryAvailableCapitalBalance', // 平台-查询账户余额

    queryAccountCharity: 'queryAccountCharity',  //爱心鸿运来-查询是否是慈善户

    queryTransferApplyList: 'queryTransferApplyList', // 查询固收转让申请列表

    modifyVisitorAttach: 'modifyVisitorAttach', // 更新设备信息
    queryProductModuleList: 'queryProductModuleList', // 查询产品模块列表
    queryProductPreferList: 'queryProductPreferList', // 查询推荐产品列表
    queryShareBalanceList: 'queryShareBalanceList', // 查询用户资产信息
    queryAccountYesterdayBenifit: 'queryAccountYesterdayBenifit', // 查询昨日收益
    queryDepositAccountCount: 'queryDepositAccountCount', // 查询电子户开户数量
    queryAccountConfirmBenifit: 'queryAccountConfirmBenifit' // 查询累计到账收益
  };
};
Vue.prototype.serviceType = function () {
  return {
    api: 'api',
    query: 'query',
    file: 'file',
    alarm: 'alarm',
    download: 'export' //下载
  };
};

Vue.prototype.requestStatus = function () {
  return {
    success: 'SUCCESS',
    sysError: 'SYS_ERR',
    sessionTimeOut: 'SYS_SESSION_TIME_OUT',
    sessionNotSame: 'SYS_SESSION_NOT_SAME'
  };
};

// 查询产品类型枚举
Vue.prototype.accountAssetType = function () {
  return {
    ACCOUNT_BALANCE: 'C', // 账户余额
    REGULAR_TERM: '0', // 固定收益定期
    OPEN_DEPOSIT: '4', // 类活期存款(例如:百信智惠存)
    STRUCTURE_DEPOSIT: '5', // 结构性存款
    PERIODIC_DEPOSIT: '6', // 周期性存款(例如:百信定惠存)
    BILL_DEPOSIT: '7', // 分笔类活期存款(例如:湘惠存),
    VIRTUAL: '9' // 虚拟产品

  };
};

// ocr交互相关参数--end
Vue.prototype.paramBase = function () {
  return {
    'apiVersion': '1.0',
    'token': this.getSessionStorage('token'),
    'appVersion': this.getAppVersion(),
    'saleSystem': 'WMS',
    'clientType': '02', // PC:'01'  APP:'02'  WX:'03'  MINI:'04'
    'clientIp': window.location.hostname,
    'stationId': 'T00000',
    'visitorId': this.getUserStorage("visitorId"),
    'appClientType': this.handelClientType(), // app操作系统 Android:'0'  iOS:'1'
    'appMachineBrand': this.getValidateString(Vue.prototype.deviceInfo().deviceManufacturer), // app设备品牌
    'appMachineModel': this.getValidateString(Vue.prototype.deviceInfo().deviceModel), // app设备型号
    'appSystemVersion': this.getValidateString(Vue.prototype.deviceInfo().deviceVersion) // app操作系统版本
  };
};

// 处理app操作系统返回值
Vue.prototype.handelClientType = function () {
  let devicePlatform = this.getValidateString(Vue.prototype.deviceInfo().devicePlatform);
  if (devicePlatform === 'Android') {
    return '0';
  } else if (devicePlatform === 'iOS') {
    return '1';
  }
  return '0';
};

// 客户评分接口相关参数设置
Vue.prototype.customerRating = function () {
  return {
    'isSpecial': this.isIOSDevice() ? '1' : '0', // android:0  ios:1
    'appClientType': this.isIOSDevice() ? '1' : '0', // android:0  ios:1
    'machineId': this.deviceInfo().deviceUUID ? this.deviceInfo().deviceUUID : '9528a33907a05f0d' // TODO: 默认值是为浏览器运行设置
  };
};

// 头部组件背景颜色配置参数
Vue.prototype.headerColor = {
  transparent: "transparent", // 背景透明
  golden: "#C0975E", // 金黄色
  golden1: "#CDA76E", // 金黄色-银行产品活期详情页
  darkBlue: "#263147", // 深蓝色
  darkBlue1: "#232E44", // 深蓝色-资产页面
  darkBlue2: "#263048", // 深蓝色-页面滚动渐变颜色
  darkBlue3: "#23497E", // 浅蓝色-定期持仓页面
  darkBlue4: "#243970", // 浅蓝色-财富页面头部
  orange: "#FFAD75" //爱心鸿运来橘黄色
};

// 头部组件按钮类型配置参数(新增配置需同步增加名称映射配置)
Vue.prototype.headerBtn = {
  bhfaeLogo: 'bhfaeLogo', // 滨海国金所logo
  treasureTitle: 'treasureTitle', // 财富页面标题
  backArrow: 'backArrow', // 回退箭头
  cancel: 'cancel', // 取消
  service: 'service', // 客服
  message: 'message', // 系统消息
  headPortrait: 'headPortrait', // 头像
  skip: 'skip', // 跳过
  certificateLogin: 'certificateLogin', // 证件号
  charity: 'charity' // 爱心图标--此属性对应资产页面头部固定内容
};
// 头部组件按钮名称映射配置(用于易观埋点统计)
Vue.prototype.headerBtnName = {
  bhfaeLogo: '滨海国金所logo',
  treasureTitle: '财富页面标题',
  backArrow: '回退箭头',
  cancel: '取消',
  service: '客服',
  message: '系统消息',
  headPortrait: '头像',
  skip: '跳过',
  certificateLogin: '证件号',
  charity: '爱心图标'
};

// 权限名称
Vue.prototype.permissionCode = {
  CAMERA: {code: 'CAMERA', name: '相机'},
  RECORD_AUDIO: {code: 'RECORD_AUDIO', name: '麦克风'},
  READ_EXTERNAL_STORAGE: {code: 'READ_EXTERNAL_STORAGE', name: '存储'},
  WRITE_EXTERNAL_STORAGE: {code: 'WRITE_EXTERNAL_STORAGE', name: '存储'},
  READ_PHONE_STATE: {code: 'READ_PHONE_STATE', name: '设备信息'},
  ACCESS_LOCATION: {code: 'ACCESS_LOCATION', name: '位置信息'},
  CALL_PHONE: {code: 'CALL_PHONE', name: '拨打电话'}
};
