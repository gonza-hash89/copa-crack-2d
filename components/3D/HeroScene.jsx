'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

function FootballField() {
  const fieldRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (fieldRef.current) {
      const targetX = mouse.x * 0.08;
      const targetY = mouse.y * 0.05;
      const scrollRotation = scrollY * Math.PI * 0.15;
      
      fieldRef.current.rotation.x += (targetY - fieldRef.current.rotation.x) * 0.015;
      fieldRef.current.rotation.z += (targetX * 0.3 - fieldRef.current.rotation.z) * 0.015;
      fieldRef.current.rotation.y = scrollRotation * 0.5;
    }
  });

  return (
    <group ref={fieldRef} position={[0, 0, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={[50, 34, 1]}>
        <planeGeometry args={[1, 1, 100, 68]} />
        <meshStandardMaterial
          color="#1a4d1a"
          roughness={0.85}
          metalness={0.02}
          side={2}
        />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={[50, 34, 1]}>
        <planeGeometry args={[1, 1, 100, 68]} />
        <meshBasicMaterial
          color="#1f5f1f"
          transparent
          opacity={0.15}
          side={2}
          depthWrite={false}
        />
      </mesh>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} scale={[50, 34, 1]}>
        <planeGeometry args={[1, 1, 100, 68]} />
        <meshBasicMaterial
          color="#2a7a2a"
          transparent
          opacity={0.1}
          side={2}
          depthWrite={false}
        />
      </mesh>

      <FieldLines />
      
      <StadiumLights />
      
      <AmbientFog />
    </group>
  );
}

function FieldLines() {
  const lineMaterial = (opacity = 0.9) => ({
    color: "#ffffff",
    transparent: true,
    opacity,
    depthWrite: false,
    side: 2,
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <mesh>
        <planeGeometry args={[50, 0.08]} />
        <meshBasicMaterial {...lineMaterial(0.95)} />
      </mesh>

      <mesh position={[0, 17, 0]} scale={[0.5, 1, 1]}>
        <torusGeometry args={[8.5, 0.04, 8, 64]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[0, 17, 0]} scale={[0.02, 1, 1]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshBasicMaterial {...lineMaterial(0.95)} />
      </mesh>

      <mesh position={[-22.5, 17, 0]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, 17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[40.3, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, 17, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[22.5, 17, 0]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, 17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[40.3, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, 17, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[-22.5, 17, 0]} scale={[0.5, 1, 1]}>
        <torusGeometry args={[9.15, 0.04, 8, 64, Math.PI]} />
        <meshBasicMaterial {...lineMaterial(0.85)} />
      </mesh>
      <mesh position={[22.5, 17, 0]} scale={[0.5, 1, 1]}>
        <torusGeometry args={[9.15, 0.04, 8, 64, Math.PI]} />
        <meshBasicMaterial {...lineMaterial(0.85)} />
      </mesh>

      <mesh position={[-22.5, 11, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, 11, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[-22.5, 5.5, 0]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, 5.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[18.32, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, 5.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[22.5, 5.5, 0]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, 5.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[18.32, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, 5.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[-22.5, 0, 0]} scale={[0.5, 1, 1]}>
        <torusGeometry args={[9.15, 0.04, 8, 64, Math.PI]} />
        <meshBasicMaterial {...lineMaterial(0.85)} />
      </mesh>
      <mesh position={[22.5, 0, 0]} scale={[0.5, 1, 1]}>
        <torusGeometry args={[9.15, 0.04, 8, 64, Math.PI]} />
        <meshBasicMaterial {...lineMaterial(0.85)} />
      </mesh>

      <mesh position={[-22.5, -5.5, 0]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, -5.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[18.32, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, -5.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[22.5, -5.5, 0]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, -5.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[18.32, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, -5.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[5.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[-22.5, -11, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, -11, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 32]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[-22.5, -17, 0]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, -17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[40.3, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[-22.5, -17, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>

      <mesh position={[22.5, -17, 0]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, -17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[40.3, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
      <mesh position={[22.5, -17, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <planeGeometry args={[16.5, 0.08, 1, 1]} />
        <meshBasicMaterial {...lineMaterial(0.9)} />
      </mesh>
    </group>
  );
}

function StadiumLights() {
  const lightPositions = [
    { pos: [-25, 25, -20], color: "#fff8e7", intensity: 180 },
    { pos: [25, 25, -20], color: "#fff8e7", intensity: 180 },
    { pos: [-25, 25, 20], color: "#fff8e7", intensity: 180 },
    { pos: [25, 25, 20], color: "#fff8e7", intensity: 180 },
    { pos: [-15, 22, 0], color: "#ffd700", intensity: 120 },
    { pos: [15, 22, 0], color: "#ffd700", intensity: 120 },
  ];

  return (
    <>
      {lightPositions.map((light, i) => (
        <spotLight
          key={i}
          position={light.pos}
          target={[0, 0, 0]}
          angle={0.45}
          penumbra={0.4}
          intensity={light.intensity}
          color={light.color}
          decay={1.8}
          distance={60}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={5}
          shadow-camera-far={60}
          shadow-bias={-0.0003}
          shadow-radius={3}
        />
      ))}
      
      <ambientLight color="#1a2a1a" intensity={0.4} />
      <hemisphereLight groundColor="#0d1a0d" skyColor="#2a4a2a" intensity={0.3} />
      
      {lightPositions.map((light, i) => (
        <mesh key={`pole-${i}`} position={[light.pos[0], light.pos[1] / 2, light.pos[2]]} scale={[0.15, light.pos[1] / 2, 0.15]}>
          <cylinderGeometry args={[1, 1, 1, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      
      {lightPositions.map((light, i) => (
        <mesh key={`light-head-${i}`} position={light.pos} scale={0.8}>
          <cylinderGeometry args={[0.5, 0.8, 0.6, 8]} />
          <meshStandardMaterial 
            color={light.color} 
            emissive={light.color} 
            emissiveIntensity={2} 
            metalness={0.1} 
            roughness={0.3} 
          />
        </mesh>
      ))}
    </>
  );
}

function AmbientFog() {
  return (
    <>
      <fog attach="fog" args={["#0a1a0a", 15, 80]} />
      <mesh position={[0, 0.5, 0]} scale={[60, 1, 40]}>
        <planeGeometry args={[1, 1, 2, 2]} />
        <meshBasicMaterial
          color="#0a1a0a"
          transparent
          opacity={0.3}
          depthWrite={false}
          side={2}
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <canvas
      className="fixed inset-0 z-0"
      style={{ 
        touchAction: 'none',
        display: 'block',
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <color attach="background" args={["#081408"]} />
      
      <FootballField />
    </canvas>
  );
}