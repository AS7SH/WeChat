import { API } from "@/lib/axios-client";
import { toast } from "sonner";
import { create } from "zustand";

export const useChat = create((set, get) => ({
    chats: [],
    users: [],
    signleChat: null,

    isChatsLoading: false,
    isUsersLoading: false,
    isCreatingChat: false,
    isSingleChatLoading: false,

    fetchAllUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await API.get("/user/all");
            set({ users: response?.data?.data });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch users",
            );
            throw error;
        } finally {
            set({ isUsersLoading: false });
        }
    },

    fetchChats: async () => {
        set({ isChatsLoading: true });
        try {
            const response = await API.get("/chat/all");
            set({ chats: response?.data?.data });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch chats",
            );
            throw error;
        } finally {
            set({ isChatsLoading: false });
        }
    },

    createChat: async (payload) => {
        set({ isCreatingChat: true });
        try {
            const response = await API.post("/chat/create", { ...payload });
            get().addNewChat(response?.data?.data);
            toast.success(
                response?.data?.message || "Chat created Successfully",
            );
            return response?.data?.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to create chat",
            );
            throw error;
        } finally {
            set({ isCreatingChat: false });
        }
    },

    fetchSingleChat: async () => {
        set({ isSingleChatLoading: true });
        try {
            const response = await API.get("/chat/:id");
            set({ chats: response?.data?.data });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to create chat",
            );
            throw error;
        } finally {
            set({ isCreatingChat: false });
        }
    },

    addNewChat: (newChat) => {
        set((state) => {
            const existingChat = state.chats.findIndex(
                (c) => c._id === newChat._id,
            );

            if (existingChat !== -1) {
                return {
                    chats: [
                        existingChat,
                        ...state.chats.filter(
                            (chat) => chat._id !== newChat._id,
                        ),
                    ],
                };
            } else {
                return {
                    chats: [newChat, ...state.chats],
                };
            }
        });
    },
}));
