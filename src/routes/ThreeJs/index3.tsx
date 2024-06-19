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
import { GUI } from 'dat.gui'
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

  // 页面重绘动画
  const tick = (renderer, scene, camera, controls) => {
    controls && controls.update()
    // 更新渲染器
    renderer.render(scene, camera)
    // 页面重绘时调用自身
    window.requestAnimationFrame(() => tick(renderer, scene, camera, controls))
  }

  /**
   * 使用THREE.Sprite创建粒子
   * 使用少量对象时很有效
   * 大量粒子时会产生性能问题
   */
  // const createParticlesBySprite = () => {
  //   for (let x = -15; x < 15; x++) {
  //     for (let y = -10; y < 10; y++) {
  //       let material = new SpriteMaterial({ color: Math.random() * 0xffffff })
  //       let sprite = new Sprite(material)
  //       sprite.position.set(x * 4, y * 4, 0)
  //       scene.add(sprite)
  //     }
  //   }
  // }

  /**
   * 使用THREE.Points创建粒子
   */
  const createParticlesByPoints = ctrls => {
    const geom = new BufferGeometry()
    const material = new PointsMaterial({
      //   size: 3, // 粒子大小
      //   vertexColors: true,
      //   color: 0xffffff, // 系统粒子中所有粒子的颜色
      size: ctrls.size,
      transparent: ctrls.transparent,
      opacity: ctrls.opacity,
      color: new Color(ctrls.color),
      vertexColors: ctrls.vertexColors,
      sizeAttenuation: ctrls.sizeAttenuation,
    })
    let veticsFloat32Array = []
    let veticsColors = []
    for (let x = -15; x < 15; x++) {
      for (let y = -10; y < 10; y++) {
        veticsFloat32Array.push(x * 4, y * 4, 0)
        const randomColor = new Color(Math.random() * ctrls.vertexColor)
        veticsColors.push(randomColor.r, randomColor.g, randomColor.b)
      }
    }
    const vertices = new Float32BufferAttribute(veticsFloat32Array, 3)
    const colors = new Float32BufferAttribute(veticsColors, 3)
    geom.attributes.position = vertices
    geom.attributes.color = colors
    const particles = new Points(geom, material)
    particles.name = 'particles'
    scene.add(particles)
  }

  // 创建属性控制器
  const ctrls = {
    size: 5,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    color: 0xffffff,
    vertexColor: 0x00ff00,
    sizeAttenuation: true,
    rotate: true,
    redraw: () => {
      if (scene.getObjectByName('particles')) {
        Scene.remove(scene.getObjectByName('particles'))
      }
      createParticlesByPoints({
        size: ctrls.size,
        transparent: ctrls.transparent,
        opacity: ctrls.opacity,
        vertexColors: ctrls.vertexColors,
        sizeAttenuation: ctrls.sizeAttenuation,
        color: ctrls.color,
        vertexColor: ctrls.vertexColor,
      })
    },
  }

  // 使用canvas样式化粒子
//   const createParticlesByCanvas = () => {
//     // 使用canvas创建纹理
//     const canvas = document.createElement('canvas')
//     const texture = new CanvasTexture(canvas)
//     const createCanvasTexture = () => {
//       //   const canvas = document.createElement('canvas')
//       const ctx = canvas.getContext('2d')
//       canvas.width = 300
//       canvas.height = 300
//       ctx.lineWidth = 10
//       ctx.beginPath()
//       ctx.moveTo(170, 120)
//       var grd = ctx.createLinearGradient(0, 0, 170, 0)
//       grd.addColorStop(0, 'black')
//       grd.addColorStop(0.3, 'magenta')
//       grd.addColorStop(0.5, 'blue')
//       grd.addColorStop(0.6, 'green')
//       grd.addColorStop(0.8, 'yellow')
//       grd.addColorStop(1, 'red')
//       ctx.strokeStyle = grd
//       ctx.arc(120, 120, 50, 0, Math.PI * 2)
//       ctx.stroke()
//       //   const texture = new CanvasTexture(canvas)
//       texture.needsUpdate = true
//       return texture
//     }
//     // 创建粒子系统
//     const createParticles = (size, transparent, opacity, sizeAttenuation, color) => {
//       const geom = new BufferGeometry()
//       const material = new PointsMaterial({
//         size: size,
//         transparent: transparent,
//         opacity: opacity,
//         map: texture,
//         sizeAttenuation: sizeAttenuation,
//         color: color,
//         depthTest: true,
//         depthWrite: false,
//       })
//       let veticsFloat32Array = []
//       const range = 500
//       for (let i = 0; i < 400; i++) {
//         const particle = new Vector3(
//           Math.random() * range - range / 2,
//           Math.random() * range - range / 2,
//           Math.random() * range - range / 2
//         )
//         veticsFloat32Array.push(particle.x, particle.y, particle.z)
//       }
//       const vertices = new Float32BufferAttribute(veticsFloat32Array, 3)
//       geom.attributes.position = vertices
//       const particles = new Points(geom, material)
//       scene.add(particles)
//     }
//     createParticles(40, true, 1, true, 0xffffff)
//   }

  useEffect(() => {
    // 初始化渲染器
    const canvas = canvasRef.current
    const renderer = new WebGLRenderer({ canvas: canvas })
    renderer.setSize(sizes.width, sizes.height)
    // 设置canvas到像素比为当前设备的屏幕像素比，避免高分屏下出现模糊情况
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // // 初始化场景
    // const scene = new Scene()
    // 初始化相机
    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
    camera.position.z = 120
    camera.lookAt(new Vector3(0, 0, 0))
    scene.add(camera)

    // 镜头控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    createParticlesByPoints(ctrls)

    const gui = new GUI()
    gui.add(ctrls, 'size', 0, 10).onChange(ctrls.redraw)
    gui.add(ctrls, 'transparent').onChange(ctrls.redraw)
    gui.add(ctrls, 'opacity', 0, 1).onChange(ctrls.redraw)
    gui.add(ctrls, 'vertexColors').onChange(ctrls.redraw)
    gui.addColor(ctrls, 'color').onChange(ctrls.redraw)
    gui.addColor(ctrls, 'vertexColor').onChange(ctrls.redraw)
    gui.add(ctrls, 'sizeAttenuation').onChange(ctrls.redraw)

    tick(renderer, scene, camera, controls)

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
