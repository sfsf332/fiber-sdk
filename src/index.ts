import { FiberClient } from './core/client';
import { ChannelModule } from './modules/channel';
import { PaymentModule } from './modules/payment';
import { InvoiceModule } from './modules/invoice';
import { PeerModule } from './modules/peer';
import { InfoModule } from './modules/info';

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