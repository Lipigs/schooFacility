import Request from "../request/index.js";
export async function updateImageFile(file,folderName){
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', folderName);
  console.log(formData);
   return await Request.post("image/upload",formData) 
}

export async function deleteImageFile(imagePath){
  return await Request.delete("image/delete",{params: { imagePath } }) 
}