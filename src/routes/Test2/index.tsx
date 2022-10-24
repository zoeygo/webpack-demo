import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const Test2 = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div onClick={() => { navigate('/test1'); }}>
                点击跳转到Test1
            </div>
        </div>
    );
};

export default Test2;