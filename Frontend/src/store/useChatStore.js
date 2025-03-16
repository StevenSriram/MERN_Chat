import { create } from "zustand";
import axiosInstance from "../utils/axios.js";

import { toast } from "react-hot-toast";

const useChatStore = create((set) => ({
  // * chat Users
  chatUsers: [],
  selectedUser: null,
  isUsersLoading: false,

  // * Online Users
  onlineUsers: [],

  // * Messages
  messages: [],
  isMessagesLoading: false,

  // ! Actions : need to Optimize
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getChatUsers: async (id) => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get(
        `/api/user/chat/${encodeURIComponent(id)}`
      );

      set({ chatUsers: response.data.users });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (from, to) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(
        `/api/message/get/${encodeURIComponent(from)}/${encodeURIComponent(to)}`
      );

      set({ messages: response.data.messages });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));

export default useChatStore;
