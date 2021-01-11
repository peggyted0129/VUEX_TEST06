import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import productModules from '@/store/modules/product';
import cartsModules from '@/store/modules/cart';
import alertModules from '@/store/modules/alertMessage';

Vue.use(Vuex);  

// 把Vuex.Store匯出給main.js匯入使用
export default new Vuex.Store({   
    strict: true,
    state: {
        isLoading: false,
        order: {
            user: {},
        },
    },
    actions: {
        updateLoading(context, status) {
          context.commit('LOADING', status);
        },
        getOrder(context, orderId){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                console.log('getOrder', response.data);
                context.commit('GET_ORDER', response.data.order);
                context.commit('LOADING', false);
            });
        },
        payOrder(context, orderId){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
            context.commit('LOADING', true);
            axios.post(api).then((response) => {
                console.log('payOrder', response.data);
                if (response.data.success) {
                    context.dispatch('getOrder', orderId);
                }
                context.commit('LOADING', false);
            });
        },
        addCouponCode(context, coupon_code){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
            const coupon = {
                code: coupon_code,
            };
            context.commit('LOADING', true);
            axios.post(api, {data: coupon} ).then((response) => {
                console.log('coupon: ', response.data );
                context.dispatch('alertModules/updateMessage', { message: `${response.data.message}`, status: 'info' });
                context.dispatch('cartsModules/getCart');
                context.commit('LOADING', false);
            });
        },
    },
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        GET_ORDER(state, payload) {
            state.order = payload;
        },
    },
    getters: {
        isLoading: (state) => state.isLoading,
        order: (state) => state.order,
    },
    modules: {
        cartsModules,
        alertModules,
        productModules,
    },
});
