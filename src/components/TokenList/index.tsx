import React from "react";
import {Token} from "@/models/Token";
import {GridLoader} from "react-spinners";
import { CircularIcon } from "@worldcoin/mini-apps-ui-kit-react";
import {Sphere} from "iconoir-react";

export interface TokenListProps {
    tokens: Token[];
    loading?: boolean;
    onTokenClick?: (token: Token) => void;
    filter?: (token: Token) => boolean;
    onEditToken?: (token: Token) => void;
}

export const TokenList: React.FC<TokenListProps> = ({tokens, loading = false, onTokenClick, filter, onEditToken}) => {
    const filteredTokens = filter ? tokens.filter(filter) : tokens;
    return (
        <div className="flex flex-col gap-4 rounded-xl w-full p-4">
            <div className="max-h-96 overflow-y-auto">
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <GridLoader/>
                    </div>
                )}
                {!loading && filteredTokens.length === 0 && <span>No Tokens found</span>}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {filteredTokens.map((token) => (
                        <li
                            key={token.name}
                            onClick={() => onTokenClick?.(token)}
                            className="cursor-pointer border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                                    <CircularIcon
                                        className="bg-gray-200"
                                        size="xs"
                                    >
                                        {token.iconUrl ? <img src={token.iconUrl} alt={token.name} width={15} /> : <Sphere />}
                                    </CircularIcon>
                                    <span className="font-semibold text-lg truncate">{token.name}</span>
                                </div>
                                {token.verified && <img src="/verified.png" alt="verified" style={{height: 20}}/>}
                                {onEditToken && (
                                    <button
                                        className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                        onClick={e => { e.stopPropagation(); onEditToken(token); }}
                                    >
                                        Bearbeiten
                                    </button>
                                )}
                            </div>
                            {typeof token.balance === "number" && !isNaN(token.balance) && (
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-gray-700">Balance:</span>

                                    <span className="font-mono">
                    {(token.balance / 10 ** token.decimals).toLocaleString(undefined, {maximumFractionDigits: 6})} {token.symbol}
                  </span>
                                </div>)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
