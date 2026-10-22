import React, { useEffect, useState } from "react";
import {
  ArrowRight, Monitor, Sprout, Megaphone, Video, Package,
  ChartNoAxesColumnIncreasing, Pencil, X, Upload, Check
} from "lucide-react";
import "./services-showcase.css";
import "./services-red-accents.css";

const STORAGE_KEY = "aurelia-our-services-v1";
const defaults = [
  { id: "website", number: "01", title: "Website Build", description: "Modern, high-performing websites that convert visitors into customers.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85", alt: "Website analytics and design on a laptop", icon: "monitor" },
  { id: "branding", number: "02", title: "Branding", description: "Distinctive brand identities that make a lasting impression.", image: "https://images.unsplash.com/photo-1634942536790-2534db3a2e7d?auto=format&fit=crop&w=1000&q=85", alt: "Brand identity design", icon: "sprout" },
  { id: "pr", number: "03", title: "PR", description: "Strategic public relations to amplify your story and credibility.", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=85", alt: "News and media coverage", icon: "megaphone" },
  { id: "ai-videos", number: "04", title: "AI Videos", description: "Engaging AI-powered videos for marketing, ads and storytelling.", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1000&q=85", alt: "Video production camera setup", icon: "video" },
  { id: "brand-kit", number: "05", title: "Brand Kit", description: "Complete visual assets for a consistent and memorable brand.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85", alt: "Creative stationery and brand materials", icon: "package" },
  { id: "social", number: "06", title: "Social Media Management", description: "Content, strategy and growth management to keep your brand ahead.", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1000&q=85", alt: "Social media content and phone", icon: "chart" },
];
const iconMap = { monitor: Monitor, sprout: Sprout, megaphone: Megaphone, video: Video, package: Package, chart: ChartNoAxesColumnIncreasing };
const defaultHeading = { eyebrow: "OUR SERVICES", title: "Creative Solutions ", accent: "for Every Stage.", description: "From strategy and design to content and growth, we offer end-to-end creative services to help your brand stand out and scale." };

function ServiceEditor({ item, onClose, onSave }) {
  const [draft, setDraft] = useState(item);
  const [error, setError] = useState("");
  useEffect(() => setDraft(item), [item]);
  if (!item) return null;
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setError("Please use an image smaller than 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => { update("image", String(reader.result)); setError(""); };
    reader.onerror = () => setError("Could not read this image. Please try another.");
    reader.readAsDataURL(file);
  };
  return <div className="services-editor-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="services-editor" role="dialog" aria-modal="true" aria-labelledby="services-editor-title">
      <div className="services-editor-head">
        <div><span className="services-editor-kicker">✦ SERVICE CUSTOMIZER</span><h3 id="services-editor-title">Edit {item.title}</h3></div>
        <button type="button" className="services-editor-close" onClick={onClose} aria-label="Close editor"><X size={19} /></button>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
        <div className="services-editor-preview"><img src={draft.image} alt="Current service preview" /><span>Choose an image to update this service card.</span></div>
        <label>Service heading<input required maxLength={48} value={draft.title} onChange={(event) => update("title", event.target.value)} /></label>
        <label>Description<textarea required maxLength={180} rows={3} value={draft.description} onChange={(event) => update("description", event.target.value)} /></label>
        <label>Image URL<input value={draft.image.startsWith("data:") ? "" : draft.image} placeholder="Paste an image URL" onChange={(event) => update("image", event.target.value)} /></label>
        <label className="services-editor-upload"><Upload size={16} /> Upload photo from your computer<input type="file" accept="image/*" onChange={upload} /></label>
        {error && <p className="services-editor-error">{error}</p>}
        <div className="services-editor-actions"><button type="button" className="services-editor-cancel" onClick={onClose}>Cancel</button><button type="submit" className="services-editor-save"><Check size={16} /> Save changes</button></div>
      </form>
    </section>
  </div>;
}

export default function Services() {
  const [cards, setCards] = useState(defaults);
  const [heading, setHeading] = useState(defaultHeading);
  const [headingDraft, setHeadingDraft] = useState(defaultHeading);
  const [editing, setEditing] = useState(null);
  const [editingHeading, setEditingHeading] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      if (saved?.cards?.length === 6) setCards(saved.cards);
      if (saved?.heading) {
        const restoredHeading = {
          ...defaultHeading,
          ...saved.heading,
          title: saved.heading.title?.trim() || defaultHeading.title,
          accent: saved.heading.accent?.trim() || defaultHeading.accent,
          description: saved.heading.description?.trim() || defaultHeading.description,
        };
        setHeading(restoredHeading);
        setHeadingDraft(restoredHeading);
      }
    } catch (error) { console.warn("Could not load saved services.", error); }
  }, []);
  const persist = (nextCards, nextHeading) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cards: nextCards, heading: nextHeading }));
      setNotice("Changes saved in this browser");
      window.setTimeout(() => setNotice(""), 2600);
    } catch { setNotice("Storage is full. Try a smaller image."); }
  };
  const saveCard = (updatedCard) => {
    const next = cards.map((card) => card.id === updatedCard.id ? updatedCard : card);
    setCards(next); persist(next, heading); setEditing(null);
  };
  const saveHeading = (event) => {
    event.preventDefault(); setHeading(headingDraft); persist(cards, headingDraft); setEditingHeading(false);
  };
  return <section className="services-showcase section" id="services">
    <div className="services-showcase-inner">
      <header className="services-showcase-heading">
        <div className="services-showcase-eyebrow"><i />{heading.eyebrow}<i /></div>
        <h2><span className="services-showcase-title-main">Creative Solutions</span> <em>{heading.accent?.trim() || defaultHeading.accent}</em></h2>
        <p>{heading.description?.trim() || defaultHeading.description}</p>
      </header>
      {notice && <div className="services-showcase-notice" role="status"><Check size={14} />{notice}</div>}
      <div className="services-showcase-grid">
        {cards.map((card) => {
          const Icon = iconMap[card.icon] || Monitor;
          return <article className="services-showcase-card" key={card.id}>
            <div className="services-showcase-image">
              <img src={card.image} alt={card.alt || card.title} loading="lazy" onError={(event) => { event.currentTarget.style.opacity = ".15"; }} />
              <span className="services-showcase-number">{card.number}</span>
            </div>
            <div className="services-showcase-card-body">
              <span className="services-showcase-icon"><Icon size={25} strokeWidth={1.5} /></span>
              <div className="services-showcase-copy"><h3>{card.title}</h3><p>{card.description}</p></div>
              <button type="button" className="services-showcase-arrow" onClick={() => setEditing(card)} aria-label={"Edit " + card.title} title="Edit this service"><ArrowRight size={21} /></button>
            </div>
          </article>;
        })}
      </div>
      <div className="services-showcase-footnote"><span>IDEAS</span><i /><span>DESIGN</span><i /><span>IMPACT</span></div>
    </div>
    {editing && <ServiceEditor item={editing} onClose={() => setEditing(null)} onSave={saveCard} />}
    {editingHeading && <div className="services-editor-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setEditingHeading(false)}>
      <section className="services-editor" role="dialog" aria-modal="true" aria-labelledby="services-heading-editor-title">
        <div className="services-editor-head"><div><span className="services-editor-kicker">SECTION CUSTOMIZER</span><h3 id="services-heading-editor-title">Edit section heading</h3></div><button type="button" className="services-editor-close" onClick={() => setEditingHeading(false)} aria-label="Close editor"><X size={19} /></button></div>
        <form onSubmit={saveHeading}>
          <label>Eyebrow<input required value={headingDraft.eyebrow} onChange={(event) => setHeadingDraft({ ...headingDraft, eyebrow: event.target.value })} /></label>
          <label>Main heading<input required value={headingDraft.title} onChange={(event) => setHeadingDraft({ ...headingDraft, title: event.target.value })} /></label>
          <label>Highlighted heading<input required value={headingDraft.accent} onChange={(event) => setHeadingDraft({ ...headingDraft, accent: event.target.value })} /></label>
          <label>Section description<textarea required rows={3} value={headingDraft.description} onChange={(event) => setHeadingDraft({ ...headingDraft, description: event.target.value })} /></label>
          <div className="services-editor-actions"><button type="button" className="services-editor-cancel" onClick={() => setEditingHeading(false)}>Cancel</button><button type="submit" className="services-editor-save"><Check size={16} /> Save heading</button></div>
        </form>
      </section>
    </div>}
  </section>;
}
