import React, { useEffect } from 'react';
import { Button } from 'antd';

const Curry: React.FC = () => {
    // 函数柯里化，将add(1, 2)转为add(1)(2)形式
    // const add = (x: number) => {
    //     const sum = (y: number) => {
    //         x = x + y;
    //         console.log('x===',x);
    //         return sum;
    //     };
    //     console.log(x, sum);
    //     return sum;
    // };

    useEffect(() => {
        Promise._race = (promises: any[]) => {
            const a = new Promise((resolve, reject) => {
                promises.forEach(promise => {
                    promise.then(resolve, reject);
                });
            });
            return a;
        };
        // 通过定时器来控制那个状态率先改变
        let p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('success')
            }, 600)
        })
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('failed')
            }, 500)
        })

        const p = Promise._race([p1, p2])

        p.then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        convert(list);
    }, []);

    let list = [
        { id: 1, name: '部门A', parentId: 0 },
        { id: 2, name: '部门B', parentId: 0 },
        { id: 3, name: '部门C', parentId: 1 },
        { id: 4, name: '部门D', parentId: 1 },
        { id: 5, name: '部门E', parentId: 2 },
        { id: 6, name: '部门F', parentId: 3 },
        { id: 7, name: '部门G', parentId: 2 },
        { id: 8, name: '部门H', parentId: 4 }
    ];
    function convert(list) {
        const res = []
        // list转为map
        const map = list.reduce((res, v) => (res[v.id] = v, res), {})
        console.log('map===', map);
        for (const item of list) {
            if (item.parentId === 0) {
                res.push(item)
                continue
            }
            // in的右值必为对象，判断parentId是否在map的键值中（即判断parentId是否为某个值的id）
            if (item.parentId in map) {
                const parent = map[item.parentId] || {}
                parent.children = parent.children || []
                parent.children.push(item)
            }
        }
        return res
    }
    
    

    const add = (args) => {
        return args.reduce((a, b) => a + b);
    };
    const currying = (func) => {
        const args = [];
        const newFunc = (...rest) => {
            if (rest.length === 0) {
                return func(args);
            } else {
                args.push(...rest);
                return newFunc;
            }
        };
        return newFunc;
    };
    const sum = currying(add);




    return (
        <>
            <div
                onClick={() => {
                    sum(1, 2)(3)(4)();
                }}
            >
                函数柯里化
            </div>
            {/* <Button onClick={() => add(1)}>add(1)</Button>
            <Button onClick={() => add(1)(2)}>add(1)(2)</Button> */}
            {/* <Button onClick={() => add(1)(2)(3)}>add(1)(2)(3)</Button>
            <Button onClick={() => add(1)(2, 3)}>add(1)(2, 3)</Button>
            <Button onClick={() => add(1, 2)(3)}>add(1, 2)(3)</Button>
            <Button onClick={() => add(1, 2, 3)}>add(1, 2, 3)</Button> */}
        </>
    );
};

export default Curry;