import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Leva } from 'leva';
import { Stair } from './scene/Stair';
import { SceneEnvironment } from './scene/Environment';
import { CameraRig } from './scene/Camera';
import { ExportListener } from './scene/ExportListener';
import { Topbar } from './ui/Topbar';
import { ControlPanel } from './ui/ControlPanel';
import { ValidationPanel } from './ui/ValidationPanel';
import { StatusBar } from './ui/StatusBar';

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#1a1d22' }}>
      <Topbar />
      <ControlPanel />
      <ValidationPanel />
      <StatusBar />
      <Leva
        titleBar={{ title: 'Parametry', drag: false, filter: false }}
        theme={{
          colors: { elevation1: '#0f1114', elevation2: '#1a1d22', elevation3: '#22252b' },
          sizes: { rootWidth: '320px' },
        }}
      />
      <div style={{ position: 'fixed', top: 56, left: 320, right: 280, bottom: 40, background: '#1a1d22' }}>
        <Canvas
          camera={{ position: [3200, 1800, 3200], fov: 40, near: 1, far: 20000 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
          <SceneEnvironment />
          <CameraRig />
          <Stair />
          <ExportListener />
          <OrbitControls target={[0, 1500, 0]} maxDistance={10000} />
          <gridHelper args={[4000, 40, '#444', '#2a2d32']} />
        </Canvas>
      </div>
    </div>
  );
}
