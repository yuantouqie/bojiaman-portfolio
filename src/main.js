import { initPixelSnow } from './pixelSnow.js';
import { applyShinyText } from './shinyText.js';

const experienceItems = [
  ["贝壳美家圣都装饰", "实习一年｜全案设计师 AI 辅助设计助理"],
  ["住宅空间方案辅助", "客户需求整理、风格定位、空间布局优化与方案表达。"],
  ["AIGC 空间视觉", "使用 AI 生图工具完成风格探索、氛围图生成、材质搭配参考和软装意向表达。"],
  ["方案沟通与迭代", "根据设计师反馈与客户偏好，迭代提示词、参考图和生成方向，提高前期沟通效率。"]
];

const projects = [
  ["AI 算力中转站网站", "个人项目｜网站设计、制作与部署", "独立完成网站构思、页面设计、内容组织与上线部署，围绕 AI 用户需求设计服务介绍、功能说明、使用入口和价格展示。"],
  ["个人网站制作与部署", "个人品牌展示 / 作品集入口", "独立制作并部署个人网站，用于展示个人介绍、AI 项目、设计作品和联系方式。"],
  ["跃层别墅 AI 辅助设计生图", "空间设计项目｜AIGC 视觉表达", "基于跃层别墅空间特征，使用 AI 生图工具辅助完成室内空间风格探索与视觉表现。"]
];

const skills = [
  ["AIGC 视觉设计", "AI 生图 / 风格探索 / 提示词迭代 / 空间氛围图 / 视觉筛选"],
  ["空间设计", "住宅空间设计 / 全案设计辅助 / 方案表达 / 审美判断 / 客户沟通"],
  ["网站制作部署", "个人网站 / AI 算力中转站 / 页面设计 / 基础部署 / AI 编程辅助"]
];

const tools = ["Figma", "Photoshop", "SketchUp", "AutoCAD", "酷家乐", "HTML/CSS", "ChatGPT", "Gemini", "DeepSeek", "豆包", "元宝", "GLM", "Claude Code", "Codex", "Hermes", "OpenClaw"];

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-background" aria-hidden="true">
      <div class="background-wash"></div>
      <div class="background-grid"></div>
      <div class="pixel-snow-layer" data-pixel-snow></div>
    </div>
    <main class="page-shell">
      <nav class="nav-bar" aria-label="Primary navigation">
        <a class="logo" href="#top" aria-label="Velorah home">
          皮俊瑞<sup>®</sup>
        </a>
        <div class="nav-links">
          <a class="active" href="#top">首页</a>
          <a href="#about">关于我</a>
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#skills">技能</a>
          <a href="#contact">联系我</a>
        </div>
        <a class="liquid-glass nav-cta" href="#contact">联系我</a>
      </nav>

      <section class="hero-section" id="top">
        <video
          class="hero-video"
          autoplay
          loop
          muted
          playsinline
          aria-hidden="true"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <h1 class="animate-fade-rise">
          让<em>AI 应用</em>与空间审美<em>生长成形。</em>
        </h1>
        <p class="hero-subtext animate-fade-rise-delay">
          我是皮俊瑞，来自重庆，专注 AI 应用设计、AIGC 视觉设计与空间设计。用工具理解需求，用审美筛选方向，用项目把想法落到真实页面与视觉表达里。
        </p>
        <a class="liquid-glass hero-cta animate-fade-rise-delay-2" href="#about">
          查看简历内容
        </a>
      </section>

      <section class="content-section intro-section" id="about">
        <div class="section-kicker">About</div>
        <div class="split-layout">
          <div>
            <h2>环境设计背景，叠加 AI 工具实践。</h2>
          </div>
          <div class="glass-card intro-card">
            <p>环境设计专业本科毕业生，具备良好的空间审美、视觉判断与设计表达能力。长期关注并实践 AI 工具在设计、网站搭建、AIGC 生图和智能体工作流中的应用。</p>
            <div class="meta-grid">
              <span>重庆</span>
              <span>2026年毕业</span>
              <span>AI 应用设计</span>
              <span>AIGC 视觉设计</span>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section" id="experience">
        <div class="section-kicker">Experience</div>
        <h2>实习经历</h2>
        <div class="timeline-grid">
          ${experienceItems.map(([title, desc]) => `
            <article class="glass-card timeline-card">
              <h3>${title}</h3>
              <p>${desc}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="content-section" id="projects">
        <div class="section-kicker">Projects</div>
        <h2>项目经历</h2>
        <div class="project-grid">
          ${projects.map(([title, meta, desc], index) => `
            <article class="glass-card project-card">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${title}</h3>
              <strong>${meta}</strong>
              <p>${desc}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="content-section" id="skills">
        <div class="section-kicker">Skills</div>
        <h2>技能与工具</h2>
        <div class="skill-grid">
          ${skills.map(([title, desc]) => `
            <article class="glass-card skill-card">
              <h3>${title}</h3>
              <p>${desc}</p>
            </article>
          `).join("")}
        </div>
        <div class="tool-cloud">
          ${tools.map((tool) => `<span class="liquid-glass">${tool}</span>`).join("")}
        </div>
      </section>

      <section class="content-section contact-section" id="contact">
        <div class="section-kicker">Contact</div>
        <div class="split-layout">
          <h2>期待进入 AI 应用型设计岗位。</h2>
          <div class="glass-card contact-card">
            <a href="tel:15023063849">15023063849</a>
            <a href="mailto:pjr533466@outlook.com">pjr533466@outlook.com</a>
            <p>求职方向：AIGC 设计师、AI 产品运营助理、UI/UX 设计、空间数字化设计、全案设计助理。</p>
          </div>
        </div>
      </section>
    </main>
  `;
}

render();

const snowHost = document.querySelector('[data-pixel-snow]');
if (snowHost) {
  initPixelSnow(snowHost, {
    color: '#b8f0d1',
    flakeSize: 0.011,
    minFlakeSize: 1.1,
    pixelResolution: 380,
    speed: 1.45,
    density: 0.52,
    direction: 128,
    brightness: 1.55,
    farPlane: 24
  });
}

applyShinyText('.logo, .hero-section h1, .content-section h2', {
  color: '#b8f0d1',
  shineColor: '#ffffff',
  speed: 3.2,
  delay: 0.2,
  spread: 88,
  direction: 'left',
  yoyo: true
});

applyShinyText('.section-kicker, .project-card span, .contact-card a', {
  color: '#7fdca5',
  shineColor: '#f7fff9',
  speed: 2.6,
  delay: 0.1,
  spread: 104,
  direction: 'right',
  yoyo: true
});

applyShinyText('.nav-links a, .nav-cta, .hero-cta, .tool-cloud span', {
  color: '#d9f8e6',
  shineColor: '#ffffff',
  speed: 2.2,
  delay: 0,
  spread: 95,
  direction: 'left',
  yoyo: false
});
