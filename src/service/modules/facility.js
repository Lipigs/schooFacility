import Request from "../request/index.js";

// 下拉菜单，得到所有设施类型
export async function getAllFacility() {
   return await Request.get('/api/getFacilities');
}
export async function getFacilityNameByFacilityId(facilityId) {
   return await Request.post('/api/getFacilityNameByFacilityId',{
      facilityId
   });
}
