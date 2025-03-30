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
exports.InvoiceModule = void 0;
class InvoiceModule {
    constructor(client) {
        this.client = client;
    }
    /**
     * 创建新发票
     */
    newInvoice(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('invoice.new_invoice', params);
        });
    }
    /**
     * 解析发票
     */
    parseInvoice(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('invoice.parse_invoice', { invoice });
        });
    }
    /**
     * 获取发票
     */
    getInvoice(paymentHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('invoice.get_invoice', { payment_hash: paymentHash });
        });
    }
    /**
     * 取消发票
     */
    cancelInvoice(paymentHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('invoice.cancel_invoice', { payment_hash: paymentHash });
        });
    }
}
exports.InvoiceModule = InvoiceModule;
