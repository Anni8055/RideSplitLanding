import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PresentationControls } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Group } from 'three';

// Simple car model
export function Car3DModel(props: { scale?: number; position?: [number, number, number]; rotation?: [number, number, number]; color?: string }) {
  const { scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], color = '#00B8E6' } = props;
  const group = useRef<Group>(null);
  
  // Auto-rotate the car gently
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3 + Math.PI;
    }
  });

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation}>
      {/* Car body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Car top */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[2, 0.8, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Windshield */}
      <mesh castShadow receiveShadow position={[1, 0.7, 0]}>
        <boxGeometry args={[0.1, 0.8, 1.8]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Wheels */}
      <mesh castShadow receiveShadow position={[1, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[1, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[-1, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[-1, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Headlights */}
      <mesh castShadow receiveShadow position={[2, 0, 0.7]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh castShadow receiveShadow position={[2, 0, -0.7]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Scene that contains the car with lighting and controls
export default function CarScene(props: { scale?: number; autoRotate?: boolean; enableZoom?: boolean; color?: string }) {
  const { scale = 2, autoRotate = true, enableZoom = false, color = '#00B8E6' } = props;

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.5, 0.5]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 2, tension: 200 }}
      zoom={1}
      speed={1.5}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <spotLight position={[0, 10, 0]} intensity={0.5} castShadow />
      
      <Car3DModel scale={scale} color={color} />
      
      {autoRotate && <OrbitControls 
        enablePan={false} 
        enableZoom={enableZoom} 
        enableRotate={true} 
        autoRotate 
        autoRotateSpeed={1} 
      />}
    </PresentationControls>
  );
}