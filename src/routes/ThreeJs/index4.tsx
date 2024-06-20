/**
 * 宇航员-报错
 */
import React, { memo, useEffect, useRef } from 'react'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  SpriteMaterial,
  Sprite,
  BufferGeometry,
  PointsMaterial,
  Color,
  Float32BufferAttribute,
  Points,
  CanvasTexture,
  TextureLoader,
  newFogExp2,
  newPointLight,
  newAmbientLight,
} from 'three'
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import styles from './index.less'

// 定义渲染尺寸
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const ThreeJs: React.FC<any> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const updateParticles = (particleSystem, camera, veticsFloat32Array, t, geom) => {
    // 粒子系统旋转动画
    particleSystem.position.x = 0.2 * Math.cos(t)
    particleSystem.position.y = 0.2 * Math.cos(t)
    particleSystem.rotation.z += 0.015
    camera.lookAt(particleSystem.position)
    // 粒子系统由近到远动画
    for (let i = 0; i < veticsFloat32Array.length; i++) {
      // 如果是Z轴值，则修改数值
      if ((i + 1) % 3 === 0) {
        const dist = veticsFloat32Array[i] - camera.position.z
        if (dist >= 0) veticsFloat32Array[i] = rand(-1000, -500)
        veticsFloat32Array[i] += 2.5
        const _vertices = new Float32BufferAttribute(veticsFloat32Array, 3)
        geom.attributes.position = _vertices
      }
    }
    particleSystem.geometry.verticesNeedUpdate = true
  }
  const updateMeshes = (astronaut, camera, t) => {
    if (astronaut) {
      // 宇航员由近到远动画
      astronaut.position.z = 0.08 * Math.sin(t) + (camera.position.z - 0.2)
      // 宇航员旋转动画
      astronaut.rotation.x += 0.015
      astronaut.rotation.y += 0.015
      astronaut.rotation.z += 0.01
    }
  }
  // 场景和相机更新
  const updateRenderer = (canvas, renderer, camera) => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
  }
  //   const tick = (renderer, camera, particleSystem, veticsFloat32Array, t, geom, astronaut, canvas) => {
  //     updateParticles(particleSystem, camera, veticsFloat32Array, t, geom)
  //     updateMeshes(astronaut, camera, t)
  //     updateRenderer(canvas, renderer, camera)
  //     renderer.render(scene, camera)
  //     requestAnimationFrame(() => tick(renderer, camera, particleSystem, veticsFloat32Array, t, geom, astronaut, canvas))
  //     t += 0.01
  //   }
  const tick = (controls, renderer, scene, camera) => {
    controls && controls.update()
    // 更新渲染器
    renderer.render(scene, camera)
    // 页面重绘时调用自身
    window.requestAnimationFrame(() => tick(controls, renderer, scene, camera))
  }

  const rand = (min, max) => {
    return min + Math.random() * (max - min)
  }

  /**
   * 使用THREE.Points创建粒子
   */
  //   const createParticlesByPoints = ctrls => {
  //     const geom = new BufferGeometry()
  //     const material = new PointsMaterial({
  //       color: 0xffffff,
  //       size: 10,
  //       alphaTest: 0.8,
  //     })
  //     let veticsFloat32Array = []
  //     let veticsColors = []
  //     for (let p = 0; p < 1000; p++) {
  //       veticsFloat32Array.push(rand(20, 30) * Math.cos(p), rand(20, 30) * Math.sin(p), rand(-1500, 0))
  //       const randomColor = new Color(Math.random() * 0xffffff)
  //       veticsColors.push(randomColor.r, randomColor.g, randomColor.b)
  //     }
  //     const vertices = new Float32BufferAttribute(veticsFloat32Array, 3)
  //     const colors = new Float32BufferAttribute(veticsColors, 3)
  //     geom.attributes.position = vertices
  //     geom.attributes.color = colors
  //     const particleSystem = new Points(geom, material)
  //     scene.add(particleSystem)
  //     // 雾化效果
  //     scene.fog = newFogExp2(0x000000, 0.005)
  //     // 设置光照
  //     let light = newPointLight(0xffffff, 0.5)
  //     light.position.x = -50
  //     light.position.y = -50
  //     light.position.z = 75
  //     scene.add(light)
  //     light = newPointLight(0xffffff, 0.5)
  //     light.position.x = 50
  //     light.position.y = 50
  //     light.position.z = 75
  //     scene.add(light)
  //     light = newPointLight(0xffffff, 0.3)
  //     light.position.x = 25
  //     light.position.y = 50
  //     light.position.z = 200
  //     scene.add(light)
  //     light = newAmbientLight(0xffffff, 0.02)
  //     scene.add(light)
  //   }

  // 创建样式化的粒子
  const createStyledParticlesByPoints = (scene, ctrls) => {
    const geom = new BufferGeometry()
    const material = new PointsMaterial({
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
  const ctrls: any = scene => {
    return {
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
        createStyledParticlesByPoints(scene, {
          size: ctrls().size,
          transparent: ctrls().transparent,
          opacity: ctrls().opacity,
          vertexColors: ctrls().vertexColors,
          sizeAttenuation: ctrls().sizeAttenuation,
          color: ctrls().color,
          vertexColor: ctrls().vertexColor,
        })
      },
    }
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
    // 初始化相机
    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
    camera.position.z = 120
    camera.lookAt(new Vector3(0, 0, 0))
    scene.add(camera)

    // 镜头控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    const value = ctrls(scene)
    createStyledParticlesByPoints(scene, value)

    const gui = new GUI()
    gui.add(ctrls, 'size', 0, 10).onChange(value.redraw)
    gui.add(ctrls, 'transparent').onChange(value.redraw)
    gui.add(ctrls, 'opacity', 0, 1).onChange(value.redraw)
    gui.add(ctrls, 'vertexColors').onChange(value.redraw)
    gui.addColor(ctrls, 'color').onChange(value.redraw)
    gui.addColor(ctrls, 'vertexColor').onChange(value.redraw)
    gui.add(ctrls, 'sizeAttenuation').onChange(value.redraw)
    gui.hide()
    // 需要查看示例时解开注释
    value.redraw()
    gui.show()

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
    tick(controls, renderer, scene, camera)
    // 鼠标移动
    window.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = -1 * ((cx - e.clientX) / cx)
      const dy = -1 * ((cy - e.clientY) / cy)
      camera.position.x = dx * 5
      camera.position.y = dy * 5
      //   astronaut.position.x = dx * 5
      //   astronaut.position.y = dy * 5
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
      window.removeEventListener('mousemove', e => {
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        const dx = -1 * ((cx - e.clientX) / cx)
        const dy = -1 * ((cy - e.clientY) / cy)
        camera.position.x = dx * 5
        camera.position.y = dy * 5
        // astronaut.position.x = dx * 5
        // astronaut.position.y = dy * 5
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
