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
    return 'OKX Wallet' as WalletName<string>;
  }

  get url(): string {
    return 'https://www.okx.com';
  }

  get icon(): string {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=';
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
