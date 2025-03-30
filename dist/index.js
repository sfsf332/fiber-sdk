"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiberSDK = void 0;
const Client_1 = require("./core/Client");
const Channel_1 = require("./modules/Channel");
const Payment_1 = require("./modules/Payment");
const Invoice_1 = require("./modules/Invoice");
const Peer_1 = require("./modules/Peer");
const Info_1 = require("./modules/Info");
class FiberSDK {
    constructor(config) {
        const client = new Client_1.FiberClient({
            baseURL: config.endpoint,
            timeout: config.timeout,
        });
        this.channel = new Channel_1.ChannelModule(client);
        this.payment = new Payment_1.PaymentModule(client);
        this.invoice = new Invoice_1.InvoiceModule(client);
        this.peer = new Peer_1.PeerModule(client);
        this.info = new Info_1.InfoModule(client);
    }
}
exports.FiberSDK = FiberSDK;
