import { test, expect } from "@playwright/test";

test.describe("language routing", () => {
  test("/ redirects to the default language", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });

  test("each language is server-rendered under its own URL", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { name: "Work Experience" }),
    ).toBeVisible();

    await page.goto("/de");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(
      page.getByRole("heading", { name: "Berufserfahrung" }),
    ).toBeVisible();
  });

  test("the German CV is in the HTML source, not applied by script", async ({
    request,
  }) => {
    const html = await (await request.get("/de")).text();
    expect(html).toContain("Berufserfahrung");
    expect(html).toContain('lang="de"');
  });

  test("the switcher is a link between the two languages", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: /Deutsch/i }).click();
    await expect(page).toHaveURL(/\/de$/);
    await page.getByRole("link", { name: /English/i }).click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("an unknown language 404s", async ({ request }) => {
    expect((await request.get("/fr")).status()).toBe(404);
  });
});

test.describe("accessibility", () => {
  test("each social link has its own accessible name", async ({ page }) => {
    await page.goto("/en");
    const names = await page
      .locator("header, main")
      .first()
      .getByRole("link")
      .evaluateAll((els) =>
        els
          .map((e) => e.getAttribute("aria-label"))
          .filter((n): n is string => !!n),
      );
    expect(new Set(names).size).toBe(names.length);
  });

  test("every new-tab link is safe against reverse tabnabbing", async ({
    page,
  }) => {
    await page.goto("/en");
    const unsafe = await page
      .locator('a[target="_blank"]')
      .evaluateAll((els) =>
        els.filter((e) => !e.rel.includes("noopener")).map((e) => e.href),
      );
    expect(unsafe).toEqual([]);
  });
});

test.describe("print output", () => {
  test("projects appear in the printed CV", async ({ page }) => {
    await page.goto("/en");
    await page.emulateMedia({ media: "print" });

    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    // Regression guard: the section used to be print:hidden, so the projects
    // were missing from the PDF that actually gets sent to people.
    for (const project of ["myFAOS", "Kaydo", "Flexpoll"]) {
      await expect(page.getByText(project, { exact: true })).toBeVisible();
    }
    // The URL line only renders in print, and needs display, not visibility.
    await expect(page.getByText("myfaos.app", { exact: true })).toBeVisible();
  });

  test("the printed CV fits on one A4 page", async ({ page }) => {
    // A4 at 96dpi, so the print layout is measured at the width it prints at.
    await page.setViewportSize({ width: 794, height: 1123 });
    await page.goto("/en");
    await page.emulateMedia({ media: "print" });
    // A4 at 96dpi minus the 1.2cm page margins declared in globals.css.
    // Measured on <body>: documentElement.scrollHeight never reports less
    // than the viewport, which would mask a CV that already fits.
    const printableHeight = 1123 - 2 * 45;
    const height = await page.evaluate(() =>
      Math.ceil(document.body.getBoundingClientRect().height),
    );
    expect(height).toBeLessThanOrEqual(printableHeight);
  });

  test("print stays light even in dark mode", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /dark mode/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.emulateMedia({ media: "print" });
    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(255, 255, 255)");
  });
});

test.describe("theme", () => {
  test("the choice survives a reload", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /dark mode/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
