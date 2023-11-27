import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    setUser: (userInfo) => set({ user: userInfo }),
    removeUser: () => set({ user: null }),
}));

export default useUserStore;