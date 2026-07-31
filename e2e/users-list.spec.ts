import { test, expect } from "@playwright/test";
import { UsersListPage } from "./pages/UsersListPage";
import { mockUsersApi } from "./fixtures/api";
import { mockUsers } from "./fixtures/users";

test.describe("Users list", () => {
  test.beforeEach(async ({ page }) => {
    await mockUsersApi(page);
  });

  test("renders the list of users from the API", async ({ page }) => {
    const usersListPage = new UsersListPage(page);
    await usersListPage.goto();

    await expect(usersListPage.heading).toBeVisible();

    for (const user of mockUsers) {
      await expect(usersListPage.userRow(user.id)).toContainText(user.name);
    }
  });

  test("navigates to a user's details page", async ({ page }) => {
    const usersListPage = new UsersListPage(page);
    await usersListPage.goto();

    const [firstUser] = mockUsers;
    await usersListPage.viewDetailsLink(firstUser.id).click();

    await expect(page).toHaveURL(`/users/${firstUser.id}`);
    await expect(
      page.getByRole("heading", { name: firstUser.name }),
    ).toBeVisible();
    await expect(page.getByText(firstUser.email)).toBeVisible();
  });

  test("deletes a user after confirming the dialog", async ({ page }) => {
    const usersListPage = new UsersListPage(page);
    await usersListPage.goto();

    const [firstUser] = mockUsers;
    await usersListPage.deleteButton(firstUser.id).click();

    await expect(usersListPage.confirmDialog).toBeVisible();
    await expect(usersListPage.confirmDialog).toContainText(firstUser.name);

    await usersListPage.confirmDelete();

    await expect(page.getByText("User deleted successfully!")).toBeVisible();
    await expect(usersListPage.userRow(firstUser.id)).not.toBeVisible();
  });

  test("keeps the user when the delete dialog is cancelled", async ({
    page,
  }) => {
    const usersListPage = new UsersListPage(page);
    await usersListPage.goto();

    const [firstUser] = mockUsers;
    await usersListPage.deleteButton(firstUser.id).click();
    await expect(usersListPage.confirmDialog).toBeVisible();

    await usersListPage.cancelDelete();

    await expect(usersListPage.confirmDialog).not.toBeVisible();
    await expect(usersListPage.userRow(firstUser.id)).toBeVisible();
  });
});
