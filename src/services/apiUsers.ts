import type { UserFormData } from "../features/users/schemas/userSchema";
import { env } from "../config/env";

const USERS_ENDPOINT = `${env.apiBaseUrl}/users`;

export async function getUsers() {
  const response = await fetch(USERS_ENDPOINT);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(userId: number) {
  const response = await fetch(`${USERS_ENDPOINT}/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export const createUser = async (data: UserFormData) => {
  const response = await fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
};

export const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: UserFormData;
}) => {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return true;
};
