export interface FiberClientConfig {
    baseURL: string;
    timeout?: number;
}
export declare class FiberClient {
    private client;
    constructor(config: FiberClientConfig);
    private serializeBigInt;
    call<T = any>(method: string, params?: any): Promise<T>;
}
export declare class RPCError extends Error {
    error: {
        code: number;
        message: string;
        data?: any;
    };
    constructor(error: {
        code: number;
        message: string;
        data?: any;
    });
}
