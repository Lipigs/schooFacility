import Request from "../request/index.js";
// 根据facilityId
export async function getOpeningHoursDateByRoomId(roomId) {
  return await Request.get(`room/getRoomOpeningDate?roomId=${roomId}`);
}

export async function getRoomOpenHours(roomId, date) {
  return await Request.post(`room/getRoomOpenHours`, {
    roomId, date
  });
}



export async function queryAvailableRoomInTime(roomId, date, startTime, endTime) {
  return await Request.post(`room/queryAvailableRoomInTime`, {
    roomId, date, startTime, endTime
  });
}


export async function getRoomByRoomId(roomId) {
  return await Request.post(`room/getRoomByRoomId`, {
    roomId
  });
}