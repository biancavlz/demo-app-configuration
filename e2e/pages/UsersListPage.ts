import type { Locator, Page } from "@playwright/test";

export class UsersListPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addUserLink: Locator;
  readonly confirmDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Users" });
    this.addUserLink = page.getByRole("link", { name: "Add a user" });
    this.confirmDialog = page.getByRole("dialog");
  }

  async goto() {
    await this.page.goto("/");
  }

  userRow(id: number): Locator {
    return this.page.getByTestId(`user-row-${id}`);
  }

  viewDetailsLink(id: number): Locator {
    return this.userRow(id).getByRole("link", { name: "View details" });
  }

  editLink(id: number): Locator {
    return this.userRow(id).getByRole("link", { name: "Edit" });
  }

  deleteButton(id: number): Locator {
    return this.userRow(id).getByRole("button", { name: "Delete" });
  }

  async confirmDelete() {
    await this.confirmDialog.getByRole("button", { name: "Delete" }).click();
  }

  async cancelDelete() {
    await this.confirmDialog.getByRole("button", { name: "Cancel" }).click();
  }
}
