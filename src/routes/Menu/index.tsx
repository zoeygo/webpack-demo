import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const Test1: React.FC<any> = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['menu-content']}>
            <div>菜单</div>
            <div onClick={() => { navigate('/quickReply'); }}>
                快捷回复
            </div>
            <div onClick={() => { navigate('/swipe'); }}>
                无缝轮播
            </div>
            <div onClick={() => { navigate('/curry'); }}>
                函数柯里化
            </div>
            <div onClick={() => { navigate('/promise'); }}>
                手写promise
            </div>
        </div>
    );
};

export default memo(Test1);