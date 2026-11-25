"use client";

// The hero's 3D layer, loaded lazily on capable desktops only (see Hero3D).
// A transparent canvas sits over the List to Quotation sheets. A top-down
// camera maps 1 world unit to 1 CSS pixel on the page plane (y = 0), so
// objects can be placed by measuring the DOM. The timeline in
// ListToQuotation drives it through events on the container:
//   l2q:play   reset: objects resting on the paper, no box, no stamp
//   l2q:stamp  the stamp presses onto the quotation (contact after STAMP_CONTACT s)
//   l2q:done   the objects drop into a delivery box

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { MathUtils, type Group, type PerspectiveCamera } from "three";
import { STAMP_CONTACT } from "./constants";
import { boxSlots, ChalkBox, Compass, DeliveryBox, Pencil, Register, RubberStamp } from "./models";


const BLEED = 56; // px the canvas extends past the container, so objects can overhang
const FOV = 24;
const BOX_SCALE = 0.78; // the packed box, kept small enough to leave the list readable

type Spot = { x: number; z: number };
type Layout = {
  w: number;
  h: number;
  register: Spot;
  pencil: Spot;
  chalk: Spot;
  compass: Spot;
  box: Spot;
  stamp: Spot;
};

function measure(container: HTMLElement, canvas: HTMLElement): Layout | null {
  const list = container.querySelector<HTMLElement>("[data-l2q-list]");
  const quote = container.querySelector<HTMLElement>("[data-l2q-sheet]");
  const stamp = container.querySelector<HTMLElement>("[data-l2q-stamp]");
  if (!list || !quote || !stamp) return null;
  const c = canvas.getBoundingClientRect();
  const l = list.getBoundingClientRect();
  const q = quote.getBoundingClientRect();
  const s = stamp.getBoundingClientRect();
  const at = (x: number, y: number): Spot => ({ x: x - c.left - c.width / 2, z: y - c.top - c.height / 2 });
  return {
    w: c.width,
    h: c.height,
    register: at(l.right - 26, l.top + 4),
    pencil: at(l.left + l.width / 2 + 6, l.bottom + 18),
    chalk: at(q.left + 44, q.bottom + 36),
    compass: at(l.left + 26, l.top - 6),
    box: at(l.left + l.width * 0.64, l.bottom + 50),
    stamp: at(s.left + s.width / 2, s.top + s.height / 2),
  };
}

const rest = {
  register: { rotY: -0.22 },
  pencil: { rotY: 0.07 },
  chalk: { rotY: -0.18 },
  compass: { rotY: -1.25 },
};

type Key = keyof typeof rest;

