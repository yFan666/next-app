"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./not-found.module.css";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const set = (x: number, y: number) => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const reset = () => {
      const rect = el.getBoundingClientRect();
      set(rect.width * 0.5, rect.height * 0.38);
    };

    reset();
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.scene} relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 text-white`}
      onPointerMove={(e) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      onPointerLeave={() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${rect.width * 0.5}px`);
        el.style.setProperty("--my", `${rect.height * 0.38}px`);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={styles.cursorGlow} />
        <div className={styles.grain} />
        <div className={styles.vignette} />
        <div className={styles.portal} />
        <div
          className={`absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_62%)] blur-2xl ${styles.orbA}`}
        />
        <div
          className={`absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_64%)] blur-2xl ${styles.orbB}`}
        />
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-40 ${styles.scanLine}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_center,black_34%,transparent_72%)] opacity-50" />
      </div>

      <main className="relative w-full max-w-2xl">
        <div
          className={`${styles.card} rounded-2xl border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_rgba(0,0,0,0.70)] backdrop-blur`}
        >
          <div className={`${styles.cardInner} flex flex-col items-start gap-6`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium tracking-wide text-white/70">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 ${styles.ping}`}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-200" />
              </span>
              ROUTE_NOT_FOUND
            </div>

            <div className="flex flex-col gap-3">
              <span
                className={`${styles.glitch} text-7xl font-semibold leading-none tracking-tight sm:text-8xl`}
                data-text="404"
              >
                404
              </span>
              <h1 className="text-xl font-medium text-white/90 sm:text-2xl">
                你想找的页面不存在
              </h1>
              <p className="max-w-prose text-sm leading-6 text-white/60 sm:text-base">
                可能是链接过期、路径拼错，或者它已经被传送到另一个宇宙了。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                回到首页
              </Link>
              <button
                type="button"
                onClick={() => history.back()}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/0 px-5 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/15"
              >
                返回上一页
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_64%)] blur-xl" />
      </main>
    </div>
  );
}
