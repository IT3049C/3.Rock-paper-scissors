import path from "path";
const { test, expect } = require("@playwright/test");

test.describe("Layout Checks", () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.join(__dirname, "../index.html");
    await page.goto(`file://${filePath}`);
  });

  test(`divs have borders`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);

    await expect(welcomeDivLocator).toHaveCSS(`border`, `1px solid rgb(0, 0, 0)`);
    await expect(gameDivLocator).toHaveCSS(`border`, `1px solid rgb(255, 0, 0)`);
  });

  test(`buttons have the correct classes`, async ({ page }) => {
    const welcomeFormLocator = await page.locator(`#welcome-screen form`);
    const gameFormLocator = await page.locator(`#game-screen form`);

    await expect(welcomeFormLocator.getByRole(`button`)).toHaveClass(`btn btn-primary`);
    await expect(gameFormLocator.getByRole(`button`)).toHaveClass(`btn btn-success`);
  });

  test(`forms should have a form-group class`, async ({ page }) => {
    const forms = await page.locator(`form`);
    await expect(forms.nth(0)).toHaveClass(`form-group`);
    await expect(forms.nth(1)).toHaveClass(`form-group`);
  });
  
  test(`inputs should have a form-control class`, async ({ page }) => {
    const input = await page.locator(`input`);
    const select = await page.locator(`select`);
    await expect(input).toHaveClass(`form-control`);
    await expect(select).toHaveClass(`custom-select`);
  });
});