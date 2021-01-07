import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import cartsModules from './cart';

Vue.use(Vuex);  

// 把Vuex.Store匯出給main.js匯入使用
export default new Vuex.Store({   
    strict: true,
    state: {
        isLoading: false,
        products: [],
        product: {},
        order: {
            user: {},
        },
        categories: [], 
        myFavorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
    },
    actions: {
        updateLoading(context, status) {
          context.commit('LOADING', status);
        },
        getProducts(context){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                console.log('getProducts' ,response.data);
                context.commit('GET_PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);
                context.commit('LOADING', false);
            });
        },
        getProduct(context, id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                console.log('取得單一商品資料' ,response.data);
                context.commit('GET_PRODUCT', response.data.product);
                $('#productModal').modal('show');
                context.commit('LOADING', false);
            });
        },
        addMyFavorite (context, id) {
            context.commit('ADD_MYFAVORITE', id)
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
                context.dispatch('cartsModules/getCart');
                context.commit('LOADING', false);
            });
        },
        
    },
    mutations: {
        LOADING(state, status) {
          state.isLoading = status;
        },
        GET_PRODUCTS(state, payload) {
            state.products = payload;
        },
        GET_PRODUCT(state, payload) {
            state.product = payload;
        },
        GET_ORDER(state, payload) {
            state.order = payload;
        },
        CATEGORIES(state, payload) {
            const categories = new Set();
            payload.forEach((item) => {
              categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
        ADD_MYFAVORITE (state, id) {
            const index = state.myFavorite.findIndex(function (item) {
                return item === id
            })
            if (index === -1) {
                state.myFavorite.push(id)
                console.log('加入最愛' , id);
            } else {
                state.myFavorite.splice(index, 1)
                console.log('移除最愛');
            }
            localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
        },
    },
    getters: {
        isLoading: (state) => state.isLoading,
        products: (state) => state.products,
        product: (state) => state.product,
        order: (state) => state.order,
        categories: (state) => state.categories,
        myFavorite: (state) => state.myFavorite,
    },
    modules: {
        // productsModules,
        cartsModules,
    },
});
