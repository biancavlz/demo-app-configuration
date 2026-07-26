import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

type User = {
  id: string | number;
  name: string;
};

function PostList() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default PostList;
