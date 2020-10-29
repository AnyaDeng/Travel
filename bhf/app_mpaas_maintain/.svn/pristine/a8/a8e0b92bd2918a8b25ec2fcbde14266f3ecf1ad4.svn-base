/**
 * Created by admin on 2017/8/2.
 */
import Vue from 'vue';
import store from '../store/store'

Vue.filter('mobileFilter', function (value) {
  let reg = /^(\d{3})\d{4}(\d{4})$/;
  let mobile = value.replace(reg, '$1****$2');
  return mobile;
});
Vue.filter('bankFilter', function (value) {
  let reg = /(\d{4})(?=\d)/g;
  let bank = value.replace(reg, "****" + " ");
  return bank;
});
Vue.filter('bindBankFilter', function (value) {
  let reg = /^(\d{4}).*(\d{4})$/;
  let bank = value.replace(reg, '$1 **** **** $2');
  return bank;
});
Vue.filter('idFilter', function (value) {
  let reg = /^(\d{4})\d+(\d{4})$/;
  let idNum = value.replace(reg, '$1****$2');
  return idNum;
});
Vue.filter('splitDigit', function (value) {
  let point = /[.]/g;
  let reg;
  let txt;
  if (value !== '' && point.test(value) === true) {
    reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
    txt = '';
  } else if (value !== '' && point.test(value) === false) {
    reg = /(?=(?!\b)(\d{3})+$)/g;
    txt = '.00';
  } else if (value === '') {
    value = '0';
    reg = /(?=(?!\b)(\d{3})+$)/g;
    txt = '.00';
  }
  let val = String(value).replace(reg, ',');
  return val + txt;
});
Vue.filter('bankCardType', function (cardType) {
  if (cardType === '01') {
    return '储蓄卡';
  }
  if (cardType === '02') {
    return '信用卡';
  }
  return "不识别类型";
});

/**
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */
const digitsRE = /(\d{3})(?=\d)/g;
Vue.filter('currency', function (value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency != null ? currency : '$';
  decimals = decimals != null ? decimals : 2;
  let stringified = Math.abs(value).toFixed(decimals);
  let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  let i = _int.length % 3;
  let head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
  let _float = decimals ? stringified.slice(-1 - decimals) : '';
  let sign = value < 0 ? '-' : '';
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

Vue.filter('payBackType', function (payBackType) {
  switch (payBackType) {
    case '00':
      return '到期还本付息';
    case '11':
      return '按月结息,按月还本,等额本金-';
    case '12':
      return '按月结息,按月还本,等额本息-';
    case '13':
      return '按月结息,到期还本,分期付息-';
    case '21':
      return '按季结息,按季还本,等额本金-';
    case '22':
      return '按季结息,按季还本,等额本息-';
    case '23':
      return '按季结息,到期还本,分期付息-';
    default:
      return '';
  }
});

Vue.filter('dateFormat', function (value) {
  var str1 = value.replace('/', '月');
  var str2 = str1.replace('-', '日');
  return str2;
});

//例如: 5月20日
Vue.filter('dateFormatDay', function (value) {
  // 2018-05-10 00:00:00
  if (value !== '') {
    var date = value.slice(5, 10);
    var d = date.split("-")
    var month = d[0];
    var day = d[1];
    var momthAndDay = month + '月' + day + '日'
    return momthAndDay;
  }
});

// 活期鑫金宝日期格式化Number(data.tenThousandYield).toFixed(4)
Vue.filter('formatFundDate', function (value) {
  let str = value.replace(/(\d{4})(\d{2})(\d{2})/mg, '$1-$2-$3');
  return str;
});
// 活期鑫金宝万分收益格式化
Vue.filter('formatFundYield', function (value) {
  let str = Number(value).toFixed(4);
  return str;
});

Vue.filter('dateFormatTwo', function (value, type) {
  if (value === '') {
    return ''
  }
  let str = '';
  if (type == '1') {
    str = value.match(/\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}/g)[0].replace(new RegExp('-', 'g'), ".");
  } else if (type == '2') {
    str = value.match(/\d{4}-\d{1,2}-\d{1,2}/g)[0].replace(new RegExp('-', 'g'), ".");
  } else {
    return value;
  }
  return str;
});

//星期几
Vue.filter('whatWeek', function (value) {
  value = value.replace(new RegExp('\\.', "gm"), '/');
  let week = new Date(value).getDay();
  switch (week) {
    case '0':
      return '星期日';
    case '1':
      return '星期一';
    case '2':
      return '星期二';
    case '3':
      return '星期三';
    case '4':
      return '星期四';
    case '5':
      return '星期五';
    case '6':
      return '星期六';
  }
});

Vue.filter('riskOptionFormat', function (value) {
  switch (value) {
    case 1:
      return 'A';
    case 2:
      return 'B';
    case 3:
      return 'C';
    case 4:
      return 'D';
    case 5:
      return 'E';
    case 6:
      return 'F';
    case 7:
      return 'G';
    case 8:
      return 'H';
    case 9:
      return 'I';
  }
});

// 起售金额/剩余金额展现规则
Vue.filter('amountFormat', function (value) {
  let point = /[.]/g;
  let reg;
  let txt;
  if (value !== '' && parseFloat(value) < 10000) {
    if (point.test(value) === true) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
      txt = '元';
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
      txt = '元';
    }
  } else if (value !== '' && parseFloat(value) >= 10000) {
    value = parseFloat(value) / 10000;
    if (point.test(value) === true) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
      txt = '万元';
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
      txt = '万元';
    }
  }
  let val = String(value).replace(reg, ',');
  return val + txt;
});

