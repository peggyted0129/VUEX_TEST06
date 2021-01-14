<template>
<section>
<div class="container-md container-fluid text-topic">
    <!-- timeline -->
    <div class="cart-check d-flex flex-lg-row flex-column justify-content-lg-between">
        <div class="cart-timeline w-100 mb-md-15 mb-lg-0">
            <ul class="row no-gutters timeline-section bg-warning w-100">
                <li class="col-4">
                    <div class="timeline-pointer d-flex justify-content-center">
                        <div class="cart-circle bg-secondary" :class="{ active: orderStep == 'create' }">
                            <span class="cart-step">1</span>
                        </div>
                        <p class="h6 px-0 py-10 text-secondary font-weight-bolder" :class="{ activetext: orderStep == 'create' }">建立訂單</p>
                    </div>
                </li>
                <li class="col-4">
                    <div class="timeline-pointer d-flex justify-content-center">
                        <div class="cart-circle bg-secondary" :class="{ active: orderStep == 'paying' }">
                            <span class="cart-step">2</span>
                        </div>
                        <p class="h6 px-0 py-10 text-secondary font-weight-bolder" :class="{ activetext: orderStep == 'paying'}">確認訂購資料</p>
                    </div>
                </li>
                <li class="col-4">
                    <div class="timeline-pointer d-flex justify-content-center">
                        <div class="cart-circle bg-secondary" :class="{ active: orderStep == 'paid' }">
                            <span class="cart-step">3</span>
                        </div>
                        <p class="h6 px-0 py-10 text-secondary font-weight-bolder" :class="{ activetext: orderStep == 'paid'}">付款完成</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

     <router-view></router-view>

</div>   
</section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(['orderStep']),
  },
  methods: {
    ...mapGetters(['setOrderStep']),
  },
};
</script>


<style lang="scss" scoped>
@import '../../assets/scss/all';

.cart-circle.active {
  background-color: $warning !important;
}
.activetext {
  color: $dark !important;
}

</style>