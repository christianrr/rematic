import * as types from '@/store/mutation-types';

const getters = {
    showLoading: state => state.showLoading
};

const actions = {
    setLoading({ commit }, loading) {
        commit(types.SHOW_LOADING, loading);
    }
};

const mutations = {
    [types.SHOW_LOADING](state, value) {
        state.showLoading = value;
    }
};

const state = {
    showLoading: false
};

export default {
    state,
    getters,
    actions,
    mutations
};
