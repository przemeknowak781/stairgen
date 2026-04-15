import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Stair } from './scene/Stair';
import { SceneEnvironment } from './scene/Environment';
import { CameraRig } from './scene/Camera';

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#1a1d22' }}>
      <Canvas
        camera={{ position: [3200, 1800, 3200], fov: 40, near: 1, far: 20000 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <SceneEnvironment />
        <CameraRig />
        <Stair />
        <OrbitControls target={[0, 1500, 0]} maxDistance={10000} />
        <gridHelper args={[4000, 40, '#444', '#2a2d32']} />
      </Canvas>
    </div>
  );
}
