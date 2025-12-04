import { useStoreUser } from "@/stores/userStore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { user, incrementUnreadChatMessages } = useStoreUser();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!user?._id) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return;
        }

        const socketUrl = String(import.meta.env.VITE_API_BASE_URL).replace("/api/v1", "");
        const newSocket = io(socketUrl);

        newSocket.emit("register_user", {
            userId: user._id,
        });
        const audio = new Audio("/assets/notification.mp3");
        newSocket.on("unread_message", () => {
            audio.play();
            incrementUnreadChatMessages();
        });

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [user?._id]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
