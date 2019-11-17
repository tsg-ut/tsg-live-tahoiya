import db from '~/components/utils/db.js';
import {firestoreAction} from 'vuexfire';

const tsgliveTahoiyaThemesRef = db.collection('tsglive_tahoiya_themes');

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
	getTheme: (state) => (id) => state.list.find((theme) => theme.id === id),
};

const localActions = {
	async initList({state, dispatch, commit}) {
		if (!state.isInitList) {
			commit('initList');
			await dispatch('bindList');
		}
	},
	bindList: firestoreAction(async ({bindFirestoreRef}) => {
		await bindFirestoreRef('list', tsgliveTahoiyaThemesRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
