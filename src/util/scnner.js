
// 引入 jsQR 模块
// let jsQR = require('jsqr');
// export function recognizeQRCode(file) {
//   return new Promise((resolve, reject) => {
//     let image = new Image();
//     // 当图像加载完成后执行的操作
//     image.onload = () => {
//       let canvas = document.createElement('canvas');
//       let ctx = canvas.getContext('2d');
//       canvas.width = image.width;
//       canvas.height = image.height;
//       ctx.drawImage(image, 0, 0);
//       let imageData = ctx.getImageData(0, 0, image.width, image.height);
//       let code = jsQR(imageData.data, imageData.width, imageData.height);
//       console.log(code);
//       if (code) {
//         let obj;
//         try {
//           obj = JSON.parse(code.data);
//         } catch (error) {
//           obj = {}; // 出错时赋予一个默认值
//         }
//         resolve(obj); // 成功识别到二维码，将识别的数据通过 Promise 返回
//       } else {
//         reject(new Error('识别信息错误，请重试！')); // 未能识别到二维码，通过 Promise 返回错误信息
//       }
//     };

//     // 设置图像的 src 属性，触发图像加载
//     image.src = URL.createObjectURL(file);
//   });
// }


