import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userToken: localStorage.getItem('userToken') || null,
    adminToken: localStorage.getItem('adminToken') || null,
  }),
  actions: {
    userLogin(token) {
      localStorage.setItem('userToken', token);
      this.userToken = token;
    },

    adminLogin(token) {
      localStorage.setItem('adminToken', token);
      this.adminToken = token;
    },

    logout() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('adminToken');
      this.adminToken = null;
      this.userToken = null;
    },
  },

  getters: {
    isUserLoggedIn: (state) => state.userToken !== null,
    getUserToken: (state) => state.userToken,
    
    isAdminLoggedIn: (state) => state.adminToken !== null,
    getAdminToken: (state) => state.adminToken,
  },
});