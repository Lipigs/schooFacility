<template>
    <div v-for="item in List" :key="item" class="row">
      <div class="card_top">
        <div>预约编号:{{ item.reservationId }}</div>
        <div style="fontSize: 12px">{{ item.status }}</div>
      </div>
      <div class="card_center">
        <van-row class="row" align="center">
          <van-col span="8" class="c">设施地点名称</van-col>
          <van-col span="15" offset="1">{{ item.roomName }}</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="8" class="c">申请时间</van-col>
          <van-col span="15" offset="1">{{convertDateFormat(item.applicationTime)}}</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="8" class="c">预约日期</van-col>
          <van-col span="15" offset="1">{{ item.reservationDate }}</van-col>
        </van-row>
        <van-row class="row" align="center">
          <van-col span="8" class="c">预约时段</van-col>
          <van-col span="8" offset="1">{{ item.startTime }}-{{ item.endTime }}</van-col>
          <van-col
            span="4"
            offset="2"
            @click="clickRecordDatail(item.reservationId)"
          >
            <div style="fontSize: 12px; color: red">
              查看详情<van-icon name="arrow" />
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { convertDateFormat } from "../.././../util/date.js";
import {
  getReservationRoomName
} from "@/service";
let router = useRouter();
let props = defineProps({
  List: []
});
console.log(props.List)



function clickRecordDatail(reservationId) {
  router.push({
    path: "/school/record/recordDetail",
    query: {
      reservationId,
    },
  });
}
</script>

<style scoped>
.record {
  background-color: #f6f6f6;
}
.card_top {
  display: flex;
  padding: 2px 10px;
  justify-content: space-between;
}
.row {
  height: 100%;
  width: 98%;
  border-radius: 4px;
  margin: 0px auto;
  margin-top: 10px;
  background-color: white;
}
.card_center {
  padding: 2px 15px;
  padding-right: 5px;
}
.card_center .row {
  margin: 15px 0px;
}
.card_center .c {
  font-size: 16px;
  /* font-weight: 600; */
  color: black;
}

.card_top {
  display: flex;
  padding: 2px 10px;
}
</style>