<template>
  <div>
    <div class="home-banner" style="height:100vh">
      <div class="container h-100 d-flex flex-column align-items-center justify-content-center">
        <ul class="home-banner-text px-md-10 px-4 py-4" data-aos="fade-up" data-aos-delay="800">
          <li class="text-piece text-center lh-1 mb-5">Love &nbsp;|&nbsp;  Gift  &nbsp;|&nbsp;  Nature  &nbsp;|&nbsp;  Dream</li>
          <li class="text-natural h6 lh-1 mb-5">致，健康樂活的人們!<br>堅持對純手工製成、保留食材純淨原味的感動，<br>咬一口，入口即化~<br>每口都是幸福滋味!</li>
          <li class="text-since lh-1 mb-0 text-right">Since 2002</li>
        </ul>
        <div id="scrollDown" class="demo">
          <a href="#fairy"><span></span>Scroll</a>
        </div>
      </div>
    </div>
    <div id="fairy" style="height:68px"></div> <!-- 空行 -->
    <!-- 杯子蛋糕圖 -->
    <section class="mb-11 mb-md-13" data-aos="fade-up" data-aos-duration="2000"> 
      <div class="row no-gutters">
        <div class="col-md-5 offset-md-7 col-lg-6 offset-lg-6 col-xl-7 offset-xl-5 fairy-bg position-absolute"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-lg-6 col-xl-5">
              <div class="fairy-title d-flex flex-column justify-content-center">
                <div class="fairy-shadow">
                  <h2 class="h4">童話蛋糕 X 夢幻吃的到 !</h2>
                  <p class="mt-9 h6 text-secondary lh-lg">
                    杯子蛋糕為剛好一人可獨享的甜品，<br>
                    杯子蛋糕更被稱為童話蛋糕，<br>
                    不僅杯中的蛋糕體可以做不同的口味，<br>
                    上層的奶油裝飾更可以天馬行空，<br>
                    不同的奶油花擠法、加入翻糖造型，<br>
                    就像是童話故事成了女孩們的夢幻回憶。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 吃蛋糕圖 -->
    <section class="mb-11 mb-md-13" data-aos="fade-up" data-aos-duration="2000"> 
      <div class="row no-gutters">
        <div class="col-md-7 eat-bg position-absolute"></div>
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-md-6 offset-md-6 col-lg-5 offset-lg-7">
              <div class="fairy-title d-flex align-items-center justify-content-md-end justify-content-center">
                <div class="eat-shadow">
                  <h2 class="h4">為浪漫做一點事 ~</h2>
                  <p class="mt-9 h6 text-secondary lh-lg pr-lg-13">
                    小朋友流口水，<br>
                    姐姐會尖叫，<br>
                    為浪漫做一點事，<br>
                    快點手刀訂購夢幻的甜點，<br>
                    一成不變的日子，需要些改變!<br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 輪播 -->
    <section class="container position-relative mb-md-13">
        <div class="d-flex flex-column align-items-center">
          <h2 class="align-center">口碑推薦</h2>
          <img class="mt-6 title-mark" src="@/assets/image/divider.png" alt="">
        </div>

        <!-- 輪播內容 -->
        <Carousel />
         
    </section>

    <!-- subscribe 歡迎訂閱 -->
    <section class="subscribe d-flex align-items-end pb-16" id="subscribe">
      <div class="container">
        <div class="d-flex flex-column align-items-md-start align-items-center" data-aos="fade-up" data-aos-duration="2000">
          <Validation-observer v-slot="{ invalid }">  
            <form @submit.prevent="subscription">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <div class="input-group">
                  <label for="inputEmail" class="h3 lh-1 text-white font-weight-bolder mb-6">記得<br> 訂閱以獲取更多資訊及專屬優惠！</label>
                  <input name="Email" type="email" v-model="email" :class="classes" class="form-control rounded-left py-8 px-5" id="inputEmail" placeholder="請輸入Email">
                  <button type="submit" class="btn btn-glass rounded-right" :disabled="invalid">訂閱</button>
                  <span class="invalid-feedback text-warning">{{ errors[0] }}</span>
                </div>
              </validation-provider>
            </form>
          </Validation-observer>
        </div>
      </div>
    </section>

    <!-- 酷碰code modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title text-white" id="exampleModalCenterTitle">最新優惠</h5>
            <button type="button" class="close text-topic" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body home-modal h5 position-relative">
            <p class="home-modal-bg py-6 px-4">
              即日起結帳輸入優惠碼<span class="h3 text-danger ml-5">HappyCoupon</span>，<br>
              即享所有品項<span class="h3 text-danger">85折</span>優惠！
            </p>
          </div>
          <div class="modal-footer">
            <router-link to="/products" class="btn btn-warning" data-dismiss="modal">快去選購</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/front/Carousel';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Carousel,
  },
  data: function(){
    return {
     email: '',
    }
  },
  methods: {
    subscription(){
      $('#couponModal').modal('show')
    }
  },
};

