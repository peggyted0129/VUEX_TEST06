<template>
<section class="my-6 text-topic">
    <div class="container-fluid">
      <!--- 商品卡片 --->
      <div class="row mt-9">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div style="height: 200px; background-size: cover; background-position: center;"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body" style="height: 136px">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5" v-if="item.price">特價 {{ item.price }} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id, productQty=1)">
                      加到購物車
                    </button>
                </div>
              </div>
          </div>
      </div>

      <!-- 模擬購物車列表 & 套用優惠碼 & 訂單資料 -->
      <div class="my-5 row justify-content-center">
        <div class="my-5 col-7 mx-auto justify-content-center">
          <!-- 模擬購物車列表 -->
          <table class="table">
              <thead>
                  <th width="80"></th>
                  <th width="200" class="py-4">品名</th>
                  <th width="100" class="py-4">數量</th>
                  <th width="50" class="py-4">單價</th>
              </thead>
              <tbody>
                  <tr>
                      <td colspan="4" class="h4 text-topic py-6 text-center" v-if="cart.carts.length === 0">購物車尚無商品，歡迎繼續選購~</td>
                  </tr>
                  <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                      <td class="align-middle py-4">
                          <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
                              <i class="far fa-trash-alt"></i>
                          </button>
                      </td>
                      <td class="align-middle">
                          {{ item.product.title }}
                          <div class="text-success" v-if="item.coupon">
                              已套用優惠券
                          </div>
                      </td>
                      <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
                      <td class="align-middle text-right">{{ item.final_total }}</td>
                  </tr>
              </tbody>
              <tfoot v-if="cart.carts.length>0">
                  <tr>
                      <td colspan="3" class="text-right py-4">總計</td>
                      <td class="text-right">{{ cart.total }}</td>
                  </tr>
                  <tr v-if="cart.final_total != cart.total">
                      <td colspan="3" class="text-right text-success py-4 font-weight-bolder">折扣價</td>
                      <td class="text-right text-success">{{ cart.final_total }}</td>
                  </tr>
              </tfoot>
          </table>
          <!-- 套用優惠碼 -->
          <div class="input-group mt-5 mb-9 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" style="height:46.8px">
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary py-4" type="button" @click="addCouponCode">
                      套用優惠碼
                  </button>
              </div>
          </div>
          <!-- 訂單資料 (驗證功能) -->
          <Validation-observer v-slot="{ invalid }">
            <form class="px-0" @submit.prevent="createOrder">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input name="Email" type="email" class="form-control" id="email" v-model="form.user.email" 
                          :class="classes" placeholder="請輸入Email"/>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="name">收件人姓名</label>
                  <input name="收件人姓名" type="text" class="form-control" id="name" v-model="form.user.name" 
                         :class="classes" placeholder="請輸入姓名"/>
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="telphone">收件人電話</label>
                  <input name="電話" type="tel" class="form-control" id="telphone" v-model="form.user.tel" 
                         :class="classes" placeholder="請輸入電話" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="address">收件人地址</label>
                  <input name="收件人地址" type="address" class="form-control" id="address" v-model="form.user.address" 
                         :class="classes" placeholder="請輸入地址" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <div class="form-group">
                <label for="useraddress">留言</label>
                <textarea name="" id="" class="form-control" cols="30" rows="10"
                          v-model="form.message"></textarea>
              </div>
              <div class="text-right">
                <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
              </div>
            </form>
          </Validation-observer>
        </div>
      </div>
    </div>

    <!--- 查看更多 modal --->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center">
                <img :src="product.imageUrl" class="img-fluid" alt="" style="height: 250px; background-size: cover; background-position: center;">
            </div>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-left">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="productQty">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3" v-if="product.price">
              小計 <strong>{{ productQty * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-warning" :disabled="productQty === 0"
                    @click="addtoCart(product.id, productQty)">
              加到購物車
            </button>
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
      productQty: 0,
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productModules', ['products', 'product']),
    ...mapGetters('cartsModules', ['cart']),
  },
  methods: {
    ...mapActions(['addCouponCode']),
    ...mapActions('productModules', ['getProducts', 'getProduct']),
    ...mapActions('cartsModules', ['getCart', 'delCart']),

   
    addtoCart(id, productQty = 1){
      this.$store.dispatch('cartsModules/addtoCart',{id, productQty});
    },
    addCouponCode(){
      this.$store.dispatch('addCouponCode',this.coupon_code);
    },
    createOrder(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api, {data: order} ).then((response) => {
        console.log('訂單已建立: ',response.data);
        if(response.data.success){
          vm.$router.push(`/back_order_checkout/${response.data.orderId}`);
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}

</script>

<style scoped>
.invalid-feedback {
  font-size: 100%;
}
</style>