function Rig({ container }: { container: HTMLElement }) {
  const { camera, gl } = useThree();
  const [layout, setLayout] = useState<Layout | null>(null);
  const tilt = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const objects = {
    register: useRef<Group>(null),
    pencil: useRef<Group>(null),
    chalk: useRef<Group>(null),
    compass: useRef<Group>(null),
  };
  const box = useRef<Group>(null);
  const flaps = useRef<(Group | null)[]>([]);
  const stamp = useRef<Group>(null);
  const layoutRef = useRef<Layout | null>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  // Measure the page and fit the camera so the page plane maps 1:1 to pixels
  useEffect(() => {
    const update = () => {
      const next = measure(container, gl.domElement);
      if (!next) return;
      layoutRef.current = next;
      setLayout(next);
      const cam = camera as PerspectiveCamera;
      const height = next.h / 2 / Math.tan(MathUtils.degToRad(FOV / 2));
      cam.fov = FOV;
      cam.near = 20;
      cam.far = height * 2;
      cam.position.set(0, height, 0);
      cam.up.set(0, 0, -1);
      cam.lookAt(0, 0, 0);
      cam.updateProjectionMatrix();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, [camera, container, gl]);

  // Gentle tilt toward the mouse
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.current.x = MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
      pointer.current.y = MathUtils.clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [container]);

  useFrame((_, delta) => {
    const g = tilt.current;
    if (!g) return;
    const k = 1 - Math.pow(0.002, delta);
    g.rotation.x = MathUtils.lerp(g.rotation.x, pointer.current.y * 0.07, k);
    g.rotation.z = MathUtils.lerp(g.rotation.z, -pointer.current.x * 0.07, k);
  });

  // Timeline events from ListToQuotation
  useEffect(() => {
    if (!layout) return;

    const killAll = () => {
      timelines.current.forEach((t) => t.kill());
      timelines.current = [];
    };

    const reset = () => {
      const L = layoutRef.current;
      if (!L) return;
      killAll();
      (Object.keys(objects) as Key[]).forEach((key) => {
        const o = objects[key].current;
        if (!o) return;
        o.position.set(L[key].x, 0, L[key].z);
        o.rotation.set(0, rest[key].rotY, 0);
        o.scale.setScalar(1);
        o.visible = true;
      });
      if (box.current) {
        box.current.position.set(L.box.x, 0, L.box.z);
        box.current.scale.setScalar(0.001);
        box.current.visible = false;
      }
      if (stamp.current) stamp.current.visible = false;
    };

    const pressStamp = () => {
      const L = layoutRef.current;
      const s = stamp.current;
      if (!L || !s) return;
      s.visible = true;
      s.position.set(L.stamp.x + 170, 420, L.stamp.z - 140);
      s.rotation.set(0.25, 0, -0.3);
      s.scale.set(1, 1, 1);
      const tl = gsap.timeline();
      tl.to(s.position, { x: L.stamp.x, z: L.stamp.z, y: 70, duration: 0.28, ease: "power2.out" }, 0)
        .to(s.rotation, { x: 0, z: 0, duration: 0.28, ease: "power2.out" }, 0)
        .to(s.position, { y: 0, duration: STAMP_CONTACT - 0.28, ease: "power2.in" }, 0.28)
        .to(s.scale, { y: 0.9, duration: 0.06, yoyo: true, repeat: 1, ease: "power1.out" }, STAMP_CONTACT)
        .to(s.position, { y: 900, x: L.stamp.x + 220, z: L.stamp.z - 260, duration: 0.5, ease: "power2.in" }, STAMP_CONTACT + 0.18)
        .set(s, { visible: false });
      timelines.current.push(tl);
    };

    const pack = () => {
      const L = layoutRef.current;
      const b = box.current;
      if (!L || !b) return;
      b.visible = true;
      const tl = gsap.timeline();
      tl.fromTo(b.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: BOX_SCALE, y: BOX_SCALE, z: BOX_SCALE, duration: 0.45, ease: "back.out(1.8)" }, 0);
      (Object.keys(objects) as Key[]).forEach((key, i) => {
        const o = objects[key].current;
        if (!o) return;
        const slot = boxSlots[key];
        const t = 0.3 + i * 0.14;
        tl.to(o.position, { y: 150, duration: 0.3, ease: "power2.out" }, t)
          .to(o.position, { x: L.box.x + slot.x * BOX_SCALE, z: L.box.z + slot.z * BOX_SCALE, duration: 0.5, ease: "power2.inOut" }, t + 0.08)
          .to(o.rotation, { y: slot.rotY, duration: 0.5, ease: "power2.inOut" }, t + 0.08)
          .to(o.scale, { x: slot.scale * BOX_SCALE, y: slot.scale * BOX_SCALE, z: slot.scale * BOX_SCALE, duration: 0.5, ease: "power2.inOut" }, t + 0.08)
          .to(o.position, { y: 4 * BOX_SCALE, duration: 0.24, ease: "power2.in" }, t + 0.5);
      });
      // Flaps settle once everything is in
      flaps.current.forEach((f, i) => {
        if (!f) return;
        const axis = i < 2 ? "x" : "z";
        const from = f.rotation[axis];
        tl.fromTo(f.rotation, { [axis]: from * 1.6 }, { [axis]: from, duration: 0.35, ease: "back.out(2)" }, 1.25);
      });
      timelines.current.push(tl);
    };

    reset();
    container.addEventListener("l2q:play", reset);
    container.addEventListener("l2q:stamp", pressStamp);
    container.addEventListener("l2q:done", pack);

    // Listeners are attached: let the hero timeline start
    if (container.dataset.threeD !== "on") {
      container.dataset.threeD = "on";
      container.dispatchEvent(new Event("ss3d:ready"));
    }

    return () => {
      container.removeEventListener("l2q:play", reset);
      container.removeEventListener("l2q:stamp", pressStamp);
      container.removeEventListener("l2q:done", pack);
      killAll();
    };
    // objects refs are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, container]);

  if (!layout) return null;
  const shadowHalfW = layout.w / 2;
  const shadowHalfH = layout.h / 2;

  return (
    <>
      <ambientLight intensity={1.3} />
      <hemisphereLight args={["#ffffff", "#e8e1cf", 0.6]} />
      <directionalLight
        position={[-260, 900, -380]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={6}
        shadow-bias={-0.0004}
        shadow-camera-left={-shadowHalfW}
        shadow-camera-right={shadowHalfW}
        shadow-camera-top={shadowHalfH}
        shadow-camera-bottom={-shadowHalfH}
        shadow-camera-near={100}
        shadow-camera-far={2400}
      />
      {/* Transparent plane that only shows shadows on the HTML paper below */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[layout.w, layout.h]} />
        <shadowMaterial opacity={0.16} />
      </mesh>

      <group ref={tilt}>
        <Register ref={objects.register} />
        <Pencil ref={objects.pencil} />
        <ChalkBox ref={objects.chalk} />
        <Compass ref={objects.compass} />
        <DeliveryBox ref={box} flapRefs={flaps} visible={false} />
      </group>
      <RubberStamp ref={stamp} visible={false} />
    </>
  );
}

export default function HeroScene({ container }: { container: HTMLElement }) {
  const [active, setActive] = useState(true);

  // Stop rendering while the hero is off screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(container);
    return () => io.disconnect();
  }, [container]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: FOV, position: [0, 1000, 0], near: 20, far: 4000 }}
      style={{ position: "absolute", inset: -BLEED, width: "auto", height: "auto", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Rig container={container} />
    </Canvas>
  );
}
