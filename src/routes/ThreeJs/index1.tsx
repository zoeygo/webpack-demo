import React, { memo, useEffect, useRef } from 'react'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  MeshLambertMaterial,
  SphereGeometry,
  TorusGeometry,
  IcosahedronGeometry,
  MeshToonMaterial,
  Group,
  Vector3,
  Mesh,
  Color,
  Fog,
  AmbientLight,
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

  // 动画更新
  const tick = (renderer, scene, camera, rot, planet, ring, axis, satellite, stars, controls) => {
    // 更新渲染器
    renderer.render(scene, camera)
    // 给网格模型添加一个转动动画
    rot += Math.random() * 0.8
    const radian = (rot * Math.PI) / 180
    // 星球位置动画
    planet && (planet.rotation.y += 0.005)
    // 星球轨道环位置动画
    ring && ring.rotateOnAxis(axis, Math.PI / 400)
    // 卫星位置动画
    satellite.position.x = 250 * Math.sin(radian)
    satellite.position.y = 100 * Math.cos(radian)
    satellite.position.z = -100 * Math.cos(radian)
    satellite.rotation.x += 0.005
    satellite.rotation.y += 0.005
    satellite.rotation.z -= 0.005
    // 星星动画
    stars.rotation.y += 0.0009
    stars.rotation.z -= 0.0003
    // 更新控制器
    controls.update()
    // 页面重绘时调用自身
    window.requestAnimationFrame(() =>
      tick(renderer, scene, camera, rot, planet, ring, axis, satellite, stars, controls)
    )
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
    scene.background = new Color(0x1a1a1a)
    /**
     * 场景雾化
     * 构造函数：Fog(color, near, far)
     * color：雾的颜色
     * near：应用雾化效果的最小距离，距离活动摄像机长度小于near的物体将不会被雾影响
     * far：应用雾化效果的最大距离，距离活动摄像机长度大于far的物体将不会被雾影响
     */
    scene.fog = new Fog(0x1a1a1a, 1, 1000)
    /**
     * 透视相机
     * PerspectiveCamera(fov, aspect, near, far)
     * fov:视场，即能够看到的角度范围
     * aspect:渲染窗口的长宽比
     * near:从距离相机多远的位置开始渲染
     * far:距离相机多远的位置截止渲染
     */
    // 初始化相机
    const camera = new PerspectiveCamera(40, sizes.width / sizes.height)
    scene.add(camera)
    camera.position.set(20, 100, 450)

    // 初始化镜头轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    // 通过设置 controls.enableDamping 为 true 来开启控制器的移动惯性，这样在使用鼠标交互过程中就会感觉更加流畅和逼真
    controls.enableDamping = true

    // 添加光源
    const light = new AmbientLight(0xdeedff, 1.5)
    scene.add(light)

    /**
     * 创建星球
     * 创建立方体 SphereGeometry 和材质 MeshLambertMaterial
     */
    // 星球模型
    const SphereMaterial = new MeshLambertMaterial({
      color: 0x03c03c,
      wireframe: true, // 得到几何模型的线框结构
    })
    // 球几何体
    const Sphere = new SphereGeometry(80, 32, 32)
    const planet = new Mesh(Sphere, SphereMaterial)
    scene.add(planet)

    // 创建星球轨道环
    const Torus = new TorusGeometry(150, 8, 2, 120)
    const TorusMaterial = new MeshLambertMaterial({ color: 0x40a9ff, wireframe: true })
    const ring = new Mesh(Torus, TorusMaterial)
    ring.rotation.x = Math.PI / 2
    ring.rotation.y = -0.1 * (Math.PI / 2)
    scene.add(ring)

    // 用二十面几何体创建卫星
    const IcoGeometry = new IcosahedronGeometry(16, 2)
    const IcoMaterial = new MeshToonMaterial({ color: 0xfffc00 })
    const satellite = new Mesh(IcoGeometry, IcoMaterial)
    scene.add(satellite)

    // 创建星群
    const stars = new Group()
    for (let i = 0; i < 500; i++) {
      const geometry = new IcosahedronGeometry(Math.random() * 2, 2)
      const material = new MeshToonMaterial({ color: 0xeeeeee })
      const mesh = new Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 700
      mesh.position.y = (Math.random() - 0.5) * 700
      mesh.position.z = (Math.random() - 0.5) * 700
      mesh.rotation.x = Math.random() * 2 * Math.PI
      mesh.rotation.y = Math.random() * 2 * Math.PI
      mesh.rotation.z = Math.random() * 2 * Math.PI
      stars.add(mesh)
    }
    scene.add(stars)
    let rot = 0
    // 动画
    const axis = new Vector3(0, 0, 1)
    tick(renderer, scene, camera, rot, planet, ring, axis, satellite, stars, controls)
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
