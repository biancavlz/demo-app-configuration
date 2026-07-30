import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import toast from "react-hot-toast";

import UserForm from "../../components/UserForm";
import { getUserById, updateUser } from "../../services/apiUsers";

function EditUser() {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(Number(userId)),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (data: typeof user) =>
      updateUser({
        id: Number(userId),
        data,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });

      toast.success("User updated successfully!");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
      >
        Failed to load user.
      </div>
    );
  }

  return (
    <UserForm
      title="Edit User"
      submitLabel="Save Changes"
      defaultValues={user}
      isPending={mutation.isPending}
      onSubmit={(data) => mutation.mutate(data)}
    />
  );
}

export default EditUser;
