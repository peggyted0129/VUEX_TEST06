<template>
<section>
	<!-- 麵包屑導覽 -->
	<nav aria-label="breadcrumb">
			<ol class="breadcrumb bg-transparent px-0 mb-7">
					<li class="breadcrumb-item"><router-link class="text-topic" to="/cart">購物車列表</router-link></li>
					<li class="breadcrumb-item font-weight-bolder active" aria-current="page">建立訂單</li>
			</ol>
	</nav>
	<div class="row mb-12">
		<!-- 訂單說明 -->
		<div class="col-md-5">
			<div class="card border">
				<h5 class="card-header">訂單說明</h5>
				<div class="card-body">
					<div class="d-flex mb-4">
							<h5 class="card-title mr-auto">商品數量</h5>
							<p class="card-text h5">{{ cart.carts.length }} 件</p>
					</div>
					<div class="d-flex mb-10" v-if="cart.total === cart.final_total">
							<h5 class="card-title mr-auto">金額總計</h5>
							<p class="card-text text-danger h5 font-weight-bolder">{{ cart.total | currency }} 元</p>
					</div>
					<div class="d-flex mb-10" v-if="cart.total !== cart.final_total">
							<h5 class="card-title mr-auto h5">金額總計</h5>
							<p class="card-text text-danger h5 font-weight-bolder">{{ cart.final_total | currency }} 元</p>
					</div>
					<hr class="my-10">
					<ul>
						<li class="font-weight-bolder lh-lg">[ 商品配送需知 ]</li>
						<li class="text-secondary d-flex">
							<span class="mr-3">★</span><p>每個6吋乳酪蛋糕皆有附提袋x1、直立蠟燭x1、含刀的6入叉盤x1，若有不需要附贈的部分請備註告知。</p>
						</li>
						<li class="text-secondary d-flex">
							<span class="mr-3">★</span><p>包裹內【不會有訂單明細、出貨單等資訊】，僅會附上DM參考，若有送禮需求顧慮也可以在訂單備註不用DM。</p>
						</li>
						<li class="text-secondary d-flex mb-6">
							<span class="mr-3">★</span><p>若有要寄送【不同地址請分別下單】，目前無提供拆單寄送服務。</p>
						</li>
						<li class="font-weight-bolder lh-lg">[ 退換貨資訊 ]</li>
						<li class="text-secondary d-flex">
							<span class="mr-3">★</span><p>蛋糕皆為接單製作生產，如果訂單狀態為【已確認】，即無法取消或退款。如有其他不可抗之因素，請致電客服詢問。</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 顧客資料 (驗證功能) -->
		<div class="col-md-7">
			<div class="card border">
				<h5 class="card-header">顧客資料</h5>
				<div class="card-body">
					<Validation-observer v-slot="{ invalid }">
						<form @submit.prevent="createOrder">
							<div class="form-row">
								<div class="col-md-6 mb-5">
									<validation-provider rules="required|email" v-slot="{ errors, classes }">
										<label for="email">Email</label>
										<input name="Email" type="email" class="form-control" id="email" v-model="form.user.email"
													 :class="classes" placeholder="請輸入Email"/>
										<span class="invalid-feedback">{{ errors[0] }}</span>
									</validation-provider>
								</div>
								<div class="col-md-6 mb-5">
									<validation-provider rules="required" v-slot="{ errors, classes }">
										<label for="name">收件人姓名</label>
										<input name="收件人姓名" type="text" class="form-control" id="name" v-model="form.user.name" 
													:class="classes" placeholder="請輸入姓名"/>
										<span class="text-danger">{{ errors[0] }}</span>
									</validation-provider>
								</div>
							</div>
							<validation-provider rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="telphone">收件人電話</label>
                  <input name="電話" type="tel" class="form-control" id="telphone" v-model="form.user.tel" 
                         :class="classes" placeholder="請輸入電話" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="address">收件人地址</label>
                  <input name="收件人地址" type="address" class="form-control" id="address" v-model="form.user.address" 
                         :class="classes" placeholder="請輸入地址" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </validation-provider>
							<div class="form-group">
                <label for="usertext">留言</label>
                <textarea name="" id="usertext" class="form-control" cols="20" rows="10"
                          v-model="form.message" placeholder="有什麼話想告訴店家的嗎 ?"></textarea>
              </div>
							<div class="d-flex">
									<button :disabled="invalid" class="btn btn-warning w-50 ml-auto">送出訂單</button> 
							</div>
						</form>
					</Validation-observer>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
			form: {
				user: {
						name: '',
						email: '',
						tel: '',
						address: '',
				},
				message: '',
			},
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'orderStep']),
    ...mapGetters('cartsModules', ['cart']),

  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    ...mapActions(['setOrderStep']),

    createOrder(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.post(api, {data: order} ).then((response) => {
        console.log('訂單建立失敗');
        if(response.data.success){
					vm.$router.push(`/checkout/order_paying/${response.data.orderId}`); 
					//orderId 要和路由設定一樣
					console.log('訂單已建立: ',response.data);
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    const vm = this;
    vm.setOrderStep('create');
		vm.getCart();
  },
};
</script>

<style scoped>
.invalid-feedback {
   font-size: 100%;
}
</style>