import { ConsultlyLogo, ParabolLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { WebsiteIcon } from "@/components/icons/WebsiteIcon";

export const RESUME_DATA = {
  name: "Ing. Johannes Gnadlinger",
  initials: "JG",
  location: "Linz, Österreich",
  locationLink: "https://www.google.com/maps/place/Linz",
  about: {
    en: "Product Owner & engineer in banking payments — EBICS/SEPA, regulated financial infrastructure, now building AI-assisted products",
    de: "Full Stack Engineer\nmit Fokus auf robuste und wartbare Produkte",
  },
  summary: {
    en: "As a Full Stack Engineer, I have taken multiple products from 0 to 1. My core expertise lies in Angular and Java, with deep experience developing private and business banking products at Raiffeisen Software GmbH.",
    de: "Als Full Stack Engineer habe ich mehrere Produkte von 0 auf 1 gebracht. Meine Kernkompetenz liegt in Angular und Java, mit umfangreicher Erfahrung in der Entwicklung von Privat- und Firmenkundenbanking-Produkten bei der Raiffeisen Software GmbH.",
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
      title: "Full Stack Developer",
      logo: ParabolLogo,
      start: "2018",
      end: {
        en: "now",
        de: "heute",
      },
      description: {
        en: "2018 - 2022: Developer as part of the Team VT, building private and business Banking features, especially features to interact with Advisor or Insurance. Project lead on business banking projects. \n \n" +
          "2023 - now: Developer as part of the Team ZV, developing new payment transaction features and migrating from MBS to EBICS banking standard.",
        de: "2018 - 2022: Entwickler im Team VT, Entwicklung von Privat- und Firmenkundenbanking-Features, insbesondere Features zur Interaktion mit Berater oder Versicherung. Projektleitung bei Firmenkundenprojekten. \n \n" +
          "2023 - heute: Entwickler im Team ZV, Entwicklung neuer Zahlungsverkehrs-Features und Migration vom MBS- zum EBICS-Banking-Standard.",
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
