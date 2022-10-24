import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';

const Test1 = () => {
    const navigate = useNavigate();

    return (
        <div className="content">
            <div onClick={() => { navigate('/test2'); }}>
                点击跳转到Test2
            </div>
        </div>
    );
};

export default Test1;