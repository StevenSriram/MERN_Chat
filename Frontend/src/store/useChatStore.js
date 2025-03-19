import { create } from "zustand";
import axiosInstance from "../utils/axios.js";

import { toast } from "react-hot-toast";

import useSocketStore from "./useSocketStore.js";

const useChatStore = create((set, get) => ({
  // * chat Users
  chatUsers: [],
  selectedUser: null,
  isUsersLoading: false,

  // * Messages
  messages: [],
  isMessagesLoading: false,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  clearSelectedUser: () => {
    set({ selectedUser: null });
  },

  addMessage: (msg) => {
    set((state) => ({
      messages: [...state.messages, msg],
    }));
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

  sendMessage: async (from, to, messageData) => {
    try {
      const response = await axiosInstance.post(
        `/api/message/send/${encodeURIComponent(from)}/${encodeURIComponent(
          to
        )}`,
        messageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  },

  // * listen to new Messages
  subscribeToMessages: () => {
    const { selectedUser, addMessage, messages } = get();
    const { socket } = useSocketStore.getState();

    if (!selectedUser) return;

    // ? Update Messages
    socket.on("newMessage", (msg) => {
      console.log("New Message", msg);
      console.log("Selected User", selectedUser);
      console.log("Messages", messages);

      // ! Check sender or receiver
      if (
        msg.sender === selectedUser._id ||
        msg.receiver === selectedUser._id
      ) {
        addMessage(msg);
      }
    });
  },

  // * stop listening from Messages
  unSubscribeFromMessages: () => {
    const { socket } = useSocketStore.getState();

    // ? Stop new Message
    socket.off("newMessage");
  },
}));

export default useChatStore;
