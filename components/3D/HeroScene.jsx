'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Html, RoundedBox, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

function Football({ position, rotation, onLoad }) {
  const groupRef = useRef();
  const ballRef = useRef();
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

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = mouse.x * 0.15;
      const targetY = mouse.y * 0.15;
      const scrollRotation = scrollY * Math.PI * 0.5;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.z += delta * 0.15;
      
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;
      groupRef.current.position.x = position[0] + Math.sin(state.clock.getElapsedTime() * 0.7) * 0.03;
    }
    if (ballRef.current) {
      ballRef.current.rotation.y += delta * 0.3;
      ballRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh ref={ballRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0, -1.25, 0]} scale={[1.1, 0.15, 1.1]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial
          color="#0f0f1a"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.4}
        scale={4}
        blur={2}
        color="#ffd700"
      />

      <Html
        position={[0, 2.8, 0]}
        transform
        sprites
        style={{
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            fontFamily: 'Geist, system-ui, sans-serif',
            letterSpacing: '0.15em',
            background: 'linear-gradient(135deg, #fff8e7 0%, #ffd700 35%, #e6c200 70%, #b89600 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 8px 24px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))',
            textShadow: '0 2px 0 rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          COPA <span style={{ color: '#ffd700' }}>CRACK</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '0.5rem',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 600,
            color: '#c9b896',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          OFICIAL
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
            color: '#ffd700',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>🏆</span>
          Próximo Campeonato · Enero 2027 — Lima, Perú
        </motion.div>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51944897167?text=Hola,%20deseo%20inscribir%20a%20mi%20equipo%20en%20la%20Copa%20Crack%20Oficial%20(Enero%202027)"
          target="_blank"
          rel="noopener"
          style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2.5rem',
            borderRadius: '9999px',
            background: 'linear-gradient(180deg, #25d366 0%, #1db856 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.125rem',
            textDecoration: 'none',
            boxShadow: '0 6px 0 0 #16a34a, 0 12px 30px rgba(37, 211, 102, 0.4), 0 0 0 1px rgba(37, 211, 102, 0.3) inset, 0 0 30px rgba(37, 211, 102, 0.2)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M20.52 3.48A12 12 0 0 1 12 21.6c-1.7 0-3.32-.34-4.8-.96L2 22l1.44-4.68A12 12 0 0 1 2.4 3.6a12 12 0 0 1 18.12 0zM8 12a4 4 0 0 0 4 4 4 4 0 0 0 4-4V8a4 4 0 0 0-4-4 4 4 0 0 0-4 4v4z" />
          </svg>
          Inscribir por WhatsApp
        </motion.a>
      </Html>
    </group>
  );
}

function StadiumLights() {
  return (
    <>
      <pointLight position={[0, 15, 0]} intensity={200} color="#fff8e7" decay={1.5} distance={50} />
      <spotLight
        position={[0, 12, 0]}
        target={[0, 0, 0]}
        angle={0.35}
        penumbra={0.5}
        intensity={300}
        color="#ffd700"
        decay={1.5}
        distance={40}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0005}
        shadow-radius={4}
      />
      <spotLight
        position={[-8, 10, -8]}
        target={[0, 0, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={150}
        color="#00b4ff"
        decay={1.5}
        distance={40}
        castShadow
      />
      <spotLight
        position={[8, 10, 8]}
        target={[0, 0, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={150}
        color="#ff6b35"
        decay={1.5}
        distance={40}
        castShadow
      />
      <ambientLight color="#1a1a2e" intensity={0.3} />
      <hemisphereLight groundColor="#0a0f1a" skyColor="#ffd700" intensity={0.4} />
    </>
  );
}

function Podium() {
  return (
    <group>
      <mesh
        receiveShadow
        position={[0, -1.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8, 8, 1]}
      >
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial
          color="#0a0f1a"
          metalness={0.2}
          roughness={0.6}
          side={2}
        />
      </mesh>
      <mesh
        receiveShadow
        position={[0, -1.45, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[7, 7, 1]}
      >
        <ringGeometry args={[0, 0.95, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.15}
          side={2}
        />
      </mesh>
      <mesh
        receiveShadow
        position={[0, -1.48, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[5, 5, 1]}
      >
        <ringGeometry args={[0, 0.95, 64]} />
        <meshBasicMaterial
          color="#00b4ff"
          transparent
          opacity={0.08}
          side={2}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef();
  const positionsRef = useRef();
  const count = 2000;

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const baseY = positionsRef.current[i3 + 1];
        
        positions[i3 + 1] = baseY + Math.sin(time * 0.5 + i * 0.1) * 0.02;
        positions[i3] += Math.sin(time * 0.3 + i * 0.05) * 0.001;
        positions[i3 + 2] += Math.cos(time * 0.3 + i * 0.05) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={new Float32Array(
            Array.from({ length: count * 3 }, (_, i) => {
              if (i % 3 === 0) return (Math.random() - 0.5) * 60;
              if (i % 3 === 1) return Math.random() * 30 - 5;
              return (Math.random() - 0.5) * 60;
            })
          )}
          usage={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd700"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={2}
      />
    </points>
  );
}

function GlowOrbs() {
  return (
    <>
      <mesh position={[-15, 5, -10]} scale={12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#00b4ff"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={2}
        />
      </mesh>
      <mesh position={[15, 8, 10]} scale={15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={2}
        />
      </mesh>
      <mesh position={[0, 12, 0]} scale={20}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={2}
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
      <color attach="background" args={["#020408"]} />
      <fog attach="fog" args={["#020408", 5, 60]} />
      
      <StadiumLights />
      <GlowOrbs />
      <ParticleField />
      <Podium />
      <Football position={[0, 0, 0]} rotation={[0, 0, 0]} />
      
      <Html position={[0, -4, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ 
          textAlign: 'center', 
          color: '#ffd700', 
          opacity: 0.6,
          animation: 'bounce 2s ease-in-out infinite',
          fontSize: '2rem',
        }}>
          ↓
        </div>
      </Html>
    </canvas>
  );
}