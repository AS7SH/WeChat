import { Link } from "react-router-dom";
import logoSvg from "@/assets/WeChat.svg";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Logo = ({
    url = "/",
    showText = true,
    imgClass = "size-[30px]",
    textClass,
}) => {
    const { user } = useAuth();

    url = user === null ? "/" : "/chat";

    return (
        <Link to={url} className="flex items-center gap-2 w-fit">
            <img src={logoSvg} alt="WeChat" className={cn(imgClass)} />
            {showText && (
                <span
                    className={cn(
                        "font-semibold text-lg text-text leading-tight",
                        textClass,
                    )}
                >
                    WeChat
                </span>
            )}
        </Link>
    );
};
export default Logo;
