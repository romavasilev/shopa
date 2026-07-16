'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Particles({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.getElapsedTime()
    pts.rotation.y = t * 0.04 + mouse.x * 0.3
    pts.rotation.x = mouse.y * 0.2
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#56ccf2"
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingKnot() {
  const ref = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.getElapsedTime()
    m.rotation.x = t * 0.15
    m.rotation.y = t * 0.2 + mouse.x * 0.5
    m.position.y = Math.sin(t * 0.6) * 0.3
  })

  return (
    <mesh ref={ref} scale={1.6} position={[2.6, 0.2, -1]}>
      <torusKnotGeometry args={[1, 0.28, 160, 32]} />
      <meshStandardMaterial
        color="#1c2230"
        emissive="#2a90c4"
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={0.9}
        wireframe
      />
    </mesh>
  )
}

function Lines() {
  const ref = useRef<THREE.LineSegments>(null)
  const geo = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < 40; i++) {
      const x1 = (Math.random() - 0.5) * 16
      const y1 = (Math.random() - 0.5) * 10
      const z1 = (Math.random() - 0.5) * 8
      points.push(x1, y1, z1, x1 + (Math.random() - 0.5) * 3, y1 + (Math.random() - 0.5) * 3, z1)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return g
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#2a6f96" transparent opacity={0.3} />
    </lineSegments>
  )
}

export function HeroScene() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) setEnabled(true)
  }, [])

  if (!enabled) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 40%, oklch(0.78 0.16 211 / 0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#56ccf2" />
        <pointLight position={[-5, -3, 2]} intensity={0.6} color="#3a7bd5" />
        <Particles />
        <Lines />
        <FloatingKnot />
      </Canvas>
    </div>
  )
}
