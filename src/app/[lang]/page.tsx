import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { createTranslator, isLanguage } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const t = createTranslator(lang);

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-0">
      <section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-xl font-bold print:text-[15px]">
              {RESUME_DATA.name}
            </h1>
            {/* The positioning, not the name, is what has to land first — so it
                gets its own weight instead of sharing the muted intro block. */}
            <p className="text-base font-semibold leading-tight text-foreground print:text-[12px]">
              {t(RESUME_DATA.headline.role)}
            </p>
            <p className="mr-5 max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[10px] print:leading-snug">
              {t(RESUME_DATA.headline.tagline)}
            </p>
            <p className="mr-5 max-w-md text-pretty font-mono text-xs text-muted-foreground print:text-[9px] print:leading-snug">
              {t(RESUME_DATA.headline.credentials)}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                  aria-label={t(RESUME_DATA.ui.emailMe)}
                >
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="size-4" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="size-8"
                  variant="outline"
                  size="icon"
                  aria-label={social.name}
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="size-4" />
                  </a>
                </Button>
              ))}
              <ThemeToggle label={t(RESUME_DATA.ui.toggleTheme)} />
              <LanguageSwitcher current={lang} />
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
            </div>
          </div>

          <Avatar className="size-28">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.about)}
          </h2>
          <p className="whitespace-pre-line text-pretty font-mono text-sm text-muted-foreground print:text-[10px] print:leading-snug">
            {t(RESUME_DATA.summary)}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.work)}
          </h2>
          {RESUME_DATA.work.map((work) => {
            return (
              // Both phases are the same employer, so the start year is what
              // makes the key unique.
              <Card key={`${work.company}-${work.start}`}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a
                        className="text-base hover:underline print:text-[11px]"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {work.company}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs print:px-1 print:py-0 print:text-[8px]"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-muted-foreground print:text-[10px]">
                      {work.start}
                      {work.end != null
                        ? ` - ${typeof work.end === "object" ? t(work.end) : work.end}`
                        : ""}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm font-medium leading-none text-foreground print:text-[10px]">
                    {t(work.title)}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 text-sm print:mt-0.5 print:text-[10px] print:leading-snug">
                  <p className="text-pretty">{t(work.intro)}</p>
                  {/* Two work cards with bullets cost more paper than the old
                      single block, so print gets its own tighter metrics. */}
                  <ul className="mt-1.5 list-outside list-disc space-y-1 pl-4 text-muted-foreground print:mt-0.5 print:space-y-0 print:pl-3 print:text-[9px] print:leading-tight">
                    {work.highlights.map((highlight) => (
                      <li className="text-pretty" key={highlight.en}>
                        {t(highlight)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.skills)}
          </h2>
          <div className="flex flex-col gap-y-2 print:gap-y-0.5">
            {RESUME_DATA.skillGroups.map((group) => (
              <div
                key={group.label.en}
                className="flex flex-col gap-y-1 sm:flex-row sm:items-baseline sm:gap-x-3 print:flex-row print:items-baseline print:gap-x-2 print:gap-y-0"
              >
                <h3 className="shrink-0 font-mono text-xs font-semibold text-muted-foreground sm:w-48 print:w-36 print:text-[9px]">
                  {t(group.label)}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((skill) => {
                    const label = typeof skill === "string" ? skill : t(skill);
                    return (
                      <Badge
                        key={typeof skill === "string" ? skill : skill.en}
                        className="print:px-1 print:py-0 print:text-[9px]"
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.projects)}
          </h2>
          <div className="print-projects-grid -mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={t(project.description)}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>

        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.education)}
          </h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      <a
                        className="hover:underline print:text-[11px]"
                        href={education.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {education.school}
                      </a>
                    </h3>
                    <div className="text-sm tabular-nums text-muted-foreground print:text-[10px]">
                      {education.start}
                      {education.end.length > 0 ? ` - ${education.end}` : ""}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 print:mt-1 print:text-[10px]">
                  {t(education.degree)}
                </CardContent>
              </Card>
            );
          })}
        </Section>
      </section>

      <CommandMenu />
    </main>
  );
}
