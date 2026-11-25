"use client";

// Low-poly school objects for the hero, built from primitives in code, so
// there are no model files to download. Units are CSS pixels; every model
// rests on y = 0 so it sits on the page plane.

import { RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { forwardRef } from "react";
import type { Group } from "three";

const palette = {
  board: "#1F4FB5",
  boardDark: "#163B8A",
  pencil: "#F5872A",
  red: "#C2410C",
  paper: "#F5F8FD",
  white: "#FBFAF6",
  ink: "#0E1F3D",
  wood: "#E3C49A",
  woodDark: "#8A5A3C",
  metal: "#A3ACB6",
  pink: "#E59A93",
  card: "#C9A06B",
  cardInside: "#AF8654",
};

type Props = ThreeElements["group"];

/** Hard-cover register, lying flat. 110 x 16 x 80. */
export const Register = forwardRef<Group, Props>(function Register(props, ref) {
  return (
    <group ref={ref} {...props}>
      {/* Pages */}
      <mesh position={[2, 8, 0]} castShadow>
        <boxGeometry args={[104, 13, 76]} />
        <meshStandardMaterial color={palette.white} roughness={0.9} />
      </mesh>
      {/* Covers and spine */}
      <RoundedBox args={[110, 2.4, 80]} radius={1} position={[0, 15, 0]} castShadow>
        <meshStandardMaterial color={palette.board} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[110, 2.4, 80]} radius={1} position={[0, 1.2, 0]} castShadow>
        <meshStandardMaterial color={palette.board} roughness={0.7} />
      </RoundedBox>
      <mesh position={[-54, 8, 0]} castShadow>
        <boxGeometry args={[4, 16, 80]} />
        <meshStandardMaterial color={palette.boardDark} roughness={0.7} />
      </mesh>
      {/* Label */}
      <mesh position={[6, 16.3, -8]}>
        <boxGeometry args={[56, 0.4, 22]} />
        <meshStandardMaterial color={palette.white} roughness={0.95} />
      </mesh>
      <mesh position={[6, 16.6, -8]}>
        <boxGeometry args={[40, 0.3, 2.5]} />
        <meshStandardMaterial color={palette.ink} roughness={0.9} />
      </mesh>
    </group>
  );
});

/** Hexagonal pencil along the x axis, tip at -x. 150 long. */
export const Pencil = forwardRef<Group, Props>(function Pencil(props, ref) {
  const r = 5;
  return (
    <group ref={ref} {...props}>
      <group position={[0, r, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]}>
        {/* Body */}
        <mesh position={[0, 4, 0]} castShadow>
          <cylinderGeometry args={[r, r, 108, 6]} />
          <meshStandardMaterial color={palette.pencil} roughness={0.55} flatShading />
        </mesh>
        {/* Sharpened wood and lead */}
        <mesh position={[0, 58 + 8, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[r, 16, 6]} />
          <meshStandardMaterial color={palette.wood} roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0, 58 + 15, 0]}>
          <coneGeometry args={[1.7, 5, 6]} />
          <meshStandardMaterial color={palette.ink} roughness={0.5} />
        </mesh>
        {/* Ferrule and eraser */}
        <mesh position={[0, -54, 0]} castShadow>
          <cylinderGeometry args={[r + 0.3, r + 0.3, 9, 12]} />
          <meshStandardMaterial color={palette.metal} metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, -63, 0]} castShadow>
          <cylinderGeometry args={[r, r, 9, 12]} />
          <meshStandardMaterial color={palette.pink} roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
});

/** Box of chalk with a few sticks on top. 64 x 26 x 42. */
export const ChalkBox = forwardRef<Group, Props>(function ChalkBox(props, ref) {
  const sticks = [
    { x: -14, z: -6, color: palette.white, rot: 0.1 },
    { x: 2, z: 4, color: palette.pencil, rot: -0.15 },
    { x: 14, z: -3, color: palette.pink, rot: 0.25 },
  ];
  return (
    <group ref={ref} {...props}>
      <RoundedBox args={[64, 24, 42]} radius={2} position={[0, 12, 0]} castShadow>
        <meshStandardMaterial color={palette.paper} roughness={0.9} />
      </RoundedBox>
      {/* Printed band */}
      <mesh position={[0, 12, 0]}>
        <boxGeometry args={[64.6, 8, 42.6]} />
        <meshStandardMaterial color={palette.board} roughness={0.8} />
      </mesh>
      {sticks.map((s) => (
        <mesh key={s.color} position={[s.x, 27.5, s.z]} rotation={[Math.PI / 2, 0, s.rot]} castShadow>
          <cylinderGeometry args={[3.2, 3.2, 34, 10]} />
          <meshStandardMaterial color={s.color} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
});

/** Geometry compass lying flat, legs along +z. About 74 long. */
export const Compass = forwardRef<Group, Props>(function Compass(props, ref) {
  const leg = (side: 1 | -1) => (
    <group rotation={[0, side * 0.2, 0]}>
      <mesh position={[0, 3, 34]} castShadow>
        <boxGeometry args={[4, 3, 64]} />
        <meshStandardMaterial color={palette.metal} metalness={0.75} roughness={0.3} />
      </mesh>
      {side === 1 ? (
        <mesh position={[0, 3, 70]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.4, 9, 8]} />
          <meshStandardMaterial color={palette.metal} metalness={0.8} roughness={0.25} />
        </mesh>
      ) : (
        <mesh position={[0, 3.5, 69]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[2.6, 2.6, 10, 6]} />
          <meshStandardMaterial color={palette.pencil} roughness={0.6} />
        </mesh>
      )}
    </group>
  );
  return (
    <group ref={ref} {...props}>
      {leg(1)}
      {leg(-1)}
      {/* Hinge and grip */}
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[6, 6, 8, 16]} />
        <meshStandardMaterial color={palette.metal} metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4, -9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.2, 2.2, 12, 10]} />
        <meshStandardMaterial color={palette.ink} roughness={0.5} />
      </mesh>
    </group>
  );
});

