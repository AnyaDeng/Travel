import Vue from 'vue';

// 判断显示银行卡图标
Vue.prototype.getBankIconClass = function (bankCode) {
  let bankCodeList = ['002', '934', '003', '004', '005', '006', '932', '009', '012', '014', '016', '920', '007', '020', '011', '008', '017', '028', '904', '913', '947'];
  if (bankCodeList.indexOf(bankCode) >= 0) {
    return 'bankIcon' + bankCode;
  } else {
    return 'bankIcon' + '000';
  }
};

//输入框金额正则表达式判断
Vue.prototype.isAmountTrue = function (amount) {
  let pattern = /^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/;
  return pattern.test(amount);
};
// 金额格式化 decimals:小数点后几位
Vue.prototype.amountCurrency = function (value, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  decimals = decimals != null ? decimals : 2;
  let stringified = Math.abs(value).toFixed(decimals);
  let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  let i = _int.length % 3;
  let head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
  let _float = decimals ? stringified.slice(-1 - decimals) : '';
  let sign = value < 0 ? '-' : '';
  let digitsRE = /(\d{3})(?=\d)/g;
  return sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
};

// 金额格式化
Vue.prototype.splitDigit = function (value) {
  value = value + "";
  value = value.replace(/\.$/i, "");
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
};

/**
 * 利率格式化
 * 最多保留小数点后四位(不进位)
 * 最少保留小数点后两位(位数不足补0)
 * 小数点后为三位数则保留三位
 */
Vue.prototype.rateFormat = function (value) {
  let regPos = /^\d+(\.\d+)?$/; //非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (!regPos.test(value) && !regNeg.test(value)) {
    return '--'
  }
  let toFixedFix = function (n, prec) {
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
};

/**
 * 利率计算
 * 用于计算产品利率之和
 */
Vue.prototype.rateSum = function (...args) {
  let sumRate = 0;
  let i = 0;
  let len = args.length;
  while (i < len) {
    if (args[i] > 0) {
      sumRate = this.accurate_add(sumRate, Number(args[i]));
    }
    i++;
  }
  return sumRate;
};

Vue.prototype.accurate_add_multi = function (...args) {
  let result = 0;
  let i = 0;
  let len = args.length;
  while (i < len) {
    result = this.accurate_add(result, args[i]);
    i++;
  }
  return result;
};

// 金额计算加/减/乘/除--优化浮点计算精度问题
Vue.prototype.accurate_add = function (a, b) { // 加法计算
  let c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (Vue.prototype.accurate_mul(a, e) + Vue.prototype.accurate_mul(b, e)) / e;
};

Vue.prototype.accurate_sub = function (a, b) { // 减法计算
  let c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (Vue.prototype.accurate_mul(a, e) - Vue.prototype.accurate_mul(b, e)) / e;
};

Vue.prototype.accurate_mul_multi = function (...args) {
  let result = 1;
  let i = 0;
  let len = args.length;
  while (i < len) {
    result = this.accurate_mul(result, args[i]);
    i++;
  }
  return result;
};

Vue.prototype.accurate_mul = function (a, b) { // 乘法计算
  let c = 0, d = a.toString(), e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {
  }
  try {
    c += e.split(".")[1].length;
  } catch (f) {
  }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
};

Vue.prototype.accurate_div = function (a, b) { // 除法计算
  let c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {
  }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {
  }
  c = Number(a.toString().replace(".", ""));
  d = Number(b.toString().replace(".", ""));
  return Vue.prototype.accurate_mul(c / d, Math.pow(10, f - e));
};
