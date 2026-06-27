const defaultOptions = {
  color: "#b8f0d1",
  shineColor: "#ffffff",
  speed: 2.8,
  delay: 0,
  spread: 92,
  direction: "left",
  yoyo: true,
  pauseOnHover: true
};

export function applyShinyText(selector, options = {}) {
  const settings = { ...defaultOptions, ...options };
  const nodes = document.querySelectorAll(selector);

  nodes.forEach((node, index) => {
    node.classList.add("shiny-text");
    if (settings.pauseOnHover) {
      node.classList.add("shiny-text-pause");
    }
    if (settings.yoyo) {
      node.classList.add("shiny-text-yoyo");
    }

    node.style.setProperty("--shiny-color", settings.color);
    node.style.setProperty("--shiny-shine", settings.shineColor);
    node.style.setProperty("--shiny-spread", `${settings.spread}deg`);
    node.style.setProperty("--shiny-speed", `${settings.speed}s`);
    node.style.setProperty("--shiny-delay", `${settings.delay + index * 0.12}s`);
    node.style.setProperty("--shiny-from", settings.direction === "right" ? "-50%" : "150%");
    node.style.setProperty("--shiny-to", settings.direction === "right" ? "150%" : "-50%");
  });
}
