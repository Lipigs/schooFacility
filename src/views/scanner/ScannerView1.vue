<template>
  <div class="scannerVant">
    <!-- 导航栏 -->
    
    <van-sticky>
      <van-nav-bar
        title="扫描二维码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="image">
      <van-uploader
        class="img"
        v-model="fileList"
        :max-count="1"
        upload-text="点击拍照签到"
        :after-read="afterRead"
        capture="camera"
        accept="image/*"
      
      />
    </div>
    <div>识别： {{ code.userId }}-- {{ code.roomId }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showSuccessToast, showFailToast } from "vant";
import { showLoadingToast, closeToast } from "vant";
import { recognizeQRCode } from "../../util/scnner.js";
let router = useRouter();
const fileList = ref([]);
let code = ref({
  userId: 0,
  roomId: 0,
});
// 点击拍照
let afterRead = (file) => {
  recognizeQRCode(file.file)
    .then((data) => {
      showFailToast(data);
      if (data == "") {
        fileList.value = [];
        showFailToast(error.message);
        return;
      }
      code.value = data;
      signIn()
    })
    .catch((error) => {
      fileList.value = [];
      showFailToast(error.message);
    });
};
// 签到
function signIn(data) {
  showLoadingToast({
    message: "签到中...",
    forbidClick: true,
  });

  setTimeout(()=>{
    showSuccessToast("签到成功")
    closeToast()

    setTimeout(()=>{
      onClickLeft()
    },1000)


  },2000)

}
// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
</script>

<style scoped>
.image {
  width: 80vw;
  height: 80vw;
  margin: 20vh auto;
  background-color: red;
}
.img {
  --van-uploader-size: 80vw !important;
}
</style>