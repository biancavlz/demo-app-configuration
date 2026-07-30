import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUser } from "../../services/apiUsers";
import UserForm from "../../components/UserForm";
import { type UserFormData } from "./schemas/userSchema";

const emptyUser: UserFormData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  company: {
    name: "",
  },
};

function CreateUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,

    onSuccess: (newUser) => {
      console.log("User created:", newUser);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("User created successfully!");
    },

    onError: (error: Error) => {
      console.error(error.message);

      toast.error(error.message || "Failed to create user");
    },
  });

  return (
    <UserForm
      title="Create User"
      submitLabel="Create User"
      defaultValues={emptyUser}
      isPending={mutation.isPending}
      onSubmit={(data) => mutation.mutate(data)}
    />
  );
}

export default CreateUserForm;
