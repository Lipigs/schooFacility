import Request from "../request/index.js";
// 根据facilityId
export async function getRoomsByFacilityAndBuilding(facilityId,buildingId) {
  return await Request.get(`room/getRooms?facilityId=${facilityId}&&buildingId=${buildingId}`);
}