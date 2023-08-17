import React, { memo, useEffect } from 'react';
import MyPromise from './promise';

const Test2: React.FC<any> = () => {
    useEffect(() => {
        const promise1 = new MyPromise((resolve) => {
            setTimeout(function p1() {
                resolve('request1 success');
            }, 1000);
        });
        promise1.then(function p1(value) {
            console.log('promise1.then-value===', value);
        });

        const promise2 = new MyPromise((resolve, reject) => {
            setTimeout(function p2() {
                reject('request2 failed');
            }, 2000);
        });
        promise2.then(function p2f(value) {
            console.log('promise2.then-value===', value);
        }, function p2r(reason) {
            console.log('promise2.then-reason===', reason);
        });
    }, []);
    return (
        <div>
            手写promise测试
        </div>
    );
};

export default memo(Test2);