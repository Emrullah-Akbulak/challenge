import { RouteObject, createBrowserRouter } from "react-router-dom";
import EmailFinder from "../pages/EmailFinder/EmailFinder";

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <EmailFinder />,
  },
];

const router = createBrowserRouter(routes);
export default router;
