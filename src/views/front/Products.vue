<template>
<section>
  <div class="container">
    <div class="row">
      <div class="col-3 mt-16">
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
        <ui class="list-group text-center">
          <li><a href="#" @click.prevent="searchText = ''" :class="{ 'active': searchText === ''}" class="list-group-item list-group-item-action h5">所有商品</a></li>
          <li><a href="#" @click.prevent="searchText = item" :class="{ 'active': item === searchText}" 
                v-for="item in categories" :key="item" class="list-group-item list-group-item-action h5">{{ item }}</a></li>
        </ui>
      </div>
      <div class="col-9 mt-16">
        <!-- Search bar -->
        <div class="row">
          <div class="col-4" v-for="item in filterData" :key="item.id" data-aos="fade-up">
            <a class="product-card card border-0 mb-6">
              <div class="card-img-top card-img position-relative" style="height:200px">
                <img class="card-img-top card-img h-100 w-100" :src="item.imageUrl" alt="Card image cap">
                <p class="list-hover h3 font-weight-bolder d-flex align-items-center justify-content-center">查看更多</p>
              </div>
              <div class="card-body p-4">
                <p class="badge badge-secondary mb-2">
                  {{ item.category }}
                </p>
                <h3 class="card-title h5 text-topic mb-4">{{ item.title }}</h3>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h5 text-danger" v-if="!item.price">{{ item.origin_price }} 元</div>
                  <del class="h6 text-danger" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                  <div class="h5 text-topic" v-if="item.price">特價 {{ item.price }} 元</div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center pt-0 border-top-0 bg-white">
                <a href="#" class="text-danger" @click="addtoCart(item.id)">
                  <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
                </a>
                <a href="#" class="material-icons text-danger h1" @click="addtoCart(item.id)">
                  favorite_border
                </a>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
</template>


<script>
export default {
  data() {
    return {
     products: [],     
     searchText: '',
     categories: [],
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    getProducts(){
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        vm.$store.dispatch('updateLoading', true);
        this.$http.get(api).then((response) => {
            console.log('getProducts' ,response.data);
            vm.products = response.data.products;
            vm.getUnique();
            vm.$store.dispatch('updateLoading', false);
        });
    },
    getUnique(){
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
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
  transition: .8s;
}

</style>