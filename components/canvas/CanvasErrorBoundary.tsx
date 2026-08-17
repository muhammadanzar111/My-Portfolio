"use client";

import { Component, ReactNode } from "react";

export class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // WebGL can fail to init on some devices/browsers (disabled hardware
    // acceleration, old GPUs, some mobile browsers). Fail silently rather
    // than taking down the whole page — the mesh-glow gradient behind it
    // is enough of a background on its own.
    console.warn("Particle field failed to render, falling back gracefully:", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
