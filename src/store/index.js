import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);  

// 把Vuex.Store匯出給main.js匯入使用
export default new Vuex.Store({   
    strict: true,
    state: {
        status: {
            isLoading: false,  
        } 
    },
    actions: {
        updateLoading(context, status) {
          context.commit('LOADING', status);
        },
    },
    mutations: {
        LOADING(state, status) {
          state.status.isLoading = status;
        },
    },
    getters: {
        isLoading: state => state.isLoading,
    },

});
