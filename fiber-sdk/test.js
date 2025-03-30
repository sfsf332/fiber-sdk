const acceptResult = await sdk.channel.acceptChannel({
  temporary_channel_id: result.temporary_channel_id,
  funding_amount: BigInt('0x1717918000'), // 62 CKB = 6200000000 shannon
  max_tlc_value_in_flight: BigInt('0x1717918000'),
  max_tlc_number_in_flight: BigInt(100),
  tlc_min_value: BigInt(1000),
  tlc_fee_proportional_millionths: BigInt(1000),
  tlc_expiry_delta: BigInt(900000)
}); 