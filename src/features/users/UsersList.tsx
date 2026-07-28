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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <>
      <h2>Users List</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} <Link to={`/users/${user.id}`}>View details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostList;
