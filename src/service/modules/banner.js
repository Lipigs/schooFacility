import Request from "../request/index.js";
export async function getAllBanners() {
  return Request.post("Banner/getAllBanners")
}
