import { Search } from "lucide-react";
import { NewChatPopOver } from "./NewChatPopOver";

const ChatListHeader = ({ onSearch }) => {
    return (
        <>
            <div className="px-3 py-3 border-b-2 border-border">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-xl font-semibold">Chat</h1>
                    <div>
                        {/* NewChatPopover */}
                        <NewChatPopOver />
                    </div>
                </div>
                <div>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

                        <input
                            type="text"
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Search..."
                            className=" w-full rounded-xl bg-bg-light border-border-muted py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-text-muted"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatListHeader;
