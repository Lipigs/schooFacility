// import { from } from 'core-js/core/array'

export { login } from './modules/login.js'
// export { getHomeIndexData } from "./modules/home.js"// login用户登录
export { getAllFacility ,getFacilityNameByFacilityId} from "./modules/facility.js"

export { getBuildingsByFacilityIdAndPage,
   getBuildingTotalByFacilityId,
   getBuildingNameByRoomId } from "./modules/building.js"

export { getRoomsByFacilityAndBuilding } from "./modules/room.js"

export {getOpeningHoursDateByRoomId,getRoomOpenHours,getRoomByRoomId,
  queryAvailableRoomInTime
} from "./modules/roomDetail.js"

export {addMyFeedback,getMyFeedback} from  "./modules/feedback.js"
export {updateImageFile} from "./modules/image.js"

export {getAllBanners} from "./modules/banner.js"

export {queryReservationScheduleByReservationId} from "./modules/reservationHandler.js"
export {
  addUserReservation,
  getAvailableSeatsAndTimeSlot,
  getUserReservationById,
  getUserPendingReservationById,
  getUserAllReservationById,
  getUserCanceledReservationById,
getSeatNumberBySeatId,
canceledReservationById,getReservationRoomName
} from "./modules/reservation.js"