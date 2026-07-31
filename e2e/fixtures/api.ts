import type { Page } from "@playwright/test";
import { mockUsers as seedUsers, type MockUser } from "./users";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users**";

/**
 * Intercepts calls to the (real, external) users API and serves an
 * in-memory copy instead, so tests are deterministic and don't depend
 * on network access or jsonplaceholder's shared state.
 */
export async function mockUsersApi(page: Page, initialUsers: MockUser[] = seedUsers) {
  let users = [...initialUsers];

  await page.route(USERS_API_URL, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const idMatch = url.pathname.match(/\/users\/(\d+)$/);

    if (request.method() === "GET" && !idMatch) {
      await route.fulfill({ json: users });
      return;
    }

    if (request.method() === "GET" && idMatch) {
      const user = users.find((u) => u.id === Number(idMatch[1]));
      if (!user) {
        await route.fulfill({ status: 404 });
        return;
      }
      await route.fulfill({ json: user });
      return;
    }

    if (request.method() === "DELETE" && idMatch) {
      users = users.filter((u) => u.id !== Number(idMatch[1]));
      await route.fulfill({ json: {} });
      return;
    }

    await route.continue();
  });
}
