import React from 'react';
import { useNavigate } from 'react-router-dom';

// const styles = require('./index.less');
import styles from './index.less';

const Test1 = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div onClick={() => { navigate('/test2'); }}>
                点击跳转到Test2
            </div>
        </div>
    );
};

export default Test1;