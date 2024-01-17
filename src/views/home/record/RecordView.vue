<template>
  <div class="record">
    <van-tabs v-model:active="active" @click-tab="onClickTab" class="tabs">
      <van-tab title="全部预约">
        <!-- <div v-for="item in allList" :key="item" class="row">
          <div class="card_top">
            <div>预约编号:{{ item.reservationId }}</div>
            <div style="fontSize:12px;">{{ item.status }}</div>
          </div>
          <div class="card_center">
            <van-row class="row" align="center">
              <van-col span="8" class="c">设施地点名称</van-col>
              <van-col span="15"  offset="1">博瑞A楼-402-自习室</van-col>
            </van-row>
            <van-row class="row" align="center"> 
              <van-col span="8" class="c">申请时间</van-col>
              <van-col span="15"  offset="1">2023-12-12 10:10:12</van-col>
            </van-row>
            <van-row class="row" align="center">
              <van-col span="8" class="c">预约日期</van-col>
              <van-col span="15"  offset="1">2023-12-13</van-col>
            </van-row>
            <van-row class="row" align="center">
              <van-col span="8" class="c">预约时段</van-col>
              <van-col span="8"  offset="1">20：30 -23：20</van-col>
              <van-col span="4" offset="2" @click="clickRecordDatail(item.reservationId)">
                <p style="fontSize:12px;color:red">查看详情<van-icon name="arrow" /> </p>
              </van-col  >
            </van-row>

          </div>
        </div> -->

        <div v-if="allList != null">
          <List :List="allList"></List>
        </div>
        <div v-else class="noData">无数据,请前往预约</div>
      </van-tab>

      <van-tab title="已结束">
        <div v-if="List1 != null">
          <List :List="List1"></List>
        </div>
        <div v-else class="noData">无数据</div>
      </van-tab>
      <van-tab title="待使用">
        <div v-if="List2 != null">
          <List :List="List2"></List>
        </div>
        <div v-else class="noData">无数据</div>
      </van-tab>
      <van-tab title="已取消">
        <div v-if="canneledList != null">
          <List :List="canneledList"></List>
        </div>
        <div v-else class="noData">无数据</div>
      </van-tab>
    </van-tabs>
    <!--  回到顶部 -->
    <van-back-top bottom="10vh" right="5vw" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getUserAllReservationById, getReservationRoomName } from "@/service";
import List from "./List.vue";
let router = useRouter();
let active = ref(0);
let allList = ref();
let List1 = ref();
let List2 = ref();
let canneledList = ref();

// 所有预约记录
function getAllReservationById() {
  getUserAllReservationById().then((res) => {
    console.log(res.data);
    allList.value = res.data;
    res.data.forEach((item, index) => {
      console.log(item, index);
      getReservationRoomName(item.roomId)
        .then((res) => {
          allList.value[index].roomName = res.data;
        })
        .catch((err) => {
          allList.value[index].roomName = "未知";
        });
    });
  });
}
getAllReservationById();

function onClickTab() {
  console.log(active.value);
  if (active.value == 1) {
  }
  if (active.value == 2) {
  }
  if (active.value == 3) {
    getCanneledList();
  }
}
// 对allList.value数组进行筛选，其下的status=”"Pending"“加入到canneledList数组中
function getCanneledList() {
  canneledList.value = [];
  canneledList.value = allList.value.filter((item) => {
    return item.status == "Canceled";
  });
}

//
</script>

<style scoped>
.tabs {
  width: 100vw;
  margin-bottom: 50px;
  padding-bottom: 50px;
}
.noData {
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 20vh;
}
.record {
  background-color: #f6f6f6;
  margin-bottom: 50px;
  min-height: 100%;
}
.row {
  height: 100%;
  width: 98%;
  border-radius: 4px;
  margin: 0px auto;
  margin-top: 10px;
  background-color: white;
}
.card_top {
  display: flex;
  padding: 2px 10px;
  justify-content: space-between;
}
.card_center {
  padding: 2px 15px;
  padding-right: 5px;
}
.card_center .row {
  margin: 5px 0px;
}
.card_center .c {
  font-size: 16px;
  /* font-weight: 600; */
  color: black;
}

.row {
  height: 100%;
  width: 98%;
  border-radius: 4px;
  margin: 0px auto;
  margin-top: 10px;
  background-color: white;
}
.card_top {
  display: flex;
  padding: 2px 10px;
}
</style>