import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Sparkles } from "@react-three/drei";
function MovingLight() {
  const light = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    light.current.position.x = Math.sin(t) * 8;
    light.current.position.y = Math.cos(t * 0.7) * 5;
    light.current.position.z = 5;
  });

  return (
    <pointLight
      ref={light}
      intensity={200}
      color="#ff0000"
    />
  );
}
export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <color attach="background" args={["#050505"]} />

        <ambientLight intensity={2.5} color="#FFD700" />
        <MovingLight />
        <pointLight position={[0, 0, 5]} intensity={200} color="blue" />

        <pointLight
  position={[0, 0, 5]}
  intensity={20}
  color="#FFD700"
/>

        <pointLight
  position={[0, 5, -5]}
  intensity={12}
  color="#FFA500"
/>

        <Sparkles
  count={1500}
  scale={[30, 20, 10]}
  size={25}
  speed={0.8}
  opacity={1}
  color="#FFD700"
/>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>
    </div>
  );
}