"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function OnionScene() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="hero-art">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="onion-scene"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        src="/images/onion-studio.webp"
        width="1200"
        height="800"
        alt="A handmade layered onion, a little purple laptop and green building blocks on a yellow studio desk."
        fetchPriority="high"
      />
      <span className="art-note">a little idea, taking root</span>
      <button
        type="button"
        className="motion-control"
        aria-label={paused ? "Play scene animation" : "Pause scene animation"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}
