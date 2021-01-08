<template>
<section class="pt-16 text-topic">
  <div class="container">
    <div class="row mb-12">
      <div class="col-md-6">
        <!-- 麵包屑 -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/products" class="text-topic">所有商品</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
        <!-- 產品圖片 -->
        <img :src="product.imageUrl" class="product-img img-fluid radius-m" alt="">
      </div>
      <!-- 產品內容 -->
      <div class="col-md-6 mt-10 mt-md-0">
        <ul class="text-topic pl-lg-10 pl-0">
          <li class="h3 mb-6">
            <span class="badge badge-theme p-4">{{ product.category }}</span>
          </li>
          <li class="d-flex align-items-center">
            <h4 class="product-title mr-md-10 mr-5"> {{ product.title }} </h4>
            <!-- 加入最愛 -->
            <a href="#" class="text-danger" @click.prevent="addMyFavorite(product.id)">
              <i class="far fa-heart fa-2x" v-if="myFavorite.indexOf(product.id) === -1"></i>
              <i class="fas fa-heart fa-2x" v-else></i>
            </a>
          </li>
          <li>
            <img class="my-7" src="../../assets/image/divider.png" alt="">
          </li>
          <li class="lh-lg mb-7"> [產品描述] <br> {{ product.description }} </li>
          <li class="d-flex justify-content-between mb-7">
            <del class="text-muted"> 原價{{ product.origin_price }} </del>
            <div class="h5"> 特價{{ product.price }} </div>
          </li>
          <li class="mb-7">
            <select name="" class="form-control mt-3" v-model="productQty">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </li>
          <li class="d-flex justify-content-between align-items-center">
            <div class="mr-3 h5" v-if="product.price">
              小計 <strong>{{ productQty * product.price }}</strong> 元
            </div>
            <button type="button" class="product-button btn btn-warning p-4" :disabled="productQty === 0"
              @click="addtoCart(product.id, productQty)">
              <i class="fas fa-cart-plus fa-lg"><span class="ml-5">加到購物車</span></i>
            </button>
          </li>
        </ul>
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
      productId: '',
      productQty: 0,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'product' ,'myFavorite']),
  },
  methods: {
    ...mapActions(['getProduct', 'addMyFavorite']),
   
    addtoCart(id, productQty =1 ){
      this.$store.dispatch('cartsModules/addtoCart',{id, productQty});
    },
  },
  created(){
    this.productId = this.$route.params.id;
    console.log(this.productId);
    this.getProduct(this.productId);
  }
}

</script>


<style lang="scss" scope>
@import '../../assets/scss/all';

.product-title {
  font-size: 24px;
}
.product-img {
  height: auto;
  width: 100%;
}
@include pad {
  .product-title {
    font-size: 26px;
  }
}
@include desktop {
  .product-img {
    height: 500px;
  }
  .product-title {
    font-size: 32px;
  }
}
</style>