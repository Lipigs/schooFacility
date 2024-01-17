import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueBarcodeScanner from 'vue-barcode-scanner';
import router from './router'
let app = createApp(App)
app.use(router);
// 扫描二维码
app.mount('#app')

import { Col, Row } from 'vant';
 
app.use(Col);
app.use(Row);
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
import { showLoadingToast, closeToast,showSuccessToast, showFailToast } from "vant";