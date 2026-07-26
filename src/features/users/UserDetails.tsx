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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>
    </div>
  );
}

export default UserDetails;
