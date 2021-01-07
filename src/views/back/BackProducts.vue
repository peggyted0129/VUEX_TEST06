<template>
<section class="my-6 text-topic">
  <div class="container">
    <div class="text-right mb-8">
      <button  class="btn btn-topic btn-md h5" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" width="130">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="100">原價</th>
          <th scope="col" width="100">售價</th>
          <th scope="col" width="130">是否啟用</th>
          <th scope="col" width="160">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button  class="btn btn-outline-topic btn-sm mr-4" @click="openModal(false, item)">編輯</button>
            <button  class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getProductsA"></Pagination>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-topic text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-0">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr class="my-4">

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
             <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
             <button type="button" class="btn btn-topic" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
     <!-- 刪除產品的modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
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
  components: {
    Pagination,
  },
  computed: {
    isLoading() {
      return this.$store.state.status.isLoading;
    }
  },
  data() {
    return {     
      products: [],
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
      pagination: {},
    };
  },
  methods: {
    getProductsA(page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading', false);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item){
      if(isNew){
        this.tempProduct = {};
        this.isNew = true;
      }else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    updateProduct(){
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if(!vm.isNew){
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$store.dispatch('updateLoading', true);
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        vm.$store.dispatch('updateLoading', false);
        if (response.data.success){
          $('#productModal').modal('hide');
          vm.getProductsA();
          this.$bus.$emit('message:push', response.data.message, 'info');
        }else {
          $('#productModal').modal('hide');
          vm.getProductsA();
          console.log('新增失敗');
          this.$bus.$emit('message:push', '新增產品失敗', 'danger');
        }
      });
    },
    uploadFile(){
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        vm.status.fileUploading = false;
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        }else {
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
    openDelProductModal(item) {
      const vm = this;
      $('#delProductModal').modal('show');
      vm.tempProduct = { ...item };
    },
    delProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.delete(url).then((response) => {
        console.log(response, vm.tempProduct);
        this.$bus.$emit('message:push', response.data.message, 'danger');
        $('#delProductModal').modal('hide');
        vm.$store.dispatch('updateLoading', false);
        vm.getProductsA();
      });
    },
  },
  created(){
    this.getProductsA();
  }
}

</script>

<style lang="scss" scope>
@import '../../assets/scss/all';

.table thead th {
    border-bottom: 2px solid $hgray;
    border-top: 0px solid #dee2e6; 
}
.table th, .table td {
  padding: 10px 25px;
}
.table-hover tbody tr:hover {
    background-color: $milk;
}

</style>