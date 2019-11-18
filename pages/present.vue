<template>
	<div>
		<div v-if="phase === 'title'" class="phase phase-title">
			<div class="contents">
				<div class="my-subtitle">
					TSG LIVE! 4 オープニングトーク特別企画
				</div>
				<div class="bold my-title">
					たほいや
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	layout: 'present',
	data() {
		return {
			phase: 'title',
		};
	},
	computed: {
		...mapState({
			themes: (state) => state.tsgliveTahoiyaThemes.list.slice().sort((a, b) => a.date.seconds - b.date.seconds),
		}),
	},
	async mounted() {
		await Promise.all([
			this.$store.dispatch('tsgliveTahoiyaThemes/initList'),
			this.$store.dispatch('tsgliveTahoiyaMeanings/initList'),
		]);
	},
	head() {
		return {
			title: 'TSG LIVE! 特別企画「たほいや」',
		};
	},
};
</script>

<style>
.bold {
	font-family: 'Noto Serif CJK JP', serif;
	font-weight: 900;
}
.phase {
	width: 100vw;
	height: 100vh;
}
.phase-title {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.phase-title .my-subtitle {
	font-size: 4vmin;
}
.phase-title .my-title {
	font-size: 14vmin;
}
</style>
