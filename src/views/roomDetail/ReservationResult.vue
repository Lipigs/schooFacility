<template>
  <div class="reservationResult">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="预约结果"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="top"></div>
    <div class="image">
      <img src="../../assets/dui6.png" alt="" class="img" />
    </div>
    <div>
      <h1 style="color: #4590e8; text-align: center; padding: 0px; margin: 0px">
        预约信息提交成功
      </h1>
      <div style="color: #4590e8; text-align: center; margin-top: 20px">
        你的预约申请已经提交，请关注预约状态
      </div>
    </div>
    <div>
      <div class="card_center" v-if="UserReservation != null">
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约编号</van-col>
          <van-col span="13" offset="1">{{
            UserReservation.reservationId
          }}</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">设施地点名称</van-col>
          <van-col span="13" offset="1">博瑞A楼-402-自习室</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">申请时间</van-col>
          <van-col span="13" offset="1">
            {{ convertDateFormat(UserReservation.applicationTime) }}
          </van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约日期</van-col>
          <van-col span="13" offset="1"
            >{{ UserReservation.reservationDate }}
          </van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约时段</van-col>
          <van-col span="13" offset="1"
            >{{ UserReservation.startTime }} -{{
              UserReservation.endTime
            }}</van-col
          >
        </van-row>
        <van-row class="row" align="center">
          <van-col span="10" class="c">预约方式</van-col>
          <van-col
            span="13"
            offset="1"
            v-if="UserReservation.reservationType == 'room'"
            >整体</van-col
          >
          <van-col span="13" offset="1" v-else>编号</van-col>
        </van-row>
        <van-row
          class="row"
          align="center"
          v-if="UserReservation.reservationType == 'room_facility_code'"
        >
          <van-col span="10" class="c">设施编号</van-col>
          <van-col span="13" offset="1">{{ seatNumber }}</van-col>
        </van-row>
      </div>
    </div>
    <div class="bottom">
      <div @click="onClick(1)">历史预约</div>
      <div @click="onClick(2)">首页预约</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getUserReservationById,
  getSeatNumberBySeatId,
} from "../../service/index.js";
import { convertDateFormat } from "../../util/date.js";
let router = useRouter();
let reservationId = router.currentRoute.value.query.reservationId;
let UserReservation = ref();
let seatNumber = ref(null);
// 网络请求预约详情
getUserReservationById(reservationId)
  .then((res) => {
    console.log(res.data);
    if (res.data == null) {
      return;
    }
    UserReservation.value = res.data;
    if (res.data.reservationType == "room_facility_code") {
  
      getSeatNumber(res.data.roomIdSeatId);
    }
  })
  .catch(() => {});

// 得到座位号
function getSeatNumber(roomIdSeatId) {
  getSeatNumberBySeatId(roomIdSeatId).then((res) => {
    console.log(res.data);
    seatNumber.value = res.data.seatNumber;
  });
}
function onClick(type) {
  if (type == 1) {
    router.replace("/school/home/record");
    return;
  }
  router.replace("/school/home/reservation");
}
// 返回上一个页面事件
function onClickLeft() {
  router.go(-2);
}
</script>

<style scoped>
.bottom {
  width: 98vw;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.bottom div {
  height: 20px;
  margin: 0px 20px;
  border: 1px solid #4590e8;
  border-radius: 20px;
  background-color: #4590e8;
  line-height: 20px;
  padding: 5px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.reservationResult {
  width: 100vw;
  height: 100vh;
}
.top {
  width: 98vw;
  height: 15vh;
  background-color: #4590e8;
  margin: 0 auto;
}
.image {
  width: 100vw;
  height: 100px;
  background-color: white;
  text-align: center;
}
.img {
  width: 120px;
  margin-top: -47px;
}
.card_center {
  width: 86vw;
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