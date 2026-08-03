import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border border-muted p-3 print:p-2">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base print:text-[11px]">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                {title}{" "}
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-green-500 print:hidden"
                ></span>
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="hidden font-mono text-xs underline print:block print:text-[9px]">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <CardDescription className="font-mono text-xs print:text-[9px] print:leading-tight">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      {/* Tech badges are noise on paper and cost the page break — the printed
          CV keeps the title, URL and description only. */}
      <CardContent className="mt-auto flex print:hidden">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
