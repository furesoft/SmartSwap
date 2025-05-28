import { ethers } from "ethers";
import { worldchain } from 'viem/chains';
import { Token } from "@/models/Token";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

export async function getTokenInfoForAddress(tokenAddress: string): Promise<Token> {
  if (!ethers.isAddress(tokenAddress)) {
    throw new Error("Invalid Token-Address");
  }

  const provider = new ethers.JsonRpcProvider(worldchain.rpcUrls.default.http[0]);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [name, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
  ]);

  return {
    name,
    symbol,
    decimals: Number(decimals),
    contract: tokenAddress
  } as Token;
}

