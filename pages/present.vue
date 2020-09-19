<template>
	<div
		class="present"
		:class="{
			dark: phase === 'word'
		}"
	>
		<div v-if="phase === 'title'" class="phase phase-title">
			<div class="contents">
				<div class="font-small">
					TSG LIVE! 5 オープニングトーク特別企画
				</div>
				<div class="bold font-xxlarge">
					たほいや
				</div>
			</div>
		</div>
		<div v-if="phase === 'word'" class="phase phase-word">
			<div class="contents">
				<div class="theme-index bold font-large">第{{themeIndex + 1}}問</div>
				<div class="bold font-xxlarge">{{theme.ruby}}</div>
				<div class="font-small">の「辞書に載っていそうな意味」を考えてください⋯⋯</div>
			</div>
		</div>
		<div v-if="phase === 'choices' || phase === 'answer'" class="phase phase-choices">
			<div class="contents">
				<div class="bold font-medium">「{{theme.ruby}}」の正しい意味は⋯⋯</div>
				<div class="thin font-xsmall font-align-right">参加者: {{participantsText}}</div>
				<ol class="choices font-small">
					<li
						v-for="(choice, index) in choices"
						:key="choice.id"
						class="choice"
						:class="{
							answer: phase === 'answer' && choice.type === 'answer'
						}"
					>
						{{choice.text}}
						<span
							v-if="getVotes(index + 1) !== 0"
							class="font-xsmall votes"
						>
							{{getVotes(index + 1)}}票
						</span>
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
		<div v-if="phase === 'description'" class="phase phase-description">
			<div class="contents">
				<div class="bold font-large">{{theme.word}}（{{theme.ruby}}）</div>
				<vue-markdown class="font-small content">{{theme.description}}</vue-markdown>
			</div>
		</div>
		<div v-if="phase === 'end'" class="phase phase-title">
			<div class="contents">
				<div class="bold font-xxlarge">おしまい</div>
			</div>
		</div>
		<div v-if="phase !== 'end'" class="pr">
			<img src="~/assets/qrcode.png">
			<div class="info">
				<div class="font-small">視聴者の皆さんも参加できます！</div>
				<div class="font-medium">tahoiya.tsg.ne.jp</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import {mapState} from 'vuex';

export default {
	components: {VueMarkdown},
	layout: 'present',
	data() {
		return {
			phase: 'title',
			themeIndex: 0,
			votes: [],
		};
	},
	computed: {
		...mapState({
			themes: (state) => state.tsgliveTahoiyaThemes.list.slice().sort((a, b) => parseInt(a.date - b.date)),
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
			if (!this.theme) {
				return [];
			}
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
		if (typeof io !== 'undefined') {
			const socket = global.io('http://localhost:8080/');
			socket.on('connect', () => {
				console.log('websocket connected');
			});
			socket.on('message', this.onMessage);
		}
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
				this.votes = [];
				this.phase = 'word';
			} else if (this.phase === 'word') {
				this.phase = 'choices';
			} else if (this.phase === 'choices') {
				this.phase = 'answer';
			} else if (this.phase === 'answer') {
				this.phase = 'description';
			} else if (this.phase === 'description') {
				if (this.themeIndex === this.themes.length - 1) {
					this.phase = 'end';
				} else {
					this.themeIndex++;
					this.votes = [];
					this.phase = 'word';
				}
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
					this.votes = [];
					this.phase = 'description';
				}
			} else if (this.phase === 'choices') {
				this.phase = 'word';
			} else if (this.phase === 'answer') {
				this.phase = 'choices';
			} else if (this.phase === 'description') {
				this.phase = 'answer';
			} else if (this.phase === 'end') {
				this.themeIndex = this.themes.length - 1;
				this.votes = [];
				this.phase = 'description';
			}
		},
		onMessage(event) {
			if (!event.text.match(/^\d+$/)) {
				return;
			}
			const choice = parseInt(event.text);
			if (choice < 1 || choice > this.choices.length) {
				return;
			}
			const vote = this.votes.find((vote) => (
				vote.type !== 'anonymous' &&
				vote.username === event.username &&
				vote.type === event.type
			));
			if (vote) {
				vote.choice = choice;
			} else {
				this.votes.push({
					type: event.type,
					username: event.username,
					choice,
				});
			}
		},
		getVotes(choice) {
			const votes = this.votes.filter((vote) => vote.choice === choice);
			return votes.length;
		},
	},
	head() {
		return {
			title: 'TSG LIVE! 特別企画「たほいや」',
			htmlAttrs: {
				class: 'present',
			},
		};
	},
};
</script>

<style>
html.present {
	overflow-y: hidden;
}
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
.phase-choices .votes {
	display: inline-block;
	color: #ecebde;
	background: #191919;
	padding: 0.1vmin 1.2vmin;
	border-radius: 0.6vmin;
	vertical-align: middle;
}
.phase-choices .answer .votes {
	background: #F44336;
}
.phase-description .contents {
	padding: 5vmin;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.phase-description .contents .content {
	flex: 1 0 0;
	overflow-y: auto;
	margin: 0 0 13vmin;
	line-height: 1.3em;
}
.phase-description .contents .content strong {
	color: #F44336;
}
.phase-description .contents .content li + li {
	margin-top: 2vmin;
}
</style>
