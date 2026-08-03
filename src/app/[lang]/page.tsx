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
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-0 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-xl font-bold print:text-[15px]">{RESUME_DATA.name}</h1>
            <p className="mr-5 max-w-md whitespace-pre-line font-mono text-sm text-muted-foreground print:text-[10px] print:leading-snug">
              {t(RESUME_DATA.about)}
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
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
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
          <h2 className="text-xl font-bold print:text-[15px]">{t(RESUME_DATA.sections.about)}</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground print:text-[10px] print:leading-snug">
            {t(RESUME_DATA.summary)}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">{t(RESUME_DATA.sections.work)}</h2>
          {RESUME_DATA.work.map((work) => {
            return (
              <Card key={work.company}>
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

                  <h4 className="font-mono text-sm leading-none print:text-[10px]">
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 whitespace-pre-wrap text-sm print:mt-1 print:text-[10px] print:leading-snug">
                  {t(work.description)}
                </CardContent>
              </Card>
            );
          })}
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
                <CardContent className="mt-2 print:mt-1 print:text-[10px]">{t(education.degree)}</CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">{t(RESUME_DATA.sections.skills)}</h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.skills.map((skill) => {
              return (
                <Badge key={skill} className="print:px-1 print:py-0 print:text-[9px]">
                  {skill}
                </Badge>
              );
            })}
          </div>
        </Section>
        <Section>
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.aiSkills)}
          </h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.aiSkills.map((skill) => {
              return (
                <Badge key={skill} className="print:px-1 print:py-0 print:text-[9px]">
                  {skill}
                </Badge>
              );
            })}
          </div>
        </Section>

        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold print:text-[15px]">
            {t(RESUME_DATA.sections.projects)}
          </h2>
          <div className="print-projects-grid -mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <CommandMenu />
    </main>
  );
}
