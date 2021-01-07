<template>
<div>
  <loading :active.sync="isLoading"></loading>      
  <NavBar></NavBar>  <!-- NavBar -->

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

  <!-- 購物車 -->
  <div class="fixcart position-fixed">
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#cartModal">
      <span class="material-icons h2 pt-1">shopping_cart</span>
      <span class="cart-badge badge position-absolute badge-pill badge-warning">3</span>
    </button>
  </div>

  <!-- scroll-top -->
  <div class="scroll-top position-fixed">
    <a href="#" @click="scrollToTop" class="scroll-up h2 d-flex justify-content-center align-items-center">
      <i class="fa fa-angle-up"></i>
    </a>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-0 pb-0">
          <h4 class="modal-title text-warning font-weight-bold" id="cartModalCenterTitle">已選擇商品</h4>
        </div>
        <div class="modal-body pb-0">
            <div class="table-responsive-md">
              <table class="table mb-3">
                <thead>
                  <tr>
                    <th scope="col" class="text-center py-3" width="60"></th>
                    <th scope="col" class="py-3">商品</th>
                    <th scope="col" class="py-3" width="60">數量</th>
                    <th scope="col" class="py-3" width="80">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" class="text-center py-2">
                      <div class="btn btn-outline-danger btn-sm p-0 border-0">
                        <span class="material-icons h2 text-danger">delete_forever</span>
                      </div>
                    </th>
                    <td class="pb-0"><span>Lorem ipsum dolor sit, amet </span></td>
                    <td class="text-left">100</td>
                    <td class="text-right">20000</td>
                  </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan="4">
                    <div class="text-right h5 py-4">
                      小計  NT $1234
                    </div>
                  </td>
                </tr>
              </tfoot>
              </table>
            </div> 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning btn-block font-weight-bolder">結帳去</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>




<script>
import NavBar from '@/components/front/NavBar.vue';

export default {
 components: {
      NavBar,
  },
  data: function(){
    return {     
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
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

.fixcart {
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
.fixcart .btn {
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
