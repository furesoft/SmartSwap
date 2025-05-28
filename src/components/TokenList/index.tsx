import React from "react";
import { Token } from "@/models/Token";
import { Skeleton } from "@worldcoin/mini-apps-ui-kit-react";

export interface TokenListProps {
  tokens: Token[];
  loading?: boolean;
  onTokenClick?: (token: Token) => void;
  filter?: (token: Token) => boolean;
}

export const TokenList: React.FC<TokenListProps> = ({ tokens, loading = false, onTokenClick, filter }) => {
  const filteredTokens = filter ? tokens.filter(filter) : tokens;
  return (
    <div className="flex flex-col gap-4 rounded-xl w-full p-4">
      <div className="max-h-96 overflow-y-auto">
        {loading && (
          <div className="cursor-pointer border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition flex flex-col gap-1">
            <Skeleton height={50} />
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
                <span className="font-semibold text-lg">{token.name}</span>
                {token.verified && <img src="/verified.png" alt="verified" style={{ height: 20 }} />}
              </div>
                {typeof token.balance === "number" && !isNaN(token.balance) && (
                    <div className="flex items-center justify-between mt-1">
                <span className="text-gray-700">Balance:</span>

                  <span className="font-mono">
                    {(token.balance / 10 ** token.decimals).toLocaleString(undefined, { maximumFractionDigits: 6 })} {token.symbol}
                  </span>
              </div> )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
