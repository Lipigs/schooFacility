import { createPinia } from "pinia";
//引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//创建store实例
const pinia = createPinia();
//使用持久化插件
pinia.use(piniaPluginPersistedstate)
export default pinia;
