"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiberSDK = void 0;
const client_1 = require("./core/client");
const channel_1 = require("./modules/channel");
const payment_1 = require("./modules/payment");
const invoice_1 = require("./modules/invoice");
const peer_1 = require("./modules/peer");
const info_1 = require("./modules/info");
class FiberSDK {
    constructor(config) {
        const client = new client_1.FiberClient({
            baseURL: config.endpoint,
            timeout: config.timeout,
        });
        this.channel = new channel_1.ChannelModule(client);
        this.payment = new payment_1.PaymentModule(client);
        this.invoice = new invoice_1.InvoiceModule(client);
        this.peer = new peer_1.PeerModule(client);
        this.info = new info_1.InfoModule(client);
    }
}
exports.FiberSDK = FiberSDK;
