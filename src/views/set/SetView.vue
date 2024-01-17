<template>
  <div class="set">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
  </div>
</template>
<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router";
let router = useRouter();
// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
</script>

<style scoped>
</style>