import React, { useEffect, useRef } from 'react'
import { Graph } from '@antv/g6'

const FlowChart = () => {
  const containerRef = useRef(null)
  const graphRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 初始化图实例
    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.clientWidth,
      height: 600,
      // 开启画布自动重绘
      autoPaint: true,
      // 交互模式配置
      modes: {
        default: [
          'drag-canvas', // 拖拽画布
          'zoom-canvas', // 缩放画布
          'drag-node', // 拖拽节点
          'click-select', // 点击选中
        ],
      },
      // 节点默认配置
      node: {
        type: 'rect', // 矩形节点
        style: {
          fill: '#f9f9f9',
          stroke: '#666',
          lineWidth: 1,
          radius: 4, // 圆角
        },
        labelCfg: {
          style: {
            fill: '#333',
            fontSize: 12,
          },
        },
      },
      // 边默认配置
      edge: {
        type: 'polyline', // 折线
        style: {
          stroke: '#aaa',
          lineWidth: 1,
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#aaa',
          },
        },
        labelCfg: {
          autoRotate: true,
          style: {
            fill: '#666',
            background: {
              fill: '#fff',
              stroke: '#fff',
              padding: [2, 4, 2, 4],
              radius: 2,
            },
          },
        },
      },
      // 布局配置
      layout: {
        type: 'dagre',
        rankdir: 'LR', // 从左到右布局
        nodesep: 30, // 节点间距
        ranksep: 50, // 层级间距
      },
    })

    graphRef.current = graph

    // 示例数据
    const data = {
      nodes: [
        { id: 'start', label: '开始', type: 'circle', size: 40, style: { fill: '#f6ffed', stroke: '#b7eb8f' } },
        { id: 'process1', label: '流程1' },
        { id: 'process2', label: '流程2' },
        {
          id: 'decision',
          label: '判断',
          type: 'diamond',
          size: [80, 40],
          style: { fill: '#fff1f0', stroke: '#ffa39e' },
        },
        { id: 'process3', label: '流程3' },
        { id: 'end', label: '结束', type: 'circle', size: 40, style: { fill: '#fff7e6', stroke: '#ffd591' } },
      ],
      edges: [
        { source: 'start', target: 'process1' },
        { source: 'process1', target: 'process2' },
        { source: 'process2', target: 'decision' },
        { source: 'decision', target: 'process3', label: '是' },
        { source: 'decision', target: 'end', label: '否' },
        { source: 'process3', target: 'end' },
      ],
    }

    // 渲染图
    graph.setData(data)
    graph.render()

    // 自适应调整视图
    graph.fitView()

    // 添加交互事件
    graph.on('node:click', evt => {
      const node = evt.item
      graph.setItemState(node, 'selected', true)
    })

    graph.on('canvas:click', () => {
      graph.getElementDataByState('node', 'selected').forEach(node => {
        graph.setItemState(node, 'selected', false)
      })
    })

    // 窗口大小变化时调整画布大小
    const handleResize = () => {
      if (graphRef.current && !graphRef.current.destroyed) {
        graphRef.current.setSize(containerRef.current.clientWidth, 600)
        graphRef.current.fitView()
      }
    }

    window.addEventListener('resize', handleResize)

    // 组件卸载时销毁图实例
    return () => {
      window.removeEventListener('resize', handleResize)
      if (graphRef.current && !graphRef.current.destroyed) {
        graphRef.current.destroy()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    />
  )
}

export default FlowChart
