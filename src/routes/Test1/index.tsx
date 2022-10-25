import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.less';

const Test1: React.FC<any> = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const getDom = document.getElementById('test1');
        // 只能获取这种不会变的样式名，其他编译后与style文件中不一致
        console.log('getDom test1===', getDom);
    }, []);

    return (
        <div className={styles.content} id="test1">
            <div onClick={() => { navigate('/test2'); }}>
                点击跳转到Test2
            </div>
        </div>
    );
};

export default memo(Test1);