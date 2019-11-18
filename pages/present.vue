<template>
	<div
		class="background"
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
			<div class="pr">
				<img src="~/assets/qrcode.png">
				<div class="info">
					<div class="font-small">視聴者の皆さんも参加できます！</div>
					<div class="font-medium">tahoiya.tsg.ne.jp</div>
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
.background.dark {
	background-color: #191919;
	color: #ecebde;
}
.phase {
	position: relative;
	width: 100vw;
	height: 100vh;
}
.phase .font-xxlarge {
	font-size: 15vmin;
}
.phase .font-xlarge {
	font-size: 11vmin;
}
.phase .font-large {
	font-size: 8vmin;
}
.phase .font-medium {
	font-size: 6vmin;
}
.phase .font-small {
	font-size: 4vmin;
}
.phase .pr {
	position: absolute;
	bottom: 2vmin;
	left: 2vmin;

	display: flex;
}
.phase .pr img {
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
</style>
