import { test, expect } from "@playwright/test";
import { mockUsersApi } from "./fixtures/api";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await mockUsersApi(page);
  });

  test("navigates between Home and About via the header links", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("heading", { name: "About Page" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  });

  test("shows a 404 page for unknown routes", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");

    await expect(
      page.getByRole("heading", { name: "404 - Page Not Found" }),
    ).toBeVisible();
  });
});
