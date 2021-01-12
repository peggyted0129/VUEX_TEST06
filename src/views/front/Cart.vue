<template>
<section>
<div class="container-md container-fluid text-topic">
    <!-- 購物清單 -->
    <main class="pt-15 pt-sm-16">
        <h2 class="h4 font-weight-bolder d-flex align-items-center mb-5">
            <span class="material-icons h3 mr-3">shopping_cart</span>
            <span>購物清單確認</span>
        </h2>
        <p to="/products" class="h4 text-danger py-6" v-if="cart.total === 0">購物車尚無商品，歡迎繼續選購~
            <router-link to="/products" class="btn h3 btn-danger py-4 ml-5">前往商品列表
            </router-link>
        </p>
        <div class="table-responsive">
            <table class="table mb-0" v-if="cart.total !== 0">
                <thead>
                    <tr>
                        <th scope="col" style="min-width: 60px" class="py-4">圖片</th>
                        <th scope="col" class="py-4 pl-6">品項</th>
                        <th scope="col" style="min-width: 60px;" class="py-4">原價</th>
                        <th scope="col" style="min-width: 60px;" class="py-4">特價</th>
                        <th scope="col" style="min-width: 60px;" class="py-4">數量</th>
                        <th scope="col" style="min-width: 80px;" class="py-4 pl-7">總計</th>
                        <th scope="col" style="min-width: 40px;" class="py-4">刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in cart.carts" :key="item.id">
                        <td class="py-4">
                            <router-link :to="{ name: 'ProductDetail', params: { id: item.product.id }}" style="height: 60px; background-size: cover; background-position: center;"
                                :style="{backgroundImage: `url(${item.product.imageUrl})`}">
                            </router-link>
                        </td>
                        <td class="py-4 text-secondary pl-6">
                            <router-link :to="{ name: 'ProductDetail', params: { id: item.product.id }}" class="text-topic">{{ item.product.title }}</router-link>
                            <div class="text-success" v-if="item.coupon">
                                已套用優惠券
                            </div>
                        </td>
                        <td class="text-secondary">{{ item.product.origin_price | currency }}</td>
                        <td class="py-4 text-secondary">{{ item.product.price | currency }}</td>
                        <td class="py-4 text-secondary">
                            <select v-model="item.qty"
                                    @change="changeQty(item.id, item.product.id, item.qty)">
                                <option :value="num" v-for="num in 10" :key="num">{{ num }}</option>
                            </select>
                            {{ item.product.unit }}
                        </td>
                        <td class="py-4 text-secondary pl-7">
                            <div class="text-muted" v-if="item.product.price">
                                <span>{{ item.qty * item.product.price | currency }}</span> 元
                            </div>
                        </td>
                        <td class="py-4 text-secondary">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
    <!-- 使用優惠碼 & 訂購明細 -->    
    <div class="row mb-12">
        <!-- 使用優惠碼 -->
        <div class="col-md-7">
            <h2 class="h4 font-weight-bolder d-flex align-items-center my-5">
                <i class="fas fa-keyboard fa-1x"></i>
                <span class="ml-4">輸入優惠碼</span>
            </h2>
            <div class="input-group mt-5 mb-5">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" style="height:50px">
                <div class="input-group-append">
                    <button class="btn btn-warning font-weight-bolder py-4 px-7" type="button" @click="addCouponCode">
                        使用優惠碼
                    </button>
                </div>
            </div>
            <!-- <a class="btn btn-warning py-3 d-block rounded mb-5 text-center">
                沒有優惠碼嗎？ 點此<strong class="text-danger">「訂閱我們」</strong>取得優惠碼！
            </a> -->
            <div class="alert alert-warning font-weight-bolder" role="alert">輸入「HappyCoupon」， 會員享8折優惠!</div>
        </div>
        <!-- 訂購明細 -->
        <div class="col-md-5">
            <h2 class="h4 font-weight-bolder d-flex align-items-center my-5" style="height:36px">
                <span class="material-icons h3 mr-3">card_giftcard</span>
                <span>訂購明細</span>
            </h2>
            <div class="card border">
                <h5 class="card-header">購物車項目</h5>
                <div class="card-body">
                    <div class="d-flex mb-4">
                        <h5 class="card-title mr-auto">商品數量</h5>
                        <p class="card-text h5">{{ cart.carts.length }} 件</p>
                    </div>
                    <div class="d-flex mb-10" v-if="cart.total === cart.final_total">
                        <h5 class="card-title mr-auto">金額總計</h5>
                        <p class="card-text text-danger h5 font-weight-bolder">{{ cart.total | currency }} 元</p>
                    </div>
                    <div class="d-flex" v-if="cart.total !== cart.final_total">
                        <h5 class="card-title text-secondary h5 mr-auto">小計</h5>
                        <p class="card-text text-secondary h5"><del>{{ cart.total | currency }}</del> 元</p>
                    </div>
                    <!-- 折扣金額 -->
                    <div class="d-flex mb-6" v-if="cart.total !== cart.final_total">
                        <p class="card-text ml-auto text-info h6">( 折扣 {{ cart.total - cart.final_total | currency }} 元 )</p>
                    </div>
                    <div class="d-flex mb-10" v-if="cart.total !== cart.final_total">
                        <h5 class="card-title mr-auto h5">折扣後總計</h5>
                        <p class="card-text text-danger h5 font-weight-bolder">{{ cart.final_total | currency }} 元</p>
                    </div>
                    <div class="d-flex">
                        <router-link to="/checkout/order_create" class="btn btn-warning w-50 font-weight-bolder ml-auto">前往結帳</router-link>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>   
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      coupon_code: '',
    };
  },
  
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart']),

  },
  methods: {
    ...mapActions('cartsModules', ['getCart', 'delCart']),
    
    addCouponCode(){
      this.$store.dispatch('addCouponCode',this.coupon_code);
    },
    addtoCart(id, productQty =1 ){
        this.$store.dispatch('cartsModules/addtoCart',{id, productQty});
    },
    changeQty(id, productId, qty) {
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const changeCart = {
        product_id: productId,
        qty: qty
      };
      vm.$http.all([vm.$http.delete(delAPI), vm.$http.post(addAPI, { data: changeCart })])
        .then( vm.$http.spread((delResp, addResp) => {
            vm.getCart();
            vm.$store.dispatch("updateLoading", false);
            vm.$store.dispatch("alertModules/updateMessage", {
              message: "購物車變更成功",
              status: "info"
            });
        }));
    },
  },
  created() {
      const vm = this;
      vm.getCart();
  }
}

</script>

<style lang="scss" scope>
@import '../../assets/scss/all';

</style>