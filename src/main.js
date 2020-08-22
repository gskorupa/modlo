import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        name: 'world'
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
};

async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register('fetch-news', {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log('Periodic Sync could not be registered!');
  }
}

export default app;