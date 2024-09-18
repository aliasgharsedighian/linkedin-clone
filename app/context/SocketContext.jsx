"use client";

import { useAppStore } from "@/store/store";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (true) {
      socket.current = io(process.env.SERVER_ADDRESS, {
        // withCredentials: true,
        query: { userId },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket servers");
      });

      const handleRecieveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();

        console.log(message);

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message rcv", message);
          console.log("test");
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
