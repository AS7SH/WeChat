import { useChat } from "@/hooks/useChat";
import { memo, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ArrowLeft, PenBoxIcon, Search, UserIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import AvatarWithBadge from "../AvatarWithBadge";
import { Checkbox } from "../ui/checkbox";

export const NewChatPopOver = memo(() => {
    const { fetchAllUsers, users, isUsersLoading, createChat, isCreatingChat } =
        useChat();

    const [isOpen, setIsOpen] = useState(false);
    const [isGroupMode, setIsGroupMode] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [loadingUserId, setLoadingUserId] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const toggleUserSelection = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id)
                ? prev.filter((userId) => userId !== id)
                : [...prev, id],
        );
    };

    const handleBack = () => {
        resetState();
    };

    const resetState = () => {
        setIsGroupMode(false);
        setGroupName("");
        setSearchQuery("");
        setSelectedUsers([]);
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        resetState();
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim() || selectedUsers.length === 0) return;

        await createChat({
            isGroup: true,
            groupName,
            participants: selectedUsers,
        });

        setIsOpen(false);
        resetState();
    };

    const handleCreateChat = async (userId) => {
        setLoadingUserId(userId);

        try {
            await createChat({
                isGroup: false,
                participantId: userId,
            });
            setIsOpen(false);
            resetState();
        } finally {
            setLoadingUserId(null);
            setIsOpen(false);
            resetState();
        }

        setIsOpen(false);
        resetState();
    };

    return (
        <>
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button onClick={() => setIsOpen(true)} variant="ghost">
                        <PenBoxIcon className="h-5! w-5! stroke-1!" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className={
                        "w-80 z-999 border border-primary bg-bg-dark text-text p-2 rounded-md min-h-100 max-h-[80vh] flex flex-col"
                    }
                >
                    <div className="border-b px-1 py-2 pb-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            {isGroupMode && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleBack}
                                >
                                    <ArrowLeft size={16} />
                                </Button>
                            )}
                            <h3 className="text-lg font-semibold">
                                {isGroupMode ? "New Group" : "New Chat"}
                            </h3>
                        </div>

                        <div className="relative w-full">
                            {isGroupMode ? (
                                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            ) : (
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            )}

                            <input
                                type="text"
                                value={isGroupMode ? groupName : searchQuery}
                                onChange={(e) => {
                                    isGroupMode
                                        ? setGroupName(e.target.value)
                                        : setSearchQuery(e.target.value);
                                }}
                                placeholder={
                                    isGroupMode
                                        ? "Enter group name"
                                        : "Search user"
                                }
                                className=" w-full rounded-xl bg-bg-light border-border-muted py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-text-muted"
                            />
                        </div>
                    </div>
                    <div className="flex-1 justify-center overflow-y-auto px-1 py-1 space-y-1">
                        {isUsersLoading ? (
                            <Spinner className={"w-6 h-6"} />
                        ) : users && users?.length === 0 ? (
                            <div className="text-center text-muted-foreground">
                                No users found
                            </div>
                        ) : !isGroupMode ? (
                            <>
                                <NewGroupItem
                                    disabled={isCreatingChat}
                                    onClick={() => setIsGroupMode(true)}
                                />
                                <div className="flex flex-col py-3">
                                    {users?.map((user) => (
                                        <ChatUserItem
                                            key={user._id}
                                            user={user}
                                            isLoading={
                                                loadingUserId === user._id
                                            }
                                            disabled={loadingUserId !== null}
                                            onClick={handleCreateChat}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            users?.map((user) => (
                                <GroupUserItem
                                    key={user._id}
                                    user={user}
                                    isSelected={selectedUsers.includes(
                                        user._id,
                                    )}
                                    onToggle={toggleUserSelection}
                                />
                            ))
                        )}
                    </div>
                    {isGroupMode && (
                        <div className="border-t p-3">
                            <Button
                                onClick={handleCreateGroup}
                                className="w-full"
                                disabled={
                                    isCreatingChat ||
                                    !groupName.trim() ||
                                    selectedUsers.length === 0
                                }
                            >
                                {isCreatingChat && (
                                    <Spinner className="w-4 h-4" />
                                )}
                                Create Group
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </>
    );
});

NewChatPopOver.displayName = "NewChatPopOver";

const UserAvatar = memo(({ user }) => (
    <>
        <AvatarWithBadge name={user.name} src={user.avatar || null} />
        <div className="min-w-0 flex-1">
            <h5 className="text-[13.5px] font-medium truncate">{user.name}</h5>
            <p className="text-xs text-muted-foreground">{user.about}</p>
        </div>
    </>
));

UserAvatar.displayName = "UserAvatar";

const NewGroupItem = memo(({ disabled, onClick }) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center gap-2 p-2 rounded-sm hover:bg-accent transition-colors text-left disabled:opacity-50 "
    >
        <div className="bg-primary/10 p-2 rounded-full">
            <UserIcon className="size-4 text-white" />
        </div>
        <span>New Group</span>
    </Button>
));

NewGroupItem.displayName = "NewGroupItem";

const ChatUserItem = memo(({ user, disabled, isLoading, onClick }) => (
    <button
        className=" relative w-full flex items-center gap-2 p-2 rounded-sm hover:bg-primary/20 transition-colors text-left disabled:opacity-50"
        disabled={isLoading || disabled}
        onClick={() => onClick(user._id)}
    >
        <UserAvatar user={user} />
        {isLoading && <Spinner className="absolute right-2 w-4 h-4 ml-auto" />}
    </button>
));

ChatUserItem.displayName = "ChatUserItem";

const GroupUserItem = memo(({ user, isSelected, onToggle }) => (
    <label
        role="button"
        className="w-full flex items-center gap-2 p-2 rounded-sm hover:bg-accent transition-colors text-left"
    >
        <UserAvatar user={user} />
        <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggle(user._id)}
        />
    </label>
));

GroupUserItem.displayName = "GroupUserItem";
