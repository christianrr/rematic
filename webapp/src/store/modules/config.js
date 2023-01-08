import * as types from '@/store/mutation-types';
import { extractKey, extractType } from '@/utils/utils.js';
import Vue from 'vue';

const getters = {
    config: state => state.config,
    sysvars: state => state.sysvars,
    values: state => state.values,
    data: state => state.data,
    dashboard: state => state.dashboard,
    rooms: state => state.rooms,
    room: state => state.room,
    categories: state => state.categories,
    category: state => state.category
};

const actions = {
    getConfig({ commit, dispatch, state, rootState }) {
        let appName = rootState.connection.server.app;
        if (!appName) return;
        this._vm.$socket.client.emit('cmd', { type: 'msg', appName: appName, value: 'WebApp connected' });
        console.log('requested config: ' + appName);
        this._vm.$socket.client.emit('getConfig', appName, config => {
            console.log('received config:');
            console.log(config);
            if (config && config.config) commit('SET_CONFIG', config.config);
            if (config && config.data.values) commit('SET_VALUES', config.data.values);
            if (config && config.data.sysvar) commit('SET_SYSVARS', config.data.sysvar);
            dispatch('setLoading', false);
            commit('SET_DASHBOARD', config.config.elements);
            commit('SET_CATEGORIES', config.config.elements);
            commit('SET_ROOMS', config.config.elements);
            if (state.roomId) {
                dispatch('setRoom', state.roomId);
            }
            if (state.categoryId) {
                dispatch('setCategory', state.categoryId);
            }
        });
    },
    setSysvar({ commit }, payload) {
        // console.log('set sysvar:' + JSON.stringify(payload));
        this._vm.$socket.client.emit('cmd', {
            type: 'hm',
            method: 'setVariable',
            name: payload.sysvar.name,
            value: payload.sysvar.value
        });
        commit('SET_SYSVAR', payload.sysvar);
    },
    setChannel({ commit }, payload) {
        // console.log('set channel:' + JSON.stringify(payload));
        this._vm.$socket.client.emit('cmd', {
            type: 'hm',
            method: 'setValue',
            iface: payload.channel.iface,
            address: payload.channel.channel,
            datapoint: payload.channel.datapoint,
            value: payload.value
        });
        commit('SET_EVENT', payload.channel);

        payload.channel.locked = true;
        setTimeout(() => {
            payload.channel.locked = false;
        }, 1000);
    },
    setChannels({ commit }, payload) {
        // console.log('set channel:' + JSON.stringify(payload));
        const cmds = payload.map(cmd => {
            return {
                type: 'hm',
                method: 'setValue',
                iface: cmd.channel.iface,
                address: cmd.channel.channel,
                datapoint: cmd.channel.datapoint,
                value: cmd.value,
                delay: cmd.delay
            };
        });
        console.log(cmds);
        this._vm.$socket.client.emit('cmds', cmds);

        for(let cmd of payload) {
            commit('SET_EVENT', cmd.channel);

            cmd.channel.locked = true;
            setTimeout(() => {
                cmd.channel.locked = false;
            }, 1000);
        }
    },
    setProgram({ commit }, payload) {
        // console.log('launch program:' + JSON.stringify(payload));
        this._vm.$socket.client.emit('cmd', { type: 'hm', method: 'programExecute', name: payload.program.name });
        commit('SET_PROGRAM', payload.program);
    },
    setMsg({ commit, rootState }, payload) {
        //console.log('send msg:' + JSON.stringify(payload));
        if (rootState.connection.server && rootState.connection.server.app) {
            let appName = rootState.connection.server.app;
            this._vm.$socket.client.emit('cmd', { type: 'msg', appName: appName, value: payload.msg });
            commit('SET_MSG', payload.msg);
        }
    },
    socket_event({ commit }, event) {
        // called by vue-socket.io-extended, when event is emmitted
        commit('SET_EVENT', event);
    },
    socket_sysvar({ commit }, sysvar) {
        // called by vue-socket.io-extended, when sysvar is emmitted
        commit('SET_SYSVAR', sysvar);
    },
    socket_data({ commit }, data) {
        // called by vue-socket.io-extended, when data is emmitted
        if (data.topic === 'event') commit('SET_EVENT', data.payload);
        else if (data.topic === 'program') commit('SET_PROGRAM', data.payload);
        else if (data.topic === 'sysvar') commit('SET_SYSVAR', data.payload);
        else commit('SET_DATA', data);
    },
    setRoom({ commit, state }, id) {
        commit('SET_ROOM_ID', id);
        var room = state.rooms.find(item => item.name == id);
        if (room) commit('SET_ROOM', room);
    },
    setCategory({ commit, state }, id) {
        commit('SET_CATEGORY_ID', id);
        var category = state.categories.find(item => item.name == id);
        if (category) commit('SET_CATEGORY', category);
    }
};

