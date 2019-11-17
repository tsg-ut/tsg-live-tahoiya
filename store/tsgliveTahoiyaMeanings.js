import db from '~/components/utils/db.js';
import {firestoreAction} from 'vuexfire';

const tsgliveTahoiyaMeaningsRef = db.collection('tsglive_tahoiya_meanings');

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
		await bindFirestoreRef('list', tsgliveTahoiyaMeaningsRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
