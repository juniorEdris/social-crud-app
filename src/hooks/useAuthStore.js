import create from "zustand";

const useAuthStore = create((set) => ({
  auth: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  setAuth: (auth) => set((state) => ({ auth })),
  removeAuth: () => set({ auth: null }),
}));

export default useAuthStore;
