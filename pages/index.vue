<template>
	<div class="container">
		<theme-submit
			v-for="theme in themes"
			:id="theme.id"
			:key="theme.id"
			:ruby="theme.ruby"
		/>
	</div>
</template>

<script>
import ThemeSubmit from '~/components/ThemeSubmit.vue';
import {mapState} from 'vuex';

export default {
	components: {ThemeSubmit},
	data() {
		return {
		};
	},
	computed: {
		...mapState({
			themes: (state) => state.tsgliveTahoiyaThemes.list.slice().sort((a, b) => a.date.seconds - b.date.seconds),
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('tsgliveTahoiyaThemes/bindList');
		}
	},
	async mounted() {
		await Promise.all([
			this.$store.dispatch('tsgliveTahoiyaThemes/initList'),
			this.$store.dispatch('tsgliveTahoiyaMeanings/initList'),
		]);
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
		},
	},
	head() {
		return {
			title: 'TSG LIVE! 登録フォーム',
		};
	},
};
</script>
