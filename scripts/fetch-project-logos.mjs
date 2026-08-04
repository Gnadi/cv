#!/usr/bin/env node
// Downloads a logo for every project in resume-data.tsx by asking each
// project's own site for its icon, and writes them into src/images/logos/.
//
//   node scripts/fetch-project-logos.mjs            # all projects
//   node scripts/fetch-project-logos.mjs myFAOS     # only matching titles
//
// Sites are asked in this order of preference: apple-touch-icon (usually the
// largest and least cluttered), web app manifest icons, <link rel="icon">,
// then /favicon.ico. Prints the exact lines to paste into resume-data.tsx.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_FILE = "src/data/resume-data.tsx";
const OUT_DIR = "src/images/logos";
// Below this an "image" is a stub or a truncated download, not a logo.
const MIN_BYTES = 256;
// Anything this small is probably a bare favicon that will look soft.
const SMALL_BYTES = 1024;

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Pairs each project title with the href that follows it. */
function readProjects(source) {
  const start = source.indexOf("projects: [");
  if (start === -1) throw new Error(`No projects array found in ${DATA_FILE}`);

  const block = source.slice(start);
  const matches = block.matchAll(
    /title:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"/g,
  );
  return [...matches].map(([, title, href]) => ({ title, href }));
}

/** Largest "512x512"-style descriptor wins; unsized entries rank lowest. */
function area(sizes) {
  if (!sizes) return 0;
  const found = [...sizes.matchAll(/(\d+)x(\d+)/gi)].map(
    ([, w, h]) => Number(w) * Number(h),
  );
  return found.length ? Math.max(...found) : 0;
}

function collectFromHtml(html, pageUrl) {
  const candidates = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!rel || !href) continue;

    const sizes = tag.match(/\bsizes\s*=\s*["']([^"']+)["']/i)?.[1];
    const url = new URL(href, pageUrl).toString();

    if (rel.includes("apple-touch-icon")) {
      candidates.push({ url, rank: 3, area: area(sizes) });
    } else if (rel.split(/\s+/).includes("icon")) {
      // An explicit SVG icon scales better than a sized PNG.
      const isSvg = /\.svg(\?|$)/i.test(url) || /image\/svg/i.test(tag);
      candidates.push({ url, rank: isSvg ? 2.5 : 1, area: area(sizes) });
    } else if (rel.includes("manifest")) {
      candidates.push({ url, rank: 0, manifest: true, area: 0 });
    }
  }
  return candidates;
}

async function expandManifest(manifestUrl) {
  try {
    const res = await fetch(manifestUrl, { redirect: "follow" });
    if (!res.ok) return [];
    const manifest = await res.json();
    return (manifest.icons ?? []).map((icon) => ({
      url: new URL(icon.src, manifestUrl).toString(),
      rank: 2,
      area: area(icon.sizes),
    }));
  } catch {
    return [];
  }
}

async function pickIcon(siteUrl) {
  const res = await fetch(siteUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const html = await res.text();
  const pageUrl = res.url || siteUrl;

  const candidates = collectFromHtml(html, pageUrl);
  const manifests = candidates.filter((c) => c.manifest);
  const icons = candidates.filter((c) => !c.manifest);

  for (const manifest of manifests) {
    icons.push(...(await expandManifest(manifest.url)));
  }

  icons.push({
    url: new URL("/favicon.ico", pageUrl).toString(),
    rank: -1,
    area: 0,
  });
  icons.sort((a, b) => b.rank - a.rank || b.area - a.area);
  return icons;
}

/**
 * Sniffs the real format from the bytes. Plenty of sites answer a missing
 * /favicon.ico with an HTML error page and a 200, and a bogus file breaks
 * `next build` rather than merely looking wrong.
 */
function sniff(bytes) {
  if (bytes.length < 4) return null;
  if (bytes.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])))
    return "png";
  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])))
    return "jpg";
  if (bytes.subarray(0, 4).toString("ascii") === "GIF8") return "gif";
  if (
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  )
    return "webp";
  if (bytes.subarray(0, 4).equals(Buffer.from([0x00, 0x00, 0x01, 0x00])))
    return "ico";

  const head = bytes.subarray(0, 512).toString("utf8").trimStart();
  if (/^<\?xml/.test(head) || /^<svg[\s>]/i.test(head)) return "svg";
  if (head.toLowerCase().includes("<svg")) return "svg";
  return null;
}

async function download(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length === 0) throw new Error(`empty response from ${url}`);

  const ext = sniff(bytes);
  if (!ext) {
    const type = (res.headers.get("content-type") ?? "unknown").split(";")[0];
    throw new Error(`${url} is not an image (served as ${type})`);
  }
  // Magic bytes alone do not prove the rest of a binary file is intact, and a
  // truncated image fails `next build` rather than just looking wrong. SVG is
  // exempt: it is validated structurally above, and a tidy logo can be tiny.
  if (ext !== "svg" && bytes.length < MIN_BYTES) {
    throw new Error(
      `${url} is only ${bytes.length} bytes — truncated or a stub`,
    );
  }
  return { bytes, ext };
}

const filters = process.argv.slice(2).map((a) => a.toLowerCase());
const source = await readFile(DATA_FILE, "utf8");
const projects = readProjects(source).filter(
  (p) =>
    filters.length === 0 ||
    filters.some((f) => p.title.toLowerCase().includes(f)),
);

if (projects.length === 0) {
  console.error("No matching projects.");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const imports = [];
const slots = [];
let failed = 0;

for (const { title, href } of projects) {
  const slug = slugify(title);
  process.stdout.write(`${title.padEnd(12)} ${href} … `);

  try {
    const candidates = await pickIcon(href);
    let saved = null;

    for (const candidate of candidates) {
      try {
        const { bytes, ext } = await download(candidate.url);
        const file = path.join(OUT_DIR, `${slug}.${ext}`);
        await writeFile(file, bytes);
        saved = { file, ext, from: candidate.url, size: bytes.length };
        break;
      } catch {
        // Try the next candidate.
      }
    }

    if (!saved) throw new Error("no usable icon found");

    const soft =
      saved.size < SMALL_BYTES ? "  (small — check how it looks)" : "";
    console.log(`${saved.file} (${saved.size} B)${soft}`);
    const ident = `${title.replace(/[^A-Za-z0-9]/g, "")}Logo`;
    imports.push(`import ${ident} from "@/images/logos/${slug}.${saved.ext}";`);
    slots.push(`  ${title}: logo: ${ident},`);
  } catch (error) {
    failed += 1;
    console.log(`FAILED — ${error.message}`);
  }
}

if (imports.length > 0) {
  console.log(`\nAdd to the top of ${DATA_FILE}:\n`);
  console.log(imports.join("\n"));
  console.log("\nThen replace `logo: undefined` for:\n");
  console.log(slots.join("\n"));
}

if (failed > 0) {
  console.log(
    `\n${failed} project(s) had no usable icon. Some sites only ship a ` +
      `low-resolution favicon.ico — check the result before committing.`,
  );
}
