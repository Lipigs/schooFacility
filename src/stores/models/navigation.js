// store.js
import { defineStore } from "pinia";

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    selectedKey: "1",
    openKey: ['2']
  }),
  persist: true,//开启持久化
  actions: {
    setSelectedKey(key) {
      this.selectedKey = key;
    },
    setOpenKey(key) {
      this.openKey = key
    }

  }
});
