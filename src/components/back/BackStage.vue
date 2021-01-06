<template>
<div class="container-fluid px-0">
 <loading :active.sync="isLoading"></loading>
  <div class="row no-gutters">
    <div class="col-lg-3">
      <BackSidebar></BackSidebar>
    </div>

    <div class="col-lg-9">
      <BackNavbar />
      <Alert />
      <router-view />
    </div>
  </div>
</div> 
</template>

<script>
import BackNavbar from '@/components/back/BackNavbar.vue';
import BackSidebar from '@/components/back/BackSidebar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    BackNavbar,
    BackSidebar,
    Alert
  },
  computed: {
    isLoading() {
      return this.$store.state.status.isLoading;
    }
  },
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log('myCookie', myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
  data(){
    return {
     
    }
  },
};

</script>


