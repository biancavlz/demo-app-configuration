import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiUsers";

function UserDetails() {
  const { userId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    enabled: !!userId,
    queryFn: () => getUserById(Number(userId)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Error loading user.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{data.name}</h1>

        <div className="space-y-4">
          <div className="flex border-b border-gray-100 pb-3">
            <span className="w-24 font-medium text-gray-500">Email</span>
            <span className="text-gray-800">{data.email}</span>
          </div>

          <div className="flex border-b border-gray-100 pb-3">
            <span className="w-24 font-medium text-gray-500">Phone</span>
            <span className="text-gray-800">{data.phone}</span>
          </div>

          <div className="flex">
            <span className="w-24 font-medium text-gray-500">Website</span>
            <a
              href={`https://${data.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {data.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
