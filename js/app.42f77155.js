(function(e){function t(t){for(var o,a,u=t[0],i=t[1],s=t[2],d=0,f=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);l&&l(t);while(f.length)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var u=n[a];0!==c[u]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},a={app:0},c={app:0},r=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-10a3debc":"2ebf8720","chunk-118df5c8":"e13bdb5e","chunk-16e351fa":"66cff7dc","chunk-23964274":"2d805d95","chunk-2517d240":"589cdf19","chunk-43889df0":"d333fdac","chunk-43a56601":"4624be43","chunk-4e3f5fbe":"237bbf2e","chunk-52d80d39":"0a8ded05","chunk-63503417":"10c2da55","chunk-669cfabc":"c772c024","chunk-6a0a1ed4":"6f4aa17f","chunk-71832f06":"091c8f38","chunk-74f551bf":"d74d9923","chunk-9245cb00":"60458869","chunk-b539b2d0":"0e6792f4","chunk-f2e7c7f6":"c94d2887"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-118df5c8":1,"chunk-16e351fa":1,"chunk-23964274":1,"chunk-2517d240":1,"chunk-43a56601":1,"chunk-4e3f5fbe":1,"chunk-52d80d39":1,"chunk-669cfabc":1,"chunk-6a0a1ed4":1,"chunk-9245cb00":1,"chunk-b539b2d0":1,"chunk-f2e7c7f6":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-10a3debc":"31d6cfe0","chunk-118df5c8":"0e46161c","chunk-16e351fa":"be6ab477","chunk-23964274":"7e9a348d","chunk-2517d240":"2c6e4078","chunk-43889df0":"31d6cfe0","chunk-43a56601":"daf7755f","chunk-4e3f5fbe":"f93ee381","chunk-52d80d39":"548a6018","chunk-63503417":"31d6cfe0","chunk-669cfabc":"0fd1b184","chunk-6a0a1ed4":"4a245217","chunk-71832f06":"31d6cfe0","chunk-74f551bf":"31d6cfe0","chunk-9245cb00":"c5809930","chunk-b539b2d0":"e04b27e9","chunk-f2e7c7f6":"a622d4aa"}[e]+".css",c=i.p+o,r=document.getElementsByTagName("link"),u=0;u<r.length;u++){var s=r[u],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===o||d===c))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],d=s.getAttribute("data-href");if(d===o||d===c)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var o=t&&t.target&&t.target.src||c,r=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=o,delete a[e],l.parentNode.removeChild(l),n(r)},l.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(l)})).then((function(){a[e]=0})));var o=c[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise((function(t,n){o=c[e]=[t,n]}));t.push(o[2]=r);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var f=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=c[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",f.name="ChunkLoadError",f.type=o,f.request=a,n[1](f)}c[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/VUEX_TEST06/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var l=d;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("4160"),n("b64b"),n("159b"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),a=n("2f62"),c=n("bc3a"),r=n.n(c),u=n("2106"),i=n.n(u),s=n("9062"),d=n.n(s),f=(n("e40d"),n("4989"),n("7212")),l=n.n(f),h=(n("bbe3"),n("6d3b")),p=n("5dc8"),m=n("b42f"),g=n("d17a"),b=n("fb03"),v=n.n(b),k=n("7bb1"),O=n("4c93"),E=n("60d4"),A=n("f5af"),S=n.n(A),T=(n("e829"),n("1157")),y=n.n(T),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},D=[],I={name:"App"},L=I,M=n("2877"),C=Object(M["a"])(L,_,D,!1,null,null,null),G=C.exports,N=(n("d3b7"),n("8c4f"));o["default"].use(N["a"]);var R=[{path:"*",redirect:"/"},{path:"/",component:function(){return n.e("chunk-23964274").then(n.bind(null,"ce6f"))},children:[{path:"",name:"Home",component:function(){return n.e("chunk-b539b2d0").then(n.bind(null,"ec5a"))}},{path:"login",name:"Login",component:function(){return n.e("chunk-2517d240").then(n.bind(null,"ac5b"))}},{path:"products",name:"Products",component:function(){return n.e("chunk-f2e7c7f6").then(n.bind(null,"ed84"))}},{path:"/product/:id",name:"ProductDetail",component:function(){return n.e("chunk-52d80d39").then(n.bind(null,"658f"))}},{path:"orders",name:"Orders",component:function(){return n.e("chunk-10a3debc").then(n.bind(null,"b5df"))}},{path:"cart",name:"Cart",component:function(){return n.e("chunk-118df5c8").then(n.bind(null,"62b3"))}},{path:"/checkout",component:function(){return n.e("chunk-9245cb00").then(n.bind(null,"f4b2"))},children:[{path:"order_create",name:"OrderCreate",component:function(){return n.e("chunk-16e351fa").then(n.bind(null,"e28c"))}},{path:"order_paying/:orderId",name:"OrderPaying",component:function(){return n.e("chunk-63503417").then(n.bind(null,"0635"))}},{path:"order_paid/:orderId",name:"OrderPaid",component:function(){return n.e("chunk-669cfabc").then(n.bind(null,"8011"))}}]}]},{path:"/admin",component:function(){return n.e("chunk-4e3f5fbe").then(n.bind(null,"a76a"))},children:[{path:"products",name:"BackProducts",component:function(){return n.e("chunk-43a56601").then(n.bind(null,"5305"))},meta:{requiresAuth:!0}},{path:"coupon",name:"BackCoupon",component:function(){return n.e("chunk-43889df0").then(n.bind(null,"cad1"))},meta:{requiresAuth:!0}},{path:"orders",name:"BackOrders",component:function(){return n.e("chunk-71832f06").then(n.bind(null,"0cbc"))},meta:{requiresAuth:!0}}]},{path:"/",component:function(){return n.e("chunk-4e3f5fbe").then(n.bind(null,"a76a"))},children:[{path:"shopping",name:"Backshopping",component:function(){return n.e("chunk-6a0a1ed4").then(n.bind(null,"b639"))}},{path:"back_order_checkout/:orderId",name:"BackOrderCheckout",component:function(){return n.e("chunk-74f551bf").then(n.bind(null,"6c3f"))}}]}],w=new N["a"]({routes:R,linkActiveClass:"active",scrollBehavior:function(e,t,n){return{x:0,y:0}}}),P=w,x=(n("99af"),n("c740"),n("a630"),n("a434"),n("6062"),n("3ca3"),n("ddb0"),{namespaced:!0,state:{messages:[]},getters:{messages:function(e){return e.messages}},mutations:{UPDATE_MESSAGE:function(e,t){e.messages.push(t)},REMOVE_MESSAGE:function(e,t){e.messages.splice(t,1)}},actions:{updateMessage:function(e,t){var n=t.message,o=t.status,a=Math.floor(new Date/1e3);e.commit("UPDATE_MESSAGE",{message:n,status:o,timestamp:a}),e.dispatch("removeMessageWithTiming",a)},removeMessageWithTiming:function(e,t){setTimeout((function(){e.state.messages.forEach((function(n,o){n.timestamp===t&&e.commit("REMOVE_MESSAGE",o)}))}),5e3)},removeMessage:function(e,t){e.commit("REMOVE_MESSAGE",t)}}}),F={namespaced:!0,state:{products:[],product:{},favorites:[],categories:[]},actions:{getProducts:function(e){var t="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/products/all");e.commit("LOADING",!0,{root:!0}),r.a.get(t).then((function(t){console.log("getProducts",t.data),e.commit("GET_PRODUCTS",t.data.products),e.commit("CATEGORIES",t.data.products),e.commit("LOADING",!1,{root:!0})}))},getProduct:function(e,t){var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/product/").concat(t);e.commit("LOADING",!0,{root:!0}),r.a.get(n).then((function(t){console.log("取得單一商品資料",t.data),e.commit("GET_PRODUCT",t.data.product),$("#productModal").modal("show"),e.commit("LOADING",!1,{root:!0})}))},getFavorites:function(e){var t=JSON.parse(localStorage.getItem("favorites"))||[];e.commit("SET_FAVORITES",t),console.log("getFavorites: ",t)},addToFavorites:function(e,t){e.commit("ADD_FAVORITES",t),localStorage.setItem("favorites",JSON.stringify(e.state.favorites)),e.commit("SET_FAVORITES",e.state.favorites),e.dispatch("getFavorites"),e.dispatch("alertModules/updateMessage",{message:"已加入我的最愛",status:"info"})},removeFavoritesItem:function(e,t){e.commit("DEL_FAVORITES",t),localStorage.setItem("favorites",JSON.stringify(e.state.favorites)),e.commit("SET_FAVORITES",e.state.favorites),e.dispatch("getFavorites"),e.dispatch("alertModules/updateMessage",{message:"已刪除我的最愛",status:"danger"})},delFavoriteAll:function(e){localStorage.removeItem("favorites"),e.dispatch("getFavorites")}},mutations:{ADD_FAVORITES:function(e,t){e.favorites.push(t)},DEL_FAVORITES:function(e,t){var n=e.favorites.findIndex((function(e){return e.id===t.id}));e.favorites.splice(n,1)},SET_FAVORITES:function(e,t){e.favorites=t},GET_PRODUCTS:function(e,t){e.products=t},GET_PRODUCT:function(e,t){e.product=t},CATEGORIES:function(e,t){var n=new Set;t.forEach((function(e){n.add(e.category)})),e.categories=Array.from(n)}},getters:{products:function(e){return e.products},product:function(e){return e.product},categories:function(e){return e.categories},favorites:function(e){return e.favorites}},modules:{alertModules:x}},j={namespaced:!0,state:{cart:{carts:[]},addCartLoading:""},actions:{addtoCart:function(e,t){var n=t.id,o=t.productQty,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/cart"),c={product_id:n,qty:o};e.commit("ADD_CART_LOADING",n),e.commit("LOADING",!0,{root:!0}),r.a.post(a,{data:c}).then((function(t){console.log("加入購物車:",t.data),e.dispatch("getCart"),e.dispatch("alertModules/updateMessage",{message:"".concat(t.data.message),status:"info"}),e.commit("LOADING",!1,{root:!0}),e.commit("ADD_CART_LOADING",""),$("#productModal").modal("hide")}))},getCart:function(e){var t="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/cart");e.commit("LOADING",!0,{root:!0}),r.a.get(t).then((function(t){console.log("取得購物車: ",t.data),e.commit("GET_CART",t.data.data),e.commit("LOADING",!1,{root:!0})}))},delCart:function(e,t){var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/cart/").concat(t);e.commit("LOADING",!0,{root:!0}),r.a.delete(n).then((function(t){e.dispatch("alertModules/updateMessage",{message:"".concat(t.data.message),status:"danger"}),e.dispatch("getCart"),e.commit("LOADING",!1,{root:!0}),console.log("刪除購物車項目",t)}))}},mutations:{GET_CART:function(e,t){e.cart=t},ADD_CART_LOADING:function(e,t){e.addCartLoading=t}},getters:{cart:function(e){return e.cart},addCartLoading:function(e){return e.addCartLoading}},modules:{alertModules:x}};o["default"].use(a["a"]);var V=new a["a"].Store({strict:!0,state:{isLoading:!1,order:{products:{},user:{}},orderStep:"create"},actions:{updateLoading:function(e,t){e.commit("LOADING",t)},getOrder:function(e,t){var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/order/").concat(t);e.commit("LOADING",!0),r.a.get(n).then((function(t){console.log("getOrder",t.data),e.commit("GET_ORDER",t.data.order),e.commit("LOADING",!1)}))},payOrder:function(e,t){var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/pay/").concat(t);e.commit("LOADING",!0),r.a.post(n).then((function(n){console.log("payOrder",n.data),n.data.success&&(e.dispatch("getOrder",t),e.dispatch("alertModules/updateMessage",{message:"付款完成",status:"info"})),e.commit("LOADING",!1)}))},addCouponCode:function(e,t){var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("emily","/coupon"),o={code:t};e.commit("LOADING",!0),r.a.post(n,{data:o}).then((function(t){console.log("coupon: ",t.data),e.dispatch("alertModules/updateMessage",{message:"".concat(t.data.message),status:"info"}),e.dispatch("cartsModules/getCart"),e.commit("LOADING",!1)}))},setOrderStep:function(e,t){e.commit("SET_ORDER_STEP",t)}},mutations:{LOADING:function(e,t){e.isLoading=t},GET_ORDER:function(e,t){e.order=t},SET_ORDER_STEP:function(e,t){e.orderStep=t}},getters:{isLoading:function(e){return e.isLoading},order:function(e){return e.order},orderStep:function(e){return e.orderStep}},modules:{cartsModules:j,alertModules:x,productModules:F}});o["default"].prototype.$bus=new o["default"];n("a9e3"),n("b680"),n("ac1f"),n("5319");var B=function(e){var t=Number(e);return"$".concat(t.toFixed(0).replace(/./g,(function(e,t,n){var o=t&&"."!==e&&(n.length-t)%3===0?", ".concat(e).replace(/\s/g,""):e;return o})))},U=function(e){var t=new Date(1e3*e);return t.toLocaleDateString()};h["a"].use([p["a"],m["a"],g["a"]]),o["default"].use(v()(h["a"])),window.$=y.a,o["default"].use(i.a,r.a),o["default"].use(a["a"]),o["default"].config.productionTip=!1,o["default"].component("Loading",d.a),o["default"].filter("currency",B),o["default"].filter("date",U),o["default"].use(l.a),Object.keys(O).forEach((function(e){Object(k["d"])(e,O[e])})),o["default"].component("ValidationProvider",k["b"]),o["default"].component("ValidationObserver",k["a"]),Object(k["e"])("zh_TW",E),Object(k["c"])({classes:{valid:"is-valid",invalid:"is-invalid"}}),r.a.defaults.withCredentials=!0,new o["default"]({created:function(){S.a.init({duration:600})},router:P,store:V,render:function(e){return e(G)}}).$mount("#app"),P.beforeEach((function(e,t,n){if(console.log("to",e,"from",t,"next",n),e.meta.requiresAuth){var o="".concat("https://vue-course-api.hexschool.io","/api/user/check");r.a.post(o).then((function(e){console.log(e.data),e.data.success?n():n({path:"/login"})}))}else n()}))}});
//# sourceMappingURL=app.42f77155.js.map