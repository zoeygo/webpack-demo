import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import HOC from '../index'
import DocList from './DocList'
import TagList from './TagList'
import WriteDoc from './WriteDoc'
import WriteTag from './WriteTag'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'DocList',
    children: <DocList />,
  },
  {
    key: '2',
    label: 'TagList',
    children: <TagList />,
  },
  {
    key: '3',
    label: 'WriteDoc',
    children: <WriteDoc />,
  },
  {
    key: '4',
    label: 'WriteTag',
    children: <WriteTag />,
  },
]

const App: React.FC = () => (
  <HOC>
    <Tabs defaultActiveKey='1' items={items} />
  </HOC>
)

export default App
