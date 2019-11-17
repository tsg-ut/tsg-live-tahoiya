import {vuexfireMutations} from 'vuexfire';

const localState = () => ({
	uid: null,
	token: null,
});

const localMutations = {
	setUid(state, uid) {
		state.uid = uid;
	},
	setToken(state, token) {
		state.token = token;
	},
	...vuexfireMutations,
};

const localGetters = {
};

const localActions = {
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
