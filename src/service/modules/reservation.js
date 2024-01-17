import Request from "../request/index.js";


export async function addUserReservation(userReservation) {
  return await Request.post(`reservation/addUserReservation`,
    userReservation
  );
}
export async function getAvailableSeatsAndTimeSlot(roomId, date, startTime, endTime) {
  return await Request.post(`reservation/availableSeats`, {
    roomId, date, startTime, endTime
  });
}
export async function getUserReservationById(reservationId) {
  return await Request.post(`reservation/queryOneReservation`, {
    reservationId
  })
}
export async function getUserAllReservationById() {
  return await Request.post(`reservation/queryAllReservation`)
}
export async function getUserPendingReservationById() {
  return await Request.post(`reservation/queryPendingReservation`)
}
export async function getUserCanceledReservationById() {
  return await Request.post(`reservation/queryCancelReservation`)
}

export async function getSeatNumberBySeatId(seatId) {
  return await Request.post(`reservation/getSeatNumber`, { seatId })
}
export async function canceledReservationById(reservationId, reservationDetailId,code) {
  return await Request.post(`reservation/cancelReservation`, { reservationId, reservationDetailId, code })
}
export async function getReservationRoomName(roomId) {
  return await Request.post(`reservation/getReservationRoomName`, { roomId })
}

// String sql = "SELECT s.seat_id, s.seat_number " +
// "FROM seat s " +
// "WHERE s.room_id = ? " +
// "AND s.seat_status = 'Available' " +
// "AND NOT EXISTS (" +
// "    SELECT 1 " +
// "    FROM seat_reservation sr " +
// "    WHERE sr.seat_id = s.seat_id " +
// "    AND sr.reservation_date = ? " +
// "    AND ((sr.start_time <= ? AND sr.end_time >= ?) " +
// "    OR (sr.start_time >= ? AND sr.start_time < ?) " +
// "    OR (sr.end_time > ? AND sr.end_time <= ?))" +
// ")";