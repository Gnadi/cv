# Project logos

Drop logo files here and import them in `src/data/resume-data.tsx`:

```ts
import MyfaosLogo from "@/images/logos/myfaos.svg";

// ...
{
  title: "myFAOS",
  logo: MyfaosLogo,
  // ...
}
```

- **Format:** SVG preferred. PNG works too — use a square source of at least
  128×128 so it stays sharp on high-DPI screens.
- **Shape:** square. The card renders it at 20×20 with `object-contain`, so
  non-square art is letterboxed rather than cropped.
- **Print:** logos are hidden in the printed CV. The layout has roughly 45px
  of spare height on an A4 page, and a row of logos would push it to a
  second page.

The two files that used to live here (`consultly.svg`, `parabol.svg`) came
from the upstream template and belonged to other companies, so they were
removed.
