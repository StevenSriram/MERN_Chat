import { create } from "zustand";
import { io } from "socket.io-client";

import useAuthStore from "./useAuthStore.js";

const API_URL = "http://localhost:5000";

const useSocketStore = create((set, get) => ({
  socket: null,

  connectSocket: () => {
    const { isAuthenticated } = useAuthStore.getState();
    const { socket } = get();

    // ? Check Authenticated and Socket Connected
    if (!isAuthenticated || socket?.connected) {
      return;
    }

    // ! Connect to Server Socket
    const newSocket = io(API_URL);
    newSocket.connect();

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();

    // ? Check Socket Connected
    if (socket?.connected) {
      // ! only then Disconnect
      socket.disconnect();
    }

    set({ socket: null });
  },
}));

export default useSocketStore;
