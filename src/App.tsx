import React from 'react';
import './App.css';
import { SolanaWalletProvider } from './context/SolanaWalletProvider';
import { ConnectWalletButton } from './components/ConnectWalletButton';

function App() {

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
