import { ConsultlyLogo, ParabolLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { WebsiteIcon } from "@/components/icons/WebsiteIcon";

export const RESUME_DATA = {
  name: "Ing. Johannes Gnadlinger",
  initials: "JG",
  location: "Linz, Österreich",
  locationLink: "https://www.google.com/maps/place/Linz",
  about: {
    en: "Payments Engineer, previously Product Owner\nbuilding regulated financial infrastructure — EBICS, SEPA — with AI-assisted products as side projects",
    de: "Payments Engineer, zuvor Product Owner\nAufbau regulierter Finanzinfrastruktur — EBICS, SEPA — mit KI-gestützten Produkten als Nebenprojekte",
  },
  summary: {
    en: "As a Payments Engineer and former Product Owner at Raiffeisen Software GmbH, I've taken multiple banking products from 0 to 1. I led a team in corporate banking building communication tools between advisors and corporate customers, worked on payment and financial services (EBICS/SEPA), and earlier built advisor-customer communication features in private banking — all backed by deep expertise in Angular and Java.",
    de: "Als Payments Engineer und ehemaliger Product Owner bei der Raiffeisen Software GmbH habe ich mehrere Banking-Produkte von 0 auf 1 gebracht. Ich habe ein Team im Firmenkundenbanking geleitet, das Kommunikationstools zwischen Beratern und Firmenkunden entwickelt hat, im Zahlungsverkehr und Finanzdienstleistungsbereich (EBICS/SEPA) gearbeitet und zuvor im Privatkundenbanking Kommunikationsfunktionen zwischen Kunden und Beratern entwickelt — mit fundierter Expertise in Angular und Java.",
  },
  avatarUrl: "https://avatars.githubusercontent.com/u/15075183?v=4",
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
        url: "https://at.linkedin.com/in/johannes-gnadlinger-842293271",
        icon: LinkedInIcon,
      },
      {
        name: "Website",
        url: "https://gnadlinger.me",
        icon: WebsiteIcon,
      },
    ],
  },
  education: [
    {
      school: "Gymnasium Dr.- Schauerstraße",
      link: "https://schauergym.at/",
      degree: {
        en: "Technical Education",
        de: "Technische Ausbildung",
      },
      start: "2009",
      end: "2013",
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
    {
      school: "WKO Oberösterreich",
      link: "https://www.wko.at/ooe",
      degree: {
        en: "Engineering Degree",
        de: "Ingenieur Zertifizierung",
      },
      start: "2026",
      end: ""
    },
  ],
  work: [
    {
      company: "Raiffeisen Software GmbH",
      link: "https://r-software.at",
      badges: ["Linz"],
      title: "Full Stack Developer & Product Owner",
      logo: ParabolLogo,
      start: "2018",
      end: {
        en: "now",
        de: "heute",
      },
      description: {
        en: "2018 - 2022: Developer in Team VT, building private banking communication features between customers and their advisors, and corporate banking features for advisor and insurance interaction. Also served as Product Owner, leading a team in corporate banking that built communication tools between advisors and corporate customers. \n \n" +
          "2023 - now: Developer in Team ZV, working on payment and financial services in corporate banking — developing new payment transaction features and migrating from MBS to the EBICS banking standard.",
        de: "2018 - 2022: Entwickler im Team VT, Entwicklung von Kommunikationsfunktionen im Privatkundenbanking zwischen Kunden und ihren Beratern sowie Firmenkundenbanking-Features zur Interaktion mit Beratern und Versicherungen. Zusätzlich als Product Owner tätig mit Leitung eines Teams im Firmenkundenbanking, das Kommunikationstools zwischen Beratern und Firmenkunden entwickelt hat. \n \n" +
          "2023 - heute: Entwickler im Team ZV, Tätigkeit im Zahlungsverkehr und Finanzdienstleistungsbereich im Firmenkundenbanking — Entwicklung neuer Zahlungsverkehrs-Features und Migration vom MBS- zum EBICS-Banking-Standard.",
      },
    },
  ],
  skills: [
    "Angular",
    "TypeScript",
    "Java",
    "Quarkus",
    "Open Liberty",
    "Splunk",
    "Dynatrace",
    "Openshift",
    "XL Release",
    "Microsoft SQL Server",
    "Mongo DB",
    "React/Next.js",
  ],
  aiSkills: [
    "Claude Code",
    "GitHub Copilot",
    "Google Antigravity",
    "Google Stitch",
    "Google Pomelli",
  ],
  projects: [
    {
      title: "Homepage",
      techStack: ["Side Project", "Astro", "Vite"],
      description: {
        en: "My personal Website",
        de: "Meine persönliche Webseite",
      },
      logo: ConsultlyLogo,
      link: {
        label: "gnadlinger.me",
        href: "https://gnadlinger.me/",
      },
    },
    {
      title: "Blog",
      techStack: ["Side Project", "Storyblok", "Astro"],
      description: {
        en: "My personal Blog",
        de: "Mein persönlicher Blog",
      },
      logo: ConsultlyLogo,
      link: {
        label: "blog.gnadlinger.me",
        href: "https://blog.gnadlinger.me/",
      },
    },
    {
      title: "Kaydo",
      techStack: ["Side Project", "React", "Vite"],
      description: {
        en: "A private social media platform",
        de: "Eine private Social-Media-Plattform",
      },
      logo: ConsultlyLogo,
      link: {
        label: "kaydo.app",
        href: "https://kaydo.app",
      },
    },
    {
      title: "Flexpoll",
      techStack: ["Side Project", "React", "Vite"],
      description: {
        en: "A polling platform with multiple poll types including location and live polls",
        de: "Eine Abstimmungsplattform mit verschiedenen Umfragetypen wie Standort- und Live-Abstimmungen",
      },
      logo: ConsultlyLogo,
      link: {
        label: "flexpoll.app",
        href: "https://flexpoll.app",
      },
    },
  ],
} as const;
