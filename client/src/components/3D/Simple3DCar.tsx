import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3 } from 'three';

// A simple car model with basic shapes
function SimpleCar({ color = '#00B8E6' }: { color?: string }) {
  const group = useRef<Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Car cabin */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2, 0.8, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[1, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[2, 0, 0.7]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[2, 0, -0.7]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ carColor }: { carColor: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <SimpleCar color={carColor} />
      <OrbitControls 
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}

// Main component to export
export default function Simple3DCarCanvas({ 
  className = '', 
  style = {}, 
  carColor = '#00B8E6'
}: { 
  className?: string; 
  style?: React.CSSProperties;
  carColor?: string;
}) {
  return (
    <div className={`${className}`} style={style}>
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene carColor={carColor} />
        </Suspense>
      </Canvas>
    </div>
  );
}