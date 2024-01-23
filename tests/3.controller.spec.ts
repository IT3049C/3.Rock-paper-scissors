import path from "path";
const { test, expect } = require("@playwright/test");

test.describe("Layout Checks", () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.join(__dirname, "../index.html");
    await page.goto(`file://${filePath}`);
  });

  test(`Game Div Hidden when starting the game`, async ({ page }) => {
    const gameDivLocator = await page.locator(`#game-screen`);

    await expect(gameDivLocator).not.toBeVisible();
  });

  test(`Welcome Div Visible when starting the game`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);

    await expect(welcomeDivLocator).toBeVisible();
  });

  test(`Game Div Visible when starting the game`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await page.click(`#welcome-screen button`);

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();
  });
  
});