// 起售金额/剩余金额展现规则  上面的方法返回的是数字加万元,但是数字和万元的字体大小和型号不同
//所以对上面的方法进行了拆分,一个返回是数字, 另外一个返回的是元,分别渲染.

Vue.filter('amount', function (value) {
  let point = /[.]/g;
  let reg;
  if (value !== '' && parseFloat(value) < 10000) {
    value = parseFloat(value);
    if (point.test(value) === true || value === 0) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
    }
  } else if (value !== '' && parseFloat(value) >= 10000) {
    value = parseFloat(value) / 10000;
    if (point.test(value) === true) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
    }
  }
  let val = String(value).replace(reg, ',');
  return val
});

//金额万元 向下取整
Vue.filter('amountFloor', function (value) {
  let point = /[.]/g;
  let reg;
  if (value !== '' && parseFloat(value) < 10000) {
    value = parseFloat(value);
    if (point.test(value) === true || value === 0) {
      value = window.globalVue.accurate_mul(value, 100)
      value = Math.floor(value);
      value = window.globalVue.accurate_div(value, 100)
      // value = Math.floor( value * 100) / 100;
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
    }
  } else if (value !== '' && parseFloat(value) >= 10000) {
    value = parseFloat(value) / 10000;
    if (point.test(value) === true) {
      value = window.globalVue.accurate_mul(value, 100)
      value = Math.floor(value);
      value = window.globalVue.accurate_div(value, 100)
      // value = Math.floor( value* 100) / 100;
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
    }
  }
  let val = String(value).replace(reg, ',');
  return val
});

// 起售金额/剩余金额展现规则
Vue.filter('Format', function (value) {
  let point = /[.]/g;
  let reg;
  let txt;
  if (value !== '' && parseFloat(value) < 10000) {
    if (point.test(value) === true) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
      txt = '元';
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
      txt = '元';
    }
  } else if (value !== '' && parseFloat(value) >= 10000) {
    value = parseFloat(value) / 10000;
    if (point.test(value) === true) {
      value = value.toFixed(2);
      reg = /(?=(?!\b)(\d{3})+(\.\d))/g;
      txt = '万元';
    } else {
      reg = /(?=(?!\b)(\d{3})+$)/g;
      txt = '万元';
    }
  }
  return txt;
});

Vue.filter('transformFilter', function (value, objName) {
  let dictionary = store.getters.dictionaryList;
  let dictionaryItem = eval("dictionary." + objName);
  if (!dictionaryItem) {
    return '--';
  } else {
    return eachLabel(dictionaryItem, value);
  }
});

function eachLabel(dictionary, val) {
  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].value == val) {
      return dictionary[i].label;
    }
  }
  return '--';
}

Vue.filter('riskInvestType', function (value) {
  switch (value) {
    case '1':
      return '低风险';
    case '2':
      return '低风险-较低风险';
    case '3':
      return '低风险-中等风险';
    case '4':
      return '低风险-较高风险';
    case '5':
      return '低风险-高风险';
    default:
      return '低风险-中等风险';
  }
});

// 根据首页计算出的百分比确定使用哪一张图片
Vue.filter('calPercentStyle', function (value) {
  let lightId = 0;
  if (value === 100) {
    lightId = 24;
  } else {
    let d = 100.0 / 24.0;
    lightId = Math.ceil(value / d);
    if (lightId === 24) {
      lightId = 23;
    }
  }
  return 'light_icon_' + lightId;
});
// 计算首页 百分比
Vue.filter('calPercent', function (value) {
  let a = value.investAmount;
  let b = value.volumeMax;
  if (b <= 0) {
    return 0;
  }
  let d = (a / b) * 100;
  if (d > 0 && d < 1) {
    d = 1;
  } else if (d > 100) {
    d = 100;
  }
  return Math.floor(d);
});

/**
 * 利率格式化
 * 最多保留小数点后四位(不进位)
 * 最少保留小数点后两位(位数不足补0)
 * 小数点后为三位数则保留三位
 */
Vue.filter("rateFormat", function(value) {
  let regPos = /^\d+(\.\d+)?$/; //非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (!regPos.test(value) && !regNeg.test(value)) {
    return '--'
  }
  let toFixedFix = function(n, prec) {
    let k = Math.pow(10, prec);
    return parseFloat(Math.floor(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
  };
  let point = /[.]/g;
  let num = parseFloat(value); // 删除小数末尾的0
  if (point.test(num) === true) {
    let decimalLength = num.toString().split(".")[1].length;
    if (decimalLength <= 2) {
      return num.toFixed(2);
    } else if (decimalLength > 4) {
      let val = toFixedFix(num, 4);
      return val % 1 === 0 ? val.toFixed(2) : val;
    } else {
      return num;
    }
  } else {
    return num.toFixed(2);
  }
});

