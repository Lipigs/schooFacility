<template>
  <div class="scan-page">
    <!-- 返回导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="扫描二维码"
        left-text="返回"
        left-arrow
        @click-left="clickIndexLeft()"
      />
    </van-sticky>
    <!-- 扫码区域 -->
    <!-- <div class="scan-video" v-if="videoDisplay"></div> -->
    <video
      ref="video"
      id="video"
      class="scan-video"
      autoplay
      :style="{ opacity: videoOpacity }"
    ></video>

    <div class="scan-line" v-if="videoOpacity2 == 1"></div>
    <!-- 提示语 -->
    <div class="scan-tip">{{ tipMsg }}</div>
    <p class="p_tip">扫描次数失败5次、请退出重扫！</p>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import { showLoadingToast, closeToast } from "vant";
import { showDialog } from "vant";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useRouter } from "vue-router";
let router = useRouter();
let videoOpacity = ref(0);
let videoOpacity2 = ref(0);
// 初始化响应式数据

const codeReader = ref(null);
const tipMsg = ref("相机调用中...");
const scannerRes = ref("");
let OK_Scanner = 0; //是否多次获取扫描到的数据，节流
let Number_Sanner_Fail = 0; //扫描失败次数
let time = null;
// 在组件创建时调用openScan函数
let ok = 0;
async function SXT_OK() {
  console.log("SXT_OK执行中");
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // getUserMedia方法不存在，执行相关操作
    showDialog({
      message: "检无相机权限或网络错误",
      theme: "round-button",
    }).then(() => {
      clickIndexLeft();
    });
    return;
  }
  await navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(() => {
      ok = 1;
      openScan();
    })
    .catch(() => {
      tipMsg.value = "未获取到相机权限，请开启";
      showDialog({
        message: "检查出无相机权限",
        theme: "round-button",
      }).then(() => {
        clickIndexLeft();
      });
    });
}
SXT_OK();

// async function test() {
//   navigator.getUserMedia =
//     navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia;
//   if (navigator.getUserMedia) {
//     await navigator.getUserMedia(
//       { video: true },
//       function (stream) {
//         console.log("获取摄像头数据成功");
//         ok = 1;
//         openScan();
//       },
//       function (err) {
//         console.log("获取摄像头数据失败：", err);
//       }
//     );
//   } else {
//     console.log("获取摄像头数据失败");
//   }
// }
// test();
// 初始化摄像头
async function openScan() {
  codeReader.value = await new BrowserMultiFormatReader();
  codeReader.value
    .getVideoInputDevices()
    .then((videoDevices) => {
      tipMsg.value = "正在调用摄像头...";
      let firstDeviceId = videoDevices[videoDevices.length - 1].deviceId;
      if (videoDevices.length > 1) {
        firstDeviceId = videoDevices.find((el) => {
          return el.label.indexOf("back") > -1 && el.label.indexOf("0") > -1;
        })
          ? videoDevices.find((el) => {
              return (
                el.label.indexOf("back") > -1 && el.label.indexOf("0") > -1
              );
            }).deviceId
          : videoDevices[videoDevices.length - 1].deviceId;
      }
      decodeFromInputVideoFunc(firstDeviceId);
    })
    .catch((err) => {
      showDialog({
        message: "调用摄像头失败，请退出重试！",
      }).then(() => {
        clickIndexLeft();
      });
    });
}

// 摄像头扫描
function decodeFromInputVideoFunc(firstDeviceId) {
  codeReader.value.reset();
  // 显示画面
  setTimeout(() => {
    videoOpacity.value = 1;
    videoOpacity2.value = 1;
  }, 1000);
  codeReader.value.decodeFromInputVideoDeviceContinuously(
    firstDeviceId,
    "video",
    (result, err) => {
      if (OK_Scanner == 1) {
        return;
      }
      if (result) {
        tipMsg.value = "扫描中";
        console.log("扫码结果", result);
        scannerRes.value = result.text;

        if (scannerRes.value) {
          OK_Scanner = 1;
          tipMsg.value = "识别信息中";
          setTimeout(() => {
            videoOpacity2.value = 0;
          }, 300);

          try {
            scannerRes.value = JSON.parse(scannerRes.value);
          } catch (error) {
            scannerRes.value = {}; // 出错时赋予一个默认值
          }

          if (scannerRes.value.codeId !== "school") {
            tipMsg.value = "二维码无效";
            showDialog({
              message: "该二维码并非签到码，请稍后重试！",
              theme: "round-button",
            }).then(() => {
              OK_Scanner = 0;
              Number_Sanner_Fail = Number_Sanner_Fail + 1;
              console.log(Number_Sanner_Fail);
              if (Number_Sanner_Fail >= 5) {
                tipMsg.value = "扫描未识别次数过多";
                OK_Scanner = 1;
                videoOpacity2.value = 0;
                showDialog({
                  title: "建议",
                  message: "扫描未识别次数过多，请退出重试！",
                  theme: "round-button",
                }).then(() => {
                  clickIndexLeft();
                });
              }
              videoOpacity2.value = 1;
            });
            return;
          }
          // 二维码信息正确，进行签到，成功失败都退出
          signIn();
        }
      } else {
        tipMsg.value = "请将二维码放入扫描框中";
      }
    }
  );
}

function signIn(data) {
  tipMsg.value = "正在签到中...";
  if (time) {
    clearTimeout(time);
  }
  // 签到中防止在扫描赋值。在出现扫描线
  OK_Scanner = 1;
  videoOpacity2.value = 0;
  showLoadingToast({
    message: "签到中...",
    duration: 5000,
    forbidClick: true,
  });
  console.log("签到中...");
  // 发送网络请求
  setTimeout(() => {
    tipMsg.value = "签到成功";
    showDialog({
      message: "签到成功",
    }).then(() => {
      clickIndexLeft();
    });
  }, 3000);
}

// 关闭摄像头
function closeSxt() {
  if (codeReader.value != null) {
    codeReader.value.reset();
  }
  codeReader.value = null;
}
// 返回上一页
function clickIndexLeft() {
  closeSxt();
  router.back();
}
</script>

 
<style lang="scss">
.scan-line {
  position: absolute;
  top: 25vh;
  left: 10vw;
  right: 0;
  height: 3px;
  width: 75vw;

  background: linear-gradient(
    to right,
    transparent,
    #10b560,
    transparent
  ); /* 使用线性渐变 */

  animation: scanAnimation 2s linear infinite;
}

@keyframes scanAnimation {
  0% {
    transform: translateY(-100%);
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  89% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(40vh); /* 将扫描线移动到屏幕高度的一半 */
    opacity: 0;
  }
}

.scan-page {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  background-color: #363630;
  .scan-video {
    display: block;
    padding: 0px;
    height: 80vh;
    width: 100vw;
    object-fit: fill;
    overflow: hidden;
    overflow-y: hidden;
  }
  .scan-tip {
    width: 100vw;
    text-align: center;
    color: white;
    font-size: 15px;
    margin-top: 5vh; /* 调整与视频之间的间距 */
  }
}
.p_tip {
  bottom: 0px;
  width: 100vw;
  text-align: center;

  margin: 3vh auto;
  font-size: 12px;
  display: block;
  color: red;
}
</style>