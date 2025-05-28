import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { saveMessageToBlob, loadMessageFromBlob } from "@/store/messageStore";

interface MessageContextType {
  message: string;
  setMessage: (msg: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessage must be used within MessageProvider");
  return ctx;
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessageState] = useState("");

  useEffect(() => {
    loadMessageFromBlob().then((msg) => {
      if (msg) setMessageState(msg);
    });
  }, []);

  const setMessage = async (msg: string) => {
    setMessageState(msg);
    await saveMessageToBlob(msg);
  };

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

