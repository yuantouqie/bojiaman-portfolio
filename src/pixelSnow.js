const defaultOptions = {
  color: "#b1cbdd",
  flakeSize: 0.011,
  minFlakeSize: 1.25,
  pixelResolution: 410,
  speed: 1.9,
  density: 0.6,
  direction: 130,
  brightness: 1.9,
  farPlane: 23
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(input) {
  const value = input.replace("#", "").trim();
  const normalized = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) return { r: 255, g: 255, b: 255 };
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

function createFlake(width, height, baseSpeed) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    drift: (Math.random() - 0.5) * 0.22,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.008 + Math.random() * 0.02,
    size: 0.55 + Math.random() * 1.8,
    speed: baseSpeed * (0.35 + Math.random() * 0.9),
    alpha: 0.12 + Math.random() * 0.88
  };
}

export function initPixelSnow(container, options = {}) {
  if (!container) return () => {};

  const settings = { ...defaultOptions, ...options };
  const canvas = document.createElement("canvas");
  canvas.className = "pixel-snow-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let alive = true;
  let flakes = [];
  let lastTime = performance.now();
  const baseColor = hexToRgb(settings.color);
  const directionRadians = (settings.direction * Math.PI) / 180;
  const windX = Math.cos(directionRadians);
  const windY = Math.sin(directionRadians);

  function buildFlakes() {
    const area = width * height;
    const densityFactor = clamp(settings.density, 0, 1);
    const targetCount = Math.max(24, Math.round((area / Math.max(1, settings.pixelResolution * settings.pixelResolution)) * 140 * densityFactor));
    flakes = Array.from({ length: targetCount }, () => createFlake(width, height, settings.speed));
  }

  function resize() {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    buildFlakes();
  }

  function respawn(flake, fromTop = false) {
    const margin = 24;
    flake.x = Math.random() * (width + margin * 2) - margin;
    flake.y = fromTop ? -margin : Math.random() * height;
    flake.z = Math.random();
    flake.drift = (Math.random() - 0.5) * 0.22;
    flake.wobble = Math.random() * Math.PI * 2;
    flake.wobbleSpeed = 0.008 + Math.random() * 0.02;
    flake.size = 0.55 + Math.random() * 1.8;
    flake.speed = settings.speed * (0.35 + Math.random() * 0.9);
    flake.alpha = 0.12 + Math.random() * 0.88;
  }

  function drawFlake(flake, time) {
    const depth = 1 - flake.z;
    const size = Math.max(settings.minFlakeSize, flake.size * (1 + depth * settings.flakeSize * 220));
    const speed = flake.speed * (0.55 + depth * 1.35);
    const wobble = Math.sin(time * flake.wobbleSpeed + flake.wobble) * 0.35;
    const dx = (windX * 0.72 + flake.drift + wobble) * speed;
    const dy = (windY * 0.72 + 0.22) * speed;
    flake.x += dx;
    flake.y += dy;

    const pixelX = Math.round(flake.x);
    const pixelY = Math.round(flake.y);
    const scale = Math.max(1, Math.round(size));
    const fade = clamp((settings.farPlane - depth * settings.farPlane) / settings.farPlane, 0.12, 1);
    const alpha = clamp(flake.alpha * settings.brightness * fade, 0, 1);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
    ctx.fillRect(pixelX, pixelY, scale, scale);
    if (scale > 1) {
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillRect(pixelX - 1, pixelY, 1, scale);
      ctx.fillRect(pixelX + scale, pixelY, 1, scale);
      ctx.fillRect(pixelX, pixelY - 1, scale, 1);
      ctx.fillRect(pixelX, pixelY + scale, scale, 1);
    }
    ctx.restore();

    if (flake.x > width + 32 || flake.y > height + 32) {
      respawn(flake, true);
    }
  }

  function frame(now) {
    if (!alive) return;
    const delta = Math.min(32, now - lastTime) / 16.6667;
    lastTime = now;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    for (const flake of flakes) {
      flake.x += 0.02 * delta;
      flake.y += 0.01 * delta;
      drawFlake(flake, now);
    }
    ctx.globalCompositeOperation = "source-over";
    raf = window.requestAnimationFrame(frame);
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(container);
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      lastTime = performance.now();
    }
  });

  resize();
  raf = window.requestAnimationFrame(frame);

  return () => {
    alive = false;
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    resizeObserver.disconnect();
    canvas.remove();
  };
}
