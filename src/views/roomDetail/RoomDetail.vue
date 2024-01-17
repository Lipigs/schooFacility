<template>
  <div class="roomDetail">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="预约设施"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="image">
      <van-image
      v-if="roomInfo!=null"
        width="100vw"
        height="25vh"
        fit="cover"
        :src="roomInfo.roomImage"
      />
    </div>
    <div class="reservation" v-if="buildingName!=null &&facilityType !=null ">
      <van-row class="row">
        <van-col
          span="17"
          class="col"
          style="font-size: 16px; font-weight: 700"
          offset="1"
          >{{ buildingName }} {{ facilityType }}
          {{ roomInfo.roomName }}
        </van-col>
      </van-row>
      <!-- 预定日期 -->
      <van-row class="row">
        <van-col span="5" class="col" offset="1">预定日期</van-col>
        <van-col span="6" class="col">
          <div class="input" @click="clickShowCalendar()">{{ selectDate }}</div>
        </van-col>
      </van-row>
      <!-- 预约方式 -->
      <van-row class="row">
        <van-col span="5" class="col" offset="1">预定方式</van-col>
        <van-col span="3" class="col">
          <div
            @click="selectAppointmentMethode('hour')"
            :class="['input', { active: selectHourOrDay === 'hour' }]"
          >
            小时
          </div>
        </van-col>
        <van-col span="3" class="col" offset="1">
          <div
            @click="selectAppointmentMethode('day')"
            :class="['input', { active: selectHourOrDay === 'day' }]"
          >
            天
          </div>
        </van-col>
      </van-row>
      <!-- 时间==================================================================== -->
      <div v-if="selectHourOrDay == 'hour'">
        <van-row class="row">
          <van-col span="5" class="col" offset="1">预定时段</van-col>
          <van-col span="3" class="col">
            <div class="input" @click="appointmentTimeShowFunction">
              {{
                selectStartTime[0] +
                (selectStartTime[0] !== "" ? ":" : "") +
                selectStartTime[1]
              }}
            </div>
          </van-col>
          <van-col span="3" class="col" offset="1"> </van-col>
        </van-row>
        <!-- 预定时长 -->
        <van-row class="row">
          <van-col span="5" class="col col2" offset="1">预定时长</van-col>
          <van-col span="8" class="col2 col">
            <van-dropdown-menu class="dropdown">
              <van-dropdown-item
                v-model="dropdownValue"
                :options="dropdownOption"
                @change="handleChangeDropdown"
              />
            </van-dropdown-menu>
          </van-col>
        </van-row>
        <!-- 选择的时段 -->
        <van-row class="row">
          <van-col span="5" class="col" offset="1" style="font-size: 12px"
            >选择的时段</van-col
          >
          <van-col span="15" class="col" style="font-size: 12px; color: red">
            {{ timeString }}
          </van-col>
        </van-row>
      </div>

      <div v-else>
        <!-- 选择的时段 -->
        <van-row class="row">
          <van-col span="5" class="col" offset="1" style="font-size: 12px"
            >选择的时段</van-col
          >
          <van-col span="15" class="col" style="font-size: 12px; color: red">
            {{ startTime }}:{{ endTime }}
          </van-col>
        </van-row>
      </div>

      <!-- 日历 -->
      <van-calendar
        v-model:show="showCalendar"
        @confirm="dateOnConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="dateFormatter"
      />
      <!-- 预约时段弹出框 -->
      <van-popup
        v-model:show="appointmentTimeShow"
        position="bottom"
        :style="{ height: '50%' }"
        :overlay="true"
        @click-overlay="click_overlay"
      >
        <template v-if="showTimePicker">
          <van-time-picker
            v-model="selectStartTime"
            title="选择时间"
            :filter="timeFilter"
            @cancel="cancelDate"
            @confirm="confirmDate"
          ></van-time-picker>
        </template>
      </van-popup>
    </div>
    <!-- 座位布置 -->
    <div class="seats" v-if="SeatsShow">
      <div
        v-for="(item, index) in seatsDataList"
        :key="index"
        :class="{
          box: true,
          selectSeat: index == selectedSeatIndex ? true : false,
        }"
        @click="selectSeatFunction(index)"
      >
        <div>{{ item.seatNumber }}</div>
        <div style="font-size: 12px">
          <p
            v-if="item.seatNumber == roomInfo.roomName"
            style="font-size: 8px; color: red"
          >
            预约整个房间
          </p>
          <p v-else>设施编号</p>
        </div>
      </div>
    </div>
    <p
      style="text-align: center; font-size: 8px; color: red"
      v-if="seatsDataList.length == 0"
    >
      没有相关数据，请重试或选择其它日期、时段
    </p>
    <!-- 底部立即预约 -->
    <div class="bottom">
      <div class="div1">
        当前已选
        <div></div>
        可选
        <div style="background-color: #eeeeee"></div>
      </div>

      <van-button
        @click="clickSubmit"
        type="primary"
        round
        color="#fedd02"
        block
        style="width: 100%"
        class="div2"
        >预定</van-button
      >
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";
import { showLoadingToast } from "vant";
import { showToast } from "vant";

