import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleNetworkProps {
  count?: number;
  connectionDistance?: number;
}

function Particles({ count = 25, connectionDistance = 150 }: ParticleNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();

  // Generate initial particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions within viewport
      positions[i * 3] = (Math.random() - 0.5) * viewport.width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, velocities };
  }, [count, viewport.width, viewport.height]);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * count * 6); // Max possible connections
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;

    // Update particle positions
    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Add velocity
      positions[idx] += particles.velocities[idx] * 60 * delta;
      positions[idx + 1] += particles.velocities[idx + 1] * 60 * delta;
      positions[idx + 2] += particles.velocities[idx + 2] * 60 * delta;

      // Mouse repulsion
      const mouseWorldPos = new THREE.Vector3(
        mouseRef.current.x * viewport.width / 2,
        mouseRef.current.y * viewport.height / 2,
        0
      );

      const particlePos = new THREE.Vector3(
        positions[idx],
        positions[idx + 1],
        positions[idx + 2]
      );

      const distance = particlePos.distanceTo(mouseWorldPos);
      if (distance < 2) {
        const repulsion = particlePos.sub(mouseWorldPos).normalize().multiplyScalar(0.02);
        positions[idx] += repulsion.x * (2 - distance);
        positions[idx + 1] += repulsion.y * (2 - distance);
      }

      // Boundary check
      if (Math.abs(positions[idx]) > viewport.width / 2) {
        particles.velocities[idx] *= -1;
        positions[idx] = Math.sign(positions[idx]) * viewport.width / 2;
      }
      if (Math.abs(positions[idx + 1]) > viewport.height / 2) {
        particles.velocities[idx + 1] *= -1;
        positions[idx + 1] = Math.sign(positions[idx + 1]) * viewport.height / 2;
      }
      if (Math.abs(positions[idx + 2]) > 2) {
        particles.velocities[idx + 2] *= -1;
        positions[idx + 2] = Math.sign(positions[idx + 2]) * 2;
      }

      // Calculate connections
      for (let j = i + 1; j < count; j++) {
        const jdx = j * 3;
        const dx = positions[idx] - positions[jdx];
        const dy = positions[idx + 1] - positions[jdx + 1];
        const dz = positions[idx + 2] - positions[jdx + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Convert to pixels for distance check
        const screenDistance = distance * 100;

        if (screenDistance < connectionDistance) {
          // Add line between particles
          linePositions[lineIndex++] = positions[idx];
          linePositions[lineIndex++] = positions[idx + 1];
          linePositions[lineIndex++] = positions[idx + 2];
          linePositions[lineIndex++] = positions[jdx];
          linePositions[lineIndex++] = positions[jdx + 1];
          linePositions[lineIndex++] = positions[jdx + 2];
        }
      }
    }

    // Update geometries
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Particles */}
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={4}
          color="#00ffff"
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export function ParticleNetwork({ count, connectionDistance }: ParticleNetworkProps) {
  console.log('ParticleNetwork rendering with:', { count, connectionDistance });

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        dpr={[1, 2]}
      >
        <Particles count={count} connectionDistance={connectionDistance} />
      </Canvas>
    </div>
  );
}

export default ParticleNetwork;