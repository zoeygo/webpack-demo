import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const Test1 = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.content} id={styles.test1}>
            <div onClick={() => { navigate('/test2'); }}>
                点击跳转到Test2
            </div>
        </div>
    );
};

export default Test1;