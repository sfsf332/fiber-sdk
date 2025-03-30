import { FiberClient } from './core/Client';
import { ChannelModule } from './modules/Channel';
import { PaymentModule } from './modules/Payment';
import { InvoiceModule } from './modules/Invoice';
import { PeerModule } from './modules/Peer';
import { InfoModule } from './modules/Info';

export interface FiberSDKConfig {
  endpoint: string;
  timeout?: number;
}

export class FiberSDK {
  public channel: ChannelModule;
  public payment: PaymentModule;
  public invoice: InvoiceModule;
  public peer: PeerModule;
  public info: InfoModule;

  constructor(config: FiberSDKConfig) {
    const client = new FiberClient({
      baseURL: config.endpoint,
      timeout: config.timeout,
    });

    this.channel = new ChannelModule(client);
    this.payment = new PaymentModule(client);
    this.invoice = new InvoiceModule(client);
    this.peer = new PeerModule(client);
    this.info = new InfoModule(client);
  }
}