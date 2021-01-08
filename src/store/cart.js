import axios from 'axios';
import alertModules from './alertMessage';

export default {
    namespaced: true,
    state: {
      cart: {
        carts: [],
      },
    },
    actions: {
        addtoCart(context, {id, productQty}){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const cart = {
                product_id: id,
                qty: productQty,
            };
            context.commit('LOADING', true, { root: true });
            axios.post(api, { data: cart }).then((response) => {
              console.log('加入購物車:', response.data);
              context.dispatch('getCart');
              context.dispatch('alertModules/updateMessage', { message: `${response.data.message}`, status: 'info' });
              context.commit('LOADING', false, { root: true });
              $('#productModal').modal('hide');
            });
        },
        getCart(context){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            context.commit('LOADING', true, { root: true });
            axios.get(api).then((response) => {
                console.log('取得購物車: ', response.data);
                context.commit('GET_CART', response.data.data);
                context.commit('LOADING', false, { root: true });
            });
        },
        delCart(context, id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true, { root: true });
            axios.delete(api).then((response) => {
                context.dispatch('alertModules/updateMessage', { message: `${response.data.message}`, status: 'danger' });
                context.dispatch('getCart');
                context.commit('LOADING', false, { root: true });
                console.log('刪除購物車項目', response);
            });
        },
    },
    mutations: {
        GET_CART(state, payload) {
            state.cart = payload;
        },
    },
    getters: {
        cart: (state) => state.cart,
       
    },
    modules: {
        alertModules,
    },
}