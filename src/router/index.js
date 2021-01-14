import Vue from 'vue';
import VueRouter from 'vue-router';


// 必須啟用他
Vue.use(VueRouter);

// 匯出給entry使用
const routes = [
    {
        path: '*',
        redirect: '/',
    },
    {  
        path: '/', // 對應的虛擬路徑
        component: () => import('@/components/front/FontStage.vue'),
        children: [
            {
                path: '',  // 首頁
                name: 'Home',   
                component: () => import('@/views/front/Home'),               
            },
            {
                path: 'login',  // 登入頁
                name: 'Login', 
                component: () => import('@/views/front/Login'),
            },
            {
                path: 'products',
                name: 'Products',
                component: () => import('@/views/front/Products')
            },
            {
                path: '/product/:id',
                name: 'ProductDetail',
                component: () => import('@/views/front/Product'),
            },
            {
                path: 'orders',  // 訂單列表
                name: 'Orders', 
                component: () => import('@/views/front/Orders'),
            },
            {
                path: 'cart',  // 購物車列表
                name: 'Cart', 
                component: () => import('@/views/front/Cart'),
            },
            {
                path: '/checkout',
                component: () => import('@/components/front/Checkout'),
                children: [
                  {
                    path: 'order_create',  // 建立訂單 (填寫資訊)
                    name: 'OrderCreate',
                    component: () => import('@/views/front/OrderCreate'),
                  },
                  {
                    path: 'order_paying/:orderId',  // 確認訂單 (注意orderId變數)
                    name: 'OrderPaying',
                    component: () => import('@/views/front/OrderPaying'),
                  },
                  {
                    path: 'order_paid/:orderId',  // 結帳成功 (注意orderId變數)
                    name: 'OrderPaid',
                    component: () => import('@/views/front/OrderPaid'),
                  },
                ],
            },
        ]
    },
    {
        path: '/admin',
        component: () => import('@/components/back/BackStage'),
        children: [
            {
                path: 'products',
                name: 'BackProducts',
                component: () => import('@/views/back/BackProducts'),
                meta: { requiresAuth: true },
            },
            {
                path: 'coupon',
                name: 'BackCoupon',
                component: () => import('@/views/back/BackCoupon'),
                meta: { requiresAuth: true },
            },
            {
                path: 'orders',
                name: 'BackOrders',
                component: () => import('@/views/back/BackOrders'),
                meta: { requiresAuth: true },
            },
        ]
    },
    {
        path: '/',
        component: () => import('@/components/back/BackStage'),
        children: [
            {
                path: 'shopping',
                name: 'Backshopping',
                component: () => import('@/views/back/BackShopping'),
            },
            {
                path: 'back_order_checkout/:orderId',
                name: 'BackOrderCheckout',
                component: () => import('@/views/back/BackOrderCheckout'),
            },
        ]
    },
]
  
const router = new VueRouter({
    routes,
    linkActiveClass: 'active', 
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
  });
  
export default router;