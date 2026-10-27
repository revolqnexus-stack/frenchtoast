"use client";
import { useEffect, useRef } from "react";

const DESKTOP = "/hero/hero video.mp4";
const MOBILE = "/hero/hero phone.mp4";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      const v = ref.current;
      if (!v) return;
      const src = mq.matches ? MOBILE : DESKTOP;
      if (!v.src.endsWith(src)) {
        v.src = src;
        v.load();
        v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video"
      muted
      loop
      playsInline
      autoPlay
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
