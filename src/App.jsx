import React, { useEffect, useState } from "react";

const concepts = [
  { id: "01", title: "The Brand Universe", subtitle: "A complete brand ecosystem", kind: "universe" },
  { id: "02", title: "E-commerce Experience", subtitle: "Digital storefront in motion", kind: "commerce" },
  { id: "03", title: "Brand Identity Reveal", subtitle: "A visual identity comes together", kind: "identity" },
  { id: "04", title: "Creative Campaign Studio", subtitle: "Campaigns with cinematic energy", kind: "campaign" },
  { id: "05", title: "Digital Growth Network", subtitle: "Connected creative services", kind: "network" },
  { id: "06", title: "Brand Transformation", subtitle: "From idea to a complete brand", kind: "transform" },
];

const rotatingWords = ["Brands.", "Digital Experiences.", "E-commerce Stores.", "Brand Identities.", "Creative Campaigns."];

function Visual({ kind = "universe", large = false }) {
  return (
    <div className={`visual visual--${kind} ${large ? "visual--large" : ""}`} aria-label={`${kind} animated visual`}>
      <div className="visual-glow" />
      <div className="visual-orbit orbit-a" />
      <div className="visual-orbit orbit-b" />
      <div className="visual-orbit orbit-c" />
      <div className="visual-core"><span /></div>
      <div className="visual-panel panel-a"><i /><i /><i /></div>
      <div className="visual-panel panel-b"><i /><i /><i /><i /></div>
      <div className="visual-chip chip-a">BRAND / 001</div>
      <div className="visual-chip chip-b">CREATIVE SYSTEM</div>
      <div className="visual-particle particle-a" />
      <div className="visual-particle particle-b" />
      <div className="visual-particle particle-c" />
    </div>
  );
}

