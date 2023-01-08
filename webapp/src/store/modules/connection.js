import * as types from '@/store/mutation-types';
import router from '@/router';

const getters = {
    server: state => state.server
};

const actions = {
    login({ commit, dispatch }, payload) {
        commit(types.SAVE_SERVER, payload);
        dispatch('connect');
        router.push({
            name: 'home'
        });
    },
    connect({ commit }) {
        let server = JSON.parse(localStorage.getItem('server'));
        if (!server) {
            server = { token: 'rematic1234' };
        }
        if(location.search.length > 1) server.app = location.search.replace(/\?\/?/, '').replace(/\/$/, '');
        commit(types.SAVE_SERVER, server);

        let path = location.pathname + '/backend';
        path = path.replace('//', '/');

        let url;
        if (process.env.NODE_ENV === 'development') {
            url = 'ws://192.168.1.9';
            path = '/addons/red/rematic/backend';
        }

        this._vm.$socket.client.query = 'app=' + server.app + '&token=' + server.token;
        this._vm.$socket.client.io.opts.query = 'app=' + server.app + '&token=' + server.token;
        if (url) this._vm.$socket.client.io.uri = url;
        if (path) this._vm.$socket.client.io.opts.path = path;
        this._vm.$socket.client.close();
        this._vm.$socket.client.open();
    },
    logout({ commit }) {
        window.localStorage.removeItem('server');
        commit(types.LOGOUT);
        this._vm.$socket.client.close();
        router.push({
            name: 'settings'
        });
    }
};

const mutations = {
    [types.LOGOUT](state) {
        state.server = null;
    },
    [types.SAVE_SERVER](state, server) {
        window.localStorage.setItem('server', JSON.stringify(server));
        state.server = server;
    }
};

const state = {
    server: undefined
};

export default {
    state,
    getters,
    actions,
    mutations
};
