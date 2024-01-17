<template>
  <div class="feedbackMyView">
    <van-sticky>
      <van-nav-bar
        title="反馈"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
    <p class="problem">问题类别</p>
    <div class="problemType">
      <div
        :class="[{ selectedType: selectedProblemTypeIndex == 0 }]"
        @click="problemTypeClick(0)"
      >
        BUG反馈
      </div>
      <div
        :class="[{ selectedType: selectedProblemTypeIndex == 1 }]"
        @click="problemTypeClick(1)"
      >
        功能建议
      </div>
      <div
        :class="[{ selectedType: selectedProblemTypeIndex == 2 }]"
        @click="problemTypeClick(2)"
      >
        内容建议
      </div>
      <div
        :class="[{ selectedType: selectedProblemTypeIndex == 3 }]"
        @click="problemTypeClick(3)"
      >
        设施问题
      </div>
    </div>

    <p class="problem">问题描述*</p>
    <van-cell-group inset class="problemDiscription">
      <van-field
        v-model="problemDiscription"
        rows="6"
        autosize
        placeholder="请输入问题描述"
        type="textarea"
        maxlength="200"
        show-word-limit
      />
    </van-cell-group>
    <p class="problem">上传截图（选填）</p>
    <van-uploader
      class="uploader"
      v-model="fileList"
      multiple
      :before-read="beforeRead"
      :max-count="1"
      :after-read="afterRead"
      @oversize="onOversize"
      :max-size="1000 * 1024"
    />

    <p class="problem">联系方式（选填）</p>
    <!-- 输入手机号，调起手机号键盘 -->
    <div class="contact">
      <van-field
        v-model="telPhone"
        type="tel"
        label="手机号"
        maxlength="12"
        label-width="50px"
      />
      <van-field v-model="notes" label="备注" label-width="50px" />
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { showSuccessToast, showFailToast } from "vant";

import { showToast } from "vant";
import { updateImageFile, addMyFeedback } from "../../service/index.js";
let router = useRouter();
// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
let problemType = ["BUG反馈", "功能建议", "内容建议", "设施问题"];
let selectedProblemTypeIndex = ref(0);
let problemDiscription = ref("");
let fileList = ref([]);
let telPhone = ref("");
let notes = ref("");
function problemTypeClick(index) {
  selectedProblemTypeIndex.value = index;
  console.log(selectedProblemTypeIndex);
}
function afterRead(file) {
  // 此时可以自行将文件上传至服务器
  console.log(file);
}
function onOversize(file) {
  showToast("图片大小不能超过 1M");
}
function beforeRead(file) {
  console.log(file.type, file.type != "image/png");

  if (
    file.type == "image/jpg" ||
    file.type == "image/png" ||
    file.type == "image/jpeg"
  ) {
    return true;
  }
  showToast("请上传 jpg/png 格式图片");
  return false;
}

async function submit() {
  if (problemDiscription.value.length < 20) {
    showToast("请至少描述20字以上问题");
    return;
  }

  let image = "";
  if (fileList.value.length == 1) {
    image = fileList.value[0].file;
    await updateImageFile(image, "userfeedback").then((res) => {
      image = res.data;
    });
    // image = "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg";
  }

  await addMyFeedback(
    problemType[selectedProblemTypeIndex.value],
    problemDiscription.value,
    telPhone.value,
    notes.value,
    image
  )
    .then((res) => {
      if (res.data == true) {
        showSuccessToast("提交成功");
      } else {
        showFailToast("提交失败");
      }
      router.back();
    })
    .catch((err) => {
      showFailToast("提交失败");
    });

  
}
</script>

<style scoped>
.feedbackMyView {
  background-color: #ededed;
  min-height: 100vh;
  width: 100vw;
}
.problem {
  font-size: 14px;
  color: red;
  margin-left: 10px;
}
.problemType {
  width: 96vw;
  margin: 0px auto;
  background-color: white;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.problemType > div {
  border: 1px solid #eeeeee;
  height: 6vh;
  line-height: 6vh;
  text-align: center;
  font-size: 14px;
  border-radius: 10px;
  color: #ededed;
}
.problemType .selectedType {
  border: 1px solid red;
  color: black;
}
/* 问题描述 */
.problemDiscription {
  width: 96vw;
  margin: 0px auto;
  border-radius: 15px;
}
/* 预览图片 */
.uploader {
  border-radius: 10px;
  margin-left: 2vw;
}
.contact {
  width: 96vw;
  margin: 0 auto;
}
.submit {
  /* position: fixed;
  bottom: 10px;
  left: 7vw; */
  margin: 0 auto;
  width: 86vw;
  margin-top: 30px;
  height: 50px;
  background-color: #16baaa;
  border-radius: 16px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: black;
}
</style>