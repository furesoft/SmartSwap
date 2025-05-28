import React, {createContext, useContext, useState} from 'react';
import {Token} from "@/models/Token";

export interface TokenContextType {
    token: Token;
    setToken: (token: Token) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<any>(null);
    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export function useToken() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
}

