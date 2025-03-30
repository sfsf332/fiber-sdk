"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
class PaymentModule {
    constructor(client) {
        this.client = client;
    }
    /**
     * 发送支付
     */
    sendPayment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('payment.send_payment', params);
        });
    }
    /**
     * 获取支付状态
     */
    getPayment(paymentHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('payment.get_payment', { payment_hash: paymentHash });
        });
    }
}
exports.PaymentModule = PaymentModule;
