import Vue from 'vue';
import App from './App.vue';
import { store } from '@/store';
import router from './router';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import '@/plugins/axios';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io({
	autoConnect: false, 
    transports: ["websocket"] 
});

Vue.use(VueSocketIOExt, socket, { store });

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
