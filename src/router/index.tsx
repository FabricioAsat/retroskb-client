import { createBrowserRouter } from "react-router";
import { Default } from "../layout/Default";
import { Create, Error404, Home, Manga, User } from "../pages";
import { ProtectedRoute } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />, // Renderiza 1 vez
    children: [
      { path: "", element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/user", element: <User /> },
          { path: "/create", element: <Create /> },
          { path: "/manga/:id", element: <Manga /> },
        ],
      },
      { path: "/*", element: <Error404 /> },
    ],
  },
]);
