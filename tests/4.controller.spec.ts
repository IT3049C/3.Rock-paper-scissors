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

  test(`Game Div Not Visible when starting the game`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await page.click(`#welcome-screen button`);

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();
  });

  test(`When starting the game, the name is captured and displayed in the score tally paragraph`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);
    const nameInput = await page.locator(`#welcome-screen input`);
    const startButton = await page.locator(`#welcome-screen button`);
    const scoreTally = await page.locator(`#game-screen #score`);

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await nameInput.fill(`John`);
    await startButton.click();

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();

    await expect(scoreTally).toHaveText(`John: 0 v CPU: 0`);

    await page.reload();

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await nameInput.fill(`Yahya`);
    await startButton.click();

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();

    await expect(scoreTally).toHaveText(`Yahya: 0 v CPU: 0`);
  });

  test(`When selecting Rock as the user selection, a record is added to the game history`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);
    const nameInput = await page.locator(`#welcome-screen input`);
    const startButton = await page.locator(`#welcome-screen button`);
    const goButton = await page.locator(`#game-screen button`);
    const scoreTally = await page.locator(`#game-screen #score`);
    const scoreHistory = await page.locator(`#game-screen #game-history`);

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await nameInput.fill(`John`);
    await startButton.click();

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();

    await expect(scoreTally).toHaveText(`John: 0 v CPU: 0`);

    // each user selection appears properly in the history
    for (const selection of [`rock`, `paper`, `scissors`]) {
      await page.selectOption(`#game-screen select`, selection);
      await goButton.click();
      const lastHistoryLog = await scoreHistory.getByRole(`listitem`).last().textContent();
      await expect(lastHistoryLog).toContain(`John selected ${selection}`);
    };
  });

  test(`When selecting an option, depending on the cpu selection, the score should update accordingly`, async ({ page }) => {
    const welcomeDivLocator = await page.locator(`#welcome-screen`);
    const gameDivLocator = await page.locator(`#game-screen`);
    const nameInput = await page.locator(`#welcome-screen input`);
    const startButton = await page.locator(`#welcome-screen button`);
    const goButton = await page.locator(`#game-screen button`);
    const scoreTally = await page.locator(`#game-screen #score`);
    const scoreHistory = await page.locator(`#game-screen #game-history`);

    await expect(welcomeDivLocator).toBeVisible();
    await expect(gameDivLocator).not.toBeVisible();

    await nameInput.fill(`John`);
    await startButton.click();

    await expect(welcomeDivLocator).not.toBeVisible();
    await expect(gameDivLocator).toBeVisible();

    await expect(scoreTally).toHaveText(`John: 0 v CPU: 0`);
    
    let doneLooping = false;
    while (!doneLooping) {
      await page.selectOption(`#game-screen select`, `rock`);
      await goButton.click();
      
      const lastHistoryLog = await scoreHistory.getByRole(`listitem`).last().textContent();
      await expect(lastHistoryLog).toContain(`John selected rock`);
      (await scoreTally.textContent()).includes(`v CPU: 3`) ? doneLooping = true : doneLooping = false;
    }

  });

  
});