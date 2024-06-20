/**
 * demo
 */
import React, { memo, useEffect, useRef } from 'react'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  BufferGeometry,
  PointsMaterial,
  Color,
  Float32BufferAttribute,
  Points,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import styles from './index.less'

// 定义渲染尺寸
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const ThreeJs: React.FC<any> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // 初始化场景
  const scene = new Scene()

  // 动画更新
  const tick = (controls, renderer, scene, camera) => {
    controls && controls.update()
    // 更新渲染器
    renderer.render(scene, camera)
    // 页面重绘时调用自身
    window.requestAnimationFrame(() => tick(controls, renderer, scene, camera))
  }

  /**
   * 创建粒子
   */
  const createParticlesByPoints = () => {
    const geom = new BufferGeometry()
    const material = new PointsMaterial({
      size: 3,
      vertexColors: true,
    })
    let veticsFloat32Array = []
    let veticsColors = []
    for (let x = -15; x < 15; x++) {
      for (let y = -10; y < 10; y++) {
        veticsFloat32Array.push(x * 4, y * 4, 0)
        const randomColor = new Color(0x87cefa)
        veticsColors.push(randomColor.r, randomColor.g, randomColor.b)
      }
    }
    const vertices = new Float32BufferAttribute(veticsFloat32Array, 3)
    const colors = new Float32BufferAttribute(veticsColors, 3)
    geom.attributes.position = vertices
    geom.attributes.color = colors
    const particles = new Points(geom, material)
    scene.add(particles)
  }

  useEffect(() => {
    // 初始化渲染器
    const canvas = canvasRef.current
    const renderer = new WebGLRenderer({ canvas: canvas })
    renderer.setSize(sizes.width, sizes.height)
    // 设置canvas到像素比为当前设备的屏幕像素比，避免高分屏下出现模糊情况
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 初始化相机
    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
    camera.position.z = 120
    camera.lookAt(new Vector3(0, 0, 0))
    scene.add(camera)

    // 镜头控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

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
    createParticlesByPoints()
    tick(controls, renderer, scene, camera)

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
