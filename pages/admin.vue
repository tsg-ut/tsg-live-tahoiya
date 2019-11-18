<template>
	<div class="container">
		<theme-control
			v-for="theme of tahoiyaThemes"
			:id="theme.id"
			:key="theme.ruby"
		/>
		<theme-control
			v-if="isAdding"
			:id="null"
			@submit="onAddComplete"
		/>
		<button
			type="submit"
			class="button is-primary"
			@click="onAdd"
		>
			追加
		</button>
	</div>
</template>

<script>
import ThemeControl from '~/components/ThemeControl.vue';
import {mapState} from 'vuex';

export default {
	components: {ThemeControl},
	data() {
		return {
			isAdding: false,
		};
	},
	computed: {
		...mapState({
			tahoiyaThemes: (state) => state.tsgliveTahoiyaThemes.list.slice().sort((a, b) => a.date.seconds - b.date.seconds),
		}),
	},
	mounted() {
		this.$store.dispatch('tsgliveTahoiyaThemes/initList');
	},
	methods: {
		onAdd() {
			this.isAdding = true;
		},
		onAddComplete() {
			this.isAdding = false;
		},
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
