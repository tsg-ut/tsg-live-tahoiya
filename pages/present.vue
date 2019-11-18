<template>
	<div
		class="present"
		:class="{
			dark: phase === 'word'
		}"
	>
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
		<div v-if="phase === 'word'" class="phase phase-word">
			<div class="contents">
				<div class="theme-index bold font-large">第{{themeIndex + 1}}問</div>
				<div class="bold font-xxlarge">{{theme.ruby}}</div>
				<div class="font-small">の「辞書に載ってそうな意味」を考えてください⋯⋯</div>
			</div>
		</div>
		<div v-if="phase === 'choices' || phase === 'answer'" class="phase phase-choices">
			<div class="contents">
				<div class="bold font-medium">「{{theme.ruby}}」の正しい意味は⋯⋯</div>
				<div class="thin font-xsmall font-align-right">参加者: {{participantsText}}</div>
				<ol class="choices font-small">
					<li
						v-for="choice in choices"
						:key="choice.id"
						class="choice"
						:class="{
							answer: phase === 'answer' && choice.type === 'answer'
						}"
					>
						{{choice.text}}
						<span
							v-if="phase === 'answer' && choice.type === 'dummy'"
							class="font-xsmall thin"
						>
							{{choice.username}}
						</span>
					</li>
				</ol>
			</div>
		</div>
		<div class="pr">
			<img src="~/assets/qrcode.png">
			<div class="info">
				<div class="font-small">視聴者の皆さんも参加できます！</div>
				<div class="font-medium">tahoiya.tsg.ne.jp</div>
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
			themeIndex: 0,
		};
	},
	computed: {
		...mapState({
			themes: (state) => state.tsgliveTahoiyaThemes.list.slice().sort((a, b) => a.date.seconds - b.date.seconds),
		}),
		theme() {
			return this.themes[this.themeIndex];
		},
		meanings() {
			const allMeanings = this.$store.state.tsgliveTahoiyaMeanings.list;
			const meanings = allMeanings.filter((meaning) => meaning.themeId === this.theme.id && meaning.isAccepted);
			return meanings;
		},
		choices() {
			const choices = [
				...this.meanings.map((meaning) => ({
					type: 'dummy',
					id: meaning.id,
					text: meaning.text,
					username: meaning.username,
				})),
				{
					type: 'answer',
					id: this.theme.id,
					text: this.theme.meaning,
				},
			];
			return choices.sort((a, b) => a.id.localeCompare(b.id));
		},
		participantsText() {
			return this.meanings.map((choice) => choice.username).sort().join(' / ');
		},
	},
	async mounted() {
		await Promise.all([
			this.$store.dispatch('tsgliveTahoiyaThemes/initList'),
			this.$store.dispatch('tsgliveTahoiyaMeanings/initList'),
		]);
		window.addEventListener('keydown', this.onKeydown);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.onKeydown);
	},
	methods: {
		onKeydown(event) {
			if (event.key === 'ArrowRight') {
				this.next();
			}
			if (event.key === 'ArrowLeft') {
				this.prev();
			}
		},
		next() {
			if (this.phase === 'title') {
				this.themeIndex = 0;
				this.phase = 'word';
			} else if (this.phase === 'word') {
				this.phase = 'choices';
			} else if (this.phase === 'choices') {
				this.phase = 'answer';
			} else if (this.phase === 'answer') {
				this.phase = 'description';
			} else if (this.phase === 'description') {
				this.themeIndex++;
				this.phase = 'word';
			}
		},
		prev() {
			if (this.phase === 'title') {
				// nop
			} else if (this.phase === 'word') {
				if (this.themeIndex === 0) {
					this.phase = 'title';
				} else {
					this.themeIndex--;
					this.phase = 'description';
				}
			} else if (this.phase === 'choices') {
				this.phase = 'word';
			} else if (this.phase === 'answer') {
				this.phase = 'choices';
			} else if (this.phase === 'description') {
				this.phase = 'answer';
			}
		},
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
	font-weight: 700;
}
.thin {
	font-weight: 200;
}
.present {
	position: relative;
}
.present.dark {
	background-color: #191919;
	color: #ecebde;
}
.present, .phase {
	width: 100vw;
	height: 100vh;
}
.present .font-xxlarge {
	font-size: 15vmin;
}
.present .font-xlarge {
	font-size: 11vmin;
}
.present .font-large {
	font-size: 8vmin;
}
.present .font-medium {
	font-size: 6vmin;
}
.present .font-small {
	font-size: 4vmin;
}
.present .font-xsmall {
	font-size: 2.5vmin;
}
.present .font-xxsmall {
	font-size: 1.5vmin;
}
.present .font-align-right {
	text-align: right;
}
.present .pr {
	position: absolute;
	bottom: 2vmin;
	left: 2vmin;

	display: flex;
}
.present .pr img {
	width: 15vmin;
	height: 15vmin;
	margin-right: 2vmin;
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
.phase-word .contents {
	text-align: right;
	padding: 15vmin 10vmin 0;
}
.phase-word .theme-index {
	display: inline-block;
	padding: 0.5vmin 3vmin;
	margin-bottom: 5vmin;
	border: 1vmin #ecebde solid;
	border-radius: 0.5vmin;
}
.phase-choices .contents {
	padding: 5vmin;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.phase-choices .choices {
	flex: 1 0 0;
	overflow-y: auto;
	margin: 5vmin 0 13vmin;
	padding-left: 10vmin;
}
.phase-choices .choice {
	margin-bottom: 0.5em;
}
.phase-choices .choice.answer {
	color: #F44336;
}
</style>
