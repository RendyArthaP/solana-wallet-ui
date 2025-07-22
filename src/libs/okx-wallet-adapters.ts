import {
  Adapter,
  WalletAdapterNetwork,
  WalletError,
  WalletName,
  WalletReadyState,
} from '@solana/wallet-adapter-base';
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';

export class OKXWalletAdapter {
  name: WalletName = 'OKX' as WalletName;
  url = 'https://www.okx.com/web3';
  icon = 'https://static.okx.com/cdn/wallet/logo.png'; // bisa ganti
  readyState = WalletReadyState.Installed;

  get publicKey(): PublicKey | null {
    return this._publicKey || null;
  }

  get connected(): boolean {
    return !!this._publicKey;
  }

  private _publicKey: PublicKey | null = null;

  async connect(): Promise<void> {
    const provider = (window as any).okx?.solana;
    if (!provider) throw new Error('OKX Wallet not installed');
    const resp = await provider.connect();
    this._publicKey = new PublicKey(resp.publicKey);
  }

  async disconnect(): Promise<void> {
    const provider = (window as any).okx?.solana;
    if (!provider) return;
    await provider.disconnect();
    this._publicKey = null;
  }

  async signTransaction(
    tx: Transaction | VersionedTransaction
  ): Promise<Transaction | VersionedTransaction> {
    const provider = (window as any).okx?.solana;
    if (!provider) throw new Error('OKX Wallet not available');
    return await provider.signTransaction(tx);
  }

  async signAllTransactions(
    txs: (Transaction | VersionedTransaction)[]
  ): Promise<(Transaction | VersionedTransaction)[]> {
    const provider = (window as any).okx?.solana;
    if (!provider) throw new Error('OKX Wallet not available');
    return await provider.signAllTransactions(txs);
  }
}
