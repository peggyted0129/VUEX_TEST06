import axios from 'axios';
import alertModules from '@/store/modules/alertMessage';

export default {
    namespaced: true,
    state: {
        products: [],
        product: {},
        favorites: [],
        categories: [],
    },
    actions: {
        getProducts(context){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            context.commit('LOADING', true, { root: true });
            axios.get(api).then((response) => {
                console.log('getProducts' ,response.data);
                context.commit('GET_PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);
                context.commit('LOADING', false, { root: true });
            });
        },
        getProduct(context, id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            context.commit('LOADING', true, { root: true });
            axios.get(api).then((response) => {
                console.log('取得單一商品資料' ,response.data);
                context.commit('GET_PRODUCT', response.data.product);
                $('#productModal').modal('show');
                context.commit('LOADING', false, { root: true });
            });
        },
        getFavorites(context) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            context.commit('SET_FAVORITES', favorites);
            console.log('getFavorites: ', favorites );
        },
        addToFavorites(context, product) {
            context.commit('ADD_FAVORITES', product); 
      
            localStorage.setItem('favorites', JSON.stringify(context.state.favorites));
            context.commit('SET_FAVORITES', context.state.favorites);  
            context.dispatch('getFavorites');
            context.dispatch('alertModules/updateMessage', { message: "已加入我的最愛", status: 'info' });
        },
        removeFavoritesItem(context, product) {
            context.commit('DEL_FAVORITES', product); 
      
            localStorage.setItem('favorites', JSON.stringify(context.state.favorites));
            context.commit('SET_FAVORITES', context.state.favorites);
            context.dispatch('getFavorites');
            context.dispatch('alertModules/updateMessage', { message: "已刪除我的最愛", status: 'danger' });
        },
        delFavoriteAll(context) {
            localStorage.removeItem('favorites');
            context.dispatch('getFavorites');
        },
    },
    mutations: {
        ADD_FAVORITES(state, payload) {  
            state.favorites.push( payload );
        },
        DEL_FAVORITES(state, payload) {  
            const indexFavorites = state.favorites.findIndex(
                (item) => item.id === payload.id,
            );
            state.favorites.splice(indexFavorites, 1);
        },
        SET_FAVORITES(state, payload) {
            state.favorites = payload;
        },
        GET_PRODUCTS(state, payload) {
            state.products = payload;
        },
        GET_PRODUCT(state, payload) {
            state.product = payload;
        },
        CATEGORIES(state, payload) {
            const categories = new Set();
            payload.forEach((item) => {
              categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
    },
    getters: {
        products: (state) => state.products,
        product: (state) => state.product,
        categories: (state) => state.categories,
        favorites: (state) => state.favorites,
    },
    modules: {
        alertModules,
    },
}