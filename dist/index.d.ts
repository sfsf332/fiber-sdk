import { ChannelModule } from './modules/channel';
import { PaymentModule } from './modules/payment';
import { InvoiceModule } from './modules/invoice';
import { PeerModule } from './modules/peer';
import { InfoModule } from './modules/info';
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
