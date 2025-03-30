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
exports.PeerModule = void 0;
class PeerModule {
    constructor(client) {
        this.client = client;
    }
    /**
     * 连接到对等节点
     */
    connectPeer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('connect_peer', params);
        });
    }
    /**
     * 断开对等节点连接
     */
    disconnectPeer(peerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('disconnect_peer', [peerId]);
        });
    }
}
exports.PeerModule = PeerModule;
