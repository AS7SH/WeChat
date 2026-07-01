import { useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import ChatListItem from "./ChatListItem";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ChatListHeader from "./ChatListHeader";

const ChatList = () => {
    const { fetchChats, chats, isChatsLoading } = useChat();
    const { user } = useAuth();

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const currentUserId = user?._id || null;

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    const onRoute = (id) => {
        navigate(`/chat/${id}`);
    };

    const filteredChats = chats?.filter(
        (chat) =>
            chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.participants.some(
                (p) =>
                    p._id !== currentUserId &&
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
    );

    return (
        <>
            <div className="fixed inset-y-0 pb-20 lg:pb-0 lg:max-w-94.75 lg:block border-r border-border bg-bg-dark text-text max-w-[calc(100%-60px)] w-full left-15 z-98 ">
                <div className="flex-col">
                    <ChatListHeader onSearch={setSearchQuery} />

                    <div className="flex-1 h-[calc(100vh-100px)] overflow-y-auto">
                        <div className="px-2 py2 pb-10 pt-2 space-y-2">
                            {isChatsLoading ? (
                                <div className="flex items-center justify-center">
                                    <Spinner className="w-7 h-7" />
                                </div>
                            ) : filteredChats?.length === 0 ? (
                                <div className="flex items-center justify-center">
                                    {searchQuery
                                        ? "No chat found"
                                        : "No chats created"}
                                </div>
                            ) : (
                                filteredChats?.map((chat) => (
                                    <ChatListItem
                                        key={chat._id}
                                        chat={chat}
                                        currentUserId={currentUserId}
                                        onClick={() => onRoute(chat._id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatList;
