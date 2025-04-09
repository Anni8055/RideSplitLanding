import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere } from '@react-three/drei';
import { Suspense } from 'react';

// A much simpler car model using drei primitive components
function CarModel({ color = '#00B8E6' }: { color?: string }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Car body */}
      <Box position={[0, 0, 0]} args={[4, 1, 2]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </Box>
      
      {/* Car cabin */}
      <Box position={[0, 0.7, 0]} args={[2, 0.8, 1.8]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </Box>
      
      {/* Wheels */}
      <Cylinder position={[1, -0.5, 1]} args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder position={[1, -0.5, -1]} args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder position={[-1, -0.5, 1]} args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder position={[-1, -0.5, -1]} args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      
      {/* Headlights */}
      <Sphere position={[2, 0, 0.7]} args={[0.2, 16, 16]}>
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere position={[2, 0, -0.7]} args={[0.2, 16, 16]}>
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

// Main component to export
export default function BasicCarCanvas({ 
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
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <CarModel color={carColor} />
          <OrbitControls 
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            autoRotate
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}