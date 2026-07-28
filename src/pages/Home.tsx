import CreateUser from "../features/users/CreateUser";
import UsersList from "../features/users/UsersList";

function Home() {
  return (
    <>
      <h1>Home Page</h1>;
      <UsersList />
      <CreateUser />
    </>
  );
}

export default Home;
