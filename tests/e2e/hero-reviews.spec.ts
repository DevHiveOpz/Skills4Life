import { expect, test } from "@playwright/test";

test("hero video starts after load and stays off with reduced motion", async ({
  page,
}) => {
  await page.goto("/familien");
  await expect(page.locator("#hero video")).toBeAttached({ timeout: 10_000 });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForTimeout(2_000);
  await expect(page.locator("#hero video")).toHaveCount(0);
  await expect(page.locator("#hero img")).toBeVisible();
});

test("large reviews change only when clicked", async ({ page }) => {
  await page.goto("/familien");
  const section = page.locator("#stimmen");
  await section.scrollIntoViewIfNeeded();

  await expect(section.getByText("1 von 3")).toBeVisible();
  await section.getByRole("button", { name: "Nächste Stimme zeigen" }).click();
  await expect(section.getByText("2 von 3")).toBeVisible();
});
