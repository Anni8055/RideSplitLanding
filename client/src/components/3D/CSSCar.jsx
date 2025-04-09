import React, { useState, useEffect } from 'react';

// A car component using CSS 3D transforms instead of Three.js
const CSSCar = ({ className = '', style = {}, carColor = '#00B8E6' }) => {
  const [rotation, setRotation] = useState({ x: 10, y: 25 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Auto-rotation
  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      if (autoRotate) {
        setRotation(prev => ({
          ...prev,
          y: (prev.y + 0.5) % 360
        }));
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [autoRotate]);
  
  // Mouse and touch event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;
      
      setRotation(prev => ({
        x: Math.min(30, Math.max(-30, prev.x - deltaY * 0.5)),
        y: (prev.y + deltaX * 0.5) % 360
      }));
      
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - startPosition.x;
      const deltaY = e.touches[0].clientY - startPosition.y;
      
      setRotation(prev => ({
        x: Math.min(30, Math.max(-30, prev.x - deltaY * 0.5)),
        y: (prev.y + deltaX * 0.5) % 360
      }));
      
      setStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Generate car parts with the specified color
  const getCarStyles = () => {
    return {
      scene: {
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1000px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: 'transparent'
      },
      car: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: isDragging ? 'none' : 'transform 0.1s ease'
      },
      body: {
        position: 'absolute',
        width: '200px',
        height: '60px',
        borderRadius: '12px',
        backgroundColor: carColor,
        transform: 'translateZ(30px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
      },
      cabin: {
        position: 'absolute',
        width: '120px',
        height: '50px',
        borderRadius: '12px 12px 5px 5px',
        backgroundColor: carColor,
        transform: 'translateX(0px) translateY(-30px) translateZ(30px)',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      },
      window: {
        position: 'absolute',
        width: '90px',
        height: '30px',
        borderRadius: '5px',
        backgroundColor: '#333',
        transform: 'translateX(15px) translateY(5px) translateZ(2px)',
        opacity: '0.8'
      },
      wheel1: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#333',
        transform: 'translateX(-60px) translateY(40px) translateZ(30px) rotateY(90deg)',
        boxShadow: 'inset 0 0 0 5px #222, inset 0 0 0 10px #111'
      },
      wheel2: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#333',
        transform: 'translateX(60px) translateY(40px) translateZ(30px) rotateY(90deg)',
        boxShadow: 'inset 0 0 0 5px #222, inset 0 0 0 10px #111'
      },
      wheel3: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#333',
        transform: 'translateX(-60px) translateY(40px) translateZ(-30px) rotateY(90deg)',
        boxShadow: 'inset 0 0 0 5px #222, inset 0 0 0 10px #111'
      },
      wheel4: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#333',
        transform: 'translateX(60px) translateY(40px) translateZ(-30px) rotateY(90deg)',
        boxShadow: 'inset 0 0 0 5px #222, inset 0 0 0 10px #111'
      },
      headlight1: {
        position: 'absolute',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: 'yellow',
        boxShadow: '0 0 10px 5px rgba(255, 255, 100, 0.5)',
        transform: 'translateX(-85px) translateY(15px) translateZ(20px)'
      },
      headlight2: {
        position: 'absolute',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: 'yellow',
        boxShadow: '0 0 10px 5px rgba(255, 255, 100, 0.5)',
        transform: 'translateX(-85px) translateY(15px) translateZ(-20px)'
      },
      ground: {
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        transform: 'translateX(-200px) translateY(70px) translateZ(-200px) rotateX(90deg)',
        boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.2)',
        opacity: '0.8'
      }
    };
  };
  
  const styles = getCarStyles();
  
  return (
    <div
      className={className}
      style={{ ...style, ...styles.scene }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div style={styles.car}>
        <div style={styles.ground}></div>
        <div style={styles.body}></div>
        <div style={styles.cabin}>
          <div style={styles.window}></div>
        </div>
        <div style={styles.wheel1}></div>
        <div style={styles.wheel2}></div>
        <div style={styles.wheel3}></div>
        <div style={styles.wheel4}></div>
        <div style={styles.headlight1}></div>
        <div style={styles.headlight2}></div>
      </div>
    </div>
  );
};

export default CSSCar;