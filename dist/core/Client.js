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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCError = exports.FiberClient = void 0;
const axios_1 = __importDefault(require("axios"));
class FiberClient {
    constructor(config) {
        this.client = axios_1.default.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    serializeBigInt(obj) {
        if (typeof obj === 'bigint') {
            const hex = obj.toString(16);
            return '0x' + hex;
        }
        if (typeof obj === 'number') {
            const hex = obj.toString(16);
            return '0x' + hex;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => this.serializeBigInt(item));
        }
        if (obj !== null && typeof obj === 'object') {
            const result = {};
            for (const key in obj) {
                if (key === 'peer_id') {
                    result[key] = obj[key];
                }
                else if (key === 'channel_id') {
                    result[key] = obj[key];
                }
                else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
                    result[key] = '0x' + obj[key].toString(16);
                }
                else {
                    result[key] = this.serializeBigInt(obj[key]);
                }
            }
            return result;
        }
        return obj;
    }
    call(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedParams = params ? this.serializeBigInt(params) : undefined;
            const payload = {
                jsonrpc: '2.0',
                method,
                params: serializedParams ? [serializedParams] : [],
                id: 1,
            };
            console.log('发送 RPC 请求:', JSON.stringify(payload, null, 2));
            const response = yield this.client.post('', payload);
            if (response.data.error) {
                throw new Error(`[RPC Error ${response.data.error.code}] ${response.data.error.message}${response.data.error.data ? '\nDetails: ' + response.data.error.data : ''}`);
            }
            return response.data.result;
        });
    }
}
exports.FiberClient = FiberClient;
class RPCError extends Error {
    constructor(error) {
        super(`[RPC Error ${error.code}] ${error.message}`);
        this.error = error;
    }
}
exports.RPCError = RPCError;
