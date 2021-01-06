<template>
<div class="back-nav d-flex justify-content-between align-items-center pt-11 pb-3 px-5">
  <h2 class="h4 font-weight-bolder text-topic py-4">Backstage management</h2>
  <a href="#" @click.prevent="signout" class="btn btn-topic btn-lg h4">登出</a>
</div> 
</template>

<script>

export default {
  data: function(){
    return {
      
    }
  },
  methods: {
    signout(){
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          vm.$router.push('/login');
        }
      });
    }
  }
};

</script>

