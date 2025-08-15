import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[0.3]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
};

const Scene: React.FC = () => {
  const shapes = useMemo(() => [
    { position: [-2, 1, -1] as [number, number, number], color: '#5865F2' },
    { position: [2, -1, -0.5] as [number, number, number], color: '#FFB86B' },
    { position: [0, 2, -2] as [number, number, number], color: '#10B981' },
    { position: [-1, -2, -1.5] as [number, number, number], color: '#F59E0B' },
    { position: [1.5, 0, -1] as [number, number, number], color: '#EF4444' },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FFB86B" />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
        />
      ))}
    </>
  );
};

const Mascot3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Mascot3D;
