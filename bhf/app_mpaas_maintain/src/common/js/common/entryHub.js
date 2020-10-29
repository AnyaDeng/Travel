import Vue from 'vue';
// entryHub.js 推送,链接 打开APP,统一调用当前JS逻辑,处理后续事物

// target=https%3a%2f%2ffile.bhfae.com%2fcommon%2fapp%2fpicture%2findex.html%23%2fimageShow%3fimgid%3d20181221001%26name%3djojo
// 动作:跳转外部浏览器 目标:打开目标链接
// 警告: 链接需要UrlEncode!!(解决?号:号#号&号问题)

// action=show_page&target=assets?product=123456
// 动作:跳转页面 目标:资产页(参数product=123456)
// 说明: ↓↓↓↓↓↓下面这个是入口↓↓↓↓↓
let LATER_ACTION = 'laterAction';
Vue.prototype.entryHub = function (queryStr) {
  // 需要处理下面两种query字符串
  // action=show_browser&target=https%3a%2f%2fh5-cdn.bhfae.com%2fcommon%2fapp%2fappH5%2findex.html%23%3faction%3dcoupon_list%26cid%3d123 (这个是正常的,iOS)
  // target=https%3a%2f%2fh5-cdn.bhfae.com%2fcommon%2fapp%2fappH5%2findex.html%23%3faction%3dcoupon_list%26cid%3d123&action=show_browser (不正常,iOS13的Safari浏览器会变换参数顺序...好神奇!)
  // 安卓不知为何,url被解码了
  // action=show_browser&target=https://h5-cdn.bhfae.com/common/app/appH5/index.html#?action=coupon_list&cid=213 (安卓sdk会把url解码....fuck!)
  // target=https://h5-cdn.bhfae.com/common/app/appH5/index.html#?action=coupon_list&cid=213&action=show_browse  (这种情况没遇到过,不过也考虑进去,万一出现了...fuck)

  console.log('entryHub:' + queryStr);
  if (!queryStr || queryStr.indexOf('target=') === -1 || queryStr.indexOf('action=') === -1) {
    console.log('格式不正确,不包含 target= 或者 action=');
    return;
  }

  let str1 = 'action=show_browser&target=';
  let str2_start = 'target=';
  let str2_end = '&action=show_browser';
  let condition1 = queryStr.startsWith(str1);
  let condition2 = queryStr.startsWith(str2_start) && queryStr.endsWith(str2_end);
  if (!(condition1 || condition2)) {
    console.log('格式不正确,以 "action=show_browser&target=" 开头 或者 "target="开头 且 "&action=show_browser" 结尾');
    return;
  }
  let action = 'show_browser'; // 暂时只考虑 跳转浏览器
  let target = '';
  if (condition1) { // "action=show_browser&target=" 开头
    target = queryStr.substring(str1.length);
  } else { // "target="开头 且 "&action=show_browser" 结尾
    let start = str2_start.length;
    let end = queryStr.indexOf(str2_end);
    target = queryStr.substring(start, end);
  }
  console.log('target:' + target);

  if (!this.isNotEmpty(target)) {
    console.log('target为空!');
    return;
  }
  if (target.startsWith('http')) {
    let lowerStr = target.toLowerCase();
    if (lowerStr.startsWith('https://') || lowerStr.startsWith('http://')) {
      console.log('target已解码');
    } else if (lowerStr.startsWith('https%3a%2f%2f') || lowerStr.startsWith('http%3a%2f%2f')) {
      console.log('target未解码');
      target = decodeURIComponent(target); // 目标(解码)
      console.log('解码后target:' + target);
    }
  } else {
    console.log('暂时不支持以非http开头的目标');
    return;
  }

  let dict = {
    'action': action,
    'target': target
  };
  console.log('dict:' + JSON.stringify(dict));
  this.setSessionDictionary(LATER_ACTION, dict); // 存储,登录后再用
  let _this = this;
  setTimeout(function () {
    _this.entryCheckState();
  }, 1000);
};

// 检查状态 (忽略引导页/登录页)
let ignorePages = ['startPage', 'login', 'fingerprintLogin', 'gestureCipher', 'certificateLogin'];
Vue.prototype.entryCheckState = function () {
  if (this.isLogin()) { // 已登录
    this.entryDoAction();
  } else { // 未登录
    let _this = this;
    setTimeout(function () {
      if (ignorePages.indexOf(_this.getSessionStorage(_this.appPageName)) === -1) {
        _this.jumpLogin(); // 跳转登录页
      }
    }, 200);
  }
};

// 检查是否有后续操作
Vue.prototype.entryCheckAction = function () {
  return this.isNotEmpty(this.getSessionDictionary(LATER_ACTION));
};

// 执行后续动作
Vue.prototype.entryDoAction = function () {
  let dict = this.getSessionDictionary(LATER_ACTION);
  if (this.isNotEmpty(dict)) {
    this.webhub_closeBrowser();
    this.showBhfaeBrowser(this.urlJoinCommonParam(dict.target));
    this.setSessionDictionary(LATER_ACTION, {}); // 清空
  }
};
