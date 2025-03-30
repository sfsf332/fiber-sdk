const { FiberSDK } = require('./dist/index.js');

async function testNodeInfo() {
  try {
    // 初始化 SDK，使用配置文件中指定的端口
    const sdk = new FiberSDK({
      endpoint: 'http://127.0.0.1:8227',  // 与配置文件中的 rpc.listening_addr 一致
      timeout: 5000
    });

    console.log('开始测试节点信息查询...\n');

    // 测试获取节点基本信息
    console.log('获取节点基本信息:');
    const nodeInfo = await sdk.info.nodeInfo();
    console.log('版本号:', nodeInfo.version);
    console.log('提交哈希:', nodeInfo.commit_hash);
    console.log('节点名称:', nodeInfo.node_name);
    console.log('节点地址:', nodeInfo.addresses);
    console.log('节点ID:', nodeInfo.node_id);
    console.log('链哈希:', nodeInfo.chain_hash);
    console.log('最小接受开放通道资金金额:', nodeInfo.open_channel_auto_accept_min_ckb_funding_amount);
    console.log('自动接受通道资金金额:', nodeInfo.auto_accept_channel_ckb_funding_amount);
    console.log('默认资金锁定脚本:', nodeInfo.default_funding_lock_script);
    console.log('TLC过期增量:', nodeInfo.tlc_expiry_delta);
    console.log('TLC最小值:', nodeInfo.tlc_min_value);
    console.log('TLC最大值:', nodeInfo.tlc_max_value);
    console.log('TLC费用比例(百万分之):', nodeInfo.tlc_fee_proportional_millionths);
    console.log('通道数量:', nodeInfo.channel_count);
    console.log('待处理通道数量:', nodeInfo.pending_channel_count);
    console.log('对等节点数量:', nodeInfo.peers_count);
    console.log('UDT配置信息:', nodeInfo.udt_cfg_infos);

    console.log('\n测试完成！');
  } catch (error) {
    console.error('测试过程中发生错误:', error.message);
  }
}

