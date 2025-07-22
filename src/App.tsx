import React from 'react';
import './App.css';
import { SolanaWalletProvider } from './context/SolanaWalletProvider';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { useWallet } from '@solana/wallet-adapter-react';

function App() {
  const data = useWallet()

  return (
    <SolanaWalletProvider>
      <div className="App">
        <h1>Connect Solana Wallet</h1>
        <ConnectWalletButton />
      </div>
    </SolanaWalletProvider>
  );
}

export default App;
