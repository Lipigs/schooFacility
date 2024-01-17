<template>
  <div class="feedback">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="我的反馈"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>

    <div></div>
    <van-sticky>
      <van-tabs v-model:active="active">
        <van-tab title="已经处理">
          <img :src='imageUrl' alt=""  style="width: 98vw;height:5vh;margin-left:1vw;"/>
          <div
            class="box"
            v-for="(item, index) in myFeedbackSuccess"
            :key="index"
            @click="feedbackClick(item)"
          >
            <div class="top">
              <div style="margin-left: 5px; color: #31bdec">
                反馈单号： {{ item.id }}
              </div>
              <div style="margin-right: 10px">{{ item.feedbackType }}</div>
            </div>
            <div class="div2">
              <van-image
                width="13vw"
                height="50px"
                fit="cover"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
              <div class="info">
                <div
                  style="font-size: 13px; height: 55px"
                  class="problemDiscription van-multi-ellipsis--l3"
                >
                  {{ item.feedbackDescription }}
                </div>
                <div style="font-size: 7px; margin-top: 10px">
                  提交时间：{{ getDatetime(item.submitTime) }}
                </div>
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab title="处理中">
          <img :src='imageUrl' alt=""  style="width: 98vw;height:5vh;margin-left:1vw;"/>
          <div
            class="box"
            v-for="(item, index) in myFeedbackFail"
            :key="index"
            @click="feedbackClick(item)"
          >
            <div class="top">
              <div style="margin-left: 5px; color: #31bdec">
                反馈单号： {{ item.id }}
              </div>
              <div style="margin-right: 10px">{{ item.feedbackType }}</div>
            </div>
            <div class="div2">
              <van-image
                width="13vw"
                height="50px"
                fit="cover"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
              <div class="info">
                <div
                  style="font-size: 13px; height: 55px"
                  class="problemDiscription van-multi-ellipsis--l3"
                >
                  {{ item.feedbackDescription }}
                </div>
                <div style="font-size: 7px; margin-top: 10px">
                  提交时间：{{ getDatetime(item.submitTime) }}
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getMyFeedback } from "../../service/index.js";
import { getDatetime } from "../../util/date.js";
let imageUrl = require("../../assets/feekback.png");
let router = useRouter();
let active = ref(0);

let myFeedbackFail = ref([]);
let myFeedbackSuccess = ref([]);
getMyFeedback().then((res) => {
  console.log(res.data);
  myFeedbackFail.value = res.data[0];
  myFeedbackSuccess.value = res.data[1];
});

function feedbackClick(item) {
  router.push({
    path: "/school/feedback/feedbackDetail",
    query: { item: JSON.stringify(item) },
  });
}

// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
</script>

<style scoped>
.feedback {
  background-color: #ededed;
  height: 100vh;
}
.box {
  width: 96vw;
  height: 120px;

  /* background-color: white; */
  background-color: white;
  margin: 10px auto;
  border-radius: 15px;
}
.box .top {
  font-size: 12px;
  border-bottom: 1px solid #eeeeee;
  width: 96vw;
  display: flex;
  justify-content: space-between;
  color: red;
}
.box > .div2 {
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-around;
}
.info {
  width: 75vw;
  height: 80px;
  overflow: hidden; /* 隐藏溢出的文本 */
}
.problemDiscription {
  width: 70vw;
}
</style>