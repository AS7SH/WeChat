import { useSocket } from "@/hooks/useSocket";
import { format, isThisWeek, isToday, isYesterday } from "date-fns";

export const isUserOnline = (userId) => {
    if (!userId) return false;
    const { onlineUsers } = useSocket.getState();
    return onlineUsers.includes(userId);
};

export const getOtherUserAndGroups = (chat, userId) => {
    const isGroup = chat?.isGroup;

    if (isGroup) {
        return {
            name: chat.groupName || "Unnamed Group",
            subHeading: `${chat.participants.length} members`,
            avatar: "",
            isGroup,
        };
    }

    const other = chat.participants.find((p) => p?._id !== userId);

    const isOnline = isUserOnline(other?._id);

    return {
        name: other.name || "Unknown",
        subHeading: isOnline ? "online" : "offline",
        avatar: other.avatar || "",
        isGroup: false,
        isOnline,
    };
};

export const formatChatTime = (date) => {
    if (!date) return "";

    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) return "Invalid date";
    if (isToday(newDate)) return format(newDate, "h:mm a");
    if (isYesterday(newDate)) return "yesterday";
    if (isThisWeek(newDate)) return format(newDate, "EEEE");

    return format(newDate, "m/d");
};
