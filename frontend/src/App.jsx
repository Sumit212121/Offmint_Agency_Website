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
import ServiceDetail from "./sections/ServiceDetail.jsx";

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem("socialure-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark";
}

function getServiceFromPath() {
  const match = window.location.pathname.match(/^\/services\/([^/]+)/);
  if (!match) return null;
  const slugAliases = { "website-build": "website", "social-media": "social" };
  return slugAliases[match[1]] || match[1];
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeService, setActiveService] = useState(getServiceFromPath);

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

  useEffect(() => {
    const syncServiceFromUrl = () => setActiveService(getServiceFromPath());
    window.addEventListener("popstate", syncServiceFromUrl);
    return () => window.removeEventListener("popstate", syncServiceFromUrl);
  }, []);

  const openService = (serviceId) => {
    window.history.pushState({ serviceId }, "", "/services/" + serviceId);
    setActiveService(serviceId);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  const backToServices = () => {
    window.history.pushState({}, "", "/");
    setActiveService(null);
    window.setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  if (activeService) {
    return (
      <main className="agency-site" data-theme={theme}>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <ServiceDetail serviceId={activeService} onBack={backToServices} />
      </main>
    );
  }

  return (
    <main className="agency-site" data-theme={theme}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Philosophy />
      <Services onOpenService={openService} />
      <ProjectProcess />
      <Portfolio />
      <ClientStories />
      <ContactBrief />
      <Footer />
    </main>
  );
}
