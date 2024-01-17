<template>
  <div class="scanner">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="扫描二维码2jsQR"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="image">
      <van-image v-if="imageUrl" :src="imageUrl" fit="contain" class="img" />
      <input
        @change="handleFileChange"
        class="file"
        type="file"
        capture="environment"
        accept="image/*"
      />

      <div class="lable">点击拍摄签到</div>
    </div>
    <div>识别： {{ code }}</div>
    <div>fiwel{{ files }}</div>
  </div>
</template>
<script setup>
// import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";
// import { recognizeQRCode, recognizeQRCode2 } from "../../util/scnner.js";
// import { showSuccessToast, showFailToast } from "vant";
// import { showLoadingToast, closeToast } from "vant"; 
// let router = useRouter();
// let imageUrl = ref();
// let code = ref({
//   codeId: "school",
//   userId: 0,
//   a: {
//     sss: 1,
//   },
//   roomId: 0,
// });
// let files = ref({});
// // 点击拍照事件
// function handleFileChange(event) {
//   console.log("0000000");
//   const file = event.target.files[0];
//   console.log(file.type);
//   files.value = file.type;
//   imageUrl.value = URL.createObjectURL(file);
//   // recognizeQRCode2(file)
//   recognizeQRCode(file)
//     .then((data) => {
//       console.log(data);
//       if (data.codeId !== "school") {
//         imageUrl.value = "";
//         showFailToast("识别信息错误，请重试！");
//         return;
//       }
//       code.value = data;
//       signIn();
//     })
//     .catch((error) => {
//       imageUrl.value = "";
//       showFailToast(error.message);
//     });
// }

// // 签到
// function signIn(data) {
//   showLoadingToast({
//     message: "签到中...",
//     forbidClick: true,
//   });

//   // 发送网络请求
//   setTimeout(() => {
//     showSuccessToast("签到成功");
//     closeToast();

//     // setTimeout(() => {
//     //   onClickLeft();
//     // }, 1000);
//   }, 2000);
// }
// // 返回上一个页面事件
// function onClickLeft() {
//   router.back();
// }
</script>

<style scoped>
.image {
  width: 80vw;
  height: 80vw;
  margin: 20vh auto;
  background-color: #f6f6f6;
  position: relative;
  text-align: center;
  background-image: url("../../assets/paizhao.png"); /* 设置背景图片的URL */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-size: 150px 150px; /* 宽度和高度 */
  background-position: center; /* 水平居中 */
}
.image .lable {
  position: absolute;
  cursor: pointer;
  width: 200px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 15vw;
  color: #c2c2c2;
  font-size: 14px;
}
.img {
  width: 80vw;
  height: 80vw;
}
.file {
  position: absolute;
  font-size: 80px;
  padding: 0;
  bottom: 20vw;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 0;
}
</style>