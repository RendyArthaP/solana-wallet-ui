// useOKXWallet.ts
import { useWallet } from '@solana/wallet-adapter-react';

export const useOKXWallet = () => {
  const { wallet, publicKey, connected, disconnect } = useWallet();

  return {
    isOKX: wallet?.adapter.name === 'OKX Wallet',
    publicKey,
    connected,
    disconnect,
  };
};
