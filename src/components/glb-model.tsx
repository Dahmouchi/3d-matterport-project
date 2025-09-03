// components/GLBModel.tsx
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';
import { Group } from 'three';

function Model({ modelPath }: { modelPath: string }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '18px' }}>Loading model...</div>
    </Html>
  );
}

interface GLBModelViewerProps {
  modelPath: string;
}

export default function GLBModelViewer({ modelPath }: GLBModelViewerProps) {
  return (
    <div style={{ 
      height: '300px', 
      width: '50%',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <Canvas camera={{ position: [3, 3, 3], fov: 75 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Model modelPath={modelPath} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={false} />
          <Environment
                            preset="city"
                            background={false} // Set to true if you want environment as background
                            blur={0.5} // Reduce blur for better performance
                          />
        </Suspense>
      </Canvas>
    </div>
  );
}