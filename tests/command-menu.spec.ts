import { test, expect } from "@playwright/test";

const PLACEHOLDER = "Type a command or search...";

const onTouch = () => test.info().project.name === "mobile-chromium";

test.describe("command menu", () => {
  test("a mouse-and-keyboard visitor lands in the search input", async ({
    page,
  }) => {
    test.skip(onTouch(), "covered by the touch case below");
    await page.goto("/en");
    await page.keyboard.press("Control+j");

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder(PLACEHOLDER)).toBeFocused();
  });

  test("a touch visitor sees the options instead of the keyboard", async ({
    page,
  }) => {
    test.skip(!onTouch(), "needs a coarse pointer");
    await page.goto("/en");
    await page.getByRole("button", { name: "open command menu" }).tap();

    // Focus lands on the dialog, not the input: a focused input raises the
    // virtual keyboard, which covers the very options the menu is opened for.
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByPlaceholder(PLACEHOLDER)).not.toBeFocused();
    await expect(dialog).toBeFocused();
    await expect(page.getByText("Print / Save as PDF")).toBeVisible();

    // Searching still works, it just waits to be asked for.
    await page.getByPlaceholder(PLACEHOLDER).tap();
    await expect(page.getByPlaceholder(PLACEHOLDER)).toBeFocused();
  });
});
