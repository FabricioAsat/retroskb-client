import { createBrowserRouter } from "react-router";
import { Default } from "../layout/Default";
import { Create, Edit, Home } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />, // Renderiza 1 vez
    children: [
      { path: "", element: <Home /> },
      { path: "create", element: <Create /> },
      { path: "manga/:id", element: <Edit /> },
    ],
  },
]);
