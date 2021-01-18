<template>
  <div>
    <!-- 輪播內容 -->
    <div class="p-7">
      <div class="swiper-container" data-aos="fade-up" data-aos-duration="2000">
        <div class="swiper-wrapper">       
          <swiper :options="swiperOptionProducts" ref="mySwiper" v-if="products.length>1">
            <ul class="swiper-slide" v-for="product in products" :key="product.id">
              <li class="card w-100 border-0">
                <div class="card-body border shadow radius-m text-topic p-0 m-5">
                  <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}" style="height:200px">
                    <img class="card-img h-100 w-100" :src="product.imageUrl">
                  </router-link>
                  <h5 class="card-title font-weight-bolder my-6">{{ product.title }}</h5>
                  <div class="d-flex justify-content-center align-items-center mb-3">
                    <p class="badge badge-secondary mr-2">{{ product.category }}</p>
                    <div><span class="material-icons h5 align-middle text-warning">grade</span><span class="material-icons h5 align-middle text-warning">grade</span><span class="material-icons h5 align-middle text-warning">grade</span><span class="material-icons h5 align-middle text-warning">grade</span><span class="material-icons h5 align-middle text-warning">grade</span></div>
                  </div>
                  <del class="card-text d-block h6 font-weight-bolder text-secondary">定價 {{ product.origin_price }} 元</del>
                  <p class="card-text h5 font-weight-bolder">特價 {{ product.price }} 元</p>
                  <!-- 加入購物車 -->
                  <div class="d-flex justify-content-center my-8 bg-white">
                    <a href="#" class="btn btn-warning text-white" @click.prevent="addtoCart(product.id)">
                      <div class="d-flex align-items-center" v-if="addCartLoading === product.id">
                        <i class="fas fa-spinner fa-spin fa-lg mr-4"></i>
                        <span class="h5">加入購物車</span>
                      </div>
                      <div class="d-flex align-items-center" v-if="addCartLoading !== product.id">
                        <i class="fa fa-cart-plus fa-2x mr-4"></i>
                        <span class="h5">加入購物車</span>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </swiper>
        </div>
      </div>
    
      <div class="swiper-pagination d-none" slot="pagination"></div>
      <div class="swiper-button-next material-icons" @click="next">play_circle_filled</div>
      <div class="swiper-button-prev material-icons" @click="prev">play_circle_filled</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function(){

    return {
     swiperOptionProducts: {
        direction: "horizontal",
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,

        // 自動輪播要加的語法
        autoplay:{
          delay: 2000, 
          disableOnInteraction: false
        },

        pagination: {
          el: '.swiper-pagination'
        },

        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 0,
          }
        },
        navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productModules', ['products']),
    ...mapGetters('cartsModules', ['addCartLoading']),
  },
  methods: {
    ...mapActions('productModules', ['getProducts']),

    addtoCart(id, productQty = 1){
      this.$store.dispatch('cartsModules/addtoCart', { id, productQty });
    },
    prev() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    next() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
  },
  created() {
    this.getProducts();
  },
};

</script>

<style lang="scss" scope>
@import '../../assets/scss/all';

.form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(248, 195, 50, 0.8);
}
@include smobile {
  h5.card-title {
    font-size: 24px;
  }
}
</style>

  