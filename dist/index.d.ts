import { ChannelModule } from './modules/Channel';
import { PaymentModule } from './modules/Payment';
import { InvoiceModule } from './modules/Invoice';
import { PeerModule } from './modules/Peer';
import { InfoModule } from './modules/Info';
export interface FiberSDKConfig {
    endpoint: string;
    timeout?: number;
}
export declare class FiberSDK {
    channel: ChannelModule;
    payment: PaymentModule;
    invoice: InvoiceModule;
    peer: PeerModule;
    info: InfoModule;
    constructor(config: FiberSDKConfig);
}
