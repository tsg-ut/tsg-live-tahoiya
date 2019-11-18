<template>
	<form class="ThemeControl" @submit="onSubmit">
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

		<div v-if="id !== null" class="field">
			<label class="label">ダミー選択肢</label>
			<div class="content">
				<ul>
					<li v-for="dummy in meanings" :key="dummy.id">
						<span class="has-text-success">{{dummy.isAccepted ? '✔' : ''}}</span>
						{{dummy.text}} ({{dummy.username}})
						<button
							type="button"
							class="button is-link is-small"
							:class="{
								'is-loading': isSubmitting,
							}"
							:disabled="isSubmitting"
							@click="onToggleAcceptDummy(dummy, $event)"
						>
							{{dummy.isAccepted ? '不採用' : '採用'}}
						</button>
						<button
							type="button"
							class="button is-danger is-small"
							:class="{
								'is-loading': isSubmitting,
							}"
							:disabled="isSubmitting"
							@click="onDeleteDummy(dummy, $event)"
						>
							削除
						</button>
					</li>
				</ul>
			</div>
			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<p class="control is-expanded">
							<input
								v-model="dummyText"
								class="input"
								type="text"
								placeholder="意味"
								:disabled="isSubmitting"
							>
						</p>
					</div>
					<div class="field">
						<p class="control is-expanded">
							<input
								v-model="dummyUser"
								class="input"
								type="text"
								placeholder="名前"
								:disabled="isSubmitting"
							>
						</p>
					</div>
					<div class="field">
						<p class="control is-expanded">
							<button
								type="button"
								class="button is-primary"
								:class="{
									'is-loading': isSubmitting,
								}"
								:disabled="isSubmitting"
								@click="onAddDummy"
							>
								ダミー追加
							</button>
						</p>
					</div>
				</div>
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
		<hr>
	</form>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

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
			description: '',
			dummyText: '',
			dummyUser: '',
			isSubmitting: false,
		};
	},
	computed: {
		...mapGetters({
			getTheme: 'tsgliveTahoiyaThemes/getTheme',
		}),
		...mapState(['token']),
		meanings() {
			const allMeanings = this.$store.state.tsgliveTahoiyaMeanings.list;
			const meanings = allMeanings.filter((meaning) => meaning.themeId === this.themeId);
			return meanings;
		},
	},
	async mounted() {
		this.themeId = this.id;
		await Promise.all([
			this.$store.dispatch('tsgliveTahoiyaThemes/initList'),
			this.$store.dispatch('tsgliveTahoiyaMeanings/initList'),
		]);
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
						token: this.token,
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
						token: this.token,
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
					token: this.token,
					id: this.themeId,
				}),
			});
			const data = await res.text();
			console.log(data);
			this.isSubmitting = false;
		},
		async onAddDummy(event) {
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
					theme_id: this.themeId,
					text: this.dummyText,
					username: this.dummyUser,
				}),
			});
			const data = await res.text();
			console.log(data);
			this.isSubmitting = false;
			this.dummyText = '';
			this.dummyUser = '';
		},
		async onToggleAcceptDummy(dummy, event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;
			const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/meaning/accept', {
				method: dummy.isAccepted ? 'DELETE' : 'POST',
				mode: 'cors',
				body: new URLSearchParams({
					token: this.token,
					meaning_id: dummy.id,
				}),
			});
			const data = await res.text();
			console.log(data);
			this.isSubmitting = false;
		},
		async onDeleteDummy(dummy, event) {
			if (this.isSubmitting) {
				return;
			}
			event.preventDefault();
			this.isSubmitting = true;
			const res = await fetch('https://us-central1-hakatashi.cloudfunctions.net/tsglive/tahoiya/meaning', {
				method: 'DELETE',
				mode: 'cors',
				body: new URLSearchParams({
					token: this.token,
					id: dummy.id,
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