async function testChannelManagement() {
  console.log('开始测试通道管理...\n');

  try {
    // 初始化 SDK
    const sdk = new FiberSDK({
      endpoint: 'http://127.0.0.1:8227',
      timeout: 5000
    });

    // 获取节点信息
    const nodeInfo = await sdk.info.nodeInfo();

    // 获取通道列表
    console.log('获取通道列表:');
    const result = await sdk.channel.listChannels();
    console.log('当前通道数量:', result.channels.length);
    if (result.channels.length > 0) {
      console.log('\n通道详情:');
      result.channels.forEach((channel, index) => {
        console.log(`\n通道 ${index + 1}:`);
        console.log('通道ID:', channel.channel_id);
        console.log('状态:', channel.state);
        console.log('对等节点ID:', channel.peer_id);
        console.log('本地余额:', channel.local_balance.toString());
        console.log('远程余额:', channel.remote_balance.toString());
        console.log('创建时间:', new Date(Number(channel.created_at) * 1000).toLocaleString());
      });
    }

    // 检查节点状态
    // const status = await sdk.info.nodeStatus();
    // console.log("连接状态:", status);

    // 列出当前连接的节点
    const channels = await sdk.channel.listChannels();
    console.log("当前通道:", channels);

    // 尝试打开新通道
    console.log('尝试打开新通道:');
    
    // 先连接对等节点
    const peerAddress = '/ip4/18.162.235.225/tcp/8119/p2p/QmXen3eUHhywmutEzydCsW4hXBoeVmdET2FJvMX69XJ1Eo';
    const targetPeerId = 'QmXen3eUHhywmutEzydCsW4hXBoeVmdET2FJvMX69XJ1Eo';
    
    try {
      // 先检查节点状态
      // const status = await sdk.info.nodeStatus();
      // console.log('当前节点状态:', status);

      // 检查现有连接
      const existingChannels = await sdk.channel.listChannels();
      console.log('现有通道:', existingChannels);

      // 尝试连接对等节点
      console.log('正在连接到对等节点:', peerAddress);
      await sdk.peer.connectPeer({
        address: peerAddress,
        save: true
      });
      console.log('成功连接到对等节点:', peerAddress);
      
      // 等待更长时间确保连接完全建立
      console.log('等待连接稳定...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // // 再次检查节点状态
      // const newStatus = await sdk.info.nodeStatus();
      // console.log('连接后的节点状态:', newStatus);

      // 检查连接是否成功
      const updatedChannels = await sdk.channel.listChannels();
      console.log('连接后的通道列表:', updatedChannels);
      
      const openChannelParams = {
        peer_id: targetPeerId,
        funding_amount: BigInt('0x1717918000'), // 62 CKB = 6200000000 shannon
        public: true,
        commitment_delay_epoch: BigInt('0x54'), // 84 epochs
        commitment_fee_rate: BigInt('0x3e8'),
        funding_fee_rate: BigInt('0x3e8'),
        tlc_expiry_delta: BigInt(900000),
        tlc_min_value: BigInt('0x3e8'),
        tlc_fee_proportional_millionths: BigInt('0x3e8'),
        max_tlc_value_in_flight: BigInt('0x1717918000'),
        max_tlc_number_in_flight: BigInt('0x64')
      };
      
      // console.log('准备打开通道，参数:', openChannelParams);
      
      try {
        const result = await sdk.channel.openChannel(openChannelParams);
        console.log('成功打开通道，临时通道ID:', result.temporary_channel_id);

        // 测试接受通道
        console.log('\n尝试接受通道:', result.temporary_channel_id);
        try {
          const acceptResult = await sdk.channel.acceptChannel({
            temporary_channel_id: result.temporary_channel_id,
            funding_amount: BigInt("390000000000"),
            max_tlc_value_in_flight: BigInt("390000000000"),
            max_tlc_number_in_flight: BigInt("100"),
            tlc_min_value: BigInt("1000"),
            tlc_fee_proportional_millionths: BigInt("1000"),
            tlc_expiry_delta: BigInt("900000")
          });
          console.log('通道接受成功，最终通道ID:', acceptResult.channel_id);

          // 测试关闭通道
          console.log('\n尝试关闭通道:', acceptResult.channel_id);
          try {
            await sdk.channel.shutdownChannel({
              channel_id: acceptResult.channel_id,
              close_script: null, // 使用默认的关闭脚本
              force: false,
              fee_rate: BigInt(1000)
            });
            console.log('通道关闭成功');

            // 测试更新通道参数
            console.log('\n尝试更新通道参数:', acceptResult.channel_id);
            try {
              await sdk.channel.updateChannel({
                channel_id: acceptResult.channel_id,
                enabled: true,
                tlc_expiry_delta: BigInt(200),
                tlc_minimum_value: BigInt(200000000), // 0.2 CKB
                tlc_fee_proportional_millionths: BigInt(200)
              });
              console.log('通道参数更新成功');
            } catch (error) {
              console.log('更新通道参数失败:', error.message);
            }

            // 测试放弃通道
            console.log('\n尝试放弃通道:', acceptResult.channel_id);
            try {
              await sdk.channel.abandonChannel(acceptResult.channel_id);
              console.log('通道放弃成功');
            } catch (error) {
              console.log('放弃通道失败:', error.message);
            }
          } catch (error) {
            console.log('关闭通道失败:', error.message);
          }
        } catch (error) {
          console.log('接受通道失败:', error.message);
        }
      } catch (error) {
        console.log('打开通道失败:', error.message);
      }
    } catch (error) {
      console.log('连接对等节点失败:', error.message);
    }
  } catch (error) {
    console.error('测试过程中出错:', error.message);
  }

  console.log('\n通道管理测试完成！');
}

async function testPeerManagement() {
  console.log('开始测试对等节点管理...\n');

  try {
    // 初始化 SDK
    const sdk = new FiberSDK({
      endpoint: 'http://127.0.0.1:8227',
      timeout: 5000
    });

    // 测试连接对等节点
    console.log('尝试连接对等节点:');
    const peerAddress = "/ip4/18.162.235.225/tcp/8119/p2p/QmXen3eUHhywmutEzydCsW4hXBoeVmdET2FJvMX69XJ1Eo";
    const peerId = 'QmXen3eUHhywmutEzydCsW4hXBoeVmdET2FJvMX69XJ1Eo';
    try {
      await sdk.peer.connectPeer({
        address: peerAddress,
        save: true
      });
      console.log('成功连接到对等节点:', peerAddress);
    } catch (error) {
      console.log('连接对等节点失败:', error.message);
    }

    // 测试断开对等节点连接
    console.log('\n尝试断开对等节点连接:');
    try {
      await sdk.peer.disconnectPeer(peerId);
      console.log('成功断开对等节点连接:', peerId);
    } catch (error) {
      console.log('断开对等节点连接失败:', error.message);
    }
  } catch (error) {
    console.error('测试过程中出错:', error.message);
  }

  console.log('\n对等节点管理测试完成！');
}

// 运行测试
testNodeInfo();
testChannelManagement();
testPeerManagement(); 