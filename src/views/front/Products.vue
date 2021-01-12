<template>
<section>
  <div class="container">
    <div class="row">
      <div class="col-md-3 mt-md-16 mt-15">
        <!-- 搜尋框 -->
        <div class="input-group mb-6">
          <input class="form-control" type="text" v-model="searchText" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-topic" type="button" @click="searchText = ''">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
        <!-- 產品列表 -->
        <ul class="list-group text-center mb-10">
          <li><a href="#" @click.prevent="searchText = ''" :class="{ 'active': searchText === ''}" class="list-group-item list-group-item-action h5">所有商品</a></li>
          <li><a href="#" @click.prevent="searchText = item" :class="{ 'active': item === searchText}" 
                v-for="item in categories" :key="item" class="list-group-item list-group-item-action h5">{{ item }}</a></li>
        </ul>
      </div>
      <div class="col-md-9 mt-md-16 mt-0">
        <div class="row">
          <div class="col-lg-4 col-sm-6" v-for="product in filterData" :key="product.id" data-aos="fade-up">
            <div class="product-card card border-0 mb-6">
              <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}" class="card-img-top card-img position-relative" style="height:200px">
                <img class="card-img-top card-img h-100 w-100" :src="product.imageUrl" alt="Card image cap">
                <p class="list-hover h4 font-weight-bolder d-flex align-items-center justify-content-center">點擊查看更多</p>
              </router-link>
              <div class="card-body p-4">
                <p class="badge badge-secondary mb-2">
                  {{ product.category }}
                </p>
                <h3 class="card-title h5 text-topic mb-4">{{ product.title }}</h3>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h5 text-danger" v-if="!product.price">{{ product.origin_price }} 元</div>
                  <del class="h6 text-danger" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                  <div class="h5 text-topic" v-if="product.price">特價 {{ product.price }} 元</div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center pt-0 border-top-0 bg-white">
                <!-- 加入購物車 -->
                <a href="#" class="text-danger" @click.prevent="addtoCart(product.id)">
                  <i class="fas fa-spinner fa-spin fa-lg" v-if="addCartLoading === product.id"></i>
                  <i class="fa fa-cart-plus fa-2x" v-if="addCartLoading !== product.id"></i>
                </a>
                <!-- 加入最愛 -->
                <button class="btn text-danger" @click="addToFavorites(product)"
                        v-if="!favorites.map((item) => item.id).includes(product.id)">
                  <i class="far fa-heart fa-2x"></i> 
                </button>
                <!-- 移除最愛 -->
                <button class="btn text-danger" @click="removeFavoritesItem(product)"
                        v-if="favorites.map((item) => item.id).includes(product.id)"  >
                  <i class="fas fa-heart fa-2x"></i> 
                </button>
                
              </div>
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
     searchText: '',

    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productModules', ['products', 'categories', 'favorites']),
    ...mapGetters('cartsModules', ['addCartLoading']),

    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return vm.products;
    },
  },
  methods: {
    ...mapActions('productModules', ['getProducts', 'getFavorites','addToFavorites', 'removeFavoritesItem']),


    addtoCart(id, productQty = 1){
      this.$store.dispatch('cartsModules/addtoCart', { id, productQty });
    },
    
  },
  created() {
    this.getProducts();
  },
}

</script>


<style lang="scss" scope>
@import '../../assets/scss/all';

.list-group {
  &-item-action {
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: $topic;
    padding: 20px;
  }
  &:focus {
    background-color:$topic;
    color: #fff;
  }
  & .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: $topic;
    border-color:  rgba(0, 0, 0, 0.125);
  }
}
.form-control:focus {
    border-color: $topic;
}
.form-control:focus {
    border-color: $topic;
    box-shadow: 0 0 0 0.2rem rgba(73, 30, 10, 0.5);
}
.product-card {
  box-shadow: 2px 2px 5px hsla(0,0%,39.2%,.16);
  transition: .8s;
  &:hover .list-hover {
    background: rgba(0, 0, 0, .5);
    color: $white;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
}
.list-hover {
  @include align-center;
  background: transparent;
  color: transparent;
}
@media (min-width: 450px) {
  .product-card {
    margin: 0 80px;
  }
}
@media (min-width: 576px) {
  .product-card {
    margin: 0 0;
  }
}
</style>