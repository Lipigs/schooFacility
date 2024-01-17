<template>
  <div class="home">
    <div class="home_top">
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
    </div>
    <div class="home_bottom">
      <van-tabbar v-model="tabbarActive" route>
        <van-tabbar-item icon="home-o" replace to="/school/home/index">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" replace to="/school/home/reservation">预约</van-tabbar-item>
        <van-tabbar-item icon="notes-o" replace to="/school/home/record">历史</van-tabbar-item>
        <van-tabbar-item icon="contact-o" replace to="/school/home/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let tabbarActive = ref(0);
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
}
.home_top {
  height: 100vh;
  width: 100vw;
  background-color: white;
}
.home_bottom{
height: 0px;

}
</style>