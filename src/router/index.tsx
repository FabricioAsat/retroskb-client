import { createBrowserRouter } from "react-router";
import { Default } from "../layout/Default";
import { Home } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />, // Renderiza 1 vez
    children: [{ path: "", element: <Home /> }],
  },
]);
