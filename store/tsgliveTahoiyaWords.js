import db from '~/components/utils/db.js';
import {firestoreAction} from 'vuexfire';

const tsgliveTahoiyaWordsRef = db.collection('tsglive_tahoiya_words');

const localState = () => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	initList(state) {
		state.isInitList = process.browser;
	},
};

const localGetters = {
	list: (state) => state.list,
};

const localActions = {
	async initList({state, dispatch, commit}) {
		if (!state.isInitList) {
			await dispatch('bindList');
			commit('initList');
		}
	},
	bindList: firestoreAction(async ({bindFirestoreRef}) => {
		await bindFirestoreRef('list', tsgliveTahoiyaWordsRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
