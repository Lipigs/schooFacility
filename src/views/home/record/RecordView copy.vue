<template>
  <div class="record">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-row v-for="item in list" :key="item" class="row">
        <van-col span="8">{{ item }}</van-col>
      </van-row>
    </van-list>
  </div>
</template>
<script setup>
import { ref } from "vue";
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 10) {
      finished.value = true;
    }
  }, 1000);
};
</script>

<style scoped>
.row{
  height: 130px;
  width: 94%;
  border-radius: 12px;
  margin: 0px auto;
  margin-top: 20px;
  background-color: aliceblue;
  
}
</style>