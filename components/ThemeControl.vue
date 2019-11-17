<template>
	<form @submit="onSubmit">
		<div class="field">
			<label class="label">単語</label>
			<div class="control">
				<input
					v-model="word"
					class="input"
					type="text"
					:disabled="isSubmitting"
				>
			</div>
		</div>

		<div class="field">
			<label class="label">読み</label>
			<div class="control">
				<input
					v-model="ruby"
					class="input"
					type="text"
					:disabled="isSubmitting"
				>
			</div>
		</div>

		<div class="field">
			<label class="label">解説</label>
			<div class="control">
				<textarea
					v-model="description"
					class="textarea"
					:disabled="isSubmitting"
				/>
			</div>
		</div>

		<div class="field is-grouped">
			<div class="control">
				<button
					type="submit"
					class="button is-link"
					:class="{'is-loading': isSubmitting}"
					:disabled="isSubmitting"
				>
					更新
				</button>
			</div>
		</div>
	</form>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	props: {
		id: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			themeId: null,
			word: '',
			ruby: '',
			meanings: [],
			description: '',
			isSubmitting: false,
		};
	},
	computed: {
		...mapGetters({
			getTheme: 'tsgliveTahoiyaThemes/getTheme',
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('tsgliveTahoiyaThemes/bindList');
		}
	},
	async mounted() {
		this.themeId = this.id;
		await this.$store.dispatch('tsgliveTahoiyaThemes/initList');
		const theme = await this.getTheme(this.id);
		this.word = theme.word;
		this.ruby = theme.ruby;
		this.description = theme.description;
	},
	methods: {
		async onSubmit(event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;
			const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/theme', {
				method: 'PATCH',
				mode: 'cors',
				body: new URLSearchParams({
					id: this.themeId,
					word: this.word,
					ruby: this.ruby,
					description: this.description,
				}),
			});
			const data = await res.text();
			this.isSubmitting = false;
			console.log(data);
		},
	},
	head() {
		return {
			title: 'TSG LIVE! たほいやシステム',
		};
	},
};
</script>
