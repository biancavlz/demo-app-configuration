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

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";
  const erroClass = "mt-2 text-sm text-red-600";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">Create User</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <fieldset className="space-y-6">
            <legend className="mb-4 text-lg font-semibold text-gray-900">
              Personal Information
            </legend>

            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>

              <input
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />

              {errors.name && (
                <p id="name-error" role="alert" className={erroClass}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>

              <input
                id="username"
                {...register("username", {
                  required: "Username is required",
                })}
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
                className={inputClass}
              />

              {errors.username && (
                <p id="username-error" role="alert" className={erroClass}>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>

              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
              />

              {errors.email && (
                <p id="email-error" role="alert" className={erroClass}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>

              <input
                id="phone"
                {...register("phone", {
                  required: "Phone is required",
                })}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass}
              />

              {errors.phone && (
                <p id="phone-error" role="alert" className={erroClass}>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="website" className={labelClass}>
                Website
              </label>

              <input
                id="website"
                placeholder="example.com"
                {...register("website")}
                className={inputClass}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-6 border-t border-gray-200 pt-8">
            <legend className="mb-4 text-lg font-semibold text-gray-900">
              Address
            </legend>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="street" className={labelClass}>
                  Street
                </label>

                <input
                  id="street"
                  {...register("address.street", {
                    required: "Street is required",
                  })}
                  aria-invalid={!!errors.address?.street}
                  aria-describedby={
                    errors.address?.street ? "street-error" : undefined
                  }
                  className={inputClass}
                />

                {errors.address?.street && (
                  <p id="street-error" role="alert" className={erroClass}>
                    {errors.address.street.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="suite" className={labelClass}>
                  Suite
                </label>

                <input
                  id="suite"
                  placeholder="Apt. 101"
                  {...register("address.suite")}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>

                <input
                  id="city"
                  {...register("address.city", {
                    required: "City is required",
                  })}
                  aria-invalid={!!errors.address?.city}
                  aria-describedby={
                    errors.address?.city ? "city-error" : undefined
                  }
                  className={inputClass}
                />

                {errors.address?.city && (
                  <p id="city-error" role="alert" className={erroClass}>
                    {errors.address.city.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="zipcode" className={labelClass}>
                  Zip Code
                </label>

                <input
                  id="zipcode"
                  {...register("address.zipcode", {
                    required: "Zip code is required",
                  })}
                  aria-invalid={!!errors.address?.zipcode}
                  aria-describedby={
                    errors.address?.zipcode ? "zipcode-error" : undefined
                  }
                  className={inputClass}
                />

                {errors.address?.zipcode && (
                  <p id="zipcode-error" role="alert" className={erroClass}>
                    {errors.address.zipcode.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-6 border-t border-gray-200 pt-8">
            <legend className="mb-4 text-lg font-semibold text-gray-900">
              Company
            </legend>

            <div>
              <label htmlFor="company-name" className={labelClass}>
                Company Name
              </label>

              <input
                id="company-name"
                placeholder="Acme Inc."
                {...register("company.name")}
                className={inputClass}
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {mutation.isPending ? "Creating User..." : "Create User"}
            </button>

            {mutation.isSuccess && (
              <p role="status" className="text-sm font-medium text-green-700">
                ✅ User created successfully!
              </p>
            )}

            {mutation.isError && (
              <p role="alert" className="text-sm font-medium text-red-600">
                ❌ {mutation.error.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
