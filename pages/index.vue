<template>
	<div>
		<div class="index-header">
			<img src="logo.svg">
			<p>
				オープニングトーク特別企画「たほいや」<br>
				視聴者参加フォーム
			</p>
		</div>
		<div class="container has-text-centered">
			<label class="label">よろしければお名前をどうぞ</label>
			<input
				v-model="username"
				class="input"
				type="text"
			>
			<hr>
			<theme-submit
				v-for="theme in themes"
				:id="theme.id"
				:key="theme.id"
				:ruby="theme.ruby"
				:username="username"
			/>
		</div>
	</div>
</template>

<script>
import ThemeSubmit from '~/components/ThemeSubmit.vue';
import {mapState} from 'vuex';

export default {
	components: {ThemeSubmit},
	data() {
		return {
			username: '匿名希望',
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

<style>
.index-header {
	background: #1c2123;
	padding: 1rem;
	text-align: center;
	color: white;
}
.index-header img {
	max-width: 40rem;
}
</style>
