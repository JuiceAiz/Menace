"use client";

import { useEffect } from "react";

export function CursorTrail() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const count = 7;
    const host = document.createElement("div");
    host.setAttribute("aria-hidden", "true");
    Object.assign(host.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "70",
      overflow: "hidden",
    });

    const points = Array.from({ length: count }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      node: document.createElement("span"),
    }));

    for (const point of points) {
      Object.assign(point.node.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "7px",
        height: "7px",
        borderRadius: "999px",
        background: "var(--purple)",
        boxShadow: "0 0 10px rgba(139,77,255,0.9)",
        willChange: "transform",
      });
      host.appendChild(point.node);
    }
    document.body.appendChild(host);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let frame = 0;
    let running = false;
    let lastMove = 0;

    const tick = () => {
      let leadX = mouseX;
      let leadY = mouseY;
      points.forEach((point, index) => {
        point.x += (leadX - point.x) * 0.32;
        point.y += (leadY - point.y) * 0.32;
        leadX = point.x;
        leadY = point.y;
        const scale = 1 - index / (count + 2);
        const idle = performance.now() - lastMove > 240;
        point.node.style.transform = `translate3d(${point.x - 3.5}px, ${point.y - 3.5}px, 0) scale(${scale})`;
        point.node.style.opacity = String(idle ? 0 : 0.5 * (1 - index / count));
      });
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      lastMove = performance.now();
      if (!running) {
        running = true;
        tick();
      }
    };

    const onLeave = () => {
      lastMove = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      host.remove();
    };
  }, []);

  return null;
}
