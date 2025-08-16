import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape: React.FC<{ position: [number, number, number]; color: string; config: any }> = ({ position, color, config }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && config.deviceType !== 'mobile') {
      const intensity = config.rotationIntensity;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * intensity;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * intensity;
    }
  });

  return (
    <Float 
      speed={config.deviceType === 'mobile' ? 0.5 : 1.5} 
      rotationIntensity={config.rotationIntensity} 
      floatIntensity={config.floatIntensity}
    >
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={config.deviceType === 'mobile' ? [0.2] : [0.3]} />
        <meshStandardMaterial color={color} transparent opacity={config.deviceType === 'mobile' ? 0.5 : 0.7} />
      </mesh>
    </Float>
  );
};

const Scene: React.FC<{ config: any }> = ({ config }) => {
  const shapes = useMemo(() => {
    // Optimize shapes based on device type
    const allShapes = [
      { position: [-2, 1, -1] as [number, number, number], color: '#5865F2' },
      { position: [2, -1, -0.5] as [number, number, number], color: '#FFB86B' },
      { position: [0, 2, -2] as [number, number, number], color: '#10B981' },
      { position: [-1, -2, -1.5] as [number, number, number], color: '#F59E0B' },
      { position: [1.5, 0, -1] as [number, number, number], color: '#EF4444' },
    ];
    
    return allShapes.slice(0, config.shapesCount);
  }, [config.shapesCount]);

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
          config={config}
        />
      ))}
    </>
  );
};

const Mascot3D: React.FC = () => {
  // Check device type and user preferences for 3D rendering
  const render3DConfig = useMemo(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop';
    if (width < 768 || /Android.*Mobile|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (width < 1024 || /iPad|Android(?!.*Mobile)/i.test(userAgent)) {
      deviceType = 'tablet';
    } else {
      deviceType = 'desktop';
    }
    
    return {
      shouldRender: !prefersReducedMotion,
      deviceType,
      // Optimize settings per device
      autoRotateSpeed: deviceType === 'mobile' ? 0.1 : deviceType === 'tablet' ? 0.15 : 0.3,
      dpr: deviceType === 'mobile' ? [0.5, 1] : deviceType === 'tablet' ? [1, 1.5] : [1, 2],
      performanceMin: deviceType === 'mobile' ? 0.1 : deviceType === 'tablet' ? 0.2 : 0.5,
      frameloop: deviceType === 'mobile' ? 'demand' : deviceType === 'tablet' ? 'demand' : 'always',
      shapesCount: deviceType === 'mobile' ? 2 : deviceType === 'tablet' ? 3 : 5,
      floatIntensity: deviceType === 'mobile' ? 0.2 : deviceType === 'tablet' ? 0.3 : 0.5,
      rotationIntensity: deviceType === 'mobile' ? 0.1 : deviceType === 'tablet' ? 0.2 : 0.5
    };
  }, []);

  if (!render3DConfig.shouldRender) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        performance={{ min: render3DConfig.performanceMin }}
        dpr={render3DConfig.dpr}
        frameloop={render3DConfig.frameloop}
      >
        <Suspense fallback={null}>
          <Scene config={render3DConfig} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate={render3DConfig.deviceType !== 'mobile'}
            autoRotateSpeed={render3DConfig.autoRotateSpeed}
            enableDamping={render3DConfig.deviceType === 'desktop'}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Mascot3D;
