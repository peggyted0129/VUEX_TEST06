<template>
<section>
    <div class="container">
        <h2 class="text-center pt-16">訂單列表</h2>
        <div class="table-responsive mt-10">
            <table class="table" v-if="orders">
            <thead>
                <tr>
                <th scope="col" style="min-width: 120px" class="py-4">訂單時間</th>
                <th scope="col" class="py-4">訂單編號</th>
                <th scope="col" style="min-width: 110px;" class="py-4">顧客姓名</th>
                <th scope="col" style="min-width: 300px;" class="py-4">訂單商品</th>
                <th scope="col" style="min-width: 130px" class="py-4">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td class="py-4 text-secondary">{{ order.create_at | date }}</td>
                    <td class="py-4 text-secondary">{{ order.id }}</td>
                    <td class="py-4 text-secondary">{{ order.user.name }}</td>
                    <td class="py-4 text-secondary">
                        <div v-for="item in order.products" :key="item.id">
                        {{ item.product.title }} * {{ item.qty
                        }}{{ item.product.unit }}
                        </div>
                    </td>
                    <td>
                        <div v-if="!order.is_paid" class="text-danger">尚未付款</div>
                        <div v-if="order.is_paid" class="text-success">已經付款</div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        <Pagination class="my-7" :pages="pagination" @emitPages="getAllOrders"></Pagination>
    </div>   
</section>
</template>

<script>
import Pagination from '@/components/pagination';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      orders: {
        user: {},
      },
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    getAllOrders(currentPage = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${currentPage}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        console.log('getOrders', response.data);
        vm.$store.dispatch('updateLoading', false);
      });
    }
  },
  created() {
    this.getAllOrders();
  },
}

</script>
