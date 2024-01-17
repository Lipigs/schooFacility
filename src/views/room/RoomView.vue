<template>
  <div class="room">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="房间列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-list
      class="list"
      v-model:loading="loadingRoom"
      :finished="finishedRoom"
      finished-text="没有更多了"
      @load="onLoadRoom"
      offset="0"
    >
      <div
        class="rounded-container"
        v-for="(item, index) in roomListData"
        :key="index"
        :style="{ 'background-image': 'url(' + item.roomImage + ')' }"
      >
        <div class="roomName">{{ item.roomName }}</div>
        <div class="roomCapacity">
          总容量：
          {{ item.roomCapacity }} 位/台
        </div>
        <div class="look" @click="lookRoomDetail(item.roomId)">立即查看</div>
      </div>
    </van-list>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { getRoomsByFacilityAndBuilding } from "../../service/index.js";
let router = useRouter();
let facilityId = router.currentRoute.value.query.facilityId;
let buildingId = router.currentRoute.value.query.buildingId;
console.log(facilityId, buildingId);
// 点击返回
function onClickLeft(e) {
  console.log(e);
  router.back();
}

let loadingRoom = ref(false);
let finishedRoom = ref(false);
let roomListData = reactive([]);
// 例表加载数据
function onLoadRoom() {
  getRoomsByFacilityAndBuilding(facilityId, buildingId).then((res) => {
    loadingRoom.value = false;
    roomListData = res.data
    finishedRoom.value = true;
  });
}
// 点击立即查看
function lookRoomDetail (roomId){
console.log(buildingId);
router.push({
  path: "/school/roomDetail",
    query: {
      roomId,
    }, 
})
}
</script>



<style scoped>
.room {
  width: 100%;
  height: 100vh;
  
}

.rounded-container {
  position: relative;
  border-radius: 20px;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  height: 150px;
  background-size: cover;
  /* line-height: 250rpx; */
  /* display: flex;
	justify-content: space-evenly;
	align-items: center; */
}

.rounded-container::after {
  content: "";
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.rounded-container .look {
  width: 100%;
  height: 20%;
  background-color: #f3f3f3;
  opacity: 0.5;
  position: absolute;
  cursor: pointer;
  bottom: 0px;
  text-align: center;
  line-height: 50rpx;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.roomName{
  position: absolute;
  top: 20%;
  left: 3%;
  font-size: 18px;
  color: black;
  font-weight: 700;
}
.roomCapacity{
  position: absolute;
  top: 40%;
  left: 3%;
  font-size: 14px;

}
</style>