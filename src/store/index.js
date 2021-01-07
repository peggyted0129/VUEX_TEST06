import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);  

// 把Vuex.Store匯出給main.js匯入使用
export default new Vuex.Store({   
    strict: true,
    state: {
        isLoading: false,
        products: [],
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
        addtoCart(context, {id, productQty}){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const cart = {
                product_id: id,
                qty: productQty,
            };
            context.commit('LOADING', true);
            axios.post(api, { data: cart }).then((response) => {
              console.log('加入購物車:', response.data);
            //   context.dispatch('getCart');
              context.commit('LOADING', false);
            });
        },
        addMyFavorite (context, id) {
            context.commit('ADD_MYFAVORITE', id)
        },
        
    },
    mutations: {
        LOADING(state, status) {
          state.isLoading = status;
        },
        GET_PRODUCTS(state, payload) {
            state.products = payload;
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
            } else {
                state.myFavorite.splice(index, 1)
            }
            localStorage.setItem('myFavorite', JSON.stringify(state.myFavorite))
        },
    },
    getters: {
        isLoading: (state) => state.isLoading,
        products: (state) => state.products,
        categories: (state) => state.categories,
        myFavorite: (state) => state.myFavorite,
    },

});
