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
exports.Client = void 0;
class Client {
    constructor(config) {
        this.endpoint = config.endpoint;
        this.timeout = config.timeout || 5000;
        this.id = 1;
    }
    call(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method,
                    params,
                    id: this.id++,
                }),
                signal: AbortSignal.timeout(this.timeout),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            if (data.error) {
                throw new Error(`[RPC Error ${data.error.code}] ${data.error.message}\nDetails: ${data.error.data}`);
            }
            return data.result;
        });
    }
    acceptChannel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.call("accept_channel", [
                {
                    temporary_channel_id: params.temporary_channel_id,
                    funding_amount: `0x${params.funding_amount.toString(16)}`,
                    max_tlc_value_in_flight: `0x${params.max_tlc_value_in_flight.toString(16)}`,
                    max_tlc_number_in_flight: `0x${params.max_tlc_number_in_flight.toString(16)}`,
                    tlc_min_value: `0x${params.tlc_min_value.toString(16)}`,
                    tlc_fee_proportional_millionths: `0x${params.tlc_fee_proportional_millionths.toString(16)}`,
                    tlc_expiry_delta: `0x${params.tlc_expiry_delta.toString(16)}`
                }
            ]);
            return response;
        });
    }
}
exports.Client = Client;
