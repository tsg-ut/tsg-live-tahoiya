<template>
	<div>
		<nuxt/>
		<footer class="footer">
			<div class="content has-text-centered">
				<p>
					tsg-live-tahoiya ●
					by <a href="https://github.com/hakatashi">@hakatashi</a> ●
					<a href="https://github.com/tsg-ut/tsg-live-tahoiya">GitHub</a>
				</p>
				<p>
					uid: {{uid}}
				</p>
			</div>
		</footer>
	</div>
</template>

<script>
import firebase from '~/components/utils/firebase.js';
import {mapState} from 'vuex';

export default {
	data() {
		return {
			isActive: false,
		};
	},
	computed: {
		...mapState(['uid']),
	},
	async mounted() {
		const {user} = await firebase.auth().signInAnonymously();
		this.$store.commit('setUid', user.uid);
		const token = await user.getIdToken();
		this.$store.commit('setToken', token);
	},
};
</script>

<style>
html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	min-height: 100%;
	background-color: #ecebde;
}

.container {
	padding: 2rem 1rem 0 1rem;
}

.footer {
	margin-top: 1rem;
	background: transparent;
}
</style>
