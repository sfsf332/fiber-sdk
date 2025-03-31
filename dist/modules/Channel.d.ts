import { FiberClient } from '../core/client';
import { Hash256, Channel } from '../types';
export declare class ChannelModule {
    private client;
    constructor(client: FiberClient);
    /**
     * 打开通道
     */
    openChannel(params: {
        peer_id: string;
        funding_amount: bigint;
        public?: boolean;
        funding_udt_type_script?: any;
        shutdown_script?: any;
        commitment_delay_epoch?: bigint;
        commitment_fee_rate?: bigint;
        funding_fee_rate?: bigint;
        tlc_expiry_delta?: bigint;
        tlc_min_value?: bigint;
        tlc_fee_proportional_millionths?: bigint;
        max_tlc_value_in_flight?: bigint;
        max_tlc_number_in_flight?: bigint;
    }): Promise<Hash256>;
    /**
     * 接受通道
     */
    acceptChannel(params: {
        temporary_channel_id: string;
        funding_amount: bigint;
        max_tlc_value_in_flight: bigint;
        max_tlc_number_in_flight: bigint;
        tlc_min_value: bigint;
        tlc_fee_proportional_millionths: bigint;
        tlc_expiry_delta: bigint;
    }): Promise<void>;
    /**
     * 放弃通道
     */
    abandonChannel(channelId: Hash256): Promise<void>;
    /**
     * 列出所有通道
     */
    listChannels(params?: {
        peer_id?: string;
        include_closed?: boolean;
    }): Promise<Channel[]>;
    /**
     * 关闭通道
     */
    shutdownChannel(params: {
        channel_id: Hash256;
        close_script: any;
        force?: boolean;
        fee_rate: bigint;
    }): Promise<void>;
    /**
     * 更新通道
     */
    updateChannel(params: {
        channel_id: Hash256;
        enabled?: boolean;
        tlc_expiry_delta?: bigint;
        tlc_minimum_value?: bigint;
        tlc_fee_proportional_millionths?: bigint;
    }): Promise<void>;
}
