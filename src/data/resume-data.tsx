import { ConsultlyLogo, ParabolLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { WebsiteIcon } from "@/components/icons/WebsiteIcon";
import { Rss } from "lucide-react";

export const RESUME_DATA = {
  name: "Ing. Johannes Gnadlinger",
  initials: "JG",
  location: "Linz, Österreich",
  locationLink: "https://www.google.com/maps/place/Linz",
  // The canonical positioning. Every other surface — metadata, OpenGraph,
  // JSON-LD — derives its wording from here so the claim stays identical.
  headline: {
    role: {
      en: "Payments & Backend Engineer",
      de: "Payments & Backend Engineer",
    },
    tagline: {
      en: "Building reliable financial infrastructure for corporate banking — SEPA, EBICS, Java",
      de: "Verlässliche Finanzinfrastruktur für das Firmenkundengeschäft — SEPA, EBICS, Java",
    },
    credentials: {
      en: "Former Product Owner · 8+ years in banking software · Independent product builder",
      de: "Ehem. Product Owner · 8+ Jahre Banking-Software · Eigenständiger Produktentwickler",
    },
  },
  summary: {
    en:
      "Payments-focused Backend Engineer with 8+ years of experience building production software for regulated banking environments. Specialized in corporate payment systems, SEPA, EBICS and Java-based backend development, with experience taking financial products from 0 to 1.\n\n" +
      "Previously served as Product Owner in corporate banking, combining hands-on engineering with product ownership, stakeholder alignment and domain expertise. Outside my professional work, I independently design and ship software products using modern AI-assisted engineering workflows.",
    de:
      "Payments-fokussierter Backend Engineer mit über 8 Jahren Erfahrung in der Entwicklung produktiver Software für regulierte Bankenumgebungen. Spezialisiert auf Zahlungsverkehr im Firmenkundengeschäft, SEPA, EBICS und Java-Backend-Entwicklung — inklusive Erfahrung darin, Finanzprodukte von 0 auf 1 zu bringen.\n\n" +
      "Zuvor als Product Owner im Firmenkundengeschäft tätig und damit Engineering, Product Ownership, Stakeholder-Abstimmung und Fachdomänenwissen in einer Rolle vereint. Außerhalb meiner beruflichen Tätigkeit entwerfe und veröffentliche ich eigenständig Softwareprodukte mit modernen KI-gestützten Engineering-Workflows.",
  },
  sections: {
    about: { en: "Summary", de: "Profil" },
    work: { en: "Professional Experience", de: "Berufserfahrung" },
    education: {
      en: "Education & Qualifications",
      de: "Ausbildung & Qualifikationen",
    },
    skills: { en: "Core Expertise", de: "Kernkompetenzen" },
    projects: { en: "Selected Projects", de: "Ausgewählte Projekte" },
  },
  ui: {
    emailMe: { en: "Email me", de: "E-Mail schreiben" },
    toggleTheme: {
      en: "Switch between light and dark mode",
      de: "Zwischen hellem und dunklem Modus wechseln",
    },
  },
  // Feeds schema.org/Person `knowsAbout`. Kept next to the rest of the content
  // so the structured data cannot drift away from what the page claims.
  knowsAbout: [
    "SEPA",
    "EBICS",
    { en: "Payment Systems", de: "Zahlungsverkehrssysteme" },
    { en: "Corporate Banking", de: "Firmenkundengeschäft" },
    "Java",
    { en: "Product Ownership", de: "Product Ownership" },
  ],
  // Served from /public so the CV does not depend on GitHub being reachable
  // at render time. Replace the file to change the picture.
  avatarUrl: "/avatar.jpg",
  contact: {
    email: "johannes.gnadlinger1997@gmail.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/Gnadi",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        // Kept on the www host so the profile URL is byte-identical to the
        // sameAs entry published on every other property.
        url: "https://www.linkedin.com/in/johannes-gnadlinger-842293271",
        icon: LinkedInIcon,
      },
      {
        name: "Website",
        url: "https://www.gnadlinger.me",
        icon: WebsiteIcon,
      },
      {
        name: "Blog",
        url: "https://blog.gnadlinger.me",
        icon: Rss,
      },
    ],
    // Not shown as a header icon, but part of the published identity graph.
    stackOverflow:
      "https://stackoverflow.com/users/6504152/johannes-gnadlinger",
  },
  education: [
    {
      school: "WKO Oberösterreich",
      link: "https://www.wko.at/ooe",
      degree: {
        en: "Engineering Qualification (Ing.) — NQF/EQF Level 6",
        de: "Ingenieurqualifikation (Ing.) — NQR/EQR Niveau 6",
      },
      start: "2026",
      end: "",
    },
    {
      school: "HTL Leonding",
      link: "https://www.htl-leonding.at/",
      degree: {
        en: "System & Software Engineering",
        de: "System & Software Engineering",
      },
      start: "2013",
      end: "2017",
    },
  ],
  // Split into the two career phases the tenure actually consists of, so the
  // progression Full Stack → Product Owner → Payments/Backend is readable at a
  // glance instead of hidden inside one combined description.
  work: [
    {
      company: "Raiffeisen Software GmbH",
      link: "https://r-software.at",
      badges: ["Linz"],
      title: {
        en: "Payments & Backend Engineer",
        de: "Payments & Backend Engineer",
      },
      logo: ParabolLogo,
      start: "2023",
      end: {
        en: "Present",
        de: "heute",
      },
      intro: {
        en: "Developing backend systems for corporate payment and financial services in a regulated banking environment.",
        de: "Entwicklung von Backend-Systemen für Zahlungsverkehr und Finanzdienstleistungen im Firmenkundengeschäft — in einem regulierten Bankenumfeld.",
      },
      highlights: [
        {
          en: "Build and evolve payment transaction functionality for corporate banking.",
          de: "Entwicklung und Weiterentwicklung von Zahlungsverkehrsfunktionen für das Firmenkundengeschäft.",
        },
        {
          en: "Work on the migration from the Austrian MBS communication standard to EBICS.",
          de: "Mitarbeit an der Migration vom österreichischen MBS-Kommunikationsstandard auf EBICS.",
        },
        {
          en: "Develop Java-based backend services with a focus on correctness, reliability and maintainability.",
          de: "Entwicklung Java-basierter Backend-Services mit Fokus auf Korrektheit, Verlässlichkeit und Wartbarkeit.",
        },
        {
          en: "Work across payment-domain requirements, implementation, testing and production operations.",
          de: "Begleitung des gesamten Wegs von fachlichen Anforderungen im Zahlungsverkehr über Umsetzung und Test bis in den Produktionsbetrieb.",
        },
        {
          en: "Contribute domain expertise in payment processing, SEPA and bank-customer communication.",
          de: "Einbringen von Fachwissen in Zahlungsverarbeitung, SEPA und Bank-Kunde-Kommunikation.",
        },
      ],
    },
    {
      company: "Raiffeisen Software GmbH",
      link: "https://r-software.at",
      badges: ["Linz"],
      title: {
        en: "Full Stack Developer & Product Owner",
        de: "Full Stack Developer & Product Owner",
      },
      logo: ParabolLogo,
      start: "2018",
      end: "2022",
      intro: {
        en: "Built digital banking products across private and corporate banking, progressing from hands-on full-stack development into product ownership.",
        de: "Entwicklung digitaler Banking-Produkte im Privat- und Firmenkundengeschäft — vom Full-Stack-Development bis in die Product Ownership.",
      },
      highlights: [
        {
          en: "Developed customer–advisor communication features in private banking.",
          de: "Entwicklung von Kommunikationsfunktionen zwischen Kunden und ihren Beratern im Privatkundenbanking.",
        },
        {
          en: "Built corporate banking functionality for advisor and insurance interaction.",
          de: "Umsetzung von Firmenkundenbanking-Funktionen für die Interaktion mit Beratern und Versicherungen.",
        },
        {
          en: "Served as Product Owner for corporate banking products, leading the team behind advisor–customer communication tools and owning requirements and stakeholder alignment.",
          de: "Product Owner für Firmenkundenprodukte: Leitung des Teams hinter den Kommunikationstools zwischen Beratern und Firmenkunden, verantwortlich für Anforderungen und Stakeholder-Abstimmung.",
        },
        {
          en: "Took functionality from concept through implementation to production.",
          de: "Begleitung von Funktionen von der Konzeption über die Umsetzung bis in die Produktion.",
        },
        {
          en: "Worked across Java backend and Angular frontend.",
          de: "Java-Backend- und Angular-Frontend-Entwicklung.",
        },
      ],
    },
  ],
  // Grouped rather than one flat badge cloud, so the payments and backend
  // depth reads first and the frontend/AI tooling stays supporting context.
  skillGroups: [
    {
      label: {
        en: "Payments & Financial Systems",
        de: "Zahlungsverkehr & Finanzsysteme",
      },
      skills: [
        "SEPA",
        "EBICS",
        { en: "Corporate Banking", de: "Firmenkundengeschäft" },
        { en: "Payment Transactions", de: "Zahlungsverkehr" },
      ],
    },
    {
      label: { en: "Backend Engineering", de: "Backend-Entwicklung" },
      skills: [
        "Java",
        "Jakarta EE",
        "Quarkus",
        "Open Liberty",
        "REST APIs",
        "SQL",
      ],
    },
    {
      label: { en: "Platform & Operations", de: "Plattform & Betrieb" },
      skills: ["OpenShift", "Splunk", "Dynatrace", "XL Release"],
    },
    {
      label: { en: "Data", de: "Daten" },
      skills: ["Microsoft SQL Server", "MongoDB"],
    },
    {
      label: { en: "Frontend", de: "Frontend" },
      skills: ["Angular", "TypeScript", "React"],
    },
    {
      label: {
        en: "AI-assisted Engineering",
        de: "KI-gestützte Entwicklung",
      },
      skills: [
        "Claude Code",
        "GitHub Copilot",
        {
          en: "Agentic Development Workflows",
          de: "Agentische Entwicklungs-Workflows",
        },
      ],
    },
  ],
  // The personal site and blog live in the header links — this section is for
  // products that were conceived, built and shipped end to end.
  projects: [
    {
      title: "Kaydo",
      techStack: ["React", "Vite"],
      description: {
        en: "Conceived, built and shipped a private social platform end to end — from product concept to a running service.",
        de: "Eine private Social-Media-Plattform, eigenständig konzipiert, entwickelt und veröffentlicht — von der Produktidee bis zum laufenden Dienst.",
      },
      logo: ConsultlyLogo,
      link: {
        label: "kaydo.app",
        href: "https://kaydo.app",
      },
    },
    {
      title: "myFAOS",
      techStack: ["React", "Vite", "Firebase"],
      description: {
        en: "Designed and shipped a mobile-first family organizer with a shared calendar, tasks and child documentation.",
        de: "Mobile-first Familienorganizer mit geteiltem Kalender, Aufgaben und Kinddokumentation — entworfen und veröffentlicht.",
      },
      logo: ConsultlyLogo,
      link: {
        label: "myfaos.app",
        href: "https://myfaos.app",
      },
    },
    {
      title: "Flexpoll",
      techStack: ["React", "Vite"],
      description: {
        en: "Built and maintain a polling platform supporting several poll types, including location-based and live polls.",
        de: "Abstimmungsplattform mit mehreren Umfragetypen, darunter standortbasierte und Live-Abstimmungen — entwickelt und betrieben.",
      },
      logo: ConsultlyLogo,
      link: {
        label: "flexpoll.app",
        href: "https://flexpoll.app",
      },
    },
  ],
} as const;
