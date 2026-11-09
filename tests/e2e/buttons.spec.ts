import { expect, test, type Locator, type Page } from "@playwright/test";

const denyConsent = (page: Page) =>
  page.addInitScript(() =>
    localStorage.setItem("s4l-consent-analytics", "denied"),
  );

const toTop = (page: Page) =>
  page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

async function expectInView(page: Page, target: string) {
  await expect
    .poll(
      () =>
        page.evaluate((id) => {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          return top === undefined ? 9999 : Math.abs(Math.round(top - 80));
        }, target),
      { timeout: 8_000 },
    )
    .toBeLessThan(120);
}

// Each button must work again and again, not only on the first click
async function clickRepeatedly(
  page: Page,
  button: () => Locator,
  target: string,
) {
  for (let round = 1; round <= 3; round += 1) {
    await toTop(page);
    await page.waitForTimeout(150);
    await button().click();
    await expectInView(page, target);
  }
}

test.describe("buttons work on every click", () => {
  test.beforeEach(async ({ page }) => {
    await denyConsent(page);
    await page.goto("/familien");
  });

  test("hero button", async ({ page }) => {
    await clickRepeatedly(
      page,
      () => page.locator("#hero a[href*='standortbestimmung']"),
      "standortbestimmung",
    );
  });

  for (const [href, target] of [
    ["/familien#ansatz", "ansatz"],
    ["/familien#geschichte", "geschichte"],
    ["/familien#about", "about"],
    ["/familien#standortbestimmung", "standortbestimmung"],
  ]) {
    test(`header link to ${target}`, async ({ page, isMobile }) => {
      test.skip(isMobile, "Desktop header");
      await clickRepeatedly(
        page,
        () => page.locator(`header a[href="${href}"]`).first(),
        target,
      );
    });
  }

  test("footer link", async ({ page }) => {
    for (let round = 1; round <= 3; round += 1) {
      await page.evaluate(() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant",
        }),
      );
      await page
        .locator("footer a[href='/familien#standortbestimmung']")
        .click();
      await expectInView(page, "standortbestimmung");
    }
  });

  test("floating button on phones", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Phones only");
    for (let round = 1; round <= 3; round += 1) {
      await page.evaluate(() =>
        window.scrollTo({ top: 900, behavior: "instant" }),
      );
      const button = page.getByRole("link", { name: "Situation einschätzen" });
      await expect(button).toBeVisible();
      await button.click();
      await expectInView(page, "standortbestimmung");
    }
  });

  test("phone menu links", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Phones only");
    for (const [label, target] of [
      ["Unser Ansatz", "ansatz"],
      ["Über uns", "about"],
      ["Situation Ihres Kindes einschätzen", "standortbestimmung"],
      ["Unser Ansatz", "ansatz"],
    ]) {
      await toTop(page);
      await page.getByRole("button", { name: "Menü öffnen" }).click();
      await page.getByRole("dialog").getByRole("link", { name: label }).click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expectInView(page, target);
    }
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("assessment can be started, left and started again", async ({
    page,
  }) => {
    const section = page.locator("#standortbestimmung");
    for (let round = 1; round <= 3; round += 1) {
      await section.getByRole("button", { name: "Jetzt starten" }).click();
      const next = section.getByRole("button", { name: "Weiter" });
      await section.getByRole("button", { name: /Elternteil/ }).click();
      await expect(next).toBeEnabled();
      await section.getByRole("button", { name: "Zurück" }).click();
    }
  });

  test("booking calendar changes month in both directions", async ({
    page,
  }) => {
    const section = page.locator("#booking");
    const month = section.getByText(/\b20\d\d\b/).first();
    const first = await month.innerText();
    await section.getByRole("button", { name: "Nächster Monat" }).click();
    await expect(month).not.toHaveText(first);
    await section.getByRole("button", { name: "Vorheriger Monat" }).click();
    await expect(month).toHaveText(first);
  });

  test("large reviews can be clicked through in a circle", async ({ page }) => {
    const section = page.locator("#stimmen");
    const next = section.getByRole("button", { name: "Nächste Stimme zeigen" });
    for (const expected of ["2 von 3", "3 von 3", "1 von 3", "2 von 3"]) {
      await next.click();
      await expect(section.getByText(expected)).toBeVisible();
    }
  });

  test("chat opens and closes repeatedly", async ({ page }) => {
    for (let round = 1; round <= 3; round += 1) {
      await page.locator("[data-chat-trigger]").click();
      await page.getByRole("button", { name: "Chat schliessen" }).click();
      await expect(page.locator("[data-chat-trigger]")).toBeVisible();
    }
  });
});

test("links from another page land on the right section", async ({ page }) => {
  await denyConsent(page);
  await page.goto("/impressum");
  await page.locator("footer a[href='/familien#standortbestimmung']").click();
  await expect(page).toHaveURL(/\/familien#standortbestimmung$/);
  await expectInView(page, "standortbestimmung");
});

test("all internal links lead to an existing page", async ({
  page,
  request,
}) => {
  await denyConsent(page);
  const paths = new Set<string>();
  for (const start of [
    "/",
    "/familien",
    "/schulen",
    "/vereine",
    "/impressum",
  ]) {
    await page.goto(start);
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href") ?? ""),
      );
    hrefs.forEach((href) => paths.add(href.split("#")[0] || "/"));
  }
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBeLessThan(400);
  }
});

test("assessment keeps the answers when sending fails and can be resent", async ({
  page,
}) => {
  await denyConsent(page);
  let status = 500;
  await page.route("**/api/leads", (route) =>
    route.fulfill({ status, json: { success: status === 200 } }),
  );
  await page.goto("/familien");

  const section = page.locator("#standortbestimmung");
  await section.getByRole("button", { name: "Jetzt starten" }).click();
  const weiter = section.getByRole("button", { name: "Weiter" });
  const send = section.getByRole("button", {
    name: /auswerten|absenden|Ergebnis|Einschätzung/i,
  });

  for (let step = 0; step < 15 && !(await send.isVisible()); step += 1) {
    for (const input of await section
      .locator("input:visible, textarea:visible")
      .all()) {
      const type = await input.getAttribute("type");
      if (type === "email") await input.fill("test@example.com");
      else if (type === "tel") await input.fill("0781234567");
      else if (type !== "checkbox" && type !== "radio")
        await input.fill("Test");
    }
    if (!(await weiter.isEnabled())) {
      await section
        .locator(
          "form button:visible, .grid button:visible, .space-y-3 button:visible",
        )
        .first()
        .click();
    }
    await weiter.click();
  }

  await expect(send).toBeDisabled();
  await section.getByRole("checkbox").first().check();
  await send.click();
  await expect(section.getByRole("alert")).toContainText("nochmals");

  status = 200;
  await send.click();
  await expect(section.getByRole("alert")).toHaveCount(0);
  await expect(send).toHaveCount(0);
});
