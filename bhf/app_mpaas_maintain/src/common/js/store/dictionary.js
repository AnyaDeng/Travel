let transferData = require('../json/transferData.json');

const dictionaryList = {
	state: {
		dictionaryList: transferData,
    fileUrl: 'https://wf-public.bhfae.com',
    h5Url: 'https://h5-cdn.bhfae.com',
    keyBoard_confuse_switch: '',
    productId: '',
    rateDisplayType: '0',
    lastLoginDate: '',
    isPause: false,
    updateUrl: '',
    AppVersion: '',
    passWordSecret: '',
    assetsIconList: [],  //[我的]页面顶部icon
    bankProductModuleList: []
	},
	mutations: {
		setTransfer: (state, dbDicts) => {
			state.dictionaryList[dbDicts.objName] = dbDicts.obj;
		}
	},
	actions: {
		GenerateDicts({
			commit
		}, data) {
			return new Promise(resolve => {
				const { dbDatas } = data;
				commit('setTransfer', data);
				resolve();
			})
		}
	}
}

export default dictionaryList
