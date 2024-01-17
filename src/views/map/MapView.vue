<template>
  <div class="map">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="校园地图"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="inner-chunk">
      <div class="map-info" ref="chartDom"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
const chartDom = ref(); // dom
/**获取地图信息 */
// let getMap = async () => {
//     var map = new BMap.Map(chartDom.value)
//     var point = new BMap.Point(116.404, 39.915)
//     map.centerAndZoom(point, 15)
//     map.enableScrollWheelZoom(true)
// }

// let getMap = async () => {
//   var map = new BMap.Map(chartDom.value);
//   // 获取当前位置坐标
//    navigator.geolocation.getCurrentPosition(
//     (position) => {
//       var { latitude, longitude } = position.coords;
//       console.log("latitude, longitude",latitude, longitude);
//       var point = new BMap.Point(104.57037 , 31.55460 );
//       map.centerAndZoom(point, 500); // 放大到适当级别
//       map.enableScrollWheelZoom(true);
//     },
//     (error) => {
//       console.log("无法获取当前位置:", error);
//       var defaultPoint = new BMap.Point(104.57037 , 31.55460 ); // 默认位置坐标
//       map.centerAndZoom(defaultPoint, 1000);
//       map.enableScrollWheelZoom(true);
//     }
//   );

// };

// onMounted(()=>{
//     getMap();
// })
</script>

<style scoped>
.map-info {
  width: 300px; /* 自定义大小 */
  height: 500px; /* 自定义大小 */
}
</style>