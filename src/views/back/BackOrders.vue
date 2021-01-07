<template>
  <div class="container-fluid">
    <table class="table mt-4 mb-13">
        <thead>
            <tr>
                <th class="py-5">購買時間</th>
                <th width="250" class="py-5">訂單編號</th>
                <th width="350" class="py-5">購買款項</th>
                <th class="py-5">應付金額</th>
                <th class="py-5 pl-10">是否付款</th>
                <th class="py-5">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id"
             :class="{'text-secondary': !item.is_paid}">
                <td>{{ item.create_at | date }}</td>
                <td><span v-text="item.id" v-if="item.id"></span></td>
                <td class="py-4">
                    <ul>
                      <li v-for="(product, i) in item.products" :key="i">
                          {{ product.product.title }} 數量：{{ product.qty }}
                          {{ product.product.unit }}
                      </li>
                    </ul>
                </td>
                <td class="text-right">{{ item.total | currency }}</td>
                <td class="pl-10">
                    <strong v-if="item.is_paid" class="text-success">已付款</strong>
                    <span v-else class="text-muted">尚未付款</span>
                </td>
                <td>
                  <button class="btn btn-outline-topic" @click="openModal(item)">
                    編輯
                  </button>
                </td>
            </tr>
        </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getOrdersA"></Pagination>

     <!-- Order modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="orderModal" data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title bg-warning">修改訂單</h5>
            <button type="button" class="close text-topic" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>訂單編號 {{ tempOrder.id }}</div>
            <ul class="form-row mt-5">
              <li class="form-group col-md-6">
                <label for="customName">訂購人姓名</label>
                <input type="text" class="form-control" id="customName"
                        v-model="tempOrder.user.name" v-if="tempOrder.user">
              </li>
              <li class="form-group col-md-6">
                <label for="customTel">訂購人電話</label>
                <input type="tel" class="form-control" id="customTel"
                        v-model="tempOrder.user.tel" v-if="tempOrder.user">
              </li>
              <li class="form-group col-12">
                <label for="customMail">訂購人信箱</label>
                <input type="email" class="form-control" id="customMail"
                        v-model="tempOrder.user.email" v-if="tempOrder.user">
              </li>
              <li class="form-group col-12">
                <label for="customAddress">訂購人地址</label>
                <input type="text" class="form-control" id="customAddress"
                        v-model="tempOrder.user.address" v-if="tempOrder.user">
              </li>
            </ul>
            <ul class="mt-5">訂單品項 :
              <li v-for="(item, i) in tempOrder.products" :key="i">
                  {{ item.product.title }} 數量：{{ item.qty }}
                  {{ item.product.unit }}
              </li>
            </ul>
            <div class="form-check mt-5">
              <input class="form-check-input" type="checkbox" id="defaultCheck1" v-model="tempOrder.is_paid"/>
              <label class="form-check-label" for="defaultCheck1">
                是否付款
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-topic" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-warning" @click="updateOrder"> 
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
export default {
  data() {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  computed: {
    isLoading() {
      return this.$store.state.status.isLoading;
    }
  },
  methods: {
    getOrdersA(currentPage = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${currentPage}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch('updateLoading', false);
        console.log('getOrders', response.data);
      });
    },
    openModal(item) {
      const vm = this;
      vm.tempOrder = { ...item };
      $('#orderModal').modal('show');
      console.log('openModal', vm.tempOrder);
    },
    updateOrder(){
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      const order = { data: vm.tempOrder };
      vm.$store.dispatch('updateLoading', true);
      this.$http.put(url, order).then((response) => {
        console.log(response.data);
        $('#orderModal').modal('hide');
        vm.getOrdersA();
        vm.$store.dispatch('updateLoading', false);
      });
    }
  },
  created() {
    this.getOrdersA();
  },
};
</script>
