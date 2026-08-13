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

  // Printing from the menu used to fire while the dialog was still up, so the
  // page printed under the dialog's scroll lock: Chrome drew the locked <body>
  // with a scrollbar and a scrollbar-width offset, neither of which appears on
  // a plain Ctrl+P.
  test("printing from the menu waits for the dialog's scroll lock", async ({
    page,
  }) => {
    test.skip(onTouch(), "same code path, one platform is enough");
    await page.addInitScript(() => {
      (window as unknown as { printState?: unknown }).printState = null;
      window.print = () => {
        (window as unknown as { printState?: unknown }).printState = {
          scrollLocked: document.body.hasAttribute("data-scroll-locked"),
          overflow: getComputedStyle(document.body).overflow,
          dialogs: document.querySelectorAll("[role=dialog]").length,
        };
      };
    });
    await page.goto("/en");
    await page.keyboard.press("Control+j");
    await page.getByText("Print / Save as PDF").click();

    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { printState?: unknown }).printState,
        ),
      )
      .toEqual({ scrollLocked: false, overflow: "visible", dialogs: 0 });
  });
});

test.describe("print output with the menu open", () => {
  // The safety net for everything that does not go through the menu's own
  // deferral -- Ctrl+P while the menu is open lands here.
  test("a locked body prints without scrollbar or offset", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Control+j");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("body")).toHaveAttribute("data-scroll-locked");

    await page.emulateMedia({ media: "print" });
    const body = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      return {
        overflow: cs.overflow,
        position: cs.position,
        marginRight: cs.marginRight,
        paddingRight: cs.paddingRight,
      };
    });
    expect(body).toEqual({
      overflow: "visible",
      position: "static",
      marginRight: "0px",
      paddingRight: "0px",
    });
  });
});
