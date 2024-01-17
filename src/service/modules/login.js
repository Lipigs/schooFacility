import Request from "../request/index.js";

// 登录函数
export async function login({username, password}) {
  localStorage.setItem("token","")
  localStorage.setItem("userid","")
  console.log(username,password);
   return await Request.post('/school/login', { username, password });
}

