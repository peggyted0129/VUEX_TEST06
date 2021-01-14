import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';


// VeeValidate
import { ValidationProvider, ValidationObserver, extend, localize, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';

//aos
import AOS from 'aos';
import 'aos/dist/aos.css';
//jquery
import jquery from 'jquery';
window.$ = jquery;

import App from './App.vue';
import router from './router';
import store from './store';
import './bus';
import currencyFilter from './filters/currency';
import date from './filters/date';

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', date);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */);

// 規則導出加入VeeValidate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('zh_TW', TW);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

axios.defaults.withCredentials = true;

new Vue({
  created() {
    AOS.init({
      duration: 600,
    });
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  //目前的執行環境在router下，並不是在vue的元件內，無法直接呼叫this.$http
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data)
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login',
        });
      }
    });
  }else{
    next();
  }
})
