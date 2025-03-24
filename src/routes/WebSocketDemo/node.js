// 1.创建后端服务：npm install ws
// 2.创建node index.js文件，引入WebSocket服务器。命令行执行该文件
// 3.启动成功
// 4.前端代码检测websocket心跳
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3200 })

console.log('服务运行在http://localhost:3200/')

wss.on('connection', ws => {
  // 服务器端打印
  console.log('[服务器]：连接成功')
  // 给客户端发送消息
  ws.send(`[websocket云端]您已经连接云端!数据推送中!`)
  let index = 1
  const interval = setInterval(() => {
    ws.send(`[websocket]数据推送第${index}次`)
    index++
  }, 1000 * 10)

  ws.on('close', () => {
    clearInterval(interval) // 清除定时器
    // 服务器端打印
    console.log('[服务器]：断开连接')
  })
})
