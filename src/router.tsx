import { createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import UserDetails from "./features/users/UserDetails";
import CreateUser from "./features/users/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "/users/:userId",
        element: <UserDetails />,
      },
      {
        path: "/users/new",
        element: <CreateUser />,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
