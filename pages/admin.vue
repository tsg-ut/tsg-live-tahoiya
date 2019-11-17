<template>
	<div class="container">
		<theme-control
			v-for="theme of tahoiyaThemes"
			:id="theme.id"
			:key="theme.ruby"
		/>
	</div>
</template>

<script>
import ThemeControl from '~/components/ThemeControl.vue';
import {mapState} from 'vuex';

export default {
	components: {ThemeControl},
	data() {
		return {
		};
	},
	computed: {
		...mapState({
			tahoiyaThemes: (state) => state.tsgliveTahoiyaThemes.list,
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('tsgliveTahoiyaThemes/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('tsgliveTahoiyaThemes/initList');
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
