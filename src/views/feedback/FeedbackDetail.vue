<template>
  <div class="feedbackDetail">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="反馈详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 设置垂直间距 -->
    <div class="row">
      <div class="col col1">反馈类型</div>
      <div class="col col2">{{ item.feedbackType }}</div>
    </div>
    <div class="row">
      <div class="col col1">反馈进度</div>
      <div class="col col2">
        {{ item.process == "Processing" ? "处理中" : "已完成" }}
      </div>
    </div>
    <div class="row">
      <div class="col col1">提交时间</div>
      <div class="col col2">{{ convertDateFormat(item.submitTime) }}</div>
    </div>
    <div class="row">
      <div class="col col1">反馈描述</div>
      <div class="col col2 col3">
        {{ item.feedbackDescription }}
      </div>
    </div>
    <div class="row">
      <div class="col col1">反馈图片</div>
      <div class="col col2">
        <!-- item.image -->
        <van-image
          width="8rem"
          height="8rem"
          fit="cover"
          :src="item.image"
        />
        
      </div>
    </div>
    <div class="row">
      <div class="col col1">联系方式</div>
      <div class="col col2">{{ item.telPhone }}</div>
    </div>
    <div class="row">
      <div class="col col1">备注信息</div>
      <div class="col col2">{{ item.notes }}</div>
    </div>
    <template v-if="item.adminId !=0">
      <div class="row">
      <div class="col col1">处理人编号</div>
      <div class="col col2">{{ item.adminId }}</div>
    </div>
    <div class="row">
      <div class="col col1">回复信息</div>
      <div class="col col2">{{ item.replyString }}</div>
    </div>
    <div class="row">
      <div class="col col1">处理时间</div>
      <div class="col col2">{{convertDateFormat( item.replyTime )}}</div>
    </div>
    </template>

    <van-button round type="success" block class="btn" @click="onClickLeft()">返回</van-button>
    
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
import { convertDateFormat } from "../../util/date.js";
let item = JSON.parse(router.currentRoute.value.query.item);
console.log(router.currentRoute.value.query.item);
// 使用 item 来渲染数据
console.log(item);
// 返回上一个页面事件
function onClickLeft() {
  router.back();
}
</script>

<style scoped>
.row {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.row .col1 {
  color: red;
  width: 100px;
  padding-left: 20px;
}
.row .col2 {
  width: 300px;
  padding-left: 50px;
  display: flex;
  flex-flow: wrap;
}
.btn{
  position: relative;
  bottom: -100px;
  width: 94%;
  margin: 0px auto;
}
</style>