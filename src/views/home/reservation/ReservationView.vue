<template>
  <div class="reservation">
    <!-- 下拉菜单 -->
    <van-sticky>
      <div style="height: 49px; overflow: hidden">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="dropdownValue"
            :options="dropdownList"
            @change="handleDropdownChange"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>

    <!-- buildingList -->
    <van-list
    v-if="dropdownList.length > 0"
      class="list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
    >
      <!-- :style="{
          backgroundColor:
            index < 5 ? colorList[index] : colorList[(index - 5) % 5],
        }" -->
      <div
        class="rounded-container"
        v-for="(item, index) in cardList"
        :key="index"
      >
        <div class="view-left">
          <van-image
            class="image"
            width="150"
            height="110"
            fit="cover"
            :src="item.image"
          >
            <template v-slot:error>图片加载失败</template>
          </van-image>
        </div>
        <div class="view-right" @click="clickBuilding(item.id)">
          <div class="description">
            <div class="title">{{ item.name }}</div>
            <div class="campus">{{ item.campus }}</div>
          </div>

          <div class="text">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </van-list>
    <!--  回到顶部 -->
    <van-back-top bottom="10vh" right="5vw" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  getAllFacility,
  getBuildingsByFacilityIdAndPage,
  getBuildingTotalByFacilityId,
} from "../../../service/index.js";
import {
  showLoadingToast,
  closeToast,
  showSuccessToast,
  showFailToast,
} from "vant";
let router = useRouter();
let dropdownValue = ref(1);
let dropdownList = ref([]); //{ text: "请选择", value: 1 }

let cardList = ref([]);
let page = reactive(1);
// 获取building数据
// function getCardList(facilityId, page) {
//   getBuildingsByFacilityIdAndPage(facilityId, page).then((res) => {
//     cardList.value = cardList.value.concat(res.data);
//     console.log(cardList.value);
//   });
// }
// 获取下拉菜单数据
getAllFacility().then((res) => {
  dropdownList.value = res.data;
  dropdownValue.value = res.data[0].value;
});
// 监听下拉菜单
function handleDropdownChange(value) {
  page = 1;
  dropdownValue.value = value;
  cardList.value = [];
  console.log("下拉菜单选择", value);

  loading.value = true;
  finished.value = false;
  onLoad();
}

let colorList = ["#FFCC80", "#FFB74D", "#FFA726", "#FF9800", "#FB8C00"];
let loading = ref(false);
let finished = ref(false);
// 获取内容数据
let onLoad = () => {
  console.log("page", page, loading.value, dropdownValue.value);
  Promise.all([
    getBuildingTotalByFacilityId(dropdownValue.value),
    getBuildingsByFacilityIdAndPage(dropdownValue.value, page),
  ])
    .then(([totalRes, buildingsRes]) => {
      loading.value = false;
      cardList.value = cardList.value.concat(buildingsRes.data);
      if (cardList.value.length >= totalRes.data) {
        finished.value = true;
      } else {
        page++;
      }
    })
    .catch((error) => {
      showFailToast("错误");
    });
  // 加载状态结束
};
function clickBuilding(id) {
  router.push({
    path: "/school/room",
    query: {
      facilityId: dropdownValue.value,
      buildingId: id,
    },
  });
}
</script>

<style >
.list {
  background-color: #f6f6f6;
}
.reservation {
  height: 100vh;
  background-color: #f6f6f6;
  /* overflow: hidden; */
}

.rounded-container {
  border-radius: 20px;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  height: 130px;
  /* line-height: 250px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  /* background-color: rgba(255, 255, 255, 0.5);
  */
  /* background: linear-gradient(to bottom, #6dd5fa, #2980b9); */
}
.view-left {
  width: 30%;
}
.image img {
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.view-right {
  position: relative;
  width: 50%;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.title {
  font-size: 17px;
}
.campus {
  font-size: 14px;
}
.text {
  display: flex;
  height: 100%;
  position: absolute;
  align-items: center;
  right: 0;
  width: 30px;
  /* background-color: pink; */
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-left: 50%;
}
</style>