<template>
  <div class="my">
    <div class="top">
      <van-image
      style="margin-top: 10px;"
        width="100vw"
        height="15vh"
        radius="20px"
        fit="cover"
        :src="imageUrl"
      />
    </div>
    <van-pull-refresh
      class="refresh"
      v-model="loading"
      pull-distance="60"
      head-height="60"
      loosing-text="."
      pulling-text="."
      loading-text="."
      success-text="."
      success-duration="0"
      @refresh="onRefresh"
    >
      <div class="content">
        <van-row class="height:100px">
          <van-col span="6" class="col" style="align-items: center">
            <van-image
              radius="5px"
              width="70px"
              height="70px"
              fit="cover"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </van-col>
          <van-col span="1" class="col"> </van-col>
          <van-col span="17" class="col">
            <div style="font-size: 16px; color: #181818">啦啦啦啦</div>
            <div style="font-size: 12px; color: #717171">账号：liyi</div>
          </van-col>
        </van-row>
        <!-- 单元格 -->
        <div style="background-color: #eeeeee; padding-top: 10px">
          <!-- 开头-->
          <van-cell is-link size="large">
            <template #title>
              <van-icon name="todo-list-o" color="red"/>
              <span class="custom-title" style="margin-left: 10px">统计</span>
            </template>
          </van-cell>
          <van-cell is-link to="/school/feedback/my" size="large">
            <template #title>
              <van-icon name="question-o" color="red" />
              <span class="custom-title" style="margin-left: 10px">反馈</span>
            </template>
          </van-cell>
          <!-- ------中间------------------ -->
          <!-- <van-cell is-link style="margin-top: 10px">
            <template #title>
              <van-icon name="setting-o" color="#1989fa" />
              <span class="custom-title" style="margin-left: 10px">设置</span>
            </template>
          </van-cell>
          <van-cell is-link>
            <template #title>
              <van-icon name="setting-o" color="#1989fa" />
              <span class="custom-title" style="margin-left: 10px">设置</span>
            </template>
          </van-cell> -->
          <van-cell is-link to="/school/feedback" size="large" style="margin-top: 10px">
            <template #title>
              <van-icon name="other-pay" color="#ee0a24" />
              <span class="custom-title" style="margin-left: 10px"
                >我的反馈</span
              >
            </template>
          </van-cell>
          <!-- 底部 -->
          <van-cell is-link style="margin-top: 10px" to="/school/set" size="large">
            <template #title>
              <van-icon name="setting-o" color="#1989fa" />
              <span class="custom-title" style="margin-left: 10px">设置</span>
            </template>
          </van-cell>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { showToast } from "vant";
const count = ref(0);
let imageUrl =require("../../../assets/my_page_top_background.png")
const loading = ref(false);
const onRefresh = () => {
  loading.value = false;
};
</script>

<style scoped>
.my {
  height: 100vh;
  width: 100vw;
  background-color: #eeeeee;
}
.top {
  width: 100vw;
  height: 16vh;
  background-color: aliceblue;
}
.refresh {
  --van-pull-refresh-loading-icon-size: 0px;
  --van-pull-refresh-head-font-size: 0px;
  height: 80vh;
  background: linear-gradient(to bottom, white 50%, #eeeeee 50%);
}
.content {
  height: 70%;
  width: 100%;
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.content .col {
  height: 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.custom-title {
  vertical-align: middle;
}
</style>