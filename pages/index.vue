<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		{{tahoiyaWords}}
	</div>
</template>

<script>
import flatten from 'lodash/flatten.js';
import get from 'lodash/get.js';
import {mapState} from 'vuex';
import sum from 'lodash/sum.js';

export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState({
			tahoiyaWords: (state) => state.tsgliveTahoiyaWords.list,
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('tsgliveTahoiyaWords/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('tsgliveTahoiyaWords/initList');
	},
	methods: {
	},
	head() {
		return {
			title: 'TSG LIVE! たほいやシステム',
		};
	},
};
</script>

<style>
.index-icon {
	vertical-align: bottom;
}
</style>
