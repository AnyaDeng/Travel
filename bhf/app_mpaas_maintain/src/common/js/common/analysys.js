import Vue from 'vue';

/********************************* ↓↓↓↓↓↓ 易观统计 ↓↓↓↓↓ *********************************/
export default {
  /**
   * 页面信息上传
   * @param {String} pageName 页面名称
   * @param {Object} [pageInfo] 页面相关信息
   */
  ma_pageView(pageName, pageInfo) {
    if (!Vue.prototype.isRunOnDevice()) {
      return;
    }
    try {
      const params = {
        'pageName': pageName,
        'pageInfo': Vue.prototype.notEmpty(pageInfo, {})
      };
      BHAnalysys.analysysPageview(params);
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * 事件信息上传
   * @param {String} eventName 事件名称
   * @param {Object} [eventInfo] 事件相关信息
   */
  ma_track(eventName, eventInfo) {
    if (!Vue.prototype.isRunOnDevice()) {
      return;
    }
    try {
      const params = {
        'eventName': eventName,
        'eventInfo': Vue.prototype.notEmpty(eventInfo, {})
      };
      BHAnalysys.analysysTrack(params);
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * 用户visitorId上传
   * @param {String} aliasId 用户visitorId
   */
  ma_alias(aliasId) {
    if (!Vue.prototype.isRunOnDevice()) {
      return;
    }
    try {
      BHAnalysys.analysysAlias({'aliasId': aliasId});
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * 设置用户属性
   * @param {Object} userInfo 用户信息
   */
  ma_profileSet(userInfo) {
    if (!Vue.prototype.isRunOnDevice()) {
      return;
    }
    try {
      const params = {
        'userInfo': userInfo
      };
      BHAnalysys.analysysProfileSet(params);
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * 用户信息上传
   * @param {Object} info 接口返回用户信息
   */
  ma_userInfo(info) {
    const userInfo = {
      'name': Vue.prototype.notEmpty(info.name, ''),
      'nickname': Vue.prototype.notEmpty(info.nickName, ''),
      'phonenumber': Vue.prototype.notEmpty(info.mobile, ''),
      'customer_level': Vue.prototype.getRiskName(info.risk),
      'is_fingerprint': (info.isSetFingerPrint === '1') ? 'maBool_1' : 'maBool_0',
      'is_gesture': (info.isSetGesture === '1') ? 'maBool_1' : 'maBool_0',
      'is_bindbankcard': (info.isBindCard === '1') ? 'maBool_1' : 'maBool_0',
      'is_piv': (info.isRealName === '1') ? 'maBool_1' : 'maBool_0',
      'is_profilephoto': Vue.prototype.isNotEmpty(info.icon) ? 'maBool_1' : 'maBool_0',
      'is_twitter': Vue.prototype.isNotEmpty(info.salerNo) ? 'maBool_1' : 'maBool_0'
    };
    this.ma_profileSet(userInfo);
  },
  /**
   * 按钮点击事件
   * @param {String} btnName 按钮名称
   * @param {Object} [obj] 其他属性,可不传
   */
  ma_btnClick(btnName, obj) {
    const info = {
      'page_name': Vue.prototype.mtjPageName(Vue.prototype.getAppPageName()),
      'btn_name': btnName
    };
    const eventInfo = Object.assign(info, Vue.prototype.notEmpty(obj, {}));
    this.ma_track('btn_click', eventInfo)
  },
  /**
   * banner点击事件
   * @param {Object} info 事件属性
   */
  ma_bannerClick(info) {
    const bannerInfo = {
      'page_name': Vue.prototype.mtjPageName(Vue.prototype.getAppPageName()),
      'banner_location': this.bannerLocationName[info.contentId],
      'banner_name': Vue.prototype.notEmpty(info.title, ''),
      'banner_id': Vue.prototype.notEmpty(info.contentItemId, ''),
      'target_url': Vue.prototype.notEmpty(info.link, ''),
      'rank': `maNum_${info.sequence}`
    };
    this.ma_track('banner_click', bannerInfo)
  },
  // banner位置映射
  bannerLocationName: {
    POPUP: '营销弹框',
    MAIN_LOGIN_BANNER: '页面上部',
    MAIN_LOGIN_BANNER_MIDDLE: '页面中部',
    MAIN_LOGIN_BANNER_B: '页面底部',
    MAIN_LOGIN_BANNER_A: '页面中部双图片',
    PRODUCT_DEPOSIT_BANNER_A: '页面银行tab上部',
    PRODUCT_REGULAR_BANNER_A: '页面固收tab上部'
  },
  /**
   * 活动icon点击事件
   * @param {Object} info 事件属性
   */
  ma_activityClick(info) {
    const activityInfo = {
      'page_name': Vue.prototype.mtjPageName(Vue.prototype.getAppPageName()),
      'banner_location': this.activityLocationName[info.contentId],
      'banner_name': Vue.prototype.notEmpty(info.title, ''),
      'banner_id': Vue.prototype.notEmpty(info.contentItemId, ''),
      'target_url': Vue.prototype.notEmpty(info.link, ''),
      'rank': `maNum_${info.sequence}`
    };
    this.ma_track('activity_click', activityInfo)
  },
  // banner位置映射
  activityLocationName: {
    MAIN_ICON: '主banner下方'
  }
}

/********************************* ↑↑↑↑↑↑ 易观统计 ↑↑↑↑↑↑ *********************************/
