import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, List, Space, Typography, Badge } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const WebSocketDemo: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const HEARTBEAT_INTERVAL = 3000; // 心跳间隔 3 秒
  const RECONNECT_INTERVAL = 5000; // 重连间隔 5 秒
  const WS_URL = 'ws://echo.websocket.org'; // WebSocket 服务器地址

  const connect = () => {
    try {
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        setConnected(true);
        setMessages(prev => [...prev, '连接成功']);
        startHeartbeat();
      };

      wsRef.current.onclose = () => {
        setConnected(false);
        setMessages(prev => [...prev, '连接断开']);
        stopHeartbeat();
        startReconnect();
      };

      wsRef.current.onerror = (error) => {
        setMessages(prev => [...prev, `连接错误: ${error}`]);
        setConnected(false);
      };

      wsRef.current.onmessage = (event) => {
        setMessages(prev => [...prev, `收到消息: ${event.data}`]);
      };
    } catch (error) {
      console.error('WebSocket 连接失败:', error);
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    stopHeartbeat();
    stopReconnect();
  };

  const startHeartbeat = () => {
    stopHeartbeat();
    heartbeatTimerRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send('ping');
        setMessages(prev => [...prev, '发送心跳: ping']);
      }
    }, HEARTBEAT_INTERVAL);
  };

  const stopHeartbeat = () => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  };

  const startReconnect = () => {
    stopReconnect();
    reconnectTimerRef.current = setInterval(() => {
      if (!connected) {
        setMessages(prev => [...prev, '尝试重新连接...']);
        connect();
      }
    }, RECONNECT_INTERVAL);
  };

  const stopReconnect = () => {
    if (reconnectTimerRef.current) {
      clearInterval(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>WebSocket 心跳检测</Title>

        <Card>
          <Space>
            <Badge status={connected ? 'success' : 'error'} text={connected ? '已连接' : '未连接'} />
            <Button type="primary" onClick={connect} disabled={connected}>
              连接
            </Button>
            <Button danger onClick={disconnect} disabled={!connected}>
              断开
            </Button>
            <HeartTwoTone 
              twoToneColor={connected ? "#52c41a" : "#ff4d4f"}
              style={{ fontSize: '24px' }}
            />
          </Space>
        </Card>

        <Card title="消息记录">
          <List
            dataSource={messages}
            renderItem={(msg, index) => (
              <List.Item>
                <Text>{`[${index + 1}] ${msg}`}</Text>
              </List.Item>
            )}
            style={{ maxHeight: '400px', overflow: 'auto' }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default WebSocketDemo; 