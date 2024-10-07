import { RouterProvider } from "react-router-dom";
import router from "./constants/routes";
import Theme from "./layouts/Theme/Theme";

function App() {
  return (
    <>
      <Theme variant="light">
        <RouterProvider router={router} />
      </Theme>
    </>
  );
}

export default App;
