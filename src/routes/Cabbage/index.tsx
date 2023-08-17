import { Timeline } from 'antd';
import React, { memo } from 'react';

const { Item } = Timeline;

const Cabbage: React.FC = () => {
    // 企图搭建自己知识库.jpg
    return (
        <Timeline>
            <Item>1</Item>
            <Item>1</Item>
        </Timeline>
    );
};

export default memo(Cabbage);