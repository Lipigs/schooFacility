import axios from "axios";
import { showLoadingToast, closeToast, showSuccessToast, showFailToast } from "vant";
import { useRouter } from "vue-router";
let router = useRouter()
console.log(router);
import { BASE_URL, OUTTIME } from './config.js'
let that = this;
let Request = axios.create({
  baseURL: BASE_URL,
  timeout: OUTTIME,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})
// 在请求发送前拦截请求，添加 token 到头部
Request.interceptors.request.use(function (config) {
  //判断当前请求是否为登录请求
  if (config.url === '/school/login') {
    return config;
  }

  const token = localStorage.getItem('token'); // 从 localStorage 中获取 token
  const userid = localStorage.getItem('userid');
  if (token && userid) {
    config.headers['token'] = `${token}`;
    config.headers['userid'] = `${userid}`;
  }
 
  return config;
}, function (error) {
  window.location.assign("/");
  showFailToast("登录认证失败，请重试")
  return Promise.reject(error);
});

// 添加响应拦截器
Request.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.code == 405 && data.status === false) {
      showFailToast("登录认证失败，请重新登录")
      setTimeout(() => {
        window.location.assign("/");
      }, 2000);
    }
    return response;
  },
  function (error) {
    // window.location.assign("/");
    // showFailToast("登录认证失败，请重试")
    return Promise.reject(error);
  }
);





export default Request;