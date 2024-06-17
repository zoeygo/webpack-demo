import React, { memo, useEffect, useRef } from 'react'
import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

import styles from './index.less'

// 定义渲染尺寸
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const ThreeJs: React.FC<any> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 动画更新
  const tick = (renderer, scene, camera, mesh) => {
    // 更新渲染器
    renderer.render(scene, camera)
    // 给网格模型添加一个转动动画
    mesh && (mesh.rotation.y += 0.02)
    mesh && (mesh.rotation.x += 0.02)
    // 页面重绘时调用自身
    window.requestAnimationFrame(() => tick(renderer, scene, camera, mesh))
  }

  useEffect(() => {
    // 初始化渲染器
    const canvas = canvasRef.current
    const renderer = new WebGLRenderer({ canvas: canvas })
    renderer.setSize(sizes.width, sizes.height)
    // 设置canvas到像素比为当前设备的屏幕像素比，避免高分屏下出现模糊情况
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 初始化场景
    const scene = new Scene()
    /**
     * 透视相机
     * PerspectiveCamera(fov, aspect, near, far)
     * fov:视场，即能够看到的角度范围
     * aspect:渲染窗口的长宽比
     * near:从距离相机多远的位置开始渲染
     * far:距离相机多远的位置截止渲染
     */
    // 初始化相机
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3
    scene.add(camera)
    /**
     * 添加一个Three.js内置的立方体网格模型
     * 构造函数：BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
     * width: x轴宽度，默认为1
     * height: y轴高度，默认为1
     * depth: z轴深度，默认为1
     * widthSegments: 可选，宽度的分段数，默认为1
     * heightSegments: 可选，高度的分段数，默认为1
     * depthSegments: 可选，深度的分段数，默认为1
     */
    const geometry = new BoxGeometry(1, 1, 1)
    /**
     * MeshBasicMaterial 基础网格材质
     * 构造函数：MeshBasicMaterial(parameters: Object)
     * parameters：可选，用于定义材质外观的对象，具有一个或多个属性如 color、map 等
     */
    const material = new MeshBasicMaterial({ color: 0x03c03c })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    tick(renderer, scene, camera, mesh)
    // 页面缩放事件监听
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      // 更新渲染
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      // 更新相机
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
    })
    return () => {
      window.removeEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        // 更新渲染
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // 更新相机
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
      })
    }
  }, [])

  return (
    <div>
      <canvas className={styles.webgl} ref={canvasRef}></canvas>
    </div>
  )
}

export default memo(ThreeJs)
