import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";
import DodgeChallenger from "./DodgeChallenger";
import ColorPicker from "./ColorPicker";

// Custom cursor component
function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);
  
  return null;
}

function CarShow({ carColor }) {
  return (
    <>
      <OrbitControls 
        target={[0, 0, 0]}
        maxPolarAngle={1.45}
        minDistance={4}
        maxDistance={6.5}
      />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <DodgeChallenger position={[0, 0, 0]} color={carColor} />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 1, 1]}
        intensity={0.2}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[1, 1, 1]}
        intensity={0.2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <FloatingGrid />
      <Rings />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  const [carColor, setCarColor] = useState('#FFFFFF');
  
  const handleColorChange = (section, colorHex) => {
    if (section === 'BODY COLOR') {
      setCarColor(colorHex);
    }
  };

  return (
    <>
      <CustomCursor />
      <ColorPicker onColorChange={handleColorChange} />
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow carColor={carColor} />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
