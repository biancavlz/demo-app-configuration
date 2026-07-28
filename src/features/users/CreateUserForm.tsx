import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, type NewUser } from "../../services/apiUsers";

function CreateUserForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUser>({
    defaultValues: {
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
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,

    onSuccess: (newUser) => {
      console.log("User created:", newUser);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      reset();
    },

    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: NewUser) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h2>Create a User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <br />
          <input
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <br />

        <div>
          <label>Username</label>
          <br />
          <input
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            {...register("phone", {
              required: "Phone is required",
            })}
          />

          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <br />

        <div>
          <label>Website</label>
          <br />
          <input {...register("website")} placeholder="example.com" />
        </div>

        <hr />

        <h3>Address</h3>

        <div>
          <label>Street</label>
          <br />
          <input
            {...register("address.street", {
              required: "Street is required",
            })}
          />

          {errors.address?.street && <p>{errors.address.street.message}</p>}
        </div>

        <br />

        <div>
          <label>Suite</label>
          <br />
          <input {...register("address.suite")} placeholder="Apt. 101" />
        </div>

        <br />

        <div>
          <label>City</label>
          <br />
          <input
            {...register("address.city", {
              required: "City is required",
            })}
          />

          {errors.address?.city && <p>{errors.address.city.message}</p>}
        </div>

        <br />

        <div>
          <label>Zip Code</label>
          <br />
          <input
            {...register("address.zipcode", {
              required: "Zip code is required",
            })}
          />

          {errors.address?.zipcode && <p>{errors.address.zipcode.message}</p>}
        </div>

        <hr />

        <h3>Company</h3>
        <div>
          <label>Company Name</label>
          <br />
          <input {...register("company.name")} placeholder="Acme Inc." />
        </div>

        <br />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating User..." : "Create User"}
        </button>

        {mutation.isSuccess && (
          <p style={{ color: "green" }}>✅ User created successfully!</p>
        )}

        {mutation.isError && <p>❌ {mutation.error.message}</p>}
      </form>
    </div>
  );
}

export default CreateUserForm;
