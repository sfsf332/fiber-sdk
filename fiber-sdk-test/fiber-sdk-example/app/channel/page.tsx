'use client';

import { useEffect, useState } from 'react';
import { FiberSDK } from 'fiber-sdk';
import { Channel } from 'fiber-sdk/dist/core/types';

export default function ChannelPage() {
  const [sdk, setSdk] = useState<FiberSDK | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 初始化 SDK
    const fiberSDK = new FiberSDK({
      endpoint: 'http://127.0.0.1:8227',
      timeout: 5000
    });
    setSdk(fiberSDK);
  }, []);

  const fetchChannels = async () => {
    if (!sdk) return;
    
    try {
      setLoading(true);
      setError(null);
      const channelList = await sdk.channel.listChannels();
      setChannels(channelList);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取通道列表失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">通道管理</h1>
      
      <div className="mb-6">
        <button
          onClick={fetchChannels}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? '加载中...' : '获取通道列表'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {channels.length > 0 ? (
        <div className="grid gap-4">
          {channels.map((channel) => (
            <div key={channel.channel_id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">通道详情</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">通道ID:</span>
                  <span className="ml-2">{channel.channel_id}</span>
                </div>
                <div>
                  <span className="font-medium">状态:</span>
                  <span className="ml-2">{channel.state}</span>
                </div>
                <div>
                  <span className="font-medium">对等节点ID:</span>
                  <span className="ml-2">{channel.peer_id}</span>
                </div>
                <div>
                  <span className="font-medium">本地余额:</span>
                  <span className="ml-2">{channel.local_balance.toString()}</span>
                </div>
                <div>
                  <span className="font-medium">远程余额:</span>
                  <span className="ml-2">{channel.remote_balance.toString()}</span>
                </div>
                <div>
                  <span className="font-medium">创建时间:</span>
                  <span className="ml-2">{new Date(Number(channel.created_at) * 1000).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">
          {loading ? '正在加载通道列表...' : '暂无通道数据'}
        </div>
      )}
    </div>
  );
} 