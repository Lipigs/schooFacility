import Request from "../request/index.js";

// 下拉菜单，得到所有设施类型
export async function addMyFeedback(feedbackType,
  feedbackDescription,telPhone,notes,image) {
   return await Request.post('/feedback/addMyFeedback',{
    feedbackType,feedbackDescription,telPhone,notes,image
   });
}

export async function getMyFeedback() {
  return await Request.post('/feedback/getMyFeedback')
}
