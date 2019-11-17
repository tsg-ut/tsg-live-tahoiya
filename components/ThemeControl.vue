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
			<label class="label">正しい意味</label>
			<div class="control">
				<input
					v-model="meaning"
					class="input"
					type="text"
					:disabled="isSubmitting"
				>
			</div>
		</div>

		<div class="field">
			<label class="label">解説 (Markdown)</label>
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
					class="button"
					:class="{
						'is-loading': isSubmitting,
						'is-link': id !== null,
						'is-primary': id === null,
					}"
					:disabled="isSubmitting"
				>
					{{id === null ? '追加' : '更新'}}
				</button>
			</div>
			<div v-if="id !== null" class="control">
				<button
					type="button"
					class="button is-danger"
					:disabled="isSubmitting"
					:class="{
						'is-loading': isSubmitting,
					}"
					@click="onDelete"
				>
					削除
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
			meaning: '',
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
		if (this.id !== null) {
			const theme = await this.getTheme(this.id);
			this.word = theme.word;
			this.ruby = theme.ruby;
			this.meaning = theme.meaning;
			this.description = theme.description;
		}
	},
	methods: {
		async onSubmit(event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;

			if (this.id === null) {
				const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/theme', {
					method: 'POST',
					mode: 'cors',
					body: new URLSearchParams({
						word: this.word,
						ruby: this.ruby,
						meaning: this.meaning,
						description: this.description,
					}),
				});
				const data = await res.text();
				console.log(data);
			} else {
				const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/theme', {
					method: 'PATCH',
					mode: 'cors',
					body: new URLSearchParams({
						id: this.themeId,
						word: this.word,
						ruby: this.ruby,
						meaning: this.meaning,
						description: this.description,
					}),
				});
				const data = await res.text();
				console.log(data);
			}
			this.$emit('submit');
			this.isSubmitting = false;
		},
		async onDelete(event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;
			const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/theme', {
				method: 'DELETE',
				mode: 'cors',
				body: new URLSearchParams({
					id: this.themeId,
				}),
			});
			const data = await res.text();
			console.log(data);
			this.isSubmitting = false;
		},
	},
	head() {
		return {
			title: 'TSG LIVE! たほいやシステム',
		};
	},
};
</script>
