export async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export interface NewUser {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export const createUser = async (data: NewUser) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
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
