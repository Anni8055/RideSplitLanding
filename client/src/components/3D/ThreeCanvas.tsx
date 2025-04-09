import { Canvas } from '@react-three/fiber';
import CarScene from './Car3DModel';
import { Suspense } from 'react';

export default function ThreeCanvas({ 
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
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <CarScene color={carColor} />
        </Suspense>
      </Canvas>
    </div>
  );
}