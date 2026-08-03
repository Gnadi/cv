import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// The kbd hint in the command bar only renders from the xl breakpoint up, and
// it was the one element that failed contrast in dark mode — so the audit runs
// wide enough to include it.
test.use({ viewport: { width: 1280, height: 1400 } });

for (const lang of ["en", "de"]) {
  test(`/${lang} has no accessibility violations`, async ({ page }) => {
    await page.goto(`/${lang}`);
    const { violations } = await new AxeBuilder({ page })
      .withTags(WCAG)
      .analyze();
    expect(violations).toEqual([]);
  });
}

test("dark mode has no accessibility violations", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: /dark mode/i }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG)
    .analyze();
  expect(violations).toEqual([]);
});

test("the command menu has no accessibility violations", async ({ page }) => {
  await page.goto("/en");
  // The floating button is xl:hidden, and this viewport is xl — at this width
  // the shortcut is the only way in, which is what the hint bar advertises.
  await page.keyboard.press("ControlOrMeta+j");
  await expect(page.getByRole("dialog")).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG)
    .analyze();
  expect(violations).toEqual([]);
});
