  async acceptChannel(params: {
    temporary_channel_id: string;
    funding_amount: bigint;
    max_tlc_value_in_flight: bigint;
    max_tlc_number_in_flight: bigint;
    tlc_min_value: bigint;
    tlc_fee_proportional_millionths: bigint;
    tlc_expiry_delta: bigint;
  }): Promise<void> {
    const serializedParams = {
      temporary_channel_id: params.temporary_channel_id,
      funding_amount: Number(params.funding_amount),
      max_tlc_value_in_flight: Number(params.max_tlc_value_in_flight),
      max_tlc_number_in_flight: Number(params.max_tlc_number_in_flight),
      tlc_min_value: Number(params.tlc_min_value),
      tlc_fee_proportional_millionths: Number(params.tlc_fee_proportional_millionths),
      tlc_expiry_delta: Number(params.tlc_expiry_delta)
    };
    return this.client.call('accept_channel', serializedParams);
  } 