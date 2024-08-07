import { ConsultlyLogo, ParabolLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Johannes Gnadlinger",
  initials: "JG",
  location: "Linz, Österreich",
  locationLink: "https://www.google.com/maps/place/Linz",
  about:
    "Full Stack Engineer focused on building robust maintainable products",
  summary:
    "As a Full Stack Engineer, I have successfully taken multiple products from 0 to 1. Currently, I work mostly with Angular and Java. I have over 6 years of experience in working at Raiffeisen Software GmbH creating products in private and business banking.",
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
    ],
  },
  education: [
    {
      school: "Gymnasium Dr.- Schauerstraße",
      link: "https://schauergym.at/",
      degree: "Technical Education",
      start: "2009",
      end: "2013",
    },
    {
      school: "HTL Leonding",
      link: "https://www.htl-leonding.at/",
      degree: "System & Software Engineering",
      start: "2013",
      end: "2017",
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
      end: "now",
      description:
        "2018 - 2022: Developer as part of the Team VT, building private and business Banking features, especially features to interact with Advisor or Insurance. Project lead on business banking projects. \n \n" +
        "2023 - 2024: Developer as part of the Team ZV, developing new payment transaction features and migrating from MBS to EBICS banking standard.",
    }
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
    "Tennis",
  ],
  projects: [
    {
      title: "Homepage",
      techStack: [
        "Side Project",
        "Astro",
        "Vite",
      ],
      description: "My personal Website",
      logo: ConsultlyLogo,
      link: {
        label: "gnadlinger.me",
        href: "https://gnadlinger.me/",
      },
    },
    {
      title: "Blog",
      techStack: [
        "Side Project",
        "Storyblok",
        "Astro"
      ],
      description: "My personal Blog",
      logo: ConsultlyLogo,
      link: {
        label: "blog.gnadlinger.me",
        href: "https://blog.gnadlinger.me/",
      },
    },
  ]
} as const;
