interface ClientConfig {
    endpoint: string;
    timeout?: number;
}
interface AcceptChannelParams {
    temporary_channel_id: string;
    funding_amount: bigint;
    max_tlc_value_in_flight: bigint;
    max_tlc_number_in_flight: bigint;
    tlc_min_value: bigint;
    tlc_fee_proportional_millionths: bigint;
    tlc_expiry_delta: bigint;
}
interface AcceptChannelResponse {
    channel_id: string;
}
export declare class Client {
    private endpoint;
    private timeout;
    private id;
    constructor(config: ClientConfig);
    call<T>(method: string, params: any[]): Promise<T>;
    acceptChannel(params: AcceptChannelParams): Promise<AcceptChannelResponse>;
}
export {};