import {
  getRoomByRoomId,
  getOpeningHoursDateByRoomId,
  getRoomOpenHours,
  getAvailableSeatsAndTimeSlot,
  queryAvailableRoomInTime,
  getFacilityNameByFacilityId,
  getBuildingNameByRoomId,
  addUserReservation,
} from "../../service/index.js";
import { findMissingDates, compareTime } from "../../util/date.js";
let router = useRouter();
let roomId = router.currentRoute.value.query.roomId;
let roomInfo = ref([]);
let facilityType = ref();
let buildingName = ref();
// 得到room信息网络请求
getRoomByRoomId(roomId)
  .then((res) => {
    roomInfo.value = res.data;
    getFacilityNameByFacilityId(res.data.roomFacilityId).then((res) => {
      facilityType.value = res.data;
    });
    getBuildingNameByRoomId(roomId).then((res) => [
      (buildingName.value = res.data),
    ]);
  })
  .catch((err) => {
    console.log(err);
  });

// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
showLoadingToast({
  message: "加载中...",
  forbidClick: true,
  loadingType: "spinner",
  overlay: true,
  duration: 300,
});
// 选择预约表单
let selectDate = ref(new Date().toISOString().slice(0, 10));
// 日历=================================================-=====================
let showCalendar = ref(false);
let minDate = reactive(new Date());
let maxDate = reactive(new Date());
let disabledDays = reactive([]);
let dateNull = false;
// 得到当前房间开放日期
getOpeningHoursDateByRoomId(roomId)
  .then((res) => {
    console.log("getOpeningHoursDateByRoomId", res.data);
    if (res.data.length == 0) {
      disabledDays = ref(new Date().toISOString().slice(0, 10));
      dateNull = true;
      return;
    }
    disabledDays = findMissingDates(
      res.data,
      res.data[0],
      res.data[res.data.length - 1]
    );
    minDate = new Date(res.data[0]);
    selectDate.value = minDate.toISOString().slice(0, 10);
    maxDate = new Date(res.data[res.data.length - 1]);
    // 获取开发时段-----
    getOpingHour(minDate, roomId);
  })
  .catch((err) => {
    throw new Error("login required");
  })
  .catch(function () {});
function clickShowCalendar() {
  if (dateNull == true) {
    showCalendar.value = false;
    showToast("未查询到开放日期");
  } else {
    showCalendar.value = true;
  }
}

