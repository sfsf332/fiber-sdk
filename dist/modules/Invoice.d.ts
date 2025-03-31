import { FiberClient } from '../core/client';
import { Hash256, CkbInvoice, CkbInvoiceStatus } from '../types';
export declare class InvoiceModule {
    private client;
    constructor(client: FiberClient);
    /**
     * 创建新发票
     */
    newInvoice(params: {
        amount: bigint;
        description?: string;
        currency: 'Fibb' | 'Fibt' | 'Fibd';
        payment_preimage: Hash256;
        expiry?: bigint;
        fallback_address?: string;
        final_expiry_delta?: bigint;
        udt_type_script?: any;
        hash_algorithm?: 'CkbHash' | 'Sha256';
    }): Promise<{
        invoice_address: string;
        invoice: CkbInvoice;
    }>;
    /**
     * 解析发票
     */
    parseInvoice(invoice: string): Promise<CkbInvoice>;
    /**
     * 获取发票
     */
    getInvoice(paymentHash: Hash256): Promise<CkbInvoiceStatus>;
    /**
     * 取消发票
     */
    cancelInvoice(paymentHash: Hash256): Promise<CkbInvoiceStatus>;
}
