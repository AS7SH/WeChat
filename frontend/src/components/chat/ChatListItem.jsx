import { formatChatTime, getOtherUserAndGroups } from "@/lib/helper";
import { Button } from "../ui/button";
import AvatarWithBadge from "../AvatarWithBadge";

const ChatListItem = ({ chat, onClick, currentUserId }) => {
    const { lastMessage, createdAt } = chat;

    const { name, avatar, isOnline, isGroup } = getOtherUserAndGroups(
        chat,
        currentUserId,
    );

    const getLastMessageText = () => {
        if (!lastMessage) {
            return isGroup
                ? chat.createdBy === currentUserId
                    ? "Group created"
                    : "you were added"
                : "Send a message";
        }

        if (lastMessage.image) return "📸 Photo";

        if (!isGroup) {
            return lastMessage.content;
        }

        return lastMessage.sender._id === currentUserId
            ? `${lastMessage.content}`
            : `${lastMessage.sender.name} : ${lastMessage.content}`;
    };

    return (
        <>
            <Button
                onClick={onClick}
                className={
                    "w-full flex items-center hover:bg-primary/20 bg-bg-dark cursor-pointer h-14 gap-2 p-4 rounded-sm transition-colors duration-300 text-left"
                }
            >
                <AvatarWithBadge
                    name={name}
                    src={avatar}
                    isGroup={isGroup}
                    isOnline={isOnline}
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                        <h5 className="text-sm font-semibold truncate">
                            {name}
                        </h5>
                        <span className="text-xs ml-2 shrink-0 text-text-muted">
                            {formatChatTime(
                                lastMessage?.updatedAt || createdAt,
                            )}
                        </span>
                    </div>
                    <p className="text-xs truncate text-text-muted -mt-px">
                        {getLastMessageText()}
                    </p>
                </div>
            </Button>
        </>
    );
};

export default ChatListItem;
