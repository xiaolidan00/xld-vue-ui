import { createApp } from 'vue';
import App from './App.vue';
import Comps from '../index';

const app = createApp(App);
app.use(Comps);
app.mount('#app');
