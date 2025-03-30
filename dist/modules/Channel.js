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
exports.ChannelModule = void 0;
class ChannelModule {
    constructor(client) {
        this.client = client;
    }
    /**
     * 打开通道
     */
    openChannel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('open_channel', params);
        });
    }
    /**
     * 接受通道
     */
    acceptChannel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedParams = {
                temporary_channel_id: params.temporary_channel_id,
                funding_amount: params.funding_amount,
                max_tlc_value_in_flight: params.max_tlc_value_in_flight,
                max_tlc_number_in_flight: params.max_tlc_number_in_flight,
                tlc_min_value: params.tlc_min_value,
                tlc_fee_proportional_millionths: params.tlc_fee_proportional_millionths,
                tlc_expiry_delta: params.tlc_expiry_delta
            };
            return this.client.call('accept_channel', serializedParams);
        });
    }
    /**
     * 放弃通道
     */
    abandonChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('abandon_channel', { channel_id: channelId });
        });
    }
    /**
     * 列出所有通道
     */
    listChannels(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('list_channels', params || {});
        });
    }
    /**
     * 关闭通道
     */
    shutdownChannel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('shutdown_channel', params);
        });
    }
    /**
     * 更新通道
     */
    updateChannel(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call('update_channel', params);
        });
    }
}
exports.ChannelModule = ChannelModule;
