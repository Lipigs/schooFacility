import Request from "../request/index.js";

// 登录函数
export async function queryReservationScheduleByReservationId(reservationId) {
   return await Request.post('/reservationHandler/queryReservationSchedule', {reservationId });
}

