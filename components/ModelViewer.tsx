'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useInView } from 'react-intersection-observer'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

type ModelProps = {
  url: string
  sceneRef: React.MutableRefObject<THREE.Object3D | null>
  onLoaded: () => void
  rotation?: THREE.Euler
}

function Model({ url, sceneRef, onLoaded, rotation }: ModelProps) {
  const { scene } = useGLTF(url, true, true) // Draco compression enabled
  useEffect(() => {
    sceneRef.current = scene
    onLoaded()
  }, [scene, onLoaded, sceneRef])
  return (
    <Center>
      <primitive object={scene} scale={2.5} rotation={rotation} />
    </Center>
  )
}

type ViewerProps = {
  modelUrl: string
  uniqueKey: string
}

export default function ModelViewer({ modelUrl, uniqueKey }: ViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sceneRef = useRef<THREE.Object3D | null>(null)
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Set up Meshopt decoder for GLTFLoader
  useEffect(() => {
    GLTFLoader.prototype.setMeshoptDecoder(MeshoptDecoder)
  }, [])

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset ready state when modelUrl changes
  useEffect(() => {
    setReady(false)
  }, [modelUrl])

  // Camera and controls adjustment after model loads
  useEffect(() => {
    if (!controlsRef.current || !cameraRef.current || !sceneRef.current || !ready) return
    const box = new THREE.Box3().setFromObject(sceneRef.current)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Center the model
    sceneRef.current.position.sub(center)

    // Adjust camera distance based on device
    const maxDim = Math.max(size.x, size.y, size.z)
    let distance = isMobile ? maxDim * 2.5 : maxDim * 2

    // Special closer view for Narmer Palette
    if (uniqueKey === '3') {
      const sphere = box.getBoundingSphere(new THREE.Sphere())
      distance = isMobile ? sphere.radius * 4 : sphere.radius * 3.5
    }

    // Camera & controls setup
    cameraRef.current.position.set(0, 0, distance)
    cameraRef.current.lookAt(0, 0, 0)
    controlsRef.current.target.set(0, 0, 0)
    controlsRef.current.update()
  }, [ready, uniqueKey, isMobile])

  return (
    <div ref={ref} className="w-full h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[400px]">
      {inView ? (
        <Canvas
          key={uniqueKey}
          camera={{ position: [0, 0, 5], fov: isMobile ? 60 : 55 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera as THREE.PerspectiveCamera
          }}
          gl={{ antialias: isMobile ? false : true }}
        >
          <ambientLight intensity={isMobile ? 0.4 : 0.5} />
          <Suspense fallback={<FallbackBox />}>
            <Environment preset="studio" background={false} />
            <Center>
              <Model
                url={modelUrl}
                sceneRef={sceneRef}
                onLoaded={() => setReady(true)}
                rotation={
                  uniqueKey === '3'
                    ? new THREE.Euler(Math.PI / 2, 0, (Math.PI / 2) * 2)
                    : uniqueKey === '2'
                      ? new THREE.Euler(0, -(Math.PI / 2), 0)
                      : undefined
                }
              />
            </Center>
          </Suspense>
          <OrbitControls ref={controlsRef} enablePan={false}  />
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Loading 3D Model...</span>
        </div>
      )}
    </div>
  )
}

function FallbackBox() {
  const ref = useRef<THREE.Mesh>(null!)

  // Rotate the box gently
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      ref.current.rotation.x += 0.005
    }
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#cccccc"
        metalness={0.5}
        roughness={0.2}
        transparent={true}
        opacity={0.7}
        emissive="#222222"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
