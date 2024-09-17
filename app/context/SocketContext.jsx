"use client";

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
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {};

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
