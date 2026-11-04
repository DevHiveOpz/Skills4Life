import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", name: "startseite" },
  { path: "/familien", name: "familien" },
  { path: "/schulen", name: "schulen" },
  { path: "/vereine", name: "vereine" },
  { path: "/impressum", name: "impressum" },
  { path: "/datenschutz", name: "datenschutz" },
];

for (const { path, name } of pages) {
  test.describe(name, () => {
    test.beforeEach(async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), "page loads").toBe(200);
      // The entry page shows the audience choice after its logo intro
      if (path === "/") {
        await expect(
          page.getByRole("link", { name: /Familien/ }),
        ).toBeVisible();
      }
    });

    test("has exactly one h1 and no horizontal scrolling", async ({ page }) => {
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
    });

    test("has no accessibility violations (WCAG 2.1 AA)", async ({
      page,
    }, testInfo) => {
      // Scroll through the page so that fade-in sections are fully visible
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);

      await page.screenshot({
        path: testInfo.outputPath(`${name}-${testInfo.project.name}.png`),
        fullPage: true,
      });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help} - ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join(", ")}`,
      );
      expect(summary).toEqual([]);
    });
  });
}
