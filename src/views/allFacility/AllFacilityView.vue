<template>
  <div class="allFacility">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="设有设施/教室"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div>
      <div class="facility">
        <div v-for="(item, index) in facilityList" key="index" class="box">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAllFacility,
  getBuildingsByFacilityIdAndPage,
  getBuildingTotalByFacilityId,
} from "../../service/index.js";
let router = useRouter();

let facilityList = ref([]);
getAllFacility().then((res) => {
  facilityList.value = res.data;
  console.log(res.data);
});

// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
</script>

<style scoped>
.facility{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.box {
  margin-top: 20px;
  width: 160px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 20px;
  background-color: orange;
}
</style>