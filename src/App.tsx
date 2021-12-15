import React, { useState } from 'react';
import './App.css';
import { Badge, FloatingBubble, TabBar } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import Header from './components/Header';

const tabs = [
  {
    key: 'home',
    title: '首页',
    icon: <AppOutline />,
    badge: Badge.dot
  },
  {
    key: 'todo',
    title: '我的待办',
    icon: <UnorderedListOutline />,
    badge: '5'
  },
  {
    key: 'message',
    title: '我的消息',
    icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
    badge: '99+'
  },
  {
    key: 'personalCenter',
    title: '个人中心',
    icon: <UserOutline />
  }
];

function App() {
  const [activeKey, setActiveKey] = useState('todo');
  return (
    <div className='App' style={{ height: '120vh' }}>
      <Header />
      <FloatingBubble
        style={{
          '--initial-position-bottom': '68px',
          '--initial-position-right': '24px'
        }}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
      <TabBar
        activeKey={activeKey}
        onChange={setActiveKey}
        className='fixed bottom-0 inset-x-0'
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

export default App;
