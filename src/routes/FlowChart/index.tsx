import React, { useEffect, useRef, useState } from 'react'
import { Card, Button, Space } from 'antd'
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import styles from './index.less'

interface FlowNode {
  id: string
  text: string
  color: string
  branches?: FlowNode[] // 分支节点
  next?: string // 下一个节点的ID（非分支情况）
}

const FlowChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // 流程节点数据
  const flowNodes: FlowNode[] = [
    {
      id: '1',
      text: '开始',
      color: '#1890ff',
      next: '2',
    },
    {
      id: '2',
      text: '处理中',
      color: '#52c41a',
      next: '3',
    },
    {
      id: '3',
      text: '审核',
      color: '#faad14',
      branches: [
        {
          id: '3-1',
          text: '审核通过',
          color: '#52c41a',
          next: '4',
        },
        {
          id: '3-2',
          text: '审核拒绝',
          color: '#f5222d',
          next: '5',
        },
      ],
    },
    {
      id: '4',
      text: '完成',
      color: '#13c2c2',
      next: '6',
    },
    {
      id: '5',
      text: '退回修改',
      color: '#eb2f96',
      next: '2',
    },
    {
      id: '6',
      text: '结束',
      color: '#722ed1',
    },
  ]

  // 缩放控制
  const handleZoom = (type: 'in' | 'out') => {
    setScale(prevScale => {
      const newScale = type === 'in' ? prevScale + 0.1 : prevScale - 0.1
      return Math.max(0.5, Math.min(2, newScale)) // 限制缩放范围在 0.5-2 倍之间
    })
  }

  // 绘制节点
  const drawNode = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    color: string
  ) => {
    ctx.save()
    ctx.scale(scale, scale)

    // 抗锯齿处理
    x = Math.round(x)
    y = Math.round(y)
    width = Math.round(width)
    height = Math.round(height)

    // 绘制阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 2

    // 绘制圆角矩形
    ctx.beginPath()
    ctx.roundRect(x, y, width, height, 8)
    ctx.fillStyle = color
    ctx.fill()

    // 绘制边框
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.lineWidth = 1
    ctx.stroke()

    // 优化文字渲染
    ctx.shadowColor = 'transparent'
    ctx.fillStyle = '#ffffff'
    ctx.font = `${16 * (1 / scale)}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // 使用 textBaseline 和 lineHeight 优化文字位置
    const textX = x + width / 2
    const textY = y + height / 2
    ctx.fillText(text, textX, textY)

    ctx.restore()
  }

  // 绘制曲线箭头
  const drawCurvedArrow = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    controlPointOffset = 50
  ) => {
    ctx.save()
    ctx.scale(scale, scale)

    // 抗锯齿处理
    startX = Math.round(startX)
    startY = Math.round(startY)
    endX = Math.round(endX)
    endY = Math.round(endY)

    const controlX1 = Math.round(startX + controlPointOffset)
    const controlX2 = Math.round(endX - controlPointOffset)

    // 设置线条样式
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // 绘制贝塞尔曲线
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.bezierCurveTo(controlX1, startY, controlX2, endY, endX, endY)

    // 优化线条渲染
    ctx.strokeStyle = '#666666'
    ctx.lineWidth = 2
    ctx.stroke()

    // 优化箭头渲染
    const arrowSize = 10
    const angle = Math.atan2(endY - startY, controlX2 - endX)

    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      Math.round(endX - arrowSize * Math.cos(angle - Math.PI / 6)),
      Math.round(endY - arrowSize * Math.sin(angle - Math.PI / 6))
    )
    ctx.lineTo(
      Math.round(endX - arrowSize * Math.cos(angle + Math.PI / 6)),
      Math.round(endY - arrowSize * Math.sin(angle + Math.PI / 6))
    )
    ctx.closePath()
    ctx.fillStyle = '#666666'
    ctx.fill()

    ctx.restore()
  }

  // 计算流程图总宽度的函数
  const calculateTotalWidth = () => {
    const nodeWidth = 120
    const nodeGap = 150
    let maxDepth = 0

    // 计算主流程的深度
    flowNodes.forEach((node, index) => {
      if (node.branches) {
        // 分支节点占用更多空间
        maxDepth = Math.max(maxDepth, index + 2)
      } else {
        maxDepth = Math.max(maxDepth, index + 1)
      }
    })

    return nodeWidth * maxDepth + nodeGap * (maxDepth - 1)
  }

  // 修改绘制流程图函数
  const drawFlowChart = (ctx: CanvasRenderingContext2D) => {
    const nodeWidth = 120
    const nodeHeight = 40
    const nodeGap = 150
    const branchGap = 80

    // 计算总宽度
    const totalWidth = calculateTotalWidth()

    // 计算起始X坐标使流程图居中
    const startX = (ctx.canvas.width / scale - totalWidth) / 2
    // 计算起始Y坐标使流程图居中
    const startY = ctx.canvas.height / (2 * scale)

    // 记录节点位置
    const nodePositions = new Map<string, { x: number; y: number }>()

    // 绘制主流程
    let currentX = startX
    flowNodes.forEach((node, index) => {
      const y = startY - nodeHeight / 2
      nodePositions.set(node.id, { x: currentX, y })

      drawNode(ctx, currentX, y, nodeWidth, nodeHeight, node.text, node.color)

      // 处理分支
      if (node.branches) {
        const branchStartX = currentX + nodeWidth
        const branchEndX = currentX + nodeWidth + nodeGap

        node.branches.forEach((branch, branchIndex) => {
          // 计算分支Y坐标，使分支在中心点上下对称
          const branchOffset = (branchIndex - (node.branches?.length || 1) / 2 + 0.5) * branchGap
          const branchY = y + branchOffset

          nodePositions.set(branch.id, { x: branchEndX, y: branchY })

          // 绘制分支节点
          drawNode(ctx, branchEndX, branchY, nodeWidth, nodeHeight, branch.text, branch.color)
          // 绘制连接线
          drawCurvedArrow(ctx, branchStartX, y + nodeHeight / 2, branchEndX, branchY + nodeHeight / 2)

          // 连接到下一个节点
          if (branch.next) {
            const nextPos = nodePositions.get(branch.next)
            if (nextPos) {
              drawCurvedArrow(
                ctx,
                branchEndX + nodeWidth,
                branchY + nodeHeight / 2,
                nextPos.x,
                nextPos.y + nodeHeight / 2
              )
            }
          }
        })
      }
      // 非分支节点的连接线
      else if (node.next) {
        const nextNode = flowNodes.find(n => n.id === node.next)
        if (nextNode) {
          drawCurvedArrow(
            ctx,
            currentX + nodeWidth,
            y + nodeHeight / 2,
            currentX + nodeWidth + nodeGap,
            y + nodeHeight / 2
          )
        }
      }

      currentX += nodeWidth + nodeGap
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 获取设备像素比
    const dpr = window.devicePixelRatio || 1
    // 设置基础画布尺寸
    // const baseWidth = 1500
    // const baseHeight = 600
    const baseWidth = window.innerWidth
    const baseHeight = window.innerHeight

    // 设置画布的实际渲染尺寸
    canvas.width = baseWidth * scale * dpr
    canvas.height = baseHeight * scale * dpr

    // 设置画布的显示尺寸
    canvas.style.width = `${baseWidth * scale}px`
    canvas.style.height = `${baseHeight * scale}px`

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 根据设备像素比缩放上下文
    ctx.scale(dpr, dpr)

    // 绘制流程图
    drawFlowChart(ctx)
  }, [scale])

  return (
    <div className={styles.container}>
      <Card title='带分支的流程图示例'>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          <Space>
            <Button icon={<ZoomOutOutlined />} onClick={() => handleZoom('out')} disabled={scale <= 0.5} />
            <span>{Math.round(scale * 100)}%</span>
            <Button icon={<ZoomInOutlined />} onClick={() => handleZoom('in')} disabled={scale >= 2} />
          </Space>
          <div className={styles.canvasContainer} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default FlowChart