export default function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeConcept, setActiveConcept] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && setActiveConcept(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="agency-site">
      <style>{styles}</style>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Aurelia home">
          <span className="brand-mark">A</span>
          <span className="brand-copy"><strong>AURELIA</strong><small>CREATIVE STUDIO</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
        <nav className={menuOpen ? "nav nav--open" : "nav"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#animations" onClick={() => setMenuOpen(false)}>Animations</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">LET'S TALK <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span /> INDEPENDENT CREATIVE STUDIO</div>
          <h1>We Build <span className="changing-word" key={rotatingWords[wordIndex]}>{rotatingWords[wordIndex]}</span><br />We Create <em>Impact.</em></h1>
          <p className="hero-description">We architect bespoke e-commerce experiences, memorable brand identities, AI-powered content and high-impact creative campaigns for ambitious businesses.</p>
          <div className="hero-actions">
            <a className="button button--gold" href="#contact">START A PROJECT <span>↗</span></a>
            <a className="button button--outline" href="#work">EXPLORE OUR WORK <span>↗</span></a>
          </div>
          <div className="capabilities"><span>BRANDING</span><b>·</b><span>DIGITAL</span><b>·</b><span>CREATIVE</span><b>·</b><span>GROWTH</span></div>
        </div>
        <div className="hero-art">
          <div className="art-topline"><span>LIVE EXPERIENCE CORE</span><span className="live-dot">● INTERACTIVE 3D FEEL</span></div>
          <Visual kind="universe" large />
          <div className="art-caption"><div><strong>AURELIA / SIGNATURE FORM</strong><span>Brand thinking, made tangible.</span></div><span className="art-index">01 — 06</span></div>
        </div>
        <div className="hero-bottom"><span>STRATEGY · DESIGN · DIGITAL</span><a href="#services">SCROLL TO EXPLORE <span>↓</span></a><span>EST. FOR WHAT'S NEXT</span></div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading"><div><div className="eyebrow"><span /> WHAT WE DO</div><h2>One partner.<br /><em>Every touchpoint.</em></h2></div><p>From the first spark of a brand idea to the digital experience that takes it further, we bring strategy and execution together.</p></div>
        <div className="service-grid">
          {[
            ["01", "E-commerce & Websites", "Distinctive online stores and digital experiences built around your brand."],
            ["02", "Branding & Brand Kits", "Identity systems, art direction, typography and brand guidelines."],
            ["03", "AI Video & Campaigns", "Product films, campaign concepts and creative content made to move."],
            ["04", "PR & Social Media", "Brand storytelling, content planning and audience connection."],
          ].map(([n, title, desc]) => <article className="service-card" key={n}><span className="service-number">{n}</span><h3>{title}</h3><p>{desc}</p><span className="service-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading"><div><div className="eyebrow"><span /> THE MOTION LAB</div><h2>Six ways to make<br /><em>an impression.</em></h2></div><p>Explore six visual directions built around the work we do: branding, commerce, campaigns and connected digital experiences.</p></div>
        <div className="concept-grid" id="animations">
          {concepts.map((concept) => <button className="concept-card" key={concept.id} onClick={() => setActiveConcept(concept)} aria-label={`Preview ${concept.title}`}>
            <div className="concept-visual"><Visual kind={concept.kind} /><span className="preview-button">VIEW CONCEPT ↗</span></div>
            <div className="concept-info"><span className="concept-id">{concept.id} / MOTION STUDY</span><h3>{concept.title}</h3><p>{concept.subtitle}</p></div>
          </button>)}
        </div>
      </section>

      <section className="about section" id="about"><div className="eyebrow"><span /> BUILT AROUND YOUR BRAND</div><h2>Good design gets noticed.<br /><em>Great design moves you forward.</em></h2><p>We bring digital craft, brand thinking and creative production into one considered process — made for businesses ready to stand apart.</p><a className="button button--gold" href="#contact">LET'S MAKE SOMETHING MATTER <span>↗</span></a></section>

      <section className="contact section" id="contact"><div><div className="eyebrow"><span /> HAVE A GOOD ONE IN MIND?</div><h2>Let's build your<br /><em>next chapter.</em></h2></div><a className="contact-link" href="mailto:hello@aurelia.studio">HELLO@AURELIA.STUDIO <span>↗</span></a></section>
      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">A</span><span className="brand-copy"><strong>AURELIA</strong><small>CREATIVE STUDIO</small></span></a><span>INDEPENDENT BY DESIGN.</span><span>© {new Date().getFullYear()} AURELIA STUDIO</span></footer>

      {activeConcept && <div className="modal-backdrop" role="presentation" onClick={() => setActiveConcept(null)}><div className="concept-modal" role="dialog" aria-modal="true" aria-label={activeConcept.title} onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setActiveConcept(null)} aria-label="Close preview">×</button><div className="modal-visual"><Visual kind={activeConcept.kind} large /></div><div className="modal-copy"><span className="concept-id">{activeConcept.id} / MOTION STUDY</span><h2>{activeConcept.title}</h2><p>{activeConcept.subtitle}. A visual direction inspired by the connected worlds of brand identity, digital commerce and creative storytelling.</p></div></div></div>}
    </main>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
:root{--green:#071f1b;--forest:#123a31;--gold:#c8a45d;--ivory:#f5f0e6;--muted:#a9bbb2;--line:rgba(200,164,93,.19)}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:90px}body{margin:0;background:var(--green);color:var(--ivory);font-family:'DM Sans',sans-serif}.agency-site{min-height:100vh;overflow:hidden;background:radial-gradient(ellipse at 80% 18%,rgba(18,58,49,.42),transparent 36%),var(--green)}a{color:inherit;text-decoration:none}button{font:inherit}.topbar{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 6.2%;border-bottom:1px solid var(--line);background:rgba(7,31,27,.8);position:sticky;top:0;z-index:20;backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:10px}.brand-mark{width:30px;height:30px;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;color:var(--gold);font-family:'Playfair Display',serif}.brand-copy{display:flex;flex-direction:column;gap:2px;letter-spacing:2px}.brand-copy strong{font-size:11px}.brand-copy small{font:7px 'DM Mono',monospace;color:var(--gold);letter-spacing:1.5px}.nav{display:flex;gap:30px}.nav a,.nav-cta,.eyebrow,.capabilities,.hero-bottom,.art-topline,.art-caption,.service-number,.concept-id,.footer>span{font:9px 'DM Mono',monospace;letter-spacing:1.1px}.nav a{color:#d0d8d1;text-transform:uppercase;transition:color .25s}.nav a:hover{color:var(--gold)}.nav-cta{border-radius:30px;background:var(--gold);color:var(--green);padding:12px 18px;font-weight:500}.nav-cta span,.button span{margin-left:12px}.menu-toggle{display:none}.hero{min-height:calc(100vh - 76px);padding:9vh 8.3% 26px;position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:5%;align-items:center}.hero-copy{position:relative;z-index:2;animation:copyIn .9s both}.eyebrow{color:var(--gold);display:flex;align-items:center;gap:10px}.eyebrow>span{display:inline-block;width:17px;height:1px;background:var(--gold)}h1,h2,h3,p{margin-top:0}h1{font:600 clamp(42px,5.25vw,78px)/.99 'Playfair Display',serif;letter-spacing:-2px;margin:27px 0 24px;max-width:680px}h1 em,h2 em{font-weight:500;color:var(--gold)}.changing-word{display:inline-block;color:var(--gold);animation:wordIn .55s both;max-width:100%}.hero-description{max-width:460px;font-size:13px;line-height:1.9;color:#bdcbc4}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.button{display:inline-flex;align-items:center;justify-content:center;border-radius:30px;padding:14px 20px;font:9px 'DM Mono',monospace;letter-spacing:.8px;transition:transform .25s,background .25s}.button:hover{transform:translateY(-3px)}.button--gold{background:var(--gold);color:var(--green)}.button--outline{border:1px solid rgba(200,164,93,.35);color:var(--ivory)}.button--outline:hover{background:rgba(200,164,93,.1)}.capabilities{display:flex;gap:10px;color:var(--gold);font-size:8px;margin-top:34px}.capabilities b{font-weight:400;color:#526e61}.hero-art{align-self:center;border:1px solid rgba(200,164,93,.26);border-radius:18px;padding:17px;background:linear-gradient(145deg,rgba(18,58,49,.62),rgba(7,31,27,.5));box-shadow:0 25px 90px rgba(0,0,0,.16);animation:artIn 1.1s .15s both;min-width:0}.art-topline{display:flex;justify-content:space-between;align-items:center;color:var(--gold);font-size:8px}.live-dot{font-size:7px;color:#c3d5c9;border:1px solid rgba(200,164,93,.22);border-radius:20px;padding:6px 8px}.live-dot:first-letter{color:#8cc5a1}.art-caption{display:flex;justify-content:space-between;align-items:flex-end;font-size:8px;color:var(--gold);gap:10px}.art-caption div{display:flex;flex-direction:column;gap:6px}.art-caption strong{font-weight:400}.art-caption div span{color:var(--muted);font-size:9px;letter-spacing:0}.art-index{white-space:nowrap}.visual{height:210px;position:relative;overflow:hidden;isolation:isolate;background:radial-gradient(ellipse at 52% 48%,rgba(22,83,66,.62),rgba(7,31,27,.1) 63%,transparent 75%);border-radius:12px;perspective:900px}.visual--large{height:clamp(260px,31vw,410px);margin:15px 0}.visual-glow{position:absolute;inset:15%;border-radius:50%;background:rgba(26,100,76,.2);filter:blur(30px);animation:glowPulse 5s ease-in-out infinite}.visual-orbit{position:absolute;left:50%;top:50%;width:54%;height:31%;border:2px solid var(--gold);border-radius:50%;transform-style:preserve-3d;box-shadow:0 0 10px rgba(200,164,93,.15),inset 0 0 8px rgba(200,164,93,.12)}.orbit-a{transform:translate(-50%,-50%) rotate(-25deg) rotateX(64deg);animation:orbitA 8s linear infinite}.orbit-b{width:42%;height:59%;border-color:#a8c9b4;opacity:.85;transform:translate(-50%,-50%) rotate(32deg) rotateY(62deg);animation:orbitB 10s linear infinite}.orbit-c{width:64%;height:20%;border-width:1px;opacity:.55;transform:translate(-50%,-50%) rotate(40deg) rotateX(72deg);animation:orbitA 12s linear infinite reverse}.visual-core{position:absolute;left:50%;top:50%;width:22%;aspect-ratio:1;transform:translate(-50%,-50%) rotate(35deg);background:linear-gradient(135deg,rgba(104,171,137,.85),rgba(15,67,52,.4) 55%,rgba(200,164,93,.2));clip-path:polygon(50% 0,100% 24%,82% 80%,24% 100%,0 38%);box-shadow:0 0 40px rgba(93,176,133,.2);animation:coreFloat 5s ease-in-out infinite}.visual-core span{position:absolute;inset:15%;border:1px solid rgba(245,240,230,.45);clip-path:inherit}.visual-panel{position:absolute;display:flex;gap:4px;align-items:flex-end;padding:7px;border:1px solid rgba(200,164,93,.35);background:rgba(7,31,27,.8);backdrop-filter:blur(6px);transform:rotateY(-18deg) rotateX(8deg);animation:panelFloat 6s ease-in-out infinite}.visual-panel i{display:block;width:8px;height:22px;background:linear-gradient(var(--gold),rgba(200,164,93,.12));opacity:.7}.panel-a{left:10%;bottom:20%;height:40px}.panel-b{right:9%;top:17%;height:32px;animation-delay:-2s}.panel-b i{height:12px;background:linear-gradient(#9fc9b0,rgba(159,201,176,.1))}.visual-chip{position:absolute;font:7px 'DM Mono',monospace;color:var(--gold);letter-spacing:1px;border:1px solid rgba(200,164,93,.22);padding:6px 8px;background:rgba(7,31,27,.55)}.chip-a{left:5%;top:12%}.chip-b{right:5%;bottom:11%}.visual-particle{position:absolute;width:4px;height:4px;border-radius:50%;background:var(--gold);box-shadow:0 0 12px var(--gold);animation:particleFloat 4s ease-in-out infinite}.particle-a{left:25%;top:25%}.particle-b{right:23%;top:35%;animation-delay:-1.5s}.particle-c{left:62%;bottom:18%;animation-delay:-2.5s}.visual--commerce .visual-core{width:32%;height:40%;aspect-ratio:auto;clip-path:polygon(12% 0,88% 0,100% 100%,0 100%);transform:translate(-50%,-50%) rotateY(-18deg);animation:commerceFloat 4s ease-in-out infinite}.visual--commerce .orbit-a{width:70%;height:65%;border-radius:8px;transform:translate(-50%,-50%) rotateY(-20deg);animation:panelFloat 7s ease-in-out infinite}.visual--identity .visual-core{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);background:linear-gradient(135deg,var(--gold),#6f542b);animation:coreFloat 4s ease-in-out infinite}.visual--identity .orbit-b{border-radius:12%;width:46%;height:46%;transform:translate(-50%,-50%) rotate(45deg);border-color:#e3d3a3}.visual--campaign .visual-panel{height:55%;width:32%;top:23%;left:14%;align-items:center;justify-content:center;box-shadow:0 10px 25px #04110f}.visual--campaign .panel-a i{height:70%;width:28%;background:linear-gradient(135deg,#bfa066,#315e4b)}.visual--campaign .panel-b{left:auto;right:14%;top:30%;transform:rotateY(20deg) rotateX(8deg)}.visual--network .orbit-a,.visual--network .orbit-b,.visual--network .orbit-c{width:60%;height:60%;border-radius:12%;transform:translate(-50%,-50%) rotate(45deg);animation:networkSpin 14s linear infinite}.visual--network .orbit-b{width:40%;height:40%;animation-direction:reverse}.visual--network .visual-core{width:14%;clip-path:circle(50%);background:var(--gold)}.visual--transform .visual-core{width:34%;clip-path:polygon(50% 0,100% 25%,80% 85%,20% 100%,0 35%);animation:transformCore 6s ease-in-out infinite}.visual--transform .orbit-a{width:68%;height:48%;animation:orbitA 6s linear infinite}.hero-bottom{position:absolute;bottom:20px;left:8.3%;right:8.3%;display:flex;justify-content:space-between;color:#779084;font-size:8px}.hero-bottom a{color:var(--gold)}.hero-bottom a span{margin-left:8px}.section{padding:115px 8.3%;border-top:1px solid var(--line)}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:40px;margin-bottom:45px}.section-heading h2,.about h2,.contact h2{font:500 clamp(36px,4.5vw,62px)/1.08 'Playfair Display',serif;letter-spacing:-1.5px;margin:22px 0 0}.section-heading>p{max-width:360px;color:var(--muted);font-size:13px;line-height:1.9;margin-bottom:4px}.service-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.service-card{position:relative;padding:27px 20px 34px 0;border-right:1px solid var(--line);margin-right:20px;min-height:210px}.service-card:last-child{border:0;margin:0}.service-number{color:var(--gold)}.service-card h3{font:500 19px 'Playfair Display',serif;margin:30px 0 12px}.service-card p,.concept-info p{color:var(--muted);font-size:11px;line-height:1.8}.service-arrow{position:absolute;right:22px;top:24px;color:var(--gold);transition:transform .2s}.service-card:hover .service-arrow{transform:translate(3px,-3px)}.work{background:linear-gradient(180deg,rgba(18,58,49,.22),transparent)}.concept-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.concept-card{text-align:left;padding:0;background:transparent;color:inherit;border:1px solid var(--line);border-radius:13px;overflow:hidden;cursor:pointer;transition:transform .3s,border-color .3s;min-width:0}.concept-card:hover{transform:translateY(-5px);border-color:rgba(200,164,93,.65)}.concept-visual{position:relative;padding:10px;background:rgba(18,58,49,.25)}.concept-visual .visual{height:210px}.preview-button{position:absolute;bottom:20px;right:20px;font:8px 'DM Mono',monospace;letter-spacing:.8px;background:var(--gold);color:var(--green);padding:9px 11px;border-radius:20px;opacity:0;transform:translateY(4px);transition:all .25s}.concept-card:hover .preview-button,.concept-card:focus-visible .preview-button{opacity:1;transform:translateY(0)}.concept-info{padding:20px}.concept-id{font-size:8px;color:var(--gold)}.concept-info h3{font:500 21px 'Playfair Display',serif;margin:12px 0 7px}.concept-info p{margin-bottom:0}.about{background:radial-gradient(ellipse at 80% 50%,rgba(18,58,49,.6),transparent 48%)}.about h2{margin-bottom:24px}.about>p{max-width:580px;color:var(--muted);font-size:13px;line-height:1.9;margin-bottom:28px}.contact{display:flex;align-items:flex-end;justify-content:space-between;gap:25px}.contact-link{border-bottom:1px solid var(--gold);padding:0 0 13px;color:var(--gold);font:10px 'DM Mono',monospace;letter-spacing:1px;white-space:nowrap}.contact-link span{margin-left:22px}.footer{padding:26px 8.3%;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--line);color:#7e978b}.footer .brand-copy strong{color:var(--ivory)}.footer>span{font-size:8px}.modal-backdrop{position:fixed;inset:0;background:rgba(0,10,8,.84);backdrop-filter:blur(12px);z-index:50;display:grid;place-items:center;padding:22px;animation:fadeIn .2s both}.concept-modal{position:relative;width:min(780px,100%);border:1px solid rgba(200,164,93,.4);border-radius:18px;background:#0a2822;padding:24px;display:grid;grid-template-columns:1.1fr .9fr;gap:24px;box-shadow:0 25px 100px #000}.modal-close{position:absolute;right:12px;top:8px;border:0;background:none;color:var(--ivory);font-size:28px;cursor:pointer;z-index:2}.modal-visual .visual{height:320px}.modal-copy{align-self:center;padding-right:18px}.modal-copy h2{font:500 32px 'Playfair Display',serif;margin:17px 0}.modal-copy p{font-size:12px;color:var(--muted);line-height:1.9}@keyframes copyIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes artIn{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes wordIn{from{opacity:0;transform:translateY(12px);filter:blur(4px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}@keyframes orbitA{from{transform:translate(-50%,-50%) rotate(-25deg) rotateX(64deg)}to{transform:translate(-50%,-50%) rotate(335deg) rotateX(64deg)}}@keyframes orbitB{from{transform:translate(-50%,-50%) rotate(32deg) rotateY(62deg)}to{transform:translate(-50%,-50%) rotate(392deg) rotateY(62deg)}}@keyframes coreFloat{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 -10px;rotate:8deg}}@keyframes panelFloat{0%,100%{translate:0 0}50%{translate:0 -8px}}@keyframes particleFloat{0%,100%{translate:0 0;opacity:.35}50%{translate:8px -15px;opacity:1}}@keyframes glowPulse{0%,100%{opacity:.4;scale:.9}50%{opacity:.8;scale:1.1}}@keyframes commerceFloat{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 -8px;rotate:2deg}}@keyframes networkSpin{from{rotate:0deg}to{rotate:360deg}}@keyframes transformCore{0%,100%{scale:.8;rotate:0deg}50%{scale:1.12;rotate:35deg}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@media(max-width:900px){.topbar{padding:0 4%}.nav{gap:14px}.hero{padding:8vh 5% 55px;gap:3%}.hero-bottom{left:5%;right:5%}h1{font-size:clamp(40px,6vw,60px)}.section{padding:85px 5%}.service-grid{grid-template-columns:repeat(2,1fr)}.service-card:nth-child(2){border-right:0}.service-card:nth-child(3),.service-card:nth-child(4){border-top:1px solid var(--line)}.concept-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.footer{padding:24px 5%}}
@media(max-width:640px){.topbar{height:66px}.menu-toggle{display:block;margin-left:auto;margin-right:14px;border:1px solid var(--line);background:transparent;color:var(--ivory);border-radius:8px;padding:8px 10px}.nav{display:none;position:absolute;left:0;right:0;top:66px;background:#09251f;padding:20px 6%;border-bottom:1px solid var(--line);flex-direction:column;gap:20px}.nav--open{display:flex}.nav-cta{font-size:8px;padding:10px 12px}.brand-copy{letter-spacing:1.3px}.hero{display:flex;flex-direction:column;align-items:stretch;padding:65px 6% 65px;gap:40px;min-height:auto}.hero-copy{width:100%}h1{font-size:clamp(43px,12vw,64px);letter-spacing:-1.6px;margin:23px 0 20px}.hero-description{font-size:12px}.hero-art{width:100%;padding:12px}.visual--large{height:280px}.art-topline{font-size:7px}.hero-bottom{bottom:20px;left:6%;right:6%;font-size:7px}.hero-bottom>span:last-child{display:none}.capabilities{margin-top:25px}.section{padding:72px 6%}.section-heading{display:block}.section-heading>p{margin-top:20px}.section-heading h2,.about h2,.contact h2{font-size:42px}.service-grid{grid-template-columns:1fr}.service-card,.service-card:nth-child(2){border-right:0;border-bottom:1px solid var(--line);margin:0;min-height:175px;padding-right:0}.service-card:nth-child(3){border-top:0}.service-card:last-child{border-bottom:0}.service-card h3{margin-top:22px}.concept-grid{grid-template-columns:1fr}.concept-visual .visual{height:230px}.preview-button{opacity:1;transform:none}.contact{display:block}.contact-link{display:inline-block;margin-top:28px}.footer{flex-wrap:wrap;gap:18px}.footer>span{font-size:7px}.concept-modal{grid-template-columns:1fr;padding:15px;gap:10px;max-height:90vh;overflow:auto}.modal-visual .visual{height:240px}.modal-copy{padding:10px}.modal-copy h2{font-size:27px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;
