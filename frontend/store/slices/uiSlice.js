import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  loading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleCart,
  closeCart,
  toggleSearch,
  closeSearch,
  toggleMobileMenu,
  closeMobileMenu,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer; 