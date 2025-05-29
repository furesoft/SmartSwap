import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { saveGlobalsToBlob, loadGloalsFromBlob } from "@/store/globalsStore";
import Globals from "@/models/Globals";

interface GlobalsContextType {
  globals: Globals;
  setValue: (msg: Globals) => void;
}

const GlobalsContext = createContext<GlobalsContextType | undefined>(undefined);

export const useGlobals = () => {
  const ctx = useContext(GlobalsContext);
  if (!ctx) throw new Error("useGlobals must be used within GlobalsProvider");
  return ctx;
};

export const GlobalsProvider = ({ children }: { children: ReactNode }) => {
  const [globals, setGlobalsState] = useState<Globals>({ message: "" });

  useEffect(() => {
    loadGloalsFromBlob().then((msg) => {
      if (msg) setGlobalsState(msg);
      else setGlobalsState({ message: "" });
    });
  }, []);

  const setGlobals = async (msg: Globals) => {
    setGlobalsState(msg);
    await saveGlobalsToBlob(msg);
  };

  return (
    <GlobalsContext.Provider value={{ globals: globals, setValue: setGlobals }}>
      {children}
    </GlobalsContext.Provider>
  );
};
