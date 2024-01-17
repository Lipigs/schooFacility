import Request from "../request/index.js";

// 下拉菜单，得到所有设施类型
export async function getBuildingsByFacilityIdAndPage(facilityId,page) {
   return await Request.get(`building/facility/${facilityId}/page/${page}`);
}
// 根据facilityId去facilities_building表找facility_id=facilityId的总条数
export async function getBuildingTotalByFacilityId(facilityId) {
   return await Request.get(`building/getBuildingTotalByFacilityId?facilityId=${facilityId}`);
}

export async function getBuildingNameByRoomId(roomId) {
   return await Request.post(`building/getBuildingNameByRoomId`,{
      roomId
   });
}