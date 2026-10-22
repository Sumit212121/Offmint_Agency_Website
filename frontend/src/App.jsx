import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import ProjectProcess from "./sections/ProjectProcess.jsx";
import Portfolio from "./sections/Portfolio.jsx";
import Philosophy from "./sections/Philosophy.jsx";
import ClientStories from "./sections/ClientStories.jsx";
import ContactBrief from "./sections/ContactBrief.jsx";

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem("socialure-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem("socialure-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const mobileTheme = window.matchMedia("(max-width: 640px)");
    const keepMobileDark = () => {
      if (mobileTheme.matches) setTheme("dark");
    };
    keepMobileDark();
    mobileTheme.addEventListener?.("change", keepMobileDark);
    return () => mobileTheme.removeEventListener?.("change", keepMobileDark);
  }, []);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <main className="agency-site" data-theme={theme}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Philosophy />
      <Services />
      <ProjectProcess />
      <Portfolio />
      <ClientStories />
      <ContactBrief />
      <Footer />
    </main>
  );
}
