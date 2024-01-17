<template>
  <div class="login">
    <div class="image">
      <img src="../../assets/logo.jpg" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset class="cell_group">
        <van-field
          v-model="username"
          name="username"
          label="账号"
          placeholder="账号"
          left-icon="user-o"
          :colon="true"
          label-width="50px"
          :rules="[{ required: true, message: '请填写账号/学号' }]"
        />
        <van-field
          :colon="true"
          v-model="password"
          type="password"
          name="password"
          label="密码"
          left-icon="shield-o"
          label-width="50px"
          placeholder="密码"
          :rules="[
            {
              required: true,
              validator: passwordValidatorMessage,
              message: '请输入密码',
            },
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="bottom">
      <!-- <van-checkbox v-model="checked" style="font-size: 12px"
        >同意并阅读<a href="">服务协议</a>》</van-checkbox
      > -->
      <van-row gutter="20" class="row" justify="center">
        <van-col span="6" style=" text-align: center;">忘记密码</van-col>
        <van-col span="1" style=" text-align: center;">|</van-col>
        <van-col span="6" style=" text-align: center;">去注册</van-col>
      </van-row>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { login } from "../../service/index.js";
import { showLoadingToast, closeToast,showSuccessToast, showFailToast } from "vant";
let router = useRouter();
let username = ref("liyi");
let password = ref("123456");
let checked = ref(false);
let onSubmit = async (values) => {
  showLoadingToast("登录中...");
  await login(values)
    .then((res) => {
      closeToast();
      console.log(res.data);
      if (res.token!="" && res.userid!="") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.userid);
        showSuccessToast('欢迎你');
        router.push("/school/home/index");

      } else {
        showFailToast('账号或者密码错误！');
        username.value = "";
        password.value = "";
      }
    })
    .catch((err) => {
      showFailToast('系统错误，请重试！');
    });
};
function passwordValidatorMessage(val) {
  if (val.length < 1) {
    return "请输入密码";
  } else if (val.length < 5 || val.length > 10) {
    return "密码长度在6到10之间";
  }
}

// 校验函数返回 true 表示校验通过，false 表示不通过
let validator = (val) => {};
</script>

<style scoped>
.image {
  border-radius: 3px;
  margin: 0px auto;
  width: 95vw;
  height: 35vh;
  margin-bottom: 50px;
  text-align: center;
}
img {
  border-radius: 3px;
  width: 95vw;
  height: 35vh;
}
.cell_group {
  height: 136px;
}
.login {
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
}
.bottom {
  width: 85vw;
  padding: 0px auto;

  margin-top: 80px;
  margin-left: 16px;
}
.row {
  font-size: 12px;
  margin-top: 100px;
  color: black;
  text-align: center;
}
</style>