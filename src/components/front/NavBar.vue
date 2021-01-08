<template>
  <header :class="{'navbar-scroll': isMenuOpen || scrollHeader}" class="navbar navbar-expand-md navbar-light py-md-1 px-md-5 p-0">
    <div class="container-fluid container-md">
      <h1 class="ml-5 ml-md-0"><router-link :to="{ name: 'Home' }" class="navbar-logo">Emily</router-link></h1>
      <button class="navbar-toggler py-3 px-5" @click="barDropdown = !barDropdown" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <div class="position-relative"> 
            <span class="toggler-bar toggler-bar-top" :class="{'toggler-bar-top-rotate':barDropdown}"></span>
            <span class="toggler-bar toggler-bar-middle" :class="{'d-none':barDropdown}"></span>
            <span class="toggler-bar toggler-bar-bottom" :class="{'toggler-bar-bottom-rotate':barDropdown}"></span>
        </div> 
      </button> 
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"> 
            <router-link class="nav-link h5 text-center px-3 py-md-3 py-5" to="/products">
              <span class="material-icons align-bottom d-md-inline-block d-none mr-1">receipt_long</span>所有商品
            </router-link>
          </li>
          <li class="nav-item ml-xl-9 ml-lg-5 ml-md-3">
            <a class="nav-link h5 text-center px-3 py-md-3 py-5" href="#">
            <span class="material-icons align-bottom d-md-inline-block d-none mr-1">favorite</span>我的最愛
            </a>
          </li>
          <li class="nav-item ml-xl-9 ml-lg-5 ml-md-3">
            <a class="nav-link h5 text-center px-3 py-md-3 py-5" href="#">
            <span class="material-icons align-bottom d-md-inline-block d-none mr-1">thumb_up</span>訂單
            </a>
          </li>
          <li class="nav-item ml-xl-9 ml-lg-5 ml-md-3">
            <router-link class="nav-link h5 text-center px-3 py-md-3 py-5" to="/login">
              <span class="material-icons align-bottom d-md-inline-block d-none mr-1">account_box</span>登入後台
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header> 
</template>

<script>

export default {
  data: function(){
    return {
      barDropdown: false,
      scrollHeader: false,
      isMenuOpen: false,
      routerName: this.$route.name,
    }
  },
  methods: {
    scrollPage() {
      const vm = this;
      const scrollTop = $(window).scrollTop();
      const { routerName } = this;
      switch (true) {
        case routerName === 'Home' && scrollTop > 0:
          window.addEventListener('scroll', vm.scrollPage);
          vm.scrollHeader = true;
          break;
        case routerName === 'Home':
          window.addEventListener('scroll', vm.scrollPage);
          vm.scrollHeader = false;
          break;
        default:
          window.removeEventListener('scroll', vm.scrollPage);
          vm.scrollHeader = true;
          break;
      }
    },
  },
  watch: {
    $route(to, from) {
      const vm = this;
      if (to.path !== from.path) {
        vm.routerName = to.name;
        vm.isMenuOpen = false;
        vm.scrollPage();
      }
    },
  },
  created(){
    this.scrollPage();
  }
}


</script>
<style lang="scss" scope>
@import '../../assets/scss/all';

.navbar-scroll {
  background-color: $warning !important;
  & .navbar-logo {
    font-size: 40px;
    color: $topic;
    &:hover {
      color: $white;
    }
  }
}
@include pad {
  .navbar-scroll.navbar-light .navbar-nav .nav-link {
     color:$topic;
     &:hover, &:focus {
        color: $white;
     }
  }
}
.navbar-logo {
    font-family: Kaushan Script,cursive;
    transition: all .25s ease;
    font-size: 3rem;
    color: $white;
    &:hover {
      color: $warning;
    }
}


</style>
