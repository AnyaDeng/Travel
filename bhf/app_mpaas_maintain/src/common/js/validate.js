/**
 * Created by Administrator on 2017/7/25 0025.
 */
import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';
import messages from 'vee-validate/dist/locale/zh_CN.js';

Validator.addLocale(messages);
const config = {
  events: 'blur',
  locale: 'zh_CN'
};
Vue.use(VeeValidate, config);
// 修改默认错误提示
const dictionary = {
  zh_CN: {
    messages: {
      required: () => '必填项不能为空'
    }
  }
};
Validator.updateDictionary(dictionary);

Validator.extend('loginName', {
  getMessage: field => '登录用户名不正确',
  validate: value => {
    let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let regPhone = /^1\d{10}$/;
    if (value !== '' && regId.test(value)) {
      return true;
    } else if (value !== '' && regPhone.test(value)) {
      return true;
    }
    return false;
  }
});
Validator.extend('passWord', {
  getMessage: field => '密码由6-16位数字、字母组成',
  validate: value => {
    let regPassWord = /^(?![a-zA-Z]+$)(?!\d+$)[0-9A-Za-z]{6,16}$/;
    if (value !== '' && regPassWord.test(value)) {
      return true;
    }
    return false;
  }
});
Validator.extend('mobile', {
  getMessage: field => '手机号格式不正确',
  validate: value => {
    let regMobile = /^1\d{10}$/;
    if (value !== '' && regMobile.test(value)) {
      return true;
    }
    return false;
  }
});
// 身份证号校验
Validator.extend('checkId', {
  getMessage: field => '身份证号有误',
  validate: value => {
    let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value !== '' && regId.test(value)) {
      return true;
    }
    return false;
  }
});
