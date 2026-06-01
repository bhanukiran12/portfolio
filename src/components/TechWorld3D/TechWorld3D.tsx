import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

function Scene() {
  return (
    <>
      <color attach="background" args={['#02030a']} />
      <fog attach="fog" args={['#02030a', 8, 24]} />

      <Stars radius={90} depth={60} count={2800} factor={4} saturation={0} fade speed={1.1} />
    </>
  )
}

function TechWorld3D() {
  return (
    <div className="webgl-world" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default TechWorld3D
