// import { create } from 'zustand';

// const useUserStore = create((set) => ({
//     user: null,
//     setUser: (userInfo) => set({ user: userInfo }),
//     removeUser: () => set({ user: null }),
// }));

// export default useUserStore;

// useUserStore.js
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (userInfo) => set((state) => ({ user: { ...state.user, ...userInfo } })),
  removeUser: () => set({ user: null }),
}))

export default useUserStore
