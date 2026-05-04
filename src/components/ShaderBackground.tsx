import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import { useEffect, useState } from "react";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import React from "react";

function ShaderBackground() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 40);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className="opacity-0 transition-opacity duration-1000"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        // @ts-expect-error pointerEvents may not be typed, but we still need it to block interaction
        pointerEvents="none"
      >
      <ShaderGradient
        animate="on"
        control="props"
        hoverState="none"
        bgColor1="#000000"
        bgColor2="#000000"
        brightness={1.1}
        cAzimuthAngle={180}
        cDistance={3.9}
        cPolarAngle={115}
        cameraZoom={1}
        color1="#565657"
        color2="#fee8d5"
        color3="#000000"
        destination="onCanvas"
        embedMode="off"
        envPreset="city"
        fov={45}
        gizmoHelper="hide"
        grain="off"
        lightType="3d"
        pixelDensity={1}
        positionX={-0.5}
        positionY={0.1}
        positionZ={0}
        reflection={0.1}
        rotationX={0}
        rotationY={0}
        rotationZ={235}
        shader="defaults"
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.1}
        uFrequency={5.5}
        uSpeed={0.1}
        uStrength={2.4}
        uTime={0.2}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  </div>
  );
}

export default React.memo(ShaderBackground)