<template>
<div>
  <loading :active.sync="isLoading"></loading>      
  <NavBar></NavBar>  <!-- NavBar -->
  <Alert />

  <router-view />    <!-- Content -->

  <footer class="bg-warning">
    <div class="container-fluid container-md py-5">
      <ul class="footer-icon d-flex align-items-center justify-content-center"> 
        <li><a class="text-center mr-sm-10 mr-4" href="#">
          <span class="material-icons h1 align-bottom">facebook</span>
        </a></li>
        <li><a class="text-center mr-sm-10 mr-4" href="#">
          <i class="fab fa-github-square h1"></i>
        </a></li>
        <li><a class="text-center" href="#">
          <span class="material-icons h1 align-bottom">local_post_office</span>
        </a></li>
      </ul>
      <p class="text-topic text-center pt-2 mb-0">© 2021. 僅為作品用無商業用途</p>
    </div>
  </footer>

  <!-- 我的最愛 顯示LOGO -->
  <div class="favorite position-fixed">
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#favoriteModal">
      <span class="material-icons h2 pt-1">favorite</span>
      <span class="cart-badge badge position-absolute badge-pill badge-warning">{{ favorites.length }}</span>
    </button>
  </div>

  <!-- scroll-top -->
  <div class="scroll-top position-fixed">
    <a href="#" @click="scrollToTop" class="scroll-up h2 d-flex justify-content-center align-items-center">
      <i class="fa fa-angle-up"></i>
    </a>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="favoriteModal" tabindex="-1" role="dialog" aria-labelledby="favoriteModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0 d-flex align-items-center">
          <h4 class="modal-title text-warning font-weight-bold" id="favoriteModalCenterTitle">願望清單</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body pb-0">
            <div class="table-responsive-md">
              <table class="table mb-3">
                <thead>
                  <tr v-if="favorites.length > 0">
                    <th scope="col" class="text-center py-3" width="40"></th>
                    <th scope="col" class="text-center" width="40"></th>
                    <th scope="col" class="py-3 pl-4">商品</th>
                    <th scope="col" class="py-3" width="60">數量</th>
                    <th scope="col" class="py-3" width="50">特價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in favorites" :key="item.id">
                    <th scope="row" class="text-center py-2">
                      <div @click="removeFavoritesItem(item)" class="btn btn-outline-danger btn-sm p-0 border-0">
                        <span class="material-icons h2">delete_forever</span>
                      </div>
                    </th>
                    <th scope="row" class="text-center py-2">
                      <div @click="addtoCart(item.id)" class="btn btn-outline-danger btn-sm p-0 border-0">
                        <span class="material-icons h2" v-if="addCartLoading !== item.id">add_shopping_cart</span>
                        <i class="fas fa-spinner fa-spin fa-lg" v-if="addCartLoading === item.id"></i>
                      </div>
                    </th>
                    <td class="pb-0 pl-4"><router-link :to="{ name: 'ProductDetail', params: { id: item.id }}" class="text-topic font-weight-bolder">{{ item.title }}</router-link></td>
                    <td class="text-left text-topic font-weight-bolder">1 {{ item.unit }}</td> 
                    <td class="text-right text-topic font-weight-bolder">{{ item.price }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="!favorites.length">
                <tr>
                  <td colspan="5">
                    <div class="text-center text-topic font-weight-bolder h5 py-4">
                      還沒有商品加入願望清單哦!
                    </div>
                  </td>
                </tr>
              </tfoot>
              </table>
            </div> 
        </div>
      </div>
    </div>
  </div>
</div>
</template>




<script>
import NavBar from '@/components/front/NavBar.vue';
import Alert from '@/components/AlertMessage.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
 components: {
      NavBar,
      Alert,
  },
  data: function(){
    return {     
      
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productModules', ['products', 'favorites']),
    ...mapGetters('cartsModules', ['addCartLoading']),
  },
  methods: {
    ...mapActions('productModules', ['getProducts', 'getFavorites', 'removeFavoritesItem']),
    
    addtoCart(id, productQty = 1){
      this.$store.dispatch('cartsModules/addtoCart', { id, productQty });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    ScrollHeight(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>300){
        document.querySelector('.scroll-top').style.opacity = '1';
      }else{
        document.querySelector('.scroll-top').style.opacity = '0';
      }   
    }
  },
  mounted(){
    window.addEventListener('scroll', this.ScrollHeight);
  },
  destroyed(){ 
     window.removeEventListener('scroll', this.ScrollHeight);
  },
  created() {
    this.getFavorites();
  },
}

</script>


<style lang="scss" scope>
@import '../../assets/scss/all';

.footer-icon .material-icons {
  color: $topic;
  &:hover {
    color: $white;
  }
}
.footer-icon .fab {
  color: $topic;
  &:hover {
    color: $white;
  }
}

.favorite {
  z-index: 999;
  bottom: 25px;
  right: 30px;
  transition: all 0.4s ease-in-out 0s;
  & .material-icons {
    color: $warning;
    &:hover {
      color: $white;
    }
    &:focus{
      color: $white;
    }
  }
  & .badge {
    padding: 5px 8px;
    font-size: 90%;
  }
}
.favorite .btn {
    padding: 3px 12px;
    border-radius: 50%;
    box-shadow: 0 0 10px #6c757d;
    background: $white;
    &:hover, &:focus {
      background: $topic;
    }
}

.scroll-top {
    z-index: 999;
    bottom: 110px;
    right: 51px;
    width: 30px;
    height: 30px;
    opacity: 0;
    transition: all 0.4s ease-in-out 0s;
}
.scroll-up {
    padding: 6px 22px;
    border-radius: 50%;
    box-shadow: 0 0 10px #6c757d;
    color: $white;
    background: $warning;
    &:hover {
      background: $topic;
      color: $warning;
    }
}
</style>
