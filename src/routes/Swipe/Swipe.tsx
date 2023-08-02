import React, { useMemo } from 'react';

interface SwipeProps {

}

const Swipe: React.FC<SwipeProps> = (props) => {
    const {
        initIndex = 0, // 默认索引
        vertical = false, // 是否纵向
        duration = 500, // 切换动画时间
        autoplay = 3000, // 自动播放间隔
        touchable = true, // 是否支持手势滑动
        loop = true, // 是否无缝轮播
        showDots = true, // 是否显示dots
        onSlideChange,
    } = props;

    // 计算SwipeItem个数
    const count = useMemo(() =>React.Children.count(props.children), [props.children]);
    return <>测试</>;
};
export default Swipe;