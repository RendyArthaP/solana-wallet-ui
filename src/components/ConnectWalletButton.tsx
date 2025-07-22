import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export const ConnectWalletButton = () => {
  const { publicKey } = useWallet();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <WalletMultiButton />
      {publicKey && (
        <div style={{ marginTop: 10 }}>
          Connected: {publicKey.toBase58()}
        </div>
      )}
    </div>
  );
};