const mutations = {
    [types.SET_CONFIG](state, config) {
        state.config = config;
    },
    [types.SET_VALUES](state, values) {
        state.values = values;
    },
    [types.SET_SYSVARS](state, sysvar) {
        state.sysvars = sysvar;
    },
    [types.SET_EVENT](state, event) {
         console.log('event ' + event.datapointName + ' updated');
        var values = state.values;
        var existing = values[event.datapointName];
        if (existing && existing.locked) return;
        Vue.set(state.values, event.datapointName, event);
    },
    [types.SET_SYSVAR](state, sysvar) {
        // console.log('sysvar ' + sysvar.name + ' updated: ' + JSON.stringify(sysvar));
        Vue.set(state.sysvars, sysvar.name, sysvar);
    },
    [types.SET_PROGRAM](state, program) {
        state.lastProgram = program;
        // console.log('program: ' + program.name + ' updated');
    },
    [types.SET_MSG](state, message) {
        state.lastMsg = message;
        // console.log('message: ' + message);
    },
    [types.SET_DATA](state, data) {
        //console.log('data: ' + JSON.stringify(data));
        Vue.set(state.data, data.topic, data.payload);
    },
    [types.SET_DASHBOARD](state, config) {
        let dashboardGroups = [];
        if (config) {
            config.forEach(item => {
                if (item.parent === 'Dashboard') dashboardGroups = item.items;
            });
            dashboardGroups.forEach(group => {
                group.items.forEach(item => {
                    if (item.source) item.sourceKey = extractKey(item.source);
                    if (item.source) item.sourceType = extractType(item.source);
                    if (item.param) item.paramKey = extractKey(item.param);
                });
            });
        }
        state.dashboard = dashboardGroups;
        // console.log(state.dashboard);
    },
    [types.SET_CATEGORIES](state, config) {
        var categories = [];
        if (config) {
            config.forEach(item => {
                if (item.parent === 'Kategorien') categories.push(item);
            });
            categories.forEach(cat => {
                cat.items.forEach(group => {
                    group.items.forEach(item => {
                        if (item.source) item.sourceKey = extractKey(item.source);
                        if (item.source) item.sourceType = extractType(item.source);
                        if (item.param) item.paramKey = extractKey(item.param);
                    });
                });
            });
            // sort by visibility and order
            categories = categories.sort(function(a, b) {
                if (a.show === 'true' && b.show === 'false') return -1;
                if (b.show === 'false' && b.show === 'true') return 1;
                if (a.show === b.show) {
                    return parseInt(a.order) - parseInt(b.order);
                }
            });
        }
        state.categories = categories;
        // console.log(state.categories);
    },
    [types.SET_CATEGORY](state, category) {
        state.category = category;
    },
    [types.SET_CATEGORY_ID](state, categoryId) {
        state.categoryId = categoryId;
    },
    [types.SET_ROOMS](state, config) {
        var rooms = [];
        if (config) {
            config.forEach(item => {
                if (item.parent === 'Räume') rooms.push(item);
            });
            rooms.forEach(room => {
                room.items.forEach(group => {
                    group.items.forEach(item => {
                        if (item.source) item.sourceKey = extractKey(item.source);
                        if (item.source) item.sourceType = extractType(item.source);
                        if (item.param) item.paramKey = extractKey(item.param);
                    });
                });
            });
            // sort by visibility and order
            rooms = rooms.sort(function(a, b) {
                if (a.show === 'true' && b.show === 'false') return -1;
                if (b.show === 'false' && b.show === 'true') return 1;
                if (a.show === b.show) {
                    return parseInt(a.order) - parseInt(b.order);
                }
            });
        }
        state.rooms = rooms;
        // console.log(state.rooms);
    },
    [types.SET_ROOM](state, room) {
        state.room = room;
    },
    [types.SET_ROOM_ID](state, roomId) {
        state.roomId = roomId;
    }
};

const state = {
    config: undefined,
    values: [],
    sysvars: [],
    data: [],
    dashboard: [],
    rooms: [],
    room: {},
    roomId: '',
    categories: [],
    category: {},
    categoryId: '',
    lastProgram: undefined,
    lastMsg: undefined
};

export default {
    state,
    getters,
    actions,
    mutations
};
