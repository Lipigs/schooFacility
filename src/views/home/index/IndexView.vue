<template>
  <div class="index">
    <!-- 轮播图 -->
    <van-list style="width: 97%; margin: 0 auto">
      <van-swipe :autoplay="3000" lazy-render :show-indicators="true">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image.bannerImageUrl" />
        </van-swipe-item>
        <template #indicator="{ active, total }">
          <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
        </template>
      </van-swipe>
    </van-list>
    <!-- 通知栏-->
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
      color="#1989fa"
      background="#ecf9ff"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :touchable="false"
        :show-indicators="false"
      >
        <template v-for="(item, index) in banner">
          <van-swipe-item>{{ item.bannerDescription }}</van-swipe-item>
        </template>
      </van-swipe>
    </van-notice-bar>

    <div>
      <!--  签到-->
      <div class="div_b">
        <div @click="clickDivMap" class="div_title">扫码签到</div>
        <div @click="clickDivMap" class="div1">
          <img
            src="../../../assets/qiandao2.png"
            alt=""
            style="width: 60px; height: 60px"
          />
        </div>
      </div>
      <!-- 设有设施 -->
      <div class="div_c" @click="clickFacility">
        <div style="width: 50%; height: 100%; textAlign: center">
          <van-icon
            name="cluster"
            color="#ffbe8f"
            size="80"
            style="line-height: 150px"
          />
        </div>
        <div
          style="width: 50%; height: 50px; marginTop: 50px; paddingLeft: 40px"
        >
          <div class="div_title">设有设施</div>
          <div class="div_f_title">前往查看<van-icon name="arrow" /></div>
        </div>
      </div>
      <!-- 网上预约 -->
      <div class="div_d" @click="clickreServation">
        <div
          style="width: 50%; height: 50px; marginTop: 50px; textAlign: center"
        >
          <div class="div_title">网上预约</div>
          <div class="div_f_title">立即预约<van-icon name="arrow" /></div>
        </div>
        <div
          style="width: 50%; height: 80px; paddingLeft: 40px; marginTop: 35px"
        >
          <!-- <van-icon name="underway" color="#dbdbdb" size="80" style="line-height:150px" /> -->
          <img
            src="../../../assets/yuyue3.png"
            style="line-height: 150px; width: 90px; height: 90px"
          />
        </div>
      </div>
      <!-- 预约历史 -->
      <div class="div_a" @click="clickLiShi">
        <div style="width: 50%; height: 100%; textAlign: center">
          <van-icon
            name="label"
            color="#def7ec"
            size="80"
            style="line-height: 150px"
          />
        </div>
        <div
          style="width: 50%; height: 50px; marginTop: 50px; paddingLeft: 40px"
        >
          <div class="div_title">预约历史</div>
          <div class="div_f_title">前往查看<van-icon name="arrow" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();
import { getAllBanners } from "@/service";
let images = ref([
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
]);
let banner = ref([]);
// 轮播图数据加载
getAllBanners().then((res) => {
  console.log(res.data);
  if (res.data.length > 0) {
    images.value = res.data;
    banner.value = res.data;
  }
}).catch((err) => {
});
// 签到
function clickDivMap() {
  router.push({
    path: "/school/scanner",
  });
}
function clickDivMap2() {
  // router.push({
  //   path: "/school/scanner3",
  // });
}
// 点击查看所有设施
function clickFacility() {
  router.push({
    path: "/school/allFacility",
  });
}
// 点击预约
function clickreServation() {
  router.push({
    path: "/school/home/reservation",
  });
}
// 点击历史
function clickLiShi() {
  router.push({
    path: "/school/home/record",
  });
}
</script>
<style scoped>
.index {
  height: 100%;
  margin-bottom: 50px;
}
img {
  width: 100vw;
  height: 200px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.div_a {
  width: 96%;
  margin: 10px auto;
  height: 150px;
  background-image: linear-gradient(to right, #1ec89c, #79e993);
  display: flex;
}
.div_b {
  width: 96%;
  margin: 10px auto;
  height: 80px;
  background-image: linear-gradient(to right, #37d4f2, #389bd8);
  display: flex;
}
.div_b > div {
  width: 50%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 22px;
}
.div_b > .div1 {
  display: flex;
  align-items: center;
  padding-left: 40px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.div_c {
  width: 96%;
  margin: 10px auto;
  height: 150px;
  background-image: linear-gradient(to right, #ff7a5a, #ffc58c);
  display: flex;
}
.div_title {
  font-size: 20px;
  color: white;
}
.div_f_title {
  font-size: 12px;
  color: #edeff6;
  margin-top: 10px;
}
.div_d {
  width: 96%;
  margin: 10px auto;
  height: 150px;
  background-image: linear-gradient(to right, #9689fe, #7973f3);
  display: flex;
}
</style>