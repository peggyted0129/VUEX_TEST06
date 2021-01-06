<template>
<section class="my-8 text-topic row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th class="py-5">品名</th>
          <th class="py-5">數量</th>
          <th class="py-5">單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="py-5 align-middle">{{ item.product.title }}</td>
            <td class="py-5 align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="py-5 align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-danger text-right py-5 font-weight-bolder">總計</td>
            <td class="text-danger text-right font-weight-bolder py-5">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table mb-0">
        <tbody>
          <tr>
            <th class="py-5" width="150">Email</th>
            <td class="py-5 pl-12">{{ order.user.email }}</td>
          </tr>
          <tr>
            <th class="py-5">姓名</th>
            <td class="py-5 pl-12">{{ order.user.name }}</td>
          </tr>
          <tr>
            <th class="py-5">收件人電話</th>
            <td class="py-5 pl-12">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th class="py-5">收件人地址</th>
            <td class="py-5 pl-12">{{ order.user.address }}</td>
          </tr>
          <tr>
            <th class="py-5">付款狀態</th>
            <td>
              <span v-if="!order.is_paid" class="pl-12">尚未付款</span>
              <span v-else class="text-success pl-12">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
</section>
</template>


<script>
export default {
  data() {
    return {    
        orderId: '',
        order: {
            user: {},
        },
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.status.isLoading;
    }
  },
  methods: {
    getOrder(){
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
        vm.$store.dispatch('updateLoading', true);
        this.$http.get(api).then((response) => {
            console.log('getOrder', response.data);
            vm.order = response.data.order;
            vm.$store.dispatch('updateLoading', false);
        });
    },
    payOrder(){
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
        vm.$store.dispatch('updateLoading', true);
        this.$http.post(api).then((response) => {
            console.log('payOrder', response.data);
            if (response.data.success) {
                vm.getOrder();
            }
            vm.$store.dispatch('updateLoading', false);
        });
    }
  },
  created(){
      this.orderId = this.$route.params.orderId;
      console.log(this.orderId);
      this.getOrder();
  }
}
</script>