// 日历筛选
let dateFormatter = (day) => {
  let year = day.date.getFullYear();
  let month = day.date.getMonth() + 1;
  let date = day.date.getDate();
  let dateString = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`;
  if (disabledDays.includes(dateString)) {
    day.type = "disabled";
  }
  return day;
};
// 日历确定事件-------------------------------------
let dateOnConfirm = (date) => {
  showTimePicker.value = false; //时间选择器消失
  SeatsShow.value = false; //座位消失

  selectDate.value = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  //更新选择时间------------------------------------

  getOpingHour(new Date(selectDate.value), roomId);
  showCalendar.value = false;
};
// 选择预约方式================================================
let selectHourOrDay = ref("hour");
// 选择预定方式+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let selectAppointmentMethode = (type) => {
  if (dateNull == true) {
    showToast("当前日期无相关数据");
    return;
  }
  if (selectStartTime.value[0] == "00" && selectStartTime.value[1] == "00") {
    showToast("当前选择的时段不能预约");
    return;
  }
  selectHourOrDay.value = type;
  if (selectHourOrDay.value == "day") {
    questSeatsData();
  }
  if (selectHourOrDay.value == "hour") {
    if (selectStartTime.value[1] == "选择") {
      seatsDataList = [];
    } else {
      questSeatsData();
    }
  }
};
// 选择预约时段======================================================
let appointmentTimeShow = ref(false);
let showTimePicker = ref(false);
let selectNumber = 0; //点击第几次
let selectStartTime = ref(["", "选择"]);
let selectStartTimeCopy = ref(["", "选择"]);
let indexTime = `${new Date()
  .getHours()
  .toString()
  .padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;

let startTime = reactive("08:00");
let endTime = reactive("20:30");
// 得到开放时间段数据============================================
function getOpingHour(date, roomId) {
  getRoomOpenHours(roomId, date.toISOString().slice(0, 10))
    .then((res) => {
      console.log("开放时间", res.data);
      if (res.data != "") {
        startTime = res.data.startTime.substring(0, 5);
        endTime = res.data.endTime.substring(0, 5);
      }
      // 渲染时间组件

      selectNumber = 0; //点击第几次
      selectStartTime.value[0] = "";
      selectStartTime.value[1] = "选择";
      selectStartTimeCopy.value[0] = "";
      selectStartTimeCopy.value[1] = "选择";
      timeString.value = selectTimeFunction();
      //
      if (selectHourOrDay.value == "day") {
        questSeatsData();
      }
    })
    .catch((err) => {});
}

// 时间选择器过滤器
let timeFilter = (type, options, values) => {
  indexTime = `${new Date().getHours().toString().padStart(2, "0")}:${new Date()
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  let [selectedHour, selectedMinute] = values;
  let [indexHour, indexMinute] = indexTime.split(":");
  let [startHour, startMinute] = startTime.split(":");
  let [endHour, endMinute] = endTime.split(":");
  // console.log(
  //   new Date(new Date().toISOString().slice(0, 10)),
  //   new Date(selectDate.value)
  // );
  if (
    new Date(new Date().toISOString().slice(0, 10)) < new Date(selectDate.value)
  ) {
    if (type === "hour") {
      if (endMinute == "00") {
        return options.filter(
          (option) =>
            Number(option.value) >= startHour && Number(option.value) < endHour
        );
      }
      return options.filter(
        (option) =>
          Number(option.value) >= startHour && Number(option.value) <= endHour
      );
    }
    if (type === "minute") {
      if (selectedHour == startHour) {
        if (startMinute == "30") {
          return options.filter((option) => Number(option.value) == 30);
        }
        return options.filter((option) => Number(option.value) % 30 == 0);
      }
      if (selectedHour == endHour) {
        return options.filter((option) => Number(option.value) == 0);
      }
      return options.filter((option) => Number(option.value) % 30 == 0);
    }
  }

  // 当前时间+60 大于结束时间,不能预约(pass)
  if (compareTime(indexTime, endTime) + 60 > 0) {
    if (type === "hour") {
      return options.filter((option) => Number(option.value) <= 0);
    }
    if (type === "minute") {
      return options.filter((option) => Number(option.value) <= 0);
    }
  }
  // 当前时间+60 等于结束时间,能预约(pass)
  if (compareTime(indexTime, endTime) + 60 == 0) {
    if (type === "hour") {
      if (endMinute == 0) {
        return options.filter((option) => Number(option.value) == endHour - 1);
      }
      return options.filter((option) => Number(option.value) == endHour);
    }
    if (type === "minute") {
      if (endMinute == 0) {
        return options.filter((option) => Number(option.value) == 30);
      }
      return options.filter((option) => Number(option.value) == 0);
    }
  }
  // 当前时间+30 小于等于开始时间,能预约(pass)
  if (compareTime(indexTime, startTime) + 30 <= 0) {
    if (type === "hour") {
      if (endMinute == 0) {
        return options.filter(
          (option) =>
            Number(option.value) >= startHour && Number(option.value) < endHour
        );
      }
      return options.filter(
        (option) =>
          Number(option.value) >= startHour && Number(option.value) <= endHour
      );
    }
    if (type === "minute") {
      if (selectedHour == startHour) {
        if (startMinute == 30) {
          return options.filter((option) => Number(option.value) == 30);
        }
      }
      if (selectedHour == endHour) {
        if (endMinute == 30) {
          return options.filter((option) => Number(option.value) == 0);
        }
      }

      return options.filter((option) => Number(option.value) % 30 == 0);
    }
  }
  //{  当前时间+30分钟大于开始时间
  if (compareTime(indexTime, startTime) + 30 > 0) {
    // pass
    if (type === "hour") {
      // 当前小于开始
      if (compareTime(indexTime, startTime) <= 0) {
        if (startMinute == 0) {
          if (endMinute == 30) {
            return options.filter(
              (option) =>
                Number(option.value) >= startHour &&
                Number(option.value) <= endHour
            );
          }
          return options.filter(
            (option) =>
              Number(option.value) >= startHour &&
              Number(option.value) < endHour
          );
        } else {
          if (endMinute == 30) {
            return options.filter(
              (option) =>
                Number(option.value) > startHour &&
                Number(option.value) <= endHour
            );
          }
          return options.filter(
            (option) =>
              Number(option.value) >= startHour &&
              Number(option.value) < endHour
          );
        }
      }
      // 当前大于开始
      if (indexMinute == 0) {
        if (endMinute == 30) {
          return options.filter(
            (option) =>
              Number(option.value) >= indexHour &&
              Number(option.value) <= endHour
          );
        } else {
          return options.filter(
            (option) =>
              Number(option.value) >= indexHour &&
              Number(option.value) < endHour
          );
        }
      } else {
        if (endMinute == 30) {
          return options.filter(
            (option) =>
              Number(option.value) > indexHour &&
              Number(option.value) <= endHour
          );
        } else {
          return options.filter(
            (option) =>
              Number(option.value) > indexHour && Number(option.value) < endHour
          );
        }
      }
    }
    // pass
    if (type === "minute") {
      console.log("selectedHour", selectedHour, indexHour);
      if (selectedHour == indexHour) {
        return options.filter((option) => Number(option.value) == 30);
      }
      if (selectedHour == endHour) {
        return options.filter((option) => Number(option.value) == 0);
      }
      if (selectedHour - indexHour == 1) {
        if (indexMinute < 30) {
          return options.filter((option) => Number(option.value) % 30 == 0);
        }
        return options.filter((option) => Number(option.value) == 30);
      }

      return options.filter((option) => Number(option.value) % 30 == 0);
    }
  }
};
// 点击
function appointmentTimeShowFunction() {
  if (dateNull == true) {
    showToast("当前日期无相关数据");
    return;
  }
  // 时间选择器弹框显示
  appointmentTimeShow.value = true;
  // 时间选择器渲染
  showTimePicker.value = true;
}
// 点击遮罩层时触发
function click_overlay() {
  cancelDate();
}
// 点击时间选择器取消按钮------------------------
function cancelDate() {
  if (selectNumber == 0) {
    selectStartTimeCopy.value[0] = selectStartTime.value[0];
    selectStartTimeCopy.value[1] = selectStartTime.value[1];
    timeString.value = selectTimeFunction();
  } else {
    selectStartTime.value[0] = selectStartTimeCopy.value[0];
    selectStartTime.value[1] = selectStartTimeCopy.value[1];
  }
  appointmentTimeShow.value = false;
  selectNumber = 1;
}
// 点击时间选择器确定按钮
function confirmDate(selectedValues) {
  selectStartTime.value[0] = selectedValues.selectedValues[0];
  selectStartTime.value[1] = selectedValues.selectedValues[1];
  selectStartTimeCopy.value[0] = selectedValues.selectedValues[0];
  selectStartTimeCopy.value[1] = selectedValues.selectedValues[1];

  appointmentTimeShow.value = false;

  timeString.value = selectTimeFunction();
}
// 下拉框==============================================================
let dropdownValue = ref(30);
const dropdownOption = [
  { text: "半小时", value: 30 },
  { text: "1小时", value: 60 },
  { text: "1.5小时", value: 90 },
  { text: "2小时", value: 120 },
  { text: "4小时", value: 240 },
];
//  结束预约时段
let selectEndTime = ref("00:00");
// 监听下拉框值变化-------------
function handleChangeDropdown() {
  timeString.value = selectTimeFunction();
}

// =========================================================================
let computeTimeString = () => {
  let startTime = selectStartTime.value[0] + ":" + selectStartTime.value[1];
  let minutes = dropdownValue.value;
  let [startHour, startMinute] = startTime.split(":");
  let totalStartMinutes = Number(startHour) * 60 + Number(startMinute);
  let totalEndMinutes = totalStartMinutes + minutes;
  let endHour = Math.floor(totalEndMinutes / 60);
  let endMinute = totalEndMinutes % 60;
  let endHourDisplay = String(endHour).padStart(2, "0");
  let endMinuteDisplay = String(endMinute).padStart(2, "0");
  selectEndTime.value = `${endHourDisplay}:${endMinuteDisplay}`;

  if (compareTime(selectEndTime.value, endTime) > 0) {
    showToast("预约结束时间超时");
    dropdownValue.value = 30;
    computeTimeString();
  }
};

//
let timeString = ref("");
timeString.value = selectTimeFunction();
// 得到用户预约时段---------------------------------------------------------------
function selectTimeFunction() {
  console.log("selectTimeFunction.value", selectStartTime.value);

  if (selectStartTime.value[0] == "00" && selectStartTime.value[1] == "00") {
    showToast("当前选择的时段不能预约");
    return "还未选择,请点击预约时段";
  }
  if (
    selectStartTime.value[1] == "选择" ||
    (selectStartTime.value[0] == "00" && selectStartTime.value[1] == "00")
  ) {
    return "还未选择,请点击预约时段";
  }
  computeTimeString();
  return (
    selectStartTime.value[0] +
    ":" +
    selectStartTime.value[1] +
    "至" +
    selectEndTime.value
  );
}
// ========================监听用户选择的预约信息石是否完善-------------------
watch(timeString, (newvalue, oldvalue) => {
  console.log("watch----", newvalue);
  if (newvalue == "还未选择,请点击预约时段" || newvalue == "") {
  } else {
    questSeatsData();
  }
});
// 座位===========================================================================
let SeatsShow = ref(false);
let seatsDataList = reactive([]);
let selectedSeatIndex = ref(0);
function selectSeatFunction(index) {
  selectedSeatIndex.value = index;
}
// 网络请求获取当前可用设施编号-----------
function questSeatsData() {
  SeatsShow.value = false;
  selectedSeatIndex.value = 0;
  let startTimeQuest;
  let endTimeQuest;
  // 设置roomId, date, startTime, endTime============================================
  // 预约一天，设置时间
  if (selectHourOrDay.value == "day") {
    ("天时预约");
    startTimeQuest = startTime;
    endTimeQuest = endTime;
    if (
      new Date(new Date().toISOString().slice(0, 10)) >=
      new Date(selectDate.value)
    ) {
      let indexTime = `${new Date()
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      if (compareTime(indexTime, startTime) - 30 > 0) {
        seatsDataList = [];
        SeatsShow.value = true;
        return;
      }
    }
  } else {
    startTimeQuest = selectStartTime.value[0] + ":" + selectStartTime.value[1];
    endTimeQuest = selectEndTime.value;
  }
  // ==================================================================结束
  // 预约有编号的设施
  console.log(
    "网络请求设施编号",
    roomId,
    selectDate.value,
    startTimeQuest,
    endTimeQuest
  );
  // 获取预约房间设施（整体--------------------------）
  if (roomInfo.value.roomOverall == "100") {
    queryAvailableRoomInTime(
      roomId,
      selectDate.value,
      startTimeQuest,
      endTimeQuest
    ).then((res) => {
      console.log("获取预约房间设施（整体", res.data);
      if (res.data === true) {
        seatsDataList = [
          {
            seatNumber: roomInfo.value.roomName,
            seatId: roomId,
          },
        ];
      } else {
        seatsDataList = [];
      }

      SeatsShow.value = true;
    });

    return;
  }

  // 获取预约设施编号（非整体------------------------）
  getAvailableSeatsAndTimeSlot(
    roomId,
    selectDate.value,
    startTimeQuest,
    endTimeQuest
  )
    .then((res) => {
      console.log("获取预约设施编号（非整体", res.data);
      seatsDataList = res.data;
      SeatsShow.value = true;
    })
    .catch();
}
// 点击预定事件-=-------------------------------------------------
function clickSubmit() {
  console.log(selectedSeatIndex.value, seatsDataList.length);

  if (seatsDataList.length == 0) {
    showToast("请选择相关信息");
    return;
  }

  if (selectHourOrDay.value == "day") {
  }
  if (selectHourOrDay.value == "hour") {
    if (timeString.value != "还未选择,请点击预约时段") {
      console.log(
        roomId,
        selectDate.value,
        selectStartTime.value[0] + ":" + selectStartTime.value[1],
        selectEndTime.value,
        seatsDataList[selectedSeatIndex.value].seatId
      );
      let userReservation = {
        reservationType:
          roomInfo.value.roomOverall == "100" ? "room" : "room_facility_code",
        roomId: roomId,
        roomIdSeatId: seatsDataList[selectedSeatIndex.value].seatId,
        reservationDate: selectDate.value,
        startTime: selectStartTime.value[0] + ":" + selectStartTime.value[1],
        endTime: selectEndTime.value,
      };

      console.log(userReservation);
      //  发送预约申请
      addUserReservation(userReservation)
        .then((res) => {
          console.log(res.data.reservationId);
          if (
            res.data.reservationId != null ||
            res.data != null ||
            res.data != undefined ||
            res.data != ""
          ) {
            router.push({
              path: "/school/reservation/reservationResult",
              query: {
                reservationId: res.data.reservationId,
              },
            });
          } else {
            showToast("预约失败");
          }
        })
        .catch((err) => {});
    } else {
      showToast("请选择相关信息");
      return;
    }
  }
}
</script>


<style scoped >
/* 下拉框高度 */
.dropdown {
  --van-dropdown-menu-height: 3.5vh !important;
  --van-dropdown-menu-shadow: 0 0px 0px fade(var(--van-gray-7), 12);
}

.roomDetail {
  height: 100vh;

  position: relative;
}
.image {
  width: 100vw;
  height: 25vh;
}
.reservation {
  width: 100vw;
  height: auto;
  background-color: white;
}
.row {
  height: 4.5vh;

  margin-top: 1vh;
}
.col {
  display: flex;
  height: 4.5vh;
  align-items: center;
}

.col2 {
  font-size: 14px;
}
.row .col:first-child {
  color: black;
  font-size: 15px;
}
.input {
  height: 3.5vh;
  border: 1px solid #fedd02;
  border-radius: 6px;
  width: 100%;
  text-align: center;
  line-height: 3.5vh;
  font-size: 14px;
}
/* 选择预约方式 */
.active {
  background-color: #fedd02;
}
/* 座位表 */
.seats {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(20vw, 20.5vw)
  ); /* 自适应每个元素的列宽，最小宽度为20vw */
  grid-gap: 10px; /* 元素之间的间隔 */
  width: 90vw;
  margin: 10px auto;
  justify-items: center; /* 水平居中对齐 */
  align-items: flex-start;
  padding-bottom: 80px;
}
.seats .box {
  text-align: center;
  width: 100%; /* 充满父容器的宽度 */
  height: 10vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #eeeeee;
}
.seats .selectSeat {
  background-color: #fedd02;
}
/* 底部 */

.bottom {
  position: fixed;
  width: 90vw;
  height: 75px;
  margin: 0px auto;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  left: 5vw;
}
.bottom .div1 {
  display: flex;
  align-items: center;
  font-size: 8px;
  display: flex;
  height: 20px;
  margin-bottom: 5px;
}
.bottom .div1 > div {
  margin-right: 20px;
  width: 15px;
  height: 15px;
  background-color: #fedd02;
}
.bottom .div2 {
  height: 50px;

  background-color: #fedd02;
}
</style>