export type DeliveryBoxRefs = { flaps: (Group | null)[] };

/** Open cardboard delivery box. Outer 150 x 60 x 110, floor at y = 3. */
export const DeliveryBox = forwardRef<Group, Props & { flapRefs?: React.MutableRefObject<(Group | null)[]> }>(
  function DeliveryBox({ flapRefs, ...props }, ref) {
    const W = 150;
    const D = 110;
    const H = 60;
    const t = 3;
    const card = <meshStandardMaterial color={palette.card} roughness={0.95} />;
    // Flap hinges: [x, z, length, depth, axis, direction]
    const flaps: { pos: [number, number, number]; size: [number, number, number]; rot: "x" | "z"; dir: 1 | -1 }[] = [
      { pos: [0, H, -D / 2], size: [W, 2, 46], rot: "x", dir: -1 },
      { pos: [0, H, D / 2], size: [W, 2, 46], rot: "x", dir: 1 },
      { pos: [-W / 2, H, 0], size: [36, 2, D - 6], rot: "z", dir: 1 },
      { pos: [W / 2, H, 0], size: [36, 2, D - 6], rot: "z", dir: -1 },
    ];
    return (
      <group ref={ref} {...props}>
        <mesh position={[0, t / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[W, t, D]} />
          <meshStandardMaterial color={palette.cardInside} roughness={0.95} />
        </mesh>
        <mesh position={[0, H / 2, -D / 2 + t / 2]} castShadow receiveShadow>
          <boxGeometry args={[W, H, t]} />
          {card}
        </mesh>
        <mesh position={[0, H / 2, D / 2 - t / 2]} castShadow receiveShadow>
          <boxGeometry args={[W, H, t]} />
          {card}
        </mesh>
        <mesh position={[-W / 2 + t / 2, H / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[t, H, D - 2 * t]} />
          {card}
        </mesh>
        <mesh position={[W / 2 - t / 2, H / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[t, H, D - 2 * t]} />
          {card}
        </mesh>
        {/* Label on the front */}
        <mesh position={[30, H / 2, D / 2 + 0.2]}>
          <boxGeometry args={[52, 22, 0.4]} />
          <meshStandardMaterial color={palette.white} roughness={0.9} />
        </mesh>
        <mesh position={[30, H / 2 + 4, D / 2 + 0.5]}>
          <boxGeometry args={[40, 4, 0.3]} />
          <meshStandardMaterial color={palette.board} roughness={0.9} />
        </mesh>
        {/* Flaps, hinged on the top edges and folded outwards */}
        {flaps.map((f, i) => (
          <group
            key={i}
            position={f.pos}
            rotation={f.rot === "x" ? [-f.dir * 0.45, 0, 0] : [0, 0, -f.dir * 0.45]}
            ref={(g) => {
              if (flapRefs) flapRefs.current[i] = g;
            }}
          >
            <mesh
              position={
                f.rot === "x" ? [0, 0, (f.dir * f.size[2]) / 2] : [(-f.dir * f.size[0]) / 2, 0, 0]
              }
              castShadow
              receiveShadow
            >
              <boxGeometry args={f.size} />
              {card}
            </mesh>
          </group>
        ))}
      </group>
    );
  },
);

/** Round rubber stamp: red pad, wooden mount, turned handle. Pad face at y = 0. */
export const RubberStamp = forwardRef<Group, Props>(function RubberStamp(props, ref) {
  return (
    <group ref={ref} {...props}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[54, 54, 3, 48]} />
        <meshStandardMaterial color={palette.red} roughness={0.8} />
      </mesh>
      <mesh position={[0, 10, 0]} castShadow>
        <cylinderGeometry args={[57, 57, 14, 48]} />
        <meshStandardMaterial color={palette.woodDark} roughness={0.6} />
      </mesh>
      <mesh position={[0, 20, 0]} castShadow>
        <cylinderGeometry args={[20, 30, 8, 32]} />
        <meshStandardMaterial color={palette.woodDark} roughness={0.6} />
      </mesh>
      <mesh position={[0, 46, 0]} castShadow>
        <cylinderGeometry args={[11, 15, 46, 24]} />
        <meshStandardMaterial color={palette.wood} roughness={0.55} />
      </mesh>
      <mesh position={[0, 80, 0]} castShadow>
        <sphereGeometry args={[19, 24, 16]} />
        <meshStandardMaterial color={palette.wood} roughness={0.55} />
      </mesh>
    </group>
  );
});

/** Where each object sits once packed, relative to the box centre. */
export const boxSlots = {
  register: { x: -28, z: -16, rotY: 0.08, scale: 0.62 },
  pencil: { x: -6, z: 32, rotY: -0.12, scale: 0.6 },
  chalk: { x: 42, z: 20, rotY: 0.3, scale: 0.7 },
  compass: { x: 46, z: -34, rotY: 1.2, scale: 0.62 },
} as const;
