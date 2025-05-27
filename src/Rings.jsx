import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings() {
  const itemsRef = useRef([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      mesh.position.set(0, 0, -z);
      
      // Set fixed scale of 1 for all rings
      mesh.scale.set(1, 1, 1);

      // Always use white color for all rings
      mesh.material.emissive = new Color(1, 1, 1);
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[1, 1, 1]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
}