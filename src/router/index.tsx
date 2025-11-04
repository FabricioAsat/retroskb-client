import { createBrowserRouter } from "react-router";
import { Default } from "../layout/Default";
import { Home, User } from "../pages";
import { ProtectedRoute } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />, // Renderiza 1 vez
    children: [
      { path: "", element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/user", element: <User /> }],
      },
    ],
  },
]);
