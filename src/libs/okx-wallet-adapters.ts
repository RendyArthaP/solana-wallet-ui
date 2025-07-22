import {
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';

import {
  BaseMessageSignerWalletAdapter,
  WalletName,
  WalletReadyState,
  WalletError,
} from '@solana/wallet-adapter-base';
import { PublicKey, } from '@solana/web3.js';

export class OKXWalletAdapter extends BaseMessageSignerWalletAdapter {
  private _wallet: any; // OKX wallet object
  private _connecting: boolean;

  constructor() {
    super();
    this._wallet = (window as any)?.okxwallet?.solana;
    this._connecting = false;
  }

  get name(): WalletName<string> {
    return 'OKX' as WalletName<string>;
  }

  get url(): string {
    return 'https://www.okx.com';
  }

  get icon(): string {
    return 'https://static.okx.com/cdn/assets/imgs/221/61E3F1B2C6406.png';
  }

  get readyState(): WalletReadyState {
    return this._wallet ? WalletReadyState.Installed : WalletReadyState.NotDetected;
  }

  get publicKey(): PublicKey | null {
    return this._wallet?.publicKey || null;
  }

  get connecting(): boolean {
    return this._connecting;
  }

  get supportedTransactionVersions(): Set<'legacy'> {
    return new Set<'legacy'>(['legacy']);
  }

  async connect(): Promise<void> {
  this._connecting = true;
  try {
    await this._wallet.connect();

    if (this.publicKey) {
      this.emit('connect', this.publicKey);
    } else {
      throw new Error('Wallet connected but publicKey is null');
    }
  } catch (error) {
    this.emit('error', error as WalletError);
    throw error;
  } finally {
    this._connecting = false;
  }
}


  async disconnect(): Promise<void> {
    await this._wallet.disconnect();
    this.emit('disconnect');
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
  return await this._wallet.signTransaction(transaction) as T;
}

async signAllTransactions<T extends Transaction | VersionedTransaction>(
  transactions: T[]
): Promise<T[]> {
  return await this._wallet.signAllTransactions(transactions) as T[];
}


  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    return await this._wallet.signMessage(message);
  }
}