</script>

<style lang="scss" scope>
@import '../../assets/scss/all';

.title-mark {
  width: 75%;
}
.eat {
  &-bg {
    @include banner('../../assets/image/bgpic2.jpeg', 500px);
    background-position: center top;
  }
  &-shadow{
    text-align: center;
    position: relative;
    background: rgba(255,255,255,.7);
  }
}
.fairy {
  &-bg {
    @include banner('../../assets/image/bgpic5.jpg', 500px);
    background-position: center top;
  }
  &-title {
    height: 500px;
  }
  &-shadow{
    text-align: center;
    position: relative;
    background: rgba(255,255,255,.7);
  }
}
@include smobile {
  .fairy-shadow, .eat-shadow {
    & .h4 {
      font-size: 32px;
    }
    & .h6 {
      font-size: 18px;
    }
  }
  .title-mark {
    width: 55%;
  }
}
@include pad {
  .title-mark {
    width: 30%;
  }
  .fairy-shadow, .eat-shadow {
    background: transparent;
    text-align: left;
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: -50px;
      left: -50px;
      box-shadow: 30px 30px 15px rgba(243, 157, 157, 0.9) inset;
    }
  }
  .eat-shadow:before {
    top: 20px;
    left: 20px;
    box-shadow: 20px 20px 15px rgba(243, 157, 157, 0.9);
  }
}
.home-banner {
    @include banner("https://upload.cc/i1/2020/12/10/0mzbhk.jpg", 100vh);
    &-text {
      background: rgba(56, 27, 27, 0.4);
      color: $white;
    }
}
.home-modal {
  @include banner('../../assets/image/mini2.jpg', 200px);
  &-bg {
    background: rgba(255, 255, 255, 0.7);
    line-height: 2.5;
    @include align-middle;
  }
}
@include smobile {
  .home-banner-text{
    & .text-title {
      font-size: 36px;
    }
    & .text-natural {
      font-size: 23px;
    }
  }
}
@include pad {
  .home-banner-text{
    & .text-title {
      font-size: 46px;
    }
    & .text-natural, & .text-piece {
      font-size: 28px;
    }
    & .text-since {
      font-size: 20px;
    }
  }
}
.subscribe {
    @include banner("https://upload.cc/i1/2020/12/10/rJuiYq.jpg", 400px);
    background-position: center center;
    & .form-control {
        border-radius: 0rem;
        border: 2px solid $glass;
        border-right: none;
    }
    & .input-group {
      max-width: 425px;
    }
    & .btn {
      padding: 0 10px;
      font-size: 14px;
    }
}
@include smobile {
  .subscribe {
    p {
      font-size: 32px;
    }
    & .btn {
      width: 30%;
      font-size: 22px;
    }
  }
}
@include mobile {
  .subscribe {
    & .btn {
      width: 40%;
    }
  }
}

</style>
