import { expect, test } from "@playwright/test";

test("hero video starts by itself, also with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/familien");
  await expect(page.locator("#hero video")).toBeAttached({ timeout: 10_000 });
  await expect(page.locator("#hero video")).toHaveAttribute("loop", "");
});

test("review row moves by itself and stops on hover", async ({
  page,
  hasTouch,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/familien");
  const track = page.locator("#bewertungen .animate-marquee");
  const state = () =>
    track.evaluate((element) => getComputedStyle(element).animationPlayState);

  expect(await state()).toBe("running");
  if (hasTouch) return;
  await page.locator("#bewertungen [role=group]").hover();
  expect(await state()).toBe("paused");
});

test("large reviews change only when clicked", async ({ page }) => {
  await page.goto("/familien");
  const section = page.locator("#stimmen");
  await section.scrollIntoViewIfNeeded();

  await expect(section.getByText("1 von 3")).toBeVisible();
  await section.getByRole("button", { name: "Nächste Stimme zeigen" }).click();
  await expect(section.getByText("2 von 3")).toBeVisible();
});
