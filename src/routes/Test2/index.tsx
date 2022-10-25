import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const Test2: React.FC<any> = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div onClick={() => { navigate('/test1'); }}>
                点击跳转到Test1
            </div>
        </div>
    );
};

export default memo(Test2);