<template>
	<form
		class="ThemeSubmit"
		@submit="onSubmit"
	>
		<div class="title">
			{{ruby}}
		</div>
		<div class="subtitle">
			の「辞書に載ってそうな意味」を考えてください⋯⋯
		</div>

		<div class="field">
			<div class="control">
				<input
					v-if="meaning === undefined"
					v-model="text"
					class="input"
					type="text"
					placeholder="意味"
					:disabled="isSubmitting || meaning !== undefined"
				>
				<input
					v-else
					:value="meaning.text"
					class="input"
					type="text"
					placeholder="意味"
					:disabled="isSubmitting || meaning !== undefined"
				>
			</div>
		</div>

		<div class="field has-text-centered">
			<button
				type="submit"
				class="button"
				:class="{
					'is-loading': isSubmitting,
					'is-link': meaning === undefined,
					'is-white': meaning !== undefined,
				}"
				:disabled="isSubmitting || meaning !== undefined"
			>
				{{meaning === undefined ? '送信' : '登録済みです'}}
			</button>
		</div>
		<div class="has-text-danger has-text-centered is-size-7">※送信したら取り消せません</div>
		<hr>
	</form>
</template>

<script>
import {mapState} from 'vuex';

export default {
	props: {
		id: {
			type: String,
			default: null,
		},
		ruby: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			text: '',
			isSubmitting: false,
		};
	},
	computed: {
		...mapState(['token', 'uid']),
		meaning() {
			const allMeanings = this.$store.state.tsgliveTahoiyaMeanings.list;
			console.log(allMeanings);

			return allMeanings.find((meaning) => meaning.themeId === this.id && meaning.uid === this.uid);
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await Promise.all([
				store.dispatch('tsgliveTahoiyaThemes/bindList'),
				store.dispatch('tsgliveTahoiyaMeanings/bindList'),
			]);
		}
	},
	async mounted() {
		this.themeId = this.id;
		await Promise.all([
			this.$store.dispatch('tsgliveTahoiyaThemes/initList'),
			this.$store.dispatch('tsgliveTahoiyaMeanings/initList'),
		]);
	},
	methods: {
		async onSubmit(event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;

			const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/meaning', {
				method: 'POST',
				mode: 'cors',
				body: new URLSearchParams({
					token: this.token,
					theme_id: this.id,
					text: this.text,
					username: '匿名希望',
				}),
			});

			const data = await res.text();
			console.log(data);

			this.isSubmitting = false;
		},
	},
};
</script>

<style>
.ThemeSubmit .title {
	font-family: serif;
	font-weight: 900;
	font-size: 12vmin;
	text-align: center;
}
.ThemeSubmit .subtitle {
	font-size: 3.4vmin;
	text-align: center;
}
</style>
