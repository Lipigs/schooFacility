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
    <video ref="video" id="video" class="scan-video" autoplay></video>
    <!-- 提示语 -->
    <div v-show="tipShow" class="scan-tip">{{ tipMsg }}</div>
  </div>
</template>
 
<script>
import { BrowserMultiFormatReader } from "@zxing/library";
import { Toast, Dialog, Notify } from "vant";

export default {
  data() {
    return {
      codeReader: null,
      tipShow: false, // 是否展示提示
      tipMsg: "", // 提示文本内容
      scanText: "", // 扫码结果文本内容
    };
  },
  created() {
    this.openScan();
  },
  methods: {
    // 初始化摄像头
    async openScan() {
      this.codeReader = await new BrowserMultiFormatReader();
      this.codeReader
        .getVideoInputDevices()
        .then((videoDevices) => {
          this.tipMsg = "正在调用摄像头...";
          this.tipShow = true;
          console.log("get-videoDevices", videoDevices);

          // 默认获取摄像头列表里的最后一个设备id，通过几部测试机发现一般前置摄像头位于列表里的前面几位，所以一般获取最后一个的是后置摄像头
          let firstDeviceId = videoDevices[videoDevices.length - 1].deviceId;
          // 一般获取了手机的摄像头列表里不止一个，有的手机摄像头高级多层，会有变焦摄像头等情况，需要做处理
          if (videoDevices.length > 1) {
            // 一般通过判断摄像头列表项里的 label 字段，'camera2 0, facing back' 字符串含有 'back' 和 '0'，大部分机型是这样，如果有些机型没有，那就还是默认获取最后一个
            firstDeviceId = videoDevices.find((el) => {
              return (
                el.label.indexOf("back") > -1 && el.label.indexOf("0") > -1
              );
            })
              ? videoDevices.find((el) => {
                  return (
                    el.label.indexOf("back") > -1 && el.label.indexOf("0") > -1
                  );
                }).deviceId
              : videoDevices[videoDevices.length - 1].deviceId;
          }
          console.log("get-firstDeviceId", firstDeviceId);
          this.decodeFromInputVideoFunc(firstDeviceId);
        })
        .catch((err) => {
          this.tipShow = false;
          console.error(err);
        });
    },
    decodeFromInputVideoFunc(firstDeviceId) {
      // 使用摄像头扫描
      this.codeReader.reset(); // 重置
      this.codeReader.decodeFromInputVideoDeviceContinuously(
        firstDeviceId,
        "video",
        (result, err) => {
          this.tipMsg = "正在尝试识别...";
          if (result) {
            this.scanText = result.text;
            if (this.scanText) {
              this.tipShow = false;
              Dialog.confirm({
                // 获取到扫码结果进行弹窗提示，这部分接下去的代码根据需要，读者自行编写了
                title: "扫码结果",
                message: this.scanText,
              })
                .then(() => {
                  // 点击确认
                })
                .catch(() => {
                  // 点击取消
                });
            }
          }
        }
      );
    },
    clickIndexLeft() {
      // 返回上一页
      this.codeReader.reset();
      this.codeReader = null;
      this.$router.go(-1);
    },
  },
};
</script>
 
<style lang="scss">
.scan-page {
  min-height: 100vh;
  width: 100vw;
  overflow-y: hidden;

  .scan-video {
    display: block;
    height: 50vh;
    width: 80vw;
    margin: 0 auto; /* 水平居中 */
    border-color: red;
    margin-top: 15vh;
    border: 1px solid red;
  }
  .scan-tip {
    width: 100vw;
    text-align: center;
    color: white;
    font-size: 5vw;
    margin-top: 20px; /* 调整与视频之间的间距 */
  }
}
</style>