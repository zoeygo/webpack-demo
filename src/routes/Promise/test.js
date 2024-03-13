// @ts-nocheck
console.log('script start')
async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()
setTimeout(function () {
  console.log('setTimeout')
}, 0)
new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })
console.log('script end')
// script start，async2 end，Promise，script end，async1 end，promise1，promise2，setTimeout


async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('settimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
// script start，async1 start，async2，promise1，script end，async1 end，promise2，settimeout

         
console.log('1');
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

process.nextTick(function() {
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
// 分析过程：
// 1，遇到两个定时器放入异步队列 （作为新的宏任务），先打印 1 接着，
// new Promise 同步执行，打印 7 ，.then 为异步微任务放入队列 ，
// 在执行process.nextTick（微任务）6，接着打印 8 第一个宏任务完成  
// 2，定时器1，里面的执行顺序同上 一次打印 2,4,3,5
// 3，定时器2，同定时器1，打印 9,11,10,12
// 总的来说顺序就是 1，7,6,8，2,4,3，5，9,11,10,12

