<template>
  <div class="recordDetail">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="预约历史详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 步骤条 -->
    <div class="top_status" v-if="recordDetail != null">
      <div>预约最终状态</div>

      <div style="color: red">{{ recordDetail.status }}</div>
    </div>
    <div>
      <div class="card_center" v-if="recordDetail != null">
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约编号</van-col>
          <van-col span="13" offset="1">{{
            recordDetail.reservationId
          }}</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">设施地点名称</van-col>
          <van-col span="13" offset="1">博瑞A楼-402-自习室</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">申请时间</van-col>
          <van-col span="13" offset="1">
            {{ convertDateFormat(recordDetail.applicationTime) }}
          </van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约日期</van-col>
          <van-col span="13" offset="1"
            >{{ recordDetail.reservationDate }}
          </van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约时段</van-col>
          <van-col span="13" offset="1"
            >{{ recordDetail.startTime }} -{{ recordDetail.endTime }}</van-col
          >
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约方式</van-col>
          <van-col
            span="13"
            offset="1"
            v-if="recordDetail.reservationType == 'room'"
            >整体</van-col
          >
          <van-col span="13" offset="1" v-else>编号</van-col>
        </van-row>
        <van-row
          class="row"
          align="center"
          v-if="recordDetail.reservationType == 'room_facility_code'"
        >
          <van-col span="10" class="c">预约编号</van-col>
          <van-col span="13" offset="1">{{ seatNumber }}</van-col>
        </van-row>
      </div>
    </div>
    <!-- 步骤条 -->
    <div class="steps">
      <van-steps
        direction="vertical"
        :active="
          reservationSchedule.length - 1 >= 0
            ? reservationSchedule.length - 1
            : 0
        "
      >
        <van-step v-for="item in reservationSchedule" :key="index">
          <div v-if="item.handlerCode == 101">
            <h3>提交预约设施申请</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 102">
            <h3>用户取消预约设施</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 103">
            <h3>管理员同意预约请求</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 104">
            <h3>管理员不同意预约请求</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 105">
            <h3>用户取消预约设施</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 106">
            <h3>签到使用</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
          <div v-if="item.handlerCode == 107">
            <h3>未签到</h3>
            <p>{{ convertDateFormat(item.processingTime) }}</p>
          </div>
        </van-step>
      </van-steps>
    </div>
    <!-- 底部 -->
    <div
      style="
        width: 96vw;
        margin: 20px auto;
        right: 0;
        left: 0;
      "
    >
      <van-button
        round
        type="success"
        color="#fedd02"
        block
        v-if="buttonText.number == 2"
        @click="onClickLeft()"
        >返回</van-button
      >
      <van-button
        round
        type="success"
        color="red"
        block
        v-if="buttonText.number == 1"
        @click="cancelReservation()"
        >取消预约</van-button
      >
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import {
  queryReservationScheduleByReservationId,
  getUserReservationById,
  getSeatNumberBySeatId,
  canceledReservationById,
} from "../../../service/index.js";
import { showConfirmDialog } from "vant";
import { showSuccessToast, showFailToast,showDialog } from "vant"
import { convertDateFormat } from "../.././../util/date.js";
let router = useRouter();
let reservationId = router.currentRoute.value.query.reservationId;
// 预约详情
let recordDetail = ref();
let seatNumber = ref();
let buttonText = ref({
  number: 0,
  text: "",
});
// 网络请求预约详情数据===============================
getUserReservationById(reservationId).then((res) => {
  console.log("recordDetail", res.data);
  recordDetail.value = res.data;
  if (recordDetail.value.reservationType == "room_facility_code") {
    getSeatNumber();
  }
});
// 得到座位号
function getSeatNumber() {
  getSeatNumberBySeatId(recordDetail.value.roomIdSeatId).then((res) => {
    seatNumber.value = res.data.seatNumber;
  });
}

let reservationSchedule = ref([]);
// 网络请求步骤条数据===============================
queryReservationScheduleByReservationId(reservationId)
  .then((res) => {
    console.log(res.data);
    reservationSchedule.value = res.data;
    if (res.data.length > 0) {
      res.data.forEach((item, index) => {
        switch (item.handlerCode) {
          case 101:
            buttonText.value.number = 1;
            break;
          case 102:
            buttonText.value.number = 2;
            break;
          case 103:
            buttonText.value.number = 1;
            break;
          case 104:
            buttonText.value.number = 2;
            break;
          case 105:
            buttonText.value.number = 2;
            break;
          case 106:
            buttonText.value.number = 2;
            break;
          case 107:
            buttonText.value.number = 2;
            break;
        }
      });
    }
    console.log(buttonText.value);
  })
  .catch((error) => {
    reservationSchedule.value = [];
  });

// 取消预约
function cancelReservation() {
  showConfirmDialog({
    title: "提示",
    message: "确定取消该条预约申请吗？",
    theme: "round-button",
  })
    .then(() => {
      console.log(
        "取消预约id",
        reservationId,
        recordDetail.value.reservationDetailId,
        reservationSchedule.value.length
      );
      canceledReservationById(reservationId,  recordDetail.value.reservationDetailId,reservationSchedule.value.length)
        .then((res) => {
          console.log(res.data == true,res.data);
          if (res.data === true) {
            showDialog({
              message: "取消预约申请成功！",
              theme: "round-button",
            }).then(() => {
              onClickLeft();
            });
          } else {
            showFailToast("请重试！")
          }
        })
        .catch((err) => {
          showFailToast("请稍后重试！")
        });
    })
    .catch(() => {});
}
// 点击返回
function onClickLeft(e) {
  router.back();
}
</script>

<style scoped>
.recordDetail {
  cursor: pointer;
  background-color: #f5f5f5; /* 使用较浅的灰色作为背景色 */
  height: 100vh;
  position: relative;
}
.top_status {
  width: 98vw;
  margin: 10px auto;
  display: flex;
}
.top_status div {
  margin-left: 30px;
}
.steps {
  width: 96vw;
  margin: 10px auto;
  border-radius: 5px;
}
.card_center {
  width: 96vw;
  height: 100%;
  padding: 20px 0px;
  margin: 0px auto;
  margin-top: 20px;
  background-color: white;

  border-radius: 5px;
}
.card_center .row {
  margin: 25px 0px;
  font-size: 18px;
}
.card_center .c {
  font-size: 16px;
  color: black;
  padding-left: 20px;
}
</style>