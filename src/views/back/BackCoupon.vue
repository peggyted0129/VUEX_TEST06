<template>
<section class="my-6 text-topic">
  <div class="container-fluid">
    <div class="text-right mb-8">
      <button  class="btn btn-topic btn-md h5" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table table-hover mb-10">
      <thead>
        <tr>
          <th scope="col" class="py-4">名稱</th>
          <th scope="col" class="py-4">優惠碼</th>
          <th scope="col" class="py-4">折扣百分比</th>
          <th scope="col" class="py-4">到期日</th>
          <th scope="col" class="py-4">是否啟用</th>
          <th scope="col" class="py-4">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td class="py-4">{{ item.title }}</td>
          <td class="py-4">{{ item.code }}</td>
          <td class="py-4">{{ item.percent }}%</td>
          <td class="py-4">{{ item.due_date | date }}</td>
          <td class="py-4">
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td class="py-4">
            <button  class="btn btn-outline-topic btn-sm mr-4" @click="openCouponModal(false, item)">編輯</button>
            <button  class="btn btn-outline-danger btn-sm" @click="delCoupon(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>

    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>


<script>
import Pagination from '@/components/pagination';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,  // timestamp (1612051200)
        code: '',
      },
      due_date: new Date(), 
      pagination: {}, 
      isNew: false,
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
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    openCouponModal(isNew, item) {
      const vm = this;
      $('#couponModal').modal('show');
      vm.isNew = isNew;
      if (vm.isNew) {
        vm.tempCoupon = {};
      } else {
        vm.tempCoupon = {...item};
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        vm.due_date = dateAndTime[0];
      }
    },
    getCoupons(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then((response) => {
        console.log('getCoupons:　', response.data);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      }
      vm.$store.dispatch('updateLoading', true);
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading', false);
        if (response.data.success){
          $('#couponModal').modal('hide');
          vm.getCoupons();
          this.$bus.$emit('message:push', response.data.message, 'info');
        }else {
          $('#couponModal').modal('hide');
          vm.getCoupons();
          console.log('新增失敗');
          this.$bus.$emit('message:push', '新增產品失敗', 'danger');
        }
      });
    },
    delCoupon(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.delete(url).then((response) => {
        this.$bus.$emit('message:push', response.data.message, 'danger');
        vm.$store.dispatch('updateLoading', false);
        vm.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>