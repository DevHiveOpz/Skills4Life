import { test, expect } from "@playwright/test";

const GA_SCRIPT = /googletagmanager\.com\/gtag\/js/;

test.describe("cookie banner", () => {
  test.beforeEach(async ({ page }) => {
    // Never contact Google from the tests
    await page.route(GA_SCRIPT, (route) =>
      route.fulfill({ contentType: "text/javascript", body: "" }),
    );
  });

  test("loads Google Analytics only after consent", async ({ page }) => {
    const gaRequests: string[] = [];
    page.on("request", (r) => {
      if (GA_SCRIPT.test(r.url())) gaRequests.push(r.url());
    });

    await page.goto("/familien");
    const banner = page.getByRole("region", {
      name: "Cookies für die Statistik",
    });
    await expect(banner).toBeVisible();
    expect(gaRequests, "no Google Analytics before consent").toEqual([]);

    await banner.getByRole("button", { name: "Statistik erlauben" }).click();
    await expect(banner).toBeHidden();
    await expect.poll(() => gaRequests.length).toBeGreaterThan(0);

    // The choice is remembered on the next page
    await page.goto("/schulen");
    await expect(banner).toBeHidden();
  });

  test("rejecting keeps Google Analytics off and can be changed in the footer", async ({
    page,
  }) => {
    const gaRequests: string[] = [];
    page.on("request", (r) => {
      if (GA_SCRIPT.test(r.url())) gaRequests.push(r.url());
    });

    await page.goto("/familien");
    const banner = page.getByRole("region", {
      name: "Cookies für die Statistik",
    });
    await banner.getByRole("button", { name: "Nur notwendige" }).click();
    await expect(banner).toBeHidden();

    await page.reload();
    await expect(banner).toBeHidden();
    expect(gaRequests).toEqual([]);

    await page.getByRole("button", { name: "Cookie-Einstellungen" }).click();
    await expect(banner).toBeVisible();
  });
});
