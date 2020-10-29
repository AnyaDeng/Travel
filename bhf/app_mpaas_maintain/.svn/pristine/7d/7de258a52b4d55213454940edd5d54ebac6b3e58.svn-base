/**
 * Created by admin on 2017/8/30.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import dictionary from './dictionary'

Vue.use(Vuex);
export const store = new Vuex.Store({
	modules: {
		dictionary
	},
	getters: {
		dictionaryList: state => state.dictionary.dictionaryList
	}
});
export default store
