import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/sw.js');
};

export default app;