import path from "path";
const { test, expect } = require("@playwright/test");

test.describe("Layout Checks", () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.join(__dirname, "../index.html");
    await page.goto(`file://${filePath}`);
  });

  test("displays a form", async ({ page }) => {
    await expect(page).toHaveTitle(/rock paper scissors/i);
    await expect(page.getByRole(`heading`)).toContainText(/rock paper scissors/i);
  });

  test(`There exists 2 divs with classes welcome-screen and game-screen`, async ({ page }) => {
    //
    await expect(page.locator(`#welcome-screen`)).toBeTruthy();
    await expect(page.locator(`#game-screen`)).toBeTruthy();
  });

  test(`welcome screen includes a form for the name, and a button to start game`, async ({ page }) => {
    const formLocator = await page.locator(`#welcome-screen form`);
    await expect(formLocator).toBeTruthy();

    await expect(formLocator.getByLabel(/your name/i)).toBeTruthy();
    await expect(formLocator.getByLabel(/your name/i)).toHaveAttribute(`placeholder`, /enter name here/i);

    await expect(formLocator.getByRole(`button`)).toBeTruthy();
    await expect(formLocator.getByRole(`button`)).toContainText(/start game/i);
    await expect(formLocator.getByRole(`button`)).toHaveAttribute(`id`, `start-game-button`);
  });

  test(`game screen has space for score tally`, async ({ page }) => {
    const gameScreenScoreTallyDiv = await page.locator(`#game-screen > div`);
    const gameScreenScoreTallyP = await gameScreenScoreTallyDiv.locator(`p`);
    
    await expect(gameScreenScoreTallyDiv).toHaveAttribute(`id`, `score-tally`);
    await expect(gameScreenScoreTallyP).toHaveAttribute(`id`, `score`);
    await expect(gameScreenScoreTallyP).toContainText(/user: 0 v cpu: 0/i);
  });
    
  test(`game screen includes a form with a dropdown and a button`, async ({ page }) => {
    const formLocator = await page.locator(`#game-screen form`);
    await expect(formLocator).toBeTruthy();

    await expect(formLocator.getByLabel(/select your choice/i)).toBeTruthy();
    await expect(formLocator.locator(`label`)).toContainText(/select your choice/i);
    await expect(formLocator.getByLabel(/select your choice/i).locator(`option`)).toContainText([/rock/i, /paper/i, /scissors/i]);

    await expect(formLocator.getByRole(`button`)).toBeTruthy();
    await expect(formLocator.getByRole(`button`, {includeHidden: true})).toHaveAttribute(`id`, `go-button`);
    await expect(formLocator.getByRole(`button`, {includeHidden: true})).toContainText(/go/i);

    await expect(formLocator.locator(`#game-history`)).toBeTruthy();
  });
});
