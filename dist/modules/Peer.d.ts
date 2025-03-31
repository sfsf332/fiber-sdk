import { FiberClient } from '../core/client';
export declare class PeerModule {
    private client;
    constructor(client: FiberClient);
    /**
     * 连接到对等节点
     */
    connectPeer(params: {
        address: string;
        save?: boolean;
    }): Promise<void>;
    /**
     * 断开对等节点连接
     */
    disconnectPeer(peerId: string): Promise<void>;
}
