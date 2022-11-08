import { Timeline } from 'antd';
import React, { memo } from 'react';

const { Item } = Timeline;

const Cabbage: React.FC = () => {
    return (
        <Timeline>
            <Item>1</Item>
            <Item>1</Item>
        </Timeline>
    );
};

export default memo(Cabbage);