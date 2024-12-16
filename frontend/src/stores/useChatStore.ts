import axios from "axios";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Message, User } from "../types";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: ReturnType<typeof io>;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const updatedActivities = new Map(state.userActivities);
          updatedActivities.set(userId, activity);
          return { userActivities: updatedActivities };
        });
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        set({ error: "Failed to connect to the server." });
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: (receiverId, senderId, content) => {
    if (!get().isConnected) {
      console.error("Socket is not connected. Message not sent.");
      return;
    }

    socket.emit("send_message", { receiverId, senderId, content }, (response: { success: boolean; error?: string }) => {
      if (!response.success) {
        console.error("Failed to send message:", response.error);
        set({ error: response.error || "Failed to send message." });
      }
    });
  },

  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
