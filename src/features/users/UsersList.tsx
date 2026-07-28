import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";
import { Link } from "react-router";

type User = {
  id: string | number;
  name: string;
};

function PostList() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Error loading users.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Users</h2>
        <Link className="hover:text-indigo-600" to={`/users/new`}>
          Add a user
        </Link>
      </div>

      <div className="space-y-4">
        {data?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>

            <Link
              to={`/users/${user.id}`}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
