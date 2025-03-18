import { create } from "zustand";
import { io } from "socket.io-client";

import useAuthStore from "./useAuthStore.js";

const API_URL = "http://localhost:5000";

const useSocketStore = create((set, get) => ({
  socket: null,

  // * Online Users
  onlineUsers: [],

  connectSocket: () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    const { socket } = get();

    // ? Check Authenticated and Socket Connected
    if (!isAuthenticated || socket?.connected) {
      return;
    }

    // ! Connect to Server Socket
    const newSocket = io(API_URL, {
      query: {
        userId: user._id,
      },
    });
    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      console.log(userIds);

      set({ onlineUsers: userIds });
    });
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
